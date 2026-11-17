"""NAKAJAH Care Foundation: FastAPI API + static file server for the built frontend."""
from pathlib import Path

from dotenv import load_dotenv

# Must run before the local modules below, which read the environment at import time.
load_dotenv(Path(__file__).parent / ".env")

import gzip
import json
import os
import re
import secrets
from contextlib import asynccontextmanager
from urllib.parse import quote, unquote

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from ai import ai_enabled, chat_reply, draft_email
from mail import FROM, STAFF, send_mail
from safety import EMERGENCY_NOTE, SAFE_REPLY, clip, email_of, is_risk, limited

PORT = int(os.getenv("PORT") or 8787)
AUTO = (os.getenv("AUTO_REPLY") or "draft") == "auto"  # 'draft' = AI drafts, staff approve; 'auto' = AI answers routine emails directly
DIST = Path(os.getenv("FRONTEND_DIST") or Path(__file__).parent.parent / "frontend" / "dist").resolve()
OWN = email_of(FROM)
MODE = "auto" if AUTO else "draft"


@asynccontextmanager
async def lifespan(_: FastAPI):
    print(f"NAKAJAH server on http://localhost:{PORT}  ai={ai_enabled} mail={bool(os.getenv('RESEND_API_KEY'))} mode={MODE}")
    yield


app = FastAPI(title="Nakajah Care Foundation API", lifespan=lifespan)

# Allow the frontend (when hosted on a different origin) to call the API. Comma-separated; "*" by default.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in (os.getenv("CORS_ORIGINS") or "*").split(",") if o.strip()],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


class BadRequest(Exception):
    def __init__(self, message: str):
        self.message = message


@app.exception_handler(BadRequest)
async def _bad_request(_, exc: BadRequest):
    return JSONResponse({"error": exc.message}, status_code=400)


async def read_body(request: Request) -> dict:
    raw = b""
    async for chunk in request.stream():
        raw += chunk
        if len(raw) > 40_000:
            raise BadRequest("too large")
    try:
        data = json.loads(raw.decode() or "{}")
    except ValueError:
        raise BadRequest("bad json")
    return data if isinstance(data, dict) else {}


def ip_of(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else ""


def one_line(s: str) -> str:
    return re.sub(r"[\r\n]+", " ", s)


# ── POST /api/chat ─────────────────────────
@app.post("/api/chat")
async def chat(request: Request):
    if limited(ip_of(request), "chat", 25, 10 * 60):
        return JSONResponse({"error": "Too many messages. Please try again in a few minutes."}, status_code=429)
    messages = (await read_body(request)).get("messages")
    items = [m for m in (messages if isinstance(messages, list) else [])][-12:]
    history = [
        {"role": m["role"], "content": clip(m["content"], 1000)}
        for m in items
        if isinstance(m, dict) and m.get("role") in ("user", "assistant") and isinstance(m.get("content"), str)
    ]
    while history and history[0]["role"] != "user":
        history.pop(0)
    if not history or history[-1]["role"] != "user":
        return JSONResponse({"error": "Send a user message."}, status_code=400)
    # Safeguarding first: risky messages never go to the AI for a free-form answer.
    if any(is_risk(m["content"]) for m in [m for m in history if m["role"] == "user"][-2:]):
        return {"reply": SAFE_REPLY, "urgent": True}
    try:
        return {"reply": await chat_reply(history)}
    except Exception as e:
        print("chat error:", e)
        return {"reply": "Sorry, I’m having trouble right now. Please email hello@nakajahcare.org and the team will help."}


# ── shared handler: an incoming message from the form or from email ──
async def handle_inbound(*, name: str, email: str, subject: str, message: str, source: str) -> dict:
    risky = is_risk(message) or is_risk(subject)
    draft = None
    if not risky:
        try:
            draft = await draft_email(from_=f"{name} <{email}>", subject=subject, body=message)
        except Exception as e:
            print("draft error:", e)
    send_direct = bool(AUTO and not risky and draft)

    # 1) Reply to the sender
    if send_direct:
        await send_mail(to=email, subject=f"Re: {subject}", text=draft, reply_to=STAFF)
    else:
        await send_mail(
            to=email,
            subject=f"We received your message: {subject}",
            reply_to=STAFF,
            text=f"Hello {name or ''},\n\nThank you for contacting NAKAJAH Care Foundation. We have received your message and a member of our team will reply within 24 hours.\n\n"
            + (EMERGENCY_NOTE + "\n\n" if risky else "")
            + "With care,\nThe NAKAJAH Care Foundation Team",
        )
    # 2) Notify the team, with the AI draft for approval
    if risky:
        status = "FLAGGED: possible safeguarding concern. No AI reply was sent. Please follow the child protection procedure and respond personally.\n"
    elif send_direct:
        status = "An AI reply was already sent to the sender (copy below).\n"
    else:
        status = "The sender received an acknowledgement. Suggested AI reply below for you to review, edit and send.\n"
    await send_mail(
        to=STAFF,
        reply_to=email,
        subject=f"{'[URGENT - SAFEGUARDING] ' if risky else ''}{source}: {subject}",
        text=f"From: {name} <{email}>\nSource: {source}\n{status}\n---- MESSAGE ----\n{message}\n\n"
        f"---- {'SENT' if send_direct else 'SUGGESTED'} REPLY ----\n{draft or '(none – write personally)'}\n",
    )
    return {"risky": risky, "autoReplied": send_direct}


# ── POST /api/contact (website form) ─────────────────────────
@app.post("/api/contact")
async def contact(request: Request):
    if limited(ip_of(request), "contact", 5, 60 * 60):
        return JSONResponse({"error": "Too many messages. Please try again later."}, status_code=429)
    b = await read_body(request)
    if b.get("website"):  # honeypot
        return {"ok": True}
    email, name, message = email_of(b.get("email")), clip(b.get("name"), 80).strip(), clip(b.get("message"), 4000).strip()
    if not email or not name or len(message) < 5:
        return JSONResponse({"error": "Please fill in your name, a valid email and a message."}, status_code=400)
    subject = one_line(clip(b.get("topic") or "Website enquiry", 100))
    try:
        r = await handle_inbound(name=name, email=email, subject=subject, message=message, source="Website form")
        return {"ok": True, "urgent": r["risky"]}
    except Exception as e:
        print("contact error:", e)
        return JSONResponse({"error": "We could not send your message. Please email hello@nakajahcare.org."}, status_code=502)


# ── POST /api/inbound-email (provider webhook → AI draft/reply) ───────────
# Point your email provider's inbound webhook here:  /api/inbound-email?secret=INBOUND_SECRET
# Accepts {from, subject, text} or {data:{from, subject, text}} (map other providers' fields to these).
@app.post("/api/inbound-email")
async def inbound(request: Request):
    expected = os.getenv("INBOUND_SECRET")
    given = request.query_params.get("secret") or ""
    if not expected or not secrets.compare_digest(given.encode(), expected.encode()):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    raw = await read_body(request)
    b = raw.get("data") if isinstance(raw.get("data"), dict) else raw
    email = email_of(b.get("from"))
    message = clip(b.get("text") or b.get("body") or "", 6000).strip()
    subject = one_line(clip(b.get("subject") or "(no subject)", 120))
    auto = bool(re.search(r"no-?reply|mailer-daemon|postmaster|bounce|notification", email, re.I)) or bool(
        re.search(r"auto-?submitted|bulk|auto-reply", json.dumps(b.get("headers") or ""), re.I)
    )
    if not email or not message or email == OWN or auto:
        return {"ignored": True}  # avoids reply loops
    if limited(email, "inbound", 4, 24 * 60 * 60):
        return {"ignored": "rate-limited"}
    m = re.match(r'^"?([^"<]+?)"?\s*<', str(b.get("from")))
    name = m.group(1) if m else email.split("@")[0]
    try:
        return await handle_inbound(name=name, email=email, subject=subject, message=message, source="Inbound email")
    except Exception as e:
        print("inbound error:", e)
        return JSONResponse({"error": "failed"}, status_code=502)


@app.api_route("/api/health", methods=["GET", "POST", "HEAD"])
async def health():
    return {"ok": True, "ai": ai_enabled, "mail": bool(os.getenv("RESEND_API_KEY")), "mode": MODE}


@app.api_route("/api/{rest:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"])
async def api_not_found(rest: str):
    return JSONResponse({"error": "not found"}, status_code=404)


# ── static files (production) ─────────────────────────
TYPES = {".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png",
         ".jpg": "image/jpeg", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain",
         ".webmanifest": "application/manifest+json"}
SEC = {"X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin",
       "X-Frame-Options": "SAMEORIGIN", "Permissions-Policy": "camera=(), microphone=(), geolocation=()"}
NOT_FOUND = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Nakajah Care Foundation</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#fff7fb;color:#16163a;text-align:center}a{color:#ec1c8c;font-weight:700}</style></head><body><div><h1>Page not found</h1><p>The page you are looking for does not exist.</p><p><a href="/">Back to the Nakajah Care Foundation homepage</a></p></div></body></html>'
_gz_cache: dict[Path, tuple[bytes, bytes]] = {}


@app.api_route("/{full_path:path}", methods=["GET", "HEAD"])
async def serve(request: Request, full_path: str):
    pathname = unquote(request.url.path)
    if len(pathname) > 1 and pathname.endswith("/"):  # one canonical URL
        qs = f"?{request.url.query}" if request.url.query else ""
        return Response(status_code=301, headers={"Location": quote(pathname[:-1]) + qs})
    rel = "index.html" if pathname == "/" else pathname.lstrip("/")
    p = (DIST / rel).resolve()
    if not p.is_relative_to(DIST):
        return Response(status_code=403)
    if not p.is_file():
        # Real 404 for unknown URLs (a 200 "soft 404" on every path hurts SEO). Only the homepage is the app.
        return Response(NOT_FOUND, status_code=404, headers={**SEC, "X-Robots-Tag": "noindex"},
                        media_type="text/html; charset=utf-8")
    data = p.read_bytes()
    ext = p.suffix
    ctype = TYPES.get(ext, "application/octet-stream")
    in_assets = "assets" in p.relative_to(DIST).parts[:-1]
    headers = {
        "Content-Type": ctype + ("; charset=utf-8" if re.match(r"^text|json|xml|javascript|svg", ctype) else ""),
        **SEC,
        "Cache-Control": "public,max-age=31536000,immutable" if in_assets or ext in (".png", ".jpg", ".svg", ".webp") else "public,max-age=0,must-revalidate",
    }
    if ext in (".png", ".jpg") and not in_assets:
        headers["Cache-Control"] = "public,max-age=86400"  # un-hashed images: 1 day
    if ext in (".html", ".js", ".css", ".svg", ".json", ".xml", ".txt", ".webmanifest") and re.search(r"\bgzip\b", request.headers.get("accept-encoding", "")):
        z = _gz_cache.get(p)
        if not z or z[0] != data:
            z = (data, gzip.compress(data))
            _gz_cache[p] = z
        headers["Content-Encoding"] = "gzip"
        headers["Vary"] = "Accept-Encoding"
        data = z[1]
    return Response(data, status_code=200, headers=headers)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=PORT)

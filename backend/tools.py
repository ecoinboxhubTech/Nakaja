"""Tools the chat assistant can call, plus the signed 'pending action' used for confirm-before-send.

Write actions never run inside the model loop. `prepare_contact_request` only validates and returns a
signed, expiring token; the visitor must press Confirm in the UI, which calls /api/chat/confirm.
"""
import base64
import hashlib
import hmac
import json
import os
import re
import secrets
import time

from knowledge import FAQ_TEXT
from safety import clip, email_of

ACTION_SECRET = os.getenv("ACTION_SECRET") or ""
ACTIONS_ENABLED = len(ACTION_SECRET) >= 16  # without a real secret, the chat can't file requests
TTL = 15 * 60

TOPICS = ["Volunteer as a mentor", "Partner with us", "Sponsor a girl's education", "Invite NAKAJAH to our school", "General enquiry"]

_SECTIONS = [(l.split(":", 1)[0].strip(), l) for l in FAQ_TEXT.splitlines() if ":" in l]
_STOP = set("the a an and or of to for in on is are do does can how what i you we us our your my me with at it be".split())


def _words(s: str) -> set[str]:
    return {w for w in re.findall(r"[a-z]{3,}", s.lower()) if w not in _STOP}


def search_knowledge(query: str = "") -> str:
    q = _words(query)
    scored = sorted(((len(q & _words(text)) + (2 if q & _words(name) else 0), text) for name, text in _SECTIONS), reverse=True)
    hits = [t for s, t in scored if s > 0][:3]
    return "\n".join(hits) if hits else "No matching information. Say you are not sure and offer to pass a message to the team."


def get_programs() -> str:
    return next((t for n, t in _SECTIONS if n == "PROGRAMMES"), "")


def _sign(payload: dict) -> str:
    body = base64.urlsafe_b64encode(json.dumps(payload, separators=(",", ":")).encode()).decode()
    mac = hmac.new(ACTION_SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()
    return f"{body}.{mac}"


def verify(token: str) -> dict | None:
    if not ACTIONS_ENABLED or not isinstance(token, str) or "." not in token:
        return None
    body, mac = token.rsplit(".", 1)
    good = hmac.new(ACTION_SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(mac, good):
        return None
    try:
        data = json.loads(base64.urlsafe_b64decode(body.encode()))
    except ValueError:
        return None
    return data if isinstance(data, dict) and data.get("exp", 0) > time.time() else None


def prepare_contact_request(name: str = "", email: str = "", topic: str = "", message: str = "") -> tuple[str, dict | None]:
    """Returns (text for the model, pending action for the UI or None)."""
    name, em, message = clip(name, 80).strip(), email_of(email), clip(message, 1500).strip()
    topic = topic if topic in TOPICS else "General enquiry"
    if not name or not em or len(message) < 5:
        return "Missing details. Ask the visitor for their name, a valid email address and what they want to say.", None
    data = {"name": name, "email": em, "topic": topic, "message": message}
    pending = {"token": _sign({**data, "jti": secrets.token_hex(12), "exp": int(time.time()) + TTL}), "summary": data}
    return "Prepared. The visitor now sees the details with Confirm and Cancel buttons. Nothing is sent until they press Confirm. Briefly tell them to check the details and confirm.", pending


TOOL_DEFS = [
    {"type": "function", "function": {
        "name": "search_knowledge",
        "description": "Look up facts about NAKAJAH (mission, programmes, founder, impact, ways to help, safeguarding, volunteering). Call this before answering any factual question.",
        "parameters": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]}}},
    {"type": "function", "function": {
        "name": "get_programs",
        "description": "List all NAKAJAH programmes with a short description of each.",
        "parameters": {"type": "object", "properties": {}}}},
]

if ACTIONS_ENABLED:
    TOOL_DEFS.append({"type": "function", "function": {
        "name": "prepare_contact_request",
        "description": "Prepare a message to the NAKAJAH team (volunteering, partnership, sponsorship, school visit, general question) on the visitor's behalf. Only call when the visitor wants to be contacted and has given their name, email and message. It does NOT send anything; the visitor must confirm in the UI.",
        "parameters": {"type": "object", "properties": {
            "name": {"type": "string"}, "email": {"type": "string"},
            "topic": {"type": "string", "enum": TOPICS},
            "message": {"type": "string", "description": "What the visitor wants to tell the team, in their own words."}},
            "required": ["name", "email", "topic", "message"]}}})


def run_tool(name: str, args: dict) -> tuple[str, dict | None]:
    if not isinstance(args, dict):
        args = {}
    if name == "search_knowledge":
        return search_knowledge(str(args.get("query", ""))), None
    if name == "get_programs":
        return get_programs(), None
    if name == "prepare_contact_request" and ACTIONS_ENABLED:
        return prepare_contact_request(**{k: args.get(k, "") for k in ("name", "email", "topic", "message")})
    return "Unknown tool.", None

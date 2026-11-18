import asyncio
import os
import smtplib
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

import httpx

from safety import esc

STAFF = os.getenv("STAFF_EMAIL") or "hello@nakajahcare.org"
FROM = os.getenv("MAIL_FROM") or "NAKAJAH Care Foundation <hello@nakajahcare.org>"
OUTBOX = Path(__file__).parent / "outbox.log"


async def send_mail(*, to: str, subject: str, text: str, reply_to: str | None = None):
    """Sends through Resend. With no RESEND_API_KEY it logs to backend/outbox.log so the flow can be tested safely."""
    html = (
        '<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#16163a;white-space:pre-wrap">'
        f"{esc(text)}</div>"
    )
    api_key = os.getenv("RESEND_API_KEY")
    smtp_user, smtp_pass = os.getenv("SMTP_USER"), os.getenv("SMTP_PASS")
    if not api_key and smtp_user and smtp_pass:
        return await asyncio.to_thread(_send_smtp, smtp_user, smtp_pass, to, subject, text, html, reply_to)
    if not api_key:
        stamp = datetime.now(timezone.utc).isoformat()
        with OUTBOX.open("a", encoding="utf-8") as f:
            f.write(f"\n--- {stamp}\nTO: {to}\nSUBJECT: {subject}\n{text}\n")
        print(f'[mail:mock] to={to} subject="{subject}"')
        return {"mock": True}

    payload = {"from": FROM, "to": [to], "subject": subject, "text": text, "html": html}
    if reply_to:
        payload["reply_to"] = reply_to
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json=payload,
        )
    if r.status_code >= 400:
        raise RuntimeError(f"mail send failed: {r.status_code} {r.text[:200]}")
    return r.json()


def _send_smtp(user: str, password: str, to: str, subject: str, text: str, html: str, reply_to: str | None):
    """Gmail (or any SMTP) fallback for when there is no verified domain for Resend. Gmail rewrites From to the account address."""
    msg = EmailMessage()
    msg["From"] = f"NAKAJAH Care Foundation <{user}>"
    msg["To"], msg["Subject"] = to, subject
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")
    with smtplib.SMTP_SSL(os.getenv("SMTP_HOST") or "smtp.gmail.com", int(os.getenv("SMTP_PORT") or 465), timeout=20) as s:
        s.login(user, password)
        s.send_message(msg)
    return {"smtp": True}

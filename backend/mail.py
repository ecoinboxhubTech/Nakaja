import os
from datetime import datetime, timezone
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

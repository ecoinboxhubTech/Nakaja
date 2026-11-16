"""Safeguarding triage, rate limiting and small text helpers.

The triage is deliberately conservative: a false positive only means a human handles the
message instead of the AI, which is the safe failure mode for a child-safety charity.
"""
import html
import re
import time

_RISK = [re.compile(p, re.I) for p in (
    r"\b(rape[ds]?|raping|molest\w*|sexual(ly)? (abus|assault|harass)\w*|touch(ed|ing) me|forc(ed|ing) me)\b",
    r"\b(abus(e|ed|ing|ive)|beaten|being (hurt|hit|beaten|attacked)|domestic violence|gbv|bully(ing)? me|bullied|bullying)\b",
    r"\b(hurt|hit|beat|slap|punch|kick|choke|attack|touch|threaten|force|follow)(s|ed|ing|es)? (me|her|him|them|my|a child|a girl)\b",
    r"\b(suicid\w*|kill (myself|me)|end (my|it all)|want to die|self[- ]?harm|hurt myself|cut(ting)? myself)\b",
    r"\b(not safe|unsafe at home|afraid (of|to go)|scared (of|to go)|threat(en|ened|ening)|trafficking|kidnap\w*)\b",
    r"\b(pregnan\w*|forced marriage|child marriage|run(ning)? away)\b",
    r"\b(in danger|emergency|urgent help|help me)\b",
)]


def is_risk(text) -> bool:
    t = text or ""
    return any(r.search(t) for r in _RISK)


EMERGENCY_NOTE = (
    "If you or someone you know is in immediate danger, please contact local emergency services "
    "right now (112 in Nigeria) or go to a trusted adult or a safe place nearby."
)

SAFE_REPLY = (
    "I’m really sorry you’re going through this, and I’m glad you reached out. You deserve to be safe and heard.\n\n"
    + EMERGENCY_NOTE
    + "\n\nI’m an automated assistant, so I can’t give you the personal help you need. A real person from our team can. "
    "Please use the contact form on this page or email hello@nakajahcare.org and tell us how to reach you safely; "
    "we treat every message confidentially."
)

# ----- tiny in-memory rate limiter (per IP + bucket) -----
_hits: dict[str, list[float]] = {}


def limited(ip: str, bucket: str, max_hits: int, window_s: float) -> bool:
    key, now = f"{bucket}:{ip}", time.time()
    arr = [t for t in _hits.get(key, []) if now - t < window_s]
    arr.append(now)
    _hits[key] = arr
    if len(_hits) > 5000:
        for k in [k for k, v in _hits.items() if not any(now - t < window_s for t in v)]:
            del _hits[k]
    return len(arr) > max_hits


def esc(s) -> str:
    return html.escape("" if s is None else str(s), quote=True)


def clip(s, n: int) -> str:
    return ("" if s is None else str(s)).replace("\x00", "")[:n]


_EMAIL = re.compile(r"[^\s<>\"',;]+@[^\s<>\"',;]+\.[^\s<>\"',;]+")


def email_of(s) -> str:
    m = _EMAIL.search(str(s or ""))
    return m.group(0).lower() if m else ""

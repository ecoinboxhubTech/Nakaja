// Safeguarding triage. Deliberately conservative: a false positive only means a human
// handles the message instead of the AI, which is the safe failure mode for a child-safety charity.
const RISK = [
  /\b(rape[ds]?|raping|molest\w*|sexual(ly)? (abus|assault|harass)\w*|touch(ed|ing) me|forc(ed|ing) me)\b/i,
  /\b(abus(e|ed|ing|ive)|beaten|being (hurt|hit|beaten|attacked)|domestic violence|gbv|bully(ing)? me|bullied|bullying)\b/i,
  /\b(hurt|hit|beat|slap|punch|kick|choke|attack|touch|threaten|force|follow)(s|ed|ing|es)? (me|her|him|them|my|a child|a girl)\b/i,
  /\b(suicid\w*|kill (myself|me)|end (my|it all)|want to die|self[- ]?harm|hurt myself|cut(ting)? myself)\b/i,
  /\b(not safe|unsafe at home|afraid (of|to go)|scared (of|to go)|threat(en|ened|ening)|trafficking|kidnap\w*)\b/i,
  /\b(pregnan\w*|forced marriage|child marriage|run(ning)? away)\b/i,
  /\b(in danger|emergency|urgent help|help me)\b/i
]

export const isRisk = text => RISK.some(r => r.test(text || ''))

export const EMERGENCY_NOTE =
  'If you or someone you know is in immediate danger, please contact local emergency services right now (112 in Nigeria) or go to a trusted adult or a safe place nearby.'

export const SAFE_REPLY =
  'I’m really sorry you’re going through this, and I’m glad you reached out. You deserve to be safe and heard.\n\n' +
  EMERGENCY_NOTE +
  '\n\nI’m an automated assistant, so I can’t give you the personal help you need. A real person from our team can. ' +
  'Please use the contact form on this page or email hello@nakajahcare.org and tell us how to reach you safely; we treat every message confidentially.'

// ----- tiny in-memory rate limiter (per IP + bucket) -----
const hits = new Map()
export function limited(ip, bucket, max, windowMs) {
  const key = `${bucket}:${ip}`, now = Date.now()
  const arr = (hits.get(key) || []).filter(t => now - t < windowMs)
  arr.push(now); hits.set(key, arr)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < windowMs)) hits.delete(k)
  return arr.length > max
}

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
export const clip = (s, n) => String(s ?? '').replace(/\u0000/g, '').slice(0, n)
export const emailOf = s => (String(s || '').match(/[^\s<>"',;]+@[^\s<>"',;]+\.[^\s<>"',;]+/) || [''])[0].toLowerCase()

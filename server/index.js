import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chatReply, draftEmail, aiEnabled } from './ai.js'
import { sendMail, STAFF, FROM } from './mail.js'
import { isRisk, SAFE_REPLY, EMERGENCY_NOTE, limited, clip, emailOf } from './safety.js'

const PORT = Number(process.env.PORT || 8787)
const AUTO = (process.env.AUTO_REPLY || 'draft') === 'auto' // 'draft' = AI drafts, staff approve; 'auto' = AI answers routine emails directly
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const OWN = emailOf(FROM)

const json = (res, code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)) }
const readBody = req => new Promise((ok, no) => {
  let n = 0; const parts = []
  req.on('data', c => { n += c.length; if (n > 40_000) { no(new Error('too large')); req.destroy() } else parts.push(c) })
  req.on('end', () => { try { ok(JSON.parse(Buffer.concat(parts).toString() || '{}')) } catch { no(new Error('bad json')) } })
})
const ipOf = req => (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim()

/* ── POST /api/chat ───────────────────────── */
async function chat(req, res) {
  if (limited(ipOf(req), 'chat', 25, 10 * 60_000)) return json(res, 429, { error: 'Too many messages. Please try again in a few minutes.' })
  const { messages } = await readBody(req)
  const history = (Array.isArray(messages) ? messages : []).slice(-12)
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: clip(m.content, 1000) }))
  while (history.length && history[0].role !== 'user') history.shift()
  if (!history.length || history[history.length - 1].role !== 'user') return json(res, 400, { error: 'Send a user message.' })
  // Safeguarding first: risky messages never go to the AI for a free-form answer.
  if (history.filter(m => m.role === 'user').slice(-2).some(m => isRisk(m.content))) return json(res, 200, { reply: SAFE_REPLY, urgent: true })
  try { json(res, 200, { reply: await chatReply(history) }) }
  catch (e) { console.error('chat error:', e.message); json(res, 200, { reply: 'Sorry, I’m having trouble right now. Please email hello@nakajahcare.org and the team will help.' }) }
}

/* ── shared handler: an incoming message from the form or from email ── */
async function handleInbound({ name, email, subject, message, source }) {
  const risky = isRisk(message) || isRisk(subject)
  let draft = null
  if (!risky) { try { draft = await draftEmail({ from: `${name} <${email}>`, subject, body: message }) } catch (e) { console.error('draft error:', e.message) } }
  const sendDirect = AUTO && !risky && draft

  // 1) Reply to the sender
  if (sendDirect) {
    await sendMail({ to: email, subject: `Re: ${subject}`, text: draft, replyTo: STAFF })
  } else {
    await sendMail({
      to: email, subject: `We received your message: ${subject}`, replyTo: STAFF,
      text: `Hello ${name || ''},\n\nThank you for contacting NAKAJAH Care Foundation. We have received your message and a member of our team will reply within 24 hours.\n\n` +
        (risky ? EMERGENCY_NOTE + '\n\n' : '') + `With care,\nThe NAKAJAH Care Foundation Team`
    })
  }
  // 2) Notify the team, with the AI draft for approval
  await sendMail({
    to: STAFF, replyTo: email,
    subject: `${risky ? '[URGENT - SAFEGUARDING] ' : ''}${source}: ${subject}`,
    text: `From: ${name} <${email}>\nSource: ${source}\n${risky ? 'FLAGGED: possible safeguarding concern. No AI reply was sent. Please follow the child protection procedure and respond personally.\n' : sendDirect ? 'An AI reply was already sent to the sender (copy below).\n' : 'The sender received an acknowledgement. Suggested AI reply below for you to review, edit and send.\n'}\n---- MESSAGE ----\n${message}\n\n---- ${sendDirect ? 'SENT' : 'SUGGESTED'} REPLY ----\n${draft || '(none – write personally)'}\n`
  })
  return { risky, autoReplied: !!sendDirect }
}

/* ── POST /api/contact (website form) ───────────────────────── */
async function contact(req, res) {
  if (limited(ipOf(req), 'contact', 5, 60 * 60_000)) return json(res, 429, { error: 'Too many messages. Please try again later.' })
  const b = await readBody(req)
  if (b.website) return json(res, 200, { ok: true }) // honeypot
  const email = emailOf(b.email), name = clip(b.name, 80).trim(), message = clip(b.message, 4000).trim()
  if (!email || !name || message.length < 5) return json(res, 400, { error: 'Please fill in your name, a valid email and a message.' })
  const subject = clip(b.topic || 'Website enquiry', 100).replace(/[\r\n]+/g, ' ')
  try { const r = await handleInbound({ name, email, subject, message, source: 'Website form' }); json(res, 200, { ok: true, urgent: r.risky }) }
  catch (e) { console.error('contact error:', e.message); json(res, 502, { error: 'We could not send your message. Please email hello@nakajahcare.org.' }) }
}

/* ── POST /api/inbound-email (provider webhook → AI draft/reply) ───────────
   Point your email provider's inbound webhook here:  /api/inbound-email?secret=INBOUND_SECRET
   Accepts {from, subject, text} or {data:{from, subject, text}} (map other providers' fields to these). */
async function inbound(req, res, url) {
  if (!process.env.INBOUND_SECRET || url.searchParams.get('secret') !== process.env.INBOUND_SECRET) return json(res, 401, { error: 'unauthorized' })
  const raw = await readBody(req), b = raw.data || raw
  const email = emailOf(b.from), message = clip(b.text || b.body || '', 6000).trim(), subject = clip(b.subject || '(no subject)', 120).replace(/[\r\n]+/g, ' ')
  const auto = /no-?reply|mailer-daemon|postmaster|bounce|notification/i.test(email) || /auto-?submitted|bulk|auto-reply/i.test(JSON.stringify(b.headers || ''))
  if (!email || !message || email === OWN || auto) return json(res, 200, { ignored: true }) // avoids reply loops
  if (limited(email, 'inbound', 4, 24 * 60 * 60_000)) return json(res, 200, { ignored: 'rate-limited' })
  const name = (String(b.from).match(/^"?([^"<]+?)"?\s*</) || [])[1] || email.split('@')[0]
  try { json(res, 200, await handleInbound({ name, email, subject, message, source: 'Inbound email' })) }
  catch (e) { console.error('inbound error:', e.message); json(res, 502, { error: 'failed' }) }
}

/* ── static files (production) ───────────────────────── */
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' }
async function serve(req, res, url) {
  let p = path.join(DIST, decodeURIComponent(url.pathname))
  if (!p.startsWith(DIST)) { res.writeHead(403); return res.end() }
  try { var data = await readFile(p) } catch { p = path.join(DIST, 'index.html'); try { data = await readFile(p) } catch { res.writeHead(404); return res.end('Run "npm run build" first.') } }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream', 'Cache-Control': p.includes('/assets/') ? 'public,max-age=31536000,immutable' : 'no-cache' })
  res.end(data)
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  try {
    if (req.method === 'POST' && url.pathname === '/api/chat') return await chat(req, res)
    if (req.method === 'POST' && url.pathname === '/api/contact') return await contact(req, res)
    if (req.method === 'POST' && url.pathname === '/api/inbound-email') return await inbound(req, res, url)
    if (url.pathname === '/api/health') return json(res, 200, { ok: true, ai: aiEnabled, mail: !!process.env.RESEND_API_KEY, mode: AUTO ? 'auto' : 'draft' })
    if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'not found' })
    return await serve(req, res, url)
  } catch (e) { console.error(e.message); if (!res.headersSent) json(res, 400, { error: e.message }) }
}).listen(PORT, () => console.log(`NAKAJAH server on http://localhost:${PORT}  ai=${aiEnabled} mail=${!!process.env.RESEND_API_KEY} mode=${AUTO ? 'auto' : 'draft'}`))

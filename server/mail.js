import { appendFileSync } from 'node:fs'
import { esc } from './safety.js'

export const STAFF = process.env.STAFF_EMAIL || 'hello@nakajahcare.org'
export const FROM = process.env.MAIL_FROM || 'NAKAJAH Care Foundation <hello@nakajahcare.org>'

/** Sends through Resend. With no RESEND_API_KEY it logs to server/outbox.log so the flow can be tested safely. */
export async function sendMail({ to, subject, text, replyTo }) {
  const html = `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#16163a;white-space:pre-wrap">${esc(text)}</div>`
  if (!process.env.RESEND_API_KEY) {
    appendFileSync(new URL('./outbox.log', import.meta.url), `\n--- ${new Date().toISOString()}\nTO: ${to}\nSUBJECT: ${subject}\n${text}\n`)
    console.log(`[mail:mock] to=${to} subject="${subject}"`)
    return { mock: true }
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [to], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) })
  })
  if (!r.ok) throw new Error(`mail send failed: ${r.status} ${(await r.text()).slice(0, 200)}`)
  return r.json()
}

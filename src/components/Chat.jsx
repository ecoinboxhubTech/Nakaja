import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon, Mark } from './Shell.jsx'
import { ease } from './motion.jsx'

const HELLO = { role: 'assistant', content: 'Hi, I’m the NAKAJAH Assistant, an AI helper. Ask me about our programmes, volunteering, sponsoring a girl’s education or partnering with us.' }
const CHIPS = ['How can I volunteer?', 'What programmes do you run?', 'How do you keep children safe?', 'How can my school partner with you?']

export default function Chat({ open, setOpen, onUrgent }) {
  const [msgs, setMsgs] = useState([HELLO])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [urgent, setUrgent] = useState(false)
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs, busy, open])
  useEffect(() => { if (!open) return; const k = e => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [open, setOpen])

  async function send(t) {
    const q = (t ?? text).trim()
    if (!q || busy) return
    const next = [...msgs, { role: 'user', content: q }]
    setMsgs(next); setText(''); setBusy(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.slice(1) }) })
      const d = await r.json()
      if (d.urgent) setUrgent(true)
      setMsgs(m => [...m, { role: 'assistant', content: d.reply || d.error || 'Sorry, something went wrong.' }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'I can’t connect right now. Please email hello@nakajahcare.org and the team will help.' }])
    } finally { setBusy(false) }
  }

  return (<>
    <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Chat with NAKAJAH Assistant'} aria-expanded={open}
      className="fixed bottom-4 right-4 z-[55] inline-flex items-center gap-2 rounded-full bg-brand-500 p-3.5 text-sm font-bold text-white shadow-pink transition hover:bg-brand-600 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3">
      <Icon n={open ? 'close' : 'chat_bubble'} c="!text-[22px]" /><span className="hidden sm:inline">{open ? 'Close' : 'Ask NAKAJAH'}</span>
      {!open && <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3"><span className="absolute h-full w-full animate-ping rounded-full bg-sun-400" /><span className="relative h-3 w-3 rounded-full bg-sun-400" /></span>}
    </motion.button>

    <AnimatePresence>
      {open && (
        <motion.section role="dialog" aria-label="Chat with NAKAJAH Assistant" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: 0.3, ease }}
          className="fixed inset-x-3 bottom-20 top-20 z-[56] flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(22,22,58,.45)] ring-1 ring-ink-200 sm:inset-x-auto sm:right-5 sm:top-auto sm:h-[34rem] sm:max-h-[calc(100vh-8rem)] sm:w-[24rem]">
          <header className="flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-400 px-4 py-3.5 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white"><Mark size={30} /></span>
            <div className="flex-1 leading-tight"><b className="block text-sm">NAKAJAH Assistant</b><span className="flex items-center gap-1.5 text-[11px] text-white/80"><i className="h-1.5 w-1.5 rounded-full bg-mint-500" />AI helper · replies instantly</span></div>
            <button onClick={onUrgent} className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold hover:bg-white/25">Urgent help</button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-ink-100/40 px-4 py-4" aria-live="polite">
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'rounded-br-md bg-brand-500 text-white' : 'rounded-bl-md bg-white text-ink shadow-sm ring-1 ring-ink-200'}`}>{m.content}</p>
              </motion.div>))}
            {msgs.length === 1 && <div className="flex flex-wrap gap-2 pt-1">{CHIPS.map(c => <button key={c} onClick={() => send(c)} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-600 ring-1 ring-brand-200 transition hover:bg-brand-50">{c}</button>)}</div>}
            {urgent && <div className="rounded-2xl bg-sun-100 p-3 text-xs leading-relaxed"><b>Need help right now?</b> Call <b>112</b> (Nigeria) or tell a trusted adult. <button onClick={onUrgent} className="font-bold text-brand-600 underline">More ways to get help</button></div>}
            {busy && <div className="flex justify-start"><span className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-ink-200">{[0, 1, 2].map(i => <motion.i key={i} className="h-2 w-2 rounded-full bg-brand-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />)}</span></div>}
            <div ref={end} />
          </div>

          <form onSubmit={e => { e.preventDefault(); send() }} className="border-t border-ink-200 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full bg-ink-100 py-1.5 pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-brand-300">
              <input value={text} onChange={e => setText(e.target.value)} maxLength={500} placeholder="Type your question…" aria-label="Your message" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400" />
              <button disabled={busy || !text.trim()} aria-label="Send" className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white transition enabled:hover:bg-brand-600 disabled:opacity-40"><Icon n="arrow_upward" c="!text-[18px]" /></button>
            </div>
            <p className="mt-2 text-center text-[10px] leading-tight text-ink-400">AI-generated answers may be incomplete. Please don’t share personal details. For anything sensitive, contact our team.</p>
          </form>
        </motion.section>)}
    </AnimatePresence>
  </>)
}

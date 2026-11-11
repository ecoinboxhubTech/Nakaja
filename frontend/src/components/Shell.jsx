import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { NAV } from '../data.js'
import { Reveal, Tap, ease } from './motion.jsx'

export const Icon = ({ n, c = '' }) => <span className={`ms ${c}`} data-i={n} aria-hidden="true" />

/** Heart-in-hands ring mark used beside the wordmark. */
export const Mark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <defs><linearGradient id="mk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ec1c8c" /><stop offset="1" stopColor="#4aa8e8" /></linearGradient></defs>
    <circle cx="24" cy="24" r="21" fill="#fff" stroke="url(#mk)" strokeWidth="4" />
    <path d="M24 33c-7-5-6-12-1.5-12 2 0 3 1.6 3 1.6s1-1.6 3-1.6C33 21 31 28 24 33z" fill="#ffbd3d" />
    <path d="M10 28c3 7 9 10 14 10s11-3 14-10" fill="none" stroke="#ec1c8c" strokeWidth="3" strokeLinecap="round" />
  </svg>)

export const Logo = ({ light }) => (
  <a href="#home" className="flex items-center gap-2.5" aria-label="Nakajah Care Foundation – home">
    <Mark />
    <span className="leading-none">
      <span className="block text-[22px] font-extrabold tracking-tight text-brand-500">NAKAJAH</span>
      <span className={`block text-[10px] font-bold tracking-[.18em] ${light ? 'text-sky-400' : 'text-sky-500'}`}>CARE FOUNDATION</span>
    </span>
  </a>)

/** Large circular badge: curved wordmark over a rainbow with two hearts. */
export const Badge = ({ className = '' }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="NAKAJAH logo">
    <circle cx="120" cy="120" r="118" fill="#fff" />
    <defs><path id="arc" d="M34 128 A86 86 0 0 1 206 128" /></defs>
    <text fontSize="30" fontWeight="800" fill="#ec1c8c" letterSpacing="4"><textPath href="#arc" startOffset="50%" textAnchor="middle">NAKAJAH</textPath></text>
    <path d="M52 188a68 68 0 0 1 136 0" fill="none" stroke="#ec1c8c" strokeWidth="22" strokeLinecap="round" />
    <path d="M80 190c-14-12-9-27 3-27 8 0 12 7 12 7s-5-18 10-18c14 0 14 14 5 24l-12 14z" fill="#4aa8e8" transform="translate(4 -6)" />
    <path d="M108 196c-12-10-6-24 5-24 7 0 7 6 7 6s0-6 7-6c11 0 15 14 3 24l-10 9z" fill="#ffbd3d" transform="translate(0 4)" />
  </svg>)

export function Header({ active, onSupport }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  // lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const k = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', k) }
  }, [open])
  return (<>
    <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-300 to-sky-400" />
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-4 pr-2 ring-1 backdrop-blur-xl transition-all duration-300 md:pl-6 md:pr-3 ${scrolled ? 'bg-white/90 shadow-[0_12px_40px_-16px_rgba(22,22,58,.35)] ring-ink-200/70' : 'bg-white/60 ring-white/60'}`}>
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map(([k, l]) => (
            <a key={k} href={`#${k}`} className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === k ? 'text-brand-600' : 'text-ink-500 hover:text-ink'}`}>
              {active === k && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-brand-50" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{l}</span>
            </a>))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onSupport} className="btn btn-soft hidden !px-5 !py-2.5 md:inline-flex"><Icon n="support_agent" c="!text-[18px] text-brand-500" />Get support</button>
          <Tap href="#contact" className="btn btn-pink hidden !px-5 !py-2.5 md:inline-flex">Partner with us</Tap>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition active:scale-90 lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <span className="flex w-5 flex-col gap-[5px]"><i className="block h-0.5 rounded bg-white" /><i className="block h-0.5 w-3/4 self-end rounded bg-white" /></span>
          </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-white lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 36px) 36px)' }} exit={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }} transition={{ duration: 0.55, ease }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
          <div className="relative flex items-center justify-between px-5 py-4">
            <Logo />
            <button className="grid h-11 w-11 place-items-center rounded-full bg-ink-100 transition active:scale-90" aria-label="Close menu" onClick={() => setOpen(false)}><Icon n="close" /></button>
          </div>
          <nav className="relative flex-1 px-5 pt-4" aria-label="Mobile">
            {NAV.map(([k, l], i) => (
              <motion.a key={k} href={`#${k}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + i * 0.06, duration: 0.5, ease }}
                className="group flex items-center justify-between border-b border-ink-200/70 py-4">
                <span className="flex items-baseline gap-4"><span className="text-xs font-extrabold text-brand-400">0{i + 1}</span>
                  <span className={`text-[28px] font-extrabold leading-none tracking-tight ${active === k ? 'text-brand-500' : 'text-ink'}`}>{l}</span></span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-100 text-ink transition group-active:bg-brand-500 group-active:text-white"><Icon n="arrow_outward" c="!text-[18px]" /></span>
              </motion.a>))}
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease }} className="relative space-y-3 px-5 pb-8 pt-6">
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-pink w-full !py-4 text-base">Partner with us <Icon n="arrow_forward" c="!text-[20px]" /></a>
            <button onClick={() => { setOpen(false); onSupport() }} className="btn btn-soft w-full !py-4 text-base"><Icon n="support_agent" c="!text-[20px] text-brand-500" />Get support</button>
            <a href="mailto:hello@nakajahcare.org" className="flex items-center justify-center gap-2 pt-2 text-sm font-semibold text-ink-500"><Icon n="mail" c="!text-[18px] text-brand-400" />hello@nakajahcare.org</a>
          </motion.div>
        </motion.div>)}
    </AnimatePresence>
  </>)
}

export const Footer = () => (
  <footer className="relative overflow-hidden bg-ink text-white">
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
    <div className="wrap relative grid gap-10 py-16 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="inline-block rounded-2xl bg-white px-4 py-3"><Logo /></div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">Creating safe and nurturing spaces where children, women and young people are heard, protected, mentored and supported to grow. Hope. Accessible. Future-positive.</p>
        <ul className="mt-5 space-y-2 text-sm text-white/80">
          <li className="flex items-center gap-2"><Icon n="mail" c="!text-[18px] text-brand-300" />hello@nakajahcare.org</li>
          <li className="flex items-center gap-2"><Icon n="location_on" c="!text-[18px] text-brand-300" />Nigeria · Working across communities in Africa</li>
        </ul>
        <div className="mt-5 flex gap-2">{['Fb', 'Ig', 'X', 'In'].map(s => <a key={s} href="#contact" aria-label={s} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold transition hover:bg-brand-500">{s}</a>)}</div>
      </div>
      <div className="md:col-span-3"><h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">Explore</h4>
        <ul className="space-y-2.5 text-sm">{NAV.map(([k, l]) => <li key={k}><a href={`#${k}`} className="text-white/80 transition hover:text-brand-300">{l}</a></li>)}</ul></div>
      <div className="md:col-span-4"><h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">Our promise</h4>
        <p className="text-sm leading-relaxed text-white/70">Every child, every woman and every young person deserves a safe space. We treat safeguarding as the foundation of everything we do.</p>
        <a href="#faq" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-300 hover:text-brand-200">Read our safeguarding FAQ <Icon n="arrow_forward" c="!text-[18px]" /></a></div>
    </div>
    <div className="relative border-t border-white/10 py-5">
      <div className="wrap flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
        <span>© {new Date().getFullYear()} NAKAJAH Care Foundation. All rights reserved. Built with care for young people.</span>
        <span className="flex gap-4"><a href="#contact" className="hover:text-white">Privacy</a><a href="#contact" className="hover:text-white">Safety Policy</a><a href="#faq" className="hover:text-white">Child Protection Statement</a></span>
      </div>
    </div>
  </footer>)

/** Floating help button + safe-support panel. */
export function Support({ open, setOpen }) {
  return (<>
    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-[90] grid place-items-end bg-ink/50 p-4 backdrop-blur-sm sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
        <motion.div role="dialog" aria-modal="true" aria-label="Get support" onClick={e => e.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ ease, duration: 0.35 }}
          className="w-full max-w-md rounded-3xl bg-white p-7 shadow-soft">
          <div className="flex items-start justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-500"><Icon n="favorite" /></div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-ink-100"><Icon n="close" c="!text-[20px]" /></button></div>
          <h3 className="mt-4 text-2xl font-extrabold">You are not alone.</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">Whether you are a young person, a parent or a teacher, you can reach out safely and confidentially.</p>
          <div className="mt-5 rounded-2xl bg-sun-100 p-4 text-sm"><b className="text-ink">In immediate danger?</b> Contact local emergency services first — <b>112</b> in Nigeria.</div>
          <div className="mt-4 grid gap-2.5">
            <a href="mailto:hello@nakajahcare.org?subject=I%20need%20support" className="btn btn-pink"><Icon n="mail" c="!text-[18px]" />Email our support team</a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-soft">Send a confidential message</a>
          </div>
          <p className="mt-4 text-center text-xs text-ink-400">We respond within 24 hours. Your privacy is respected.</p>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>)
}

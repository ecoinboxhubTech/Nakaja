import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { NAV } from '../data.js'
import { Reveal, Tap, ease } from './motion.jsx'

export const Icon = ({ n, c = '' }) => <span className={`ms ${c}`} aria-hidden="true">{n}</span>
export const Link = ({ to, children, className = '', ...p }) => <a href={`#${to}`} className={className} {...p}>{children}</a>

const Logo = ({ light }) => (
  <Link to="home" className="group flex items-center gap-3">
    <motion.span whileHover={{ rotate: 12, scale: 1.08 }} transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      className="grid h-10 w-10 place-items-center rounded-full bg-primary-container ring-2 ring-secondary-container/30"><Icon n="spa" c="text-secondary-container" /></motion.span>
    <span className={`font-display text-2xl font-semibold tracking-tight ${light ? 'text-white' : 'text-primary'}`}>NAKAJAH</span>
  </Link>)

export function Header({ page }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <motion.header initial={{ y: -90 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }}
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-surface/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(20,66,45,.25)]' : 'bg-transparent'}`}>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-secondary via-tertiary-container to-secondary" />
      <div className={`wrap flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
        <Logo />
        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/60 p-1.5 ring-1 ring-primary/5 backdrop-blur">
          {NAV.map(([k, l]) => (
            <Link key={k} to={k} className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${page === k ? 'text-white' : 'text-on-variant hover:text-primary'}`}>
              {page === k && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{l}</span>
            </Link>))}
        </nav>
        <div className="flex items-center gap-3">
          <Tap href="#contact" className="btn btn-accent !py-3 hidden sm:inline-flex">Partner with us <Icon n="favorite" c="!text-[18px]" /></Tap>
          <motion.button whileTap={{ scale: 0.88 }} className="lg:hidden grid h-11 w-11 place-items-center rounded-full bg-white/70 ring-1 ring-primary/10" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><Icon n={open ? 'close' : 'menu'} /></motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}
          className="lg:hidden overflow-hidden border-t border-primary/10 bg-surface/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV.map(([k, l], i) => (
              <motion.div key={k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.06, ease }}>
                <Link to={k} onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-base ${page === k ? 'bg-secondary-container/60 font-bold text-primary' : 'font-semibold text-on-variant'}`}>{l}</Link>
              </motion.div>))}
            <Link to="contact" onClick={() => setOpen(false)} className="btn btn-accent mt-2">Partner with us</Link>
          </div>
        </motion.nav>}
      </AnimatePresence>
    </motion.header>)
}

export const Footer = () => (
  <footer className="relative mt-10 overflow-hidden bg-primary text-white grain">
    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-semibold leading-none text-white/[.04]">NAKAJAH</div>
    <div className="wrap relative py-16 grid gap-10 md:grid-cols-3">
      <Reveal><Logo light /><p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-fixed/80">Creating safe and nurturing spaces where children, women and young people are heard, protected, mentored, educated and empowered.</p></Reveal>
      <Reveal delay={0.1}><h4 className="font-bold mb-3">Explore</h4><ul className="space-y-2 text-sm text-primary-fixed/80">{NAV.map(([k, l]) => <li key={k}><Link to={k} className="inline-block transition-all hover:translate-x-1 hover:text-white">{l}</Link></li>)}</ul></Reveal>
      <Reveal delay={0.2}><h4 className="font-bold mb-3">Get in touch</h4><ul className="space-y-2 text-sm text-primary-fixed/80"><li>hello@nakajah.org</li><li>Lagos, Nigeria</li></ul></Reveal>
    </div>
    <div className="relative border-t border-white/10 py-5 text-center text-xs text-primary-fixed/70">© {new Date().getFullYear()} NAKAJAH. All rights reserved.</div>
  </footer>)

export const Banner = () => (
  <section className="wrap py-14">
    <Reveal y={50}>
      <div className="grain relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary via-primary-container to-primary p-8 md:p-16 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div animate={{ scale: [1, 1.25, 1], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-tertiary-container/40 blur-3xl" />
        <h2 className="relative max-w-2xl font-display text-3xl md:text-5xl font-semibold leading-tight">Together, we can create safer spaces, stronger children, and a <em className="text-secondary-container">brighter future.</em></h2>
        <Tap href="#contact" className="btn btn-accent relative whitespace-nowrap">Partner with us <Icon n="arrow_forward" c="!text-[20px]" /></Tap>
      </div>
    </Reveal>
  </section>)

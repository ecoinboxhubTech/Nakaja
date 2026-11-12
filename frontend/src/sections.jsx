import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Icon, Badge } from './components/Shell.jsx'
import { Reveal, Stagger, Item, Words, Counter, Tap, Tilt, ease } from './components/motion.jsx'
import { PROGRAMS, STATS, STEPS, VALUES, WAYS, FAQ, TONES, GALLERY } from './data.js'

const Head = ({ eyebrow, children, sub, center = true }) => (
  <Reveal className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className="h2 mt-3">{children}</h2>
    {sub && <p className="mt-4 text-lg leading-relaxed text-ink-500">{sub}</p>}
  </Reveal>)

/* ───────────── HERO ───────────── */
export function Hero({ onSupport }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 70])
  const yA = useTransform(scrollYProgress, [0, 1], [0, 140])
  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-[#fff7fb]">
      <motion.div style={{ y: yA }} className="absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-brand-200/60 blur-3xl" />
      <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-sky-100 blur-3xl" />
      <div className="dots absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="wrap relative grid items-center gap-14 pb-14 pt-28 sm:pt-32 lg:grid-cols-12 lg:pb-24 lg:pt-36">
        <div className="flex flex-col gap-6 sm:gap-7 lg:col-span-7">
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-brand-600 shadow-soft ring-1 ring-brand-100">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" /></span>
            Creating safe spaces since 2018 · Nigeria · Africa
          </motion.span>
          <h1 className="text-[2.15rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
            <Words text="Nobody should" delay={0.1} className="block" />
            <Words text="have to guess" delay={0.35} className="block" wordClass="grad" />
            <Words text="their way through" delay={0.6} className="block" />
            <Words text="growing up." delay={0.85} className="block" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="max-w-xl text-lg leading-relaxed text-ink-500">
            NAKAJAH Care Foundation creates safe and nurturing spaces where children, women and young people are heard, protected, mentored and supported to grow.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="flex flex-col gap-3 sm:flex-row">
            <Tap href="#contact" className="btn btn-pink !py-4">Partner with us <Icon n="arrow_forward" c="!text-[20px]" /></Tap>
            <Tap as="button" onClick={onSupport} className="btn btn-soft !py-4"><Icon n="support_agent" c="!text-[20px] text-brand-500" />Get support</Tap>
          </motion.div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-2 grid max-w-lg grid-cols-3 gap-4 border-t border-ink-200 pt-6">
            {[['1,000+', 'mentored'], ['5,000', 'girls reached'], ['300+', 'women empowered']].map(([v, l]) => <div key={l}><dt className="text-2xl font-extrabold text-ink sm:text-3xl">{v}</dt><dd className="text-xs font-semibold text-ink-400">{l}</dd></div>)}
          </motion.dl>
        </div>

        <motion.div style={{ y }} className="lg:col-span-5" initial={{ opacity: 0, scale: 0.94, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease }}>
          <div className="relative mx-auto max-w-[26rem] pb-6 pl-6 pr-4 pt-6">
            <div className="absolute inset-0 -rotate-3 rounded-[2.8rem] bg-gradient-to-br from-brand-400 to-sky-400 opacity-80" />
            <img src="/img/founder.jpg" alt="Dr. Lilian Odinakachi Onyeizu, founder of NAKAJAH Care Foundation" width="462" height="361" fetchpriority="high" decoding="async" className="relative aspect-[4/4.7] w-full rounded-[2.4rem] object-cover object-top shadow-soft ring-4 ring-white" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-2 bottom-24 w-28 rounded-full shadow-[0_20px_50px_-12px_rgba(236,28,140,.55)] ring-4 ring-white sm:-left-8 sm:w-32"><Badge className="w-full" /></motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-1 right-0 w-20 rotate-6 overflow-hidden rounded-xl shadow-soft ring-2 ring-white sm:-right-4 sm:w-24"><img src="/img/book.jpg" alt="" width="238" height="312" className="w-full" /></motion.div>
            <div className="absolute inset-x-10 bottom-0 flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur sm:inset-x-14">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white"><Icon n="shield_with_heart" /></span>
              <span className="text-sm font-bold leading-tight">Safe • Heard • Protected<span className="block text-xs font-medium text-ink-500">Child-safe by design</span></span>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} className="absolute right-0 top-1/2 hidden items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-white shadow-soft sm:flex lg:-right-6">
              <Icon n="diversity_1" c="text-brand-300" /><span className="text-sm font-bold leading-tight">Mentorship<span className="block text-xs font-medium text-white/60">Guidance that lasts</span></span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>)
}

export const Marquee = () => {
  const words = ['Mentorship', 'Advocacy', 'Education', 'Protection', 'Empowerment', 'Hope', 'Leadership', 'Safe Spaces']
  return (
    <div className="overflow-hidden bg-ink py-5" aria-hidden="true">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => <span key={i} className="flex items-center gap-10 text-xl font-extrabold tracking-tight text-white/90 md:text-2xl">{w}<span className="h-2 w-2 rounded-full bg-brand-500" /></span>)}
      </div>
    </div>)
}

/* ───────────── WHAT WE DO (bento) ───────────── */
const BENTO = [
  'lg:col-span-2 bg-gradient-to-br from-brand-500 to-brand-700 text-white ring-0 shadow-pink',
  '',
  '',
  'lg:col-span-2 bg-ink text-white ring-0',
  '',
  'lg:col-span-2 bg-gradient-to-br from-sky-100 to-brand-50 ring-brand-100'
]
export function Programs() {
  return (
    <section id="programs" className="bg-white py-16 md:py-28">
      <div className="wrap">
        <Reveal className="mb-12 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8"><span className="eyebrow">What we do</span>
            <h2 className="h2 mt-3 lg:!text-6xl">Spaces where young people can actually <span className="grad">breathe, grow and belong.</span></h2></div>
          <p className="text-lg leading-relaxed text-ink-500 lg:col-span-4">Six programmes, one promise: every child, woman and young person is heard, protected, mentored, educated and supported to grow.</p>
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5" gap={0.08}>
          {PROGRAMS.map(([t, ic, tone, d, tags], i) => {
            const dark = i === 0 || i === 3
            return (
              <Item key={t} className={BENTO[i].includes('col-span-2') ? 'lg:col-span-2' : ''}>
                <article className={`card group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden !p-7 md:!p-8 ${BENTO[i].replace('lg:col-span-2', '')}`}>
                  <span className={`pointer-events-none absolute -right-3 -top-6 select-none text-[8rem] font-extrabold leading-none ${dark ? 'text-white/10' : 'text-ink/[.05]'}`}>0{i + 1}</span>
                  <div className="relative">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${dark ? 'bg-white/15 text-white' : TONES[tone][0] + ' ' + TONES[tone][1]}`}><Icon n={ic} c="!text-[28px]" /></span>
                    <h3 className="mt-6 max-w-sm text-xl font-extrabold leading-snug md:text-2xl">{t}</h3>
                    <p className={`mt-3 max-w-md text-sm leading-relaxed ${dark ? 'text-white/75' : 'text-ink-500'}`}>{d}</p>
                  </div>
                  <div className="relative mt-6 flex items-end justify-between gap-3">
                    <ul className="flex flex-wrap gap-2">{tags.map(x => <li key={x} className={`rounded-full px-3 py-1 text-[11px] font-semibold ${dark ? 'bg-white/15 text-white' : 'bg-ink-100 text-ink-500'}`}>{x}</li>)}</ul>
                    <a href="#contact" aria-label={`Learn more about ${t}`} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition group-hover:rotate-45 ${dark ? 'bg-white text-brand-600' : 'bg-ink text-white group-hover:bg-brand-500'}`}><Icon n="arrow_upward" c="!text-[20px]" /></a>
                  </div>
                </article>
              </Item>)
          })}
        </Stagger>
      </div>
    </section>)
}

/* ───────────── GALLERY ───────────── */
export function Gallery() {
  const [cat, setCat] = useState(GALLERY[0].id)
  const [sel, setSel] = useState(null) // index of the open photo
  const c = GALLERY.find(x => x.id === cat)
  const photos = c.photos
  const close = useCallback(() => setSel(null), [])
  const step = useCallback(d => setSel(i => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length])
  useEffect(() => {
    if (sel === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const k = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', k)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', k) }
  }, [sel, close, step])
  const p = sel === null ? null : photos[sel]
  return (
    <section id="gallery" className="bg-white py-16 md:py-28">
      <div className="wrap">
        <Reveal className="mb-10 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8"><span className="eyebrow">Gallery</span>
            <h2 className="h2 mt-3 lg:!text-6xl">Moments from the <span className="grad">work we do.</span></h2></div>
          <p className="text-lg leading-relaxed text-ink-500 lg:col-span-4">A look at our outreach programmes: the girls, the classrooms and the communities we show up for.</p>
        </Reveal>
        <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Gallery categories">
          {GALLERY.map(({ id, label, icon, photos: ph }) => (
            <button key={id} role="tab" aria-selected={cat === id} onClick={() => { setCat(id); setSel(null) }}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${cat === id ? 'bg-brand-500 text-white shadow-pink' : 'bg-ink-100 text-ink-500 hover:bg-brand-50 hover:text-brand-600'}`}>
              <Icon n={icon} c="!text-[18px]" />{label}<span className={`text-xs ${cat === id ? 'text-white/70' : 'text-ink-400'}`}>{ph.length || 'soon'}</span>
            </button>))}
        </div>
        <p className="mb-6 max-w-2xl text-ink-500">{c.blurb}</p>
        {photos.length ? (
          <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
            {photos.map((ph, i) => (
              <button key={ph.src} onClick={() => setSel(i)} aria-label={`Open photo: ${ph.alt}`} className="group relative mb-3 block w-full overflow-hidden rounded-2xl bg-ink-100 ring-1 ring-ink-200 md:mb-4">
                <img src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} loading="lazy" decoding="async" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white text-ink opacity-0 transition group-hover:opacity-100"><Icon n="zoom_in" c="!text-[20px]" /></span>
              </button>))}
          </div>
        ) : (
          <div className="grid place-items-center rounded-3xl bg-brand-50/60 px-6 py-16 text-center ring-1 ring-brand-100">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-500 shadow-soft"><Icon n="photo_library" c="!text-[28px]" /></span>
            <h3 className="mt-4 text-xl font-extrabold">Photos coming soon</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-500">We’re putting together pictures from {c.label.toLowerCase()}. Check back shortly.</p>
          </div>)}
      </div>

      <AnimatePresence>
        {p && (
          <motion.div role="dialog" aria-modal="true" aria-label={p.alt} className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <div className="flex items-center justify-between px-4 py-3 text-white" onClick={e => e.stopPropagation()}>
              <span className="text-sm font-semibold text-white/70">{c.label} · {sel + 1} / {photos.length}</span>
              <button onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><Icon n="close" /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-16">
              {photos.length > 1 && <button onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous photo" className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 md:left-5"><Icon n="chevron_left" /></button>}
              <motion.img key={p.src} src={p.src} alt={p.alt} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()} className="max-h-full max-w-full rounded-xl object-contain shadow-soft" />
              {photos.length > 1 && <button onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next photo" className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/30 md:right-5"><Icon n="chevron_right" /></button>}
            </div>
            <p className="px-6 pb-5 text-center text-sm text-white/70" onClick={e => e.stopPropagation()}>{p.alt}</p>
          </motion.div>)}
      </AnimatePresence>
    </section>)
}

/* ───────────── STATS ───────────── */
export const Stats = () => (
  <section className="px-3 py-2 md:px-6">
   <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-12 text-white shadow-pink md:rounded-[2.5rem] md:px-12 md:py-14">
    <div className="dots absolute inset-0 opacity-20" />
    <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
    <Stagger className="relative grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-5">
      {STATS.map(([v, l, s, ic]) => (
        <Item key={l} className="last:col-span-2 md:last:col-span-1">
          <Icon n={ic} c="!text-[26px] text-white/70" />
          <div className="mt-1 text-4xl font-extrabold tracking-tight md:text-5xl"><Counter value={v} /></div>
          <div className="mt-1 text-xs font-extrabold uppercase tracking-wider">{l}</div>
          <div className="mt-1 text-xs text-white/75">{s}</div>
        </Item>))}
    </Stagger>
   </div>
  </section>)

/* ───────────── ABOUT ───────────── */
const PILLARS = [['diversity_1', 'Mentorship'], ['shield_with_heart', 'Protection'], ['rocket_launch', 'Empowerment']]
export function About() {
  const [tab, setTab] = useState('mission')
  const T = {
    mission: ['Our Mission', 'To create safe and nurturing spaces where children, women and young people are heard, protected, mentored, educated and empowered with the knowledge, opportunities and confidence to thrive and transform their lives and communities.', 'Through mentorship, advocacy, education, protection and sustainable empowerment, we work to prevent violence, promote equality and ensure no one is left behind because of their circumstances.'],
    vision: ['Our Vision', 'To be a beacon of hope where every child is protected, every woman is empowered, every young person is equipped to succeed, and every community is inspired to build a future free from violence, inequality and poverty.', 'We measure success by new choices, new confidence and new futures.']
  }
  const [title, p1, p2] = T[tab]
  return (
    <section id="about" className="bg-gradient-to-b from-white to-brand-50/60 py-16 md:py-28">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <span className="eyebrow">About us</span>
          <h2 className="h2 mt-3 lg:!text-6xl">Our <span className="grad">story</span></h2>
          <p className="mt-6 text-xl font-semibold leading-snug text-ink md:text-2xl">“Our founder grew up believing mentorship was a privilege, not something every young person could count on. NAKAJAH exists so that stops being true.”</p>
          <p className="mt-5 leading-relaxed text-ink-500">What began as a handful of after-school conversations has grown into a movement of mentors, educators and advocates working together so that no child grows up guessing.</p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            {PILLARS.map(([ic, l]) => <div key={l} className="rounded-2xl bg-white p-4 text-center shadow-soft ring-1 ring-brand-100"><span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-500"><Icon n={ic} /></span><div className="mt-2 text-xs font-extrabold">{l}</div></div>)}
          </div>
          <div className="mt-6 flex gap-4 rounded-2xl bg-sky-100/70 p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-sky-500"><Icon n="verified_user" /></span>
            <p className="text-sm leading-relaxed text-ink-700"><b>Safe spaces first.</b> Every programme is built around psychological safety, confidentiality and youth voice, because growth only happens when you feel safe enough to ask questions.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-soft">
            <div className="flex gap-2 p-3" role="tablist">
              {[['mission', 'M', 'Mission'], ['vision', 'V', 'Vision']].map(([k, l, n]) => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative flex-1 rounded-full py-3 text-sm font-bold transition ${tab === k ? 'text-ink' : 'text-white/70 hover:text-white'}`}>
                  {tab === k && <motion.span layoutId="mv" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}<span className="relative">{n}</span>
                </button>))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="relative p-7 pt-5 md:p-10 md:pt-6">
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
                <h3 className="relative text-3xl font-extrabold">{title}</h3>
                <p className="relative mt-4 leading-relaxed text-white/85">{p1}</p>
                <p className="relative mt-4 text-sm leading-relaxed text-white/65">{p2}</p>
                <div className="relative mt-6 flex flex-wrap gap-2">{['Protected', 'Empowered', 'Equipped', 'Inspired'].map(t => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">{t}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>)
}

/* ───────────── JOURNEY (dark) ───────────── */
export function Journey() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white md:py-28">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" /><div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="wrap relative">
        <Reveal className="mb-10 max-w-2xl md:mb-14"><span className="eyebrow !text-brand-300">How it works</span>
          <h2 className="h2 mt-3 !text-white lg:!text-6xl">The NAKAJAH <span className="grad">journey</span></h2>
          <p className="mt-4 text-lg text-white/65">Five steps that take a young person from feeling unseen to leading others.</p></Reveal>
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {STEPS.map(([t, ic, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="min-w-[78%] snap-center sm:min-w-[45%] md:min-w-0">
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white/[.06] p-6 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 hover:ring-brand-400/60">
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-8xl font-extrabold text-white/[.06]">{i + 1}</span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 shadow-pink"><Icon n={ic} /></span>
                <h3 className="relative mt-5 text-xl font-extrabold">{t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">{d}</p>
              </div>
            </Reveal>))}
        </div>
      </div>
    </section>)
}

/* ───────────── VALUES ───────────── */
export function Values() {
  const [sel, setSel] = useState(0)
  const v = VALUES[sel]
  return (
    <section id="values" className="relative overflow-hidden bg-brand-50/60 py-16 md:py-28">
      <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-100 blur-3xl" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">The NAKAJAH way</span>
          <h2 className="h2 mt-3">Values that <span className="grad">grow with you.</span></h2>
          <p className="mt-4 text-ink-500">NAKAJAH is an acronym we live by. Each letter is a promise we make to every child, girl and young person who walks through our doors.</p>
          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Values">
            {VALUES.map(([l], i) => <button key={i} role="tab" aria-selected={sel === i} onClick={() => setSel(i)} className={`h-12 w-12 rounded-2xl text-lg font-extrabold transition ${sel === i ? 'bg-brand-500 text-white shadow-pink -translate-y-1' : 'bg-white text-brand-500 ring-1 ring-brand-100 hover:ring-brand-300'}`}>{l}</button>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-6 rounded-3xl bg-ink p-7 text-white shadow-soft">
              <div className="text-5xl font-extrabold text-brand-400">{v[0]}</div>
              <h3 className="mt-2 text-xl font-extrabold">{v[1]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{v[3]}</p>
            </motion.div>
          </AnimatePresence>
        </Reveal>
        <Stagger className="grid gap-3 lg:col-span-7" gap={0.07}>
          {VALUES.map(([l, t, d], i) => (
            <Item key={i}><button onClick={() => setSel(i)} className={`flex w-full items-center gap-5 rounded-2xl p-4 text-left transition ${sel === i ? 'bg-white shadow-soft ring-1 ring-brand-200' : 'hover:bg-white/70'}`}>
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-extrabold transition ${sel === i ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-500'}`}>{l}</span>
              <span><b className="block">{t}</b><span className="text-sm text-ink-500">{d}</span></span>
            </button></Item>))}
        </Stagger>
      </div>
    </section>)
}

/* ───────────── FOUNDER ───────────── */
export function Founder() {
  return (
    <section id="founder" className="bg-white py-16 md:py-28">
      <div className="wrap">
        <div className="grid items-center gap-10 rounded-[2.2rem] bg-gradient-to-br from-brand-50 to-white p-6 shadow-soft ring-1 ring-brand-100 md:p-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gradient-to-br from-brand-300 to-sky-400 opacity-70" />
              <img src="/img/founder.jpg" alt="Dr. Lilian Odinakachi Onyeizu, founder of NAKAJAH Care Foundation" width="462" height="361" loading="lazy" decoding="async" className="relative aspect-[4/4.4] w-full rounded-[1.8rem] object-cover object-top shadow-soft" />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur"><span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 text-xs font-extrabold text-white">PhD</span><span className="text-sm"><b>10+ Years</b><span className="block text-xs text-ink-500">Gender & Development across Africa</span></span></div>
              <span className="absolute -right-3 -top-3 rotate-6 rounded-xl bg-sun-400 px-3 py-1.5 text-[10px] font-extrabold uppercase leading-tight tracking-wider text-ink shadow-soft">Founder<br />Voice</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <span className="eyebrow">Meet the founder</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Dr. Lilian Odinakachi <span className="grad">Onyeizu, PhD</span></h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-sky-500">Gender & Development Consultant · Author · Mentor</p>
            <p className="mt-5 leading-relaxed text-ink-500">She leads NAKAJAH Care Foundation from a deeply held conviction that no child, woman, or young person should have their future limited by a lack of knowledge, guidance, protection, or opportunity.</p>
            <p className="mt-3 leading-relaxed text-ink-500">Driven by the belief that the right support, safe spaces and meaningful mentorship can change the direction of a life, she founded NAKAJAH to help people discover their worth, find their voice, make informed decisions and become active participants in transforming their own lives and communities.</p>
            <blockquote className="mt-6 flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-brand-100"><Icon n="format_quote" c="text-brand-400" /><p className="text-sm font-medium italic leading-relaxed text-ink-700">For Dr. Lilian, NAKAJAH is more than an organisation; it is a commitment to making hope accessible and ensuring that every individual has the opportunity to thrive.</p></blockquote>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[['school', 'PhD', 'Gender & Dev.'], ['menu_book', 'Author', 'I Know Me…'], ['diversity_1', 'Mentor', '1000+ youths']].map(([ic, a, b]) => <div key={a} className="rounded-2xl bg-white p-3 text-center ring-1 ring-ink-200"><Icon n={ic} c="text-brand-500" /><div className="text-sm font-extrabold">{a}</div><div className="text-[11px] text-ink-500">{b}</div></div>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>)
}

/* ───────────── BOOK ───────────── */
export function Book() {
  return (
    <section className="bg-white pb-16 md:pb-28">
      <div className="wrap">
        <Reveal><div className="relative grid items-center gap-8 overflow-hidden rounded-[2.2rem] bg-ink p-7 text-white shadow-soft md:grid-cols-12 md:p-12">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" /><div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <Tilt className="relative mx-auto w-48 md:col-span-3 md:w-full md:max-w-[220px]"><img src="/img/book.jpg" alt="Book cover: I Know Me. I Lead Me. I Choose Well. by Lilian Odinakachi Onyeizu" width="238" height="312" loading="lazy" decoding="async" className="rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/10" /></Tilt>
          <div className="relative md:col-span-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ring-1 ring-white/15"><Icon n="auto_stories" c="!text-[14px]" />Featured publication</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">I KNOW ME. I LEAD ME. <span className="text-brand-400">I CHOOSE WELL.</span></h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/75">A Girl’s Guide to Identity, Self-Leadership, Healthy Choices, Relationships, and Purpose. A reflective book that encourages readers to embrace self-awareness, develop self-leadership, and make intentional choices towards personal growth and well-being.</p>
            <p className="mt-2 text-sm text-white/50">By Lilian Odinakachi Onyeizu · For girls, by a mentor who gets it.</p>
            <div className="mt-5 flex flex-wrap gap-2">{['Identity', 'Self-Leadership', 'Healthy Choices', 'Relationships', 'Purpose'].map(t => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">{t}</span>)}</div>
            <Tap href="#contact" className="btn btn-pink mt-7">Enquire about the book <Icon n="arrow_forward" c="!text-[20px]" /></Tap>
          </div>
        </div></Reveal>
      </div>
    </section>)
}

/* ───────────── GET INVOLVED ───────────── */
const WAY_BG = { brand: 'bg-brand-50 hover:ring-brand-300', sky: 'bg-sky-100/70 hover:ring-sky-400', sun: 'bg-sun-100 hover:ring-sun-400', violet: 'bg-violet-100 hover:ring-violet-500' }
export function Involved() {
  return (
    <section className="bg-white py-16 md:py-28">
      <div className="wrap">
        <Reveal className="mb-10 grid items-end gap-5 lg:grid-cols-12"><div className="lg:col-span-8"><span className="eyebrow">Get involved</span>
          <h2 className="h2 mt-3 lg:!text-6xl">Four ways to <span className="grad">make a difference</span></h2></div>
          <p className="text-lg text-ink-500 lg:col-span-4">Every hour, every gift and every partnership means one more young person who does not have to guess.</p></Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {WAYS.map(([ic, t, d, tone], i) => (
            <Item key={t}><a href="#contact" className={`group flex h-full min-h-[16rem] flex-col justify-between rounded-3xl p-6 ring-1 ring-transparent transition duration-300 hover:-translate-y-1 hover:shadow-soft ${WAY_BG[tone]}`}>
              <div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm"><Icon n={ic} c={TONES[tone][1]} /></span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug">{t}</h3><p className="mt-2 text-sm leading-relaxed text-ink-500">{d}</p></div>
              <span className="mt-6 inline-flex items-center justify-between text-sm font-bold text-ink">Get started<span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition group-hover:bg-brand-500 group-hover:rotate-45"><Icon n="arrow_upward" c="!text-[18px]" /></span></span>
            </a></Item>))}
        </Stagger>
      </div>
    </section>)
}

/* ───────────── FAQ ───────────── */
export function Faq() {
  const [o, setO] = useState(0)
  return (
    <section id="faq" className="bg-ink-100/60 py-16 md:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Questions</span>
          <h2 className="h2 mt-3">Good to <span className="grad">know</span></h2>
          <p className="mt-4 text-ink-500">Straight answers about how we work and how we keep young people safe.</p>
          <div className="mt-6 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-brand-100"><b className="text-sm">Still have a question?</b><p className="mt-1 text-sm text-ink-500">Ask our AI assistant (bottom right) or send us a message.</p><a href="#contact" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-500">Contact us <Icon n="arrow_forward" c="!text-[18px]" /></a></div>
        </Reveal>
        <div className="space-y-3 lg:col-span-8">
          {FAQ.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.05}><div className={`rounded-2xl bg-white ring-1 transition ${o === i ? 'ring-brand-300 shadow-soft' : 'ring-ink-200'}`}>
              <button onClick={() => setO(o === i ? -1 : i)} aria-expanded={o === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold md:p-6">{q}
                <motion.span animate={{ rotate: o === i ? 45 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white"><Icon n="add" c="!text-[20px]" /></motion.span></button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${o === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 md:px-6 md:pb-6">{a}</p></div></div>
            </div></Reveal>))}
        </div>
      </div>
    </section>)
}

/* ───────────── CTA ───────────── */
export const Cta = () => (
  <section className="px-3 pb-6 pt-16 md:px-6 md:pt-24">
    <Reveal y={40}><div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 p-8 text-white shadow-pink md:flex-row md:items-center md:rounded-[2.5rem] md:p-14">
      <div className="dots absolute inset-0 opacity-20" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity }} className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
      <h2 className="relative max-w-2xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">Together, we can create safer spaces, stronger children, and a brighter future.</h2>
      <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Tap href="#contact" className="btn btn-white">Partner with us <Icon n="arrow_forward" c="!text-[20px]" /></Tap><Tap href="#programs" className="btn btn-line">See our work</Tap></div>
    </div></Reveal>
  </section>)

/* ───────────── CONTACT ───────────── */
export function Contact() {
  const [state, setState] = useState('idle') // idle | sending | sent | urgent | error
  const submit = async e => {
    e.preventDefault()
    const form = e.currentTarget, f = Object.fromEntries(new FormData(form))
    setState('sending')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'failed')
      setState(d.urgent ? 'urgent' : 'sent'); form.reset()
    } catch {
      // backend unavailable: fall back to the visitor's own email app so the message is never lost
      window.location.href = `mailto:hello@nakajahcare.org?subject=${encodeURIComponent('Website enquiry: ' + f.topic)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\n\n${f.message}`)}`
      setState('error')
    }
  }
  return (
    <section id="contact" className="px-3 py-16 md:px-6 md:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-ink p-6 text-white md:rounded-[2.5rem] md:p-12 lg:grid-cols-12">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
        <Reveal className="relative lg:col-span-5">
          <span className="eyebrow !text-brand-300">Contact</span>
          <h2 className="h2 mt-3 !text-white">Let’s build <span className="grad">safe spaces together</span></h2>
          <p className="mt-4 text-white/70">Whether you want to partner, volunteer, sponsor a child or get support, we’d love to hear from you. You’ll get an instant confirmation, and a team member follows up within 24 hours.</p>
          <ul className="mt-7 space-y-4">
            {[['mail', 'Email', 'hello@nakajahcare.org'], ['location_on', 'Based in', 'Nigeria · Working across communities in Africa'], ['schedule', 'Response time', 'Within 24 hours']].map(([ic, a, b]) => (
              <li key={a} className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-brand-300"><Icon n={ic} /></span><span className="text-sm"><b className="block text-[11px] uppercase tracking-wider text-white/50">{a}</b>{b}</span></li>))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="relative lg:col-span-7">
          <form onSubmit={submit} className="rounded-3xl bg-white p-6 text-ink shadow-soft md:p-8">
            <h3 className="text-xl font-extrabold">Send us a message</h3>
            <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-ink-500">Your name<input required name="name" maxLength={80} className="input mt-1.5" placeholder="Amina Yusuf" /></label>
              <label className="text-xs font-bold text-ink-500">Email<input required type="email" name="email" className="input mt-1.5" placeholder="you@email.com" /></label>
            </div>
            <label className="mt-4 block text-xs font-bold text-ink-500">I want to<select name="topic" className="input mt-1.5"><option>Partner with us</option><option>Volunteer as a mentor</option><option>Sponsor a girl’s education</option><option>Invite NAKAJAH to our school</option><option>Get support</option><option>Something else</option></select></label>
            <label className="mt-4 block text-xs font-bold text-ink-500">Message<textarea required name="message" rows="4" maxLength={4000} className="input mt-1.5 resize-none" placeholder="Tell us how you’d like to help or what support you need…" /></label>
            <button disabled={state === 'sending'} className="btn btn-pink mt-5 w-full disabled:opacity-60"><Icon n={state === 'sending' ? 'progress_activity' : 'send'} c="!text-[18px]" />{state === 'sending' ? 'Sending…' : 'Send message'}</button>
            <AnimatePresence>
              {state === 'sent' && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm font-semibold text-mint-500"><Icon n="check_circle" c="!text-[18px]" />Thank you! Check your inbox for a confirmation.</motion.p>}
              {state === 'urgent' && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl bg-sun-100 p-3 text-center text-sm">Thank you for telling us. A team member will contact you personally. <b>If you are in immediate danger, call 112 now.</b></motion.p>}
              {state === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-sm text-ink-500">We couldn’t reach our server, so we opened your email app instead.</motion.p>}
            </AnimatePresence>
            <p className="mt-3 text-center text-[11px] text-ink-400">We respect your privacy. No spam. Youth-safe, always.</p>
          </form>
        </Reveal>
      </div>
    </section>)
}

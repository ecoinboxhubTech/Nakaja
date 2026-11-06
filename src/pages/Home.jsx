import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon, Link, Banner } from '../components/Shell.jsx'
import { Reveal, Stagger, Item, Words, Counter, Tap, Tilt } from '../components/motion.jsx'
import { PROOF, PROGRAMS } from '../data.js'

const MARQUEE = ['Mentorship', 'Advocacy', 'Education', 'Protection', 'Empowerment', 'Hope']

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 90])
  const yBlobA = useTransform(scrollYProgress, [0, 1], [0, 160])
  const yBlobB = useTransform(scrollYProgress, [0, 1], [0, -100])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: yBlobA }} className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-secondary-container/60 blur-3xl" />
      <motion.div style={{ y: yBlobB }} className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-tertiary-fixed/50 blur-3xl" />
      <motion.div style={{ opacity: fade }} className="wrap relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7 flex flex-col gap-7">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-container/70 px-4 py-1.5 text-secondary ring-1 ring-secondary/10">
            <Icon n="verified_user" c="!text-[18px]" /><span className="text-xs font-bold uppercase tracking-wider">Mentorship · Protection · Empowerment</span>
          </motion.span>
          <h1 className="h1">
            <Words text="Safer spaces. Stronger children." delay={0.2} />
            <Words text="A brighter future." delay={0.65} className="block italic text-tertiary-container" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="max-w-xl text-lg leading-relaxed text-on-variant">
            NAKAJAH creates safe and nurturing spaces where children, women and young people are heard, protected, mentored, educated and empowered to thrive.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }} className="flex flex-wrap gap-4">
            <Tap href="#contact" className="btn btn-accent">Partner with us <Icon n="arrow_forward" c="!text-[20px]" /></Tap>
            <Tap href="#about" className="btn btn-ghost"><Icon n="explore" c="!text-[20px] text-secondary" />Our story</Tap>
          </motion.div>
        </div>

        <motion.div style={{ y: yArt }} className="lg:col-span-5" initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative">
            <div className="grain relative grid aspect-[4/5] place-items-center overflow-hidden rounded-t-full rounded-b-[2rem] bg-gradient-to-br from-primary-container to-primary shadow-2xl">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} className="absolute h-[120%] w-[120%] rounded-full border border-dashed border-secondary-container/20" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }} className="absolute h-[85%] w-[85%] rounded-full border border-secondary-container/15" />
              <motion.div animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
                <Icon n="spa" c="!text-[180px] text-secondary-container/40" />
              </motion.div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/15 p-5 text-white ring-1 ring-white/20 backdrop-blur-md">
                <div className="text-3xl font-extrabold"><Counter value="5,000" /></div><div className="text-sm">girls reached and counting</div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 top-1/4 hidden items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl sm:flex md:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary-container text-secondary"><Icon n="diversity_3" c="!text-[22px]" /></span>
              <span className="text-sm font-bold text-primary leading-tight">1,000+<span className="block text-xs font-medium text-on-variant">mentored</span></span>
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-3 top-12 hidden h-14 w-14 place-items-center rounded-full bg-tertiary-container text-white shadow-xl sm:grid md:-right-6">
              <Icon n="favorite" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>)
}

const Marquee = () => (
  <div className="overflow-hidden border-y border-primary/10 bg-primary py-4 text-primary-fixed" aria-hidden="true">
    <motion.div className="flex w-max gap-10" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
      {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
        <span key={i} className="flex items-center gap-10 font-display text-2xl italic">{w}<Icon n="spa" c="!text-[18px] text-secondary-container/60" /></span>))}
    </motion.div>
  </div>)

export default function Home() {
  return (<>
    <Hero />
    <Marquee />

    <section className="bg-surface-mid py-16"><div className="wrap">
      <Reveal><p className="eyebrow mb-8 justify-center w-full">Our impact</p></Reveal>
      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {PROOF.map(([n, l, i], k) => (
          <Item key={k} className={k === 4 ? 'col-span-2 md:col-span-1' : ''}>
            <Tilt className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-primary/5">
              <Icon n={i} c="text-secondary" /><div className="mt-2 text-3xl font-extrabold text-primary"><Counter value={n} /></div><div className="text-sm text-on-variant">{l}</div>
            </Tilt>
          </Item>))}
      </Stagger></div></section>

    <section className="wrap py-24">
      <Reveal className="mx-auto mb-14 max-w-3xl text-center"><p className="eyebrow">What we do</p><h2 className="h2 mt-3">Mentorship, advocacy, education, protection and empowerment</h2></Reveal>
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.slice(0, 3).map(([t, i, d], k) => (
          <Item key={t}><Tilt className="h-full"><div className="card group h-full overflow-hidden">
            <span className="absolute right-5 top-3 font-display text-7xl italic text-primary/[.06] transition-colors group-hover:text-secondary/20">0{k + 1}</span>
            <motion.span whileHover={{ rotate: -8, scale: 1.1 }} className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-secondary-container text-secondary"><Icon n={i} c="!text-[32px]" /></motion.span>
            <h3 className="relative text-xl font-bold text-primary">{t}</h3><p className="relative mt-2 text-sm leading-relaxed text-on-variant">{d}</p>
          </div></Tilt></Item>))}
      </Stagger>
      <Reveal className="mt-10 text-center"><Link to="programs" className="group inline-flex items-center gap-1 font-bold text-secondary hover:text-primary">See all programs <Icon n="arrow_forward" c="!text-[18px] transition-transform group-hover:translate-x-1" /></Link></Reveal>
    </section>

    <section className="wrap"><Reveal y={50}>
      <div className="grain relative grid gap-8 overflow-hidden rounded-[2rem] bg-primary p-8 text-white md:p-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7"><Icon n="format_quote" c="!text-5xl text-primary-fixed" />
          <p className="mt-3 font-display text-2xl font-medium leading-snug md:text-4xl">Our founder grew up believing mentorship was a privilege, not something every young person could count on. NAKAJAH exists, so that stops being true.</p>
          <Tap href="#about" className="btn btn-accent mt-8">Read our story</Tap></div>
        <Stagger gap={0.07} className="lg:col-span-5 grid grid-cols-4 gap-3">
          {'NAKAJAH'.split('').map((c, i) => (
            <Item key={i}><motion.div whileHover={{ y: -6, rotate: i % 2 ? 4 : -4, backgroundColor: 'rgba(176,241,205,.25)' }}
              className="grid aspect-square place-items-center rounded-2xl bg-white/10 font-display text-4xl font-semibold text-primary-fixed ring-1 ring-white/10">{c}</motion.div></Item>))}
          <div className="col-span-4 mt-2 text-sm text-primary-fixed/80">The NAKAJAH Way — seven values that guide everything we do.</div>
        </Stagger>
      </div></Reveal></section>
    <Banner />
  </>)
}

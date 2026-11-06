import { motion } from 'framer-motion'
import { Icon, Link, Banner } from '../components/Shell.jsx'
import { Reveal, Stagger, Item, Words, Counter, Tilt } from '../components/motion.jsx'
import { PROGRAMS, PROOF } from '../data.js'

export default function Programs() {
  return (<>
    <section className="wrap max-w-4xl py-16 md:py-24">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Our work</motion.p>
      <h1 className="h1 mt-4"><Words text="Programs that protect, educate and empower" delay={0.1} /></h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-8 text-lg leading-relaxed text-on-variant">
        Through mentorship, advocacy, education, protection and sustainable empowerment, we work to prevent violence, promote equality and equity, and ensure no one is left behind.</motion.p>
    </section>

    <Stagger className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PROGRAMS.map(([t, i, d], k) => (
        <Item key={t}><Tilt className="h-full"><article className="card group flex h-full flex-col overflow-hidden">
          <span className="absolute right-5 top-3 font-display text-7xl italic text-primary/[.06] transition-colors group-hover:text-secondary/20">0{k + 1}</span>
          <motion.span whileHover={{ rotate: -8, scale: 1.1 }} className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-secondary-container text-secondary"><Icon n={i} c="!text-[32px]" /></motion.span>
          <h2 className="relative text-xl font-bold text-primary">{t}</h2>
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-on-variant">{d}</p>
          <Link to="contact" className="relative mt-5 inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary">Get involved <Icon n="arrow_forward" c="!text-[16px] transition-transform group-hover:translate-x-1" /></Link>
        </article></Tilt></Item>))}
    </Stagger>

    <section className="wrap mt-20"><Reveal>
      <div className="rounded-[2rem] bg-surface-mid p-8 ring-1 ring-primary/5 md:p-12"><p className="eyebrow">Proof of impact</p>
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-5">{PROOF.map(([n, l], k) => (
          <div key={k}><div className="font-display text-4xl font-semibold text-primary"><Counter value={n} /></div><div className="mt-1 text-sm text-on-variant">{l}</div></div>))}</div>
      </div></Reveal></section>
    <Banner />
  </>)
}

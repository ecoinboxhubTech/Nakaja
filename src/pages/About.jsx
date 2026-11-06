import { motion } from 'framer-motion'
import { Icon, Banner } from '../components/Shell.jsx'
import { Reveal, Stagger, Item, Words, Tilt } from '../components/motion.jsx'
import { VALUES } from '../data.js'

export default function About() {
  return (<>
    <section className="wrap max-w-4xl py-16 md:py-24">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">About us</motion.p>
      <h1 className="h1 mt-4"><Words text="Our story" delay={0.1} /></h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-8 font-display text-2xl leading-relaxed text-on-variant md:text-3xl">
        Our founder grew up believing mentorship was a privilege, not something every young person could count on. NAKAJAH exists, so that stops being true.
      </motion.p>
    </section>

    <Stagger className="wrap grid gap-6 pb-10 md:grid-cols-2">
      <Item><div className="grain relative h-full overflow-hidden rounded-[2rem] bg-primary p-8 text-white md:p-12">
        <Icon n="flag" c="text-primary-fixed !text-4xl" /><h2 className="mt-4 font-display text-3xl font-semibold">Our Mission</h2>
        <p className="mt-4 leading-relaxed text-primary-fixed/90">To create safe and nurturing spaces where children, women, and young people are heard, protected, mentored, educated, and empowered with the knowledge, skills, opportunities, and confidence to thrive and transform their lives and communities. Through mentorship, advocacy, education, protection, and sustainable empowerment, we work to prevent violence, promote equality and equity, and ensure that no one is left behind because of their circumstances.</p></div></Item>
      <Item><div className="h-full rounded-[2rem] bg-secondary-container/60 p-8 ring-1 ring-secondary/10 md:p-12">
        <Icon n="visibility" c="text-secondary !text-4xl" /><h2 className="mt-4 font-display text-3xl font-semibold text-primary">Our Vision</h2>
        <p className="mt-4 leading-relaxed text-on-variant">To be a beacon of hope where every child is protected, every woman is empowered, every young person is equipped to succeed, and every community is inspired to build a future free from violence, inequality, and poverty.</p></div></Item>
    </Stagger>

    <section className="mt-10 bg-surface-low py-24"><div className="wrap">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center"><p className="eyebrow">Our values</p><h2 className="h2 mt-3">The NAKAJAH Way</h2></Reveal>
      <Stagger gap={0.07} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map(([l, t, d], i) => (
          <Item key={i}><Tilt className="h-full"><div className="card flex h-full gap-5">
            <motion.span whileHover={{ rotate: -8, scale: 1.1 }} className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-container font-display text-3xl font-semibold text-secondary-container">{l}</motion.span>
            <div><h3 className="text-lg font-bold text-primary">{t}</h3><p className="mt-1 text-sm leading-relaxed text-on-variant">{d}</p></div>
          </div></Tilt></Item>))}
      </Stagger></div></section>
    <Banner />
  </>)
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../components/Shell.jsx'
import { Reveal, Stagger, Item, Words, Tap, ease } from '../components/motion.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [focus, setFocus] = useState('Partnership')
  return (
    <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Contact us</motion.p>
        <h1 className="h1 mt-4"><Words text="Partner with us" delay={0.1} /></h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 text-lg leading-relaxed text-on-variant">
          Together, we can create safer spaces, stronger children, and a brighter future. Reach out to partner, volunteer, mentor or support our work.</motion.p>
        <Stagger className="mt-10 space-y-4">{[['mail', 'hello@nakajah.org'], ['location_on', 'Lagos, Nigeria'], ['schedule', 'We reply within 2 working days']].map(([i, t]) => (
          <Item key={t}><motion.div whileHover={{ x: 6 }} className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary-container text-secondary"><Icon n={i} c="!text-[22px]" /></span><span className="text-on-variant">{t}</span></motion.div></Item>))}</Stagger>
      </div>

      <Reveal delay={0.2} className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }} className="card py-20 text-center">
              <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.15 }} className="inline-block"><Icon n="check_circle" c="!text-7xl text-secondary" /></motion.span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-primary">Thank you!</h2><p className="mt-2 text-on-variant">Your message has been received. Our team will be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form key="form" exit={{ opacity: 0, y: -12 }} className="card space-y-5 !p-8 md:!p-10" onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <div><p className="mb-3 text-sm font-bold text-primary">I’d like to</p>
                <div className="flex flex-wrap gap-2">{['Partnership', 'Volunteer', 'Mentor', 'Donate'].map(o => (
                  <motion.button whileTap={{ scale: 0.94 }} type="button" key={o} onClick={() => setFocus(o)} className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${focus === o ? 'text-white' : 'bg-surface-mid text-on-variant hover:bg-surface-high'}`}>
                    {focus === o && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                    <span className="relative">{o}</span></motion.button>))}</div></div>
              <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Full name<input required className="input mt-1" /></label><label className="text-sm font-semibold">Email<input required type="email" className="input mt-1" /></label></div>
              <label className="block text-sm font-semibold">Organisation (optional)<input className="input mt-1" /></label>
              <label className="block text-sm font-semibold">Message<textarea required rows="5" className="input mt-1" /></label>
              <Tap as="button" className="btn btn-accent w-full sm:w-auto">Send message <Icon n="send" c="!text-[18px]" /></Tap>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>)
}

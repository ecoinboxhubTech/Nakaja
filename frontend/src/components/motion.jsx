import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]
export const spring = { type: 'spring', stiffness: 260, damping: 24 }

/** Fade/slide up when scrolled into view. */
export const Reveal = ({ children, delay = 0, y = 28, className = '', as = 'div', ...p }) => {
  const M = motion[as]
  return <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease, delay }} {...p}>{children}</M>
}

/** Staggered group; children use <Item/>. */
export const Stagger = ({ children, gap = 0.09, className = '', ...p }) => (
  <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }} {...p}>{children}</motion.div>)
export const Item = ({ children, className = '', ...p }) => (
  <motion.div className={className} variants={{ hidden: { opacity: 0, y: 32, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } }} {...p}>{children}</motion.div>)

/** Word-by-word headline reveal. `em` words are rendered via the className map. */
export const Words = ({ text, className = '', delay = 0, wordClass = '' }) => (
  <motion.span className={className} initial="hidden" animate="show" aria-label={text}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}>
    {text.split(' ').map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom pb-[.12em] -mb-[.12em]" aria-hidden="true">
        <motion.span className={`inline-block ${wordClass}`} variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}>{w}&nbsp;</motion.span>
      </span>))}
  </motion.span>)

/** Counts up to a number when visible. Non-numeric strings render as-is. */
export const Counter = ({ value, className = '' }) => {
  const ref = useRef(null)
  const m = /^([\d,]+)(\+?)$/.exec(value)
  const target = m ? parseInt(m[1].replace(/,/g, ''), 10) : 0
  const mv = useMotionValue(0)
  const sp = useSpring(mv, { stiffness: 60, damping: 20 })
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => { if (inView) mv.set(target) }, [inView, target, mv])
  useEffect(() => sp.on('change', v => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') + (m?.[2] || '') }), [sp])
  if (!m) return <span className={className}>{value}</span>
  return <span ref={ref} className={className}>{reduce ? value : '0'}</span>
}

/** Button/Link with magnetic hover + press feedback. */
export const Tap = ({ children, className = '', as = 'a', ...p }) => {
  const M = motion[as]
  return <M className={className} whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.96 }} transition={spring} {...p}>{children}</M>
}

/** Subtle 3D tilt card. */
export const Tilt = ({ children, className = '' }) => {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(y, { stiffness: 200, damping: 20 }), ry = useSpring(x, { stiffness: 200, damping: 20 })
  const move = e => { const r = e.currentTarget.getBoundingClientRect(); x.set(((e.clientX - r.left) / r.width - 0.5) * 8); y.set(-((e.clientY - r.top) / r.height - 0.5) * 8) }
  const leave = () => { x.set(0); y.set(0) }
  return <motion.div onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    whileHover={{ y: -6 }} transition={spring} className={className}>{children}</motion.div>
}

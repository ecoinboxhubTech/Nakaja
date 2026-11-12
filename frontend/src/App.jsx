import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Header, Footer, Support } from './components/Shell.jsx'
import Chat from './components/Chat.jsx'
import { Hero, Marquee, Programs, Gallery, Stats, About, Journey, Values, Founder, Book, Involved, Faq, Cta, Contact } from './sections.jsx'
import { NAV } from './data.js'

export default function App() {
  const [active, setActive] = useState('home')
  const [support, setSupport] = useState(false)
  const [chat, setChat] = useState(false)

  // scroll-spy: highlight the nav item for the section in view
  useEffect(() => {
    const ids = NAV.map(([k]) => k)
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach(id => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Header active={active} onSupport={() => setSupport(true)} />
      <main>
        <Hero onSupport={() => setSupport(true)} />
        <Marquee />
        <Programs />
        <Gallery />
        <Stats />
        <About />
        <Journey />
        <Values />
        <Founder />
        <Book />
        <Involved />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <Chat open={chat} setOpen={setChat} onUrgent={() => { setSupport(true) }} />
      <Support open={support} setOpen={setSupport} />
    </MotionConfig>)
}

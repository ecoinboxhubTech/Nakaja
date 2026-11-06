import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Header, Footer } from './components/Shell.jsx'
import { ease } from './components/motion.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Programs from './pages/Programs.jsx'
import Contact from './pages/Contact.jsx'

const pages = { home: Home, about: About, programs: Programs, contact: Contact }
const read = () => { const h = window.location.hash.replace('#', ''); return pages[h] ? h : 'home' }

export default function App() {
  const [page, setPage] = useState(read())
  useEffect(() => {
    const f = () => setPage(read())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  const Page = pages[page]
  return (
    <MotionConfig reducedMotion="user">
      <Header page={page} />
      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div key={page} initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }} transition={{ duration: 0.45, ease }}><Page /></motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>)
}

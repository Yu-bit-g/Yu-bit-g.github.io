import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Studies from './components/Studies.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash)
        if (target) {
          const html = document.documentElement
          const prev = html.style.scrollBehavior
          html.style.scrollBehavior = 'auto'
          target.scrollIntoView({ block: 'start' })
          html.style.scrollBehavior = prev
        }
      }, 80)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Studies />
        <Strengths />
        <Contact />
      </main>
    </>
  )
}
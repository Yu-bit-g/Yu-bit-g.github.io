import { useEffect, useState } from 'react'
import { site } from '../config.js'
import styles from './Navbar.module.css'

const links = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '项目' },
  { href: '#studies', label: 'AI 创作' },
  { href: '#strengths', label: '优势' },
  { href: '#contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1))
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)

      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className='container'>
        <div className={styles.inner}>
          <a className={styles.brand} href='#top'>
            <span className={styles.dot} aria-hidden='true' />
            {site.brand}
            <span className={styles.brandNote}>PORTFOLIO</span>
          </a>

          <nav className={styles.links} aria-label='主导航'>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href.slice(1) ? styles.active : ''}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a className={styles.cta} href='#contact'>
            联系我
          </a>
        </div>
      </div>
      <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden='true' />
    </header>
  )
}
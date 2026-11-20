import { useEffect, useRef, useState } from 'react'
import { site } from '../config.js'
import { pauseScroll, resumeScroll } from './SmoothScroll.jsx'
import MusicToggle from './decorations/MusicToggle.jsx'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const menuBtnRef = useRef(null)

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

  useEffect(() => {
    if (!menuOpen) return undefined
    pauseScroll()
    const html = document.documentElement
    html.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector('a')?.focus({ preventScroll: true })
    }, 80)
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      resumeScroll()
      html.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      menuBtnRef.current?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 861px)')
    const onChange = () => {
      if (query.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const current = (href) => (active === href.slice(1) ? 'location' : undefined)

  return (
    <>
      <header className={`${styles.nav} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
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
                  aria-current={current(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={styles.actions}>
              <MusicToggle />
              <a className={styles.cta} href='#contact'>
                联系我
              </a>
              <button
                ref={menuBtnRef}
                type='button'
                className={styles.menuBtn}
                aria-expanded={menuOpen}
                aria-controls='site-menu'
                aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span>{menuOpen ? '关闭' : '菜单'}</span>
                <span className={styles.menuBars} data-open={menuOpen || undefined} aria-hidden='true'>
                  <i />
                  <i />
                </span>
              </button>
            </div>
          </div>
        </div>
        <span className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden='true' />
      </header>

      <div
        id='site-menu'
        ref={menuRef}
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}
        role='dialog'
        aria-modal='true'
        aria-label='站点导航'
      >
        <div className={`container ${styles.menuInner}`}>
          <nav className={styles.menuLinks} aria-label='移动端导航'>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                style={{ '--i': index }}
                onClick={() => setMenuOpen(false)}
                aria-current={current(link.href)}
              >
                <span className={styles.menuIndex}>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
                <span className={styles.menuArrow} aria-hidden='true'>↗</span>
              </a>
            ))}
          </nav>
          <div className={styles.menuFoot}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  )
}
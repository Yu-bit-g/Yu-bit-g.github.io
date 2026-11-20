import { useEffect, useRef } from 'react'
import SplitType from 'split-type'

// 标题逐字入场：SplitType 拆分字符，IntersectionObserver 触发一次
export default function SplitTitle({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !children) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const label = typeof children === 'string' ? children : el.textContent
    let split = null
    let timer = 0

    const build = () => {
      split?.revert()
      split = new SplitType(el, { types: 'chars' })
      split.chars?.forEach((char, index) => {
        char.classList.add('sh-char')
        char.style.setProperty('--ci', index)
      })
    }

    build()
    el.setAttribute('aria-label', label)
    if (reduce.matches) el.classList.add('is-in')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-in')
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(el)

    const onResize = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const wasIn = el.classList.contains('is-in')
        build()
        if (wasIn || reduce.matches) el.classList.add('is-in')
      }, 220)
    }
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.clearTimeout(timer)
      split?.revert()
      el.removeAttribute('aria-label')
    }
  }, [children])

  return <h2 ref={ref} className={`sh-title ${className}`.trim()}>{children}</h2>
}
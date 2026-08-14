import { useEffect, useRef, useState } from 'react'

// 轻量入场动画：元素进入视口时淡入上移
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('noreveal'))

  useEffect(() => {
    if (visible) return undefined
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      {...rest}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
import { useEffect, useRef } from 'react'

// 鼠标跟随光晕：监听父容器 mousemove，把坐标写入 CSS 变量 --gx / --gy
// 光晕颜色与透明度在 index.css 的 .cursor-glow 中统一调整
export default function CursorGlow({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const glow = ref.current
    const host = glow ? glow.parentElement : null
    if (!host || !glow) return undefined

    const move = (event) => {
      const rect = host.getBoundingClientRect()
      glow.style.setProperty('--gx', `${event.clientX - rect.left}px`)
      glow.style.setProperty('--gy', `${event.clientY - rect.top}px`)
    }

    host.addEventListener('mousemove', move, { passive: true })
    return () => host.removeEventListener('mousemove', move)
  }, [])

  return <span ref={ref} className={`cursor-glow ${className}`.trim()} aria-hidden='true' />
}
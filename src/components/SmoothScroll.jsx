import { useEffect } from 'react'
import Lenis from 'lenis'

let instance = null

export const pauseScroll = () => instance?.stop()
export const resumeScroll = () => instance?.start()

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    })
    instance = lenis
    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
  return null
}
import { useEffect, useRef } from 'react'
import styles from './ParticleField.module.css'

const COLORS = [
  [163, 201, 168],
  [107, 155, 122],
  [196, 174, 124],
]

function makeSprite([r, g, b]) {
  const sprite = document.createElement('canvas')
  sprite.width = 64
  sprite.height = 64
  const ctx = sprite.getContext('2d')
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`)
  gradient.addColorStop(0.22, `rgba(${r}, ${g}, ${b}, 0.55)`)
  gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.12)`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return sprite
}

// 墨粒场：鼠标 / 触摸都会在指针附近唤醒极淡的绿色与金色粒子
// 不使用任何外部动画库，Canvas 2D + requestAnimationFrame 即可
export default function ParticleField({ className = '', density = 1, burst = 18 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return undefined

    const sprites = COLORS.map(makeSprite)
    let width = 0
    let height = 0
    let dpr = 1
    let maxParticles = 92
    let particles = []
    let raf = 0
    let last = performance.now()
    let lastSpawn = 0
    let pointer = null
    let pressed = false
    let visible = true
    let pageVisible = !document.hidden

    const randomColor = () => {
      const roll = Math.random()
      if (roll < 0.1) return 2
      if (roll < 0.66) return 1
      return 0
    }

    const createParticle = (x, y, ambient = false) => {
      const angle = Math.random() * Math.PI * 2
      const speed = ambient ? 0.05 + Math.random() * 0.1 : 0.16 + Math.random() * 0.85
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (ambient ? 0.03 : 0.08),
        r: ambient ? 0.7 + Math.random() * 1.2 : 0.9 + Math.random() * 1.8,
        life: ambient ? 1 : 0.85 + Math.random() * 0.5,
        decay: ambient ? 0 : 0.004 + Math.random() * 0.007,
        color: randomColor(),
        ambient,
        seed: Math.random() * 1000,
      }
    }

    const seedAmbient = () => {
      const count = Math.round((width < 700 ? 14 : 28) * density)
      particles = Array.from({ length: count }, () => createParticle(Math.random() * width, Math.random() * height, true))
    }

    const updateLimits = () => {
      maxParticles = Math.max(16, Math.round((width < 700 ? 48 : 92) * density))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      updateLimits()
      seedAmbient()
    }

    const spawn = (x, y, count, power = 1) => {
      for (let i = 0; i < count; i += 1) {
        const activeCount = particles.reduce((total, particle) => total + (particle.ambient ? 0 : 1), 0)
        if (activeCount >= maxParticles) break
        const particle = createParticle(
          x + (Math.random() - 0.5) * 16,
          y + (Math.random() - 0.5) * 16,
        )
        particle.vx *= 1.4 * power
        particle.vy *= 1.4 * power
        particle.vx += (Math.random() - 0.5) * 0.8
        particle.vy += (Math.random() - 0.5) * 0.8
        particles.push(particle)
      }
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      const now = performance.now()
      if (now - lastSpawn < (event.pointerType === 'touch' ? 32 : 40)) return
      lastSpawn = now
      spawn(pointer.x, pointer.y, event.pointerType === 'touch' ? 3 : 2, 0.75)
    }

    const onPointerDown = (event) => {
      const rect = canvas.getBoundingClientRect()
      pressed = true
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      spawn(pointer.x, pointer.y, burst, 1.25)
    }

    const onPointerUp = () => {
      pressed = false
    }

    const onPointerLeave = () => {
      pointer = null
      pressed = false
    }

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!visible || !pageVisible) return

      const dt = Math.min(34, now - last) / 16.667
      last = now
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i]

        if (particle.ambient) {
          const drift = now * 0.00009 + particle.seed
          particle.vx += Math.cos(drift) * 0.0025 * dt
          particle.vy += Math.sin(drift * 1.17) * 0.0025 * dt
          particle.vx *= 0.994
          particle.vy *= 0.994
          particle.x += particle.vx * dt
          particle.y += particle.vy * dt
          if (particle.x < -24) particle.x = width + 24
          if (particle.x > width + 24) particle.x = -24
          if (particle.y < -24) particle.y = height + 24
          if (particle.y > height + 24) particle.y = -24
        } else {
          if (pointer) {
            const dx = pointer.x - particle.x
            const dy = pointer.y - particle.y
            const distance = Math.hypot(dx, dy)
            if (distance < 170 && distance > 0.5) {
              const force = (pressed ? 0.045 : 0.009) / distance
              particle.vx += dx * force * dt
              particle.vy += dy * force * dt
            }
          }
          particle.vx *= 0.986
          particle.vy *= 0.986
          particle.x += particle.vx * dt
          particle.y += particle.vy * dt
          particle.life -= particle.decay * dt
          if (particle.life <= 0) {
            particles.splice(i, 1)
            continue
          }
        }

        const alpha = particle.ambient
          ? 0.12 + 0.05 * Math.sin(now * 0.0009 + particle.seed)
          : Math.max(0, particle.life) * 0.42
        const size = particle.ambient ? 9 + particle.r * 4 : 12 + particle.r * 7
        ctx.globalAlpha = Math.max(0.04, alpha)
        ctx.drawImage(sprites[particle.color], particle.x - size / 2, particle.y - size / 2, size, size)
      }

      ctx.globalAlpha = 1
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: 0 })
    intersectionObserver.observe(canvas)

    const onVisibility = () => {
      pageVisible = !document.hidden
      last = performance.now()
    }

    document.addEventListener('visibilitychange', onVisibility)
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerdown', onPointerDown, { passive: true })
    host.addEventListener('pointerup', onPointerUp, { passive: true })
    host.addEventListener('pointercancel', onPointerUp, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave, { passive: true })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointerup', onPointerUp)
      host.removeEventListener('pointercancel', onPointerUp)
      host.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [density, burst])

  return <canvas ref={canvasRef} className={`${styles.field} ${className}`.trim()} aria-hidden='true' />
}

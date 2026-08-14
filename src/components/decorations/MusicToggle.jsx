import { useEffect, useRef, useState } from 'react'
import { site } from '../../config.js'
import styles from './MusicToggle.module.css'

export default function MusicToggle() {
  // 默认开启：进入页面立即尝试播放；若被浏览器拦截，
  // 在访客第一次点击 / 触屏 / 按键时自动恢复播放。
  const [playing, setPlaying] = useState(true)
  const audioRef = useRef(null)
  const detachRef = useRef(() => {})

  const play = async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setPlaying(true)
      return true
    } catch {
      setPlaying(false)
      return false
    }
  }

  useEffect(() => {
    const audio = new Audio(site.music)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.4
    audioRef.current = audio

    const detach = () => {
      window.removeEventListener('pointerdown', onFirst)
      window.removeEventListener('touchstart', onFirst)
      window.removeEventListener('keydown', onFirst)
    }
    detachRef.current = detach

    const onFirst = () => {
      if (!audioRef.current || !audioRef.current.paused) return
      play().then((ok) => { if (ok) detach() })
    }

    play().then((ok) => { if (ok) detach() })

    window.addEventListener('pointerdown', onFirst, { passive: true })
    window.addEventListener('touchstart', onFirst, { passive: true })
    window.addEventListener('keydown', onFirst)

    return () => {
      detach()
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing && !audio.paused) {
      audio.pause()
      setPlaying(false)
      return
    }
    play()
  }

  return (
    <button
      type='button'
      className={playing ? `${styles.toggle} ${styles.on}` : styles.toggle}
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? '暂停音乐' : '播放音乐'}
    >
      <span className={styles.bars} aria-hidden='true'>
        <i />
        <i />
        <i />
      </span>
      <span>音乐</span>
    </button>
  )
}

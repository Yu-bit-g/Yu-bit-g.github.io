import { useEffect, useRef, useState } from 'react'
import { site } from '../../config.js'
import styles from './MusicToggle.module.css'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(site.music)
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0.4
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
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

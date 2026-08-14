import { site } from '../config.js'
import Seal from './decorations/Seal.jsx'
import CursorGlow from './decorations/CursorGlow.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id='top'>
      {/* 背景层：纯 CSS 水墨动态背景（视频不可用时的兜底） */}
      <div className={styles.bg} aria-hidden='true'>
        <div className={styles.ink} />
        <div className={styles.mist} />
        <div className={styles.mist2} />
      </div>

      {/* 视频背景：在 public/videos/hero.mp4 替换文件，或在 src/config.js 改链接 */}
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      >
        <source src={site.heroVideo} type='video/mp4' />
      </video>

      {/* 叠加：色罩 / 网格 / 暗角 */}
      <div className={styles.tint} aria-hidden='true' />
      <div className={styles.gridOverlay} aria-hidden='true' />
      <div className={styles.vignette} aria-hidden='true' />

      {/* 内嵌细线画框 */}
      <div className={styles.frame} aria-hidden='true'>
        <i className={styles.frameCorner} data-pos='tl' />
        <i className={styles.frameCorner} data-pos='tr' />
        <i className={styles.frameCorner} data-pos='bl' />
        <i className={styles.frameCorner} data-pos='br' />
      </div>

      {/* 鼠标跟随光晕 */}
      <CursorGlow className={styles.glow} />

      <div className={`container ${styles.content}`}>
        <Seal text='林间' size={60} className={styles.seal} />
        <h1 className={styles.title}>
          <span className={styles.titleLine}>
            <span className={styles.titleInner}>自然为底</span>
          </span>
          <span className={styles.titleLine}>
            <span className={styles.titleInner}>设计为骨</span>
          </span>
        </h1>
        <p className={styles.subtitle}>
          景观设计师<span className={styles.subDot}>·</span>林间
        </p>
        <p className={styles.subMeta}>LANDSCAPE ARCHITECT — PORTFOLIO 2026</p>
        <div className={styles.mark} aria-hidden='true'>
          <i />
        </div>
      </div>

      <a className={styles.scroll} href='#about'>
        <span>向下探索</span>
        <span className={styles.scrollLine} aria-hidden='true' />
      </a>

      <span className={styles.sideText} aria-hidden='true'>
        山 · 水 · 林 · 间
      </span>
      <span className={styles.sideTextLeft} aria-hidden='true'>
        以自然为笔 · 绘生活之境
      </span>
    </section>
  )
}
import { useEffect, useState } from 'react'
import { studies } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './decorations/SectionHeading.jsx'
import styles from './Studies.module.css'

const groupOrder = ['图纸与彩平', '场景渲染', '角色 · 视频']

export default function Studies() {
  const [index, setIndex] = useState(null)

  const close = () => setIndex(null)

  useEffect(() => {
    if (index === null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % studies.length)
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + studies.length) % studies.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index])

  const current = index === null ? null : studies[index]

  const groups = groupOrder
    .map((name) => ({ name, items: studies.filter((study) => study.group === name) }))
    .filter((group) => group.items.length > 0)

  return (
    <section className={styles.section} id='studies'>
      <div className='container'>
        <SectionHeading
          index='03'
          eyebrow='AI 创作'
          title='智能愿景 · AI 共创'
          description='以 DeepSeek、ChatGPT、Codex 与 Claude Code 构建独立工作流，从图纸表达、场景渲染到视频分镜与角色设定——全程 AI 辅助创作。'
        />

        <div className={styles.groups}>
          {groups.map((group) => (
            <div className={styles.group} key={group.name}>
              <div className={styles.groupHead}>
                <span className={styles.groupName}>{group.name}</span>
                <span className={styles.groupLine} aria-hidden='true' />
                <span className={styles.groupCount}>
                  {String(group.items.length).padStart(2, '0')} 件
                </span>
              </div>
              <div className={styles.grid}>
                {group.items.map((study, i) => (
                  <Reveal key={study.src} delay={(i % 4) * 70} className={styles.item}>
                    <button
                      type='button'
                      className={styles.btn}
                      onClick={() => setIndex(studies.findIndex((item) => item.src === study.src))}
                      aria-label={`查看 AI 作品：${study.label}`}
                    >
                      <img src={study.src} alt={study.label} loading='lazy' />
                      <span className={styles.chip}>{study.group}</span>
                      <span className={styles.overlay} aria-hidden='true' />
                      <span className={styles.caption}>{study.label}</span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 作品浮层 ---------- */}
      {current && (
        <div className={styles.modal} onClick={close} role='dialog' aria-modal='true' aria-label={current.label}>
          <div className={styles.modalPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHead}>
              <p className={styles.modalGroup}>
                AI 创作 · {current.group} · {current.label}
              </p>
              <button className={styles.close} onClick={close} aria-label='关闭'>
                ✕
              </button>
            </div>
            <div className={styles.viewer}>
              <button
                className={styles.navBtn}
                onClick={() => setIndex((i) => (i - 1 + studies.length) % studies.length)}
                aria-label='上一张'
              >
                ‹
              </button>
              <div className={styles.stage}>
                <img src={current.src} alt={current.label} />
                <p className={styles.captionLine}>
                  {current.label}
                  <span className={styles.counter}>
                    {String(index + 1).padStart(2, '0')} / {String(studies.length).padStart(2, '0')}
                  </span>
                </p>
              </div>
              <button
                className={styles.navBtn}
                onClick={() => setIndex((i) => (i + 1) % studies.length)}
                aria-label='下一张'
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
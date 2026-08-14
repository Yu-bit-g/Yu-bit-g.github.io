import { useEffect, useState } from 'react'
import { projects } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './decorations/SectionHeading.jsx'
import CornerMark from './decorations/CornerMark.jsx'
import CursorGlow from './decorations/CursorGlow.jsx'
import styles from './Projects.module.css'

export default function Projects() {
  const [active, setActive] = useState(null)
  const [index, setIndex] = useState(0)

  const openProject = (project) => {
    setActive(project)
    setIndex(0)
  }

  const close = () => setActive(null)

  useEffect(() => {
    if (!active) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % active.images.length)
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + active.images.length) % active.images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  const current = active ? active.images[index] : null

  return (
    <section className={styles.section} id='projects'>
      <div className='container'>
        <SectionHeading
          index='02'
          eyebrow='精选项目'
          title='山水入卷 · 项目精选'
          description='课程设计与竞赛实践中的完整成果——点击卡片，查看每个项目的图纸细节。'
        />

        <div className={styles.grid}>
          {projects.map((project, cardIndex) => (
            <Reveal key={project.id} delay={(cardIndex % 2) * 110} className={styles.card}>
              <div
                className={styles.inner}
                role='button'
                tabIndex={0}
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') openProject(project)
                }}
              >
                <CursorGlow className={styles.glow} />
                <div className={styles.media}>
                  {/* 项目图片：public/images/projects/ 下替换文件即可 */}
                  <img src={project.cover} alt={project.title} loading='lazy' />
                  <span className={styles.no} aria-hidden='true'>{project.no}</span>
                  <span className={styles.tag}>{project.category}</span>
                  <span className={styles.zoom} aria-hidden='true'>展开查看 ＋</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.name}>{project.title}</h3>
                  <p className={styles.desc}>{project.description}</p>
                  <p className={styles.meta}>
                    <span>{project.year}</span>
                    <i aria-hidden='true'>·</i>
                    <span>{project.location}</span>
                    <i aria-hidden='true'>·</i>
                    <span>{project.area}</span>
                  </p>
                  <div className={styles.foot}>
                    <span className={styles.more}>
                      查看项目
                      <i aria-hidden='true'>→</i>
                    </span>
                    <span className={styles.count}>{project.images.length} 图</span>
                  </div>
                </div>
                <CornerMark position='tr' />
                <CornerMark position='bl' />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- 项目图集浮层 ---------- */}
      {active && (
        <div className={styles.modal} onClick={close} role='dialog' aria-modal='true' aria-label={active.title}>
          <div className={styles.modalPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHead}>
              <div>
                <p className={styles.modalCat}>{active.category}</p>
                <h3 className={styles.modalTitle}>{active.title}</h3>
              </div>
              <button className={styles.close} onClick={close} aria-label='关闭'>
                ✕
              </button>
            </div>

            <div className={styles.viewer}>
              <button
                className={styles.navBtn}
                onClick={() => setIndex((i) => (i - 1 + active.images.length) % active.images.length)}
                aria-label='上一张'
              >
                ‹
              </button>
              <div className={styles.stage}>
                <img src={current.src} alt={`${active.title} - ${current.label}`} />
                <p className={styles.caption}>
                  {current.label}
                  <span className={styles.counter}>
                    {String(index + 1).padStart(2, '0')} / {String(active.images.length).padStart(2, '0')}
                  </span>
                </p>
              </div>
              <button
                className={styles.navBtn}
                onClick={() => setIndex((i) => (i + 1) % active.images.length)}
                aria-label='下一张'
              >
                ›
              </button>
            </div>

            <div className={styles.thumbs}>
              {active.images.map((image, i) => (
                <button
                  key={image.src}
                  className={i === index ? styles.thumbActive : ''}
                  onClick={() => setIndex(i)}
                  aria-label={`查看 ${image.label}`}
                >
                  <img src={image.src} alt={image.label} loading='lazy' />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
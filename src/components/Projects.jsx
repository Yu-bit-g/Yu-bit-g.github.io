import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { projects } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './decorations/SectionHeading.jsx'
import CornerMark from './decorations/CornerMark.jsx'
import ParticleField from './decorations/ParticleField.jsx'
import CursorGlow from './decorations/CursorGlow.jsx'
import styles from './Projects.module.css'

const asImage = (image) => (typeof image === 'string' ? { src: image } : image)

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const thumbsRef = useRef(null)

  const activeProject = projects[activeIndex]
  const activeCover = asImage(activeProject.cover)
  const openProject = openIndex === null ? null : projects[openIndex]
  const current = openProject ? asImage(openProject.images[galleryIndex]) : null

  // 预览图与图集舞台共享 view-transition-name，支持时做共享元素放大
  const openProjectAt = (index) => {
    const transition = typeof document.startViewTransition
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (transition === 'function' && !reduce && !dialogRef.current?.open) {
      const handle = document.startViewTransition(() => {
        flushSync(() => {
          setOpenIndex(index)
          setGalleryIndex(0)
        })
        dialogRef.current?.showModal()
      })
      handle.finished.catch(() => {})
      return
    }
    setOpenIndex(index)
    setGalleryIndex(0)
  }

  const close = () => setOpenIndex(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (openProject && !dialog.open) {
      dialog.showModal()
      requestAnimationFrame(() => closeRef.current?.focus())
    } else if (!openProject && dialog.open) {
      dialog.close()
    }
  }, [openProject])

  useEffect(() => {
    if (!openProject) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setGalleryIndex((i) => (i + 1) % openProject.images.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setGalleryIndex((i) => (i - 1 + openProject.images.length) % openProject.images.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openProject])

  // 图片较多时，让当前缩略图保持在可视范围内
  useEffect(() => {
    if (!openProject) return
    const active = thumbsRef.current?.children[galleryIndex]
    active?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [galleryIndex, openProject])

  const handleDialogClick = (event) => {
    if (event.target === dialogRef.current) close()
  }

  return (
    <section className={styles.section} id='projects'>
      <ParticleField className={styles.particles} density={0.52} burst={14} />

      <div className={`container ${styles.content}`}>
        <SectionHeading
          index='02'
          eyebrow='精选项目'
          title='山水入卷 · 项目精选'
          description='课程设计、竞赛与校企实践中的完整成果。移动光标浏览项目索引，点击进入完整图集。'
        />

        <Reveal className={styles.indexWrap}>
          <div className={styles.list}>
            {projects.map((project, index) => {
              const cover = asImage(project.cover)
              return (
                <button
                  key={project.id}
                  type='button'
                  className={`${styles.row} ${index === activeIndex ? styles.rowActive : ''}`}
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => openProjectAt(index)}
                  aria-label={`查看项目：${project.title}`}
                >
                  <span className={styles.rowNo}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.rowMain}>
                    <span className={styles.rowMeta}>
                      {project.year}
                      <i aria-hidden='true'>·</i>
                      {project.category}
                    </span>
                    <span className={styles.rowTitle}>{project.title}</span>
                    <span className={styles.rowDescWrap}>
                      <span className={styles.rowDesc}>{project.description}</span>
                    </span>
                  </span>
                  <span className={styles.rowSide}>
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </span>
                  <span className={styles.rowArrow} aria-hidden='true'>↗</span>
                  <span className={styles.rowThumb} aria-hidden='true'>
                    <span
                      className={styles.rowThumbImg}
                      style={{ backgroundImage: `url(${cover.thumb || cover.src})` }}
                    />
                  </span>
                </button>
              )
            })}
          </div>

          <div className={styles.preview}>
            <button
              type='button'
              className={styles.previewBtn}
              onClick={() => openProjectAt(activeIndex)}
              aria-label={`打开 ${activeProject.title} 项目图集`}
            >
              <span
                className={styles.previewFrame}
                style={{ backgroundImage: `url(${activeCover.thumb || activeCover.src})` }}
              >
                {projects.map((project, index) => {
                  const cover = asImage(project.cover)
                  return (
                    <img
                      key={project.id}
                      src={cover.src}
                      srcSet={cover.srcSet}
                      sizes='(max-width: 1000px) 100vw, 46vw'
                      width={cover.width}
                      height={cover.height}
                      alt=''
                      aria-hidden={index === activeIndex ? undefined : 'true'}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding='async'
                      fetchPriority={index === activeIndex ? 'high' : 'low'}
                      className={`${styles.previewImg} ${index === activeIndex ? styles.previewImgActive : ''}`}
                      style={{ viewTransitionName: !openProject && index === activeIndex ? 'project-cover' : 'none' }}
                    />
                  )
                })}
                <span className={styles.previewShade} aria-hidden='true' />
                <CursorGlow className={styles.previewGlow} />
                <span className={styles.previewLabel}>
                  <span>SELECTED WORKS</span>
                  <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                </span>
                <span className={styles.previewInfo}>
                  <span className={styles.previewCat}>{activeProject.category}</span>
                  <span className={styles.previewTitle}>{activeProject.title}</span>
                  <span className={styles.previewMeta}>
                    {activeProject.year} · {activeProject.location} · {activeProject.area}
                  </span>
                </span>
                <span className={styles.previewAction}>查看完整图集 <i aria-hidden='true'>→</i></span>
                <CornerMark position='tl' />
                <CornerMark position='tr' />
                <CornerMark position='bl' />
                <CornerMark position='br' />
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={close}
        onClick={handleDialogClick}
        aria-label={openProject ? openProject.title : '项目图集'}
      >
        {openProject && current && (
          <div className={styles.panel} data-lenis-prevent>
            <div className={styles.panelHead}>
              <div>
                <p className={styles.panelCat}>{openProject.category}</p>
                <h3 className={styles.panelTitle}>{openProject.title}</h3>
              </div>
              <div className={styles.panelHeadRight}>
                <span className={styles.panelMeta}>
                  {openProject.year} · {openProject.location} · {openProject.area}
                </span>
                <button ref={closeRef} className={styles.close} onClick={close} aria-label='关闭图集'>✕</button>
              </div>
            </div>

            <div className={styles.viewer}>
              <button
                className={styles.navBtn}
                onClick={() => setGalleryIndex((i) => (i - 1 + openProject.images.length) % openProject.images.length)}
                aria-label='上一张'
              >
                ‹
              </button>
              <div className={styles.stage}>
                <img
                  key={current.src}
                  src={current.src}
                  srcSet={current.srcSet}
                  sizes='(max-width: 900px) 92vw, 75vw'
                  width={current.width}
                  height={current.height}
                  alt={`${openProject.title} - ${current.label}`}
                  decoding='async'
                  style={{
                    backgroundImage: `url(${current.thumb || current.src})`,
                    viewTransitionName: 'project-cover',
                  }}
                />
                <p className={styles.caption}>
                  {current.label}
                  <span className={styles.counter}>
                    {String(galleryIndex + 1).padStart(2, '0')} / {String(openProject.images.length).padStart(2, '0')}
                  </span>
                  {current.height / current.width > 1.3 && (
                    <a
                      className={styles.origLink}
                      href={current.full}
                      target='_blank'
                      rel='noreferrer'
                    >
                      原图 ↗
                    </a>
                  )}
                </p>
              </div>
              <button
                className={styles.navBtn}
                onClick={() => setGalleryIndex((i) => (i + 1) % openProject.images.length)}
                aria-label='下一张'
              >
                ›
              </button>
            </div>

            <div className={styles.thumbs} ref={thumbsRef} data-lenis-prevent>
              {openProject.images.map((image, index) => {
                const item = asImage(image)
                return (
                  <button
                    key={item.src}
                    className={index === galleryIndex ? styles.thumbActive : ''}
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`查看 ${item.label}`}
                    aria-current={index === galleryIndex ? 'true' : undefined}
                  >
                    <img src={item.thumb || item.src} alt='' loading='lazy' decoding='async' />
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

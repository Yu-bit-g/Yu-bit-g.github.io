import { useState } from 'react'
import { site } from '../config.js'
import Reveal from './Reveal.jsx'
import Icon from './decorations/Icon.jsx'
import styles from './Contact.module.css'

const socialIcons = {
  邮箱: 'mail',
  电话: 'phone',
  微信: 'wechat',
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(site.wechat)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* 剪贴板不可用时静默失败 */
    }
  }

  return (
    <section className={styles.section} id='contact'>
      <div className={styles.halo} aria-hidden='true' />
      <div className={styles.gridFaint} aria-hidden='true' />
      <div className={styles.mist} aria-hidden='true' />
      <div className={styles.mountains} aria-hidden='true'>
        <svg viewBox='0 0 1440 300' preserveAspectRatio='none' className={styles.mountainsBack2}>
          <path d='M0 300 L0 190 L150 92 L310 186 L470 74 L700 216 L880 138 L1050 236 L1230 144 L1440 206 L1440 300 Z' />
        </svg>
        <svg viewBox='0 0 1440 300' preserveAspectRatio='none' className={styles.mountainsBack}>
          <path d='M0 300 L0 216 L170 118 L330 204 L500 96 L700 232 L880 150 L1050 248 L1230 158 L1440 224 L1440 300 Z' />
        </svg>
        <svg viewBox='0 0 1440 300' preserveAspectRatio='none' className={styles.mountainsFront}>
          <path d='M0 300 L0 250 L210 190 L420 252 L640 168 L860 262 L1090 196 L1300 252 L1440 216 L1440 300 Z' />
        </svg>
      </div>

      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.content}>
          <p className={styles.eyebrow}>CONTACT · 联系</p>
          <h2 className={styles.title}>
            以自然为笔
            <br />
            绘生活之境
          </h2>

          <a className={styles.mail} href={`mailto:${site.email}`}>
            {site.email}
          </a>

          <div className={styles.socials}>
            {site.socials.map((social) => (
              <div className={styles.social} key={social.label}>
                <span className={styles.socialIcon}>
                  <Icon name={socialIcons[social.label] || 'mail'} size={17} />
                </span>
                <span className={styles.socialLabel}>{social.label}</span>
                <span className={styles.socialValue}>{social.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.cta} href={`mailto:${site.email}`}>
              发送邮件
              <span className={styles.ctaArrow} aria-hidden='true'>→</span>
            </a>
            <button
              type='button'
              className={`${styles.cta} ${copied ? styles.ctaDone : ''}`}
              onClick={copyWechat}
            >
              {copied ? '已复制微信号' : '微信联系'}
              <span className={styles.ctaArrow} aria-hidden='true'>{copied ? '✓' : '＋'}</span>
            </button>
          </div>

          <p className={styles.hint}>点击「微信联系」复制微信号 · 期待项目合作与实习机会</p>
        </Reveal>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© 2026 {site.name} · {site.brand} 保留所有权利</span>
          <span className={styles.footerRight}>山水之间 · 营造之境</span>
        </div>
      </footer>
    </section>
  )
}
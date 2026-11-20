import { useState } from 'react'
import { site } from '../config.js'
import Reveal from './Reveal.jsx'
import Icon from './decorations/Icon.jsx'
import ParticleField from './decorations/ParticleField.jsx'
import styles from './Contact.module.css'

const socialIcons = {
  邮箱: 'mail',
  电话: 'phone',
  微信: 'wechat',
}

export default function Contact() {
  const [copied, setCopied] = useState('')

  const copy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(''), 2200)
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

      <ParticleField className={styles.particles} density={0.55} burst={12} />

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
              <button
                type='button'
                className={`${styles.social} ${copied === social.label ? styles.socialDone : ''}`}
                key={social.label}
                onClick={() => copy(social.label, social.value)}
                aria-label={`复制${social.label}：${social.value}`}
              >
                <span className={styles.socialIcon}>
                  <Icon name={socialIcons[social.label] || 'mail'} size={17} />
                </span>
                <span className={styles.socialLabel}>{social.label}</span>
                <span className={styles.socialValue}>{social.value}</span>
                <span className={styles.socialCopy} aria-hidden='true'>
                  {copied === social.label ? '已复制' : '复制'}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.cta} href={`mailto:${site.email}`}>
              发送邮件
              <span className={styles.ctaArrow} aria-hidden='true'>→</span>
            </a>
            <button
              type='button'
              className={`${styles.cta} ${copied === '微信' ? styles.ctaDone : ''}`}
              onClick={() => copy('微信', site.wechat)}
            >
              {copied === '微信' ? '已复制微信号' : '微信联系'}
              <span className={styles.ctaArrow} aria-hidden='true'>{copied === '微信' ? '✓' : '＋'}</span>
            </button>
          </div>

          <p className={styles.hint}>点击任意联系方式复制 · 期待合作与实习机会</p>
          <span className='srOnly' role='status' aria-live='polite'>
            {copied ? `${copied}已复制` : ''}
          </span>
        </Reveal>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© 2026 {site.name} · {site.brand} 保留所有权利</span>
          <span className={styles.footerCredit}>音乐 · 《太聪明》</span>
          <span className={styles.footerRight}>山水之间 · 营造之境</span>
        </div>
      </footer>
    </section>
  )
}

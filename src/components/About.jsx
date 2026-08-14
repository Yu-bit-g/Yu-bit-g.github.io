import { site } from '../config.js'
import { stats } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './decorations/SectionHeading.jsx'
import Seal from './decorations/Seal.jsx'
import Icon from './decorations/Icon.jsx'
import InkPortrait from './decorations/InkPortrait.jsx'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.section} id='about'>
      <div className='container'>
        <SectionHeading
          index='01'
          eyebrow='关于我'
          title='山水之间 · 设计本心'
          description='风景园林专业在读，以场地感知与系统思维做设计——从概念草图、图纸表达到模型推敲，全程投入每一处细节。'
        />

        <div className={styles.grid}>
          <Reveal className={styles.portraitWrap}>
            <div className={styles.frame} aria-hidden='true' />
            <div className={styles.portrait}>
              {site.avatar ? (
                /* 换成自己的照片：在 src/config.js 把 avatar 设为图片路径 */
                <img src={site.avatar} alt={`${site.name} 的肖像`} />
              ) : (
                <InkPortrait />
              )}
              <span className={styles.portraitNo} aria-hidden='true'>壹 · 山水</span>
            </div>
            <Seal text='舜禹' size={64} className={styles.seal} />
            <span className={styles.vText} aria-hidden='true'>山 水 之 间</span>
          </Reveal>

          <Reveal delay={130} className={styles.info}>
            <p className={styles.hello}>你好，我是</p>
            <h3 className={styles.name}>{site.name}</h3>
            <p className={styles.role}>{site.role} · {site.location}</p>
            <p className={styles.school}>{site.school} · 本科在读</p>

            <div className={styles.bio}>
              <p>
                始终对专业保持热爱与钻研：掌握 AutoCAD 施工图、SketchUp 场地建模与
                Photoshop 后期表达，具备植物学基础与园林制图规范素养，也保持着场地速写的手绘习惯。
              </p>
              <p>
                参与过老旧小区改造调研与乡村振兴校企合作实践，获得绘画比赛金艺奖。
                相信好的景观从土地与人的日常中生长而来，期待以自然为法度，把想法扎实地落到图纸与场地。
              </p>
              <p>
                同时，我熟练运用 DeepSeek、ChatGPT、Codex 与 Claude Code 等国内外主流 AI 工具，
                已建立属于自己的「调研 — 概念 — 出图」工作流；我相信 AI 是放大设计与表达效率的笔，
                而不是代替思考的手。
              </p>
            </div>

            <ul className={styles.contacts}>
              <li>
                <span className={styles.cIcon}><Icon name='mail' size={17} /></span>
                <span className={styles.cLabel}>邮箱</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className={styles.cIcon}><Icon name='phone' size={17} /></span>
                <span className={styles.cLabel}>电话</span>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li>
                <span className={styles.cIcon}><Icon name='wechat' size={17} /></span>
                <span className={styles.cLabel}>微信</span>
                <span>{site.wechat}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100} className={styles.stats}>
          {stats.map((item, index) => (
            <div className={styles.stat} key={item.label}>
              <span className={styles.statIndex}>0{index + 1}</span>
              <span className={styles.statValue}>
                <span className={styles.statNum}>
                  {item.value}
                  {item.suffix && <em>{item.suffix}</em>}
                </span>
              </span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
import { strengths } from '../data/content.js'
import Reveal from './Reveal.jsx'
import SectionHeading from './decorations/SectionHeading.jsx'
import Icon from './decorations/Icon.jsx'
import styles from './Strengths.module.css'

export default function Strengths() {
  return (
    <section className={styles.section} id='strengths'>
      <div className='container'>
        <SectionHeading
          index='04'
          eyebrow='个人优势'
          title='以专业，回应每一寸场地'
          description='从生态认知到施工制图，以系统化的专业能力支撑每个项目的品质与完成度。'
        />

        <div className={styles.grid}>
          {strengths.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className={styles.card} data-no={item.no}>
              <span className={styles.line} aria-hidden='true' />
              <span className={styles.iconRing}>
                <span className={styles.icon}>
                  <Icon name={item.icon} size={32} />
                </span>
              </span>
              <p className={styles.en}>{item.en}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
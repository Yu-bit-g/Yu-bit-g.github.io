import SplitTitle from './SplitTitle.jsx'

// 模块标题：序号 + 眉题 + 主标题 + 描述
export default function SectionHeading({ index, eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`sh ${align === 'center' ? 'sh-center' : ''}`}>
      <p className='sh-eyebrow'>
        <span className='sh-index'>{index}</span>
        {eyebrow}
      </p>
      <SplitTitle>{title}</SplitTitle>
      {description && <p className='sh-desc'>{description}</p>}
    </div>
  )
}
// 印章装饰：修改 text 可更换印文，如「林间」「山水」「合作」
export default function Seal({ text = '舜', size = 56, className = '' }) {
  return (
    <span
      className={`seal ${className}`.trim()}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
      aria-hidden='true'
    >
      {text}
    </span>
  )
}
// 极简国风角标：position 支持 tl / tr / bl / br
export default function CornerMark({ position = 'tl' }) {
  return <span className={`corner corner-${position}`} aria-hidden='true' />
}
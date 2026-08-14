// 内置水墨人像插画：在没有真实照片时的默认视觉
// 想换成照片：在 src/config.js 中把 avatar 设为图片路径
export default function InkPortrait() {
  return (
    <svg
      viewBox='0 0 420 525'
      className='ink-portrait'
      role='img'
      aria-label='水墨山水插画'
      preserveAspectRatio='xMidYMid slice'
    >
      <defs>
        <linearGradient id='ip-bg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#101310' />
          <stop offset='0.55' stopColor='#0c0e0b' />
          <stop offset='1' stopColor='#14180f' />
        </linearGradient>
        <linearGradient id='ip-m1' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#26332b' stopOpacity='0.85' />
          <stop offset='1' stopColor='#161d18' stopOpacity='0.2' />
        </linearGradient>
        <linearGradient id='ip-m2' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#2f3f35' stopOpacity='0.9' />
          <stop offset='1' stopColor='#1a211c' stopOpacity='0.3' />
        </linearGradient>
        <linearGradient id='ip-m3' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#111511' stopOpacity='0.98' />
          <stop offset='1' stopColor='#0b0b0a' />
        </linearGradient>
        <radialGradient id='ip-moon' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0' stopColor='#e6e2d8' stopOpacity='0.95' />
          <stop offset='0.7' stopColor='#8f9d8b' stopOpacity='0.35' />
          <stop offset='1' stopColor='#8f9d8b' stopOpacity='0' />
        </radialGradient>
        <filter id='ip-blur' x='-60%' y='-60%' width='220%' height='220%'>
          <feGaussianBlur stdDeviation='14' />
        </filter>
      </defs>

      {/* 底 */}
      <rect width='420' height='525' fill='url(#ip-bg)' />

      {/* 月 */}
      <circle cx='300' cy='116' r='88' fill='url(#ip-moon)' opacity='0.85' />
      <circle cx='300' cy='116' r='34' fill='#e6e2d8' opacity='0.9' />
      <circle cx='300' cy='116' r='40' fill='none' stroke='#8f9d8b' strokeOpacity='0.4' strokeWidth='1' />

      {/* 远山 */}
      <path d='M0 330 L64 226 L118 288 L186 188 L246 262 L306 214 L368 272 L420 226 L420 420 L0 420 Z' fill='url(#ip-m1)' opacity='0.72' />
      {/* 中山 */}
      <path d='M0 386 L86 268 L160 336 L238 246 L312 320 L374 278 L420 320 L420 460 L0 460 Z' fill='url(#ip-m2)' opacity='0.9' />
      {/* 雾带 */}
      <ellipse cx='210' cy='368' rx='250' ry='34' fill='#8f9d8b' opacity='0.12' filter='url(#ip-blur)' />
      <ellipse cx='150' cy='300' rx='180' ry='24' fill='#a8b49f' opacity='0.1' filter='url(#ip-blur)' />
      {/* 近山 */}
      <path d='M0 458 L78 356 L158 424 L240 372 L322 436 L420 382 L420 525 L0 525 Z' fill='url(#ip-m3)' />

      {/* 水面细线 */}
      <path d='M0 470 L420 470' stroke='#6b9b7a' strokeOpacity='0.16' strokeWidth='1' />
      <path d='M0 484 L420 484' stroke='#6b9b7a' strokeOpacity='0.08' strokeWidth='1' />

      {/* 飞鸟 */}
      <g stroke='#a3c9a8' strokeOpacity='0.7' strokeWidth='1.2' fill='none' strokeLinecap='round'>
        <path d='M258 208 q6 -6 12 0 q6 -6 12 0' />
        <path d='M292 190 q5 -5 10 0 q5 -5 10 0' />
        <path d='M332 226 q4 -4 8 0 q4 -4 8 0' />
      </g>

      {/* 竖向书法 */}
      <text
        x='36'
        y='120'
        fill='#8c877d'
        fillOpacity='0.5'
        fontSize='17'
        letterSpacing='10'
        fontFamily='KaiTi, STKaiti, serif'
        writingMode='vertical-rl'
      >
        山水之间
      </text>

      {/* 印章位 */}
      <g transform='translate(322 428) rotate(-3)'>
        <rect x='0' y='0' width='46' height='46' rx='5' fill='#a58d5f' fillOpacity='0.85' />
        <text x='23' y='31' textAnchor='middle' fontSize='21' fill='#171410' fontFamily='KaiTi, STKaiti, serif'>
          舜禹
        </text>
      </g>

      {/* 极细内框 */}
      <rect x='12' y='12' width='396' height='501' fill='none' stroke='#c4ae7c' strokeOpacity='0.22' strokeWidth='1' />
    </svg>
  )
}
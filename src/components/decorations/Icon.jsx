const paths = {
  leaf: (
    <>
      <path d='M19 5C10 5 5.5 9.5 5.5 14.5 5.5 19.5 9.5 21 14 21c6 0 5-16 5-16z' />
      <path d='M19 5C15 8.5 11 12 7.5 15' />
    </>
  ),
  tree: (
    <>
      <circle cx='12' cy='7' r='3.4' />
      <circle cx='7.6' cy='10.2' r='3' />
      <circle cx='16.4' cy='10.2' r='3' />
      <path d='M12 21v-7' />
    </>
  ),
  path: (
    <>
      <path d='M3 20c3.2-1.2 5-4.2 6-7.4 1-3.2 2-6.1 4.6-7.1 2.4-.9 4.7 1.6 7.4.7' />
      <circle cx='3' cy='20' r='1.4' fill='currentColor' stroke='none' />
    </>
  ),
  ruler: (
    <>
      <rect x='3' y='8' width='18' height='3' />
      <path d='M6 8v4M10 8v4M14 8v4M18 8v4' />
    </>
  ),
  mail: (
    <>
      <rect x='3' y='5.5' width='18' height='13' rx='1.5' />
      <path d='M3.5 7l8.5 6 8.5-6' />
    </>
  ),
  phone: (
    <>
      <path d='M5.5 4h3.2l1.6 4-2 1.5a13.2 13.2 0 0 0 5.2 5.2l1.5-2 4 1.6v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z' />
    </>
  ),
  wechat: (
    <>
      <path d='M9.5 4C5.9 4 3 6.6 3 9.8c0 1.8.9 3.4 2.4 4.5L4.6 17l3.1-1.5c.6.2 1.2.3 1.8.3' />
      <path d='M21 13.5c0-2.5-2.3-4.5-5.2-4.5s-5.2 2-5.2 4.5 2.3 4.5 5.2 4.5c.6 0 1.1-.1 1.6-.2L20 19l-.6-2.2c1-.7 1.6-2 1.6-3.3z' />
      <circle cx='9' cy='9.2' r='0.9' fill='currentColor' stroke='none' />
      <circle cx='13' cy='9.2' r='0.9' fill='currentColor' stroke='none' />
      <circle cx='14.5' cy='13.2' r='0.9' fill='currentColor' stroke='none' />
      <circle cx='18.5' cy='13.2' r='0.9' fill='currentColor' stroke='none' />
    </>
  ),
  arrow: (
    <>
      <path d='M4 12h15' />
      <path d='M13 6l6 6-6 6' />
    </>
  ),
  spark: (
    <>
      <path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z' />
      <path d='M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z' />
      <path d='M5.5 4.5l.7 2L8.2 7l-2 .7-.7 2-.7-2-2-.7 2-.7z' />
    </>
  ),
}

// 简单线性图标（stroke 使用 currentColor，随主题绿色）
export default function Icon({ name, size = 32, strokeWidth = 1.4 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      {paths[name] || paths.leaf}
    </svg>
  )
}
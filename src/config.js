// ==========================================================
//  全局配置：个人信息 / 联系方式 / 视频与图片占位
//  后期替换资料时，优先修改这个文件即可
// ==========================================================

export const site = {
  // 基本信息
  name: '张舜禹',
  brand: '林·间',
  role: '景观设计师',
  school: '沧州交通学院 · 风景园林',
  location: '中国 · 沧州',
  email: '761487053@qq.com',
  phone: '132 3085 5590',
  wechat: '13230855590',

  // Hero 背景视频（本地文件，位于 public/videos/hero.mp4）。
  // 想换视频：把新 mp4 覆盖到 public/videos/hero.mp4 即可；
  // 或改为自己的在线视频链接。
  // 视频加载失败时自动隐藏，显示纯 CSS 水墨动态背景。
  heroVideo: '/videos/hero.mp4',

  // 头像：留空 '' 时使用内置水墨人像插画（推荐）；
  // 想用自己的照片：将照片放到 public/images/avatar.jpg，然后改成 '/images/avatar.jpg'
  avatar: '',

  // 底部联系模块展示
  socials: [
    { label: '邮箱', value: '761487053@qq.com' },
    { label: '电话', value: '132 3085 5590' },
    { label: '微信', value: '13230855590' },
  ],
}
# 林·间 · 景观设计师个人作品集

React + Vite（JavaScript）实现的单页滚动个人作品集网站。
风格：暗色系 × 绿色点缀（墨绿 / 灰绿 / 松石绿）× 国风细节（印章、角标、竖排文字、水墨光晕）。

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:5173 预览。

生产构建：

```bash
npm run build
npm run preview
```

## 目录结构

```
landscape-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── public/                  # 本地静态资源（图片、视频放这里）
│   ├── images/
│   │   ├── projects/          # 旧项目图 + 新增 wenluo / fushu 多尺寸 WebP
│   │   └── studies/           # AI 创作图（含角色设定）
│   └── videos/
└── src/
    ├── main.jsx             # 入口
    ├── App.jsx              # 页面组装
    ├── index.css            # 全局设计变量 / 通用样式（印章、角标、标题等）
    ├── config.js            # ★ 个人信息 / 视频 / 头像 / 社交账号
    ├── data/
    │   └── content.js       # ★ 项目 / 数据卡片 / 能力卡片内容
    └── components/
        ├── Navbar.jsx        # 顶部导航（滚动磨砂）
        ├── Hero.jsx          # 全屏首页
        ├── About.jsx         # 关于我
        ├── Projects.jsx      # 编辑式项目索引 + 粘性大图预览 + 原生 dialog 图集
        ├── Studies.jsx       # AI 创作分组画廊
        ├── Strengths.jsx     # 个人优势
        ├── Contact.jsx       # 联系 + 版权
        ├── Reveal.jsx        # 入场动画工具
        └── decorations/      # 印章 / 角标 / 图标 / 模块标题 / 触摸粒子场
```

（组件样式文件为同名 `*.module.css`）

## 替换指南（重点）

| 内容 | 修改位置 |
| --- | --- |
| 姓名 / 职位 / 城市 | `src/config.js` → `site.name / role / location` |
| 邮箱 / 电话 / 微信 | `src/config.js` → `site.email / phone / wechat` |
| Hero 背景视频 | `src/config.js` → `site.heroVideo`，本地文件放 `public/videos/`，写法 `/videos/hero.mp4`；视频加载失败会自动回退为纯 CSS 水墨动态背景 |
| 头像 | `src/config.js` → `site.avatar`，本地文件放 `public/images/`，写法 `/images/avatar.jpg` |
| 项目图片 / 标题 / 描述 / 分类 | `src/data/content.js` → `projects` |
| 新增项目图片（文络 / 感智） | `public/images/projects/wenluo/`、`public/images/projects/fushu/` |
| AI 角色设定图 | `public/images/studies/st50~st53-*.webp` |
| 经验数据卡片 | `src/data/content.js` → `stats` |
| 能力卡片 | `src/data/content.js` → `strengths` |
| 社交账号 | `src/config.js` → `site.socials` |
| 印章文字 | 各组件中 `<Seal text='...' />` |
| 配色 / 字体 / 版心宽度（1700px） | `src/index.css` → `:root` 变量 |

## 页面说明

- 单页平滑滚动：首页 → 关于 → 项目 → 优势 → 联系；桌面端由 Lenis 提供惯性，`prefers-reduced-motion` 下自动关闭
- 导航栏滚动 32px 后出现半透明磨砂玻璃效果
- 项目区：左侧编辑式索引，悬停 / 键盘聚焦切换右侧粘性大图；点击打开原生 `<dialog>` 图集
- 项目预览 → 图集：支持 View Transitions 的浏览器使用共享元素放大转场，其余浏览器直接打开
- 项目图集：键盘 ← → 切换，Esc 关闭，支持缩略图快速定位
- 标题入场：SplitType 逐字遮罩上浮，支持缩放后重新拆分
- 触摸互动：Hero 与 Contact 的 Canvas 墨粒场支持鼠标移动、按住吸引与触摸点按爆发
- 图片加载：新增作品使用 WebP 640 / 1200 / 1920 三档响应式资源与 `srcset`
- 现代 CSS：`@supports (animation-timeline: view())` 滚动驱动细线生长，不支持时自动回退
- 项目卡片悬停：图片轻微放大 + 边框绿色高亮
- 优势卡片悬停：顶部绿色渐变细线 + 背景微亮
- 入场动画：IntersectionObserver（`src/components/Reveal.jsx`）

## 当前内容

- Hero 视频：`public/videos/hero.mp4`，失败时自动回退为 CSS 水墨背景
- 背景音乐：《太聪明》，`public/audio/music.mp3`
- 头像：`public/images/avatar.jpg`
- 新增项目：`文络 · 云拓`（园林建筑 / 文化景观）与 `感智 · 无障`（城市街道 / AI 感知设计）
- AI 创作：图纸与彩平、场景渲染、短剧美术、角色设定、角色 · 视频五组
- 分享封面：`public/images/og-cover.jpg`（1200 × 630）

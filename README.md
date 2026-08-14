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
        ├── Projects.jsx      # 精选项目
        ├── Strengths.jsx     # 个人优势
        ├── Contact.jsx       # 联系 + 版权
        ├── Reveal.jsx        # 入场动画工具
        └── decorations/      # 印章 / 角标 / 图标 / 模块标题
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
| 经验数据卡片 | `src/data/content.js` → `stats` |
| 能力卡片 | `src/data/content.js` → `strengths` |
| 社交账号 | `src/config.js` → `site.socials` |
| 印章文字 | 各组件中 `<Seal text='...' />` |
| 配色 / 字体 / 版心宽度（1700px） | `src/index.css` → `:root` 变量 |

## 页面说明

- 单页平滑滚动：首页 → 关于 → 项目 → 优势 → 联系
- 导航栏滚动 32px 后出现半透明磨砂玻璃效果
- 项目卡片悬停：图片轻微放大 + 边框绿色高亮
- 优势卡片悬停：顶部绿色渐变细线 + 背景微亮
- 入场动画：IntersectionObserver（`src/components/Reveal.jsx`）

## 待替换占位

- Hero 视频（当前为在线占位视频，失败时自动显示 CSS 水墨背景）
- 头像、4 张项目图（placehold.co 占位）
- 联系信息与社交账号为示例文本
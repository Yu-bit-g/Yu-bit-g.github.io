// ==========================================================
//  页面内容数据：项目 / 数据卡片 / 能力卡片
//  图片都在 public/images/projects/ 下，直接改文件名即可替换
// ==========================================================

export const projects = [
  {
    id: 'pocket-park',
    year: '2025',
    location: '广西 · 桂林',
    area: '约 4,800 ㎡',
    no: '壹',
    category: '城市公共空间',
    title: '施家园七星口袋公园',
    description: '在高密度街区间见缝插绿，以环形游线与中心水景广场织补社区日常，完成平面、分析与节点全图纸成果。',
    cover: '/images/projects/pocket-bird.jpg',
    images: [
      { src: '/images/projects/pocket-bird.jpg', label: '鸟瞰图' },
      { src: '/images/projects/pocket-plan.jpg', label: '彩色总平面' },
      { src: '/images/projects/pocket-analysis.jpg', label: '系列分析图' },
      { src: '/images/projects/pocket-node.jpg', label: '景观节点设计' },
      { src: '/images/projects/pocket-board1.jpg', label: '展板一' },
      { src: '/images/projects/pocket-board2.jpg', label: '展板二' },
    ],
  },
  {
    id: 'healing-space',
    year: '2025',
    location: '课程设计',
    area: '约 1,200 ㎡',
    no: '贰',
    category: '疗愈庭院',
    title: '疗愈空间 · 五感营造',
    description: '以五感疗愈为主题的空间营造，月洞门庭院与光影、气候策略共同回应身心需求，从概念分析到室内外一体呈现。',
    cover: '/images/projects/healing-courtyard.jpg',
    images: [
      { src: '/images/projects/healing-courtyard.jpg', label: '月洞门庭院' },
      { src: '/images/projects/healing-bird.jpg', label: '整体鸟瞰' },
      { src: '/images/projects/healing-tea.jpg', label: '茶室空间' },
      { src: '/images/projects/healing-plan.jpg', label: '空间平面' },
      { src: '/images/projects/healing-analysis1.jpg', label: '概念分析' },
      { src: '/images/projects/healing-analysis6.jpg', label: '场景叙事' },
    ],
  },
  {
    id: 'park-final',
    year: '2026',
    location: '河北 · 沧州',
    area: '约 8.5 公顷',
    no: '叁',
    category: '城市公园',
    title: '城市公园综合设计',
    description: '结课综合设计：功能分区、道路系统与夜景照明一体化考虑，植物与水景表达细腻，图面完成度高。',
    cover: '/images/projects/park-final.jpg',
    images: [
      { src: '/images/projects/park-final.jpg', label: '方案总览' },
      { src: '/images/projects/park-night.jpg', label: '夜景表现' },
      { src: '/images/projects/park-func.jpg', label: '功能分区' },
      { src: '/images/projects/park-road.jpg', label: '道路分析' },
    ],
  },
  {
    id: 'wetland-park',
    year: '2025',
    location: '课程设计',
    area: '约 6.2 公顷',
    no: '肆',
    category: '生态景观',
    title: '湿地公园设计',
    description: '以栈道与驳岸组织湿地游线，在生态保育与公共游憩之间寻求平衡，构建人与湿地共生的城市界面。',
    cover: '/images/projects/wetland-walk.jpg',
    images: [
      { src: '/images/projects/wetland-walk.jpg', label: '湿地栈道' },
      { src: '/images/projects/wetland-plan.jpg', label: '彩色总平面' },
      { src: '/images/projects/wetland-bird.jpg', label: '整体鸟瞰' },
      { src: '/images/projects/wetland-plaza.jpg', label: '广场节点' },
      { src: '/images/projects/wetland-water.jpg', label: '水景驳岸' },
      { src: '/images/projects/wetland-forest.jpg', label: '林下步道' },
    ],
  },
  {
    id: 'green-system',
    year: '2026',
    location: '河北 · 沧州',
    area: '城市尺度',
    no: '伍',
    category: '规划研究',
    title: '城市绿地系统规划',
    description: '中心城区公园绿地体系布局与服务半径可达性分析，构建均衡、可达的城市绿色基础设施网络。',
    cover: '/images/projects/green-system.jpg',
    images: [
      { src: '/images/projects/green-system.jpg', label: '绿地体系布局' },
      { src: '/images/projects/green-radius.jpg', label: '服务半径分析' },
      { src: '/images/projects/green-disaster.jpg', label: '防灾避险规划' },
    ],
  },
  {
    id: 'ip-joya',
    year: '2026',
    location: '大广赛 · 参赛',
    area: '形象系统',
    no: '陆',
    category: '跨界设计',
    title: '界芽 JOYA · IP 形象',
    description: '大广赛参赛 IP 形象方案，从三维形象到衍生系统的完整设计表达，探索自然符号的年轻化转译。',
    cover: '/images/projects/ip-main.jpg',
    images: [
      { src: '/images/projects/ip-main.jpg', label: 'IP 形象' },
      { src: '/images/projects/ip-system.jpg', label: '衍生系统' },
    ],
  },
]

export const stats = [
  { value: '05', suffix: '+', label: '课程项目成果' },
  { value: '02', suffix: '', label: '校企合作实践' },
  { value: '04', suffix: '+', label: 'AI 工具链' },
  { value: '01', suffix: '', label: '设计竞赛获奖' },
]

export const strengths = [
  {
    icon: 'leaf',
    no: '壹',
    en: 'ECOLOGY',
    title: '生态规划',
    description: '从水文、土壤与生境出发，构建可持续的生态基底与城市绿地系统。',
  },
  {
    icon: 'tree',
    no: '贰',
    en: 'PLANTING',
    title: '植物设计',
    description: '掌握常见园林植物识别与应用，以季相与空间节奏组织植物群落。',
  },
  {
    icon: 'spark',
    no: '叁',
    en: 'AI WORKFLOW',
    title: 'AI 工作流',
    description: '熟练运用 DeepSeek、ChatGPT、Codex 与 Claude Code，建立从调研、概念到图纸表达的独立 AI 工作流。',
  },
  {
    icon: 'ruler',
    no: '肆',
    en: 'CONSTRUCTION',
    title: '施工制图',
    description: '熟悉园林制图规范与平立剖节点表达，关注方案落地的每一处细节。',
  },
]

// AI 创作展区（图片在 public/images/studies/ 下，直接覆盖同名文件即可替换）
// 精选原则：全部为高清成品，且不与上方「精选项目」重复
export const studies = [
  // —— 图纸与彩平 ——
  { src: '/images/studies/st42-ai-masterplan.jpg', label: '彩色总平面 · AI 表现', group: '图纸与彩平' },
  { src: '/images/studies/st38-ai-archdrawing.jpg', label: '住宅施工图 · AI 生成', group: '图纸与彩平' },
  { src: '/images/studies/st39-ai-techdrawing.jpg', label: '构造制图 · AI 生成', group: '图纸与彩平' },
  { src: '/images/studies/st46-ai-atlas.jpg', label: '植物搭配图册 · AI 排版', group: '图纸与彩平' },
  // —— 场景渲染 ——
  { src: '/images/studies/st32-ai-birdview.jpg', label: '村落更新 · 鸟瞰渲染', group: '场景渲染' },
  { src: '/images/studies/st40-ai-playground.jpg', label: '儿童场地 · 鸟瞰渲染', group: '场景渲染' },
  { src: '/images/studies/st41-ai-courtyard.jpg', label: '中式庭院 · AI 渲染', group: '场景渲染' },
  // —— 角色 · 视频 ——
  { src: '/images/studies/st35-ai-video-set.jpg', label: '大厅场景九宫格 · 一致性', group: '角色 · 视频' },
  { src: '/images/studies/st44-ai-bedroom.jpg', label: '卧室场景九宫格 · 光影', group: '角色 · 视频' },
  { src: '/images/studies/st48-ai-livingroom.jpg', label: '客厅场景九宫格 · 多视角', group: '角色 · 视频' },
  { src: '/images/studies/st36-ai-video-char.jpg', label: '男性角色 · 三视图设定', group: '角色 · 视频' },
  { src: '/images/studies/st43-ai-char-female.jpg', label: '女性角色 · 三视图设定', group: '角色 · 视频' },
]

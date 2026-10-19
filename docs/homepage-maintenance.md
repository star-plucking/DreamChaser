# 首页维护指南

## 文件分工

| 文件 | 负责内容 |
| --- | --- |
| `src/views/HomeView.vue` | 首屏以下的故事、宣言、技术方向、动态与招新入口 |
| `src/components/HomeHero.vue` | 首屏文案、机器人切换、技术说明、滚动进度条 |
| `src/data/home.ts` | 三台首页机器人的双语资料及技术说明、近期动态 |
| `src/composables/useHeroMotion.ts` | Logo 退场后的首屏入场，以及展台到技术说明的滚动时间线 |
| `src/composables/useHomeMotion.ts` | 故事照片视差、横幅与宣言渐亮 |
| `src/components/HeroFlow.vue` | 线场绘制、鼠标响应、可见性暂停与资源清理 |
| `src/config/homeMotion.ts` | 动效媒体条件、偏移、缩放、阈值和线场参数 |
| `src/styles/home/hero.scss` | 首屏及其桌面、手机布局 |
| `src/styles/home/content.scss` | 首屏以下的布局 |
| `src/styles/home/_shared.scss` | 两个组件共享的按钮和眉题样式，分别在各自 scoped 样式内使用 |

## 更新内容

- 每台机器人及其 `notes` 放在同一对象内，调整 `heroMachines` 顺序时说明会一起移动。不要另建依赖数组位置的说明列表。
- `id` 是展示编号；`composition` 对应图片构图样式。新增构图时更新类型及 `hero.scss`。
- `file` 是机器人图片文件名，不含 `.webp`。图片继续通过 `imageAttrs` 读取响应式资源。
- 新闻日期沿用 `YYYY.MM.DD`；链接填写站内路由。中文和英文同步更新。
- 宣言在 `HomeView.vue` 中按句分组；每句保留两个 `.manifesto-word`，供渐亮动画使用。

## 调整动效

首屏滚动场景仅在宽度至少 1000px、高度至少 740px 且未启用减少动态效果时运行。修改条件时，**同时更新 `HERO_MOTION.desktopMedia` 和 `hero.scss` 的对应媒体查询**，避免布局与时间线启用条件不一致。

布局在 CSS 内，动画参数在 TypeScript 内；不要同时为同一元素添加 CSS transform 动画和 GSAP transform 动画。当前分层为：

- `.hero-machine`：滚动移位与入场。
- `.stage-parallax`：滚动缩放。
- `.machine-image`：鼠标视差。
- 图片本身：切换过渡。

`useHeroMotion` 直接用组件根元素作为 ScrollTrigger 的 trigger；不要换成在自身作用域内查找根元素的选择器。导航高度读取全局 `--top-bar-height`。

隐藏的按钮通过 `inert` 禁止键盘聚焦；媒体条件改变时恢复。组件卸载时必须清理监听器、定时器、GSAP context、观察器和动画帧。线场渐变仅在尺寸或滚动进度变化时重建，普通动画帧复用缓存。

## 验证

```sh
npm run typecheck
npm run build
```

浏览器检查桌面与 390px / 320px 手机布局；确认三台机器人切换、技术说明对应、滚动前进与复原、减少动态效果、中英文切换以及离开首页后返回均正常。样式重构需要比较整理前后的尺寸和间距，避免只凭构建成功判断外观未变。

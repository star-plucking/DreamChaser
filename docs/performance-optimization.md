# 图片、字体与首屏调度优化

## 保留的表现

原始图片与现有文案保留，StartupLoader 的图形、速度、飞入导航栏动画未修改。
三维点阵、鼠标视差、滚动章节与照片弹窗均保留。

## 图片

`scripts/optimize_images.py` 使用 Pillow，为 37 张机器人、人物与照片生成响应式 WebP。
原始资产不覆盖；保留透明通道、原始比例，处理 EXIF 方向，不放大原图。
已有 WebP 如果重新编码后更大，则复用原图作为高分辨率候选。
头像包含 96px 版本，其余按 320 / 640 / 960 / 1600px 生成，受原图尺寸限制。
`src/utils/images.ts` 统一提供 srcset、sizes 和尺寸属性，浏览器按显示尺寸及 DPR 选择。
添加或更换原图后运行 `python3 scripts/optimize_images.py`，提交输出资源与 manifest。

## 字体

Inter 改为本地 Latin / Latin-1 可变 WOFF2，约 54KB，使用 preload 和 font-display: swap。
移除 Google Fonts 网络依赖及未使用的 Source Code Pro，中文仍使用原有系统字体。
字体源：https://github.com/rsms/inter/blob/master/docs/font-files/InterVariable.woff2
字体授权位于 `public/fonts/Inter-LICENSE.txt`，保留 SIL OFL 声明。

## 首屏

首屏机器人图维持高优先级；在 Loading 开始退场并且首屏图解码完成后，
通过 requestIdleCallback 加载三维背景，含超时与不支持该 API 时的回退。
离开首页会取消待执行工作，原有离屏暂停和 WebGL 资源清理继续保留。
滚动章节图片在进入距离视口 600px 的区域后加载，避免首屏同时请求三张背景图。

## 验证

生产构建、类型检查、浏览器资源加载及路由交互检查通过。
检查覆盖本地字体、WebGL 请求时序、响应式图片、章节按需加载、轮播、照片弹窗、
移动端布局，以及没有 requestIdleCallback 时的回退。
640px 候选资源总体比 37 张原图小约 75%；队长照片从 1,666,137 字节降至 18,322 字节。
以上为文件体积对比，不代表所有设备会下载 640px，也不代表页面耗时降低同比例。

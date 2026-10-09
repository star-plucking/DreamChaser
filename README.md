# RoboMaster Command Center - 官方网站工程

> RM2026 北京理工大学 DreamChaser 开源资料索引：[OPEN_SOURCE_2026.md](./OPEN_SOURCE_2026.md)

这是一个基于 **Vue 3 + TypeScript + Vite** 构建的现代化 RoboMaster 战队官网。项目采用"赛博工业风"设计，旨在展示技术实力与战队文化。

## 快速开始

1. **环境准备**: 确保电脑安装了 [Node.js](https://nodejs.org/) (建议版本 v18+)。
2. **安装依赖**:
   ```powershell
   npm install
   ```
3. **启动开发服务器**:
   ```powershell
   npm run dev
   ```
   浏览器访问控制台显示的地址 (通常是 http://localhost:5173)。

## 故障排除

### Sass 弃用警告处理
如果看到 `Deprecation Warning [legacy-js-api]` 的警告，说明 Sass 使用的是旧 API。解决方案：
1. 已在 `vite.config.ts` 中配置了 `api: 'modern-compiler'`
2. 更新到最新的 Sass 版本:
   ```powershell
   npm install sass@latest --save-dev
   ```
3. 重启开发服务器

## 项目结构

```text
root
├── public/
│   └── imgs/                    # 当前网页实际使用的优化图片，会复制到 dist
├── assets-source/
│   └── imgs/                    # 原始照片、机器人和机娘素材，不会随网页发布
├── src/
│   ├── components/              # 公共组件
│   │   ├── NavBar.vue          # 导航栏
│   │   ├── StatusBar.vue       # 底部状态栏
│   │   ├── CommanderAssistant.vue
│   │   └── StartupLoader.vue   # 启动动画
│   ├── views/                   # 页面视图
│   │   ├── HomeView.vue        # 首页、技术方向与近期消息
│   │   ├── TeamView.vue        # 核心队员介绍
│   │   ├── RobotsView.vue      # 机器人介绍
│   │   ├── AboutView.vue       # 战队介绍、历程、荣誉与照片墙
│   │   ├── SparksView.vue      # 开源文档与仓库
│   │   └── MerchView.vue       # 联系方式与招新
│   ├── i18n/                    # 国际化配置
│   ├── locales/                 # 翻译文件
│   │   ├── zh-CN.ts            # 中文
│   │   └── en-US.ts            # 英文
│   ├── router/                  # 路由配置
│   ├── styles/                  # 全局样式与SCSS变量
│   ├── App.vue                  # 根组件布局
│   └── main.ts                  # 应用入口
└── vite.config.ts              # Vite 配置（含 Sass API 现代编译器）
```

## 内容维护指南

所有页面内容均为**本地配置 (Hardcoded)**，直接修改对应的 `.vue` 文件更新内容。

### 1. 图片资源

**网页使用的图片**: `public/imgs/`

高分辨率原图和当前页面未使用的素材保存在 `assets-source/imgs/`，避免被 Vite 一并复制到部署产物。需要在网页中使用归档图片时，先导出合适尺寸的 WebP 到 `public/imgs/`，再在页面中引用。

**建议**:
- 将中文文件名改为英文 (例如 `1号-操作手.jpg` → `operator_wang.webp`)
- 建议使用 WebP 格式以优化加载性能
- 在 Vue 代码中使用 `import.meta.env.BASE_URL` 构造图片路径，确保 GitHub Pages 子路径部署可用

### 2. 首页 (HomeView.vue)

**修改位置**: `src/views/HomeView.vue` 中的 `capabilities` 和 `news` 数据

**首页内容**:
```typescript
const capabilities = computed(() => [
  t('home.capabilities.engineeringTitle'),
  t('home.capabilities.intelligenceTitle'),
  t('home.capabilities.competitionTitle'),
  t('home.capabilities.knowledgeTitle')
])
```

**快讯格式**:
```typescript
const news = ref([
  { id: 1, date: '2025-11-30', title: '校内机器人赛事', titleEn: 'Campus robotics competition', category: 'competition' },
  { id: 2, date: '2025-09-13', title: '秋季招新', titleEn: 'Autumn recruitment', category: 'event' }
])
```

### 3. 队员介绍 (TeamView.vue)

**修改位置**: `src/views/TeamView.vue` 中的 `members` 数组

当前网页展示有照片并完成介绍的 7 名核心队员。其他队员资料继续保存在 `TEAM_MEMBERS_2026.md`，后续补齐照片和介绍后再加入页面。数据结构：
```typescript
interface Member {
  id: number;
  name: string;                    // 姓名
  role: string;                    // 中文职位
  roleEn: string;                  // 英文职位
  groups: string[];                // 分类：MANAGEMENT、OPERATORS 等
  img: string;                      // 头像路径
  title: string;                    // 队内职务（中文）
  titleEn: string;                  // 队内职务（英文）
  technicalGroup: string;           // 技术组名称
  technicalGroupEn: string;         // 技术组名称（英文）
  description: string;              // 个人介绍
  descriptionEn: string;            // 个人介绍（英文）
}
```

**示例**:
```typescript
{ 
  id: 1, 
  name: 'Cheng Zhihong', 
  role: 'Captain', 
  roleEn: 'Captain',
  groups: ['MANAGEMENT'],
  img: `${import.meta.env.BASE_URL}imgs/people/xxx.webp`,
  title: '队长',
  titleEn: 'Captain',
  technicalGroup: '电控组',
  technicalGroupEn: 'Electrical',
  description: '负责团队管理。',
  descriptionEn: 'Leads the team.'
}
```

### 4. 发展历程 (AboutView.vue)

**修改位置**: `src/views/AboutView.vue` 中的 `milestones` 数组

**时间线格式**:
```typescript
{
  year: '2015-2018',
  title: '前身阶段',
  titleEn: 'Early Years',
  desc: '自动化学院成立RoboMaster和Robocon参赛队，Robocon战队在2016年和2017年分别获得全国三等奖和北部分区赛三等奖',
  descEn: 'School of Automation established RoboMaster and Robocon teams. Robocon team won National Third Prize in 2016 and Northern Regional Third Prize in 2017',
  image: ''
}
```

### 5. 机器人介绍 (RobotsView.vue)

**修改位置**: `src/views/RobotsView.vue` 中的 `robots` 数组

每台机器人使用 `nameZh` / `nameEn`、`typeZh` / `type`、中英文介绍及中英文特征标签；图片统一从 `public/imgs/robots/` 引用。

### 6. 开源文档 (SparksView.vue)

**修改位置**: `src/views/SparksView.vue`

**更新内容**:
- 代码仓库: 修改 `repos` 数组
- 下载文档: 修改 `docs` 数组

### 7. 周边商店 (MerchView.vue)

**修改位置**: `src/views/MerchView.vue`

**操作**:
- 修改 `items` 数组更新商品信息
- 修改 `fallbackImg` 变量指向机娘立绘图片路径

## 多语言支持 (i18n)

项目支持中文和英文，翻译文件位置:
- `src/locales/zh-CN.ts` - 中文翻译
- `src/locales/en-US.ts` - 英文翻译

在代码中使用 `{{ t('key') }}` 来引用翻译密钥。

## 部署到 GitHub Pages

### 快速开始

#### 1. 初始化 Git 并推送代码
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/DreamChaser.git
git push -u origin main
```

#### 2. 创建自动化部署工作流

在项目根目录创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 3. 提交工作流配置
```powershell
git add .
git commit -m "Add GitHub Actions CI/CD"
git push origin main
```

#### 4. 检查 GitHub Actions 权限设置

1. 进入仓库 **Settings** → **Actions** → **General**
2. **Workflow permissions** 改为 **Read and write permissions**
3. 勾选 **Allow GitHub Actions to create and approve pull requests**
4. 点击 **Save**

#### 5. 等待 GitHub Actions 完成

1. 进入仓库 **Actions** 标签页
2. 找到 "Deploy to GitHub Pages" 工作流
3. 确保它显示 ✅ 绿色对勾（表示成功）
4. 如果显示 ❌ 红色，点击查看错误日志并修复

#### 6. 配置 GitHub Pages

**只有当 GitHub Actions 成功完成后**，才能看到 `gh-pages` 分支：

1. 进入仓库 **Settings** → **Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 下拉菜单选择 `gh-pages`
4. 文件夹选择 `/ (root)`
5. 点击 **Save**

#### 7. 访问你的网站

GitHub Pages 完成配置后，几分钟内访问：
```
https://你的用户名.github.io/DreamChaser/
```

### 常见问题

**Q: 为什么看不到 gh-pages 分支？**
- A: GitHub Actions 还没有成功运行。检查 Actions 标签页，查看工作流是否有错误

**Q: GitHub Actions 报错怎么办？**
- A: 点击工作流详情查看错误日志，常见问题：
  - Workflow permissions 权限不足（见步骤4）
  - 包依赖问题（检查 package.json）
  - 构建失败（运行本地 `npm run build` 测试）

**Q: 已配置 Pages 但网站还是 404？**
- A: 检查 `vite.config.ts` 中的 `base` 配置是否正确，应为 `/DreamChaser/`

### 配置说明

- ✅ 已在 `vite.config.ts` 中配置 `base: '/DreamChaser/'`
- ✅ 已使用 `createWebHashHistory()` 确保路由正常工作
- ✅ GitHub Actions 会自动创建和管理 `gh-pages` 分支（无需手动创建）
- 每次推送到 `main` 分支，GitHub Actions 会自动构建并部署到 `gh-pages` 分支

## 注意事项

- **网页图片**: 只将当前页面需要的压缩图片放在 `public/imgs/`；原图保存在 `assets-source/imgs/`
- **浏览器缓存**: 替换图片后如网页无变化，尝试 `Ctrl + F5` 强制刷新
- **WebP格式**: 推荐使用WebP格式图片以优化性能
- **路径约定**: 在 Vue 代码中通过 `import.meta.env.BASE_URL` 构造资源路径，兼容 GitHub Pages 子路径

# RoboMaster Command Center - 官方网站工程

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
│   └── imgs/                    # 静态图片资源
│       ├── 机娘/               # 吉祥物立绘
│       ├── robots/              # 机器人图片
│       └── people/              # 队员照片
│           └── 北京理工大学_人员/
│               └── 北京理工大学_人员/
│                   ├── 操作手/
│                   ├── 研发代表/
│                   └── 留念/
├── src/
│   ├── components/              # 公共组件
│   │   ├── NavBar.vue          # 导航栏
│   │   ├── StatusBar.vue       # 底部状态栏
│   │   └── CommanderAssistant.vue
│   ├── views/                   # 页面视图
│   │   ├── HomeView.vue        # 首页（统计数据、快讯）
│   │   ├── TeamView.vue        # 队员介绍（含雷达图）
│   │   ├── RobotsView.vue      # 机器人介绍
│   │   ├── NewsView.vue        # 发展历程时间线
│   │   ├── SparksView.vue      # 开源文档与仓库
│   │   └── MerchView.vue       # 周边商店
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

**位置**: `public/imgs/`

**建议**:
- 将中文文件名改为英文 (例如 `1号-操作手.jpg` → `operator_wang.webp`)
- 建议使用 WebP 格式以优化加载性能
- 在代码中使用绝对路径 `/imgs/xxx/yyy.webp`

### 2. 首页 (HomeView.vue)

**修改位置**: `src/views/HomeView.vue` 中的 `stats` 和 `news` 数据

**统计数据格式**:
```typescript
const stats = computed(() => [
  { label: t('home.stats.coreCodeLines'), value: '10,543,855', unit: t('home.units.loc') },
  { label: t('home.stats.totalPoints'), value: '11.300', unit: t('home.units.points') },
  { label: t('home.stats.ranking'), value: '43', unit: t('home.units.rank') },
  { label: t('home.stats.activeOperatives'), value: '50+', unit: t('home.units.personnel') }
])
```

**快讯格式**:
```typescript
const news = ref([
  { id: 1, date: '2025-11-30', title: '"追梦杯"机器人校内赛决赛', category: 'COMPETITION' },
  { id: 2, date: '2025-09-13', title: '机器人队秋招正式启动', category: 'EVENT' },
  { id: 3, date: '2025-05-26', title: 'RMUC机甲大师超级对抗赛东部分区赛', category: 'COMPETITION' }
])
```

### 3. 队员介绍 (TeamView.vue)

**修改位置**: `src/views/TeamView.vue` 中的 `members` 数组

**数据结构**:
```typescript
interface Member {
  id: number;
  name: string;                    // 英文名
  role: string;                    // 英文职位
  group: string;                   // 分类：MANAGEMENT、OPERATORS
  img: string;                      // 头像路径
  title: string;                    // 队内职务（中文）
  technicalGroup: string;           // 技术组名称
  description: string;              // 个人介绍
}
```

**示例**:
```typescript
{ 
  id: 1, 
  name: 'Cheng Zhihong', 
  role: 'Captain', 
  group: 'MANAGEMENT', 
  img: '/imgs/people/北京理工大学_人员/北京理工大学_人员/xxx.webp',
  title: '队长',
  technicalGroup: '电控组',
  description: '具备卓越的领导能力和技术专长，负责团队整体战略规划与执行。'
}
```

### 4. 发展历程 (NewsView.vue)

**修改位置**: `src/views/NewsView.vue` 中的 `milestones` 数组

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

### 5. 机器人参数 (RobotsView.vue)

**修改位置**: `src/views/RobotsView.vue` 中的 `robots` 数组

**修改 `specs` 对象中的数值** (进度条会自动调整):
- `speed` - 速度
- `hp` - 血量
- `ammo` - 弹药
- 等其他参数

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

- **图片重命名**: 尽快将 `public/imgs` 下的中文文件名改为英文，避免部署后路径失效
- **浏览器缓存**: 替换图片后如网页无变化，尝试 `Ctrl + F5` 强制刷新
- **WebP格式**: 推荐使用WebP格式图片以优化性能
- **路径约定**: 使用绝对路径 `/imgs/...` 而非相对路径

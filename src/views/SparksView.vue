<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, X, FileText, FileCode2, Cog, SlidersHorizontal, ScanEye, Route, CircuitBoard, Zap, Wrench } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const search = ref('')
const docIcons: Record<string, typeof FileText> = { REPORT: FileText, MECH: Cog, CTRL: SlidersHorizontal, VISION: ScanEye, ROS2: Route, FPGA: CircuitBoard, POWER: Zap, TOOL: Wrench, ARTICLE: FileCode2 }

const docs = [
  {
    title: 'RM2026 技术报告（工程组）',
    titleEn: 'RM2026 Technical Report (Engineer Division)',
    description: '整合机械、控制与视觉方向的 2026 赛季技术报告',
    descriptionEn: 'RM2026 engineering report covering mechanics, control and vision',
    type: 'REPORT',
    url: 'https://bbs.robomaster.com/article/1942648'
  },
  {
    title: '单&双臂上台阶工程机器人机械开源',
    titleEn: 'Single & Dual Arm Stair-Climbing Engineer Robot',
    description: '工程机器人机械结构设计与实现',
    descriptionEn: 'Mechanical design of the engineer robot',
    type: 'MECH',
    url: 'https://bbs.robomaster.com/article/1942225'
  },
  {
    title: '工程自定义控制器机械部分开源',
    titleEn: 'Custom Engineer Controller Mechanics',
    description: 'DreamChaser RM2026 工程自定义控制器机械设计',
    descriptionEn: 'Mechanical design of the custom controller',
    type: 'MECH',
    url: 'https://bbs.robomaster.com/article/1942228'
  },
  {
    title: '七轴双臂机械臂控制技术开源',
    titleEn: 'Seven-Axis Dual-Arm Control',
    description: '仿人形双臂机械臂的嵌入式控制方案',
    descriptionEn: 'Embedded control for a humanoid dual-arm robot',
    type: 'CTRL',
    url: 'https://bbs.robomaster.com/article/1941628'
  },
  {
    title: '工程视觉上位机方案开源',
    titleEn: 'Engineer Vision Host Application',
    description: 'RM2026 工程机器人视觉上位机方案',
    descriptionEn: 'Vision host application for the RM2026 engineer robot',
    type: 'VISION',
    url: 'https://bbs.robomaster.com/article/1940784'
  },
  {
    title: '哨兵自主导航开源',
    titleEn: 'Sentry Autonomous Navigation',
    description: 'ROS 2、激光雷达、定位、规划与 MPC 跟踪完整链路',
    descriptionEn: 'ROS 2 navigation with lidar, planning and MPC tracking',
    type: 'ROS2',
    url: 'https://bbs.robomaster.com/article/1940848'
  },
  {
    title: '轮腿机器人 FPGA 强化学习加速器',
    titleEn: 'FPGA RL Accelerator for Wheeled-Leg Robots',
    description: '基于 ZYNQ-7010 的实验性强化学习硬件加速',
    descriptionEn: 'Experimental RL hardware acceleration on ZYNQ-7010',
    type: 'FPGA',
    url: 'https://bbs.robomaster.com/article/1941956'
  },
  {
    title: 'FPGA 制导飞镖控制器软硬件开源',
    titleEn: 'FPGA Guided Dart Controller',
    description: '控制板、RTL、Vivado、PetaLinux 与制导控制全栈开源',
    descriptionEn: 'Open hardware, RTL, Vivado, PetaLinux and guidance control',
    type: 'FPGA',
    url: 'https://bbs.robomaster.com/article/1939776'
  },
  {
    title: 'DAB 双有源桥无线充电系统',
    titleEn: 'DAB Wireless Charging System',
    description: 'RM2026 无线充电系统迭代方案',
    descriptionEn: 'An updated wireless charging system for RM2026',
    type: 'POWER',
    url: 'https://bbs.robomaster.com/article/1890297'
  },
  {
    title: 'ZeroShot 自动标注系统',
    titleEn: 'ZeroShot Auto-Labeling System',
    description: '北京理工大学公开的 SAM 自动标注工具',
    descriptionEn: 'BIT open-source SAM-based auto-labeling tool',
    type: 'TOOL',
    url: 'https://github.com/HargereavesQin/bit-auto-label'
  },
  {
    title: '300FPS识别帧率FPGA制导飞镖开源',
    titleEn: '300FPS Recognition & FPGA Guided Dart',
    description: '一种高帧率的视觉识别与制导方法',
    descriptionEn: 'A high-frame-rate vision recognition and guidance method',
    type: 'ARTICLE',
    url: 'https://bbs.robomaster.com/article/1438280' // 替换为实际链接
  },
  {
    title: '校内赛方案开源',
    titleEn: 'Intra-school Competition Strategy Open Source',
    description: '完整的校内赛战术与实现方案',
    descriptionEn: 'Complete intra-school competition tactics and implementation plan',
    type: 'ARTICLE',
    url: 'https://bbs.robomaster.com/article/1316520'
  },
  {
    title: '无线充电装置软硬件开源',
    titleEn: 'Wireless Charging Device Hardware and Software Open Source',
    description: '无线充电装置的设计与实现',
    descriptionEn: 'Wireless charging device design and implementation',
    type: 'ARTICLE',
    url: 'https://bbs.robomaster.com/article/716312'
  },
  {
    title: '半下供弹麦轮步兵机械开源',
    titleEn: 'Half-Down Ammunition Feeding Mecanum Infantry Mechanical Open Source',
    description: '麦轮步兵机器人机械设计与实现',
    descriptionEn: 'Mecanum infantry robot mechanical design and implementation',
    type: 'ARTICLE',
    url: 'https://bbs.robomaster.com/article/555578'
  }
]

const filteredDocs = computed(() => {
  const query = search.value.trim().toLowerCase()
  return docs.filter(doc => `${doc.title} ${doc.titleEn} ${doc.description} ${doc.descriptionEn} ${doc.type}`.toLowerCase().includes(query))
})

const featuredDocs = [docs[10], docs[12], docs[3]]

const bilibiliUrl = 'https://space.bilibili.com/411495552' // 替换为实际的B站链接
</script>

<template>
  <div class="sparks-container">
    <div v-reveal class="header"><p class="page-eyebrow">KNOWLEDGE / OPEN SOURCE</p>
      <h1>{{ t('knowledge.title') }}</h1>
      <p>{{ t('knowledge.subtitle') }}</p>
    </div>

    <div class="content-wrapper">
      <section v-reveal class="open-source-focus" aria-labelledby="open-source-focus-title"><header data-reveal-item><p class="focus-eyebrow">FROM THE ARENA, TO THE COMMUNITY</p><h2 id="open-source-focus-title">{{ locale === 'zh-CN' ? '让一次突破，成为下一次起点。' : 'Share a breakthrough. Start the next one.' }}</h2><p class="focus-intro">{{ locale === 'zh-CN' ? '从 300FPS 视觉识别与 FPGA 制导，到无线充电和双臂控制。我们把赛场上的探索整理为可追溯的技术资料，与更多研发者共同进步。' : 'From 300FPS vision and FPGA guidance to wireless charging and dual-arm control, we document our engineering work so others can build on it.' }}</p></header><div class="focus-projects"><a v-for="doc in featuredDocs" :key="doc.url" :href="doc.url" target="_blank" rel="noopener noreferrer" data-reveal-item><h3>{{ locale === 'zh-CN' ? doc.title : doc.titleEn }}</h3><p>{{ locale === 'zh-CN' ? doc.description : doc.descriptionEn }}</p><span>{{ locale === 'zh-CN' ? '阅读开源原帖' : 'Read the original release' }} ↗</span></a></div><p class="source-license" data-reveal-item>{{ locale === 'zh-CN' ? '使用与转载请遵循各原帖的授权声明，并注明作者及出处。' : 'Follow each original release’s licence and credit its authors and source.' }}</p></section>

      <!-- 开源文档 -->
      <section class="section-docs">
        <h2 class="section-badge">{{ t('knowledge.docs') }}</h2>
        <div class="search-row"><label class="search-field"><Search :size="17" aria-hidden="true" /><input v-model="search" type="search" :aria-label="locale === 'zh-CN' ? '搜索开源资料' : 'Search open-source resources'" :placeholder="locale === 'zh-CN' ? '搜索技术、项目或关键词…' : 'Search projects, technologies, keywords…'" /><button v-if="search" :aria-label="locale === 'zh-CN' ? '清除搜索' : 'Clear search'" @click="search = ''"><X :size="16" /></button></label><span class="result-count" role="status">{{ filteredDocs.length }} / {{ docs.length }}</span></div>
        <p v-if="!filteredDocs.length" class="empty-search">{{ locale === 'zh-CN' ? '暂未找到相关资料，试试其他关键词。' : 'No resources found. Try another keyword.' }}</p>
        <div class="doc-list">
          <a
            v-for="doc in filteredDocs"
            :key="doc.url"
            :href="doc.url"
            target="_blank"
            rel="noopener noreferrer"
            v-surface class="doc-item motion-surface"
          >
            <div class="doc-icon" aria-hidden="true"><component :is="docIcons[doc.type] || FileCode2" :size="25" :stroke-width="1.5" /></div>
            <div class="doc-info">
              <div class="doc-title">{{ $i18n.locale === 'zh-CN' ? doc.title : doc.titleEn }}</div>
              <div class="doc-desc">{{ $i18n.locale === 'zh-CN' ? doc.description : doc.descriptionEn }}</div>
            </div>
            <div class="link-arrow">→</div>
          </a>
        </div>
      </section>

      <!-- Bilibili培训视频 -->
      <section class="section-training">
        <h2 class="section-badge">{{ t('knowledge.training') }}</h2>
        <div class="training-banner">
          <div class="bilibili-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="80" height="80">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>
            </svg>
          </div>
          <h3>{{ t('knowledge.watchOnBilibili') }}</h3>
          <p>{{ t('knowledge.trainingDesc') }}</p>
          <a :href="bilibiliUrl" target="_blank" rel="noopener noreferrer" v-magnetic class="bilibili-btn">
            <span>Bilibili >></span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.focus-eyebrow { font-family: $font-code; font-size: 13px; letter-spacing: 1px; color: #a4c6b3; margin: 0 0 20px; }.open-source-focus h2 { font-size: clamp(28px, 3vw, 40px); font-weight: 500; line-height: 1.4; margin: 0 0 20px; }.focus-intro { font-size: 17px; line-height: 1.85; color: #afc1b5; max-width: 900px; margin: 0; }
.focus-projects { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin-top: 32px; }.focus-projects a { display: flex; flex-direction: column; border-top: 1px solid #a8e8cc44; padding: 24px 0 8px; color: inherit; }.focus-projects h3 { font-size: 21px; font-weight: 500; line-height: 1.5; margin: 0 0 14px; }.focus-projects p { font-size: 16px; color: #aebeb4; line-height: 1.8; margin: 0 0 20px; }.focus-projects span { font-size: 15px; color: #c3efda; margin-top: auto; }.focus-projects a:hover h3 { color: #c3efda; }.source-license { font-size: 14px; color: #9bb2a4; line-height: 1.8; margin: 24px 0 0; }
@media(max-width: 768px) { .focus-projects { grid-template-columns: 1fr; gap: 20px; }.focus-intro { font-size: 16px; } }

.sparks-container {
  padding: var(--page-padding-y) var(--page-padding-x);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-family: $font-title;
    font-size: 4rem;
    color: $color-primary;
    @include text-glow;
    margin: 0;
    text-transform: uppercase;
  }

  p {
    color: $color-text-dim;
    font-family: $font-body;
    letter-spacing: 0.03em;
    margin-top: 1rem;
    font-size: 1.2rem;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 4rem;
}

.section-badge {
  display: inline-block;
  background: $color-primary;
  color: $color-bg;
  padding: 0.5rem 1.5rem;
  font-family: $font-code;
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.section-docs {
  .doc-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

.doc-item {
  display: flex;
  align-items: center;
  @include glass-panel;
  padding: 1.5rem;
  transition: all 0.3s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    border-color: $color-primary;
    box-shadow: 0 0 20px rgba($color-primary, 0.3);

    .link-arrow {
      transform: translateX(5px);
      color: $color-primary;
    }
  }

  .doc-icon {
    width: 50px;
    height: 50px;
    background: rgba($color-primary, 0.2);
    color: $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: .875rem;
    margin-right: 1rem;
    flex-shrink: 0;
    border: 2px solid $color-primary;
  }

  .doc-info {
    flex: 1;
    min-width: 0;
  }

  .doc-title {
    color: $color-white;
    font-family: $font-body;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .doc-desc {
    color: $color-text-dim;
    font-size: .875rem;
    font-family: $font-body;
  }

  .link-arrow {
    color: $color-accent;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s;
    flex-shrink: 0;
    margin-left: 1rem;
  }
}

.section-training {
  .training-banner {
    @include glass-panel;
    padding: 4rem 3rem;
    text-align: center;
    background: linear-gradient(135deg, rgba($color-primary, 0.05), rgba(#00A1D6, 0.1));
    border: 2px solid rgba(#00A1D6, 0.3);

    .bilibili-icon {
      color: #00A1D6;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;

      svg {
        filter: drop-shadow(0 0 20px rgba(#00A1D6, 0.5));
      }
    }

    h3 {
      font-family: $font-title;
      font-size: 2rem;
      color: $color-white;
      margin: 0 0 1.5rem;
      text-transform: uppercase;
    }

    p {
      font-family: $font-body;
      color: $color-text-dim;
      font-size: 1.1rem;
      margin: 0 0 2.5rem;
      line-height: 1.6;
    }

    .bilibili-btn {
      display: inline-block;
      background: #00A1D6;
      color: white;
      padding: 1rem 3rem;
      font-family: $font-title;
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      transition: all 0.3s;
      border: 2px solid #00A1D6;

      &:hover {
        background: transparent;
        color: #00A1D6;
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(#00A1D6, 0.5);
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    margin-bottom: 2.5rem;

    h1 {
      font-size: clamp(2.2rem, 12vw, 3rem);
    }

    p {
      font-size: 0.95rem;
      letter-spacing: 2px;
    }
  }

  .content-wrapper {
    gap: 2.5rem;
  }

  .section-docs .doc-list {
    grid-template-columns: 1fr;
  }

  .doc-item {
    padding: 1rem;
    align-items: flex-start;

    .doc-title {
      line-height: 1.5;
    }

    .doc-desc {
      line-height: 1.5;
    }
  }

  .section-training .training-banner {
    padding: 2rem 1.25rem;

    .bilibili-icon svg {
      width: 64px;
      height: 64px;
    }

    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }

    .bilibili-btn {
      width: 100%;
      padding: 0.9rem 1.25rem;
      font-size: 1rem;
    }
  }
}

.sparks-container { max-width: 1600px; margin: auto; }
.header { text-align: left; margin-bottom: 44px; }
.header .page-eyebrow { font-family: $font-code; font-size: 14px; letter-spacing: 2px; color: #75958b; margin: 0 0 16px; }
.header h1 { font-size: clamp(28px, 3vw, 42px); color: #e4ede8; font-weight: 500; letter-spacing: -1px; }
.header > p:last-child { font-size: 14px; margin-top: 12px; }
.content-wrapper { max-width: none; }
.section-badge { background: transparent; padding: 0; color: #e4ede8; font-family: $font-body; font-size: 18px; font-weight: 500; margin: 0 0 24px; }
.search-row { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
.search-field { display: flex; align-items: center; gap: 12px; padding: 12px 16px; width: min(480px, 100%); background: #111b1e; border: 1px solid #ffffff1b; border-radius: 4px; color: #7da58f; }
.search-field:focus-within { border-color: #a8e8cc70; }
.search-field input { width: 100%; background: transparent; border: 0; outline: 0; font-size: 14px; color: #e4ede8; }
.search-field input::-webkit-search-cancel-button { display: none; }
.search-field button { border: 0; padding: 0; background: transparent; cursor: pointer; color: #a8e8cc; }
.result-count { font-family: $font-code; font-size: 14px; color: #708d80; white-space: nowrap; }
.empty-search { padding: 36px 0; color: #96a3a7; font-size: 14px; }
.section-docs .doc-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.doc-item { background: #111b1e; border-radius: 4px; padding: 24px; }
.doc-item:hover { box-shadow: none; transform: translateY(-3px); background: #16251f; border-color: #a8e8cc55; }
.doc-item .doc-icon { background: #a8e8cc09; border: 1px solid #a8e8cc25; font-family: $font-code; border-radius: 3px; width: 48px; height: 48px; font-size: 14px; }
.doc-item .doc-title { font-size: 14px; font-weight: 500; }
.doc-item .doc-desc { font-size: 14px; line-height: 1.8; color: #81978d; }
.doc-item .link-arrow { font-size: 18px; font-weight: 400; color: #7c9c8b; }
.section-training .training-banner { background: #111b1e; border: 1px solid #ffffff16; border-radius: 4px; padding: 48px 28px; }
.section-training .training-banner .bilibili-icon { margin-bottom: 22px; color: #a8e8cc; }
.section-training .training-banner .bilibili-icon svg { filter: none; width: 45px; height: 45px; }
.section-training .training-banner h3 { font-size: 26px; font-weight: 500; }
.section-training .training-banner p { font-size: 14px; }
.section-training .training-banner .bilibili-btn { background: #a8e8cc; border-color: #a8e8cc; color: #10241d; padding: 12px 24px; font-size: 14px; border-radius: 3px; }
.section-training .training-banner .bilibili-btn:hover { box-shadow: none; background: #cbf5df; transform: translateY(-2px); color: #10241d; }
@media (max-width: 768px) { .section-docs .doc-list { grid-template-columns: 1fr; } .doc-item { padding: 20px; } .search-row { gap: 14px; } }


.sparks-container { max-width: 1680px; padding-top: 80px; }
.header { margin-bottom: 60px; padding-bottom: 40px; border-bottom: 1px solid #ffffff20; }
.header h1 { font-size: var(--heading-page); font-weight: 600; letter-spacing: -2px; line-height: 1.25; }
.header > p:last-child { font-size: 19px; color: #b0c4b6; }
.header .page-eyebrow { font-size: 14px; color: #a2c6b2; margin-bottom: 24px; }
.section-badge { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.search-row { margin-bottom: 36px; }
.search-field { width: min(640px, 100%); padding: 17px 20px; }
.search-field input { font-size: 16px; }
.result-count { font-size: 14px; }
.section-docs .doc-list { gap: 24px; }
.doc-item { padding: 30px; background: #111d18; }
.doc-item .doc-icon { width: 64px; height: 64px; font-size: 10px; border-color: #a8e8cc35; }
.doc-item .doc-title { font-size: 20px; font-weight: 500; line-height: 1.5; margin-bottom: 12px; }
.doc-item .doc-desc { font-size: 16px; color: #a3bcab; }
.doc-item .link-arrow { font-size: 28px; }
.section-training .training-banner { padding: 70px 36px; }
.section-training .training-banner h3 { font-size: var(--heading-section); font-weight: 600; }
.section-training .training-banner p { font-size: 18px; }
.section-training .training-banner .bilibili-btn { font-size: 16px; padding: 16px 30px; }
@media (max-width: 768px) { .sparks-container { padding-top: 46px; } .header { margin-bottom: 40px; padding-bottom: 30px; } .header h1 { font-size: 44px; } .header > p:last-child { font-size: 17px; } .doc-item { padding: 24px 20px; } .doc-item .doc-title { font-size: 18px; } .doc-item .doc-desc { font-size: 15px; } .doc-item .doc-icon { width: 48px; height: 48px; font-size: 8px; margin-right: 14px; } }

</style>

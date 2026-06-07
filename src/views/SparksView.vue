<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const docs = [
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

const bilibiliUrl = 'https://space.bilibili.com/411495552' // 替换为实际的B站链接
</script>

<template>
  <div class="sparks-container">
    <div class="header">
      <h1>{{ t('knowledge.title') }}</h1>
      <p>{{ t('knowledge.subtitle') }}</p>
    </div>

    <div class="content-wrapper">
      <!-- 开源文档 -->
      <section class="section-docs">
        <h2 class="section-badge">{{ t('knowledge.docs') }}</h2>
        <div class="doc-list">
          <a 
            v-for="(doc, idx) in docs" 
            :key="idx" 
            :href="doc.url" 
            target="_blank"
            class="doc-item"
          >
            <div class="doc-icon">{{ doc.type }}</div>
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
          <a :href="bilibiliUrl" target="_blank" class="bilibili-btn">
            <span>Bilibili >></span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    font-family: $font-code; 
    letter-spacing: 4px; 
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
    font-size: 0.7rem;
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
    font-family: $font-code; 
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .doc-desc { 
    color: $color-text-dim; 
    font-size: 0.85rem;
    font-family: $font-code;
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
      font-family: $font-code;
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
</style>

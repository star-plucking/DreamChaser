<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// 发展历程时间线
const milestones = [
  {
    year: '2015-2018',
    title: '前身阶段',
    titleEn: 'Early Years',
    desc: '自动化学院成立RoboMaster和Robocon参赛队，Robocon战队在2016年和2017年分别获得全国三等奖和北部分区赛三等奖',
    descEn: 'School of Automation established RoboMaster and Robocon teams. Robocon team won National Third Prize in 2016 and Northern Regional Third Prize in 2017',
    image: ''
  },
  {
    year: '2018',
    title: '正式成立',
    titleEn: 'Official Establishment',
    desc: '2018年5月10日，北京理工大学机器人队正式挂牌成立，战队名称确定为Dream Chaser（追梦战队），释义为"我们都在努力奔跑，我们都是追梦人"',
    descEn: 'May 10, 2018, BIT Robot Team officially established as Dream Chaser, meaning "We are all running hard, we are all dream chasers"',
    image: ''
  },
  {
    year: '2019',
    title: '首战告捷',
    titleEn: 'First Victory',
    desc: '获得北部赛区二等奖，全国三等奖，步兵对抗单项赛全国冠军',
    descEn: 'Northern Regional Second Prize, National Third Prize, and National Champion in Infantry Combat',
    image: ''
  },
  {
    year: '2020',
    title: '线上突破',
    titleEn: 'Online Achievement',
    desc: '受疫情影响线下赛取消，线上评审获得全国二等奖，工程机器人获得线上评审一等奖',
    descEn: 'Due to COVID-19, won National Second Prize in online review, Engineering Robot won First Prize',
    image: ''
  },
  {
    year: '2021',
    title: '晋级八强',
    titleEn: 'Top 8 Achievement',
    desc: '北部赛区一等奖，以八强成绩晋级全国赛，获得全国二等奖',
    descEn: 'Northern Regional First Prize, advanced to nationals as Top 8, won National Second Prize',
    image: ''
  },
  {
    year: '2022',
    title: '多线开花',
    titleEn: 'Multiple Achievements',
    desc: '东部赛区二等奖、全国赛三等奖，高校联盟赛一等奖',
    descEn: 'Eastern Regional Second Prize, National Third Prize, University League First Prize',
    image: ''
  },
  {
    year: '2023',
    title: '稳步前行',
    titleEn: 'Steady Progress',
    desc: '北部分区赛三十二强',
    descEn: 'Top 32 in Northern Regional',
    image: ''
  },
  {
    year: '2024',
    title: '巅峰时刻',
    titleEn: 'Peak Moment',
    desc: '中部分区赛冠军，全国赛十六强，获得国家级一等奖',
    descEn: 'Central Regional Champion, National Top 16, National First Prize',
    image: ''
  },
  {
    year: '2025',
    title: '持续拼搏',
    titleEn: 'Continuous Effort',
    desc: '东部分区赛三十二强',
    descEn: 'Top 32 in Eastern Regional',
    image: ''
  },
  {
    year: '2026',
    title: '再攀高峰',
    titleEn: 'New Heights',
    desc: '联盟赛山东站亚军，北部分区赛八强',
    descEn: 'Runner-up at the University League Shandong Station and Top 8 in the Northern Regional',
    image: ''
  }
]

// 荣誉展示
const honors = [
  {
    title: '2026联盟赛山东站亚军',
    titleEn: '2026 University League Shandong Station Runner-up',
    event: 'RoboMaster 2026 University League Shandong Station',
    eventEn: 'RoboMaster 2026 University League Shandong Station',
    image: ''
  },
  {
    title: '2026北部分区赛八强',
    titleEn: '2026 Northern Regional Top 8',
    event: 'RoboMaster 2026 Northern Regional Competition',
    eventEn: 'RoboMaster 2026 Northern Regional Competition',
    image: ''
  },
  {
    title: '2024中部赛区冠军',
    titleEn: '2024 Central Regional Champion',
    event: 'RoboMaster 2024 Regional Competition',
    eventEn: 'RoboMaster 2024 Regional Competition',
    image: ''
  },
  {
    title: '国家级一等奖',
    titleEn: 'National First Prize',
    event: 'RoboMaster 2024 National Competition',
    eventEn: 'RoboMaster 2024 National Competition',
    image: ''
  },
  {
    title: '高校联盟赛一等奖',
    titleEn: 'RMUL First Prize',
    event: 'RoboMaster 2022 University League',
    eventEn: 'RoboMaster 2022 University League',
    image: ''
  },
  {
    title: '北部赛区一等奖',
    titleEn: 'Northern Regional First Prize',
    event: 'RoboMaster 2021 Northern Regional Competition',
    eventEn: 'RoboMaster 2021 Northern Regional Competition',
    image: ''
  },
  {
    title: '步兵对抗全国冠军',
    titleEn: 'Infantry Combat National Champion',
    event: 'RoboMaster 2019',
    eventEn: 'RoboMaster 2019',
    image: ''
  },
  {
    title: 'Robocon全国三等奖',
    titleEn: 'Robocon National Third Prize',
    event: 'Robocon 2016',
    eventEn: 'Robocon 2016',
    image: ''
  }
]

// 随机打乱数组的工具函数
const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

// 照片墙数据 - 为每张图片分配不同的尺寸类型
const photos = ref(shuffleArray([
  { id: 1, src: withBase('imgs/photo_wall/photo_01.webp'), size: 'large' },
  { id: 2, src: withBase('imgs/photo_wall/photo_02.webp'), size: 'wide' },
  { id: 3, src: withBase('imgs/photo_wall/photo_03.webp'), size: 'small' },
  { id: 4, src: withBase('imgs/photo_wall/photo_04.webp'), size: 'wide' },
  { id: 5, src: withBase('imgs/photo_wall/photo_05.webp'), size: 'large' },
  { id: 6, src: withBase('imgs/photo_wall/photo_06.webp'), size: 'small' },
  { id: 7, src: withBase('imgs/photo_wall/photo_07.webp'), size: 'medium' },
  { id: 8, src: withBase('imgs/photo_wall/photo_08.webp'), size: 'wide' },
  { id: 9, src: withBase('imgs/photo_wall/photo_09.webp'), size: 'large' },
  { id: 10, src: withBase('imgs/photo_wall/photo_10.webp'), size: 'wide' },
  { id: 11, src: withBase('imgs/photo_wall/photo_11.webp'), size: 'small' },
  { id: 12, src: withBase('imgs/photo_wall/LMJ20260530-17024.webp'), size: 'wide' },
  { id: 13, src: withBase('imgs/photo_wall/LMJ20260601-14779.webp'), size: 'wide' },
  { id: 14, src: withBase('imgs/photo_wall/ZP634201.webp'), size: 'wide' },
  { id: 15, src: withBase('imgs/photo_wall/ZZP10407.webp'), size: 'wide' },
  { id: 16, src: withBase('imgs/photo_wall/202606010b0a0834.webp'), size: 'large' },
  { id: 17, src: withBase('imgs/photo_wall/202606010b0a9206.webp'), size: 'medium' },
  { id: 18, src: withBase('imgs/photo_wall/DC-44.webp'), size: 'wide' },
  { id: 19, src: withBase('imgs/photo_wall/DC-62.webp'), size: 'large' },
  { id: 20, src: withBase('imgs/photo_wall/LMJ20260530-16889.webp'), size: 'wide' },
  { id: 21, src: withBase('imgs/photo_wall/LMJ20260530-17132.webp'), size: 'medium' },
  { id: 22, src: withBase('imgs/photo_wall/LMJ20260531-11296.webp'), size: 'wide' },
  { id: 23, src: withBase('imgs/photo_wall/ZZP10586.webp'), size: 'large' }
]))

const selectedPhoto = ref<string | null>(null)

const openPhoto = (src: string) => {
  selectedPhoto.value = src
}

const closePhoto = () => {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="about-container">
    <!-- 队伍介绍部分 -->
    <section class="intro-section">
      <div class="section-header">
        <h1 class="section-title">/// TEAM PROFILE</h1>
        <div class="title-deco"></div>
      </div>

      <div class="intro-content">
        <div class="content-wrapper">
          <div class="team-name">
            <span class="team-cn">北京理工大学追梦战队</span>
            <span class="team-en">DREAM CHASER</span>
          </div>

          <div class="description-block">
            <p>
              北京理工大学追梦战队（Dream Chaser） 成立于2018年，是由自动化学院指导、面向全校选拔的校级学生机器人战队，前身可追溯至2015年的RoboMaster与Robocon参赛队。战队以 RoboMaster机甲大师赛 为核心平台，致力于培养具备价值引领、知识积累与工程实践能力的工程创新人才。
            </p>

            <p>
              战队在近十年中屡获佳绩，多次晋级全国赛并斩获国家级奖项，2024赛季获得分区赛冠军及全国赛一等奖。其发展始终秉持“追求极致、团队协作、勇于创新”等核心原则。除竞赛外，追梦战队高度重视技术研发与文化传承，通过“薪火培训”、校内机甲大师赛、技术开源等方式推动科创普及，并形成“谦卑、包容、传承”的团队文化。同时以“机娘IP”和多平台新媒体运营构建独特品牌影响力。
            </p>

            <p>
              目前，战队拥有80余名跨学院成员，致力于打造高质量科创平台，欢迎不同基础的同学加入，共同在机器人竞赛与工程实践中追梦前行。
            </p>
          </div>

          <div class="stats-highlight">
            <div class="stat-item">
              <div class="stat-number">2018</div>
              <div class="stat-label">成立年份</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">80+</div>
              <div class="stat-label">队员人数</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1ST</div>
              <div class="stat-label">2024中部分区赛</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程时间线 -->
    <section class="timeline-section">
      <div class="section-header">
        <h2 class="section-title">/// {{ t('history.journey') }}</h2>
        <div class="title-deco"></div>
      </div>
      <div class="timeline">
        <div v-for="(milestone, index) in milestones" :key="index" class="timeline-item" :class="{ right: index % 2 === 1 }">
          <div class="timeline-content">
            <div class="timeline-year">{{ milestone.year }}</div>
            <div class="timeline-card">
              <div v-if="milestone.image" class="timeline-image">
                <img :src="milestone.image" :alt="milestone.title" />
              </div>
              <div class="timeline-info">
                <h3>{{ $i18n.locale === 'zh-CN' ? milestone.title : milestone.titleEn }}</h3>
                <p>{{ $i18n.locale === 'zh-CN' ? milestone.desc : milestone.descEn }}</p>
              </div>
            </div>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </section>

    <!-- 荣誉墙 -->
    <section class="honors-section">
      <div class="section-header">
        <h2 class="section-title">/// {{ t('history.honors') }}</h2>
        <div class="title-deco"></div>
      </div>
      <div class="honors-grid">
        <div v-for="(honor, index) in honors" :key="index" class="honor-card">
          <div v-if="honor.image" class="honor-image">
            <img :src="honor.image" :alt="honor.title" />
          </div>
          <div v-else class="honor-placeholder">
            <div class="trophy-icon">🏆</div>
          </div>
          <div class="honor-info">
            <h3>{{ $i18n.locale === 'zh-CN' ? honor.title : honor.titleEn }}</h3>
            <p>{{ $i18n.locale === 'zh-CN' ? honor.event : honor.eventEn }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 照片墙部分 -->
    <section class="photo-wall-section">
      <div class="section-header">
        <h2 class="section-title">/// MOMENTS ARCHIVE</h2>
        <div class="title-deco"></div>
      </div>

      <div class="photo-grid">
        <div
          v-for="photo in photos"
          :key="photo.id"
          :class="['photo-item', `photo-${photo.size}`]"
          @click="openPhoto(photo.src)"
        >
          <div class="photo-frame">
            <img :src="photo.src" :alt="`照片 ${photo.id}`" />
            <div class="photo-overlay">
              <div class="photo-id">#{{ String(photo.id).padStart(2, '0') }}</div>
            </div>
            <div class="corner-deco top-left"></div>
            <div class="corner-deco top-right"></div>
            <div class="corner-deco bottom-left"></div>
            <div class="corner-deco bottom-right"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片预览弹窗 -->
    <transition name="modal-fade">
      <div v-if="selectedPhoto" class="photo-modal" @click="closePhoto">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closePhoto">
            <span>×</span>
          </button>
          <img :src="selectedPhoto" alt="预览" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.about-container {
  min-height: 100%;
  padding: var(--page-padding-y) var(--page-padding-x);
  padding-bottom: 4rem;
  overflow-x: hidden;
}

/* Section Header */
.section-header {
  margin-bottom: 2rem;
  position: relative;

  .section-title {
    font-family: $font-title;
    font-size: 2rem;
    color: $color-accent;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-block;
  }

  .title-deco {
    height: 2px;
    background: linear-gradient(90deg, $color-primary 0%, transparent 100%);
    margin-top: 0.5rem;
  }
}

/* 介绍部分 */
.intro-section {
  margin-bottom: 4rem;

  .intro-content {
    @include glass-panel;
    padding: 2rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 20px;
      right: 20px;
      height: 1px;
      background: $color-primary;
      box-shadow: 0 0 10px $color-primary;
    }
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .team-name {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba($color-primary, 0.3);

    .team-cn {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: $color-text-main;
      margin-bottom: 0.5rem;
    }

    .team-en {
      display: block;
      font-family: $font-title;
      font-size: 1.2rem;
      color: $color-primary;
      letter-spacing: 4px;
      @include text-glow;
    }
  }

  .description-block {
    font-size: 1rem;
    line-height: 1.8;
    color: $color-text-dim;

    p {
      margin-bottom: 1.5rem;
      text-indent: 2em;
      text-align: justify;

      &:hover {
        color: rgba($color-text-main, 0.9);
        transition: color 0.3s ease;
      }
    }
  }

  .stats-highlight {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba($color-primary, 0.3);

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba($color-primary, 0.2);
      position: relative;

      .stat-number {
        font-family: $font-title;
        font-size: 2.5rem;
        color: $color-primary;
        font-weight: bold;
        @include text-glow;
      }

      .stat-label {
        font-size: 0.9rem;
        color: $color-text-dim;
        margin-top: 0.5rem;
        letter-spacing: 1px;
      }
    }
  }
}

/* 照片墙部分 */
.photo-wall-section {
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    gap: 1.5rem;
    grid-auto-flow: dense;
  }

  .photo-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &.photo-large {
      grid-column: span 2;
      grid-row: span 2;
    }

    &.photo-wide {
      grid-column: span 2;
      grid-row: span 1;
    }

    &.photo-medium {
      grid-column: span 1;
      grid-row: span 2;
    }

    &.photo-small {
      grid-column: span 1;
      grid-row: span 1;
    }

    .photo-frame {
      width: 100%;
      height: 100%;
      position: relative;
      border: 1px solid rgba($color-primary, 0.3);
      background: #000;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        border-color: $color-primary;
        box-shadow: 0 0 20px rgba($color-primary, 0.4);
        transform: scale(1.02);

        .photo-overlay {
          opacity: 1;
        }

        img {
          filter: brightness(1.1) contrast(1.1);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.3s ease;
        filter: grayscale(20%);
      }

      .photo-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba($color-primary, 0.2) 0%, transparent 50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;

        .photo-id {
          position: absolute;
          top: 10px;
          right: 10px;
          font-family: $font-code;
          color: $color-primary;
          font-size: 0.8rem;
          background: rgba(0, 0, 0, 0.7);
          padding: 4px 8px;
          border: 1px solid $color-primary;
          @include text-glow;
        }
      }

      .corner-deco {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 2px solid $color-primary;
        opacity: 0;
        transition: opacity 0.3s ease;

        &.top-left {
          top: 5px;
          left: 5px;
          border-right: none;
          border-bottom: none;
        }

        &.top-right {
          top: 5px;
          right: 5px;
          border-left: none;
          border-bottom: none;
        }

        &.bottom-left {
          bottom: 5px;
          left: 5px;
          border-right: none;
          border-top: none;
        }

        &.bottom-right {
          bottom: 5px;
          right: 5px;
          border-left: none;
          border-top: none;
        }
      }

      &:hover .corner-deco {
        opacity: 1;
      }
    }
  }
}

/* 图片预览弹窗 */
.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);

  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    border: 2px solid $color-primary;
    box-shadow: 0 0 30px rgba($color-primary, 0.5);

    img {
      display: block;
      max-width: 100%;
      max-height: 90vh;
      object-fit: contain;
    }
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: 1px solid $color-primary;
    color: $color-primary;
    font-size: 2rem;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: $font-title;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba($color-primary, 0.2);
      box-shadow: 0 0 15px rgba($color-primary, 0.5);
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

// 时间线样式
.timeline-section {
  max-width: 1200px;
  margin: 0 auto 6rem;
}

.timeline {
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, $color-primary, transparent);
    transform: translateX(-50%);
  }
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: 50%;
  position: relative;
  margin-bottom: 3rem;
  
  &.right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 50%;
    
    .timeline-content {
      margin-left: 3rem;
    }
  }
  
  .timeline-content {
    margin-right: 3rem;
    max-width: 500px;
  }
}

.timeline-year {
  font-family: $font-title;
  font-size: 2rem;
  color: $color-primary;
  font-weight: bold;
  margin-bottom: 1rem;
  @include text-glow;
}

.timeline-card {
  @include glass-panel;
  padding: 1.5rem;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    border-color: $color-primary;
    box-shadow: 0 0 30px rgba($color-primary, 0.3);
  }
  
  .timeline-image {
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 1px solid rgba($color-primary, 0.3);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .timeline-info {
    h3 {
      font-family: $font-title;
      font-size: 1.5rem;
      color: $color-white;
      margin: 0 0 0.5rem;
    }
    
    p {
      font-family: $font-code;
      color: $color-text-dim;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }
  }
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 0;
  width: 20px;
  height: 20px;
  background: $color-primary;
  border: 4px solid $color-bg;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px $color-primary;
  z-index: 10;
}

// 荣誉墙样式
.honors-section {
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 8rem;
}

.honors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.honor-card {
  @include glass-panel;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  border-color: rgba($color-accent, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba($color-accent, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-15px);
    border-color: $color-accent;
    box-shadow: 0 0 50px rgba($color-accent, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    .honor-info h3::before, .honor-info h3::after {
      opacity: 1;
      filter: drop-shadow(0 0 8px $color-accent);
    }
  }
  
  .honor-image {
    width: 100%;
    height: 220px;
    margin-bottom: 2rem;
    overflow: hidden;
    border: 1px solid rgba($color-accent, 0.2);
    position: relative;
    clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
  }
  
  .honor-placeholder {
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba($color-accent, 0.1) 0%, transparent 100%);
    border: 1px solid rgba($color-accent, 0.2);
    margin-bottom: 2rem;
    position: relative;
    clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
    
    .trophy-icon {
      font-size: 5rem;
      filter: drop-shadow(0 0 15px rgba($color-accent, 0.4));
      color: $color-accent;
      opacity: 0.8;
    }
  }
  
  .honor-info {
    h3 {
      font-family: $font-title;
      font-size: 1.4rem;
      color: $color-accent;
      margin: 0 0 0.8rem;
      text-transform: uppercase;
      position: relative;
      display: inline-block;
      padding: 0 4rem;
      @include text-glow($color-accent);
      
      &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 3.5rem;
        height: 3.5rem;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 60 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 95 C30 70 20 50 10 10' stroke='%23F0FF00' stroke-width='1.5' fill='none'/%3E%3Cpath d='M28 85 C15 82 8 75 5 65 C12 68 22 75 28 85' fill='%23F0FF00'/%3E%3Cpath d='M25 65 C12 62 5 55 2 45 C9 48 19 55 25 65' fill='%23F0FF00'/%3E%3Cpath d='M20 45 C8 42 2 35 0 25 C7 28 15 35 20 45' fill='%23F0FF00'/%3E%3Cpath d='M15 25 C5 22 1 15 0 5 C5 8 10 15 15 25' fill='%23F0FF00'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: contain;
        opacity: 0.7;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      &::before {
        left: 0;
        transform: translateY(-50%) rotate(-15deg);
      }
      
      &::after {
        right: 0;
        transform: translateY(-50%) scaleX(-1) rotate(-15deg);
      }
    }
    
    p {
      font-family: $font-code;
      color: $color-text-dim;
      font-size: 0.9rem;
      margin: 0;
      letter-spacing: 1px;
    }
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .about-container {
    padding: 1.5rem 2rem;
  }

  .stats-highlight {
    grid-template-columns: repeat(3, 1fr);
  }

  .photo-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
    grid-auto-rows: 220px !important;
  }
}

@media (max-width: 768px) {
  .about-container {
    padding-bottom: 3rem;
  }

  .section-title {
    font-size: 1.5rem !important;
  }

  .intro-section .intro-content {
    padding: 1.25rem;
  }

  .team-name .team-cn {
    font-size: 1.5rem !important;
  }

  .team-name .team-en {
    font-size: 1rem !important;
  }

  .stats-highlight {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }

  .photo-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-auto-rows: 160px !important;
  }

  .photo-item.photo-large {
    grid-column: span 2 !important;
    grid-row: span 2 !important;
  }

  .photo-item.photo-wide {
    grid-column: span 2 !important;
    grid-row: span 1 !important;
  }

  .photo-item.photo-medium {
    grid-column: span 1 !important;
    grid-row: span 2 !important;
  }

  .timeline {
    &::before {
      left: 30px;
    }
  }

  .timeline-item {
    padding-right: 0;
    padding-left: 60px !important;
    margin-bottom: 2rem;

    .timeline-content {
      margin: 0 !important;
      max-width: none;
    }
  }

  .timeline-dot {
    left: 30px;
  }

  .honors-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .honor-card {
    padding: 2rem 1.25rem;
  }

  .honor-card .honor-info h3 {
    padding: 0;
    font-size: 1.15rem;

    &::before,
    &::after {
      display: none;
    }
  }

  .photo-modal .modal-content {
    max-width: calc(100vw - 1.5rem);
  }

  .photo-modal .close-btn {
    top: 0.5rem;
    right: 0.5rem;
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
    background: rgba($color-bg, 0.85);
  }
}

@media (max-width: 480px) {
  .photo-grid {
    grid-template-columns: 1fr !important;
    grid-auto-rows: 220px !important;
  }

  .photo-item.photo-large,
  .photo-item.photo-wide,
  .photo-item.photo-medium,
  .photo-item.photo-small {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }

  .timeline-year {
    font-size: 1.5rem;
  }

  .timeline-card {
    padding: 1rem;
  }
}
</style>

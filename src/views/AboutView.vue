<script setup lang="ts">
import { imageAttrs } from '@/utils/images'
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SeasonReview from '@/components/SeasonReview.vue'

const { t, locale } = useI18n()

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
    desc: '联盟赛山东站亚军，北部分区赛八强，国赛十六强',
    descEn: 'Runner-up at the University League Shandong Station, Top 8 in the Northern Regional, and National Top 16',
    image: ''
  }
]

// 年度赛事成绩。相同赛事的名次合并在一条记录中，避免重复展示。
const honors = [
  {
    year: '2026',
    records: [
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [
          { label: '全国一等奖', labelEn: 'National First Prize', tone: 'gold' },
          { label: '全国十六强', labelEn: 'National Top 16', tone: 'finalist' }
        ]
      },
      {
        event: '全国大学生电子设计竞赛 · 模拟邀请赛',
        eventEn: 'National Undergraduate Electronic Design Competition · Simulation Invitational',
        results: [{ label: '全国二等奖', labelEn: 'National Second Prize', tone: 'silver' }]
      },
      {
        event: 'RoboMaster 北部分区赛',
        eventEn: 'RoboMaster Northern Regional Competition',
        results: [{ label: '北部赛区八强', labelEn: 'Northern Regional Top 8', tone: 'finalist' }]
      },
      {
        event: 'RoboMaster 高校联盟赛 · 山东站',
        eventEn: 'RoboMaster University League · Shandong Station',
        results: [{ label: '亚军', labelEn: 'Runner-up', tone: 'silver' }]
      }
    ]
  },
  {
    year: '2025',
    records: [
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }]
      },
      {
        event: '全国大学生电子设计竞赛',
        eventEn: 'National Undergraduate Electronic Design Competition',
        results: [{ label: '全国一等奖', labelEn: 'National First Prize', tone: 'gold' }]
      }
    ]
  },
  {
    year: '2024',
    records: [
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [
          { label: '全国一等奖', labelEn: 'National First Prize', tone: 'gold' },
          { label: '中部区域赛冠军', labelEn: 'Central Regional Champion', tone: 'gold' },
          { label: '全国十六强', labelEn: 'National Top 16', tone: 'finalist' }
        ]
      },
      {
        event: '全国大学生电子设计竞赛',
        eventEn: 'National Undergraduate Electronic Design Competition',
        results: [{ label: '全国二等奖', labelEn: 'National Second Prize', tone: 'silver' }]
      }
    ]
  },
  {
    year: '2023',
    records: [
      {
        event: 'RoboMaster Sim2Real 挑战赛',
        eventEn: 'RoboMaster Sim2Real Challenge',
        results: [{ label: '国际二等奖', labelEn: 'International Second Prize', tone: 'silver' }]
      },
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }]
      }
    ]
  },
  {
    year: '2022',
    records: [
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }]
      },
      {
        event: 'RoboMaster ICRA 人工智能挑战赛',
        eventEn: 'RoboMaster ICRA AI Challenge',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }]
      },
      {
        event: 'RoboMaster 高校联盟赛',
        eventEn: 'RoboMaster University League',
        results: [{ label: '一等奖', labelEn: 'First Prize', tone: 'gold' }]
      }
    ]
  },
  {
    year: '2021',
    records: [
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国二等奖', labelEn: 'National Second Prize', tone: 'silver' }]
      },
      {
        event: 'RoboMaster 北部分区赛',
        eventEn: 'RoboMaster Northern Regional Competition',
        results: [{ label: '北部赛区一等奖', labelEn: 'Northern Regional First Prize', tone: 'gold' }]
      }
    ]
  },
  {
    year: '2020',
    records: [
      {
        event: 'RoboMaster 工程机器人',
        eventEn: 'RoboMaster Engineer Robot',
        results: [{ label: '全国一等奖', labelEn: 'National First Prize', tone: 'gold' }]
      },
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国二等奖', labelEn: 'National Second Prize', tone: 'silver' }]
      }
    ]
  },
  {
    year: '2019',
    records: [
      {
        event: 'RoboMaster ICRA 人工智能挑战赛',
        eventEn: 'RoboMaster ICRA AI Challenge',
        results: [{ label: '全球总冠军', labelEn: 'Global Champion', tone: 'gold' }]
      },
      {
        event: 'RoboMaster 步兵对抗赛',
        eventEn: 'RoboMaster Infantry Combat',
        results: [{ label: '全国冠军', labelEn: 'National Champion', tone: 'gold' }]
      },
      {
        event: 'RoboMaster 超级对抗赛',
        eventEn: 'RoboMaster Super Competition',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }],
        sourceUrl: 'https://mp.weixin.qq.com/s/-l5qDsDULCZYlF0rat871g'
      }
    ]
  },
  {
    year: '2016',
    records: [
      {
        event: 'Robocon',
        eventEn: 'Robocon',
        results: [{ label: '全国三等奖', labelEn: 'National Third Prize', tone: 'bronze' }]
      }
    ]
  }
]

// 照片墙数据 - 为每张图片分配不同的尺寸类型
const photos = [
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
]

const selectedPhoto = ref<(typeof photos)[number] | null>(null)
const closePhotoButton = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousBodyOverflow = ''

const openPhoto = (photo: (typeof photos)[number]) => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  selectedPhoto.value = photo
  nextTick(() => closePhotoButton.value?.focus())
}

const closePhoto = () => {
  if (!selectedPhoto.value) return
  selectedPhoto.value = null
  document.body.style.overflow = previousBodyOverflow
  nextTick(() => previousFocus?.focus())
}

const onPhotoKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closePhoto()
  } else if (event.key === 'Tab') {
    event.preventDefault()
    closePhotoButton.value?.focus()
  }
}

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div class="about-container">
    <!-- 队伍介绍部分 -->
    <section class="intro-section">
      <div class="section-header">
        <h1 class="section-title">{{ t('about.introTitle') }}</h1>
        <div class="title-deco"></div>
      </div>

      <div class="intro-content">
        <div class="content-wrapper">
          <div class="team-name">
            <span class="team-cn">{{ t('about.teamName') }}</span>
            <span class="team-en">DREAM CHASER</span>
          </div>

          <div class="description-block">
            <p>{{ t('about.paragraph1') }}</p>
            <p>{{ t('about.paragraph2') }}</p>
            <p>{{ t('about.paragraph3') }}</p>
            <p class="organization-note">{{ locale === 'zh-CN' ? '队伍采用兵种组与职能技术组纵横协作的组织方式，机械、电控、硬件与算法共同完成研发，宣运组连接队伍文化、对外传播与赛时保障。成员来自机械与车辆、机电、信息与电子、自动化、计算机等学院，让不同专业的知识在同一台机器人上汇合。' : 'Robot divisions work alongside specialist groups in mechanics, control, hardware and algorithms. Operations members support team culture, communications and competition logistics. Students from mechanical, mechatronic, electronic, automation and computing disciplines bring their knowledge together in each robot.' }}</p>
          </div>

          <div class="stats-highlight">
            <div class="stat-item">
              <div class="stat-number">2018</div>
              <div class="stat-label">{{ t('about.founded') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">80+</div>
              <div class="stat-label">{{ t('about.members') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1ST</div>
              <div class="stat-label">{{ t('about.bestResult') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SeasonReview />

    <!-- 发展历程时间线 -->
    <section class="timeline-section">
      <div class="section-header">
        <h2 class="section-title">{{ t('history.journey') }}</h2>
        <div class="title-deco"></div>
      </div>
      <div class="timeline">
        <div v-reveal v-for="(milestone, index) in milestones" :key="index" class="timeline-item" :class="{ right: index % 2 === 1 }">
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

    <!-- 年度成绩档案 -->
    <section class="honors-section">
      <div class="section-header">
        <h2 class="section-title">{{ t('history.honors') }}</h2>
        <div class="title-deco"></div>
      </div>
      <div class="honors-grid">
        <section
          v-reveal
          v-for="season in honors"
          :key="season.year"
          class="honor-season"
          :aria-labelledby="`honor-season-${season.year}`"
        >
          <header class="honor-season-header">
            <div>
              <span class="honor-season-label">{{ t('history.resultArchive') }}</span>
              <h3 :id="`honor-season-${season.year}`">{{ season.year }}</h3>
            </div>
            <span class="honor-record-count">{{ t('history.recordCount', { count: season.records.length }) }}</span>
          </header>

          <div class="honor-records">
            <article v-for="record in season.records" :key="record.event" class="honor-record">
              <h4>{{ locale === 'zh-CN' ? record.event : record.eventEn }}</h4>
              <div class="honor-results">
                <span
                  v-for="result in record.results"
                  :key="result.label"
                  class="honor-result"
                  :class="`tone-${result.tone}`"
                >
                  {{ locale === 'zh-CN' ? result.label : result.labelEn }}
                </span>
              </div>
              <a
                v-if="record.sourceUrl"
                class="honor-source"
                :href="record.sourceUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ t('history.recordSource') }} <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </section>
      </div>
    </section>

    <section v-reveal class="campus-story" aria-labelledby="campus-story-title"><div data-reveal-item><p class="campus-eyebrow">LEARN. BUILD. COMPETE.</p><h2 id="campus-story-title">{{ locale === 'zh-CN' ? '追梦杯，让热爱迈出第一步。' : 'The DreamChaser Cup. A first step into robotics.' }}</h2></div><div data-reveal-item><p>{{ locale === 'zh-CN' ? '2026 年北京理工大学“追梦杯”机器人竞赛由自动化学院主办，机器人队联合特立科协承办。参赛同学沿电控、机械、视觉与硬件四条技术路线学习与实践，在小组赛和淘汰赛中完成团队协作与机器人任务。' : 'Hosted by BIT’s School of Automation and organised by the robotics team with the Teli science association, the 2026 DreamChaser Cup brings control, mechanics, vision and hardware into a hands-on campus competition, with group and knockout stages.' }}</p><p>{{ locale === 'zh-CN' ? '从薪火培训到校内赛，我们希望把工程实践的机会带给更多同学。表现优异且满足要求的选手，可获得机器人队入队面试资格。' : 'From introductory training to the campus arena, we open engineering practice to more students. Outstanding participants who meet the requirements can qualify for a team interview.' }}</p><router-link to="/merch#recruitment-paths">{{ locale === 'zh-CN' ? '了解入队路径' : 'Explore recruitment paths' }} <span aria-hidden="true">↗</span></router-link></div></section>

    <!-- 照片墙部分 -->
    <section class="photo-wall-section">
      <div class="section-header">
        <h2 class="section-title">{{ t('about.photoArchive') }}</h2>
        <div class="title-deco"></div>
      </div>

      <div class="photo-grid">
        <button
          v-for="photo in photos"
          :key="photo.id"
          :class="['photo-item', `photo-${photo.size}`]"
          type="button"
          :aria-label="t('about.openPhoto', { number: photo.id })"
          @click="openPhoto(photo)"
        >
          <span class="photo-frame">
            <img v-bind="imageAttrs(photo.src, '(max-width: 768px) 90vw, 45vw')" alt="" loading="lazy" decoding="async" />
            <span class="photo-overlay">
              <span class="photo-id">#{{ String(photo.id).padStart(2, '0') }}</span>
            </span>
            <span class="corner-deco top-left"></span>
            <span class="corner-deco top-right"></span>
            <span class="corner-deco bottom-left"></span>
            <span class="corner-deco bottom-right"></span>
          </span>
        </button>
      </div>
    </section>

    <!-- 图片预览弹窗 -->
    <transition name="modal-fade">
      <div
        v-if="selectedPhoto"
        class="photo-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="t('about.photoPreview')"
        @click.self="closePhoto"
        @keydown="onPhotoKeydown"
      >
        <div class="modal-content">
          <button ref="closePhotoButton" class="close-btn" type="button" :aria-label="t('about.closePhoto')" @click="closePhoto">
            <span>×</span>
          </button>
          <img v-bind="imageAttrs(selectedPhoto.src, '90vw')" decoding="async" :alt="t('about.openPhoto', { number: selectedPhoto.id })" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.campus-story { display: grid; grid-template-columns: 1fr 1.3fr; gap: 60px; margin: 80px 0; border-block: 1px solid #ffffff20; padding: 40px 0; }
.campus-eyebrow { font-family: $font-code; font-size: 14px; letter-spacing: 1px; color: #a4c6b3; margin: 0 0 20px; }.campus-story h2 { font-size: clamp(27px, 2.7vw, 38px); font-weight: 500; line-height: 1.5; margin: 0; }.campus-story div > p:not(.campus-eyebrow) { font-size: 17px; color: #b5c5bc; line-height: 1.9; margin: 0 0 20px; }.campus-story a { display: inline-flex; gap: 14px; font-size: 16px; color: #c3efda; padding: 8px 0; }.campus-story a:hover { color: #fff; }
@media(max-width: 768px) { .campus-story { grid-template-columns: 1fr; gap: 26px; margin: 56px 0; padding: 32px 0; }.campus-story div > p:not(.campus-eyebrow) { font-size: 16px; } }

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
    font-family: $font-body;
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
    display: block;
    width: 100%;
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    font: inherit;
    text-align: left;
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
      display: block;
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
        display: block;
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
          font-size: .875rem;
          background: rgba(0, 0, 0, 0.7);
          padding: 4px 8px;
          border: 1px solid $color-primary;
          @include text-glow;
        }
      }

      .corner-deco {
        display: block;
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

  .photo-item:focus-visible {
    outline: 2px solid $color-accent;
    outline-offset: 3px;
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

// 年度成绩档案样式
.honors-section {
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 8rem;
}

.honors-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 1.25rem;
}

.honor-season {
  min-width: 0;
  padding: 1.15rem 1.2rem 0.4rem;
  border: 1px solid rgba($color-primary, 0.16);
  border-top: 2px solid rgba($color-accent, 0.72);
  background: linear-gradient(145deg, rgba($color-primary, 0.045), rgba(0, 0, 0, 0.22) 58%);
  transition: border-color 0.22s ease, background-color 0.22s ease;

  &:hover {
    border-color: rgba($color-primary, 0.42);
  }
}

.honor-season-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.8rem;

  h3 {
    margin: 0.1rem 0 0;
    color: $color-accent;
    font-family: $font-title;
    font-size: 2.6rem;
    line-height: 1;
    letter-spacing: 0.02em;
  }
}

.honor-season-label,
.honor-record-count {
  color: rgba($color-text-main, 0.58);
  font-family: $font-code;
  font-size: .875rem;
  letter-spacing: 0.08em;
}

.honor-record-count {
  padding-bottom: 0.15rem;
  text-align: right;
}

.honor-record {
  padding: 0.9rem 0;
  border-top: 1px solid rgba($color-white, 0.1);

  h4 {
    margin: 0 0 0.65rem;
    color: rgba($color-white, 0.92);
    font-family: $font-body;
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.5;
  }
}

.honor-results {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.honor-result {
  display: inline-flex;
  align-items: center;
  min-height: 1.7rem;
  padding: 0.2rem 0.55rem;
  border: 1px solid rgba($color-primary, 0.3);
  background: rgba($color-primary, 0.07);
  color: #bafaff;
  font-size: .875rem;
  line-height: 1.3;

  &.tone-gold {
    border-color: rgba($color-accent, 0.48);
    background: rgba($color-accent, 0.1);
    color: $color-accent;
  }

  &.tone-silver {
    border-color: rgba($color-white, 0.32);
    background: rgba($color-white, 0.07);
    color: #e9f0f2;
  }

  &.tone-bronze {
    border-color: rgba(#e99a68, 0.42);
    background: rgba(#e99a68, 0.09);
    color: #ffc29e;
  }

  &.tone-finalist {
    border-color: rgba($color-primary, 0.35);
    background: rgba($color-primary, 0.08);
    color: #a5f5fa;
  }
}

.honor-source {
  display: inline-flex;
  gap: 0.25rem;
  margin-top: 0.6rem;
  color: rgba($color-white, 0.62);
  font-size: .875rem;

  &:hover {
    color: $color-accent;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .honor-season {
    padding: 1rem 1rem 0.35rem;
  }

  .honor-season-header h3 {
    font-size: 2.25rem;
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
  .honors-grid {
    grid-template-columns: 1fr;
  }

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

.about-container { max-width: 1600px; margin: auto; }
.section-header { margin-bottom: 28px; }
.section-header .section-title { font-size: clamp(23px, 2.6vw, 36px); font-weight: 500; color: #e4ede8; letter-spacing: -.5px; margin: 0 0 16px; }
.section-header .title-deco { height: 1px; background: #ffffff18; margin: 0; }
.intro-section .intro-content { background: #111b1e; padding: clamp(24px, 4vw, 56px); border-radius: 4px; }
.intro-section .intro-content::before { display: none; }
.intro-section .team-name { text-align: left; border: 0; padding-bottom: 0; }
.intro-section .team-name .team-cn { font-weight: 500; font-size: clamp(23px, 2.5vw, 34px); }
.intro-section .team-name .team-en { font-family: $font-code; font-size: 14px; letter-spacing: 3px; color: #7aa691; }
.intro-section .description-block { max-width: 980px; font-size: 14px; line-height: 2; }
.intro-section .description-block p { text-indent: 0; text-align: left; }
.intro-section .stats-highlight { border-color: #ffffff15; }
.intro-section .stats-highlight .stat-item { background: transparent; border: 0; text-align: left; padding-left: 0; }
.intro-section .stats-highlight .stat-item .stat-number { font-weight: 500; font-size: 36px; }
.intro-section .stats-highlight .stat-item .stat-label { font-size: 14px; }
.timeline-card { background: #111b1e; border-radius: 4px; box-shadow: none; }
.timeline-card:hover { box-shadow: none; }
.timeline-year { font-weight: 400; font-size: 25px; }
.timeline-info h3 { font-weight: 500; }
.timeline-info p { font-size: 14px; line-height: 1.9; }
.photo-wall-section .photo-item .photo-frame { border-radius: 4px; border-color: #ffffff15; }
.photo-wall-section .photo-item .photo-frame:hover { box-shadow: none; }
.photo-wall-section .photo-item .photo-frame img { filter: saturate(.85); }
@media (max-width: 600px) {
 .intro-section .stats-highlight { gap: 12px; }
 .intro-section .stats-highlight .stat-item .stat-number { font-size: 28px; }
 .intro-section .stats-highlight .stat-item .stat-label { font-size: 14px; }
 .intro-section .description-block { font-size: 14px; }
}


.about-container { max-width: 1680px; padding-top: 80px; }
.section-header .section-title { font-size: var(--heading-section); line-height: 1.35; font-weight: 600; margin-bottom: 22px; }
.intro-section .section-header .section-title { font-size: var(--heading-page); }
.intro-section .team-name .team-cn { font-size: clamp(28px, 3vw, 44px); font-weight: 600; }
.intro-section .team-name .team-en { font-size: 15px; letter-spacing: 2px; }
.intro-section .description-block { font-size: 18px; max-width: 1120px; color: #b5c5bc; line-height: 2; }
.intro-section .stats-highlight .stat-item .stat-number { font-size: clamp(40px, 4.2vw, 62px); }
.intro-section .stats-highlight .stat-item .stat-label { font-size: 16px; }
.timeline-year { font-size: 36px; font-weight: 500; }
.timeline-info h3 { font-size: 24px; }
.timeline-info p { font-size: 16px; color: #b1c2b7; }
.honor-season { padding: 30px; border-radius: 6px; background: #111d18; }
.honor-season-header h3 { font-size: 48px; }
.honor-record { padding: 22px 0; }
.honor-record h4 { font-size: 18px; line-height: 1.7; }
.honor-result { font-size: 14px; padding: 7px 12px; border-radius: 3px; }
.timeline-content, .honor-season, .photo-item { transition: border-color .4s, background .4s; }
@media (max-width: 768px) {
 .about-container { padding-top: 46px; }
 .intro-section .description-block { font-size: 16px; }
 .intro-section .stats-highlight { gap: 18px; }
 .intro-section .stats-highlight .stat-item .stat-number { font-size: 34px; }
 .intro-section .stats-highlight .stat-item .stat-label { font-size: 14px; }
 .honor-season { padding: 24px; }
 .timeline-year { font-size: 28px; }
 .timeline-info h3 { font-size: 22px; }
 .timeline-info p { font-size: 16px; }
}

</style>

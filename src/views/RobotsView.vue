<script setup lang="ts">
import { imageAttrs } from '@/utils/images'
import { onBeforeUnmount, ref } from 'vue'
import { Plus, ArrowDownRight } from 'lucide-vue-next'
import gsap from 'gsap'
import { seasonHighlights } from '@/data/season2026'
import { useI18n } from 'vue-i18n'

const root = ref<HTMLElement | null>(null)
const { locale, t } = useI18n()

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const robots = ref([
  { 
    id: 1, 
    nameZh: '英雄', nameEn: 'HERO',
    type: 'Destroy Turret', 
    typeZh: '攻坚输出',
    img: withBase('imgs/robots/机器人2026抠图/1号英雄.webp'), 
    description: '英雄机器人具备快速上台阶与地形跨越能力，采用快拆三摩擦云台与双相机自瞄方案，兼顾高爆发火力与复杂地形作战能力。',
    descriptionEn: 'The hero robot combines stair-climbing mobility with a quick-release triple-friction turret and dual-camera aiming for powerful attacks across difficult terrain.',
    features: ['高伤害', '近战爆发', '建筑摧毁', '地形跨越'],
    featuresEn: ['High damage', 'Close-range burst', 'Structure breaking', 'Terrain traversal']
  },
  { 
    id: 2, 
    nameZh: '轮腿步兵', nameEn: 'WHEELED-LEG INFANTRY',
    type: 'Main Assault', 
    typeZh: '主力突击',
    img: withBase('imgs/robots/机器人2026抠图/3号轮腿步兵.webp'), 
    description: '轮腿步兵底盘采用主动悬挂与串联腿构型，能够稳定跨越台阶、飞坡等复杂地形，并支持翻倒自救与高机动连续作战。',
    descriptionEn: 'An active suspension and serial-leg chassis helps the infantry robot cross steps and ramps, recover from falls and stay mobile in combat.',
    features: ['快速机动', '灵活打击', '前线突破'],
    featuresEn: ['Fast mobility', 'Flexible engagement', 'Front-line breakthrough']
  },
  { 
    id: 3, 
    nameZh: '哨兵', nameEn: 'SENTRY',
    type: 'Auto Defense', 
    typeZh: '自主防御',
    img: withBase('imgs/robots/机器人2026抠图/7号哨兵.webp'), 
    description: '哨兵机器人采用底盘与发射机构解耦设计，支持快速拆装与维护，同时结合自主识别、自主决策与无线充电，实现长期区域压制。',
    descriptionEn: 'A modular chassis and launcher support fast maintenance. Autonomous perception, decision-making and wireless charging enable persistent area defense.',
    features: ['自主导航', '自主决策', '区域控制'],
    featuresEn: ['Autonomous navigation', 'Autonomous decisions', 'Area defense']
  },
  { 
    id: 4, 
    nameZh: '工程', nameEn: 'ENGINEER',
    type: 'Economic Support', 
    typeZh: '资源保障',
    img: withBase('imgs/robots/机器人2026抠图/2号工程.webp'), 
    description: '工程机器人兼顾跨越能力与资源作业能力，搭载六轴串联机械臂和主动锁紧存储舱，能够完成能量单元抓取、兑换与精确搬运任务。',
    descriptionEn: 'A six-axis serial arm and actively locked storage bay let the engineer robot collect, exchange and precisely transport game resources while crossing obstacles.',
    features: ['地形跨越', '资源获取', '机械臂操作', '双臂操作'],
    featuresEn: ['Terrain traversal', 'Resource collection', 'Robotic-arm operation', 'Dual-arm operation']
  },
  { 
    id: 5, 
    nameZh: '飞镖', nameEn: 'DART',
    type: 'Long Range', 
    typeZh: '远程打击',
    img: withBase('imgs/robots/机器人2026抠图/8号飞镖.webp'), 
    description: '飞镖系统采用双制导思路，发射架通过长焦识别与精密装填完成发射准备，镖体则配合 FPGA 视觉实时解算，实现高速度远程精确打击。',
    descriptionEn: 'A dual-guidance system pairs long-range recognition and precision loading with FPGA vision on the dart for fast, accurate long-range engagement.',
    features: ['超远程打击', '超高伤害', '致盲效果'],
    featuresEn: ['Long-range engagement', 'High damage', 'Blinding effect']
  },
  { 
    id: 6, 
    nameZh: '雷达', nameEn: 'RADAR',
    type: 'Surveillance', 
    typeZh: '战场感知',
    img: withBase('imgs/robots/机器人2026抠图/9号雷达.webp'), 
    description: '雷达系统融合激光雷达、视觉与点云信息，可完成战场感知、目标标记、信息波解析与反无人机辅助，是整队战术协同的信息中枢。',
    descriptionEn: 'The radar system combines lidar, vision and point-cloud data for field awareness, target marking, signal analysis and drone defense, coordinating team tactics.',
    features: ['全场视野', '信息共享', '战术中心', '信息波解码', '无人机反制'],
    featuresEn: ['Full-field awareness', 'Shared information', 'Tactical coordination', 'Signal analysis', 'Drone defense']
  },
  { 
    id: 7, 
    nameZh: '空中机器人', nameEn: 'AERIAL',
    type: 'Air Support', 
    typeZh: '空中支援',
    img: withBase('imgs/robots/机器人2026抠图/6号无人机.webp'), 
    description: '空中机器人采用折叠机臂轻量化结构，配合神经网络识别、卡尔曼滤波建模与双相机方案，兼顾空中侦察、远近打击和快速收纳部署。',
    descriptionEn: 'A lightweight folding frame, neural-network recognition, Kalman-filter modeling and dual cameras support aerial scouting and flexible engagement.',
    features: ['空中打击', '强化火力', '视野侦察'],
    featuresEn: ['Aerial engagement', 'Enhanced firepower', 'Visual reconnaissance']
  },
])

const activeRobot = ref<number | null>(null)

const toggleRobot = (id: number) => {
  activeRobot.value = activeRobot.value === id ? null : id
}
const expandPanel = (el: Element, done: () => void) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { clearProps: 'height,opacity' }); done(); return }
  gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: .55, ease: 'power3.inOut', clearProps: 'height,opacity', onComplete: done })
}
const collapsePanel = (el: Element, done: () => void) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { gsap.set(el, { clearProps: 'height,opacity' }); done(); return }
  gsap.to(el, { height: 0, opacity: 0, duration: .4, ease: 'power3.inOut', clearProps: 'height,opacity', onComplete: done })
}
onBeforeUnmount(() => { if (root.value) gsap.killTweensOf(root.value.querySelectorAll('.features-panel')) })
</script>

<template>
  <div ref="root" class="robots-container">
    <header class="header" v-reveal>
      <div data-reveal-item><p class="page-eyebrow">ENGINEERED IN-HOUSE / 2026</p>
        <h1 class="page-title">{{ t('robots.title') }}<span class="title-dot">.</span></h1>
      </div>
      <div class="header-note" data-reveal-item>
        <p>{{ locale === 'zh-CN' ? '从一颗螺丝，到一整套协同系统。\n每一台机器人，都是追梦的另一种形态。' : 'From a single screw to a coordinated system.\nEvery robot is another expression of our ambition.' }}</p>
        <span class="count"><span class="count-dot"></span>{{ String(robots.length).padStart(2, '0') }} {{ t('robots.unitsDetected') }} <ArrowDownRight :size="20" /></span>
      </div>
    </header>

    <div class="robots-grid" :class="{ 'has-active': activeRobot !== null }">
      <article
        v-reveal="(index % 2) * .09"
        v-for="(robot, index) in robots"
        :key="robot.id" 
        class="robot-card"
        :class="{ active: activeRobot === robot.id }"
      >
        <div v-surface="12" class="card-main motion-surface">
          <div class="card-bg"></div>
          <div class="robot-visual"><div class="visual-ring" aria-hidden="true"></div>
            <img data-depth v-bind="imageAttrs(robot.img, '(max-width: 768px) 70vw, 35vw')" :alt="locale === 'zh-CN' ? robot.nameZh : robot.nameEn" loading="lazy" decoding="async" />
          </div>
          
          <div class="robot-info"><span class="robot-index">{{ String(robot.id).padStart(2, '0') }} / 2026</span>
            <h2 class="robot-name">{{ locale === 'zh-CN' ? robot.nameZh : robot.nameEn }}</h2>
            <div class="robot-type">{{ locale === 'zh-CN' ? robot.typeZh : robot.type }}</div>
            <p class="robot-summary">{{ locale === 'zh-CN' ? robot.description : robot.descriptionEn }}</p>
            <div v-if="seasonHighlights[robot.id]" class="season-highlight"><span>{{ locale === 'zh-CN' ? '2026 赛季实绩' : '2026 SEASON HIGHLIGHT' }}</span><p>{{ locale === 'zh-CN' ? seasonHighlights[robot.id].zh : seasonHighlights[robot.id].en }}</p></div>
            <div class="robot-action" aria-hidden="true">
              <span>{{ locale === 'zh-CN' ? '战术能力' : 'Tactical capabilities' }}</span>
              <span class="expand-mark" :class="{ expanded: activeRobot === robot.id }"><Plus :size="24" :stroke-width="1.5" /></span>
            </div>
          </div>
          <button
            class="card-toggle"
            type="button"
            :aria-expanded="activeRobot === robot.id"
            :aria-controls="`robot-panel-${robot.id}`"
            :aria-label="t('robots.toggle', { name: locale === 'zh-CN' ? robot.nameZh : robot.nameEn })"
            @click="toggleRobot(robot.id)"
          >
            <span class="visually-hidden">{{ t('robots.toggle', { name: locale === 'zh-CN' ? robot.nameZh : robot.nameEn }) }}</span>
          </button>
        </div>

        <transition :css="false" @enter="expandPanel" @leave="collapsePanel" @enter-cancelled="el => gsap.killTweensOf(el)" @leave-cancelled="el => gsap.killTweensOf(el)">
          <div class="features-panel" v-show="activeRobot === robot.id" :id="`robot-panel-${robot.id}`">
            <div class="features-inner"><div class="features-list">
              <div class="panel-label">{{ t('robots.tacticalTags') }}</div>
              <div v-for="(feature, idx) in (locale === 'zh-CN' ? robot.features : robot.featuresEn)" :key="idx" class="feature-tag">
                <span class="tag-icon">▸</span>
                {{ feature }}
              </div>
            </div></div>
          </div>
        </transition>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.robots-container { max-width: 1680px; margin: auto; padding: 80px var(--page-padding-x) 120px; }
.header { display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; align-items: end; margin-bottom: 64px; padding-bottom: 48px; border-bottom: 1px solid #ffffff20; }
.page-eyebrow { font-family: $font-code; font-size: 14px; letter-spacing: 1.7px; color: #a2c6b2; margin: 0 0 26px; }
.page-title { font-size: var(--heading-page); font-weight: 600; margin: 0; letter-spacing: -3px; line-height: 1.2; }
.title-dot { color: $color-primary; margin-left: 5px; }
.header-note { padding-bottom: 5px; }
.header-note p { font-size: 18px; line-height: 1.8; color: #b0c2b7; margin: 0 0 22px; white-space: pre-line; }
.count { display: flex; align-items: center; gap: 12px; font-size: 14px; letter-spacing: 1px; color: #a9c9b6; }
.count svg { margin-left: auto; }
.count-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8e8cc; }
.robots-grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: start; }
.robot-card { border: 1px solid #b9e1cb25; background: #101a16; border-radius: 8px; overflow: hidden; transition: border-color .45s, background .45s; }
.robot-card:hover, .robot-card.active { border-color: #b9e1cb88; background: #15261d; }
.card-main { position: relative; display: grid; grid-template-columns: 44% minmax(0, 1fr); align-items: center; }
.card-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 22% 50%, #345d4438, transparent 62%); pointer-events: none; }
.robot-visual { position: relative; height: 330px; padding: 40px; display: grid; place-items: center; overflow: hidden; }
.robot-visual img { position: relative; z-index: 1; width: 86%; height: 240px; object-fit: contain; filter: drop-shadow(0 24px 16px #0006); }
.visual-ring { position: absolute; width: 64%; height: 32px; bottom: 36px; border: 1px solid #a8e8cc28; border-radius: 50%; background: radial-gradient(ellipse, #9ed2b52b, transparent 70%); transform: rotate(-7deg); transition: border-color .5s; }
.robot-card:hover .visual-ring { border-color: #a8e8cc65; }
.robot-visual::after { content: ''; position: absolute; left: 10%; right: 10%; top: 0; height: 2px; background: linear-gradient(90deg, transparent, #a8e8cc66, transparent); box-shadow: 0 0 24px #a8e8cc55; opacity: 0; z-index: 2; pointer-events: none; }
.robot-card:hover .robot-visual::after { opacity: 1; animation: scan 2.8s ease-in-out infinite; }
@keyframes scan { 0% { transform: translateY(20px); opacity: 0; } 20% { opacity: .6; } 80% { opacity: .6; } 100% { transform: translateY(340px); opacity: 0; } }
.robot-info { position: relative; padding: 38px 48px 38px 24px; }
.robot-index { font-family: $font-code; font-size: 14px; letter-spacing: 2px; color: #99b9a6; }
.robot-name { font-size: clamp(30px, 2.5vw, 38px); font-weight: 600; line-height: 1.3; letter-spacing: -.7px; margin: 14px 0 8px; overflow-wrap: anywhere; }
.robot-type { font-size: 16px; color: #a8e8cc; line-height: 1.5; }
.expand-mark { position: static; border: 1px solid #a8e8cc55; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 0; line-height: 1; color: #c3efda; transition: transform .6s var(--motion-ease), background .4s, color .4s; }
.expand-mark svg { display: block; flex-shrink: 0; width: 20px; height: 20px; }
.robot-card:hover .expand-mark, .expand-mark.expanded { background: #b7efd1; color: #0d2117; }
.expand-mark.expanded { transform: rotate(45deg); }
.card-toggle { position: absolute; inset: 0; z-index: 3; width: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; border-radius: 8px; }
.card-toggle:focus-visible { outline-offset: -6px; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.features-panel { overflow: hidden; background: #0c1711; }
.features-inner { padding: 26px 48px; border-top: 1px solid #a8e8cc25; }
.panel-label { font-size: 14px; color: #a4cbb4; letter-spacing: 1px; }
.features-list { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.features-list .panel-label { flex: 0 0 auto; margin: 0 14px 0 0; }
.feature-tag { font-size: 14px; color: #c8e6d3; background: #a8e8cc0b; border: 1px solid #a8e8cc28; padding: 7px 13px; border-radius: 4px; }
.tag-icon { display: none; }

.robot-summary { max-width: 640px; font-size: 17px; line-height: 1.85; color: #bccbc2; margin: 20px 0 24px; }

.season-highlight { border-left: 2px solid #a8e8cc66; padding-left: 16px; margin: 0 0 24px; }
.season-highlight > span { font-size: 13px; color: #a8c4b5; letter-spacing: .5px; }
.season-highlight p { font-size: 16px; line-height: 1.8; color: #d2e3d9; margin: 8px 0 0; }
.robot-action { display: flex; align-items: center; gap: 16px; color: #c3dfd0; font-size: 14px; }
@media (min-width: 1700px) { .robot-visual { height: 350px; } .robot-visual img { height: 260px; } }
@media (max-width: 1100px) {
 .header { gap: 32px; } .page-title { letter-spacing: -1.5px; } .header-note p { font-size: 17px; }
 .card-main { grid-template-columns: 42% minmax(0, 1fr); }
 .robot-visual { height: 300px; padding: 28px; } .robot-visual img { height: 210px; width: 100%; }
 .robot-info { padding: 30px 30px 30px 12px; } .robot-summary { font-size: 16px; }
 .features-inner { padding: 24px 30px; }
}
@media (max-width: 768px) {
 .robots-container { padding-top: 46px; }
 .header { grid-template-columns: 1fr; gap: 26px; margin-bottom: 36px; padding-bottom: 32px; }
 .page-eyebrow { font-size: 13px; margin-bottom: 18px; letter-spacing: 1px; }
 .page-title { font-size: 46px; } .header-note p { font-size: 16px; }
 .robots-grid { gap: 24px; } .card-main { grid-template-columns: 1fr; }
 .robot-visual { height: 260px; padding: 28px 32px 20px; } .robot-visual img { height: 200px; width: 82%; }
 .visual-ring { bottom: 24px; }
 .robot-info { padding: 12px 28px 28px; } .robot-name { font-size: 32px; } .robot-index { font-size: 13px; }
 .robot-summary { margin: 18px 0 22px; }
 .features-inner { padding: 24px 28px; } .features-list .panel-label { flex-basis: 100%; margin-bottom: 4px; }
}
@media (max-width: 400px) {
 .page-title { font-size: 40px; } .robot-visual { height: 230px; padding: 24px; } .robot-visual img { height: 182px; }
 .robot-info { padding: 10px 24px 26px; } .robot-name { font-size: 29px; } .features-inner { padding: 24px; }
}
</style>

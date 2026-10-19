<script setup lang="ts">
import { imageAttrs } from '@/utils/images'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import HeroFlow from '@/components/HeroFlow.vue'
import ProcessStory from '@/components/ProcessStory.vue'
import { useHomeMotion } from '@/composables/useHomeMotion'
const root = ref<HTMLElement | null>(null)
const { sceneProgress } = useHomeMotion(root)

const { t, locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const asset = (path: string) => `${import.meta.env.BASE_URL}imgs/${path}`
const selected = ref(0)
const machines = [
  { name: '轮腿步兵', en: 'WHEELED-LEG INFANTRY', id: '03', composition: 'infantry', file: '3号轮腿步兵', tag: '主动悬挂 / 高机动底盘', tagEn: 'ACTIVE SUSPENSION / HIGH MOBILITY' },
  { name: '英雄机器人', en: 'HERO ROBOT', id: '01', composition: 'hero', file: '1号英雄', tag: '地形跨越 / 精准火力', tagEn: 'TERRAIN TRAVERSAL / PRECISION FIRE' },
  { name: '工程机器人', en: 'ENGINEER ROBOT', id: '02', composition: 'engineer', file: '2号工程', tag: '六轴机械臂 / 资源作业', tagEn: 'SIX-AXIS ARM / RESOURCE OPERATIONS' }
]
const technicalNotes = computed(() => {
  const notes = [
    [['主动悬挂', 'ACTIVE SUSPENSION'], ['串联腿构型', 'SERIAL-LEG CHASSIS'], ['翻倒自救', 'SELF-RIGHTING']],
    [['快拆三摩擦云台', 'QUICK-RELEASE TURRET'], ['双相机自瞄', 'DUAL-CAMERA AIMING'], ['地形跨越', 'TERRAIN TRAVERSAL']],
    [['六轴串联机械臂', 'SIX-AXIS ARM'], ['主动锁紧存储舱', 'LOCKING STORAGE BAY'], ['精确搬运', 'PRECISION HANDLING']]
  ]
  return notes[selected.value]
})
const machine = computed(() => machines[selected.value])
const cycle = (direction: number) => { selected.value = (selected.value + direction + machines.length) % machines.length }
const capabilities = computed(() => [
  { title: t('home.capabilities.engineeringTitle'), en: 'ENGINEERING', desc: zh.value ? '从结构设计到整机落地，让想法成为现实。' : 'From structural design to a complete working robot.', to: '/robots' },
  { title: t('home.capabilities.intelligenceTitle'), en: 'INTELLIGENCE', desc: zh.value ? '以视觉感知与自主决策，拓展机器的边界。' : 'Expanding possibilities through perception and autonomy.', to: '/sparks' },
  { title: t('home.capabilities.competitionTitle'), en: 'COMPETITION', desc: zh.value ? '在真实赛场上，检验每一次创新与协作。' : 'Testing every innovation and collaboration in the arena.', to: '/about' },
  { title: t('home.capabilities.knowledgeTitle'), en: 'OPEN SOURCE', desc: zh.value ? '分享我们的探索，让技术薪火相传。' : 'Sharing what we learn with the next generation.', to: '/sparks' }
])
const news = [
  { date: '2026.09.20', title: '2026 秋招启动', en: '2026 Fall Recruitment Opens', category: 'event', to: '/merch' },
  { date: '2026.08.01', title: 'RMUC 机甲大师超级对抗赛全国赛', en: 'RMUC National Competition', category: 'competition', to: '/about' },
  { date: '2026.05.29', title: 'RMUC 机甲大师超级对抗赛北部分区赛', en: 'RMUC Northern Regional Competition', category: 'competition', to: '/about' },
  { date: '2026.03.29', title: 'RMUL 机甲大师高校联盟赛亚军', en: 'RMUL University League Runner-up', category: 'competition', to: '/about' },
  { date: '2025.11.30', title: '“追梦杯”机器人校内赛决赛', en: 'DreamChaser Cup Campus Final', category: 'competition', to: '/about' },
  { date: '2025.09.13', title: '机器人队秋招正式启动', en: 'Fall Recruitment Opens', category: 'event', to: '/merch' },
  { date: '2025.05.26', title: 'RMUC 机甲大师超级对抗赛东部分区赛', en: 'RMUC Eastern Regional Competition', category: 'competition', to: '/about' }
]
const showAll = ref(false)
const visibleNews = computed(() => showAll.value ? news : news.slice(0, 4))
const scrollToStory = () => document.getElementById('team-story')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
const manifesto = computed(() => zh.value ? [['把热爱，', '写进每一次创造。'], ['把极致，', '带进每一场较量。']] : [['Passion. ', 'In every creation.'], ['Precision. ', 'In every challenge.']])
</script>

<template>
  <div ref="root" class="home-container">
    <div class="hero-sequence">
    <section class="hero-section">
      <HeroFlow :progress="sceneProgress" />
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> {{ zh ? '北京理工大学 · 追梦战队' : 'BEIJING INSTITUTE OF TECHNOLOGY' }}</p>
        <h1 class="hero-title"><span class="title-line"><span>DREAM</span></span><span class="title-line"><span>CHASER.</span></span></h1>
        <p class="hero-motto">{{ t('common.teamMotto') }}</p>
        <p class="hero-description">{{ zh ? '我们是北京理工大学 RoboMaster 机器人战队。\n将想象化为工程，在竞技中探索技术的无限可能。' : 'We are the RoboMaster team at BIT. Turning imagination into engineering, and pushing possibilities in the arena.' }}</p>
        <div class="hero-actions">
          <router-link to="/robots" v-magnetic class="primary-button">{{ t('home.accessArsenal') }} <ArrowUpRight :size="17" /></router-link>
          <router-link to="/merch" class="text-button">{{ t('home.joinUs') }} <ArrowRight :size="16" /></router-link>
        </div>
        <a class="scroll-cue" href="#team-story" @click.prevent="scrollToStory"><ArrowDown :size="14" /> {{ zh ? '向下探索' : 'EXPLORE MORE' }} <span>SCROLL TO DISCOVER</span></a>
      </div>
      <div v-surface="12" class="hero-machine motion-surface" :class="`machine-${machine.composition}`">
        <div class="machine-topline"><span>ROBOTICS / 2026</span><span class="machine-dot">{{ zh ? '自主研发' : 'BUILT IN-HOUSE' }}</span></div>
        <div class="stage-parallax">
          <div class="stage-backlight" aria-hidden="true"></div>
          <div class="stage-orbit" aria-hidden="true"></div>
          <span class="machine-number" aria-hidden="true">{{ machine.id }}</span>
          <div class="stage-floor" aria-hidden="true"></div>
          <div class="stage-shadow" aria-hidden="true"></div>
          <div class="machine-image" data-depth>
            <Transition name="machine-switch" mode="out-in">
              <img :key="machine.id" :class="`composition-${machine.composition}`" v-bind="imageAttrs(asset(`robots/机器人2026抠图/${machine.file}.webp`), '(max-width: 900px) 85vw, 45vw')" decoding="async" :alt="zh ? machine.name : machine.en" fetchpriority="high" />
            </Transition>
          </div>
        </div>
        <div class="machine-caption" aria-live="polite">
          <div><p class="machine-en">{{ machine.en }}</p><h2>{{ zh ? machine.name : `UNIT ${machine.id}` }}</h2><p class="machine-tag">{{ zh ? machine.tag : machine.tagEn }}</p></div>
          <router-link to="/robots" v-magnetic class="machine-link" :aria-label="t('home.accessArsenal')"><ArrowUpRight :size="21" /></router-link>
        </div>
        <div class="machine-controls"><div class="machine-tabs"><button v-for="(item, index) in machines" :key="item.id" :class="{ active: selected === index }" :aria-label="zh ? `展示${item.name}` : `Show ${item.en}`" :aria-pressed="selected === index" @click="selected = index">{{ item.id }}</button></div><div class="arrows"><button :aria-label="zh ? '上一台机器人' : 'Previous robot'" @click="cycle(-1)"><ChevronLeft :size="16" /></button><button :aria-label="zh ? '下一台机器人' : 'Next robot'" @click="cycle(1)"><ChevronRight :size="16" /></button></div></div>
      </div>
      <div class="engineering-reveal" :aria-hidden="sceneProgress < .4">
        <div class="engineering-heading"><p class="eyebrow">BEYOND THE SURFACE / {{ machine.id }}</p><h2>{{ zh ? '每一处细节，' : 'Every detail.' }}<br><span>{{ zh ? '都为突破而生。' : 'Built to go further.' }}</span></h2></div>
        <div class="engineering-notes"><div v-for="(note, i) in technicalNotes" :key="i" class="engineering-note"><span class="note-index">0{{ i + 1 }}</span><div><span class="note-en">{{ note[1] }}</span><h3>{{ zh ? note[0] : note[1] }}</h3></div></div></div>
        <p class="engineering-footer">{{ zh ? '从结构，到感知，再到每一次行动。' : 'Structure. Perception. Every move.' }}</p>
      </div>
      <div class="scene-progress" aria-hidden="true"><span>01 — 02</span><div><i :style="{ transform: `scaleX(${sceneProgress})` }"></i></div><span>ENGINEERING IN MOTION</span></div>
    </section>
    </div>

    <div class="brand-marquee" aria-hidden="true"><div class="marquee-track"><span>BUILT TO CHASE.</span><span class="marquee-outline">ENGINEERED TO WIN.</span><span>BUILT TO CHASE.</span><span class="marquee-outline">ENGINEERED TO WIN.</span></div></div>

    <section id="team-story" v-reveal class="team-story">
      <div class="story-photo" data-reveal-item><img v-bind="imageAttrs(asset('photo_wall/202606010b0a0834.webp'), '(max-width: 900px) 90vw, 45vw')" decoding="async" :alt="zh ? '追梦战队赛场合影' : 'DreamChaser team at the competition'" loading="lazy" /><span class="photo-caption">TOGETHER, WE GO FURTHER.</span></div>
      <div class="story-copy" data-reveal-item><p class="eyebrow">01 / {{ zh ? '关于追梦' : 'OUR STORY' }}</p><h2>{{ zh ? '一群追梦的人，' : 'Many minds.' }}<br><span>{{ zh ? '一件热爱的事。' : 'One shared passion.' }}</span></h2><p>{{ zh ? '从实验室的深夜，到赛场上的每一秒。我们因机器人相聚，在机械、电控、视觉与硬件的交汇处，把每一次挑战变成下一次突破。' : 'From late nights in the lab to every second in the arena. We unite mechanical design, control, vision and hardware to turn each challenge into our next breakthrough.' }}</p><router-link to="/about" class="text-button">{{ zh ? '了解我们的故事' : 'Discover our story' }} <ArrowUpRight :size="17" /></router-link><div class="story-stats"><div><strong>2018<span> /</span></strong><span>{{ zh ? '正式成立' : 'ESTABLISHED' }}</span></div><div><strong>80<span> +</span></strong><span>{{ zh ? '跨学科队员' : 'TEAM MEMBERS' }}</span></div><div><strong>16<span>{{ zh ? ' 强' : ' TOP' }}</span></strong><span>{{ zh ? '2026 全国赛' : '2026 NATIONAL TOP 16' }}</span></div></div></div>
    </section>

    <section class="manifesto"><p class="eyebrow">THE DREAMCHASER SPIRIT</p><h2><span v-for="line in manifesto" :key="line[0]" class="manifesto-line"><span v-for="word in line" :key="word" class="manifesto-word">{{ word }}</span></span></h2></section>

    <ProcessStory />

    <section v-reveal class="capabilities-section">
      <div class="section-heading"><div><p class="eyebrow">02 / {{ zh ? '探索与创造' : 'WHAT WE DO' }}</p><h2>{{ zh ? '让想象，落地成真。' : 'Ideas into reality.' }}</h2></div><span class="section-note">ENGINEER. COMPETE. EVOLVE.</span></div>
      <div class="capabilities-grid"><router-link v-surface data-reveal-item v-for="(item, index) in capabilities" :key="item.en" :to="item.to" class="capability-card motion-surface"><div class="capability-top"><span>0{{ index + 1 }}</span><ArrowUpRight :size="20" /></div><p class="capability-en">{{ item.en }}</p><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></router-link></div>
    </section>

    <section v-reveal class="news-section">
      <div class="section-heading"><div><p class="eyebrow">03 / {{ zh ? '保持前进' : 'KEEP MOVING' }}</p><h2>{{ t('home.latestIntel') }}</h2></div><button class="text-button" :aria-expanded="showAll" aria-controls="news-list" @click="showAll = !showAll">{{ zh ? (showAll ? '收起动态' : '全部动态') : (showAll ? 'Show less' : 'All updates') }} <ArrowRight :size="16" /></button></div>
      <router-link to="/about#season-2026" class="season-news"><span class="season-news-year">2026<span>RMUC</span></span><div><p class="season-news-label">{{ zh ? '赛季回望' : 'SEASON IN REVIEW' }}</p><h3>{{ zh ? '重返全国赛，再至十六强。' : 'Back at nationals. Back in the top sixteen.' }}</h3><p>{{ zh ? '北部赛区八强 · 全国赛十六强。飞镖随机移动目标命中、工程双臂协同，让技术突破在赛场上落地。' : 'Northern Regional top eight. National top sixteen. Moving-target hits and coordinated dual-arm operations brought technical progress into the arena.' }}</p></div><ArrowUpRight :size="24" aria-hidden="true" /></router-link>
      <div id="news-list" class="news-list"><router-link v-for="item in visibleNews" :key="item.date" :to="item.to" class="news-item"><time :datetime="item.date.split('.').join('-')">{{ item.date }}</time><span class="news-category">{{ t(`home.categories.${item.category}`) }}</span><h3>{{ zh ? item.title : item.en }}</h3><ArrowUpRight :size="19" /></router-link></div>
    </section>

    <section v-reveal class="join-strip"><p class="eyebrow">THE NEXT CHAPTER</p><h2>{{ zh ? '下一段故事，期待与你一起。' : 'Write the next chapter with us.' }}</h2><router-link to="/merch" v-magnetic class="primary-button">{{ zh ? '成为追梦的一员' : 'Become a DreamChaser' }} <ArrowUpRight :size="18" /></router-link></section>
  </div>
</template>

<style lang="scss" scoped>
.season-news { display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 36px; align-items: start; padding: 30px 0 34px; border-top: 1px solid #a8e8cc44; color: inherit; }
.season-news-year { font-size: 35px; font-weight: 500; line-height: 1.2; letter-spacing: -1px; color: #c3efda; }.season-news-year > span { display: block; font-family: $font-code; font-size: 13px; letter-spacing: 1px; margin-top: 12px; color: #a4c1b3; }
.season-news-label { margin: 0 0 10px; font-size: 14px; color: #a4c1b3; }.season-news h3 { font-size: clamp(23px, 2.1vw, 30px); font-weight: 500; line-height: 1.4; margin: 0 0 14px; }.season-news div > p:last-child { max-width: 850px; margin: 0; font-size: 17px; line-height: 1.85; color: #aebeb4; }.season-news > svg { color: #a8e8cc; transition: transform .3s; }.season-news:hover > svg { transform: translate(3px, -3px); }
@media(max-width: 768px) { .season-news { grid-template-columns: minmax(0, 1fr) 24px; gap: 20px; }.season-news-year { grid-column: 1 / -1; display: flex; gap: 16px; align-items: baseline; font-size: 28px; }.season-news-year > span { margin: 0; }.season-news div > p:last-child { font-size: 16px; } }
.home-container { max-width: 1680px; margin: auto; }
.eyebrow { display: flex; align-items: center; gap: 14px; margin: 0 0 32px; color: #a4c1b3; font-size: 14px; letter-spacing: 2px; line-height: 1.6; }
.status-dot { width: 7px; height: 7px; border-radius: 50%; background: $color-primary; box-shadow: 0 0 20px #a8e8cc88; }
.hero-section { display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; min-height: clamp(780px, calc(100svh - 80px), 960px); padding: 56px var(--page-padding-x) 72px; gap: 32px; position: relative; }
.hero-copy { position: relative; z-index: 2; padding: 16px 0; }
.hero-title { margin: 0; font-size: clamp(78px, 8.3vw, 138px); font-weight: 800; line-height: 1.02; letter-spacing: -.045em; color: #f0f4f1; }
.title-line { display: block; overflow: hidden; padding-right: .05em; padding-bottom: .06em; margin-bottom: -.06em; }
.title-line > span { display: inline-block; }
.title-line:nth-child(2) { color: $color-primary; }
.hero-motto { font-size: clamp(22px, 1.95vw, 29px); font-weight: 500; letter-spacing: .02em; margin: 28px 0 14px; line-height: 1.55; color: #edf2ef; }
.hero-description { color: #a2b5ad; font-size: 18px; line-height: 1.9; white-space: pre-line; max-width: 540px; margin: 0; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 32px; margin-top: 38px; }
.primary-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 30px; min-height: 58px; padding: 16px 26px; background: $color-primary; color: #10241d; font-size: 16px; font-weight: 600; border: 1px solid $color-primary; border-radius: 4px; position: relative; overflow: hidden; }
.primary-button::before { content: ''; position: absolute; inset: 0; background: #e2ffee; transform: translateY(101%); transition: transform .5s var(--motion-ease); z-index: -1; }
.primary-button:hover { background: #d0f5e4; color: #10241d; }
.text-button { display: inline-flex; align-items: center; gap: 16px; min-height: 44px; font-size: 16px; border: 0; padding: 0; background: transparent; cursor: pointer; color: #d4e3da; }
.text-button:hover { color: $color-primary; }
.scroll-cue { display: flex; align-items: center; gap: 12px; width: fit-content; color: #a0b7ab; font-size: 14px; margin-top: 54px; }
.scroll-cue svg { animation: scroll-cue 2s ease-in-out infinite; }
.scroll-cue span { display: none; }
@keyframes scroll-cue { 50% { transform: translateY(6px); } }
.hero-machine {
  min-height: 640px; height: 100%; max-height: 780px; align-self: center;
  position: relative; overflow: hidden; display: flex; flex-direction: column;
  border-radius: 8px;
  background: radial-gradient(ellipse at 50% 38%, #1b322b42, transparent 66%);
}
.machine-topline { position: relative; z-index: 2; display: flex; justify-content: space-between; gap: 16px; margin: 28px; color: #91aa9e; font-size: 13px; letter-spacing: 1.4px; font-family: $font-code; }
.machine-dot { display: flex; align-items: center; gap: 9px; color: #b1d5c3; font-family: $font-body; font-size: 13px; letter-spacing: .5px; }
.machine-dot::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #a8e8cc; }
.stage-parallax { position: relative; z-index: 2; flex: 1; display: grid; place-items: center; min-height: 350px; isolation: isolate; }
.stage-backlight { position: absolute; inset: 0 5% 5%; background: radial-gradient(ellipse at 50% 46%, #a8e8cc20, #507b6310 45%, transparent 72%); pointer-events: none; }
.stage-orbit { position: absolute; width: 74%; aspect-ratio: 1; max-height: 96%; border: 1px solid #a8e8cc12; border-radius: 50%; pointer-events: none; mask-image: linear-gradient(#000b, #0002 80%, transparent); }
.machine-number { position: absolute; right: 8%; top: -2%; font-size: clamp(180px, 22vw, 320px); font-weight: 600; line-height: 1; letter-spacing: -.07em; color: #a8e8cc08; pointer-events: none; }
.stage-floor { position: absolute; width: 80%; height: 15%; bottom: 5%; border-radius: 50%; background: radial-gradient(ellipse, #a8e8cc1b, #a8e8cc08 44%, transparent 72%); pointer-events: none; }
.stage-floor::after { content: ''; position: absolute; inset: 12% 2%; border-bottom: 1px solid #a8e8cc20; border-radius: 50%; mask-image: linear-gradient(90deg, transparent, #000 30% 70%, transparent); }
.stage-shadow { position: absolute; width: 57%; height: 6%; bottom: 10%; border-radius: 50%; background: #0009; filter: blur(10px); pointer-events: none; }
.machine-hero .stage-shadow { width: 48%; }
.machine-engineer .stage-shadow { width: 43%; }
.machine-image { position: relative; height: 420px; width: 100%; display: grid; place-items: center; padding: 12px 0; }
.machine-image img { grid-area: 1 / 1; width: 100%; height: 396px; object-fit: contain; filter: drop-shadow(0 16px 14px #0006); }
.machine-image .composition-infantry { width: 98%; }
.machine-image .composition-hero { width: 106%; max-width: none; translate: 3% 0; }
.machine-image .composition-engineer { width: 90%; height: 374px; }
.machine-caption { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; padding: 8px 28px 28px; gap: 24px; }
.machine-en { font-family: $font-code; letter-spacing: 1px; color: #91b5a0; font-size: 14px; margin: 0 0 12px; }
.machine-caption h2 { color: #edf2ef; font-size: 34px; font-weight: 600; margin: 0 0 10px; line-height: 1.3; }
.machine-tag { font-size: 16px; color: #aac4b5; margin: 0; }
.machine-link { width: 52px; height: 52px; flex-shrink: 0; border: 1px solid #a8e8cc35; color: #cbe9db; border-radius: 50%; display: grid; place-items: center; }
.machine-link:hover { background: #a8e8cc; color: #10241d; }
.machine-controls { position: relative; z-index: 2; display: flex; justify-content: space-between; margin: 0 28px; padding: 12px 0; border-top: 1px solid #ffffff14; }
.machine-tabs { display: flex; gap: 12px; }
.machine-controls button { border: 0; background: transparent; cursor: pointer; padding: 8px 0; color: #8cac9a; font-family: $font-code; font-size: 15px; min-height: 44px; }
.machine-tabs button { position: relative; width: 44px; border-radius: 4px; }
.machine-tabs button.active { color: $color-primary; background: #a8e8cc0c; }
.machine-tabs button.active::after { position: absolute; content: ''; height: 2px; bottom: 0; left: 12px; right: 12px; background: $color-primary; }
.arrows { display: flex; gap: 6px; }
.arrows button { color: #b2cbc1; width: 44px; border-radius: 50%; }
.machine-controls button:hover { color: #e0f7ec; background: #a8e8cc0c; }
.machine-switch-enter-active, .machine-switch-leave-active { transition: opacity .25s, transform .4s var(--motion-ease); }
.machine-switch-enter-from { opacity: 0; transform: translateX(14px); }
.machine-switch-leave-to { opacity: 0; transform: translateX(-10px); }
.brand-marquee { overflow: hidden; border-top: 1px solid #ffffff18; border-bottom: 1px solid #ffffff18; padding: 30px 0; margin-bottom: 30px; }
.marquee-track { display: flex; width: max-content; gap: 64px; padding-left: 48px; }
.marquee-track span { font-size: clamp(48px, 6.6vw, 110px); font-weight: 700; line-height: 1.1; letter-spacing: -4px; white-space: nowrap; color: #bfdacb; }
.marquee-track .marquee-outline { color: transparent; -webkit-text-stroke: 1px #668675; }
.team-story, .capabilities-section, .news-section, .join-strip, .manifesto { margin: 0 var(--page-padding-x); }
.team-story { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 100px); padding: 120px 0 100px; align-items: center; }
.story-photo { position: relative; height: 590px; overflow: hidden; border-radius: 6px; }
.story-photo img { width: 100%; height: 115%; object-fit: cover; position: absolute; top: -7.5%; filter: saturate(.85); }
.story-photo::after { content: ''; position: absolute; inset: 60% 0 0; background: linear-gradient(transparent,#061013c9); }
.photo-caption { position: absolute; bottom: 30px; left: 30px; color: #d6e5dc; font-family: $font-code; font-size: 14px; letter-spacing: 1px; z-index: 1; }
.story-copy .eyebrow { margin-bottom: 24px; }
.story-copy h2 { margin: 0; font-size: clamp(32px, 3.7vw, 56px); font-weight: 600; line-height: 1.5; letter-spacing: -1.5px; }
.story-copy h2 span { color: #9cbcac; }
.story-copy > p:not(.eyebrow) { font-size: 18px; color: #a3b8ad; line-height: 1.95; margin: 28px 0; }
.story-stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 36px; border-top: 1px solid #ffffff20; padding-top: 32px; gap: 20px; }
.story-stats div { display: flex; flex-direction: column; gap: 10px; }
.story-stats strong { font-size: clamp(34px, 3.5vw, 52px); font-weight: 500; line-height: 1.3; letter-spacing: -1px; }
.story-stats strong span { color: #99c7ac; font-size: 20px; }
.story-stats div > span { color: #a5baad; font-size: 14px; }
.manifesto { padding: 70px 0 60px; max-width: 1120px; }
.manifesto h2 { display: grid; gap: 8px 16px; font-size: clamp(36px, 4.8vw, 72px); font-weight: 600; line-height: 1.5; letter-spacing: -2px; margin: 0; text-wrap: balance; }
.manifesto-word { color: #e7f5ed; }
.manifesto-line { display: block; }
.capabilities-section { padding: 20px 0 120px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 44px; }
.section-heading .eyebrow { margin-bottom: 22px; }
.section-heading h2 { font-size: var(--heading-section); font-weight: 600; line-height: 1.3; letter-spacing: -1.5px; margin: 0; }
.section-note { font-size: 14px; font-family: $font-code; letter-spacing: 1px; color: #96b3a3; padding-bottom: 12px; }
.capabilities-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.capability-card { padding: 32px 28px; background: #111d18; border: 1px solid #ffffff18; border-radius: 6px; transition: background .4s, border-color .4s; }
.capability-card:hover { background: #1a2d23; border-color: #a8e8cc66; color: inherit; }
.capability-top { display: flex; justify-content: space-between; color: #a3c9b3; font-size: 15px; font-family: $font-code; margin-bottom: 60px; }
.capability-top svg { transition: transform .4s var(--motion-ease); }
.capability-card:hover svg { transform: translate(5px, -5px); color: $color-primary; }
.capability-en { color: #98b4a5; font-size: 13px; letter-spacing: 1px; margin-bottom: 12px; }
.capability-card h3 { font-size: 28px; font-weight: 600; line-height: 1.4; margin: 12px 0 18px; }
.capability-card > p:last-child { color: #a7bcb0; font-size: 16px; line-height: 1.8; margin-bottom: 0; }
.news-section { padding-bottom: 120px; }
.news-list { border-top: 1px solid #ffffff26; }
.news-item { display: grid; grid-template-columns: 135px 78px 1fr 28px; align-items: center; gap: 32px; border-bottom: 1px solid #ffffff20; padding: 32px 8px; position: relative; }
.news-item::before { content: ''; position: absolute; inset: 0; background: #a8e8cc07; transform: scaleY(0); transform-origin: bottom; transition: transform .5s var(--motion-ease); pointer-events: none; }
.news-item:hover::before { transform: scaleY(1); }
.news-item time { font-family: $font-code; font-size: 15px; color: #a8beb1; }
.news-category { font-size: 14px; width: fit-content; padding: 4px 12px; border: 1px solid #a8e8cc35; border-radius: 3px; color: #b2d8c4; }
.news-item h3 { margin: 0; font-size: 21px; font-weight: 500; line-height: 1.6; }
.news-item svg { color: #a9c4b4; transition: transform .35s var(--motion-ease); }
.news-item:hover svg { color: $color-primary; transform: translate(5px,-5px); }
.join-strip { border-top: 1px solid #ffffff20; padding: 100px 0 120px; text-align: center; }
.join-strip .eyebrow { justify-content: center; margin-bottom: 26px; }
.join-strip h2 { font-size: clamp(32px, 3.6vw, 56px); font-weight: 600; line-height: 1.5; letter-spacing: -1px; margin: 0 0 40px; }
@media (max-width: 1200px) { .hero-description { font-size: 17px; } .hero-actions { gap: 20px; } .machine-image { height: 360px; } .machine-image img { height: 336px; } .machine-image .composition-engineer { height: 320px; } .hero-machine { min-height: 600px; } .capabilities-grid { grid-template-columns: 1fr 1fr; } .story-photo { height: 520px; } .story-copy > p:not(.eyebrow) { font-size: 17px; } }
@media (max-width: 900px) {
 .hero-section { grid-template-columns: 1fr; min-height: auto; gap: 32px; padding-top: 50px; padding-bottom: 50px; }
 .hero-copy { padding: 0; } .hero-title { font-size: clamp(82px, 15vw, 130px); } .hero-motto { font-size: 24px; margin-top: 30px; } .hero-description { font-size: 18px; max-width: 600px; } .hero-actions { margin-top: 30px; gap: 28px; } .scroll-cue { display: none; }
 .hero-machine { min-height: 640px; height: auto; } .stage-parallax { min-height: 340px; } .machine-image { height: 370px; width: 100%; } .machine-image img { height: 346px; max-width: 600px; } .machine-image .composition-engineer { height: 328px; } .machine-number { font-size: 300px; } .stage-orbit { width: 65%; }
 .team-story { grid-template-columns: 1fr; gap: 44px; padding: 70px 0; } .story-photo { height: 480px; } .story-copy h2 { font-size: 46px; } .story-copy > p:not(.eyebrow) { font-size: 18px; } .story-stats strong { font-size: 44px; }
 .manifesto { padding: 40px 0; } .manifesto h2 { font-size: 50px; } .capabilities-section { padding: 20px 0 75px; } .section-note { display: none; } .news-section { padding-bottom: 75px; } .news-item { gap: 20px; grid-template-columns: 120px 68px 1fr 24px; } .news-item h3 { font-size: 19px; } .join-strip { padding: 70px 0 80px; }
}
@media (max-width: 600px) {
 .hero-section { padding-top: 24px; gap: 24px; }
 .hero-copy > .eyebrow { margin-bottom: 16px; }
 .hero-title { font-size: clamp(54px, 16vw, 92px); }
 .hero-motto { font-size: 20px; letter-spacing: .02em; margin: 18px 0 12px; }
 .hero-description { font-size: 16px; line-height: 1.65; white-space: normal; }
 .hero-actions { gap: 18px; margin-top: 22px; }
 .hero-actions .primary-button { min-height: 48px; padding-block: 11px; }
 .primary-button { padding: 14px 20px; font-size: 15px; gap: 18px; min-height: 54px; } .text-button { font-size: 15px; gap: 10px; } .eyebrow { font-size: 13px; letter-spacing: 1px; margin-bottom: 24px; }
 .hero-machine { min-height: 480px; } .machine-topline { font-size: 13px; margin: 16px 16px 8px; } .machine-dot { font-size: 13px; } .machine-image { height: 268px; } .machine-image img { height: 244px; } .machine-image .composition-engineer { height: 230px; } .stage-parallax { min-height: 252px; } .machine-number { font-size: 190px; top: 3%; right: 7%; } .stage-orbit { width: 80%; } .machine-caption { padding: 12px 20px 20px; gap: 18px; } .machine-en { font-size: 13px; letter-spacing: .3px; } .machine-caption h2 { color: #edf2ef; font-size: 28px; } .machine-tag { font-size: 14px; } .machine-link { width: 46px; height: 46px; } .machine-controls { margin: 0 20px; } .machine-tabs { gap: 8px; }
 .brand-marquee { padding: 24px 0; margin-bottom: 0; } .marquee-track { gap: 36px; } .marquee-track span { font-size: 54px; letter-spacing: -2px; }
 .team-story { padding: 60px 0; gap: 32px; } .story-photo { height: 360px; } .photo-caption { left: 20px; bottom: 22px; font-size: 12px; } .story-copy h2 { font-size: 34px; line-height: 1.55; } .story-copy > p:not(.eyebrow) { font-size: 16px; margin: 24px 0; } .story-stats { gap: 12px; margin-top: 28px; padding-top: 26px; } .story-stats strong { font-size: 34px; } .story-stats strong span { font-size: 16px; } .story-stats div > span { font-size: 13px; }
 .manifesto h2 { font-size: 36px; letter-spacing: -1px; gap: 2px 12px; }
 .capabilities-grid { grid-template-columns: 1fr 1fr; gap: 12px; } .capability-card { padding: 24px 18px; } .capability-top { margin-bottom: 35px; } .capability-en { font-size: 13px; letter-spacing: .3px; } .capability-card h3 { font-size: 23px; } .capability-card > p:last-child { font-size: 15px; } .section-heading { align-items: center; margin-bottom: 32px; } .section-heading h2 { font-size: 32px; letter-spacing: -.5px; }
 .news-item { grid-template-columns: 1fr auto 24px; gap: 12px; padding: 26px 0; } .news-item time { grid-column: 1; font-size: 14px; } .news-category { grid-column: 2; font-size: 13px; } .news-item h3 { grid-row: 2; grid-column: 1 / 3; font-size: 18px; } .news-item svg { grid-column: 3; grid-row: 1 / 3; } .join-strip h2 { font-size: 32px; }
}
@media (max-width: 380px) { .hero-actions { gap: 8px; } .hero-actions .primary-button { padding-inline: 10px; gap: 8px; } .primary-button { padding: 14px 15px; gap: 12px; font-size: 14px; } .text-button { font-size: 14px; } .hero-machine { min-height: 460px; } .machine-caption { padding-inline: 16px; } .machine-en { font-size: 13px; } .capabilities-grid { grid-template-columns: 1fr; } .capability-top { margin-bottom: 30px; } }
</style>

<style lang="scss" scoped>
.hero-section { isolation: isolate; }
.hero-machine { background: transparent; }
.engineering-reveal { display: none; }
.scene-progress { display: none; }
@media (min-width: 1000px) and (min-height: 740px) and (prefers-reduced-motion: no-preference) {
  .hero-sequence { height: 230svh; position: relative; }
  .hero-section { position: sticky; top: var(--top-bar-height); height: calc(100svh - var(--top-bar-height)); min-height: 0; padding-top: 24px; padding-bottom: 54px; overflow: hidden; }
  .hero-machine { min-height: 0; max-height: 100%; height: 100%; z-index: 2; overflow: visible; }
  .hero-machine .stage-parallax { min-height: 0; }
  .hero-machine .machine-image { height: min(420px, 43svh); }
  .hero-machine .machine-image img { height: min(396px, 40svh); }
  .hero-machine .machine-image .composition-engineer { height: min(374px, 38svh); }
  .hero-machine .machine-topline { margin-block: 12px; }
  .engineering-reveal { display: block; position: absolute; inset: 0; pointer-events: none; z-index: 3; }
  .engineering-heading { position: absolute; left: var(--page-padding-x); top: 6%; opacity: 0; }
  .engineering-heading .eyebrow { font-family: $font-code; font-size: 12px; margin-bottom: 16px; }
  .engineering-heading h2 { font-size: clamp(30px, 3vw, 48px); line-height: 1.4; letter-spacing: -.04em; font-weight: 500; margin: 0; color: #eaf3ee; }
  .engineering-heading h2 span { color: #a8e8cc; }
  .engineering-notes { position: absolute; top: 34%; right: 6%; width: 27%; }
  .engineering-note { position: relative; display: flex; gap: 16px; padding: 20px 0; opacity: 0; border-top: 1px solid #a8e8cc33; }
  .engineering-note::before { content: ''; position: absolute; right: 100%; top: 0; width: 65px; height: 1px; background: linear-gradient(90deg, #a8e8cc00, #a8e8cc70); }
  .note-index { font-family: $font-code; font-size: 12px; color: #a8e8cc; padding-top: 3px; }
  .note-en { font-family: $font-code; font-size: 11px; letter-spacing: 1px; color: #88a99a; }
  .engineering-note h3 { font-size: clamp(18px, 1.8vw, 26px); font-weight: 500; margin: 8px 0 0; color: #eaf3ee; }
  .engineering-footer { position: absolute; left: var(--page-padding-x); bottom: 8%; font-size: 15px; letter-spacing: 1px; color: #a2b5ad; opacity: 0; }
  .scene-progress { display: flex; position: absolute; bottom: 18px; left: var(--page-padding-x); right: var(--page-padding-x); align-items: center; gap: 20px; font-family: $font-code; font-size: 10px; letter-spacing: 1px; color: #779989; z-index: 4; }
  .scene-progress > div { height: 1px; flex: 1; background: #a8e8cc20; }
  .scene-progress i { display: block; height: 100%; background: #a8e8cc; transform-origin: left; }
}
@media (max-width: 600px) { .hero-flow { opacity: .65; } }
</style>

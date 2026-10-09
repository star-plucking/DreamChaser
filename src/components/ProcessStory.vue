<script setup lang="ts">
import { imageAttrs } from '@/utils/images'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const root = ref<HTMLElement | null>(null)
const active = ref(0)
const progress = ref(0)
const scrollLinked = ref(false)
const imagesReady = ref(false)
let imageObserver: IntersectionObserver | undefined
const asset = (path: string) => `${import.meta.env.BASE_URL}imgs/${path}`
const chapters = [
  { en: 'BUILD', title: '让构想，成为实物。', titleEn: 'Ideas. Made real.', desc: '从第一张图纸到最后一颗螺丝，在一次次设计、装配与调试中，找到属于我们的答案。', descEn: 'From the first drawing to the final screw. Design, assemble, test, and find our own answers.', image: 'photo_wall/ZZP10407.webp', to: '/robots' },
  { en: 'COMPETE', title: '把突破，带上赛场。', titleEn: 'Built for the arena.', desc: '每一次精准命中，每一次越过障碍，都是无数个实验室深夜的回响。', descEn: 'Every precision hit and every obstacle crossed carries the work of countless nights in the lab.', image: 'photo_wall/photo_07.webp', to: '/about' },
  { en: 'TOGETHER', title: '和同伴，走得更远。', titleEn: 'Further. Together.', desc: '机械、电控、视觉、硬件。不同的专长，同一个方向。我们把个人的热爱，汇成团队的力量。', descEn: 'Mechanics, control, vision, hardware. Different skills, one direction. Individual passion becomes collective strength.', image: 'photo_wall/202606010b0a0834.webp', to: '/team' }
]
let media: gsap.MatchMedia | undefined
let trigger: ScrollTrigger | undefined
let refreshTimer: ReturnType<typeof setTimeout>
let resize: ResizeObserver | undefined
const choose = (index: number) => {
  if (trigger) {
    window.scrollTo({ top: trigger.start + (index + .45) / 3 * (trigger.end - trigger.start), behavior: 'smooth' })
  } else active.value = index
}
onMounted(() => {
  if (!root.value) return
  if ('IntersectionObserver' in window) {
    imageObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { imagesReady.value = true; imageObserver?.disconnect() }
    }, { rootMargin: '600px' })
    imageObserver.observe(root.value)
  } else imagesReady.value = true
  media = gsap.matchMedia(root.value)
  media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    scrollLinked.value = true
    trigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top top+=100',
      end: 'bottom bottom',
      onUpdate: self => {
        active.value = Math.min(2, Math.floor(self.progress * 3))
        progress.value = self.progress
      }
    })
    gsap.fromTo('.chapter-image', { scale: 1.14, yPercent: -4 }, { scale: 1.02, yPercent: 4, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    return () => { trigger?.kill(); trigger = undefined; scrollLinked.value = false; progress.value = 0 }
  })
  resize = new ResizeObserver(() => {
    clearTimeout(refreshTimer)
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
  })
  resize.observe(root.value)
})
onBeforeUnmount(() => { imageObserver?.disconnect(); clearTimeout(refreshTimer); resize?.disconnect(); media?.revert() })
</script>

<template>
  <section ref="root" class="process-story" :class="{ 'motion-enabled': scrollLinked }">
    <div class="process-stage">
      <div class="chapter-images" aria-hidden="true">
        <div v-for="(chapter, index) in chapters" :key="chapter.en" class="chapter-image" :class="{ active: active === index }"><img v-if="imagesReady" v-bind="imageAttrs(asset(chapter.image), '(max-width: 900px) 100vw, 90vw')" alt="" decoding="async" /></div>
      </div>
      <div class="chapter-shade" aria-hidden="true"></div>
      <div class="stage-topline"><span>{{ zh ? '从实验室，到聚光灯下。' : 'FROM THE LAB. TO THE SPOTLIGHT.' }}</span><span>DREAMCHASER / IN MOTION</span></div>
      <div class="chapter-content" aria-live="polite" aria-atomic="true">
        <Transition name="chapter" mode="out-in">
          <div :key="active" class="chapter-copy">
            <p class="chapter-eyebrow">0{{ active + 1 }} / {{ chapters[active].en }}</p>
            <h2>{{ zh ? chapters[active].title : chapters[active].titleEn }}</h2>
            <p class="chapter-description">{{ zh ? chapters[active].desc : chapters[active].descEn }}</p>
            <router-link v-magnetic :to="chapters[active].to" class="chapter-link">{{ zh ? '探索这一章' : 'Explore this chapter' }} <ArrowUpRight :size="22" /></router-link>
          </div>
        </Transition>
      </div>
      <div class="chapter-steps" role="group" :aria-label="zh ? '追梦故事章节' : 'Story chapters'">
        <button v-for="(chapter, index) in chapters" :key="chapter.en" :class="{ active: active === index }" :aria-pressed="active === index" @click="choose(index)">
          <span class="step-track"><span :style="{ transform: `scaleX(${scrollLinked ? Math.max(0, Math.min(1, progress * 3 - index)) : (active === index ? 1 : 0)})` }"></span></span>
          <span class="step-label"><span>0{{ index + 1 }}</span>{{ chapter.en }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.process-story { height: 240vh; position: relative; margin: 60px var(--page-padding-x) 120px; }
.process-stage { position: sticky; top: 100px; height: calc(100svh - 140px); min-height: 600px; max-height: 880px; border-radius: 8px; overflow: hidden; background: #17251f; display: flex; flex-direction: column; }
.chapter-images, .chapter-image, .chapter-shade { position: absolute; inset: 0; pointer-events: none; }
.chapter-image { background-position: center; background-size: cover; opacity: 0; transition: opacity 1s ease; }
.chapter-image.active { opacity: 1; }
.chapter-shade { background: linear-gradient(90deg, #06100def 0%, #06100d9c 52%, #06100d10), linear-gradient(0deg, #06100ddb, transparent 70%); }
.stage-topline { position: relative; z-index: 1; display: flex; justify-content: space-between; gap: 24px; padding: 36px 48px; color: #d3e0d8; font-size: 14px; letter-spacing: 1px; }
.stage-topline > span:last-child { color: #b8c6bd; font-family: $font-code; font-size: 12px; }
.chapter-content { position: relative; z-index: 1; display: flex; align-items: center; flex: 1; padding: 30px 48px 50px; }
.chapter-copy { max-width: 750px; }
.chapter-eyebrow { color: $color-primary; font-size: 15px; font-family: $font-code; letter-spacing: 3px; margin: 0 0 24px; }
.chapter-copy h2 { font-size: clamp(38px, 4.5vw, 68px); font-weight: 600; line-height: 1.25; letter-spacing: -2px; margin: 0; text-wrap: balance; }
.chapter-description { color: #c0cec7; font-size: 18px; max-width: 550px; line-height: 1.8; margin: 28px 0 32px; }
.chapter-link { display: inline-flex; align-items: center; gap: 20px; font-size: 16px; border-bottom: 1px solid #aacbb97a; padding: 8px 0 12px; }
.chapter-steps { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding: 0 48px 38px; }
.chapter-steps button { padding: 12px 0 0; border: 0; background: transparent; cursor: pointer; color: #c2cbc5; }
.step-track { display: block; height: 2px; background: #ffffff35; overflow: hidden; }
.step-track > span { display: block; width: 100%; height: 100%; background: #a8e8cc; transform-origin: left; }
.step-label { display: flex; align-items: center; gap: 20px; font-family: $font-code; font-size: 14px; letter-spacing: 2px; padding-top: 20px; text-align: left; }
.active .step-label { color: #c3f3dc; }
.step-label > span { color: #9aada2; }
.chapter-enter-active, .chapter-leave-active { transition: opacity .35s, transform .5s var(--motion-ease); }
.chapter-enter-from { opacity: 0; transform: translateY(28px); }
.chapter-leave-to { opacity: 0; transform: translateY(-18px); }
@media (max-width: 1100px) { .process-stage { min-height: 570px; } .chapter-content { padding: 24px 36px; } .stage-topline { padding: 28px 36px; } .chapter-steps { padding: 0 36px 32px; } }
@media (max-width: 900px), (prefers-reduced-motion: reduce) {
 .process-story { height: auto; margin-top: 30px; margin-bottom: 80px; }
 .process-stage { position: relative; top: auto; height: 700px; min-height: 0; }
}
@media (max-width: 600px) {
 .process-stage { height: 660px; }
 .stage-topline { padding: 24px; font-size: 13px; }
 .stage-topline > span:last-child { display: none; }
 .chapter-shade { background: linear-gradient(0deg, #06100df0, #06100d8c 70%, #06100d4d); }
 .chapter-content { padding: 25px; align-items: flex-end; }
 .chapter-copy h2 { font-size: 38px; letter-spacing: -1px; }
 .chapter-eyebrow { font-size: 14px; margin-bottom: 18px; }
 .chapter-description { font-size: 16px; margin: 20px 0; }
 .chapter-link { font-size: 15px; }
 .chapter-steps { padding: 20px 24px 28px; gap: 16px; }
 .step-label { gap: 8px; font-size: 11px; letter-spacing: .5px; padding-top: 15px; }
}
.chapter-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

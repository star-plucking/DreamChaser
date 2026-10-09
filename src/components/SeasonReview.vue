<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const phases = [
  { time: '08—09', zh: '复盘与招新', en: 'Review & recruitment' },
  { time: '10—12', zh: '培训与预研', en: 'Training & research' },
  { time: '01—02', zh: '开发与联调', en: 'Build & integration' },
  { time: '03—04', zh: '稳定化调试', en: 'Reliability testing' },
  { time: '05—07', zh: '走向赛场', en: 'Competition' }
]
</script>

<template>
  <section id="season-2026" v-reveal class="season-review" aria-labelledby="season-review-title">
    <div class="review-heading" data-reveal-item>
      <p class="review-eyebrow">2026 / SEASON REVIEW</p>
      <h2 id="season-review-title">{{ zh ? '在赛场上，兑现每一次突破。' : 'Progress, proven in the arena.' }}</h2>
    </div>
    <div class="review-grid" data-reveal-item>
      <div class="review-result"><span class="result-number">16<span>{{ zh ? '强' : 'TOP' }}</span></span><p>{{ zh ? 'RoboMaster 2026 全国赛' : 'RoboMaster 2026 Nationals' }}</p><span class="result-note">{{ zh ? '追平建队以来全国赛最好成绩' : 'Matching our best national finish' }}</span></div>
      <div class="review-copy">
        <p>{{ zh ? '从北部赛区八强，到全国赛十六强。2026 赛季，追梦时隔一年重返全国赛，小组赛以三胜一负晋级淘汰赛，并战胜卫冕冠军上海交通大学交龙战队。' : 'From the Northern Regional top eight to the national top sixteen. Returning to nationals after a year away, DreamChaser advanced with a 3–1 group-stage record, including a win over defending champions Jiao Long of Shanghai Jiao Tong University.' }}</p>
        <p>{{ zh ? '飞镖首次命中随机移动目标，工程首次完成双臂协同，哨兵持续提升自主决策与导航。每一次赛场表现，都来自实验室里反复验证的工程细节。' : 'A first hit on a randomly moving target, coordinated dual-arm operations, and stronger autonomous navigation: each step forward grew from repeated engineering work in the lab.' }}</p>
        <router-link to="/robots" class="review-link">{{ zh ? '探索各兵种的赛季亮点' : 'Explore the robots’ season highlights' }} <span aria-hidden="true">↗</span></router-link>
      </div>
    </div>
    <div class="next-season" data-reveal-item>
      <div class="next-heading"><h3>{{ zh ? '面向 2027，继续追梦。' : 'Onward to the 2027 season.' }}</h3><p>{{ zh ? '稳定完赛 · 技术突破 · 梯队建设' : 'Reliable competition · Technical progress · Team development' }}</p></div>
      <p class="next-intro">{{ zh ? '以各兵种稳定运行为基础，提升电控系统集成度与控制精度，让新一代队员在研发中接续成长。' : 'Build on reliable robots, improve control integration and precision, and help the next generation grow through development.' }}</p>
      <ol class="season-phases"><li v-for="phase in phases" :key="phase.time"><span class="phase-time">{{ phase.time }} <small>{{ zh ? '月' : 'MONTHS' }}</small></span><span>{{ zh ? phase.zh : phase.en }}</span></li></ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.season-review { scroll-margin-top: 112px; margin: 80px 0; padding: 48px 0; border-block: 1px solid #ffffff20; }
.review-eyebrow { font-family: $font-code; font-size: 14px; letter-spacing: 1.5px; color: #a4c6b3; margin: 0 0 20px; }
.review-heading h2 { font-size: clamp(28px, 3vw, 44px); font-weight: 600; line-height: 1.4; margin: 0 0 38px; }
.review-grid { display: grid; grid-template-columns: 1fr 1.65fr; gap: 64px; }
.review-result { padding-top: 6px; }
.result-number { font-size: clamp(80px, 8vw, 112px); line-height: 1; font-weight: 600; letter-spacing: -5px; color: #c3efda; }
.result-number > span { font-size: 26px; letter-spacing: 0; margin-left: 16px; }
.review-result p { font-size: 18px; margin: 20px 0 12px; }.result-note { font-size: 15px; color: #9fb5a9; }
.review-copy p { margin: 0 0 20px; font-size: 17px; line-height: 1.9; color: #bbc9c1; }
.review-link { display: inline-flex; align-items: center; gap: 14px; font-size: 16px; color: #c3efda; padding: 8px 0; }
.review-link:hover { color: #fff; }
.next-season { margin-top: 44px; padding-top: 32px; border-top: 1px solid #ffffff15; }
.next-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.next-heading h3 { font-size: 25px; font-weight: 500; margin: 0; }.next-heading p { font-size: 15px; color: #a8c4b5; margin: 0; }
.next-intro { font-size: 16px; line-height: 1.8; color: #aebeb4; margin: 18px 0 28px; }
.season-phases { padding: 0; margin: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); list-style: none; gap: 24px; }
.season-phases li { display: flex; flex-direction: column; gap: 12px; border-top: 2px solid #a8e8cc44; padding-top: 16px; font-size: 16px; line-height: 1.5; }
.phase-time { font-family: $font-code; font-size: 19px; color: #c3efda; }.phase-time small { font-size: 12px; }
@media(max-width: 768px) { .season-review { margin: 56px 0; padding: 32px 0; }.review-grid { grid-template-columns: 1fr; gap: 28px; }.review-heading h2 { margin-bottom: 26px; }.review-copy p { font-size: 16px; }.season-phases { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }.next-heading h3 { font-size: 23px; } }
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps<{ recruitmentUrl: string }>()
const { locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const paths = computed(() => [
  { id: '01', title: zh.value ? '普通招新' : 'General recruitment', for: zh.value ? '从兴趣出发，在实践中成长。' : 'Start with curiosity. Grow through practice.', desc: zh.value ? '面向对机器人竞赛感兴趣、希望逐步掌握模块研发能力的同学。每年秋季与夏季集中开展，零基础同学也可以从薪火培训起步。' : 'For students interested in robotics who want to develop engineering skills. Recruitment runs in autumn and summer, with training available for beginners.', steps: zh.value ? ['薪火培训（可选）', '追梦杯初赛（必经）', '面试入队'] : ['Training (optional)', 'Campus Cup preliminary (required)', 'Team interview'] },
  { id: '02', title: zh.value ? '特殊招新' : 'Experienced applicants', for: zh.value ? '带着经验，让技术走得更远。' : 'Bring your experience. Take it further.', desc: zh.value ? '面向有 RoboMaster 或类似赛事经验，能够独立承担某一技术方向研发工作的同学。全年开放，通过材料初筛与特招面试加入。' : 'For applicants with RoboMaster or similar experience who can independently develop a technical module. Applications are accepted year-round.', steps: zh.value ? ['填写报名问卷', '材料初筛', '特招面试'] : ['Application questionnaire', 'Application review', 'Technical interview'] }
])
</script>

<template>
  <section id="recruitment-paths" v-reveal class="recruitment-paths" aria-labelledby="paths-title">
    <header class="paths-heading" data-reveal-item><p>FIND YOUR WAY / 2027</p><h2 id="paths-title">{{ zh ? '不同的起点，同一个追梦方向。' : 'Different starting points. One shared ambition.' }}</h2></header>
    <div class="paths-grid">
      <article v-for="path in paths" :key="path.id" data-reveal-item class="path-item"><span class="path-index">{{ path.id }}</span><h3>{{ path.title }}</h3><p class="path-for">{{ path.for }}</p><p class="path-desc">{{ path.desc }}</p><ol><li v-for="(step, index) in path.steps" :key="step"><span>{{ index + 1 }}</span>{{ step }}</li></ol></article>
    </div>
    <div class="paths-footer" data-reveal-item><p>{{ zh ? '追梦杯沿电控、机械、视觉与硬件四条技术路线展开，让学习在真实任务中发生。' : 'The campus Cup connects control, mechanics, vision and hardware through hands-on team challenges.' }}</p><a :href="recruitmentUrl" target="_blank" rel="noopener noreferrer">{{ zh ? '阅读招新说明' : 'Read recruitment details' }} <span aria-hidden="true">↗</span></a></div>
  </section>
</template>

<style scoped lang="scss">
.recruitment-paths { margin-top: 80px; padding-top: 48px; border-top: 1px solid #ffffff20; scroll-margin-top: 112px; }
.paths-heading > p { font-family: $font-code; font-size: 14px; letter-spacing: 1.5px; color: #a4c6b3; margin: 0 0 20px; }
.paths-heading h2 { font-size: clamp(28px, 3vw, 42px); line-height: 1.4; font-weight: 600; margin: 0 0 36px; }
.paths-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px; }
.path-item { border-top: 1px solid #a8e8cc44; padding-top: 28px; }.path-index { font-family: $font-code; color: #a4c6b3; font-size: 14px; }
.path-item h3 { font-size: 29px; font-weight: 500; margin: 14px 0; }.path-for { font-size: 18px; color: #c3efda; margin: 0 0 16px; }.path-desc { font-size: 16px; color: #aebeb4; line-height: 1.9; margin: 0; }
.path-item ol { list-style: none; padding: 0; margin: 24px 0 0; display: flex; flex-direction: column; gap: 14px; }.path-item li { font-size: 16px; display: flex; gap: 14px; align-items: center; line-height: 1.5; }.path-item li span { display: grid; place-items: center; width: 28px; height: 28px; flex-shrink: 0; border: 1px solid #a8e8cc44; border-radius: 50%; font-family: $font-code; color: #a8e8cc; font-size: 13px; }
.paths-footer { display: flex; gap: 24px; align-items: center; justify-content: space-between; border-top: 1px solid #ffffff16; padding-top: 24px; margin-top: 36px; }.paths-footer p { font-size: 16px; color: #aebeb4; line-height: 1.8; max-width: 740px; margin: 0; }.paths-footer a { display: inline-flex; align-items: center; gap: 12px; flex-shrink: 0; font-size: 16px; color: #c3efda; padding: 8px 0; }.paths-footer a:hover { color: #fff; }
@media(max-width: 768px) { .recruitment-paths { margin-top: 56px; padding-top: 32px; }.paths-grid { grid-template-columns: 1fr; gap: 32px; }.path-item h3 { font-size: 26px; }.paths-footer { align-items: flex-start; flex-direction: column; gap: 16px; } }
</style>

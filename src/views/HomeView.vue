<script setup lang="ts">
import { imageAttrs } from '@/utils/images'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import HomeHero from '@/components/HomeHero.vue'
import { homeNews as news } from '@/data/home'
import ProcessStory from '@/components/ProcessStory.vue'
import { useHomeMotion } from '@/composables/useHomeMotion'
const root = ref<HTMLElement | null>(null)
useHomeMotion(root)

const { t, locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const asset = (path: string) => `${import.meta.env.BASE_URL}imgs/${path}`
const capabilities = computed(() => [
  {
    title: t('home.capabilities.engineeringTitle'),
    en: 'ENGINEERING',
    desc: zh.value
      ? '从结构设计到整机落地，让想法成为现实。'
      : 'From structural design to a complete working robot.',
    to: '/robots'
  },
  {
    title: t('home.capabilities.intelligenceTitle'),
    en: 'INTELLIGENCE',
    desc: zh.value
      ? '以视觉感知与自主决策，拓展机器的边界。'
      : 'Expanding possibilities through perception and autonomy.',
    to: '/sparks'
  },
  {
    title: t('home.capabilities.competitionTitle'),
    en: 'COMPETITION',
    desc: zh.value
      ? '在真实赛场上，检验每一次创新与协作。'
      : 'Testing every innovation and collaboration in the arena.',
    to: '/about'
  },
  {
    title: t('home.capabilities.knowledgeTitle'),
    en: 'OPEN SOURCE',
    desc: zh.value
      ? '分享我们的探索，让技术薪火相传。'
      : 'Sharing what we learn with the next generation.',
    to: '/sparks'
  }
])
const showAll = ref(false)
const visibleNews = computed(() => (showAll.value ? news : news.slice(0, 4)))
const manifesto = computed(() =>
  zh.value
    ? [
        ['把热爱，', '写进每一次创造。'],
        ['把极致，', '带进每一场较量。']
      ]
    : [
        ['Passion. ', 'In every creation.'],
        ['Precision. ', 'In every challenge.']
      ]
)
</script>

<template>
  <div ref="root" class="home-container">
    <HomeHero />

    <div class="brand-marquee" aria-hidden="true">
      <div class="marquee-track">
        <span>BUILT TO CHASE.</span
        ><span class="marquee-outline">ENGINEERED TO WIN.</span
        ><span>BUILT TO CHASE.</span
        ><span class="marquee-outline">ENGINEERED TO WIN.</span>
      </div>
    </div>

    <section id="team-story" v-reveal class="team-story">
      <div class="story-photo" data-reveal-item>
        <img
          v-bind="
            imageAttrs(
              asset('photo_wall/202606010b0a0834.webp'),
              '(max-width: 900px) 90vw, 45vw'
            )
          "
          decoding="async"
          :alt="zh ? '追梦战队赛场合影' : 'DreamChaser team at the competition'"
          loading="lazy"
        /><span class="photo-caption">TOGETHER, WE GO FURTHER.</span>
      </div>
      <div class="story-copy" data-reveal-item>
        <p class="eyebrow">01 / {{ zh ? '关于追梦' : 'OUR STORY' }}</p>
        <h2>
          {{ zh ? '一群追梦的人，' : 'Many minds.' }}<br /><span>{{
            zh ? '一件热爱的事。' : 'One shared passion.'
          }}</span>
        </h2>
        <p>
          {{
            zh
              ? '从实验室的深夜，到赛场上的每一秒。我们因机器人相聚，在机械、电控、视觉与硬件的交汇处，把每一次挑战变成下一次突破。'
              : 'From late nights in the lab to every second in the arena. We unite mechanical design, control, vision and hardware to turn each challenge into our next breakthrough.'
          }}
        </p>
        <router-link to="/about" class="text-button"
          >{{ zh ? '了解我们的故事' : 'Discover our story' }}
          <ArrowUpRight :size="17"
        /></router-link>
        <div class="story-stats">
          <div>
            <strong>2018<span> /</span></strong
            ><span>{{ zh ? '正式成立' : 'ESTABLISHED' }}</span>
          </div>
          <div>
            <strong>80<span> +</span></strong
            ><span>{{ zh ? '跨学科队员' : 'TEAM MEMBERS' }}</span>
          </div>
          <div>
            <strong
              >16<span>{{ zh ? ' 强' : ' TOP' }}</span></strong
            ><span>{{ zh ? '2026 全国赛' : '2026 NATIONAL TOP 16' }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="manifesto">
      <p class="eyebrow">THE DREAMCHASER SPIRIT</p>
      <h2>
        <span v-for="line in manifesto" :key="line[0]" class="manifesto-line"
          ><span v-for="word in line" :key="word" class="manifesto-word">{{
            word
          }}</span></span
        >
      </h2>
    </section>

    <ProcessStory />

    <section v-reveal class="capabilities-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">02 / {{ zh ? '探索与创造' : 'WHAT WE DO' }}</p>
          <h2>{{ zh ? '让想象，落地成真。' : 'Ideas into reality.' }}</h2>
        </div>
        <span class="section-note">ENGINEER. COMPETE. EVOLVE.</span>
      </div>
      <div class="capabilities-grid">
        <router-link
          v-surface
          data-reveal-item
          v-for="(item, index) in capabilities"
          :key="item.en"
          :to="item.to"
          class="capability-card motion-surface"
          ><div class="capability-top">
            <span>0{{ index + 1 }}</span
            ><ArrowUpRight :size="20" />
          </div>
          <p class="capability-en">{{ item.en }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p></router-link
        >
      </div>
    </section>

    <section v-reveal class="news-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">03 / {{ zh ? '保持前进' : 'KEEP MOVING' }}</p>
          <h2>{{ t('home.latestIntel') }}</h2>
        </div>
        <button
          class="text-button"
          :aria-expanded="showAll"
          aria-controls="news-list"
          @click="showAll = !showAll"
        >
          {{
            zh
              ? showAll
                ? '收起动态'
                : '全部动态'
              : showAll
                ? 'Show less'
                : 'All updates'
          }}
          <ArrowRight :size="16" />
        </button>
      </div>
      <router-link to="/about#season-2026" class="season-news"
        ><span class="season-news-year">2026<span>RMUC</span></span>
        <div>
          <p class="season-news-label">
            {{ zh ? '赛季回望' : 'SEASON IN REVIEW' }}
          </p>
          <h3>
            {{
              zh
                ? '重返全国赛，再至十六强。'
                : 'Back at nationals. Back in the top sixteen.'
            }}
          </h3>
          <p>
            {{
              zh
                ? '北部赛区八强 · 全国赛十六强。飞镖随机移动目标命中、工程双臂协同，让技术突破在赛场上落地。'
                : 'Northern Regional top eight. National top sixteen. Moving-target hits and coordinated dual-arm operations brought technical progress into the arena.'
            }}
          </p>
        </div>
        <ArrowUpRight :size="24" aria-hidden="true"
      /></router-link>
      <div id="news-list" class="news-list">
        <router-link
          v-for="item in visibleNews"
          :key="item.date"
          :to="item.to"
          class="news-item"
          ><time :datetime="item.date.split('.').join('-')">{{
            item.date
          }}</time
          ><span class="news-category">{{
            t(`home.categories.${item.category}`)
          }}</span>
          <h3>{{ zh ? item.title : item.en }}</h3>
          <ArrowUpRight :size="19"
        /></router-link>
      </div>
    </section>

    <section v-reveal class="join-strip">
      <p class="eyebrow">THE NEXT CHAPTER</p>
      <h2>
        {{
          zh ? '下一段故事，期待与你一起。' : 'Write the next chapter with us.'
        }}
      </h2>
      <router-link to="/merch" v-magnetic class="primary-button"
        >{{ zh ? '成为追梦的一员' : 'Become a DreamChaser' }}
        <ArrowUpRight :size="18"
      /></router-link>
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/styles/home/content.scss"></style>

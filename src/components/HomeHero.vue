<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import HeroFlow from '@/components/HeroFlow.vue'
import { heroMachines } from '@/data/home'
import { HERO_MOTION } from '@/config/homeMotion'
import { useHeroMotion } from '@/composables/useHeroMotion'
import { imageAttrs } from '@/utils/images'

const root = ref<HTMLElement | null>(null)
const { sceneProgress } = useHeroMotion(root)
const { t, locale } = useI18n()
const zh = computed(() => locale.value === 'zh-CN')
const machines = heroMachines
const selected = ref(0)
const machine = computed(() => machines[selected.value])
const asset = (path: string) => `${import.meta.env.BASE_URL}imgs/${path}`

function cycle(direction: number) {
  selected.value =
    (selected.value + direction + machines.length) % machines.length
}

function scrollToStory() {
  document.getElementById('team-story')?.scrollIntoView({
    behavior: matchMedia(HERO_MOTION.reducedMedia).matches ? 'auto' : 'smooth'
  })
}
</script>

<template>
  <div ref="root" class="hero-sequence">
    <section class="hero-section">
      <HeroFlow :progress="sceneProgress" />
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="status-dot"></span>
          {{
            zh ? '北京理工大学 · 追梦战队' : 'BEIJING INSTITUTE OF TECHNOLOGY'
          }}
        </p>
        <h1 class="hero-title">
          <span class="title-line"><span>DREAM</span></span
          ><span class="title-line"><span>CHASER.</span></span>
        </h1>
        <p class="hero-motto">{{ t('common.teamMotto') }}</p>
        <p class="hero-description">
          {{
            zh
              ? '我们是北京理工大学 RoboMaster 机器人战队。\n将想象化为工程，在竞技中探索技术的无限可能。'
              : 'We are the RoboMaster team at BIT. Turning imagination into engineering, and pushing possibilities in the arena.'
          }}
        </p>
        <div class="hero-actions">
          <router-link to="/robots" v-magnetic class="primary-button"
            >{{ t('home.accessArsenal') }} <ArrowUpRight :size="17"
          /></router-link>
          <router-link to="/merch" class="text-button"
            >{{ t('home.joinUs') }} <ArrowRight :size="16"
          /></router-link>
        </div>
        <a class="scroll-cue" href="#team-story" @click.prevent="scrollToStory"
          ><ArrowDown :size="14" /> {{ zh ? '向下探索' : 'EXPLORE MORE' }}
          <span>SCROLL TO DISCOVER</span></a
        >
      </div>
      <div
        v-surface="12"
        class="hero-machine motion-surface"
        :class="`machine-${machine.composition}`"
      >
        <div class="machine-topline">
          <span>ROBOTICS / 2026</span
          ><span class="machine-dot">{{
            zh ? '自主研发' : 'BUILT IN-HOUSE'
          }}</span>
        </div>
        <div class="stage-parallax">
          <div class="stage-backlight" aria-hidden="true"></div>
          <div class="stage-orbit" aria-hidden="true"></div>
          <span class="machine-number" aria-hidden="true">{{
            machine.id
          }}</span>
          <div class="stage-floor" aria-hidden="true"></div>
          <div class="stage-shadow" aria-hidden="true"></div>
          <div class="machine-image" data-depth>
            <Transition name="machine-switch" mode="out-in">
              <img
                :key="machine.id"
                :class="`composition-${machine.composition}`"
                v-bind="
                  imageAttrs(
                    asset(`robots/机器人2026抠图/${machine.file}.webp`),
                    '(max-width: 900px) 85vw, 45vw'
                  )
                "
                decoding="async"
                :alt="zh ? machine.name : machine.en"
                fetchpriority="high"
              />
            </Transition>
          </div>
        </div>
        <div class="machine-caption" aria-live="polite">
          <div>
            <p class="machine-en">{{ machine.en }}</p>
            <h2>{{ zh ? machine.name : `UNIT ${machine.id}` }}</h2>
            <p class="machine-tag">{{ zh ? machine.tag : machine.tagEn }}</p>
          </div>
          <router-link
            to="/robots"
            v-magnetic
            class="machine-link"
            :aria-label="t('home.accessArsenal')"
            ><ArrowUpRight :size="21"
          /></router-link>
        </div>
        <div class="machine-controls">
          <div class="machine-tabs">
            <button
              v-for="(item, index) in machines"
              :key="item.id"
              :class="{ active: selected === index }"
              :aria-label="zh ? `展示${item.name}` : `Show ${item.en}`"
              :aria-pressed="selected === index"
              @click="selected = index"
            >
              {{ item.id }}
            </button>
          </div>
          <div class="arrows">
            <button
              :aria-label="zh ? '上一台机器人' : 'Previous robot'"
              @click="cycle(-1)"
            >
              <ChevronLeft :size="16" /></button
            ><button
              :aria-label="zh ? '下一台机器人' : 'Next robot'"
              @click="cycle(1)"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="engineering-reveal"
        :aria-hidden="sceneProgress < HERO_MOTION.notesVisibleAt"
      >
        <div class="engineering-heading">
          <p class="eyebrow">BEYOND THE SURFACE / {{ machine.id }}</p>
          <h2>
            {{ zh ? '每一处细节，' : 'Every detail.' }}<br /><span>{{
              zh ? '都为突破而生。' : 'Built to go further.'
            }}</span>
          </h2>
        </div>
        <div class="engineering-notes">
          <div
            v-for="(note, i) in machine.notes"
            :key="note.en"
            class="engineering-note"
          >
            <span class="note-index">0{{ i + 1 }}</span>
            <div>
              <span class="note-en">{{ note.en }}</span>
              <h3>{{ zh ? note.zh : note.en }}</h3>
            </div>
          </div>
        </div>
        <p class="engineering-footer">
          {{
            zh
              ? '从结构，到感知，再到每一次行动。'
              : 'Structure. Perception. Every move.'
          }}
        </p>
      </div>
      <div class="scene-progress" aria-hidden="true">
        <span>01 — 02</span>
        <div><i :style="{ transform: `scaleX(${sceneProgress})` }"></i></div>
        <span>ENGINEERING IN MOTION</span>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/styles/home/hero.scss"></style>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const isMenuOpen = ref(false)
const isMobile = ref(window.matchMedia('(max-width: 900px)').matches)
const mediaQuery = window.matchMedia('(max-width: 900px)')
const onMediaChange = () => { isMobile.value = mediaQuery.matches; closeMenu() }
const menuButton = ref<HTMLButtonElement | null>(null)
const logoInFlight = ref(false)
const animatedLogoMarkup = ref('')
const logoSrc = `${import.meta.env.BASE_URL}imgs/optimized/logo.webp`

const onLogoFlightStart = () => {
  logoInFlight.value = true
}

const onLogoArrived = (event: Event) => {
  animatedLogoMarkup.value = (event as CustomEvent<string>).detail
  logoInFlight.value = false
}

const navItems = computed(() => [
  { to: '/', label: t('nav.dashboard') },
  { to: '/robots', label: t('nav.arsenal') },
  { to: '/about', label: t('nav.about') },
  { to: '/team', label: t('nav.crew') },
  { to: '/sparks', label: t('nav.knowledge') },
  { to: '/merch', label: t('nav.ipStore') }
])

const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const closeMenuAndFocus = () => {
  if (!isMenuOpen.value) return
  closeMenu()
  nextTick(() => menuButton.value?.focus())
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  mediaQuery.addEventListener('change', onMediaChange)
  window.addEventListener('dreamchaser:logo-flight-start', onLogoFlightStart)
  window.addEventListener('dreamchaser:logo-arrived', onLogoArrived)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', onMediaChange)
  window.removeEventListener('dreamchaser:logo-flight-start', onLogoFlightStart)
  window.removeEventListener('dreamchaser:logo-arrived', onLogoArrived)
})
</script>

<template>
  <nav class="nav-bar" :class="{ 'menu-open': isMenuOpen }" @keydown.esc.prevent="closeMenuAndFocus">
    <router-link to="/" class="brand" :aria-label="t('site.title')" @click="closeMenu">
      <div class="logo-icon" data-logo-target>
        <img v-if="!animatedLogoMarkup" :class="{ 'is-in-flight': logoInFlight }" :src="logoSrc" alt="DreamChaser Logo" />
        <div v-else class="animated-logo-mark" v-html="animatedLogoMarkup"></div>
      </div>
      <span class="brand-type"><span class="logo-text">DreamChaser</span><span class="brand-subtitle">BIT / ROBOMASTER TEAM</span></span>
    </router-link>

    <div class="actions">
      <button class="lang-btn" type="button" :aria-label="t('common.language')" @click="toggleLanguage">
        {{ locale === 'zh-CN' ? 'EN' : '中' }}
      </button>
      <button
        ref="menuButton"
        class="menu-btn"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-navigation"
        :aria-label="t('nav.toggleMenu')"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="primary-navigation" class="links" :inert="!isMenuOpen && isMobile" :class="{ open: isMenuOpen }">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        @click="closeMenu"
      >
        {{ item.label }}
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar { display: flex; align-items: center; padding: 0 var(--page-padding-x); height: 100%; gap: 32px; position: relative; max-width: 1680px; margin: auto; }
.brand { display: flex; align-items: center; gap: 12px; margin-right: auto; color: #f0f5f2; }
.logo-icon { width: 40px; height: 40px; padding: 3px; flex-shrink: 0; }
.logo-icon img { width: 100%; height: 100%; object-fit: contain; filter: brightness(0) invert(1); transition: opacity .16s; }
.logo-icon img.is-in-flight { opacity: 0; }
.brand-type { display: flex; flex-direction: column; }
.logo-text { font-size: 24px; font-weight: 700; letter-spacing: -.6px; line-height: 1.4; }
.brand-subtitle { color: #9caea5; font-size: 12px; letter-spacing: 1.3px; }
.animated-logo-mark { width: 100%; height: 100%; color: #effdff; :deep(svg) { display: block; width: 100%; height: 100%; overflow: visible; color: currentColor; } }
.actions { order: 3; display: flex; align-items: center; gap: 12px; }
.links { display: flex; align-items: center; gap: clamp(18px, 2.2vw, 36px); height: 100%; }
.links a { display: flex; align-items: center; position: relative; height: 100%; font-size: 14px; color: #a7b2b5; white-space: nowrap; }
.links a::after { content: ''; height: 2px; background: $color-primary; position: absolute; bottom: 19px; left: 0; right: 0; transform: scaleX(0); transform-origin: left; transition: transform .25s; }
.links a:hover, .links a.router-link-exact-active { color: #f1f5f3; }
.links a.router-link-exact-active::after { transform: scaleX(1); }
.lang-btn, .menu-btn { height: 44px; min-width: 44px; border: 1px solid #ffffff20; background: transparent; color: #ced9d6; cursor: pointer; border-radius: 4px; font-size: 14px; transition: background .2s; }
.lang-btn:hover, .menu-btn:hover { background: #ffffff0a; }
.menu-btn { display: none; flex-direction: column; align-items: center; justify-content: center; gap: 5px; }
.menu-btn span { width: 16px; height: 1px; background: currentColor; transition: transform .2s, opacity .2s; }
.menu-open .menu-btn span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.menu-open .menu-btn span:nth-child(2) { opacity: 0; }
.menu-open .menu-btn span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
@media (max-width: 1100px) { .brand-subtitle { display: none; } .nav-bar { gap: 24px; } }
@media (max-width: 900px) {
 .menu-btn { display: flex; }
 .links { position: absolute; top: 100%; left: 0; right: 0; height: auto; padding: 12px var(--page-padding-x) 24px; background: #0a0f12fa; backdrop-filter: blur(20px); border-bottom: 1px solid #ffffff16; flex-direction: column; align-items: stretch; gap: 0; opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity .2s, transform .2s, visibility .2s; }
 .links.open { opacity: 1; visibility: visible; transform: none; }
 .links a { padding: 14px 0; height: auto; font-size: 15px; border-bottom: 1px solid #ffffff0d; }
 .links a::after { bottom: 10px; right: auto; width: 20px; }
}
@media (max-width: 400px) { .logo-text { font-size: 20px; } .brand { gap: 8px; } .logo-icon { width: 32px; height: 32px; } .nav-bar { gap: 10px; } .actions { gap: 8px; } }
</style>

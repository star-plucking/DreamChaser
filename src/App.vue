<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import CommanderAssistant from '@/components/CommanderAssistant.vue'
import StartupLoader from '@/components/StartupLoader.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'

const { t, locale } = useI18n()
const skipToContent = () => {
  const main = document.getElementById('main-content')
  main?.focus({ preventScroll: true })
  main?.scrollIntoView({ behavior: 'auto' })
}

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t('site.title')

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  description?.setAttribute('content', t('site.description'))
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', t('site.title'))
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', t('site.description'))
})
</script>

<template>
  <div class="command-center-layout">
    <a class="skip-link" href="#main-content" @click.prevent="skipToContent">{{ locale === 'zh-CN' ? '跳转到主要内容' : 'Skip to content' }}</a>
    <header class="top-bar">
      <NavBar />
      <ScrollProgress />
    </header>
    
    <main id="main-content" class="viewport" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="bottom-status">
      <StatusBar />
    </footer>

    <!-- 虚拟看板娘 -->
    <CommanderAssistant class="desktop-assistant" />

    <StartupLoader />
  </div>
</template>

<style lang="scss" scoped>
.command-center-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
}

.top-bar {
  height: var(--top-bar-height);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba($color-bg, 0.8);
  backdrop-filter: blur(20px);
  flex-shrink: 0;
}

.viewport {
  flex: 1;
  position: relative;
  overflow: visible;
  padding: 0;
}

.bottom-status {
  height: var(--status-bar-height);
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  background: $color-bg;
  z-index: 100;
  flex-shrink: 0;
}

.skip-link { position: fixed; top: -80px; left: 24px; padding: 12px 20px; background: $color-primary; color: $color-bg; z-index: 3002; }
.skip-link:focus { top: 12px; }

/* Transition Effects */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 768px) {
  .desktop-assistant {
    display: none;
  }

  .page-fade-enter-from,
  .page-fade-leave-to {
    transform: translateY(8px);
    filter: blur(1px);
  }
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import StatusBar from '@/components/StatusBar.vue'
import CommanderAssistant from '@/components/CommanderAssistant.vue'
</script>

<template>
  <div class="command-center-layout">
    <header class="top-bar">
      <NavBar />
    </header>
    
    <main class="viewport">
      <RouterView v-slot="{ Component }">
        <transition name="glitch-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="bottom-status">
      <StatusBar />
    </footer>

    <!-- 虚拟看板娘 -->
    <CommanderAssistant class="desktop-assistant" />
  </div>
</template>

<style lang="scss" scoped>
.command-center-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  position: relative;
}

.top-bar {
  height: var(--top-bar-height);
  z-index: 100;
  border-bottom: 1px solid rgba($color-primary, 0.2);
  background: rgba($color-bg, 0.8);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.viewport {
  flex: 1;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
}

.bottom-status {
  height: var(--status-bar-height);
  border-top: 1px solid rgba($color-primary, 0.2);
  background: $color-bg;
  z-index: 100;
  flex-shrink: 0;
}

/* Transition Effects */
.glitch-fade-enter-active,
.glitch-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.glitch-fade-enter-from,
.glitch-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
  filter: blur(2px);
}

@media (max-width: 768px) {
  .desktop-assistant {
    display: none;
  }

  .glitch-fade-enter-from,
  .glitch-fade-leave-to {
    transform: translateY(8px);
    filter: blur(1px);
  }
}
</style>

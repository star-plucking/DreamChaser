<script setup lang="ts">
import { useNow, useDateFormat } from '@vueuse/core'

const now = useNow()
const timeDisplay = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <div class="status-bar">
    <div class="left-indicators">
      <span class="indicator online">SYSTEM ONLINE</span>
      <span class="indicator">LATENCY: 12ms</span>
    </div>
    
    <div class="center-ticker">
      <span class="scroll-text">/// ALERT: PREPARING FOR REGIONAL QUALIFIERS /// WELCOME COMMANDER ///</span>
    </div>
    
    <div class="right-clock">
      {{ timeDisplay }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 100%;
  font-family: $font-code;
  font-size: 0.75rem;
  color: $color-text-dim;
}

.left-indicators {
  display: flex;
  gap: 1rem;

  .indicator {
    display: flex;
    align-items: center;
    gap: 6px;

    &.online::before {
      content: '';
      width: 6px;
      height: 6px;
      background: $color-accent; // 警示黄 or 绿色
      border-radius: 50%;
      box-shadow: 0 0 5px $color-accent;
      animation: pulse 2s infinite;
    }
  }
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.right-clock {
  color: $color-primary;
}

.center-ticker {
  flex: 1;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  color: rgba($color-text-main, 0.5);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .status-bar {
    padding: 0 0.75rem;
    font-size: 0.68rem;
    gap: 0.75rem;
  }

  .left-indicators {
    gap: 0.5rem;

    .indicator:not(.online) {
      display: none;
    }
  }

  .center-ticker {
    display: none;
  }
}

@media (max-width: 480px) {
  .status-bar {
    padding: 0 0.625rem;
  }

  .right-clock {
    font-size: 0.62rem;
  }
}
</style>

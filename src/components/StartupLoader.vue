<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { LineformLoader } from '@/lib/lineform-loader.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const visible = ref(true)
const ready = ref(false)
const progress = ref(0)
const logoContainer = ref<HTMLDivElement | null>(null)

let logoLoader: LineformLoader | undefined

const flyLogoIntoBrand = async () => {
  const logo = logoContainer.value?.querySelector<SVGSVGElement>('svg')
  const target = document.querySelector<HTMLElement>('[data-logo-target]')
  if (!logo || !target) {
    visible.value = false
    return
  }

  const sourceRect = logo.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const targetStyle = window.getComputedStyle(target)
  const paddingLeft = Number.parseFloat(targetStyle.paddingLeft) || 0
  const paddingRight = Number.parseFloat(targetStyle.paddingRight) || 0
  const paddingTop = Number.parseFloat(targetStyle.paddingTop) || 0
  const paddingBottom = Number.parseFloat(targetStyle.paddingBottom) || 0
  const landingWidth = targetRect.width - paddingLeft - paddingRight
  const landingHeight = targetRect.height - paddingTop - paddingBottom
  const logoMarkup = logo.outerHTML

  window.dispatchEvent(new Event('dreamchaser:logo-flight-start'))
  visible.value = false

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !sourceRect.width || !landingWidth) {
    window.dispatchEvent(new CustomEvent('dreamchaser:logo-arrived', { detail: logoMarkup }))
    return
  }

  const flyer = logo.cloneNode(true) as SVGSVGElement
  Object.assign(flyer.style, {
    position: 'fixed',
    left: `${sourceRect.left}px`,
    top: `${sourceRect.top}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    margin: '0',
    display: 'block',
    overflow: 'visible',
    zIndex: '3001',
    pointerEvents: 'none',
    color: '#effdff',
    transformOrigin: 'top left',
    willChange: 'transform'
  })
  document.body.append(flyer)
  logo.style.opacity = '0'

  const dx = targetRect.left + paddingLeft - sourceRect.left
  const dy = targetRect.top + paddingTop - sourceRect.top
  const scaleX = landingWidth / sourceRect.width
  const scaleY = landingHeight / sourceRect.height
  const arcHeight = Math.min(42, Math.hypot(dx, dy) * 0.12)

  await new Promise<void>((resolve) => {
    const startedAt = performance.now()
    const damping = 12
    const frequency = Math.sqrt(150 - damping * damping)

    const update = (time: number) => {
      const elapsed = (time - startedAt) / 1000
      const decay = Math.exp(-damping * elapsed)
      const sine = Math.sin(frequency * elapsed)
      const position = 1 - decay * (Math.cos(frequency * elapsed) + (damping / frequency) * sine)
      const velocity = (150 / frequency) * decay * sine

      const arcProgress = Math.max(0, Math.min(1, position))
      const arc = Math.sin(Math.PI * arcProgress) * arcHeight
      flyer.style.transform = `translate3d(${dx * position}px, ${dy * position - arc}px, 0) scale(${1 + (scaleX - 1) * position}, ${1 + (scaleY - 1) * position})`

      if (Math.abs(1 - position) < 0.001 && Math.abs(velocity) < 0.01) {
        flyer.remove()
        resolve()
        return
      }
      window.requestAnimationFrame(update)
    }

    window.requestAnimationFrame(update)
  })
  window.dispatchEvent(new CustomEvent('dreamchaser:logo-arrived', { detail: logoMarkup }))
}

onMounted(async () => {
  let completeAnimation!: () => void
  const animationComplete = new Promise<void>((resolve) => {
    completeAnimation = resolve
  })
  logoLoader = new LineformLoader(logoContainer.value!, {
    onUpdate: ({ progress: animationProgress }) => {
      progress.value = Math.min(99, animationProgress * 100)
    },
    onComplete: completeAnimation
  })
  logoLoader.setSpeed(3)

  let loadHandler: (() => void) | undefined
  const pageLoaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        loadHandler = () => resolve()
        window.addEventListener('load', loadHandler, { once: true })
      })
  const fontsLoaded = document.fonts?.ready.catch(() => undefined) ?? Promise.resolve()
  let safetyTimer = 0
  const safetyTimeout = new Promise<void>((resolve) => {
    safetyTimer = window.setTimeout(resolve, 1800)
  })

  await Promise.all([animationComplete, Promise.race([Promise.all([pageLoaded, fontsLoaded]), safetyTimeout])])
  window.clearTimeout(safetyTimer)
  if (loadHandler) window.removeEventListener('load', loadHandler)
  ready.value = true
  progress.value = 100
  await flyLogoIntoBrand()
})

onUnmounted(() => {
  logoLoader?.destroy()
})
</script>

<template>
  <Transition name="startup-dissolve">
    <div v-if="visible" class="startup-loader" :class="{ 'is-ready': ready }" role="status" :aria-label="t('loader.loading')">
      <div class="loader-core" aria-hidden="true">
        <div ref="logoContainer" class="logo-viewport">
          <div class="logo-glow"></div>
        </div>
      </div>

      <div class="loader-caption" aria-hidden="true">
        <div class="caption-topline">
          <span class="caption-label">DREAMCHASER / SYSTEM BOOT</span>
          <span class="caption-state">{{ ready ? t('loader.ready') : t('loader.initializing') }}</span>
        </div>
        <div class="progress-track">
          <span class="progress-fill" :style="{ width: `${progress}%` }"></span>
        </div>
        <div class="caption-footline">
          <span>{{ t('loader.tagline') }}</span>
          <span>{{ Math.round(progress).toString().padStart(2, '0') }}%</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.startup-loader {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: #e7fbff;
  background:
    radial-gradient(ellipse at 50% 45%, rgba(14, 54, 68, 0.42), transparent 42%),
    radial-gradient(ellipse at 50% 100%, rgba(5, 17, 25, 0.72), transparent 55%),
    #03070b;
  isolation: isolate;
}

.loader-core {
  position: absolute;
  top: 43%;
  left: 50%;
  width: min(78vw, 390px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
}

.logo-viewport {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 76%;
  height: 70%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 18px rgba(46, 211, 239, 0.18));
}

.logo-viewport :deep(.identity-svg) {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  color: #effdff;
  filter: drop-shadow(0 0 7px rgba(104, 237, 255, 0.55));
  animation: mark-arrive 0.38s ease-out both;
}

.logo-glow {
  position: absolute;
  inset: 10% 8% 10%;
  opacity: 0;
  background: radial-gradient(ellipse, rgba(47, 217, 242, 0.25), transparent 67%);
  mix-blend-mode: screen;
  animation: glow-pulse 2.2s 0.45s ease-in-out infinite;
}

.loader-caption {
  position: absolute;
  top: calc(43% + min(39vw, 195px));
  left: 50%;
  width: min(74vw, 300px);
  opacity: 0;
  transform: translate(-50%, 12px);
  animation: caption-arrive 0.7s 0.65s ease-out forwards;
}

.caption-topline,
.caption-footline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: 'Source Code Pro', monospace;
  font-size: 9px;
  letter-spacing: 0.16em;
}

.caption-label {
  color: rgba(207, 245, 250, 0.64);
}

.caption-state {
  color: #77e9f5;
  font-size: 8px;
  letter-spacing: 0.2em;
}

.progress-track {
  height: 2px;
  margin: 10px 0 8px;
  overflow: hidden;
  background: rgba(131, 220, 235, 0.14);
}

.progress-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #278b9b, #8bf1ff);
  box-shadow: 0 0 9px rgba(94, 232, 249, 0.8);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.caption-footline {
  color: rgba(180, 222, 229, 0.48);
  font-size: 8px;
  letter-spacing: 0.12em;
}

.is-ready {
  .logo-glow {
    animation-play-state: paused;
  }
}

.startup-dissolve-leave-active {
  transition: opacity 0.82s ease;
}

.startup-dissolve-leave-to {
  opacity: 0;
}

@keyframes mark-arrive {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.16; transform: scale(0.92); }
  50% { opacity: 0.72; transform: scale(1.12); }
}

@keyframes caption-arrive {
  to { opacity: 1; transform: translate(-50%, 0); }
}

@media (max-height: 620px) {
  .loader-core {
    top: 40%;
    width: min(58vh, 340px);
  }

  .loader-caption {
    top: calc(40% + min(29vh, 170px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-viewport :deep(.identity-svg),
  .logo-glow,
  .loader-caption {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
  }

  .startup-dissolve-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { HERO_FLOW, HERO_MOTION } from '@/config/homeMotion'
const props = defineProps<{ progress: number }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | undefined
onMounted(() => {
  const el = canvas.value
  const host = el?.parentElement
  const ctx = el?.getContext('2d')
  if (!el || !host || !ctx) return
  const reduced = matchMedia(HERO_MOTION.reducedMedia)
  let width = 1,
    height = 1,
    frame = 0,
    visible = true,
    last = 0
  // Pointer coordinates are normalized to the hero, independent of pixel density.
  let x: number = HERO_FLOW.restingPointer.x,
    y: number = HERO_FLOW.restingPointer.y
  let targetX = x,
    targetY = y
  let gradients: CanvasGradient[] = []
  let gradientProgress = -1
  const updateGradients = (progress: number) => {
    if (gradientProgress === progress) return
    gradientProgress = progress
    gradients = Array.from({ length: HERO_FLOW.rows }, (_, row) => {
      const depth = row / (HERO_FLOW.rows - 1)
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, 'rgba(168,232,204,0)')
      gradient.addColorStop(0.4, `rgba(168,232,204,${0.035 + depth * 0.055})`)
      gradient.addColorStop(0.75, `rgba(168,232,204,${0.12 + progress * 0.08})`)
      gradient.addColorStop(1, 'rgba(168,232,204,.015)')
      return gradient
    })
  }
  const draw = (time: number) => {
    const delta = Math.min((time - last) / 1000, 0.05)
    last = time
    const ease = 1 - Math.exp(-delta * HERO_FLOW.pointerEase)
    x += (targetX - x) * ease
    y += (targetY - y) * ease
    ctx.clearRect(0, 0, width, height)
    const phase = reduced.matches ? 0 : time * HERO_FLOW.speed
    const progress = props.progress
    updateGradients(progress)
    for (let row = 0; row < HERO_FLOW.rows; row++) {
      const depth = row / (HERO_FLOW.rows - 1)
      ctx.beginPath()
      for (let col = 0; col <= HERO_FLOW.columns; col++) {
        const u = col / HERO_FLOW.columns
        const ridge = Math.exp(
          -Math.pow((u - (0.66 - progress * 0.22)) * 4.5, 2)
        )
        const touch = Math.exp(-Math.pow((u - x) * 5, 2)) * (y - 0.5)
        const wave = Math.sin(u * 8 + phase + depth * 2.6) * (12 + depth * 12)
        const py =
          height * (0.28 + depth * 0.65) -
          ridge * (75 + 70 * Math.sin(depth * 3 + phase)) -
          touch * 110 +
          wave
        if (col === 0) ctx.moveTo(0, py)
        else ctx.lineTo(u * width, py)
      }
      ctx.strokeStyle = gradients[row]
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
  }
  const tick = (time: number) => {
    draw(time)
    frame = requestAnimationFrame(tick)
  }
  const update = () => {
    cancelAnimationFrame(frame)
    if (!visible || document.hidden) return
    last = performance.now()
    if (reduced.matches) draw(last)
    else frame = requestAnimationFrame(tick)
  }
  const resize = new ResizeObserver(() => {
    width = host.clientWidth
    height = host.clientHeight
    gradientProgress = -1 // Canvas width changes invalidate cached gradients.
    const dpr = Math.min(devicePixelRatio, HERO_FLOW.pixelRatioLimit)
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    update()
  })
  resize.observe(host)
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    update()
  })
  observer.observe(host)
  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced.matches) return
    const box = host.getBoundingClientRect()
    targetX = (e.clientX - box.left) / width
    targetY = (e.clientY - box.top) / height
  }
  const leave = () => {
    targetX = HERO_FLOW.restingPointer.x
    targetY = HERO_FLOW.restingPointer.y
  }
  host.addEventListener('pointermove', move)
  host.addEventListener('pointerleave', leave)
  document.addEventListener('visibilitychange', update)
  reduced.addEventListener('change', update)
  dispose = () => {
    cancelAnimationFrame(frame)
    resize.disconnect()
    observer.disconnect()
    host.removeEventListener('pointermove', move)
    host.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', update)
    reduced.removeEventListener('change', update)
  }
})
onBeforeUnmount(() => dispose?.())
</script>
<template>
  <canvas ref="canvas" class="hero-flow" aria-hidden="true" />
</template>
<style scoped>
.hero-flow {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mask-image: linear-gradient(transparent, #000 24% 80%, transparent);
}
</style>

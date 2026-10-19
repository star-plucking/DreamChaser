<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
const props = defineProps<{ progress: number }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | undefined
onMounted(() => {
  const el = canvas.value
  const host = el?.parentElement
  const ctx = el?.getContext('2d')
  if (!el || !host || !ctx) return
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let width = 1, height = 1, frame = 0, visible = true, last = 0
  let x = .65, y = .5, targetX = .65, targetY = .5
  const draw = (time: number) => {
    const delta = Math.min((time - last) / 1000, .05)
    last = time
    const ease = 1 - Math.exp(-delta * 5)
    x += (targetX - x) * ease; y += (targetY - y) * ease
    ctx.clearRect(0, 0, width, height)
    const phase = reduced.matches ? 0 : time * .00018
    const progress = props.progress
    for (let row = 0; row < 27; row++) {
      const depth = row / 26
      ctx.beginPath()
      for (let col = 0; col <= 100; col++) {
        const u = col / 100
        const ridge = Math.exp(-Math.pow((u - (.66 - progress * .22)) * 4.5, 2))
        const touch = Math.exp(-Math.pow((u - x) * 5, 2)) * (y - .5)
        const wave = Math.sin(u * 8 + phase + depth * 2.6) * (12 + depth * 12)
        const py = height * (.28 + depth * .65) - ridge * (75 + 70 * Math.sin(depth * 3 + phase)) - touch * 110 + wave
        if (col === 0) ctx.moveTo(0, py)
        else ctx.lineTo(u * width, py)
      }
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, 'rgba(168,232,204,0)')
      gradient.addColorStop(.4, `rgba(168,232,204,${.035 + depth * .055})`)
      gradient.addColorStop(.75, `rgba(168,232,204,${.12 + progress * .08})`)
      gradient.addColorStop(1, 'rgba(168,232,204,.015)')
      ctx.strokeStyle = gradient; ctx.lineWidth = .8; ctx.stroke()
    }
  }
  const tick = (time: number) => { draw(time); frame = requestAnimationFrame(tick) }
  const update = () => {
    cancelAnimationFrame(frame)
    if (!visible || document.hidden) return
    last = performance.now()
    if (reduced.matches) draw(last)
    else frame = requestAnimationFrame(tick)
  }
  const resize = new ResizeObserver(() => {
    width = host.clientWidth; height = host.clientHeight
    const dpr = Math.min(devicePixelRatio, 1.5)
    el.width = Math.round(width * dpr); el.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    update()
  })
  resize.observe(host)
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() })
  observer.observe(host)
  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced.matches) return
    const box = host.getBoundingClientRect()
    targetX = (e.clientX - box.left) / width; targetY = (e.clientY - box.top) / height
  }
  const leave = () => { targetX = .65; targetY = .5 }
  host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave)
  document.addEventListener('visibilitychange', update); reduced.addEventListener('change', update)
  dispose = () => {
    cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect()
    host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update)
  }
})
onBeforeUnmount(() => dispose?.())
</script>
<template><canvas ref="canvas" class="hero-flow" aria-hidden="true" /></template>
<style scoped>
.hero-flow { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; mask-image: linear-gradient(transparent, #000 24% 80%, transparent); }
</style>

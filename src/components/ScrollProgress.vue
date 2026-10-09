<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const progress = ref(0)
const route = useRoute()
let frame = 0
let resize: ResizeObserver | undefined
const update = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const distance = document.documentElement.scrollHeight - window.innerHeight
    progress.value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
  })
}
watch(() => route.fullPath, update)
onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  resize = new ResizeObserver(update)
  resize.observe(document.body)
  update()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  resize?.disconnect()
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>
<template><div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div></template>
<style scoped>
.scroll-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: linear-gradient(90deg, #659c7b, #c5ffdf); transform-origin: left; pointer-events: none; }
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const host = ref<HTMLDivElement | null>(null)
let dispose: (() => void) | undefined

onMounted(() => {
  const element = host.value
  if (!element) return
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
  } catch { return }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  element.append(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 100)
  camera.position.set(0, .7, 7)
  const geometry = new THREE.PlaneGeometry(7.8, 4.8, 84, 42)
  const uniforms = { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() }, uRatio: { value: renderer.getPixelRatio() } }
  const vertexShader = `
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uRatio;
    varying float vWave;
    varying float vDistance;
    void main() {
      vec3 p = position;
      float wave = sin(p.x * 1.4 + uTime * .42) * cos(p.y * 1.6 - uTime * .3);
      float distanceToPointer = length(p.xy - uPointer * vec2(3.5, 2.));
      p.z = wave * .38 + exp(-distanceToPointer * distanceToPointer * .8) * .65;
      p.y += sin(p.x * .8 + uTime * .18) * .32;
      vWave = wave;
      vDistance = distanceToPointer;
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (1.7 + max(0., wave) * 1.6) * uRatio * (5. / -mv.z);
    }
  `
  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader,
    fragmentShader: `
      varying float vWave;
      varying float vDistance;
      void main() {
        float d = length(gl_PointCoord - vec2(.5));
        if (d > .5) discard;
        float alpha = smoothstep(.5, .05, d) * (.24 + max(0., vWave) * .3);
        alpha += exp(-vDistance * 2.) * .12;
        gl_FragColor = vec4(.56, .9, .76, alpha);
      }
    `,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  })
  const points = new THREE.Points(geometry, material)
  const lineMaterial = new THREE.ShaderMaterial({
    uniforms, vertexShader,
    fragmentShader: 'void main() { gl_FragColor = vec4(.4, .78, .65, .04); }',
    wireframe: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  })
  const lattice = new THREE.Mesh(geometry, lineMaterial)
  const group = new THREE.Group()
  group.add(points, lattice)
  group.rotation.set(-.52, -.08, -.2)
  scene.add(group)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let inView = true
  let start = performance.now()
  const pointer = new THREE.Vector2()
  const render = (time = performance.now()) => {
    uniforms.uTime.value = reduced.matches ? 0 : (time - start) / 1000
    uniforms.uPointer.value.lerp(pointer, .045)
    group.rotation.y = -.08 + uniforms.uPointer.value.x * .11
    group.rotation.x = -.52 + uniforms.uPointer.value.y * .07
    renderer.render(scene, camera)
  }
  const updateLoop = () => {
    renderer.setAnimationLoop(null)
    if (document.hidden || !inView) return
    if (reduced.matches) render()
    else renderer.setAnimationLoop(render)
  }
  const resize = new ResizeObserver(() => {
    const box = element.getBoundingClientRect()
    if (!box.width || !box.height) return
    renderer.setSize(box.width, box.height)
    camera.aspect = box.width / box.height
    camera.updateProjectionMatrix()
    render()
  })
  resize.observe(element)
  const visibility = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; updateLoop() })
  visibility.observe(element)
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || reduced.matches) return
    const box = element.getBoundingClientRect()
    pointer.set((event.clientX - box.left) / box.width * 2 - 1, 1 - (event.clientY - box.top) / box.height * 2)
  }
  const leave = () => pointer.set(0, 0)
  const parent = element.parentElement!
  parent.addEventListener('pointermove', move)
  parent.addEventListener('pointerleave', leave)
  document.addEventListener('visibilitychange', updateLoop)
  reduced.addEventListener('change', updateLoop)
  updateLoop()
  dispose = () => {
    renderer.setAnimationLoop(null)
    resize.disconnect(); visibility.disconnect()
    parent.removeEventListener('pointermove', move)
    parent.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', updateLoop)
    reduced.removeEventListener('change', updateLoop)
    geometry.dispose(); material.dispose(); lineMaterial.dispose(); renderer.dispose()
    renderer.domElement.remove()
  }
})
onBeforeUnmount(() => dispose?.())
</script>
<template><div ref="host" class="kinetic-field" aria-hidden="true"></div></template>
<style scoped>
.kinetic-field { position: absolute; inset: 10% -4% 25%; pointer-events: none; overflow: hidden; opacity: .72; animation: field-appear .8s ease both; mask-image: radial-gradient(ellipse at 50% 46%, black 20%, black 44%, transparent 72%); }
.kinetic-field :deep(canvas) { display: block; width: 100%; height: 100%; }
@keyframes field-appear { from { opacity: 0; } to { opacity: .72; } }
@media (prefers-reduced-motion: reduce) { .kinetic-field { animation: none; } }
</style>

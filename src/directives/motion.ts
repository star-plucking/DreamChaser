import type { ObjectDirective } from 'vue'
import gsap from 'gsap'

const cleanups = new WeakMap<HTMLElement, () => void>()

/** Motion targets sit inside reveal containers, so their transforms stay independent. */
export const surface: ObjectDirective<HTMLElement> = {
  mounted(el, binding) {
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const target = el.querySelector<HTMLElement>('[data-depth]')
      const amount = Number(binding.value) || 10
      const x = target ? gsap.quickTo(target, 'x', { duration: .7, ease: 'power3.out' }) : undefined
      const y = target ? gsap.quickTo(target, 'y', { duration: .7, ease: 'power3.out' }) : undefined
      const rx = target ? gsap.quickTo(target, 'rotationX', { duration: .7, ease: 'power3.out' }) : undefined
      const ry = target ? gsap.quickTo(target, 'rotationY', { duration: .7, ease: 'power3.out' }) : undefined
      if (target) gsap.set(target, { transformPerspective: 900, transformOrigin: '50% 50%' })
      const move = (event: PointerEvent) => {
        const box = el.getBoundingClientRect()
        const px = (event.clientX - box.left) / box.width
        const py = (event.clientY - box.top) / box.height
        el.style.setProperty('--pointer-x', `${px * 100}%`)
        el.style.setProperty('--pointer-y', `${py * 100}%`)
        el.style.setProperty('--surface-active', '1')
        x?.((px - .5) * amount * 2)
        y?.((py - .5) * amount * 2)
        rx?.((.5 - py) * 7)
        ry?.((px - .5) * 9)
      }
      const leave = () => {
        el.style.setProperty('--surface-active', '0')
        x?.(0); y?.(0); rx?.(0); ry?.(0)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
        if (target) gsap.killTweensOf(target)
        el.style.removeProperty('--surface-active')
      }
    })
    cleanups.set(el, () => media.revert())
  },
  unmounted(el) { cleanups.get(el)?.(); cleanups.delete(el) }
}

export const magnetic: ObjectDirective<HTMLElement> = {
  mounted(el) {
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const x = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3.out' })
      let bounds: DOMRect
      const enter = () => { bounds = el.getBoundingClientRect() }
      const move = (event: PointerEvent) => {
        if (!bounds) enter()
        x((event.clientX - bounds.left - bounds.width / 2) * .16)
        y((event.clientY - bounds.top - bounds.height / 2) * .22)
      }
      const leave = () => { x(0); y(0) }
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
        gsap.killTweensOf(el)
      }
    })
    cleanups.set(el, () => media.revert())
  },
  unmounted(el) { cleanups.get(el)?.(); cleanups.delete(el) }
}

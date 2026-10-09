import type { ObjectDirective } from 'vue'
import gsap from 'gsap'

const cleanups = new WeakMap<HTMLElement, () => void>()
export const reveal: ObjectDirective<HTMLElement> = {
  mounted(el, binding) {
    if (!('IntersectionObserver' in window)) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = el.querySelectorAll<HTMLElement>('[data-reveal-item]')
      const items = targets.length ? Array.from(targets) : [el]
      gsap.set(items, { opacity: 0, y: 48 })
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          gsap.to(items, { opacity: 1, y: 0, duration: 1.05, stagger: .1, delay: Number(binding.value) || 0, ease: 'power3.out', clearProps: 'opacity,transform' })
          observer.disconnect()
        }
      }, { rootMargin: '0px 0px -6% 0px', threshold: .04 })
      observer.observe(el)
      return () => { observer.disconnect(); gsap.killTweensOf(items) }
    })
    cleanups.set(el, () => media.revert())
  },
  unmounted(el) { cleanups.get(el)?.(); cleanups.delete(el) }
}

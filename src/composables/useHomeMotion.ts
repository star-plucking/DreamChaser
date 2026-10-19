import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHomeMotion(root: Ref<HTMLElement | null>) {
  const sceneProgress = ref(0)
  let context: gsap.Context | undefined
  let refreshObserver: ResizeObserver | undefined
  let timer: ReturnType<typeof setTimeout>
  let started = false
  const enter = () => {
    if (started || !root.value) return
    started = true
    context?.add(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline.from('.title-line > span', { yPercent: 105, rotation: 4, duration: 1.3, stagger: .13 })
        .from('.hero-copy > .eyebrow, .hero-motto, .hero-description, .hero-actions, .scroll-cue', { opacity: 0, y: 28, duration: .95, stagger: .09 }, .2)
        .from('.hero-machine', { opacity: 0, scale: .94, y: 32, duration: 1.4 }, .05)
    })
  }
  onMounted(() => {
    if (!root.value) return
    context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 1000px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)', () => {
        const targets = root.value!.querySelectorAll<HTMLElement>('.hero-copy, .machine-controls, .machine-link')
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: '.hero-sequence', start: 'top 80px', end: 'bottom bottom', scrub: .85,
          onUpdate: self => { targets.forEach(el => { el.inert = self.progress > .2 }) }
        } })
        timeline.to('.hero-copy', { opacity: 0, y: -65, duration: .3 }, 0)
          .to('.machine-topline, .machine-caption, .machine-controls', { opacity: 0, duration: .2 }, 0)
          .to('.hero-machine', { xPercent: -78, y: 45, duration: .75, ease: 'power2.inOut' }, .05)
          .to('.stage-parallax', { scale: 1.08, duration: .75, ease: 'power2.inOut' }, .05)
          .fromTo('.engineering-heading', { y: 30 }, { y: 0, opacity: 1, duration: .3 }, .35)
          .fromTo('.engineering-note', { x: 45 }, { x: 0, opacity: 1, stagger: .12, duration: .25 }, .52)
          .to('.engineering-footer', { opacity: 1, duration: .2 }, .8)
          .to({}, { duration: .15 })
        timeline.eventCallback('onUpdate', () => { sceneProgress.value = timeline.progress() })
        return () => { sceneProgress.value = 0; targets.forEach(el => { el.inert = false }) }
      })
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.story-photo img', { yPercent: -8, scale: 1.16 }, { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: { trigger: '.story-photo', start: 'top bottom', end: 'bottom top', scrub: .9 } })
        gsap.to('.marquee-track', { xPercent: -16, ease: 'none', scrollTrigger: { trigger: '.brand-marquee', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
        const words = root.value?.querySelectorAll('.manifesto-word')
        if (words?.length) gsap.fromTo(words, { color: '#40554d' }, { color: '#e7f5ed', stagger: .18, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 78%', end: 'bottom 52%', scrub: .5 } })
      })
    }, root.value)
    window.addEventListener('dreamchaser:logo-flight-start', enter, { once: true })
    if (!document.querySelector('.startup-loader')) enter()
    refreshObserver = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    refreshObserver.observe(root.value)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('dreamchaser:logo-flight-start', enter)
    clearTimeout(timer)
    refreshObserver?.disconnect()
    context?.revert()
  })
  return { sceneProgress }
}

import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { HERO_MOTION } from '@/config/homeMotion'

gsap.registerPlugin(ScrollTrigger)

export function useHeroMotion(root: Ref<HTMLElement | null>) {
  const sceneProgress = ref(0)
  let context: gsap.Context | undefined
  let refreshObserver: ResizeObserver | undefined
  let timer: ReturnType<typeof setTimeout>
  let started = false
  const enter = () => {
    if (started || !root.value) return
    started = true
    context?.add(() => {
      if (window.matchMedia(HERO_MOTION.reducedMedia).matches) return
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .from('.title-line > span', {
          yPercent: 105,
          rotation: 4,
          duration: 1.3,
          stagger: 0.13
        })
        .from(
          '.hero-copy > .eyebrow, .hero-motto, .hero-description, .hero-actions, .scroll-cue',
          { opacity: 0, y: 28, duration: 0.95, stagger: 0.09 },
          0.2
        )
        .from(
          '.hero-machine',
          { opacity: 0, scale: 0.94, y: 32, duration: 1.4 },
          0.05
        )
    })
  }
  onMounted(() => {
    if (!root.value) return
    context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add(HERO_MOTION.desktopMedia, () => {
        const targets = root.value!.querySelectorAll<HTMLElement>(
          '.hero-copy, .machine-controls, .machine-link'
        )
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.value,
            start: () =>
              `top ${getComputedStyle(document.documentElement).getPropertyValue('--top-bar-height').trim()}`,
            end: 'bottom bottom',
            scrub: HERO_MOTION.scrub,
            onUpdate: (self) => {
              targets.forEach((el) => {
                el.inert = self.progress > HERO_MOTION.controlsHiddenAt
              })
            }
          }
        })
        timeline
          .to('.hero-copy', { opacity: 0, y: -65, duration: 0.3 }, 0)
          .to(
            '.machine-topline, .machine-caption, .machine-controls',
            { opacity: 0, duration: 0.2 },
            0
          )
          .to(
            '.hero-machine',
            {
              ...HERO_MOTION.robotOffset,
              duration: 0.75,
              ease: 'power2.inOut'
            },
            0.05
          )
          .to(
            '.stage-parallax',
            {
              scale: HERO_MOTION.robotScale,
              duration: 0.75,
              ease: 'power2.inOut'
            },
            0.05
          )
          .fromTo(
            '.engineering-heading',
            { y: 30 },
            { y: 0, opacity: 1, duration: 0.3 },
            0.35
          )
          .fromTo(
            '.engineering-note',
            { x: 45 },
            { x: 0, opacity: 1, stagger: 0.12, duration: 0.25 },
            0.52
          )
          .to('.engineering-footer', { opacity: 1, duration: 0.2 }, 0.8)
          .to({}, { duration: 0.15 })
        timeline.eventCallback('onUpdate', () => {
          sceneProgress.value = timeline.progress()
        })
        return () => {
          sceneProgress.value = 0
          targets.forEach((el) => {
            el.inert = false
          })
        }
      })
    }, root.value)
    window.addEventListener(HERO_MOTION.logoFlightEvent, enter, { once: true })
    if (!document.querySelector('.startup-loader')) enter()
    refreshObserver = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), HERO_MOTION.refreshDelay)
    })
    refreshObserver.observe(root.value)
  })
  onBeforeUnmount(() => {
    window.removeEventListener(HERO_MOTION.logoFlightEvent, enter)
    clearTimeout(timer)
    refreshObserver?.disconnect()
    context?.revert()
  })
  return { sceneProgress }
}

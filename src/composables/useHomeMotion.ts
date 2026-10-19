import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_MOTION } from '@/config/homeMotion'

gsap.registerPlugin(ScrollTrigger)

/** Animations for the editorial sections below HomeHero. */
export function useHomeMotion(root: Ref<HTMLElement | null>) {
  let context: gsap.Context | undefined
  let observer: ResizeObserver | undefined
  let timer: ReturnType<typeof setTimeout> | undefined

  onMounted(() => {
    if (!root.value) return
    context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add(HERO_MOTION.enabledMedia, () => {
        gsap.fromTo(
          '.story-photo img',
          { yPercent: -8, scale: 1.16 },
          {
            yPercent: 8,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: '.story-photo',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9
            }
          }
        )
        gsap.to('.marquee-track', {
          xPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: '.brand-marquee',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        })
        const words = root.value?.querySelectorAll('.manifesto-word')
        if (words?.length)
          gsap.fromTo(
            words,
            { color: '#40554d' },
            {
              color: '#e7f5ed',
              stagger: 0.18,
              ease: 'none',
              scrollTrigger: {
                trigger: '.manifesto',
                start: 'top 78%',
                end: 'bottom 52%',
                scrub: 0.5
              }
            }
          )
      })
    }, root.value)
    // Refresh document-relative section positions when images or layout settle.
    observer = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(
        () => ScrollTrigger.refresh(),
        HERO_MOTION.refreshDelay
      )
    })
    observer.observe(root.value)
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    observer?.disconnect()
    context?.revert()
  })
}

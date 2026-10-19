/** Keep desktopMedia aligned with the cinematic layout in styles/home/hero.scss. */
export const HERO_MOTION = {
  desktopMedia:
    '(min-width: 1000px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)',
  enabledMedia: '(prefers-reduced-motion: no-preference)',
  reducedMedia: '(prefers-reduced-motion: reduce)',
  logoFlightEvent: 'dreamchaser:logo-flight-start',
  refreshDelay: 150,
  scrub: 0.85,
  controlsHiddenAt: 0.2,
  notesVisibleAt: 0.4,
  robotOffset: { xPercent: -78, y: 45 },
  robotScale: 1.08
} as const

export const HERO_FLOW = {
  rows: 27,
  columns: 100,
  pixelRatioLimit: 1.5,
  pointerEase: 5,
  speed: 0.00018,
  restingPointer: { x: 0.65, y: 0.5 }
} as const

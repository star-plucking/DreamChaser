export interface LineformProgress {
  elapsed: number
  progress: number
  playing: boolean
}

export interface LineformLoaderOptions {
  autoplay?: boolean
  onComplete?: () => void
  onUpdate?: (state: LineformProgress) => void
}

export class LineformLoader {
  constructor(container: Element, options?: LineformLoaderOptions)
  setSpeed(speed: number): void
  destroy(): void
}

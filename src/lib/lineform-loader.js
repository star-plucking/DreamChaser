import DATA from '@/data/bit-logo-stroke-data.json'

const SVG_NS = 'http://www.w3.org/2000/svg'
const clamp = (value) => Math.min(1, Math.max(0, value))
const smooth = (value) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const coordinate = (value) => Number(value.toFixed(5))
const polygonPath = (points) => points.length < 3
  ? ''
  : `M${points.map(([x, y]) => `${coordinate(x)} ${coordinate(y)}`).join('L')}Z`

// Merge neighboring triangles into the outline of one complete growing stroke.
function surfaceLoops(stroke, head) {
  const vertexCount = stroke.vertices.length
  const points = new Map()
  const edges = new Map()
  const point = (id) => points.get(id) || stroke.vertices[id]

  function intersection(first, second) {
    let a = first
    let b = second
    if (a > b) [a, b] = [b, a]
    const va = stroke.vertices[a]
    const vb = stroke.vertices[b]
    const t = (head - va[2]) / (vb[2] - va[2])
    if (t < 1e-10) return a
    if (t > 1 - 1e-10) return b
    const id = vertexCount + a * vertexCount + b
    if (!points.has(id)) {
      points.set(id, [va[0] + (vb[0] - va[0]) * t, va[1] + (vb[1] - va[1]) * t])
    }
    return id
  }

  function toggleEdge(a, b) {
    if (a === b) return
    const key = a < b ? `${a}:${b}` : `${b}:${a}`
    if (edges.has(key)) edges.delete(key)
    else edges.set(key, [a, b])
  }

  for (const face of stroke.faces) {
    const polygon = []
    for (let i = 0; i < 3; i += 1) {
      const a = face[i]
      const b = face[(i + 1) % 3]
      const da = stroke.vertices[a][2]
      const db = stroke.vertices[b][2]
      if (da <= head) polygon.push(a)
      if ((da < head && db > head) || (da > head && db < head)) {
        polygon.push(intersection(a, b))
      }
    }
    if (polygon.length < 3) continue
    for (let i = 0; i < polygon.length; i += 1) {
      toggleEdge(polygon[i], polygon[(i + 1) % polygon.length])
    }
  }

  const outgoing = new Map()
  for (const [a, b] of edges.values()) {
    if (!outgoing.has(a)) outgoing.set(a, [])
    outgoing.get(a).push(b)
  }

  const loops = []
  while (outgoing.size) {
    const start = outgoing.keys().next().value
    let current = start
    const loop = []
    let closed = false
    for (let limit = 0; limit <= edges.size + 1; limit += 1) {
      loop.push(point(current))
      const next = outgoing.get(current)
      if (!next?.length) break
      const destination = next.pop()
      if (!next.length) outgoing.delete(current)
      current = destination
      if (current === start) {
        closed = true
        break
      }
    }
    if (!closed) throw new Error(`Unwelded logo stroke boundary: ${stroke.id}`)
    if (loop.length >= 3) loops.push(loop)
  }
  return loops
}

const fullPath = (stroke) => surfaceLoops(stroke, Infinity).map(polygonPath).join('')
const grow = (stroke, progress) => {
  if (progress <= 0) return ''
  if (progress >= 1) return stroke.finalPath
  return surfaceLoops(stroke, smooth(progress) * stroke.length).map(polygonPath).join('')
}

const svgNode = (tag, attributes = {}) => {
  const element = document.createElementNS(SVG_NS, tag)
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value)
  return element
}

export class LineformLoader {
  constructor(container, options = {}) {
    this.container = container
    this.options = options
    this.duration = DATA.duration
    this.elapsed = 0
    this.speed = 1
    this.playing = false
    this.done = false
    this.destroyed = false
    this.frame = 0
    this.last = null
    this.motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.svg = svgNode('svg', {
      viewBox: '64 38 206 208',
      role: 'img',
      'aria-label': 'BIT 机器人队标志：B、I 和侧转的 T 连续生长成形',
      class: 'identity-svg'
    })
    this.strokes = DATA.strokes.map((stroke) => {
      const element = svgNode('path', {
        fill: 'currentColor',
        'fill-rule': 'evenodd',
        'data-stroke': stroke.id,
        'aria-label': stroke.name
      })
      this.svg.append(element)
      return { ...stroke, element, finalPath: fullPath(stroke), previous: -1 }
    })
    container.append(this.svg)

    this.visibility = () => {
      cancelAnimationFrame(this.frame)
      this.frame = 0
      this.last = null
      if (!document.hidden && this.playing) this.schedule()
    }
    this.motionChanged = () => {
      if (!this.motion.matches) return
      this.pause()
      this.elapsed = this.duration
      this.paint()
      this.complete()
    }
    document.addEventListener('visibilitychange', this.visibility)
    this.motion.addEventListener('change', this.motionChanged)
    this.paint()
    if (options.autoplay !== false) this.play()
  }

  paint() {
    for (const stroke of this.strokes) {
      const progress = clamp((this.elapsed - stroke.start) / stroke.duration)
      if (progress === stroke.previous) continue
      stroke.element.setAttribute('d', grow(stroke, progress))
      stroke.previous = progress
    }
    this.options.onUpdate?.({ elapsed: this.elapsed, progress: this.elapsed / this.duration, playing: this.playing })
  }

  schedule() {
    if (!this.frame && !document.hidden && !this.destroyed) {
      this.frame = requestAnimationFrame((time) => this.tick(time))
    }
  }

  tick(now) {
    this.frame = 0
    if (!this.playing || this.destroyed) return
    if (this.last !== null) this.elapsed = Math.min(this.duration, this.elapsed + Math.min(now - this.last, 80) * this.speed)
    this.last = now
    if (this.elapsed >= this.duration) this.playing = false
    this.paint()
    if (this.playing) this.schedule()
    else this.complete()
  }

  complete() {
    if (this.done) return
    this.done = true
    this.options.onComplete?.()
    this.container.dispatchEvent(new CustomEvent('lineform:complete'))
  }

  play() {
    if (this.destroyed) return
    if (this.elapsed >= this.duration) {
      this.elapsed = 0
      this.done = false
    }
    if (this.motion.matches) {
      this.elapsed = this.duration
      this.playing = false
      this.paint()
      this.complete()
      return
    }
    this.playing = true
    this.last = null
    this.schedule()
  }

  pause() {
    this.playing = false
    cancelAnimationFrame(this.frame)
    this.frame = 0
    this.last = null
    this.paint()
  }

  setSpeed(speed) {
    if (Number.isFinite(speed) && speed > 0) this.speed = Math.min(4, speed)
  }

  destroy() {
    this.destroyed = true
    this.playing = false
    cancelAnimationFrame(this.frame)
    document.removeEventListener('visibilitychange', this.visibility)
    this.motion.removeEventListener('change', this.motionChanged)
    this.svg.remove()
  }
}

import imageManifest from '@/data/image-manifest.json'

type Entry = { width: number; height: number; variants: { width: number; path: string }[] }
const manifest: Record<string, Entry> = imageManifest
const base = import.meta.env.BASE_URL

/** Preserve a source fallback while allowing the browser to choose by size and DPR. */
export function imageAttrs(source: string, sizes: string) {
  const path = source.startsWith(base) ? source.slice(base.length) : source.replace(/^\//, '')
  const entry = manifest[path]
  if (!entry) return { src: source }
  const fallback = entry.variants.find(variant => variant.width >= 640) ?? entry.variants.at(-1)!
  return {
    src: `${base}${fallback.path}`,
    srcset: entry.variants.map(variant => `${base}${variant.path} ${variant.width}w`).join(', '),
    sizes,
    width: entry.width,
    height: entry.height
  }
}

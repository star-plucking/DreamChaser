"""Generate responsive WebP assets without altering originals. Requires Pillow."""
import json
import re
from pathlib import Path
from PIL import Image, ImageOps

resampling = getattr(Image, 'Resampling', Image)
root = Path(__file__).resolve().parents[1]
public = root / 'public'
sources = set((public / 'imgs/photo_wall').glob('*.webp'))
sources.update((public / 'imgs/robots/机器人2026抠图').glob('*.webp'))
team = (root / 'src/views/TeamView.vue').read_text()
sources.update(public / path for path in re.findall(r"withBase\('(imgs/[^']+)'\)", team))
manifest = {}
for source in sorted(sources):
    key = source.relative_to(public).as_posix()
    portrait = 'photo_wall' not in key and '/robots/' not in key
    widths = (96, 320, 640, 960) if portrait else (320, 640, 960, 1600)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGBA' if 'A' in original.getbands() else 'RGB')
        variants = []
        output_dir = public / 'imgs/optimized' / source.relative_to(public / 'imgs').parent
        if output_dir.exists():
            for old in output_dir.glob(f'{source.stem}-*.webp'):
                old.unlink()
        for width in sorted({min(width, image.width) for width in widths}):
            height = round(image.height * width / image.width)
            output = public / 'imgs/optimized' / source.relative_to(public / 'imgs').parent / f'{source.stem}-{width}.webp'
            output.parent.mkdir(parents=True, exist_ok=True)
            image.resize((width, height), resampling.LANCZOS).save(output, 'WEBP', quality=88, method=6)
            # Re-encoding an existing WebP must never make the download larger.
            if source.suffix.lower() == '.webp' and (width == image.width or output.stat().st_size >= source.stat().st_size):
                output.unlink()
                variants.append({'width': image.width, 'path': key})
                break
            variants.append({'width': width, 'path': output.relative_to(public).as_posix()})
        manifest[key] = {'width': image.width, 'height': image.height, 'variants': variants}
with Image.open(public / 'imgs/logo.png') as logo:
    logo.thumbnail((128, 128), resampling.LANCZOS)
    logo.save(public / 'imgs/optimized/logo.webp', 'WEBP', lossless=True, method=6)
    logo.thumbnail((32, 32), resampling.LANCZOS)
    logo.save(public / 'imgs/optimized/favicon.png', optimize=True)
(root / 'src/data/image-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'Generated responsive assets for {len(manifest)} images; originals retained.')

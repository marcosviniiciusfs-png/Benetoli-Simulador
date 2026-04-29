import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/benetoli-logo.png';
const OUT_DIR = 'public';

const EMBLEM = { left: 540, top: 100, width: 330, height: 330 };
const PADDING = 0.08;

await mkdir(OUT_DIR, { recursive: true });

const cropped = await sharp(SRC).extract(EMBLEM).toBuffer();

const padPx = Math.round(EMBLEM.width * PADDING);
const padded = await sharp(cropped)
  .extend({
    top: padPx, bottom: padPx, left: padPx, right: padPx,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .toBuffer();

const sizes = [
  { name: 'favicon.png', size: 256 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-16.png', size: 16 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(padded).resize(size, size, { fit: 'contain', background: '#fff' }).png().toFile(`${OUT_DIR}/${name}`);
}

console.log('Favicons gerados a partir do emblema circular.');

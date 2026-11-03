import sharp from 'sharp';
import fs from 'fs';

const HEADING_CROP = '/Users/isha/portfolio/public/assets/crop_heading.png';

async function extractFlourish() {
  const { data, info } = await sharp(HEADING_CROP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const out = new Uint8Array(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Check if pixel is white flourish line (not the thick bold letters of Portfolio)
    // Flourish lines are thin white lines: r > 180, g > 200, b > 230
    // We can isolate the flourish and the cursive loop
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 210) {
      out[idx] = 255;
      out[idx + 1] = 255;
      out[idx + 2] = 255;
      out[idx + 3] = Math.min(255, Math.round((brightness - 180) * 4));
    } else {
      out[idx + 3] = 0;
    }
  }

  const png = await sharp(out, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  fs.writeFileSync('/Users/isha/portfolio/public/assets/heading_flourish.png', png);
  console.log('Saved heading_flourish.png');
}

extractFlourish().catch(console.error);

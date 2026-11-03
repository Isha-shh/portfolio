import sharp from 'sharp';
import fs from 'fs';

const REF_IMG = '/Users/isha/portfolio/public/assets/reference.jpg';

async function generateBackground() {
  const { data, info } = await sharp(REF_IMG)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const out = new Uint8ClampedArray(data);

  // Helper to copy pixel from (sx, sy) to (dx, dy)
  function copyPixel(sx, sy, dx, dy) {
    const sIdx = (sy * width + sx) * 4;
    const dIdx = (dy * width + dx) * 4;
    out[dIdx] = data[sIdx];
    out[dIdx + 1] = data[sIdx + 1];
    out[dIdx + 2] = data[sIdx + 2];
    out[dIdx + 3] = 255;
  }

  // Windows bounding boxes to cover with background:
  // Projects window: [20, 285, 270, 195]
  // Clubs window: [300, 395, 280, 120]
  // Designs window: [750, 288, 255, 115]
  // Education window: [630, 410, 285, 105]

  // We can fill window areas with seamless vertical sky columns sampled from clear sky regions
  // Clear sky X regions: around x = 400..550 or 650..730
  function fillWindow(x1, y1, w, h, sampleX) {
    for (let y = y1; y < y1 + h; y++) {
      for (let x = x1; x < x1 + w; x++) {
        // Sample X with subtle jitter/offset to avoid repeating seams
        const sx = sampleX + ((x * 7 + y * 13) % 40) - 20;
        const clampedSx = Math.max(10, Math.min(width - 10, sx));
        copyPixel(clampedSx, y, x, y);
      }
    }
  }

  fillWindow(20, 288, 270, 190, 480);
  fillWindow(300, 395, 280, 120, 480);
  fillWindow(750, 288, 255, 115, 680);
  fillWindow(630, 410, 285, 105, 520);

  // Also remove the icons and labels from the background so they are solely rendered by interactive React components!
  // icon_about: [190, 55, 125, 75]
  fillWindow(190, 55, 125, 75, 480);
  // icon_projects: [115, 180, 130, 85]
  fillWindow(115, 180, 130, 85, 450);
  // icon_designs: [750, 45, 140, 95]
  fillWindow(750, 45, 140, 95, 680);
  // icon_education: [845, 170, 135, 105]
  fillWindow(845, 170, 135, 105, 680);
  // icon_clubs: [555, 295, 160, 95]
  fillWindow(555, 295, 160, 95, 480);
  // music player: [10, 500, 200, 65]
  // thanks signoff: [780, 510, 230, 55]

  const png = await sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 }
  })
  .png()
  .toBuffer();

  fs.writeFileSync('/Users/isha/portfolio/public/assets/clean_sky.png', png);
  console.log('Saved clean_sky.png');
}

generateBackground().catch(console.error);

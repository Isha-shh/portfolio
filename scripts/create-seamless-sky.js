import sharp from 'sharp';
import fs from 'fs';

const REF_IMG = '/Users/isha/portfolio/public/assets/reference.jpg';

async function createSeamlessSky() {
  const { data, info } = await sharp(REF_IMG)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const out = new Uint8ClampedArray(data);

  // We want to reconstruct the background so it's a complete, beautiful sky with clouds:
  // Central sky column: x = 500..530 has undisturbed pure sky gradient from y=40 to y=380.
  // We can interpolate the sky vertically:
  function getSkyColorAtY(y) {
    const sx = 510;
    const clampedY = Math.min(370, Math.max(45, y));
    const idx = (clampedY * width + sx) * 4;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  // Windows bounding boxes to cover with background:
  // Projects window: [15, 280, 275, 205]
  // Clubs window: [295, 390, 290, 125]
  // Designs window: [745, 280, 265, 125]
  // Education window: [625, 405, 295, 115]
  const windowBoxes = [
    { x1: 15, y1: 285, x2: 290, y2: 485, isLeft: true },
    { x1: 295, y1: 390, x2: 585, y2: 515, isCenter: true },
    { x1: 745, y1: 285, x2: 1010, y2: 410, isRight: true },
    { x1: 625, y1: 405, x2: 920, y2: 515, isRight: false }
  ];

  for (const box of windowBoxes) {
    for (let y = box.y1; y <= box.y2; y++) {
      for (let x = box.x1; x <= box.x2; x++) {
        const dIdx = (y * width + x) * 4;

        // Bottom cloud blend: as y approaches bottom (y > 450), clouds become more prominent
        const cloudFactor = Math.max(0, Math.min(1, (y - 450) / 70));
        
        // Sky base color
        const [sr, sg, sb] = getSkyColorAtY(y);

        // Add subtle pixel texture / dither
        const noise = ((x * 17 + y * 31) % 7) - 3;

        let r = sr + noise;
        let g = sg + noise;
        let b = sb + noise;

        // If near bottom, blend with bottom fluffy cloud color
        if (cloudFactor > 0) {
          const sampleY = Math.min(height - 5, y + 40);
          const sampleX = x;
          const sCloudIdx = (sampleY * width + sampleX) * 4;
          const cr = data[sCloudIdx];
          const cg = data[sCloudIdx + 1];
          const cb = data[sCloudIdx + 2];
          
          r = Math.round(r * (1 - cloudFactor) + cr * cloudFactor);
          g = Math.round(g * (1 - cloudFactor) + cg * cloudFactor);
          b = Math.round(b * (1 - cloudFactor) + cb * cloudFactor);
        }

        // If left edge of projects window, blend with left clouds
        if (box.isLeft && x < 120) {
          const leftCloudFactor = Math.max(0, (120 - x) / 100);
          const sIdx = (y * width + Math.max(0, x - 30)) * 4;
          const cr = data[sIdx];
          const cg = data[sIdx + 1];
          const cb = data[sIdx + 2];
          r = Math.round(r * (1 - leftCloudFactor) + cr * leftCloudFactor);
          g = Math.round(g * (1 - leftCloudFactor) + cg * leftCloudFactor);
          b = Math.round(b * (1 - leftCloudFactor) + cb * leftCloudFactor);
        }

        // If right edge of designs window, blend with right clouds
        if (box.isRight && x > 920) {
          const rightCloudFactor = Math.max(0, (x - 920) / 90);
          const sIdx = (y * width + Math.min(width - 1, x + 30)) * 4;
          const cr = data[sIdx];
          const cg = data[sIdx + 1];
          const cb = data[sIdx + 2];
          r = Math.round(r * (1 - rightCloudFactor) + cr * rightCloudFactor);
          g = Math.round(g * (1 - rightCloudFactor) + cg * rightCloudFactor);
          b = Math.round(b * (1 - rightCloudFactor) + cb * rightCloudFactor);
        }

        out[dIdx] = Math.max(0, Math.min(255, r));
        out[dIdx + 1] = Math.max(0, Math.min(255, g));
        out[dIdx + 2] = Math.max(0, Math.min(255, b));
        out[dIdx + 3] = 255;
      }
    }
  }

  const png = await sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 }
  })
  .png()
  .toBuffer();

  fs.writeFileSync('/Users/isha/portfolio/public/assets/sky_canvas.png', png);
  console.log('Saved sky_canvas.png');
}

createSeamlessSky().catch(console.error);

import sharp from 'sharp';
import fs from 'fs';

const width = 1024;
const height = 576;

async function generateAuthenticPixelSky() {
  const out = new Uint8ClampedArray(width * height * 4);

  // 1. Sky base gradient with retro canvas texture
  for (let y = 0; y < height; y++) {
    const t = y / height;
    // Gradient: top #67a6f7 to mid #579af6 to bottom #76aff8
    let r = 103 * (1 - t) + 118 * t;
    let g = 166 * (1 - t) + 175 * t;
    let b = 247 * (1 - t) + 248 * t;

    // Subtle mid dip
    if (t > 0.15 && t < 0.85) {
      const mid = Math.sin((t - 0.15) / 0.7 * Math.PI);
      r -= mid * 12;
      g -= mid * 8;
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      // Stippled canvas grain
      const grain = ((x * 19 + y * 31) % 9) - 4;
      out[idx] = Math.max(0, Math.min(255, Math.round(r + grain)));
      out[idx + 1] = Math.max(0, Math.min(255, Math.round(g + grain)));
      out[idx + 2] = Math.max(0, Math.min(255, Math.round(b + grain)));
      out[idx + 3] = 255;
    }
  }

  // Cloud circles list: [cx, cy, rx, ry]
  const clouds = [
    // Top-right cloud formation
    { cx: 960, cy: 120, rx: 90, ry: 50 },
    { cx: 910, cy: 140, rx: 65, ry: 40 },
    { cx: 990, cy: 160, rx: 70, ry: 45 },
    { cx: 870, cy: 165, rx: 45, ry: 30 },

    // Left-middle fluffy cloud formation
    { cx: 30, cy: 370, rx: 100, ry: 60 },
    { cx: 70, cy: 390, rx: 75, ry: 50 },
    { cx: 20, cy: 420, rx: 90, ry: 55 },
    { cx: 60, cy: 440, rx: 80, ry: 50 },
    { cx: 10, cy: 220, rx: 65, ry: 40 },
    { cx: 40, cy: 240, rx: 50, ry: 35 },
    { cx: 15, cy: 140, rx: 70, ry: 45 },

    // Bottom sweeping cloud formation
    { cx: 80, cy: 550, rx: 140, ry: 70 },
    { cx: 220, cy: 560, rx: 120, ry: 65 },
    { cx: 340, cy: 565, rx: 130, ry: 60 },
    { cx: 480, cy: 570, rx: 140, ry: 60 },
    { cx: 620, cy: 565, rx: 130, ry: 65 },
    { cx: 740, cy: 560, rx: 120, ry: 65 },
    { cx: 870, cy: 555, rx: 130, ry: 70 },
    { cx: 980, cy: 545, rx: 140, ry: 75 },

    // Bottom cloud puffs rising up
    { cx: 280, cy: 525, rx: 60, ry: 35 },
    { cx: 580, cy: 535, rx: 55, ry: 32 },
    { cx: 660, cy: 530, rx: 50, ry: 30 },
    { cx: 940, cy: 490, rx: 70, ry: 40 },
    { cx: 980, cy: 370, rx: 85, ry: 50 },
    { cx: 950, cy: 340, rx: 60, ry: 40 }
  ];

  // Draw clouds with stepped pixel shading
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let maxCloudDensity = 0;
      let topYFactor = 0;

      for (const c of clouds) {
        const dx = (x - c.cx) / c.rx;
        const dy = (y - c.cy) / c.ry;
        const distSq = dx * dx + dy * dy;
        if (distSq < 1.0) {
          const d = 1 - Math.sqrt(distSq);
          if (d > maxCloudDensity) {
            maxCloudDensity = d;
            topYFactor = -dy; // Top of cloud has positive topYFactor (highlight)
          }
        }
      }

      if (maxCloudDensity > 0) {
        const idx = (y * width + x) * 4;

        // Pixel stippling on cloud edge
        const dither = ((x * 17 + y * 23) % 13) / 13;
        const density = maxCloudDensity + (dither - 0.5) * 0.15;

        if (density > 0.08) {
          // Cloud colors:
          // Center highlight: #ffffff
          // Mid body: #f0f6fd
          // Shadow / base: #bed6f7
          // Rim / transition: #96c2f5
          let cr = 242, cg = 248, cb = 255; // White puff
          if (topYFactor > 0.2) {
            cr = 255; cg = 255; cb = 255; // Pure white highlight
          } else if (topYFactor < -0.3) {
            cr = 190; cg = 214; cb = 247; // Soft blue-periwinkle shadow
          }

          const alpha = Math.min(1, Math.max(0, density * 1.8));

          out[idx] = Math.round(out[idx] * (1 - alpha) + cr * alpha);
          out[idx + 1] = Math.round(out[idx + 1] * (1 - alpha) + cg * alpha);
          out[idx + 2] = Math.round(out[idx + 2] * (1 - alpha) + cb * alpha);
        }
      }
    }
  }

  const png = await sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 }
  })
  .png()
  .toBuffer();

  fs.writeFileSync('/Users/isha/portfolio/public/assets/sky_procedural.png', png);
  console.log('Saved sky_procedural.png');
}

generateAuthenticPixelSky().catch(console.error);

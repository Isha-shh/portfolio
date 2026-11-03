import sharp from 'sharp';
import fs from 'fs';

const REF_IMG = '/Users/isha/portfolio/public/assets/reference.jpg';

async function createPureSky() {
  const { data, info } = await sharp(REF_IMG)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const out = new Uint8ClampedArray(width * height * 4);

  // 1. Generate base sky gradient with authentic canvas noise
  for (let y = 0; y < height; y++) {
    // Vertical sky gradient matching the reference:
    // Top (y=0): #6aa6f7 (r: 106, g: 166, b: 247)
    // Mid (y=288): #5c9df6 (r: 92, g: 157, b: 246)
    // Bottom (y=576): #74adf8 (r: 116, g: 173, b: 248)
    const t = y / height;
    let baseR = 106 * (1 - t) + 116 * t;
    let baseG = 166 * (1 - t) + 173 * t;
    let baseB = 247 * (1 - t) + 248 * t;

    // Slight dip in brightness in the center
    if (t > 0.2 && t < 0.8) {
      const centerFactor = Math.sin((t - 0.2) / 0.6 * Math.PI);
      baseR -= centerFactor * 14;
      baseG -= centerFactor * 9;
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Authentic retro canvas grain & halftone texture
      const grain1 = ((x * 19 + y * 29) % 11) - 5;
      const grain2 = ((x * 37 + y * 13) % 7) - 3;
      const noise = grain1 + grain2;

      out[idx] = Math.max(0, Math.min(255, Math.round(baseR + noise)));
      out[idx + 1] = Math.max(0, Math.min(255, Math.round(baseG + noise)));
      out[idx + 2] = Math.max(0, Math.min(255, Math.round(baseB + noise)));
      out[idx + 3] = 255;
    }
  }

  // 2. Blend authentic cloud regions from REF_IMG along the perimeter
  // - Left clouds: x: 0..160, y: 38..576
  // - Bottom clouds: y: 460..576, all x
  // - Right clouds: x: 880..1024, y: 38..576
  // - Top right clouds: x: 820..1024, y: 38..220

  for (let y = 38; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Detect if pixel in reference is a cloud pixel:
      // Clouds are whitish/pale blue: r > 180, g > 200, b > 230, and high brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      // We only want clouds that are around the perimeter (not the windows or text)
      const isPerimeter = (
        (x < 135) || // Left clouds
        (x > 880) || // Right clouds
        (y > 510) || // Bottom clouds
        (x > 840 && y < 200) || // Top right clouds
        (x < 80 && y < 300) // Top left clouds
      );

      // Exclude windows, icons, music box, and thanks text
      const isInsideProjectsWindow = (x >= 18 && x <= 288 && y >= 280 && y <= 485);
      const isInsideDesignsWindow = (x >= 745 && x <= 1010 && y >= 280 && y <= 405);
      const isInsideEducationWindow = (x >= 620 && x <= 920 && y >= 400 && y <= 515);
      const isInsideEducationTag = (x >= 840 && x <= 990 && y >= 165 && y <= 275);
      const isInsideDesignsPencils = (x >= 750 && x <= 890 && y >= 45 && y <= 145);
      const isInsideMusicBox = (x >= 5 && x <= 215 && y >= 495 && y <= 570);
      const isInsideThanksText = (x >= 760 && y >= 505);

      const isExcluded = isInsideProjectsWindow ||
        isInsideDesignsWindow ||
        isInsideEducationWindow ||
        isInsideEducationTag ||
        isInsideDesignsPencils ||
        isInsideMusicBox ||
        isInsideThanksText;

      if (isPerimeter && !isExcluded && brightness > 175) {
        // Calculate cloud alpha based on brightness
        const cloudAlpha = Math.min(1, Math.max(0, (brightness - 170) / 60));
        out[idx] = Math.round(out[idx] * (1 - cloudAlpha) + r * cloudAlpha);
        out[idx + 1] = Math.round(out[idx + 1] * (1 - cloudAlpha) + g * cloudAlpha);
        out[idx + 2] = Math.round(out[idx + 2] * (1 - cloudAlpha) + b * cloudAlpha);
      }
    }
  }

  // Also in the music box area, synthesize soft bottom clouds so the music player sits on clouds
  for (let y = 500; y < height; y++) {
    for (let x = 0; x < 240; x++) {
      const idx = (y * width + x) * 4;
      // Soft cloud gradient
      const cloudAlpha = Math.min(0.85, Math.max(0, (y - 500) / 60));
      out[idx] = Math.round(out[idx] * (1 - cloudAlpha) + 240 * cloudAlpha);
      out[idx + 1] = Math.round(out[idx + 1] * (1 - cloudAlpha) + 245 * cloudAlpha);
      out[idx + 2] = Math.round(out[idx + 2] * (1 - cloudAlpha) + 255 * cloudAlpha);
    }
  }

  const png = await sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 }
  })
  .png()
  .toBuffer();

  fs.writeFileSync('/Users/isha/portfolio/public/assets/sky_pure.png', png);
  console.log('Saved sky_pure.png');
}

createPureSky().catch(console.error);

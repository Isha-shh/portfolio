import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const REF_IMG = '/Users/isha/.gemini/antigravity/brain/1fb3b3e5-42f7-4984-9268-054e279b77f6/.user_uploaded/media_1793646198989_83c3e4af.jpg';
const OUT_DIR = '/Users/isha/portfolio/public/assets';

// Icon definitions: crop area from the 1024x576 reference image
// [name, left, top, width, height]
const ICONS = [
  { name: 'icon_about', left: 195, top: 60, width: 60, height: 60 },
  { name: 'icon_projects', left: 124, top: 188, width: 72, height: 60 },
  { name: 'icon_designs', left: 765, top: 50, width: 62, height: 80 },
  { name: 'icon_education', left: 855, top: 178, width: 95, height: 78 },
  { name: 'icon_clubs', left: 565, top: 305, width: 70, height: 68 },
  // Window content icons
  { name: 'window_planet', left: 320, top: 440, width: 64, height: 55 },
  { name: 'card_shirt', left: 760, top: 325, width: 65, height: 70 },
  { name: 'card_lonelight', left: 838, top: 320, width: 72, height: 75 },
  { name: 'card_checkered', left: 922, top: 320, width: 72, height: 75 },
  { name: 'window_terminal', left: 38, top: 334, width: 48, height: 38 },
  { name: 'window_globe', left: 42, top: 405, width: 40, height: 40 },
  { name: 'newton_logo', left: 652, top: 457, width: 25, height: 25 }
];

async function removeSkyBackground(rawBuffer, width, height) {
  const imgData = new Uint8Array(rawBuffer);
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Corner (0,0) is definitely sky
  const skyR = imgData[0];
  const skyG = imgData[1];
  const skyB = imgData[2];

  function isSky(x, y) {
    const idx = (y * width + x) * 4;
    const r = imgData[idx];
    const g = imgData[idx + 1];
    const b = imgData[idx + 2];

    const dist = Math.hypot(r - skyR, g - skyG, b - skyB);
    // Dark outline has dist > 110 or very low brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness < 85) return false;

    return dist < 65;
  }

  // Seed with outer boundary pixels matching sky
  for (let x = 0; x < width; x++) {
    for (let y of [0, height - 1]) {
      const p = y * width + x;
      if (!visited[p] && isSky(x, y)) {
        visited[p] = 1;
        queue.push(p);
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x of [0, width - 1]) {
      const p = y * width + x;
      if (!visited[p] && isSky(x, y)) {
        visited[p] = 1;
        queue.push(p);
      }
    }
  }

  let head = 0;
  while (head < queue.length) {
    const p = queue[head++];
    const px = p % width;
    const py = Math.floor(p / width);

    const idx = p * 4;
    imgData[idx + 3] = 0; // Alpha 0

    const neighbors = [
      [px + 1, py],
      [px - 1, py],
      [px, py + 1],
      [px, py - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const np = ny * width + nx;
        if (!visited[np] && isSky(nx, ny)) {
          visited[np] = 1;
          queue.push(np);
        }
      }
    }
  }

  return imgData;
}

async function run() {
  for (const item of ICONS) {
    const crop = await sharp(REF_IMG)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let processed;
    if (item.name.startsWith('icon_') || item.name === 'window_planet') {
      const transparentData = await removeSkyBackground(crop.data, crop.info.width, crop.info.height);
      processed = await sharp(transparentData, {
        raw: {
          width: crop.info.width,
          height: crop.info.height,
          channels: 4
        }
      }).png().toBuffer();
    } else {
      // Just save high quality png for cards / window items
      processed = await sharp(REF_IMG)
        .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
        .png()
        .toBuffer();
    }

    const outPath = path.join(OUT_DIR, `${item.name}.png`);
    fs.writeFileSync(outPath, processed);
    console.log(`Saved ${outPath}`);
  }
}

run().catch(console.error);

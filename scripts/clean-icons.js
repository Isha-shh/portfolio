import sharp from 'sharp';
import fs from 'fs';

const REF_IMG = '/Users/isha/portfolio/public/assets/reference.jpg';

// Precise bounding boxes of JUST the illustrations (excluding the label pills, because labels are HTML)
const ICONS = [
  {
    name: 'icon_about_clean',
    left: 200,
    top: 60,
    width: 52,
    height: 52
  },
  {
    name: 'icon_projects_clean',
    left: 125,
    top: 188,
    width: 72,
    height: 58
  },
  {
    name: 'icon_designs_clean',
    left: 765,
    top: 52,
    width: 60,
    height: 75
  },
  {
    name: 'icon_education_clean',
    left: 856,
    top: 180,
    width: 95,
    height: 74
  },
  {
    name: 'icon_clubs_clean',
    left: 566,
    top: 306,
    width: 70,
    height: 64
  }
];

async function cleanIcons() {
  for (const item of ICONS) {
    const { data, info } = await sharp(REF_IMG)
      .extract({ left: item.left, top: item.top, width: item.width, height: item.height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const out = new Uint8Array(data);
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Sky color at top left corner
    const skyR = data[0];
    const skyG = data[1];
    const skyB = data[2];

    function isSky(x, y) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      // Dark border of the icon
      if (brightness < 80) return false;

      // Color distance to sky
      const dist = Math.hypot(r - skyR, g - skyG, b - skyB);
      return dist < 65;
    }

    // Seed borders
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

    while (queue.length > 0) {
      const p = queue.shift();
      const px = p % width;
      const py = Math.floor(p / width);

      out[p * 4 + 3] = 0; // Transparent

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

    const png = await sharp(out, {
      raw: { width, height, channels: 4 }
    }).png().toBuffer();

    fs.writeFileSync(`/Users/isha/portfolio/public/assets/${item.name}.png`, png);
    console.log(`Saved ${item.name}.png`);
  }
}

cleanIcons().catch(console.error);

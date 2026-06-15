/**
 * يُحوّل صورة عزل إيبوكسي داخل الخزان إلى WebP مضغوط مع أحجام responsive.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const src = path.join(root, "assets", "azl-epoxy-tank-interior-workers.png");
const outDir = path.join(root, "public", "images", "insulation");
const baseName = "azl-epoxy-tank-interior-workers";
const outMain = path.join(outDir, `${baseName}.webp`);

const targetW = 1024;
const targetH = 583;

fs.mkdirSync(outDir, { recursive: true });

for (let q = 82; q >= 58; q -= 4) {
  const buf = await sharp(src)
    .rotate()
    .resize(targetW, targetH, { fit: "cover", position: "centre" })
    .webp({ quality: q, effort: 6 })
    .toBuffer();
  if (buf.length <= 150 * 1024 || q === 58) {
    await fs.promises.writeFile(outMain, buf);
    console.log(`[build-azl-epoxy-tank-image] main ${(buf.length / 1024).toFixed(1)} KiB (q=${q})`);
    break;
  }
}

const widths = [640, 828, 1024];
for (const w of widths) {
  const h = Math.round((targetH / targetW) * w);
  const out = path.join(outDir, `${baseName}-${w}.webp`);
  await sharp(outMain).resize(w, h).webp({ quality: 78, effort: 5 }).toFile(out);
  console.log(
    `[build-azl-epoxy-tank-image] responsive ${w}px → ${(fs.statSync(out).size / 1024).toFixed(1)} KiB`,
  );
}

const meta = await sharp(outMain).metadata();
console.log(`[build-azl-epoxy-tank-image] done ${meta.width}x${meta.height}`);

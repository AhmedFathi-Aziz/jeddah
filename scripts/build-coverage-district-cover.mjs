/**
 * غلاف بطاقة حي — صورة الحي مع تدرج خفيف للقراءة.
 * الاستخدام: node scripts/build-coverage-district-cover.mjs as-safa
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slug = process.argv[2] ?? "as-safa";
const outW = 1200;
const outH = 675;

const sources = {
  "as-safa": path.join(
    root,
    "public",
    "images",
    "coverage",
    "jeddah",
    "as-safa-district-base.png",
  ),
  "al-naseem": path.join(
    root,
    "public",
    "images",
    "coverage",
    "jeddah",
    "al-naseem-district-base.png",
  ),
};

const srcPath = sources[slug];
if (!srcPath || !fs.existsSync(srcPath)) {
  console.error(`[build-coverage-district-cover] مصدر غير موجود لـ ${slug}`);
  process.exit(1);
}

const outDir = path.join(root, "public", "images", "coverage", "jeddah");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${slug}-district-cover.webp`);

const base = await sharp(srcPath)
  .resize(outW, outH, { fit: "cover", position: "centre" })
  .modulate({ brightness: 1.02, saturation: 1.05 })
  .toBuffer();

const gradientSvg = Buffer.from(
  `<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="55%" stop-color="rgba(0,0,0,0)"/>
        <stop offset="100%" stop-color="rgba(15,45,62,0.35)"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`,
);

await sharp(base)
  .composite([{ input: gradientSvg, top: 0, left: 0 }])
  .webp({ quality: 82, effort: 4 })
  .toFile(outPath);

const stat = fs.statSync(outPath);
console.log(`[build-coverage-district-cover] ${outPath} (${Math.round(stat.size / 1024)}KB)`);

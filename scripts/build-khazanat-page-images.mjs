/**
 * يُنشئ صور WebP لصفحة كشف تسربات الخزانات بجدة:
 * - hero: شعار العلامة فقط على خلفية بيضاء (<300KB)
 * - صورة محتوى ميدانية (<150KB عند الإمكان)
 * - أحجام responsive للـ hero
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagesDir = path.join(root, "public", "images", "pages");

const srcDirName = fs.readdirSync(pagesDir).find((d) => d.includes("خزانات"));
if (!srcDirName) {
  console.error("[build-khazanat-page-images] لم يُعثر على مجلد المصدر.");
  process.exit(1);
}

const srcDir = path.join(pagesDir, srcDirName);
const srcPng = path.join(
  srcDir,
  fs.readdirSync(srcDir).find((f) => /\.png$/i.test(f)) ?? "",
);
if (!fs.existsSync(srcPng)) {
  console.error("[build-khazanat-page-images] لم يُعثر على PNG المصدر.");
  process.exit(1);
}

const outDir = path.join(pagesDir, "kashf-tasribat-al-khazanat-jeddah");
fs.mkdirSync(outDir, { recursive: true });

const heroW = 1536;
const heroH = 1024;
const fieldW = 1024;
const fieldH = 1536;

const logoPath = path.join(root, "public", "brand-logo.png");
const logoMaxW = Math.round(heroW * 0.62);
const logoBuf = await sharp(logoPath)
  .resize({ width: logoMaxW, withoutEnlargement: true })
  .ensureAlpha()
  .toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const logoW = logoMeta.width ?? logoMaxW;
const logoH = logoMeta.height ?? 400;

/** خلفية بيضاء نقية + شعار في المنتصف */
const heroWhiteBase = await sharp({
  create: {
    width: heroW,
    height: heroH,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .jpeg()
  .toBuffer();

const heroOut = path.join(outDir, "kashf-tasribat-al-khazanat-jeddah-hero.webp");
for (let q = 82; q >= 58; q -= 4) {
  const buf = await sharp(heroWhiteBase)
    .composite([
      {
        input: logoBuf,
        top: Math.round((heroH - logoH) / 2),
        left: Math.round((heroW - logoW) / 2),
      },
    ])
    .webp({ quality: q, effort: 6 })
    .toBuffer();
  if (buf.length <= 300 * 1024 || q === 58) {
    await fs.promises.writeFile(heroOut, buf);
    console.log(`[build-khazanat-page-images] hero (logo/white) ${(buf.length / 1024).toFixed(1)} KiB (q=${q})`);
    break;
  }
}

const fieldOut = path.join(outDir, "kashf-tasribat-al-khazanat-jeddah-field-service.webp");
for (let q = 78; q >= 56; q -= 4) {
  const buf = await sharp(srcPng)
    .rotate()
    .resize(fieldW, fieldH, { fit: "cover", position: "centre" })
    .webp({ quality: q, effort: 6 })
    .toBuffer();
  if (buf.length <= 150 * 1024 || q === 56) {
    await fs.promises.writeFile(fieldOut, buf);
    console.log(`[build-khazanat-page-images] field ${(buf.length / 1024).toFixed(1)} KiB (q=${q})`);
    break;
  }
}

const widths = [640, 828, 1080, 1280, 1536];
for (const w of widths) {
  const h = Math.round((heroH / heroW) * w);
  const out = path.join(outDir, `kashf-tasribat-al-khazanat-jeddah-hero-${w}.webp`);
  await sharp(heroOut).resize(w, h).webp({ quality: 78, effort: 5 }).toFile(out);
  console.log(
    `[build-khazanat-page-images] responsive ${w}px → ${(fs.statSync(out).size / 1024).toFixed(1)} KiB`,
  );
}

const heroMeta = await sharp(heroOut).metadata();
const fieldMeta = await sharp(fieldOut).metadata();
console.log(
  `[build-khazanat-page-images] done hero=${heroMeta.width}x${heroMeta.height} field=${fieldMeta.width}x${fieldMeta.height}`,
);

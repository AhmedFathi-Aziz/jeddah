/**
 * غلاف صفحة عزل إيبوكسي بجدة: مشهد واقعي من داخل الخزان + شعار العلامة.
 * hero <300KB، أحجام responsive.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const heroW = 1536;
const heroH = 1024;

const bgSrc = path.join(root, "public", "images", "insulation", "azl-epoxy-tank-interior-workers.webp");
const logoPath = path.join(root, "public", "brand-logo.png");
const outDir = path.join(root, "public", "images", "pages", "azl-epoxy-jeddah");
fs.mkdirSync(outDir, { recursive: true });

const bg = await sharp(bgSrc)
  .resize(heroW, heroH, { fit: "cover", position: "centre" })
  .toBuffer();

const overlay = await sharp({
  create: {
    width: heroW,
    height: heroH,
    channels: 4,
    background: { r: 15, g: 45, b: 66, alpha: 0.22 },
  },
})
  .png()
  .toBuffer();

const logoMaxW = Math.round(heroW * 0.36);
const logoBuf = await sharp(logoPath)
  .resize({ width: logoMaxW, withoutEnlargement: true })
  .ensureAlpha()
  .toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const logoW = logoMeta.width ?? logoMaxW;
const logoH = logoMeta.height ?? 320;

const padX = 56;
const padY = 44;
const panelW = logoW + padX * 2;
const panelH = logoH + padY * 2;
const panelLeft = Math.round((heroW - panelW) / 2);
const panelTop = Math.round((heroH - panelH) / 2);

const whitePanel = await sharp({
  create: {
    width: panelW,
    height: panelH,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 0.94 },
  },
})
  .png()
  .toBuffer();

const heroOut = path.join(outDir, "azl-epoxy-jeddah-hero.webp");

for (let q = 84; q >= 58; q -= 4) {
  const buf = await sharp(bg)
    .composite([
      { input: overlay, blend: "over" },
      { input: whitePanel, top: panelTop, left: panelLeft },
      { input: logoBuf, top: panelTop + padY, left: panelLeft + padX },
    ])
    .webp({ quality: q, effort: 6 })
    .toBuffer();
  if (buf.length <= 300 * 1024 || q === 58) {
    await fs.promises.writeFile(heroOut, buf);
    console.log(`[build-azl-epoxy-hero] hero ${(buf.length / 1024).toFixed(1)} KiB (q=${q})`);
    break;
  }
}

const widths = [640, 828, 1080, 1280, 1536];
for (const w of widths) {
  const h = Math.round((heroH / heroW) * w);
  const out = path.join(outDir, `azl-epoxy-jeddah-hero-${w}.webp`);
  await sharp(heroOut).resize(w, h).webp({ quality: 78, effort: 5 }).toFile(out);
  console.log(`[build-azl-epoxy-hero] ${w}px → ${(fs.statSync(out).size / 1024).toFixed(1)} KiB`);
}

const meta = await sharp(heroOut).metadata();
console.log(`[build-azl-epoxy-hero] done ${meta.width}x${meta.height}`);

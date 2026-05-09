/**
 * يجعل بكسل الخلفية السوداء/القريبة منها شفافة (PNG).
 * يعالج `logo-mark.png` (شعار الهيدر) ويُحدّث `app/icon.png`.
 * إن وُجد `brand-logo.png` يُعالج أيضاً بدون تغيير الأيقونة مرتين.
 * شغّل: node scripts/remove-logo-black-bg.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const ICON_OUT = path.join(ROOT, "app", "icon.png");

const BG_THRESHOLD = 52;

async function knockoutToFile(inputPath, tmpSuffix) {
  const OUT_TMP = inputPath.replace(/\.png$/i, `.${tmpSuffix}.png`);

  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (r <= BG_THRESHOLD && g <= BG_THRESHOLD && b <= BG_THRESHOLD) {
      px[i + 3] = 0;
    }
  }

  await sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(OUT_TMP);

  fs.renameSync(OUT_TMP, inputPath);
}

async function writeIconFrom(srcPng) {
  await sharp(srcPng)
    .resize(256, 256, {
      fit: "contain",
      position: "center",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(ICON_OUT);
}

async function main() {
  const logoMark = path.join(ROOT, "public", "logo-mark.png");
  const brandBanner = path.join(ROOT, "public", "brand-logo.png");

  if (fs.existsSync(logoMark)) {
    await knockoutToFile(logoMark, "processed");
    await writeIconFrom(logoMark);
    console.log("OK:", logoMark, ICON_OUT);
  }

  if (fs.existsSync(brandBanner)) {
    await knockoutToFile(brandBanner, "processed");
    console.log("OK:", brandBanner);
  }

  if (!fs.existsSync(logoMark) && !fs.existsSync(brandBanner)) {
    console.error("Missing public/logo-mark.png or public/brand-logo.png");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

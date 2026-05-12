/**
 * يحوّل صور ‎PNG/JPEG‎ تحت ‎public/images‎ إلى ‎WebP‎ (‎sharp‎) للبناء الثابت (‎output: 'export'‎)
 * حيث لا يعمل ‎next/image‎ للتحسين التلقائي.
 *
 *   node scripts/optimize-public-images.mjs
 *   node scripts/optimize-public-images.mjs --delete-originals
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imagesRoot = path.join(root, "public", "images");

const deleteOriginals = process.argv.includes("--delete-originals");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(png|jpe?g)$/i.test(name)) files.push(p);
  }
  return files;
}

async function main() {
  const inputs = walk(imagesRoot);
  if (!inputs.length) {
    console.log("[optimize-public-images] لا توجد ملفات للمعالجة.");
    return;
  }

  for (const input of inputs) {
    const dir = path.dirname(input);
    const base = path.basename(input, path.extname(input));
    const outPath = path.join(dir, `${base}.webp`);

    await sharp(input)
      .webp({ quality: 82, effort: 5 })
      .toFile(outPath);

    const inStat = fs.statSync(input);
    const outStat = fs.statSync(outPath);
    console.log(
      `[optimize-public-images] ${path.relative(root, input)} → ${path.relative(root, outPath)} (${(inStat.size / 1024).toFixed(1)} KiB → ${(outStat.size / 1024).toFixed(1)} KiB)`,
    );

    if (deleteOriginals && input !== outPath) {
      try {
        fs.unlinkSync(input);
        console.log(`[optimize-public-images] حُذف الأصلي: ${path.relative(root, input)}`);
      } catch (e) {
        console.warn(
          `[optimize-public-images] تعذّر حذف ${path.relative(root, input)}: ${e?.message ?? e} — احذف الملف يدوياً إن لزم.`,
        );
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

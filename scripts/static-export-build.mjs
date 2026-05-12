/**
 * بناء موقع ثابت بالكامل ‎(output: 'export')‎.
 * يُنقل مؤقتاً ما لا يدعمه التصدير الثابت (Route Handlers، لوحة الإدارة، middleware)
 * ثم يُشغَّل ‎next build‎ مع ‎TASARUBAT_STATIC_EXPORT=1‎ ثم يُعاد كل شيء.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const stashDir = path.join(root, "_export_stash");

/** [مسار نسبي من جذر المشروع, اسم داخل الـ stash] */
const TO_STASH = [
  ["app/api", "app-api"],
  ["app/media", "app-media"],
  ["app/admin", "app-admin"],
  ["middleware.ts", "middleware.ts"],
];

function stashPath(name) {
  return path.join(stashDir, name);
}

function moveToStash() {
  fs.mkdirSync(stashDir, { recursive: true });
  for (const [rel, stashName] of TO_STASH) {
    const src = path.join(root, rel);
    const dst = stashPath(stashName);
    if (!fs.existsSync(src)) continue;
    if (fs.existsSync(dst)) fs.rmSync(dst, { recursive: true, force: true });
    try {
      fs.renameSync(src, dst);
    } catch {
      fs.cpSync(src, dst, { recursive: true });
      fs.rmSync(src, { recursive: true, force: true });
    }
  }
}

function restoreFromStash() {
  for (const [rel, stashName] of TO_STASH) {
    const src = path.join(root, rel);
    const dst = stashPath(stashName);
    if (!fs.existsSync(dst)) continue;
    if (fs.existsSync(src)) fs.rmSync(src, { recursive: true, force: true });
    try {
      fs.renameSync(dst, src);
    } catch {
      fs.cpSync(dst, src, { recursive: true });
      fs.rmSync(dst, { recursive: true, force: true });
    }
  }
  try {
    if (fs.existsSync(stashDir)) {
      const left = fs.readdirSync(stashDir);
      if (left.length === 0) fs.rmdirSync(stashDir);
    }
  } catch {
    /* ignore */
  }
}

function runSyncRedirects() {
  const isWin = process.platform === "win32";
  const r = spawnSync(isWin ? "node.exe" : "node", [path.join(__dirname, "sync-pages-redirects.mjs")], {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });
  if (r.status !== 0) {
    throw new Error(`sync-pages-redirects exited with ${r.status}`);
  }
}

/**
 * بروتوكول IndexNow: يجب أن يكون ملف المفتاح متاحاً على نفس النطاق (مثل ‎/{key}.txt‎).
 * يُكتَب من ‎INDEXNOW_KEY‎ عند البناء حتى يُصدَّر مع ‎out‎ دون الاعتماد على قاعدة بيانات.
 */
function ensureIndexNowPublicKeyFile() {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) return;
  if (!/^[a-f0-9]{8,128}$/i.test(key)) {
    console.warn(
      "[static-export-build] INDEXNOW_KEY غير صالح (استخدم 8–128 حرفاً hex: 0-9 a-f). تُتخطى كتابة ملف المفتاح.",
    );
    return;
  }
  const publicDir = path.join(root, "public");
  const keyFile = path.join(publicDir, `${key}.txt`);
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(keyFile, key, "utf8");
  console.log(`[static-export-build] IndexNow: تم إنشاء ${path.relative(root, keyFile)}`);
}

let stashed = false;
let exitCode = 1;
try {
  moveToStash();
  stashed = true;
  runSyncRedirects();
  ensureIndexNowPublicKeyFile();

  const env = {
    ...process.env,
    TASARUBAT_STATIC_EXPORT: "1",
    NODE_ENV: "production",
  };

  const isWin = process.platform === "win32";
  const result = spawnSync(isWin ? "npx.cmd" : "npx", ["next", "build"], {
    cwd: root,
    env,
    stdio: "inherit",
    shell: isWin,
  });

  exitCode = result.status === 0 ? 0 : result.status ?? 1;
} catch (e) {
  console.error(e);
  exitCode = 1;
} finally {
  if (stashed) restoreFromStash();
}

process.exit(exitCode);

/**
 * بعد ‎npm run build:static‎ — رفع مجلد ‎out‎ إلى Cloudflare Pages.
 * اسم المشروع: ‎CF_PAGES_PROJECT_NAME‎ أو الافتراضي ‎tasarubat‎.
 *
 * عند تعيين ‎INDEXNOW_KEY‎: بعد نجاح الرفع يُستدعى ‎indexnow-notify.mjs‎ لإبلاغ Bing/IndexNow
 * بكل عناوين ‎out/sitemap.xml‎ (ما لم تُعطّل عبر حذف المفتاح من البيئة).
 * ‎INDEXNOW_STRICT=1‎ → يفشل النشر إن فشل إشعار IndexNow.
 * ‎INDEXNOW_SKIP_POST_DEPLOY=1‎ → لا يُستدعى الإشعار بعد الرفع حتى مع وجود المفتاح.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const project = (process.env.CF_PAGES_PROJECT_NAME || "tasarubat").trim();
const isWin = process.platform === "win32";
const r = spawnSync(isWin ? "npx.cmd" : "npx", ["wrangler", "pages", "deploy", "out", `--project-name=${project}`], {
  stdio: "inherit",
  shell: isWin,
  env: process.env,
  cwd: root,
});

if (r.status !== 0) {
  process.exit(r.status ?? 1);
}

const indexNowKey = process.env.INDEXNOW_KEY?.trim();
if (!indexNowKey || process.env.INDEXNOW_SKIP_POST_DEPLOY === "1") {
  if (indexNowKey && process.env.INDEXNOW_SKIP_POST_DEPLOY === "1") {
    console.log("[pages-deploy] IndexNow: تخطّي الإشعار (INDEXNOW_SKIP_POST_DEPLOY=1).");
  }
  process.exit(0);
}

console.log("[pages-deploy] IndexNow: إرسال عناوين من out/sitemap.xml …");
const nodeBin = isWin ? "node.exe" : "node";
const r2 = spawnSync(nodeBin, [path.join(__dirname, "indexnow-notify.mjs"), "--from-sitemap"], {
  cwd: root,
  stdio: "inherit",
  shell: false,
  env: process.env,
});

if (r2.status !== 0) {
  if (process.env.INDEXNOW_STRICT === "1") {
    console.error("[pages-deploy] فشل IndexNow و INDEXNOW_STRICT=1 — إنهاء برمز خطأ.");
    process.exit(r2.status ?? 1);
  }
  console.warn(
    "[pages-deploy] تحذير: فشل IndexNow ولم يُعطل النشر. راجع السجل أو عيّن INDEXNOW_STRICT=1 لإيقاف النشر عند الفشل.",
  );
}

process.exit(0);

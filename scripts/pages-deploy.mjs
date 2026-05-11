/**
 * بعد ‎npm run build:static‎ — رفع مجلد ‎out‎ إلى Cloudflare Pages.
 * اسم المشروع: ‎CF_PAGES_PROJECT_NAME‎ أو الافتراضي ‎tasarubat‎.
 */
import { spawnSync } from "node:child_process";
import process from "node:process";

const project = (process.env.CF_PAGES_PROJECT_NAME || "tasarubat").trim();
const isWin = process.platform === "win32";
const r = spawnSync(isWin ? "npx.cmd" : "npx", ["wrangler", "pages", "deploy", "out", `--project-name=${project}`], {
  stdio: "inherit",
  shell: isWin,
  env: process.env,
});

process.exit(r.status === 0 ? 0 : r.status ?? 1);

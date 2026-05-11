/**
 * 1) بناء OpenNext في ‎opennext-staging/‎ (يتفادى قفل ‎.open-next‎ في الجذر على ويندوز).
 * 2) ‎wrangler deploy -c wrangler.cf.build.json‎ مع ‎OPEN_NEXT_DEPLOY=true‎ حتى لا يعيد Wrangler استدعاء ‎opennextjs-cloudflare deploy‎.
 *
 * عند تعديل ‎wrangler.jsonc‎ حدّث ‎wrangler.cf.build.json‎ (نفس القيم عدا ‎main‎ و‎assets‎).
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const { exportD1BlogSlugs } = require("./export-d1-blog-slugs.cjs");

const root = path.join(__dirname, "..");
const STAGING_NAME = "opennext-staging";

const env = {
  ...process.env,
  OPEN_NEXT_BUILD_OUTPUT: STAGING_NAME,
  OPEN_NEXT_DEPLOY: "true",
};

/**
 * عندما يكون ‎buildOutputPath‎ ليس ‎.‎ يضع OpenNext الحزمة تحت ‎default/<اسم_المجلد>/‎
 * بينما ‎worker.js‎ يستورد ‎./server-functions/default/handler.mjs‎ — نرفع الملفات مستوى واحد.
 */
function flattenDefaultServerBundle() {
  const nested = path.join(
    root,
    STAGING_NAME,
    ".open-next",
    "server-functions",
    "default",
    STAGING_NAME,
  );
  const parent = path.join(root, STAGING_NAME, ".open-next", "server-functions", "default");
  if (!fs.existsSync(nested)) return;

  for (const name of fs.readdirSync(nested)) {
    const from = path.join(nested, name);
    const to = path.join(parent, name);
    try {
      fs.rmSync(to, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
    fs.renameSync(from, to);
  }
  fs.rmSync(nested, { recursive: true, force: true });
}

try {
  exportD1BlogSlugs(root);
} catch (e) {
  console.warn(
    "[deploy-cf] تعذّر تصدير slugs من D1 (تأكد من wrangler login). يُستمر بالبناء:",
    e?.message ?? e,
  );
}

execSync("npx opennextjs-cloudflare build", { cwd: root, stdio: "inherit", env });

flattenDefaultServerBundle();

execSync("npx wrangler deploy -c wrangler.cf.build.json", {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env,
});

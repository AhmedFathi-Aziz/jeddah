/**
 * إشعار محركات البحث المشاركة في ‎IndexNow‎ (مثل Bing) بعناوين URL محدّثة بعد النشر.
 *
 * المتطلبات:
 * - ملف المفتاح منشور على الموقع: ‎https://{host}/{INDEXNOW_KEY}.txt‎ (نفس محتوى المفتاح نصاً).
 *   يُنشأ تلقائياً عند البناء إذا وُضع ‎INDEXNOW_KEY‎ في البيئة (انظر ‎static-export-build.mjs‎).
 * - ‎NEXT_PUBLIC_SITE_URL‎ أو ‎SITE_URL‎ يطابقان النطاق المنشور.
 *
 * الاستخدام:
 *   node scripts/indexnow-notify.mjs https://example.com/blog/foo
 *   node scripts/indexnow-notify.mjs --from-sitemap
 *
 * أو عبر المتغيرات:
 *   INDEXNOW_URLS=https://a.com/,https://a.com/blog/x
 *   INDEXNOW_FROM_SITEMAP=1   (يقرأ ‎out/sitemap.xml‎ بعد ‎next build‎)
 *
 * اختياري:
 *   INDEXNOW_KEY_LOCATION=... (رابط مطلق لملف المفتاح؛ الافتراضي ‎{SITE}/{KEY}.txt‎)
 *   INDEXNOW_HOST=example.com (إن خالٍ يُستمد من ‎keyLocation‎)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEXNOW_API = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

function loadOptionalEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function resolveSiteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "";
  if (!raw) return "";
  const candidate =
    raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(candidate).href.replace(/\/$/, "");
  } catch {
    return "";
  }
}

function parseUrlsFromSitemapXml(xml) {
  const urls = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const u = m[1]?.trim();
    if (u) urls.push(u);
  }
  return urls;
}

function collectUrls({ fromSitemapFlag }) {
  const cliUrls = process.argv.slice(2).filter((a) => a.startsWith("http://") || a.startsWith("https://"));
  if (cliUrls.length) return cliUrls;

  const envList = process.env.INDEXNOW_URLS?.trim();
  if (envList) {
    return envList
      .split(",")
      .map((u) => u.trim())
      .filter((u) => u.startsWith("http://") || u.startsWith("https://"));
  }

  const fromEnv = process.env.INDEXNOW_FROM_SITEMAP === "1";
  if (fromSitemapFlag || fromEnv) {
    const sitemapPath = path.join(ROOT, "out", "sitemap.xml");
    if (!fs.existsSync(sitemapPath)) {
      throw new Error(`لم يُعثر على ${path.relative(ROOT, sitemapPath)} — نفّذ البناء الثابت أولاً.`);
    }
    const xml = fs.readFileSync(sitemapPath, "utf8");
    const urls = parseUrlsFromSitemapXml(xml);
    if (!urls.length) throw new Error("خريطة الموقع لا تحتوي على أي <loc>.");
    return urls;
  }

  return [];
}

function resolveKeyAndLocation(base) {
  const explicitKey = process.env.INDEXNOW_KEY?.trim();
  const explicitLocation = process.env.INDEXNOW_KEY_LOCATION?.trim();

  let key = explicitKey;
  if (!key) {
    throw new Error("حدّد INDEXNOW_KEY (hex 8–128) أو مرّره عبر البيئة قبل الإشعار.");
  }
  if (!/^[a-f0-9]{8,128}$/i.test(key)) {
    throw new Error("INDEXNOW_KEY يجب أن يكون hex بطول 8–128 (أحرف 0-9 a-f).");
  }

  let keyLocation = explicitLocation;
  if (!keyLocation) {
    if (!base) throw new Error("حدّد NEXT_PUBLIC_SITE_URL أو SITE_URL لاشتقاق keyLocation.");
    keyLocation = `${base}/${key}.txt`;
  }

  return { key, keyLocation };
}

function resolveHost(urlList, keyLocation, explicitHost) {
  if (explicitHost?.trim()) return explicitHost.trim().toLowerCase();
  try {
    return new URL(keyLocation).hostname.toLowerCase();
  } catch {
    /* fall through */
  }
  if (urlList[0]) {
    try {
      return new URL(urlList[0]).hostname.toLowerCase();
    } catch {
      /* ignore */
    }
  }
  throw new Error("تعذّر تحديد host — عيّن INDEXNOW_HOST أو صحّح SITE_URL.");
}

function sameHost(url, host) {
  try {
    return new URL(url).hostname.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

async function postIndexNowBatch(host, key, keyLocation, urlList) {
  const body = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  });
  const res = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text: text.slice(0, 500) };
}

async function main() {
  loadOptionalEnvLocal();

  const fromSitemapFlag = process.argv.includes("--from-sitemap");
  const urls = collectUrls({ fromSitemapFlag });
  const uniqueUrls = [...new Set(urls)];
  if (!uniqueUrls.length) {
    console.error(`
IndexNow — استخدام:
  node scripts/indexnow-notify.mjs <url1> <url2> ...
  node scripts/indexnow-notify.mjs --from-sitemap

أو: INDEXNOW_URLS=https://... ,https://...
أو: INDEXNOW_FROM_SITEMAP=1  (يتطلب out/sitemap.xml)
`);
    process.exit(1);
  }

  const base = resolveSiteBase();
  const { key, keyLocation } = resolveKeyAndLocation(base);
  const host = resolveHost(uniqueUrls, keyLocation, process.env.INDEXNOW_HOST);

  let keyHost;
  try {
    keyHost = new URL(keyLocation).hostname.toLowerCase();
  } catch {
    throw new Error("INDEXNOW_KEY_LOCATION ليس URLاً صالحاً.");
  }
  if (keyHost !== host.toLowerCase()) {
    throw new Error(`host المشتق (${host}) لا يطابق نطاق ملف المفتاح (${keyHost}). صحّح SITE_URL أو INDEXNOW_KEY_LOCATION.`);
  }

  const filtered = uniqueUrls.filter((u) => sameHost(u, host));
  if (filtered.length !== uniqueUrls.length) {
    console.warn(
      `[indexnow-notify] تم حذف ${uniqueUrls.length - filtered.length} رابطاً لا يطابق host «${host}» (IndexNow يتطلب نفس النطاق).`,
    );
  }
  if (!filtered.length) {
    throw new Error("لا توجد عناوين تطابق host المفتاح.");
  }

  for (let i = 0; i < filtered.length; i += MAX_URLS_PER_REQUEST) {
    const chunk = filtered.slice(i, i + MAX_URLS_PER_REQUEST);
    const { ok, status, text } = await postIndexNowBatch(host, key, keyLocation, chunk);
    if (ok) {
      console.log(`[indexnow-notify] OK ${status} — أُرسل ${chunk.length} رابطاً (دفعة ${i / MAX_URLS_PER_REQUEST + 1}).`);
    } else {
      console.error(`[indexnow-notify] FAIL ${status}`, text);
      process.exit(1);
    }
  }
}

main().catch((e) => {
  console.error(e?.message ?? e);
  process.exit(1);
});

/**
 * يولّد ‎public/_redirects‎ لـ Cloudflare Pages (نفس منطق ‎legacyCoverageRedirects‎ في ‎next.config.mjs‎
 * الذي لا يُطبَّق مع ‎output: 'export'‎).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "data", "coverage-locations.json");
const blogRedirectsPath = path.join(root, "data", "blog-slug-redirects.json");
const outPath = path.join(root, "public", "_redirects");

/** نفس القائمة في ‎next.config.mjs › legacyCoverageRedirects()‎ */
const LEGACY_SERVICE_REDIRECTS = [
  ["/kashf-tasribat-miah-jeddah", "/services/kashf-tasribat-miah-jeddah"],
  ["/kashf-tasribat-bedun-taksir-jeddah", "/services/kashf-tasribat-bedun-taksir-jeddah"],
  ["/kashf-tasribat-al-khazanat-jeddah", "/services/kashf-tasribat-al-khazanat-jeddah"],
  ["/kashf-tasribat-al-masabih-jeddah", "/services/kashf-tasribat-al-masabih-jeddah"],
  ["/kashf-tasribat-miah-al-takyeef-jeddah", "/services/kashf-tasribat-miah-al-takyeef-jeddah"],
  ["/azl-ashtof-jeddah", "/services/azl-ashtof-jeddah"],
  ["/azl-maei-jeddah", "/services/azl-maei-jeddah"],
  ["/azl-harari-jeddah", "/services/azl-harari-jeddah"],
  ["/azl-khazanat-jeddah", "/services/azl-khazanat-jeddah"],
  ["/azl-fom-jeddah", "/services/azl-fom-jeddah"],
  ["/azl-hamamat-jeddah", "/services/azl-hamamat-jeddah"],
  ["/azl-epoxy-jeddah", "/services/azl-epoxy-jeddah"],
];

/** إنforcement HTTPS + apex على Cloudflare Pages (middleware غير متاح في التصدير الثابت). */
const HOST_CANONICAL_REDIRECTS = [
  "https://www.tasarubat-jeddah.com/*  https://tasarubat-jeddah.com/:splat  301",
  "http://tasarubat-jeddah.com/*  https://tasarubat-jeddah.com/:splat  301",
  "http://www.tasarubat-jeddah.com/*  https://tasarubat-jeddah.com/:splat  301",
];

function blogRedirectLines() {
  try {
    const raw = fs.readFileSync(blogRedirectsPath, "utf8");
    const data = JSON.parse(raw);
    const rows = data.redirects ?? [];
    const lines = [];
    const seen = new Set();
    for (const { source, destination } of rows) {
      if (!source || !destination) continue;
      const key = `${source}\t${destination}`;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(`${source}  ${destination}  301`);
      const trimmed = source.replace(/\/$/, "");
      if (trimmed !== source && !seen.has(`${trimmed}\t${destination}`)) {
        seen.add(`${trimmed}\t${destination}`);
        lines.push(`${trimmed}  ${destination}  301`);
      }
    }
    return lines;
  } catch (e) {
    console.warn("[sync-pages-redirects] تعذّر قراءة blog-slug-redirects.json:", e?.message ?? e);
    return [];
  }
}

let lines = [
  ...HOST_CANONICAL_REDIRECTS,
  ...LEGACY_SERVICE_REDIRECTS.map(([from, to]) => `${from}  ${to}  301`),
  ...blogRedirectLines(),
];
try {
  const raw = fs.readFileSync(dataPath, "utf8");
  const data = JSON.parse(raw);
  const jeddah = data.cities?.find((c) => c.slug === "jeddah");
  if (jeddah?.districts?.length) {
    lines.push(...jeddah.districts.map((d) => `/coverage/${d.slug}  /coverage/jeddah/${d.slug}  301`));
  }
} catch (e) {
  console.warn("[sync-pages-redirects] تعذّر قراءة coverage-locations.json:", e?.message ?? e);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.length ? `${lines.join("\n")}\n` : "", "utf8");
console.log(`[sync-pages-redirects] wrote ${lines.length} rules to public/_redirects`);

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
const outPath = path.join(root, "public", "_redirects");

let lines = ["/kashf-tasribat-miah-jeddah  /services/kashf-tasribat-miah-jeddah  301"];
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

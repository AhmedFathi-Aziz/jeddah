/**
 * يزيل عبارات «دليل SEO» والتعليقات الظاهرة من مقالات المدونة.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const SEO_PREFIX = /دليل\s*SEO\s*متخصص\s*:\s*/gi;
const SEO_BOILER = /\s*[—–-]\s*نصائح\s*عملية\s*،?\s*ربط\s*داخلي\s*،?\s*وخطوات\s*واضحة\s*لـ[^\n.]+[.]?/gi;
const SEO_TITLE_COMMENT = /^\s*<!--\s*SEO\s*Title\s*:[\s\S]*?-->\s*$/gim;

function cleanText(text) {
  return text
    .replace(SEO_TITLE_COMMENT, "")
    .replace(SEO_PREFIX, "")
    .replace(SEO_BOILER, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
}

function cleanExcerpt(excerpt) {
  let e = excerpt.replace(SEO_PREFIX, "").replace(SEO_BOILER, "").trim();
  if (!e || /^نصائح\s*عملية/i.test(e)) return "";
  return e;
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

let updated = 0;
for (const file of files) {
  const full = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const body = cleanText(content);
  const excerpt = data.excerpt != null ? cleanExcerpt(String(data.excerpt)) : undefined;
  const changed =
    body !== content.trimEnd() ||
    (excerpt !== undefined && excerpt !== String(data.excerpt ?? "").trim());

  if (!changed) continue;

  if (excerpt !== undefined) {
    if (excerpt) data.excerpt = excerpt;
    else delete data.excerpt;
  }
  fs.writeFileSync(full, matter.stringify(body + "\n", data), "utf8");
  updated++;
  console.log(`✓ ${file}`);
}

console.log(`\n${updated} مقال — أُزيلت عبارات SEO الظاهرة.`);

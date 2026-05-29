/**
 * إصلاح ترتيب أقسام SEO وإضافة قسم الخدمات للمقالات الناقصة
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const DEFAULT_SERVICES = `- **[كشف تسربات المياه بدون تكسير](/leak-detection)** — فحص إلكتروني حراري وصوتي مع تقرير واضح قبل أي تكسير.
- **[المشخّص الذكي للتسربات](/smart-leak-diagnosis)** — اختبار أولي بالعربية ثم حجز فحص مجاني عبر واتساب.
- **[عزل أسطح وخزانات بجدة](/insulation)** — عزل مائي وحراري يناسب مناخ الساحل ويقلل الرطوبة والحرارة.
- **[اتصل واحجز زيارة](/contact)** — معاينة ميدانية وعرض سعر شفاف قبل البدء.`;

function extractBlock(content, heading) {
  const re = new RegExp(`(\\n---\\n\\n## ${heading}[\\s\\S]*?)(?=\\n---\\n\\n## |\\n---\\n\\n\\*\\*الكلمات|$)`, "m");
  const m = content.match(re);
  return m ? { block: m[1], start: m.index, end: m.index + m[1].length } : null;
}

function removeBlock(content, heading) {
  const b = extractBlock(content, heading);
  if (!b) return content;
  return content.slice(0, b.start) + content.slice(b.end);
}

function insertBeforeKeywords(content, insert) {
  const idx = content.search(/\n---\n\n\*\*الكلمات المفتاحية/);
  if (idx === -1) {
    const marker = content.indexOf("<!-- seo-enhanced-v2 -->");
    if (marker === -1) return content.trim() + insert;
    return content.slice(0, marker).trim() + insert + "\n\n<!-- seo-enhanced-v2 -->\n";
  }
  return content.slice(0, idx) + insert + content.slice(idx);
}

function fixFile(name) {
  const full = path.join(CONTENT_DIR, name);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content: body } = matter(raw);
  let content = body;
  let changed = false;

  const related = extractBlock(content, "📚 اقرأ أيضاً في مدونة جدة للعزل والتسربات");
  const services = extractBlock(content, "🔗 خدمات وصفحات ذات صلة");

  if (related) {
    content = removeBlock(content, "📚 اقرأ أيضاً في مدونة جدة للعزل والتسربات");
    changed = true;
  }
  if (services) {
    content = removeBlock(content, "🔗 خدمات وصفحات ذات صلة");
    changed = true;
  }

  const kwIdx = content.search(/\n---\n\n\*\*الكلمات المفتاحية/);
  const relatedAfterKw =
    related && kwIdx !== -1 && content.indexOf("## 📚 اقرأ أيضاً") > kwIdx;

  if (relatedAfterKw || (related && services)) {
    let insert = "";
    if (!services) {
      insert += `\n---\n\n## 🔗 خدمات وصفحات ذات صلة\n\n${DEFAULT_SERVICES}\n`;
      changed = true;
    } else {
      insert += services.block;
    }
    if (related) insert += related.block;
    content = insertBeforeKeywords(content, insert);
    changed = true;
  } else if (!services && content.includes("<!-- seo-enhanced-v2 -->")) {
    content = insertBeforeKeywords(
      content,
      `\n---\n\n## 🔗 خدمات وصفحات ذات صلة\n\n${DEFAULT_SERVICES}\n`,
    );
    changed = true;
  }

  if (!changed) return false;
  fs.writeFileSync(full, matter.stringify(content.trim() + "\n", data), "utf8");
  return true;
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

let n = 0;
for (const f of files) {
  if (fixFile(f)) {
    n++;
    console.log(`✓ ${f}`);
  }
}
console.log(`Fixed ${n} files.`);

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "news");
const files = fs.readdirSync(dir).filter((n) => n.endsWith(".md") && n !== "README.md");
const slugs = new Set();
let ok = true;

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  try {
    const { data, content } = matter(raw);
    const slug = String(data.slug ?? "").trim();
    const issues = [];
    if (!slug) issues.push("slug مفقود");
    if (slugs.has(slug)) issues.push(`slug مكرر: ${slug}`);
    slugs.add(slug);
    if (!data.title) issues.push("title مفقود");
    if (!data.excerpt) issues.push("excerpt مفقود");
    if (!data.publishedAt) issues.push("publishedAt مفقود");
    if (!content.trim()) issues.push("نص الخبر فارغ");
    const src = data.source;
    if (src && typeof src === "object") {
      if (!src.name || !src.url) issues.push("source.name أو source.url ناقص");
    }
    if (issues.length) {
      ok = false;
      console.log(`✗ ${file}: ${issues.join(", ")}`);
    }
  } catch (e) {
    ok = false;
    console.log(`✗ ${file}: ${e.message}`);
  }
}

console.log(`\n${files.length} ملف — ${ok ? "كلها صالحة" : "يوجد أخطاء"}`);
process.exit(ok ? 0 : 1);

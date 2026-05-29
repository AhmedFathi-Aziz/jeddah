/**
 * يزيل الإيموجي الزخرفية من مقالات content/blog/*.md
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const EMOJI = /(?:🔗|📌|📋|💰|📞|📚|💬|🕐|✅|❌|⚠️|📍|📱|📧|🔍|🏠|🛠️|⭐)\s*/gu;

function stripEmojis(text) {
  return text.replace(EMOJI, "").replace(/\n{3,}/g, "\n\n").trimEnd();
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

let updated = 0;
for (const file of files) {
  const full = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const body = stripEmojis(content);
  if (body === content.trimEnd()) continue;
  fs.writeFileSync(full, matter.stringify(body + "\n", data), "utf8");
  updated++;
  console.log(`✓ ${file}`);
}
console.log(`\n${updated} مقال — أُزيلت الإيموجي.`);

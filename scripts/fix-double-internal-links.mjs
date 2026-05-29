/**
 * إصلاح روابط مكررة من نوع [[**نص**](url)](url)
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function dedupeNestedLinks(text) {
  let prev = "";
  let current = text;
  const pattern = /\[\[(\*\*[^*]+\*\*|\[[^\]]+\])\]\(([^)]+)\)\]\([^)]+\)/g;

  while (current !== prev) {
    prev = current;
    current = current.replace(pattern, "[$1]($2)");
  }

  // [[[**text**](url)](url2)](url3) — تكرار متعدد
  prev = "";
  while (current !== prev) {
    prev = current;
    current = current.replace(/\[\[(\*\*\[[^\]]+\]\([^)]+\)\*\*)\]\(([^)]+)\)\]\([^)]+\)/g, "[$1]($2)");
    current = current.replace(/\[\[\[(\*\*[^*]+\*\*)\]\(([^)]+)\)\]\(([^)]+)\)\]\([^)]+\)/g, "[$1]($2)");
  }

  return current;
}

function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  let fixed = 0;
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const cleaned = dedupeNestedLinks(content);
    if (cleaned === content) continue;
    fs.writeFileSync(full, matter.stringify(cleaned, data), "utf8");
    fixed++;
    console.log(`✓ ${file}`);
  }
  console.log(`\nأُصلح ${fixed} مقال.`);
}

main();

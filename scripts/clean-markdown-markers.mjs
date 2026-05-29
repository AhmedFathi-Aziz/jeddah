/**
 * يزيل علامات HTML الداخلية من مقالات المدونة وينقلها إلى frontmatter.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const MARKER_RE =
  /^\s*<!--\s*(seo-enhanced-v2|contextual-links-v1|inline-content-links-v1|smart-content-links-v[23])\s*-->\s*$/gm;

const FLAG_MAP = {
  "seo-enhanced-v2": "seo",
  "contextual-links-v1": "contextualLinks",
  "inline-content-links-v1": "inlineLinks",
  "smart-content-links-v2": "smartLinks",
  "smart-content-links-v3": "smartLinks",
};

function stripMarkers(content) {
  const found = [];
  const body = content.replace(MARKER_RE, (_, name) => {
    found.push(name);
    return "";
  });
  return {
    body: body
      .replace(/(?:^|\s)seo-enhanced-v2\s*-->/gm, "")
      .replace(/<!--\s*inline-\s*--!>/g, "")
      .replace(/<--\s*content-links-v1\s*-->/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trimEnd(),
    found,
  };
}

function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  let updated = 0;
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const { body, found } = stripMarkers(content);
    if (found.length === 0 && body === content.trimEnd()) continue;

    const processing = { ...(data.contentProcessing ?? {}) };
    for (const name of found) {
      const key = FLAG_MAP[name];
      if (key === "seo") processing.seo = 2;
      else if (key === "smartLinks") processing.smartLinks = 3;
      else processing[key] = 1;
    }
    data.contentProcessing = processing;

    fs.writeFileSync(full, matter.stringify(body, data), "utf8");
    updated++;
    console.log(`✓ ${file}`);
  }

  console.log(`\n${updated} مقال — أُزيلت العلامات الداخلية.`);
}

main();

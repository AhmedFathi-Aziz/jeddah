import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { demoArticles } from "../lib/articles/demo-articles";

const dir = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(dir, { recursive: true });

for (const a of demoArticles) {
  const file = path.join(dir, `${a.slug}.md`);
  const raw = matter.stringify(a.content, {
    id: a.id,
    slug: a.slug,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    coverSrc: a.cover.src,
    coverAlt: a.cover.alt,
    coverWidth: a.cover.width,
    coverHeight: a.cover.height,
    createdAt: a.createdAt.toISOString(),
  });
  fs.writeFileSync(file, raw, "utf8");
}

console.log(`Wrote ${demoArticles.length} articles to ${path.relative(process.cwd(), dir)}`);

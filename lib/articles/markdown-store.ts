import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { demoArticles } from "./demo-articles";
import { blogArticleSlugLookupCandidates } from "./slug-utils";
import type { ArticleFull } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function parseArticleFile(raw: string, filename: string): ArticleFull | null {
  const { data, content } = matter(raw);
  const d = data as Record<string, unknown>;
  const slug = String(d.slug ?? "").trim();
  if (!slug) {
    console.warn(`[markdown-store] تخطّي ${filename}: slug غير صالح`);
    return null;
  }
  const createdRaw = d.createdAt;
  const createdAt =
    createdRaw instanceof Date
      ? createdRaw
      : new Date(typeof createdRaw === "string" || typeof createdRaw === "number" ? createdRaw : 0);

  return {
    id: String(d.id ?? slug),
    slug,
    category: String(d.category ?? ""),
    title: String(d.title ?? ""),
    excerpt: String(d.excerpt ?? ""),
    content: typeof content === "string" ? content.trim() : "",
    cover: {
      src: String(d.coverSrc ?? ""),
      alt: String(d.coverAlt ?? ""),
      width: Number(d.coverWidth ?? 800) || 800,
      height: Number(d.coverHeight ?? 320) || 320,
    },
    createdAt: Number.isNaN(createdAt.getTime()) ? new Date(0) : createdAt,
  };
}

function readMarkdownFilesOnly(): ArticleFull[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const names = fs.readdirSync(CONTENT_DIR).filter((n) => n.endsWith(".md") && !n.startsWith("_"));
  const out: ArticleFull[] = [];

  for (const name of names) {
    const full = path.join(CONTENT_DIR, name);
    let raw: string;
    try {
      raw = fs.readFileSync(full, "utf8");
    } catch {
      continue;
    }
    const article = parseArticleFile(raw, name);
    if (article) out.push(article);
  }

  return out.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

let mergedCache: ArticleFull[] | null = null;

/**
 * مقالات من ‎content/blog/*.md‎ تتقدّم على مقالات العرض التجريبي عند تطابق الـ slug.
 * في التطوير يُعاد القراءة كل مرة لتسهيل التعديل على الملفات.
 */
export function getMergedBlogArticles(): ArticleFull[] {
  if (process.env.NODE_ENV === "development") {
    mergedCache = null;
  }
  if (mergedCache) return mergedCache;

  const fromMd = readMarkdownFilesOnly();
  const mdSlugs = new Set(fromMd.map((a) => a.slug));
  mergedCache = [...fromMd, ...demoArticles.filter((d) => !mdSlugs.has(d.slug))].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
  return mergedCache;
}

export function listMarkdownArticleSlugs(): string[] {
  return getMergedBlogArticles().map((a) => a.slug);
}

/**
 * كل قيم `[slug]` التي يجب توليدها ثابتاً — تشمل مرادفات الـ slug (عربي/لاتيني)
 * حتى لا يحدث 404 مع ‎dynamicParams: false‎ عند روابط قديمة.
 */
export function listBlogStaticPathSlugs(): string[] {
  const set = new Set<string>();
  for (const a of getMergedBlogArticles()) {
    for (const s of blogArticleSlugLookupCandidates(a.slug)) {
      if (s) set.add(s);
    }
  }
  return [...set];
}

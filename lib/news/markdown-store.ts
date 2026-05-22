import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { newsItems as demoNewsItems } from "./demo-news";
import type { NewsItem } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "news");

function parseSourceFields(d: Record<string, unknown>, filename: string): Pick<NewsItem, "sourceName" | "sourceUrl"> {
  const nested = d.source;
  let sourceName = "";
  let sourceUrl = "";

  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    const s = nested as Record<string, unknown>;
    sourceName = String(s.name ?? "").trim();
    sourceUrl = String(s.url ?? "").trim();
  }

  if (!sourceName) sourceName = String(d.sourceName ?? "").trim();
  if (!sourceUrl) sourceUrl = String(d.sourceUrl ?? "").trim();

  if (sourceUrl && !sourceName) {
    console.warn(`[news/markdown-store] ${filename}: أضف source.name (اسم الموقع) مع الرابط`);
  }
  if (sourceName && !sourceUrl) {
    console.warn(`[news/markdown-store] ${filename}: أضف source.url مع اسم الموقع`);
  }

  return {
    sourceName: sourceName || undefined,
    sourceUrl: sourceUrl || undefined,
  };
}

function parseNewsFile(raw: string, filename: string): NewsItem | null {
  const { data, content } = matter(raw);
  const d = data as Record<string, unknown>;
  const slug = String(d.slug ?? "").trim();
  if (!slug) {
    console.warn(`[news/markdown-store] تخطّي ${filename}: slug غير صالح`);
    return null;
  }
  if (d.published === false) return null;

  const publishedRaw = d.publishedAt;
  let publishedAt = "";
  if (publishedRaw instanceof Date) {
    publishedAt = publishedRaw.toISOString().slice(0, 10);
  } else {
    publishedAt = String(publishedRaw ?? "").trim().slice(0, 10);
  }
  if (!publishedAt) {
    console.warn(`[news/markdown-store] تخطّي ${filename}: publishedAt مطلوب`);
    return null;
  }

  const markdown = typeof content === "string" ? content.trim() : "";
  const source = parseSourceFields(d, filename);

  return {
    slug,
    title: String(d.title ?? ""),
    excerpt: String(d.excerpt ?? ""),
    publishedAt,
    body: [],
    markdown: markdown || undefined,
    ...source,
  };
}

function readMarkdownNewsOnly(): NewsItem[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const names = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && !n.startsWith("_") && n.toLowerCase() !== "readme.md");

  const out: NewsItem[] = [];
  for (const name of names) {
    const full = path.join(CONTENT_DIR, name);
    let raw: string;
    try {
      raw = fs.readFileSync(full, "utf8");
    } catch {
      continue;
    }
    const item = parseNewsFile(raw, name);
    if (item?.title && item.excerpt) out.push(item);
  }
  return out;
}

let mergedCache: NewsItem[] | null = null;

/** أخبار من ‎content/news/*.md‎ تتقدّم على ‎demo-news‎ عند تطابق الـ slug. */
export function getMergedNews(): NewsItem[] {
  if (process.env.NODE_ENV === "development" || process.env.TASARUBAT_STATIC_EXPORT === "1") {
    mergedCache = null;
  }
  if (mergedCache) return mergedCache;

  const fromMd = readMarkdownNewsOnly();
  const mdSlugs = new Set(fromMd.map((n) => n.slug));
  mergedCache = [...fromMd, ...demoNewsItems.filter((d) => !mdSlugs.has(d.slug))].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return mergedCache;
}

export function listMarkdownNewsSlugs(): string[] {
  return getMergedNews().map((n) => n.slug);
}

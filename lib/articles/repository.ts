import fs from "node:fs";
import path from "node:path";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { articles } from "@/lib/db/schema";

import { isBlogSlugHttpRedirectOnly } from "./blog-slug-redirects";
import {
  primaryAuthorFromContributors,
  resolveArticleContributors,
} from "./article-authors";
import { sanitizeArticleExcerpt } from "./sanitize-article-markdown";
import { getMergedBlogArticles, listBlogStaticPathSlugs } from "./markdown-store";
import { blogArticleSlugLookupCandidates, blogArticleSlugsConflict, normalizeArticleSlugParam } from "./slug-utils";
import type { ArticleCard, ArticleFull } from "./types";

export const ARTICLE_CACHE_REVALIDATE_SEC = 900;

const MERGE_CACHE_KEY = "blog-articles-md-d1-merge-v2";
/** كاش أطول يقلّل استعلامات D1 المتكررة على Worker */
const MERGE_REVALIDATE_SEC = 3600;

function readSlugExportJson(): string[] {
  const outFile = path.join(process.cwd(), "data", "article-slugs-export.json");
  try {
    if (!fs.existsSync(outFile)) return [];
    const raw = fs.readFileSync(outFile, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === "string" && x.trim() !== "");
    }
    if (parsed && typeof parsed === "object" && "slugs" in parsed) {
      const slugs = (parsed as { slugs?: unknown }).slugs;
      if (Array.isArray(slugs)) {
        return slugs.filter((x): x is string => typeof x === "string" && x.trim() !== "");
      }
    }
  } catch {
    /* اختياري */
  }
  return [];
}

function asArticleDate(value: unknown): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const d = new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
}

function hydrateArticleFull(a: ArticleFull): ArticleFull {
  const existing = Array.isArray(a.contributors) ? a.contributors : [];
  const input =
    existing.length > 0
      ? existing.map(({ name, role, profileHref, kind }) => ({
          name,
          role,
          profileHref,
          kind,
        }))
      : undefined;
  const contributors = resolveArticleContributors(input, a.category);
  return {
    ...a,
    contributors,
    author: primaryAuthorFromContributors(contributors),
    excerpt: sanitizeArticleExcerpt(a.excerpt, a.title),
    createdAt: asArticleDate(a.createdAt),
  };
}

function rowToArticle(r: typeof articles.$inferSelect): ArticleFull {
  const category = r.category;
  const contributors = resolveArticleContributors(undefined, category);
  return {
    id: r.id,
    slug: r.slug,
    category,
    title: r.title,
    contributors,
    author: primaryAuthorFromContributors(contributors),
    excerpt: sanitizeArticleExcerpt(r.excerpt, r.title),
    content: r.content,
    cover: {
      src: r.coverImageUrl,
      alt: r.coverAlt,
      width: r.coverWidth ?? 800,
      height: r.coverHeight ?? 320,
    },
    createdAt: new Date(r.createdAt),
  };
}

async function fetchPublishedFromDb(): Promise<ArticleFull[]> {
  const db = await getDb();
  if (!db) return [];
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));
    return rows.map(rowToArticle);
  } catch {
    return [];
  }
}

/** يمنع تكرار نفس slug في القائمة (ملف + D1 أو إدخالات مكررة). */
function dedupeArticlesByCanonicalSlug(list: ArticleFull[]): ArticleFull[] {
  const seen = new Set<string>();
  const out: ArticleFull[] = [];
  for (const a of list) {
    const key = normalizeArticleSlugParam(a.slug);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out;
}

/** Markdown + عرض تجريبي أولاً؛ ثم D1 لأي slug لا يتعارض مع مقال ملف (نفس المقال بمرادفات). */
function mergeFileAndDb(fileArticles: ArticleFull[], dbArticles: ArticleFull[]): ArticleFull[] {
  const fileIds = new Set(fileArticles.map((m) => m.id).filter(Boolean));
  const merged: ArticleFull[] = [...fileArticles];
  for (const d of dbArticles) {
    if (fileIds.has(d.id)) continue;
    if (merged.some((m) => blogArticleSlugsConflict(m.slug, d.slug))) continue;
    merged.push(d);
  }
  return dedupeArticlesByCanonicalSlug(merged).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

/** يفرض غلاف/محتوى ‎content/blog‎ على أي صف D1 يطابق ‎id‎ أو ‎slug‎ — يمنع روابط Cloudinary المكسورة. */
function applyMarkdownOverrides(fileArticles: ArticleFull[], merged: ArticleFull[]): ArticleFull[] {
  const byId = new Map(fileArticles.filter((f) => f.id).map((f) => [f.id, f]));
  return merged.map((article) => {
    const md =
      byId.get(article.id) ??
      fileArticles.find((f) => blogArticleSlugsConflict(f.slug, article.slug));
    if (!md) return article;
    return {
      ...article,
      slug: md.slug,
      title: md.title,
      excerpt: md.excerpt,
      content: md.content,
      cover: md.cover,
      category: md.category,
      contributors: md.contributors,
      author: md.author,
    };
  });
}

async function getAllMergedUncached(): Promise<ArticleFull[]> {
  const fromFiles = getMergedBlogArticles();
  const fromDb = await fetchPublishedFromDb();
  return applyMarkdownOverrides(fromFiles, mergeFileAndDb(fromFiles, fromDb));
}

const getAllMergedFromDisk = unstable_cache(
  async () => getAllMergedUncached(),
  [MERGE_CACHE_KEY],
  { revalidate: MERGE_REVALIDATE_SEC, tags: ["article-list", "articles"] },
);

const getAllArticles = cache(async (): Promise<ArticleFull[]> => {
  /** في التطوير والتصدير الثابت نقرأ الملفات مباشرة — ‎unstable_cache‎ يُبقي روابط D1 القديمة ساعة كاملة. */
  const raw =
    process.env.TASARUBAT_STATIC_EXPORT === "1" || process.env.NODE_ENV === "development"
      ? await getAllMergedUncached()
      : await getAllMergedFromDisk();
  return raw.map(hydrateArticleFull);
});

/** للوحة الإدارة — نفس دمج المدونة العام (Markdown + D1 + عرض). */
export const getAllBlogArticlesMerged = getAllArticles;

/**
 * كل مسارات `/blog/[slug]` للبناء + مرادفات الـ slug؛ يُضاف من D1 عند توفره وقت ‎next build‎.
 * تصدير ثابت ‎(output: 'export')‎ يتطلب إعادة بناء (أو ‎npm run export:blog-slugs‎) لتضمين slugs جديدة.
 */
export async function listAllSlugsForStaticBuild(): Promise<{ slug: string }[]> {
  const set = new Set(listBlogStaticPathSlugs());
  for (const slug of readSlugExportJson()) {
    const s = normalizeArticleSlugParam(slug);
    if (s && !isBlogSlugHttpRedirectOnly(s)) set.add(s);
  }
  try {
    const db = await getDb();
    if (db) {
      const rows = await db
        .select({ slug: articles.slug })
        .from(articles)
        .where(eq(articles.published, true));
      for (const { slug } of rows) {
        const s = normalizeArticleSlugParam(slug);
        if (s && !isBlogSlugHttpRedirectOnly(s)) set.add(s);
      }
    }
  } catch {
    /* بناء بدون سياق Cloudflare */
  }
  return [...set].map((slug) => ({ slug }));
}

export const listPublishedArticleCards = cache(async (): Promise<ArticleCard[]> =>
  toCards(await getAllArticles()),
);

export const listRecentRelatedArticleCards = cache(
  async (excludeArticleId: string, limit: number): Promise<ArticleCard[]> =>
    toCards((await getAllArticles()).filter((a) => a.id !== excludeArticleId)).slice(0, limit),
);

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleFull | null> => {
  const candidates = blogArticleSlugLookupCandidates(slug);
  const all = await getAllArticles();
  for (const c of candidates) {
    const direct = all.find((a) => a.slug === c);
    if (direct) return direct;
  }
  return null;
});

export function toCards(list: ArticleFull[]): ArticleCard[] {
  return list.map(({ content, ...rest }) => {
    void content;
    return rest;
  });
}

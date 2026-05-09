import { desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { articles } from "@/lib/db/schema";

import { demoArticles } from "./demo-articles";
import type { ArticleCard, ArticleFull } from "./types";

function rowToArticle(r: typeof articles.$inferSelect): ArticleFull {
  return {
    id: r.id,
    slug: r.slug,
    category: r.category,
    title: r.title,
    excerpt: r.excerpt,
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

export async function listPublishedArticles(): Promise<ArticleFull[]> {
  const db = await getDb();
  if (!db) return demoArticles;
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));
    if (!rows.length) return demoArticles;

    const fromDb = rows.map(rowToArticle);
    const seen = new Set(fromDb.map((a) => a.slug));
    const merged = [...fromDb, ...demoArticles.filter((a) => !seen.has(a.slug))];
    return merged;
  } catch {
    return demoArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleFull | null> {
  const db = await getDb();
  if (!db) {
    const d = demoArticles.find((x) => x.slug === slug);
    return d ?? null;
  }
  try {
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    const r = rows[0];
    if (!r || !r.published) {
      const d = demoArticles.find((x) => x.slug === slug);
      return d ?? null;
    }
    return rowToArticle(r);
  } catch {
    const d = demoArticles.find((x) => x.slug === slug);
    return d ?? null;
  }
}

export function toCards(list: ArticleFull[]): ArticleCard[] {
  return list.map(({ content, ...rest }) => {
    void content;
    return rest;
  });
}

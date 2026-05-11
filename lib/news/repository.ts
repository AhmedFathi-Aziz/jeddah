import { newsItems } from "./demo-news";
import type { NewsItem } from "./types";

export function listNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNewsBySlug(slug: string): NewsItem | null {
  return newsItems.find((n) => n.slug === slug) ?? null;
}

export function getAllNewsSlugs(): string[] {
  return newsItems.map((n) => n.slug);
}

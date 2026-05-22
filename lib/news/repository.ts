import { getMergedNews } from "./markdown-store";
import type { NewsItem } from "./types";

export function listNews(): NewsItem[] {
  return getMergedNews();
}

export function getNewsBySlug(slug: string): NewsItem | null {
  return getMergedNews().find((n) => n.slug === slug) ?? null;
}

export function getAllNewsSlugs(): string[] {
  return getMergedNews().map((n) => n.slug);
}

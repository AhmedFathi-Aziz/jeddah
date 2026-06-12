import blogRedirectsData from "@/data/blog-slug-redirects.json";

import { normalizeArticleSlugParam } from "./slug-utils";

/** slugs قديمة تُعالَج بـ 301 في ‎_redirects‎ / ‎next.config‎ — لا تُولَّد لها صفحات ثابتة. */
export function blogSlugHttpRedirectSources(): ReadonlySet<string> {
  const set = new Set<string>();
  for (const row of blogRedirectsData.redirects ?? []) {
    const source = row.source?.trim();
    if (!source?.startsWith("/blog/")) continue;
    const slugPart = source.slice("/blog/".length).replace(/\/$/, "");
    if (slugPart) set.add(normalizeArticleSlugParam(slugPart));
  }
  return set;
}

export function isBlogSlugHttpRedirectOnly(slug: string): boolean {
  return blogSlugHttpRedirectSources().has(normalizeArticleSlugParam(slug));
}

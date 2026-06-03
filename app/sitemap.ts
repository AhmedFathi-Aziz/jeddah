import type { MetadataRoute } from "next";

import { listPublishedArticleCards } from "@/lib/articles/repository";
import { getAllCoverageCityDistrictParams } from "@/lib/coverage-data";
import { insulationServices } from "@/lib/insulation-services";
import { listNews } from "@/lib/news/repository";
import { siteConfig } from "@/lib/site-config";

/** مع ‎output: 'export'‎ لا يُستخدم ‎revalidate‎ — تُولَّد الخريطة مرة عند البناء */
export const dynamic = "force-static";

/**
 * رابط مطلق لخريطة الموقع؛ `URL` يُحوّل المسارات (بما فيها slug عربي) إلى شكل صالح في XML.
 * لا نُضمّن /admin ولا مسارات /api — مذكورة في robots.ts كـ disallow.
 * المقالات من `listPublishedArticleCards` (بدون جلب `content`)؛ يُزال التكرار بالمسار مع الإبقاء على ترتيب الإدراج.
 */
function absSitemapUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${base}/`).href;
}

/** `unstable_cache` قد يُرجع تواريخ كسلسلة بعد التسلسل — نُحوّل دائماً إلى `Date`. */
function toValidDate(value: Date | string | number): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

type StaticSitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/** كل الصفحات العامة في التطبيق باستثناء لوحة التحكم وتسجيل الدخول. */
const STATIC_PUBLIC_PAGES: StaticSitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/smart-leak-diagnosis", changeFrequency: "monthly", priority: 0.88 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/kashf-tasribat-miah-jeddah", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/kashf-tasribat-bedun-taksir-jeddah", changeFrequency: "monthly", priority: 0.9 },
  { path: "/leak-detection", changeFrequency: "monthly", priority: 0.85 },
  { path: "/insulation", changeFrequency: "monthly", priority: 0.85 },
  { path: "/coverage", changeFrequency: "weekly", priority: 0.85 },
  { path: "/news", changeFrequency: "weekly", priority: 0.82 },
];

function dedupeSitemapByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const e of entries) {
    const prev = byUrl.get(e.url);
    if (!prev) {
      byUrl.set(e.url, e);
      continue;
    }
    const prevTime = prev.lastModified instanceof Date ? prev.lastModified.getTime() : 0;
    const nextTime = e.lastModified instanceof Date ? e.lastModified.getTime() : 0;
    if (nextTime >= prevTime) byUrl.set(e.url, e);
  }
  return Array.from(byUrl.values());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await listPublishedArticleCards();
  const news = listNews();

  const latestPost =
    posts.length > 0
      ? new Date(Math.max(...posts.map((p) => toValidDate(p.createdAt).getTime())))
      : now;
  const latestNews =
    news.length > 0
      ? new Date(Math.max(...news.map((n) => new Date(n.publishedAt).getTime())))
      : now;

  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: absSitemapUrl(path),
      lastModified:
        path === "/blog" ? latestPost : path === "/news" ? latestNews : now,
      changeFrequency,
      priority,
    }),
  );

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absSitemapUrl(`/blog/${p.slug}`),
    lastModified: toValidDate(p.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: absSitemapUrl(`/news/${item.slug}`),
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const districts: MetadataRoute.Sitemap = getAllCoverageCityDistrictParams().map(({ city, district }) => ({
    url: absSitemapUrl(`/coverage/${city}/${district}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const insulationDetails: MetadataRoute.Sitemap = insulationServices.map((service) => ({
    url: absSitemapUrl(`/insulation-services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return dedupeSitemapByUrl([
    ...staticEntries,
    ...articles,
    ...newsPages,
    ...districts,
    ...insulationDetails,
  ]);
}

import type { Metadata } from "next";

import { ALL_SITE_KEYWORDS, PRIMARY_KEYWORDS } from "@/lib/seo/keyword-clusters";
import { absUrl, siteConfig } from "@/lib/site-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** كلمات إضافية خاصة بالصفحة */
  keywords?: string[];
  /** إن وُجدت تُدمج مع العنوان في Open Graph */
  ogTitle?: string;
};

/** قصّ الوصف الطويل؛ العناوين تُمرَّر كاملة عبر `absolute` لتفادي تكرار اسم الموقع من القالب. */
export function normalizeMetaDescription(text: string, max = 165): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

/**
 * بناء Metadata موحّد مع كلمات مفتاحية و canonical و OG.
 */
export function buildPageMetadata(input: PageMetaInput): Metadata {
  const { title, description, path, keywords = [], ogTitle } = input;
  const canonical = absUrl(path);
  const mergedKeywords = [...new Set([...keywords, ...PRIMARY_KEYWORDS, ...ALL_SITE_KEYWORDS.slice(0, 40)])];
  const metaDescription = normalizeMetaDescription(description);

  return {
    title: { absolute: title },
    description: metaDescription,
    keywords: mergedKeywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitle ?? `${title} | ${siteConfig.name}`,
      description: metaDescription,
      locale: siteConfig.locale.replace("_", "-"),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

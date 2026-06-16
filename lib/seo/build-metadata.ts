import type { Metadata } from "next";

import { PRIMARY_KEYWORDS } from "@/lib/seo/keyword-clusters";
import { defaultOgImageForPath, type OgImageDescriptor } from "@/lib/seo/page-og-images";
import { toAbsoluteOgImage } from "@/lib/seo/social-metadata-helpers";
import { absUrl, siteConfig } from "@/lib/site-config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** كلمات إضافية خاصة بالصفحة */
  keywords?: string[];
  /** إن وُجدت تُدمج مع العنوان في Open Graph */
  ogTitle?: string;
  /** صورة مشاركة اختيارية؛ إن لم تُمرَّر تُختار حسب المسار */
  ogImage?: OgImageDescriptor;
};

/** قصّ الوصف الطويل؛ العناوين تُمرَّر كاملة عبر `absolute` لتفادي تكرار اسم الموقع من القالب. */
export function normalizeMetaDescription(text: string, max = 165): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

/**
 * بناء Metadata موحّد مع كلمات مفتاحية و canonical و OG/Twitter.
 */
export function buildPageMetadata(input: PageMetaInput): Metadata {
  const { title, description, path, keywords = [], ogTitle, ogImage } = input;
  const canonical = absUrl(path);
  const mergedKeywords = [...new Set([...keywords, ...PRIMARY_KEYWORDS.slice(0, 3)])];
  const metaDescription = normalizeMetaDescription(description);
  const resolvedOgImage = ogImage ?? defaultOgImageForPath(path);
  const absoluteOgImage = toAbsoluteOgImage(resolvedOgImage);
  const ogTitleResolved = ogTitle ?? `${title} | ${siteConfig.name}`;

  return {
    title: { absolute: title },
    description: metaDescription,
    keywords: mergedKeywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitleResolved,
      description: metaDescription,
      locale: siteConfig.locale.replace("_", "-"),
      siteName: siteConfig.name,
      images: [absoluteOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: metaDescription,
      images: [absoluteOgImage.url],
    },
    robots: { index: true, follow: true },
  };
}

export type { OgImageDescriptor };

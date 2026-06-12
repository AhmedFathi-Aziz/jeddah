import { safeArticleDate } from "@/lib/articles/article-date";
import { articleContributorsToJsonLd } from "@/lib/articles/article-authors";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import type { TocEntry } from "@/lib/articles/markdown-toc";
import type { ArticleFull } from "@/lib/articles/types";
import { images } from "@/lib/images";
import { SCHEMA_ORGANIZATION_ID, SCHEMA_WEBSITE_ID } from "@/lib/seo/schema-ids";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absImageSrc, absUrl } from "@/lib/site-config";

export function ArticleJsonLd({ article, toc = [] }: { article: ArticleFull; toc?: TocEntry[] }) {
  const published = safeArticleDate(article.createdAt).toISOString();
  const articleUrl = absUrl(`/blog/${article.slug}`);
  const imageUrl = isVisualCoverPlaceholder(article.cover.src)
    ? images.blogStains.src
    : absImageSrc(article.cover.src);

  const tocList =
    toc.length > 0
      ? {
          "@type": "ItemList",
          "@id": `${articleUrl}#toc`,
          name: "جدول المحتويات",
          itemListElement: toc.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: entry.text,
            url: `${articleUrl}#${entry.id}`,
          })),
        }
      : null;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "المدونة", item: absUrl("/blog") },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.excerpt,
        url: articleUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${articleUrl}#webpage`, url: articleUrl },
        image: imageUrl,
        datePublished: published,
        dateModified: published,
        inLanguage: "ar-SA",
        ...articleContributorsToJsonLd(article.contributors ?? []),
        publisher: { "@id": SCHEMA_ORGANIZATION_ID },
        isPartOf: { "@id": SCHEMA_WEBSITE_ID, "@type": "WebSite" },
        ...(tocList ? { hasPart: { "@id": `${articleUrl}#toc` } } : {}),
      },
      ...(tocList ? [tocList] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

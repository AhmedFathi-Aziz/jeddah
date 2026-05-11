import { safeArticleDate } from "@/lib/articles/article-date";
import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import type { ArticleFull } from "@/lib/articles/types";
import { images } from "@/lib/images";
import { SCHEMA_ORGANIZATION_ID, SCHEMA_WEBSITE_ID } from "@/lib/seo/schema-ids";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absImageSrc, absUrl, siteConfig } from "@/lib/site-config";

export function ArticleJsonLd({ article }: { article: ArticleFull }) {
  const published = safeArticleDate(article.createdAt).toISOString();
  const articleUrl = absUrl(`/blog/${article.slug}`);
  const imageUrl = isVisualCoverPlaceholder(article.cover.src)
    ? images.blogStains.src
    : absImageSrc(article.cover.src);

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
        author: { "@type": "Organization", "@id": SCHEMA_ORGANIZATION_ID, name: siteConfig.name },
        publisher: { "@id": SCHEMA_ORGANIZATION_ID },
        isPartOf: { "@id": SCHEMA_WEBSITE_ID, "@type": "WebSite" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

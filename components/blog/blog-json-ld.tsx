import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import type { ArticleCard } from "@/lib/articles/types";
import { images } from "@/lib/images";
import { SCHEMA_ORGANIZATION_ID, SCHEMA_WEBSITE_ID } from "@/lib/seo/schema-ids";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absImageSrc, absUrl, siteConfig } from "@/lib/site-config";

type JsonLdBlogPost = {
  "@type": "BlogPosting";
  headline: string;
  url: string;
  image: string;
  datePublished: string;
  author: { "@id": string };
  publisher: { "@id": string };
};

export function BlogJsonLd({ posts }: { posts: ArticleCard[] }) {
  const blogPosting: JsonLdBlogPost[] = posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${absUrl("/blog")}/${post.slug}`,
    image: isVisualCoverPlaceholder(post.cover.src) ? images.blogStains.src : absImageSrc(post.cover.src),
    datePublished: post.createdAt.toISOString().slice(0, 10),
    author: { "@id": SCHEMA_ORGANIZATION_ID },
    publisher: { "@id": SCHEMA_ORGANIZATION_ID },
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "المدونة", item: absUrl("/blog") },
        ],
      },
      {
        "@type": "Blog",
        "@id": absUrl("/blog") + "#blog",
        url: absUrl("/blog"),
        name: `مدونة ${siteConfig.name}`,
        inLanguage: "ar-SA",
        isPartOf: { "@id": SCHEMA_WEBSITE_ID },
        publisher: { "@id": SCHEMA_ORGANIZATION_ID },
        blogPosting,
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

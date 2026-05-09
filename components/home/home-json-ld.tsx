import { SCHEMA_FAQ_PAGE_ID, SCHEMA_WEBSITE_ID } from "@/lib/seo/schema-ids";
import { HOME_FAQ_ITEMS } from "@/lib/seo/home-faq-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absUrl } from "@/lib/site-config";

/** بيانات منظّمة للصفحة الرئيسية — FAQPage ومسار التنقل (LocalBusiness في GlobalJsonLd) */
export function HomeJsonLd() {
  const faqMainEntity = HOME_FAQ_ITEMS.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: item.answer,
    },
  }));

  const keyPages = [
    { name: "الخدمات", path: "/services" },
    { name: "كشف التسربات", path: "/leak-detection" },
    { name: "العزل", path: "/insulation" },
    { name: "اتصل بنا", path: "/contact" },
    { name: "المدونة", path: "/blog" },
  ] as const;

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": SCHEMA_FAQ_PAGE_ID,
        url: absUrl("/#faq"),
        isPartOf: { "@id": SCHEMA_WEBSITE_ID },
        mainEntity: faqMainEntity,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: absUrl("/"),
          },
        ],
      },
      {
        "@type": "SiteNavigationElement",
        name: keyPages.map((page) => page.name),
        url: keyPages.map((page) => absUrl(page.path)),
      },
      {
        "@type": "ItemList",
        name: "صفحات مقترحة للباحث",
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: keyPages.length,
        itemListElement: keyPages.map((page, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: page.name,
          url: absUrl(page.path),
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}

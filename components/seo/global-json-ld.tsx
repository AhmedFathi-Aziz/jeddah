import {
  SCHEMA_LOCAL_BUSINESS_ID,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_WEBSITE_ID,
} from "@/lib/seo/schema-ids";
import { SCHEMA_MOCK_AGGREGATE_RATING } from "@/lib/seo/aggregate-rating-mock";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { images } from "@/lib/images";
import { absImageSrc, absUrl, siteConfig } from "@/lib/site-config";

const SAUDI_ARABIA = { "@type": "Country" as const, name: "المملكة العربية السعودية" };
const CONTACT_WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`;

/**
 * مدن لإشارة نطاق الخدمة في البيانات المنظمة.
 * إذا كان العمل فعلياً مقتصراً على جدة فقط، احذف الرياض والدمام لتفادي إشارات مضللة لجوجل.
 */
const AREA_SERVED_CITIES = [{ "@type": "City" as const, name: "جدة", alternateName: "Jeddah" }] as const;

/** Organization + LocalBusiness + WebSite على كل الصفحات — أساس SEO وربط المقالات والمدونة */
export function GlobalJsonLd() {
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": SCHEMA_ORGANIZATION_ID,
        name: siteConfig.name,
        alternateName: siteConfig.nameEn,
        url: absUrl("/"),
        logo: absUrl("/icon.png"),
        telephone: siteConfig.phone,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            contactType: "customer service",
            availableLanguage: ["ar", "en"],
            areaServed: "SA",
          },
        ],
        sameAs: [CONTACT_WHATSAPP_URL],
        address: {
          "@type": "PostalAddress",
          addressLocality: "جدة",
          addressRegion: "منطقة مكة المكرمة",
          addressCountry: "SA",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": SCHEMA_LOCAL_BUSINESS_ID,
        name: siteConfig.name,
        alternateName: siteConfig.nameEn,
        url: absUrl("/"),
        telephone: siteConfig.phone,
        parentOrganization: { "@id": SCHEMA_ORGANIZATION_ID },
        image: [absImageSrc(images.hero.src), absUrl("/icon.png")],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            contactType: "customer service",
            availableLanguage: ["ar", "en"],
            areaServed: "SA",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "جدة",
          addressRegion: "منطقة مكة المكرمة",
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 21.485811,
          longitude: 39.192505,
        },
        areaServed: [...AREA_SERVED_CITIES, SAUDI_ARABIA],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        priceRange: "$$",
        aggregateRating: SCHEMA_MOCK_AGGREGATE_RATING,
        description:
          "كشف تسربات المياه وخدمات عزل الأسطح والخزانات والفوم في جدة ومنطقة مكة المكرمة.",
      },
      {
        "@type": "WebSite",
        "@id": SCHEMA_WEBSITE_ID,
        url: absUrl("/"),
        name: siteConfig.name,
        inLanguage: "ar-SA",
        publisher: { "@id": SCHEMA_ORGANIZATION_ID },
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

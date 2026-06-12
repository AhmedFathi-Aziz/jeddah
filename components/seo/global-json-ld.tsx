import {
  SCHEMA_LOCAL_BUSINESS_ID,
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_WEBSITE_ID,
} from "@/lib/seo/schema-ids";
import { ALL_SITE_KEYWORDS } from "@/lib/seo/keyword-clusters";
import { insulationServices } from "@/lib/insulation-services";
import { SCHEMA_MOCK_AGGREGATE_RATING } from "@/lib/seo/aggregate-rating-mock";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { images } from "@/lib/images";
import { absImageSrc, absUrl, siteConfig } from "@/lib/site-config";

const SAUDI_ARABIA = { "@type": "Country" as const, name: "المملكة العربية السعودية" };
const CONTACT_WHATSAPP_URL = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`;

/** مدن نطاق الخدمة في البيانات المنظمة — مقتصر على جدة. */
const AREA_SERVED_CITIES = [{ "@type": "City" as const, name: "جدة", alternateName: "Jeddah" }] as const;

const KNOWS_ABOUT = ALL_SITE_KEYWORDS;

const SERVICE_CATALOG = [
  { name: "كشف تسربات المياه بجدة", path: "/services/kashf-tasribat-miah-jeddah" },
  { name: "كشف تسربات بدون تكسير بجدة", path: "/services/kashf-tasribat-bedun-taksir-jeddah" },
  { name: "كشف تسربات الخزانات بجدة", path: "/services/kashf-tasribat-al-khazanat-jeddah" },
  { name: "كشف تسربات المسابح بجدة", path: "/services/kashf-tasribat-al-masabih-jeddah" },
  { name: "كشف تسربات مياه التكييف بجدة", path: "/services/kashf-tasribat-miah-al-takyeef-jeddah" },
  { name: "عزل أسطح بجدة", path: "/services/azl-ashtof-jeddah" },
  { name: "عزل مائي بجدة", path: "/services/azl-maei-jeddah" },
  { name: "عزل حراري بجدة", path: "/services/azl-harari-jeddah" },
  { name: "عزل خزانات بجدة", path: "/services/azl-khazanat-jeddah" },
  { name: "عزل فوم بجدة", path: "/services/azl-fom-jeddah" },
  { name: "كشف تسربات المياه في جدة", path: "/leak-detection" },
  { name: "خدمات العزل المائي والحراري", path: "/insulation" },
  { name: "دليل الخدمات والموسوعة", path: "/services" },
  { name: "مشخّص تسربات المياه الذكي", path: "/smart-leak-diagnosis" },
  { name: "مدونة التسربات والعزل", path: "/blog" },
  { name: "دليل أحياء جدة", path: "/coverage" },
  { name: "اتصل بنا — معاينة وحجز", path: "/contact" },
  { name: "من نحن — خبرة الشركة", path: "/about" },
  { name: "فريق العمل", path: "/team" },
  ...insulationServices.map((s) => ({
    name: `${s.title} في جدة`,
    path: `/insulation-services/${s.slug}`,
  })),
] as const;

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
        knowsAbout: KNOWS_ABOUT,
        address: {
          "@type": "PostalAddress",
          addressLocality: "جدة",
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
        knowsAbout: KNOWS_ABOUT,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات كشف التسربات والعزل في جدة",
          itemListElement: SERVICE_CATALOG.map((svc) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: svc.name,
              url: absUrl(svc.path),
              areaServed: AREA_SERVED_CITIES[0],
              provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
            },
          })),
        },
        description:
          "موسوعة وخدمات متخصصة في كشف تسربات المياه وعزل الأسطح والخزانات والفوم في جدة.",
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

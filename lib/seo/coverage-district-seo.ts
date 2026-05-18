import type { Metadata } from "next";

import type { ResolvedCoverageDistrict } from "@/lib/coverage-data";
import { PRIMARY_KEYWORDS } from "@/lib/seo/keyword-clusters";
import { SCHEMA_LOCAL_BUSINESS_ID } from "@/lib/seo/schema-ids";
import { absUrl, siteConfig } from "@/lib/site-config";

export type CoverageFaqItem = { question: string; answer: string };

/** أسئلة شائعة مولّدة لكل حي — فريدة بالاسم لتحسين SEO المحلي */
export function getDistrictFaqItems(district: string, cityAr: string): CoverageFaqItem[] {
  return [
    {
      question: `هل تقدمون كشف تسربات المياه في ${district} بجدة؟`,
      answer: `نعم، نغطي ${district} ضمن ${cityAr} بزيارات ميدانية لفحص التسربات بأجهزة حرارية وصوتية، مع تقرير يوضح مصدر المشكلة قبل أي إصلاح.`,
    },
    {
      question: `كم يستغرق كشف التسرب في ${district}؟`,
      answer: `الشقة أو الدور الصغير غالبًا في زيارة واحدة. الفلل والعمائر الأكبر قد تحتاج ساعتين أو أكثر حسب عدد الحمامات والخزانات؛ نعطيك تقديرًا بعد سؤال قصير عن الحالة.`,
    },
    {
      question: `هل يمكن الكشف بدون تكسير في ${district}؟`,
      answer: `نعم، نعتمد فحصًا إلكترونيًا لتحديد النقطة بدقة وتجنب التكسير العشوائي. أحيانًا يُفتح موضع ضيق فوق النقطة المؤكدة فقط — وليس هدم حمام كامل.`,
    },
    {
      question: `ما خدمات العزل المتوفرة في ${district}؟`,
      answer: `عزل أسطح (فوم وبيتومين)، عزل خزانات بالإيبوكسي، وعزل حمامات بالفوم — بعد معاينة ميدانية تُحدد المادة والسعر لكل متر.`,
    },
    {
      question: `هل تقدمون تقريرًا لشركة المياه الوطنية من ${district}؟`,
      answer: `نوفر تقريرًا فنيًا يوثّق نتيجة الفحص عند الحاجة لمتابعة الفاتورة أو الإثبات الرسمي، وفق ما يُقاس ميدانيًا دون وعود خارج نطاق الفحص.`,
    },
    {
      question: `متى أطلب معاينة عاجلة في ${district}؟`,
      answer: `عند ارتفاع مفاجئ في الفاتورة، رطوبة متوسعة، صوت مياه في الجدار، أو تحرك العداد بعد إغلاق المحابس — كلما كان التدخل أسرع قلّ الضرر على التشطيبات والخرسانة.`,
    },
  ];
}

export function buildCoverageDistrictMetadata(
  row: ResolvedCoverageDistrict,
  citySlug: string,
  districtSlug: string,
): Metadata {
  const path = absUrl(`/coverage/${citySlug}/${districtSlug}`);
  const districtShort = row.district.replace(/^حي\s+/, "");

  return {
    title: row.label,
    description: `كشف تسربات المياه وعزل أسطح وخزانات في ${row.district} بجدة: فحص بدون تكسير، تقارير فنية، عزل فوم وإيبوكسي، واستجابة سريعة داخل الحي. ${siteConfig.name}.`,
    keywords: [
      ...PRIMARY_KEYWORDS,
      `كشف تسربات المياه ${districtShort}`,
      `كشف تسربات ${districtShort} جدة`,
      `شركة كشف تسربات ${districtShort}`,
      `عزل أسطح ${districtShort}`,
      `عزل خزانات ${districtShort}`,
      `عزل فوم ${districtShort}`,
      `فني كشف تسربات ${districtShort}`,
      `ارتفاع فاتورة المياه ${districtShort}`,
      `كشف تسربات بدون تكسير ${districtShort}`,
      "كشف تسربات جدة",
      "عزل مائي وحراري جدة",
    ],
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${row.label} | ${siteConfig.name}`,
      description: `خدمات كشف التسربات والعزل في ${row.district}: معاينة، فحص إلكتروني، إصلاح، وضمان — ${cityAr(row)}.`,
      locale: siteConfig.locale.replace("_", "-"),
      type: "website",
    },
  };
}

function cityAr(row: ResolvedCoverageDistrict): string {
  return row.city.nameAr;
}

export function buildCoverageDistrictJsonLd(
  row: ResolvedCoverageDistrict,
  citySlug: string,
  districtSlug: string,
) {
  const path = `/coverage/${citySlug}/${districtSlug}`;
  const pageUrl = absUrl(path);
  const faqItems = getDistrictFaqItems(row.district, row.city.nameAr);
  const placeName = `${row.district}، ${row.city.nameAr}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: row.label,
        description: `كشف تسربات المياه والعزل في ${placeName}`,
        inLanguage: "ar-SA",
        isPartOf: { "@id": absUrl("/") },
        about: {
          "@type": "Place",
          name: placeName,
          address: {
            "@type": "PostalAddress",
            addressLocality: row.city.nameAr,
            addressRegion: "مكة المكرمة",
            addressCountry: "SA",
          },
        },
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
          {
            "@type": "ListItem",
            position: 2,
            name: "أحياء جدة",
            item: absUrl("/coverage"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: row.district,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        name: `كشف تسربات وعزل — ${row.district}`,
        url: pageUrl,
        serviceType: "كشف تسربات المياه والعزل المائي والحراري",
        areaServed: {
          "@type": "Place",
          name: placeName,
        },
        provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildCoverageIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "دليل أحياء جدة — كشف تسربات وعزل",
    url: absUrl("/coverage"),
    description:
      "فهرس صفحات محلية لخدمات كشف تسربات المياه والعزل في أحياء جدة.",
    inLanguage: "ar-SA",
    isPartOf: { "@id": absUrl("/") },
  };
}

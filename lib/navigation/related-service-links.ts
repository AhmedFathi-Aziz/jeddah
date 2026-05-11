/**
 * روابط خدمات ذات صلة لكل مسار — توزيع داخلي منطقي (صفحات أموال + مدونة + تغطية).
 * عند إضافة مسارات جديدة حدّث `RELATED_HREFS_BY_PATH` و`SERVICE_LINK_DEFINITIONS`.
 */

export type ServiceRelatedLink = {
  href: string;
  /** نص الرابط — وصفي لمحركات البحث وللمستخدم */
  title: string;
  /** جملة قصيرة بجانب الرابط لتقوية السياق حول الربط الداخلي */
  description: string;
};

const SERVICE_LINK_DEFINITIONS: ServiceRelatedLink[] = [
  {
    href: "/",
    title: "الصفحة الرئيسية",
    description: "نقطة الانطلاق للتنقل بين خدمات كشف التسربات والعزل في الموقع.",
  },
  {
    href: "/services",
    title: "خدمات كشف التسربات والعزل",
    description: "نظرة شاملة على التشخيص والعزل والتنفيذ الميداني في جدة.",
  },
  {
    href: "/leak-detection",
    title: "كشف تسربات المياه بدون تكسير",
    description: "فحص إلكتروني حراري وصوتي وتقرير واضح قبل الإصلاح.",
  },
  {
    href: "/smart-leak-diagnosis",
    title: "مُشخّص تسربات المياه الذكي",
    description: "اختبار قصير بالعربية ثم حجز فحص مجاني بجهاز الإيكوفون عبر واتساب.",
  },
  {
    href: "/insulation",
    title: "عزل أسطح وخزانات وفوم",
    description: "عزل مائي وحراري يناسب مناخ الساحل ويقلل الرطوبة والحرارة.",
  },
  {
    href: "/contact",
    title: "اتصل واحجز زيارة",
    description: "هاتف واستفسارات لمعاينات كشف التسربات والعزل.",
  },
  {
    href: "/blog",
    title: "مدونة التسربات والعزل",
    description: "إرشادات عملية عن الفواتير والرطوبة وعزل الأسطح في جدة.",
  },
  {
    href: "/news",
    title: "الأخبار",
    description: "مستجدات ونصائح موسمية وتحديثات حول خدمات الكشف والعزل في جدة.",
  },
  {
    href: "/#coverage",
    title: "تغطية أحياء جدة",
    description: "صفحات محلية لخدمات الكشف والعزل حسب الحي.",
  },
];

const LINK_BY_HREF: Record<string, ServiceRelatedLink> = Object.fromEntries(
  SERVICE_LINK_DEFINITIONS.map((l) => [l.href, l]),
);

function normalizePath(path: string): string {
  const t = path.trim();
  if (!t || t === "/") return "/";
  return t.replace(/\/+$/, "");
}

/** ترتيب الروابط المقترحة حسب «نوع» الصفحة الحالية (بدون تكرار المسار الحالي). */
function relatedHrefsForPath(normalized: string): string[] {
  if (normalized.startsWith("/admin")) return [];

  if (normalized.startsWith("/blog/") && normalized !== "/blog") {
    return [
      "/",
      "/services",
      "/leak-detection",
      "/smart-leak-diagnosis",
      "/insulation",
      "/contact",
      "/blog",
      "/news",
      "/#coverage",
    ];
  }

  if (normalized.startsWith("/news/") && normalized !== "/news") {
    return [
      "/",
      "/services",
      "/leak-detection",
      "/news",
      "/blog",
      "/contact",
      "/insulation",
      "/#coverage",
    ];
  }

  if (normalized.startsWith("/coverage/")) {
    return [
      "/",
      "/leak-detection",
      "/smart-leak-diagnosis",
      "/insulation",
      "/services",
      "/contact",
      "/blog",
      "/news",
      "/#coverage",
    ];
  }

  const map: Record<string, string[]> = {
    "/": [
      "/services",
      "/leak-detection",
      "/smart-leak-diagnosis",
      "/insulation",
      "/contact",
      "/blog",
      "/news",
      "/#coverage",
    ],
    "/services": ["/", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/contact", "/blog", "/news", "/#coverage"],
    "/leak-detection": ["/", "/smart-leak-diagnosis", "/insulation", "/services", "/contact", "/blog", "/news", "/#coverage"],
    "/smart-leak-diagnosis": ["/", "/leak-detection", "/insulation", "/services", "/contact", "/blog", "/news", "/#coverage"],
    "/insulation": ["/", "/leak-detection", "/smart-leak-diagnosis", "/services", "/contact", "/blog", "/news", "/#coverage"],
    "/contact": ["/", "/services", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/blog", "/news", "/#coverage"],
    "/blog": ["/", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/services", "/contact", "/news", "/#coverage"],
    "/news": ["/", "/leak-detection", "/blog", "/services", "/contact", "/insulation", "/#coverage"],
  };

  return map[normalized] ?? map["/"];
}

/**
 * يعيد روابط ذات صلة لصفحة حالية، مع استبعاد المسار نفسه (مطابقة تامة فقط).
 */
export function getRelatedServiceLinks(currentPath: string): ServiceRelatedLink[] {
  const n = normalizePath(currentPath);
  const hrefs = relatedHrefsForPath(n).filter((href) => normalizePath(href) !== n);
  const out: ServiceRelatedLink[] = [];
  for (const href of hrefs) {
    const link = LINK_BY_HREF[href];
    if (link) out.push(link);
  }
  return out;
}

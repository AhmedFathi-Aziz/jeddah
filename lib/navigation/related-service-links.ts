/**
 * روابط ذات صلة لكل مسار — توزيع داخلي قوي (خدمات + مدونة + تغطية + عزل فرعي).
 */
import {
  BLOG_ARTICLE_LINKS,
  FEATURED_DISTRICT_LINKS,
  HUB_LINKS,
  INSULATION_SERVICE_LINKS,
  pickLinksByContext,
  type InternalLink,
} from "@/lib/navigation/internal-link-registry";

export type ServiceRelatedLink = {
  href: string;
  title: string;
  description: string;
};

function toServiceLink(link: InternalLink): ServiceRelatedLink {
  return { href: link.href, title: link.title, description: link.description };
}

const LINK_BY_HREF: Record<string, ServiceRelatedLink> = Object.fromEntries(
  [...HUB_LINKS, ...INSULATION_SERVICE_LINKS, ...BLOG_ARTICLE_LINKS, ...FEATURED_DISTRICT_LINKS].map((l) => [
    l.href,
    toServiceLink(l),
  ]),
);

function normalizePath(path: string): string {
  const t = path.trim();
  if (!t || t === "/") return "/";
  return t.replace(/\/+$/, "");
}

function blogSlugFromPath(normalized: string): string | null {
  if (!normalized.startsWith("/blog/")) return null;
  const slug = normalized.slice("/blog/".length);
  return slug || null;
}

function contextFromPath(normalized: string): string {
  const slug = blogSlugFromPath(normalized) ?? "";
  const decoded = decodeURIComponent(slug);
  return `${normalized} ${decoded} ${slug.replace(/-/g, " ")}`;
}

/** روابط ثابتة حسب نوع الصفحة */
function baseHrefsForPath(normalized: string): string[] {
  if (normalized.startsWith("/admin")) return [];

  if (normalized.startsWith("/blog/") && normalized !== "/blog") {
    return [
      "/leak-detection",
      "/smart-leak-diagnosis",
      "/insulation",
      "/services",
      "/contact",
      "/coverage",
      "/blog",
      "/",
    ];
  }

  if (normalized.startsWith("/news/") && normalized !== "/news") {
    return ["/", "/leak-detection", "/blog", "/services", "/insulation", "/contact", "/coverage", "/news"];
  }

  if (normalized.startsWith("/coverage/")) {
    return [
      "/coverage",
      "/leak-detection",
      "/smart-leak-diagnosis",
      "/insulation",
      "/services",
      "/contact",
      "/blog",
      "/",
    ];
  }

  if (normalized.startsWith("/insulation-services/")) {
    return [
      "/insulation",
      "/leak-detection",
      "/services",
      "/contact",
      "/blog/عزل-أسطح-بجدة",
      "/blog/عزل-خزانات-بجدة",
      "/coverage",
      "/",
    ];
  }

  const map: Record<string, string[]> = {
    "/": ["/services", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/coverage", "/blog", "/contact", "/news"],
    "/services": ["/", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/coverage", "/blog", "/contact", "/news"],
    "/leak-detection": ["/", "/smart-leak-diagnosis", "/insulation", "/services", "/services/kashf-tasribat-al-khazanat-jeddah", "/blog/كشف-تسربات-بدون-تكسير", "/blog/5-ayat-tasarab", "/coverage", "/contact"],
    "/services/kashf-tasribat-al-khazanat-jeddah": [
      "/",
      "/services/kashf-tasribat-miah-jeddah",
      "/services/kashf-tasribat-bedun-taksir-jeddah",
      "/services/kashf-tasribat-al-masabih-jeddah",
      "/insulation-services/tank-epoxy-insulation",
      "/insulation-services/tank-injection",
      "/leak-detection",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/kashf-tasribat-al-masabih-jeddah": [
      "/",
      "/services/kashf-tasribat-miah-jeddah",
      "/services/kashf-tasribat-al-khazanat-jeddah",
      "/services/kashf-tasribat-miah-al-takyeef-jeddah",
      "/blog/كشف-تسربات-المسابح",
      "/leak-detection",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/kashf-tasribat-miah-al-takyeef-jeddah": [
      "/",
      "/services/kashf-tasribat-miah-jeddah",
      "/services/kashf-tasribat-bedun-taksir-jeddah",
      "/services/kashf-tasribat-al-khazanat-jeddah",
      "/leak-detection",
      "/blog/5-ayat-tasarab",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-ashtof-jeddah": [
      "/",
      "/services/azl-maei-jeddah",
      "/services/azl-harari-jeddah",
      "/services/azl-khazanat-jeddah",
      "/services/azl-fom-jeddah",
      "/insulation",
      "/insulation-services/foam-thermal-waterproof-insulation",
      "/insulation-services/thermal-insulation",
      "/services/kashf-tasribat-miah-jeddah",
      "/blog/عزل-أسطح-بجدة",
      "/blog/كشف-تسربات-الأسطح-بجدة",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-maei-jeddah": [
      "/",
      "/services/azl-ashtof-jeddah",
      "/services/azl-harari-jeddah",
      "/services/azl-khazanat-jeddah",
      "/services/azl-fom-jeddah",
      "/services/azl-hamamat-jeddah",
      "/insulation",
      "/insulation-services/tank-epoxy-insulation",
      "/insulation-services/bathroom-foam-insulation",
      "/services/kashf-tasribat-miah-jeddah",
      "/services/kashf-tasribat-al-khazanat-jeddah",
      "/blog/عزل-أسطح-بجدة",
      "/blog/عزل-خزانات-بجدة",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-harari-jeddah": [
      "/",
      "/services/azl-ashtof-jeddah",
      "/services/azl-maei-jeddah",
      "/services/azl-khazanat-jeddah",
      "/services/azl-fom-jeddah",
      "/insulation",
      "/insulation-services/thermal-insulation",
      "/insulation-services/foam-thermal-waterproof-insulation",
      "/insulation-services/external-tank-thermal-insulation",
      "/insulation-services/large-area-thermal-insulation",
      "/blog/عزل-أسطح-بجدة",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-khazanat-jeddah": [
      "/",
      "/services/kashf-tasribat-al-khazanat-jeddah",
      "/insulation-services/tank-epoxy-insulation",
      "/insulation-services/tank-injection",
      "/insulation-services/external-tank-thermal-insulation",
      "/services/azl-maei-jeddah",
      "/services/azl-harari-jeddah",
      "/blog/عزل-خزانات-بجدة",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-fom-jeddah": [
      "/",
      "/services/azl-ashtof-jeddah",
      "/services/azl-maei-jeddah",
      "/services/azl-harari-jeddah",
      "/services/azl-khazanat-jeddah",
      "/services/azl-hamamat-jeddah",
      "/insulation",
      "/insulation-services/foam-thermal-waterproof-insulation",
      "/insulation-services/bathroom-foam-insulation",
      "/insulation-services/large-area-thermal-insulation",
      "/services/kashf-tasribat-miah-jeddah",
      "/blog/عزل-أسطح-بجدة",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/services/azl-hamamat-jeddah": [
      "/",
      "/services/azl-maei-jeddah",
      "/services/azl-fom-jeddah",
      "/insulation",
      "/insulation-services/bathroom-foam-insulation",
      "/services/kashf-tasribat-miah-jeddah",
      "/services/kashf-tasribat-bedun-taksir-jeddah",
      "/blog/كشف-تسربات-الحمامات",
      "/leak-detection",
      "/contact",
      "/coverage",
      "/services",
    ],
    "/smart-leak-diagnosis": ["/", "/leak-detection", "/insulation", "/services", "/blog/ارتفاع-فاتورة-المياه-جدة", "/blog/5-ayat-tasarab", "/coverage", "/contact"],
    "/insulation": ["/", "/services/azl-ashtof-jeddah", "/services/azl-maei-jeddah", "/services/azl-harari-jeddah", "/services/azl-khazanat-jeddah", "/services/azl-fom-jeddah", "/services/azl-hamamat-jeddah", "/leak-detection", "/insulation-services/foam-thermal-waterproof-insulation", "/insulation-services/tank-epoxy-insulation", "/insulation-services/bathroom-foam-insulation", "/blog/عزل-أسطح-بجدة", "/services", "/coverage", "/contact"],
    "/contact": ["/", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/services", "/blog", "/coverage", "/news", "/about", "/team"],
    "/about": ["/", "/team", "/leak-detection", "/insulation", "/services", "/coverage", "/blog", "/contact"],
    "/team": ["/", "/about", "/leak-detection", "/insulation", "/services", "/coverage", "/contact"],
    "/blog": ["/", "/leak-detection", "/smart-leak-diagnosis", "/insulation", "/services", "/blog/kaif-taktashif-tasarobat-almiyah", "/coverage", "/contact"],
    "/news": ["/", "/leak-detection", "/blog", "/services", "/insulation", "/coverage", "/contact"],
    "/coverage": ["/", "/leak-detection", "/insulation", "/services", "/blog", "/smart-leak-diagnosis", "/contact", "/#coverage"],
  };

  return map[normalized] ?? map["/"];
}

/** مقالات مدونة ذات صلة بالسياق */
function contextualBlogHrefs(context: string, currentPath: string, count = 3): string[] {
  return pickLinksByContext(BLOG_ARTICLE_LINKS, context, count + 2, currentPath)
    .filter((l) => l.href !== currentPath)
    .slice(0, count)
    .map((l) => l.href);
}

/** أحياء ذات صلة */
function contextualDistrictHrefs(context: string, count = 2): string[] {
  return pickLinksByContext(FEATURED_DISTRICT_LINKS, context, count).map((l) => l.href);
}

/** خدمات عزل فرعية ذات صلة */
function contextualInsulationHrefs(context: string, count = 2): string[] {
  return pickLinksByContext(INSULATION_SERVICE_LINKS, context, count).map((l) => l.href);
}

/**
 * يعيد روابط ذات صلة قوية لصفحة حالية — حتى 12 رابط بدون تكرار.
 */
export function getRelatedServiceLinks(currentPath: string, extraContext = ""): ServiceRelatedLink[] {
  const n = normalizePath(currentPath);
  const context = `${contextFromPath(n)} ${extraContext}`.trim();

  const hrefSet = new Set<string>();
  const ordered: string[] = [];

  const push = (href: string) => {
    const norm = normalizePath(href);
    if (norm === n || hrefSet.has(href)) return;
    if (LINK_BY_HREF[href]) {
      hrefSet.add(href);
      ordered.push(href);
    }
  };

  // روابط سياقية حسب نوع الصفحة
  if (n.startsWith("/blog/")) {
    for (const h of contextualBlogHrefs(context, n, 4)) push(h);
    for (const h of contextualDistrictHrefs(context, 2)) push(h);
    for (const h of contextualInsulationHrefs(context, 1)) push(h);
  } else if (n.startsWith("/insulation-services/")) {
    for (const h of contextualInsulationHrefs(context, 3)) push(h);
    push("/blog/عزل-أسطح-بجدة");
    push("/blog/عزل-خزانات-بجدة");
    push("/leak-detection");
  } else if (n.startsWith("/coverage/")) {
    for (const h of contextualBlogHrefs(context, n, 3)) push(h);
    for (const h of contextualDistrictHrefs(context, 3)) push(h);
  } else if (n === "/leak-detection" || n === "/smart-leak-diagnosis") {
    for (const h of contextualBlogHrefs(context, n, 4)) push(h);
    for (const h of contextualDistrictHrefs(context, 2)) push(h);
  } else if (n === "/insulation") {
    for (const h of contextualInsulationHrefs(context, 4)) push(h);
    for (const h of contextualBlogHrefs(context, n, 2)) push(h);
  }

  for (const href of baseHrefsForPath(n)) push(href);

  return ordered.slice(0, 12).map((href) => LINK_BY_HREF[href]!);
}

/** روابط سريعة للشريط الجانبي في المقالات */
export function getArticleSidebarLinks(currentSlug: string): ServiceRelatedLink[] {
  const context = decodeURIComponent(currentSlug);
  const blogLinks = pickLinksByContext(BLOG_ARTICLE_LINKS, context, 3, `/blog/${currentSlug}`).map(toServiceLink);
  const serviceLinks = [
    toServiceLink(HUB_LINKS.find((l) => l.href === "/leak-detection")!),
    toServiceLink(HUB_LINKS.find((l) => l.href === "/smart-leak-diagnosis")!),
    toServiceLink(HUB_LINKS.find((l) => l.href === "/insulation")!),
    toServiceLink(HUB_LINKS.find((l) => l.href === "/coverage")!),
  ];
  return [...serviceLinks, ...blogLinks];
}

/** روابط مقترحة لحقن داخل محتوى المقال حسب عنوان القسم */
export function getContextualInlineLinks(sectionHeading: string, articleSlug: string): ServiceRelatedLink[] {
  const ctx = `${sectionHeading} ${decodeURIComponent(articleSlug)}`;
  const blogs = pickLinksByContext(BLOG_ARTICLE_LINKS, ctx, 2, `/blog/${articleSlug}`).map(toServiceLink);
  const hubs = pickLinksByContext(
    [...HUB_LINKS, ...INSULATION_SERVICE_LINKS],
    ctx,
    2,
  ).map(toServiceLink);
  return [...hubs, ...blogs].slice(0, 4);
}

import { absUrl } from "@/lib/site-config";

/**
 * مقالات تتنافس مع صفحة خدمة رئيسية أو مقالة أخرى — canonical يُوجّه إشارة SEO
 * دون حذف المحتوى (يبقى قابلاً للقراءة والروابط الداخلية).
 */
const BLOG_CANONICAL_PATH_OVERRIDES: Record<string, string> = {
  // —— تجميع إشارة «كشف تسربات المياه بجدة» على صفحة الخدمة ——
  "كشف-تسربات-المياه-جدة": "/services/kashf-tasribat-miah-jeddah",
  "كشف-تسربات-المياه-بجدة-أفضل-شركة-متخصصة": "/services/kashf-tasribat-miah-jeddah",
  "kashf-tasarubat-fi-jeddah": "/services/kashf-tasribat-miah-jeddah",
  "كشف-تسربات-بجدة-الدليل-الشامل": "/services/kashf-tasribat-miah-jeddah",
  "كشف-تسربات-مياه-بجدة-خدمة-متخصصة": "/services/kashf-tasribat-miah-jeddah",

  // —— مقالات الرياض على موقع جدة ——
  "kashf-tasarubat-alriyadh": "/services/kashf-tasribat-miah-jeddah",
  "كشف-تسربات-المياه-الرياض": "/services/kashf-tasribat-miah-jeddah",
  "شركة-كشف-تسربات-مياه-وعزل-بالرياض": "/services/kashf-tasribat-miah-jeddah",
  "شركة-كشف-تسربات-وعزل-بالرياض": "/services/kashf-tasribat-miah-jeddah",

  // —— تكرار موضوع فاتورة المياه ——
  "high-water-bill-jeddah": "/blog/ارتفاع-فاتورة-المياه-جدة",
};

/** canonical مطلق للمقالة؛ يُستخدم في `generateMetadata` */
export function resolveBlogCanonicalUrl(slug: string, articleUrl: string): string {
  const overridePath = BLOG_CANONICAL_PATH_OVERRIDES[slug];
  return overridePath ? absUrl(overridePath) : articleUrl;
}

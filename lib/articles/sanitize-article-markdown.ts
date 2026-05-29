/** علامات داخلية لسكربتات SEO/الربط — لا يجب أن تظهر للقارئ */
const PROCESSING_MARKER =
  /^\s*<!--\s*(?:seo-enhanced-v2|contextual-links-v1|inline-content-links-v1|smart-content-links-v[23])\s*-->\s*$/gm;

/** بقايا تعليقات HTML مكسورة قد تظهر كنص */
const BROKEN_MARKER_FRAGMENTS =
  /(?:^|\s)(?:seo-enhanced-v2\s*-->|<!--\s*inline-\s*--!>|<--\s*content-links-v1\s*-->)/g;

/** إيموجي زخرفية — لا تُعرض في المقال */
const DECORATIVE_EMOJI =
  /(?:🔗|📌|📋|💰|📞|📚|💬|🕐|✅|❌|⚠️|📍|📱|📧|🔍|🏠|🛠️|⭐)\s*/gu;

const SEO_VISIBLE_PREFIX = /دليل\s*SEO\s*متخصص\s*:\s*/gi;
const SEO_TITLE_COMMENT = /^\s*<!--\s*SEO\s*Title\s*:[\s\S]*?-->\s*$/gim;
const SEO_EXCERPT_BOILER =
  /\s*[—–-]\s*نصائح\s*عملية\s*،?\s*ربط\s*داخلي\s*،?\s*وخطوات\s*واضحة\s*لـ[^\n.]+[.]?/gi;

/** يزيل عبارات SEO الزائفة من ملخص المقال (بطاقات المدونة وmeta). */
export function sanitizeArticleExcerpt(excerpt: string, title = ""): string {
  const text = String(excerpt ?? "")
    .replace(SEO_VISIBLE_PREFIX, "")
    .replace(SEO_EXCERPT_BOILER, "")
    .replace(/،?\s*ربط\s*داخلي\s*،?/gi, "،")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+،/g, "،")
    .trim();

  if (!text || /^نصائح\s*عملية/i.test(text)) {
    return String(title ?? "").trim();
  }
  return text;
}

/**
 * يزيل علامات المعالجة الداخلية من Markdown قبل العرض.
 * الروابط داخل النص تبقى كما هي.
 */
export function sanitizeArticleMarkdown(content: string): string {
  return content
    .replace(PROCESSING_MARKER, "")
    .replace(BROKEN_MARKER_FRAGMENTS, "")
    .replace(SEO_TITLE_COMMENT, "")
    .replace(SEO_VISIBLE_PREFIX, "")
    .replace(DECORATIVE_EMOJI, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
}

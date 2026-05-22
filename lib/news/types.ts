export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  /** تاريخ النشر بصيغة ISO (YYYY-MM-DD) */
  publishedAt: string;
  /** فقرات نص الخبر (من demo-news فقط) */
  body: string[];
  /** جسم الخبر بصيغة Markdown (من ملفات content/news) */
  markdown?: string;
  /** رابط الخبر على الموقع الأصلي */
  sourceUrl?: string;
  /** اسم الموقع/المصدر (يُعرض كرابط مع sourceUrl) */
  sourceName?: string;
};

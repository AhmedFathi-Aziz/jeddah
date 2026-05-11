export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  /** تاريخ النشر بصيغة ISO (YYYY-MM-DD) */
  publishedAt: string;
  /** فقرات نص الخبر */
  body: string[];
};

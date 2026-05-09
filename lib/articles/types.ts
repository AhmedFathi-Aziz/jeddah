/** شكل مقال للعرض في الواجهة (من D1 أو بيانات احتياطية). */
export type ArticleCard = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** URL صورة الغلاف (خارجية أو CDN) */
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  createdAt: Date;
};

export type ArticleFull = ArticleCard & {
  content: string;
};

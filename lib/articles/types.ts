/** شكل مقال للعرض في الواجهة (من D1 أو بيانات احتياطية). */
export type ArticleCard = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  /** الكاتب الرئيسي — للعرض المختصر */
  author: {
    name: string;
    role: string;
    profileHref?: string;
  };
  /** فريق المقال: كاتب، مراجع، محرر */
  contributors: {
    name: string;
    role: string;
    profileHref?: string;
    kind: "writer" | "reviewer" | "editor";
    initials: string;
  }[];
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

/**
 * سجل مركزي للربط الداخلي — روابط موجودة فقط (لا تغيّر URLs).
 * يُستخدم في related-service-links والمقالات وصفحات التغطية.
 */
export type InternalLink = {
  href: string;
  title: string;
  description: string;
  /** وسوم لمطابقة السياق */
  tags: string[];
};

/** صفحات الخدمات والمحاور الرئيسية */
export const HUB_LINKS: InternalLink[] = [
  {
    href: "/",
    title: "الصفحة الرئيسية",
    description: "نقطة الانطلاق لخدمات كشف التسربات والعزل في جدة.",
    tags: ["رئيسية", "جدة"],
  },
  {
    href: "/services",
    title: "دليل خدمات الكشف والعزل",
    description: "نظرة شاملة على التشخيص والعزل والتنفيذ الميداني.",
    tags: ["خدمات", "دليل"],
  },
  {
    href: "/leak-detection",
    title: "كشف تسربات المياه بدون تكسير",
    description: "فحص حراري وصوتي مع تقرير واضح قبل أي تكسير.",
    tags: ["كشف", "تسرب", "فحص", "بدون تكسير", "رطوبة"],
  },
  {
    href: "/services/kashf-tasribat-al-khazanat-jeddah",
    title: "كشف تسربات الخزانات بجدة",
    description: "فحص خزان علوي وأرضي، وصلات، عزل، وتقرير فني.",
    tags: ["خزان", "كشف", "تسرب", "خزانات", "جدة"],
  },
  {
    href: "/services/kashf-tasribat-al-masabih-jeddah",
    title: "كشف تسربات المسابح بجدة",
    description: "اختبار منسوب، فحص خطوط التغذية والصرف، وتقرير فني.",
    tags: ["مسبح", "مسابح", "كشف", "تسرب", "جدة"],
  },
  {
    href: "/services/kashf-tasribat-miah-al-takyeef-jeddah",
    title: "كشف تسربات مياه التكييف بجدة",
    description: "فحص خط تصريف المكيف، البانيو، والرطوبة خلف الوحدات.",
    tags: ["تكييف", "مكيف", "تصريف", "كشف", "تسرب", "جدة"],
  },
  {
    href: "/smart-leak-diagnosis",
    title: "المشخّص الذكي للتسربات",
    description: "اختبار أولي بالعربية ثم حجز فحص عبر واتساب.",
    tags: ["تشخيص", "فاتورة", "علامات", "عداد"],
  },
  {
    href: "/services/azl-fom-jeddah",
    title: "عزل فوم بجدة",
    description: "رش بولي يوريثان حراري ومائي للفلل والعمائر والمستودعات — معاينة وتنفيذ ميداني.",
    tags: ["فوم", "عزل", "أسطح", "حراري", "مائي", "جدة", "بولي يوريثان"],
  },
  {
    href: "/services/azl-ashtof-jeddah",
    title: "عزل أسطح بجدة",
    description: "عزل مائي وحراري للفلل والعمائر والمستودعات — فوم، بيتومين، معاينة وتقدير.",
    tags: ["عزل", "أسطح", "سطح", "حراري", "مائي", "جدة", "فوم", "بيتومين"],
  },
  {
    href: "/insulation",
    title: "عزل أسطح وخزانات بجدة",
    description: "عزل مائي وحراري يناسب مناخ الساحل.",
    tags: ["عزل", "أسطح", "خزان", "حراري", "مائي"],
  },
  {
    href: "/contact",
    title: "اتصل واحجز زيارة",
    description: "معاينة ميدانية وعرض سعر شفاف.",
    tags: ["تواصل", "حجز", "معاينة"],
  },
  {
    href: "/coverage",
    title: "دليل أحياء جدة",
    description: "60 صفحة محلية لكشف التسربات والعزل حسب الحي.",
    tags: ["أحياء", "جدة", "تغطية", "حي"],
  },
  {
    href: "/#coverage",
    title: "خريطة التغطية في الرئيسية",
    description: "انتقل سريعاً لأحياء جدة من الصفحة الرئيسية.",
    tags: ["أحياء", "خريطة", "تغطية"],
  },
  {
    href: "/blog",
    title: "مدونة التسربات والعزل",
    description: "أدلة عملية عن الفواتير والرطوبة والوقاية.",
    tags: ["مدونة", "دليل", "مقالات"],
  },
  {
    href: "/news",
    title: "أخبار ونصائح موسمية",
    description: "تحديثات عن الأمطار والصيانة الوقائية.",
    tags: ["أخبار", "موسم"],
  },
];

/** صفحات خدمات العزل الفرعية */
export const INSULATION_SERVICE_LINKS: InternalLink[] = [
  {
    href: "/insulation-services/foam-thermal-waterproof-insulation",
    title: "عزل فوم حراري ومائي",
    description: "بولي يوريثان للأسطح والفلل الكبيرة.",
    tags: ["فوم", "عزل", "أسطح", "حراري"],
  },
  {
    href: "/insulation-services/tank-epoxy-insulation",
    title: "عزل خزانات بالإيبوكسي",
    description: "حماية داخلية للخزانات ومنع تلوث المياه.",
    tags: ["خزان", "إيبوكسي", "عزل"],
  },
  {
    href: "/insulation-services/bathroom-foam-insulation",
    title: "عزل حمامات بالفوم",
    description: "منع تسرب المياه بين الطوابق بعد الإصلاح.",
    tags: ["حمام", "فوم", "عزل"],
  },
  {
    href: "/insulation-services/thermal-insulation",
    title: "عزل حراري للأسطح",
    description: "تقليل حرارة السطح واستهلاك التكييف.",
    tags: ["حراري", "أسطح", "عزل"],
  },
  {
    href: "/insulation-services/tank-injection",
    title: "حقن خزانات المياه",
    description: "معالجة الشقوق والتسربات في الخزانات.",
    tags: ["خزان", "حقن", "تسرب"],
  },
  {
    href: "/insulation-services/large-area-thermal-insulation",
    title: "عزل مساحات كبيرة",
    description: "هناجر ومستودعات وأسطح تجارية.",
    tags: ["هناجر", "مساحات", "حراري"],
  },
];

/** مقالات المدونة — روابط ثابتة للربط الداخلي */
export const BLOG_ARTICLE_LINKS: InternalLink[] = [
  {
    href: "/blog/kaif-taktashif-tasarobat-almiyah",
    title: "كيف تكتشف تسربات المياه قبل ارتفاع الفاتورة",
    description: "دليل شامل للكشف الذاتي والعلامات المبكرة.",
    tags: ["كشف", "فاتورة", "منزل", "اكتشاف"],
  },
  {
    href: "/blog/كشف-تسربات-بدون-تكسير",
    title: "كشف تسربات بدون تكسير في جدة",
    description: "تقنيات الفحص الحديثة دون تكسير البلاط.",
    tags: ["كشف", "بدون تكسير", "أجهزة", "فحص"],
  },
  {
    href: "/blog/ارتفاع-فاتورة-المياه-جدة",
    title: "ارتفاع فاتورة المياه في جدة",
    description: "الأسباب الحقيقية وكيف تكشف التسرب الخفي.",
    tags: ["فاتورة", "استهلاك", "عداد", "ارتفاع"],
  },
  {
    href: "/blog/5-ayat-tasarab",
    title: "5 علامات تدل على تسرب المياه",
    description: "مؤشرات سريعة قبل استدعاء الفني.",
    tags: ["علامات", "فاتورة", "رطوبة", "عداد"],
  },
  {
    href: "/blog/كشف-تسربات-الحمامات",
    title: "كشف تسربات الحمامات في جدة",
    description: "أسباب تسرب الحمامات والحلول بدون تكسير.",
    tags: ["حمام", "دورة", "سيفون", "رطوبة"],
  },
  {
    href: "/blog/كشف-تسربات-المطابخ-بجدة",
    title: "كشف تسربات المطابخ",
    description: "تسربات تحت الحوض والغسالة والبلاط.",
    tags: ["مطبخ", "حوض", "غسالة"],
  },
  {
    href: "/blog/كشف-تسربات-الخزانات-بجدة",
    title: "كشف تسربات الخزانات",
    description: "الخزانات الأرضية والعلوية في جدة.",
    tags: ["خزان", "علوي", "أرضي"],
  },
  {
    href: "/blog/عزل-خزانات-بجدة",
    title: "عزل الخزانات في جدة",
    description: "حماية المياه وإطالة عمر الخزان.",
    tags: ["خزان", "عزل", "إيبوكسي"],
  },
  {
    href: "/blog/كشف-تسربات-الأسطح-بجدة",
    title: "كشف تسربات الأسطح",
    description: "تسربات الأمطار والخزانات العلوية.",
    tags: ["سطح", "أسطح", "أمطار", "سقف"],
  },
  {
    href: "/blog/عزل-أسطح-بجدة",
    title: "عزل أسطح بجدة",
    description: "دليل العزل المائي والحراري للأسطح.",
    tags: ["عزل", "أسطح", "حراري", "مائي"],
  },
  {
    href: "/blog/إصلاح-تسربات-المياه",
    title: "إصلاح تسربات المياه في جدة",
    description: "من الكشف إلى الإصلاح والعزل الوقائي.",
    tags: ["إصلاح", "ترميم", "كشف"],
  },
  {
    href: "/blog/خطورة-تسربات-المياه",
    title: "خطورة تسربات المياه",
    description: "الأضرار الإنشائية والصحية والمالية.",
    tags: ["خطورة", "أضرار", "عفن", "صحة"],
  },
  {
    href: "/blog/ما-هي-التسربات-ولماذا-تحدث",
    title: "ما هي التسربات ولماذا تحدث",
    description: "فهم المشكلة من جذورها علمياً.",
    tags: ["تسرب", "أسباب", "علم"],
  },
  {
    href: "/blog/ahamiyat-alazl-bi-anwaaih",
    title: "أهمية العزل الحراري والمائي",
    description: "لماذا العزل ضرورة في مناخ جدة.",
    tags: ["عزل", "حراري", "مائي", "أهمية"],
  },
  {
    href: "/blog/أفضل-شركة-كشف-تسربات-بجدة",
    title: "شركة كشف تسربات المياه بجدة",
    description: "معايير اختيار شركة موثوقة.",
    tags: ["شركة", "أفضل", "كشف"],
  },
  {
    href: "/blog/كشف-تسربات-المياه-بأحدث-الأجهزة",
    title: "فحص التسربات بالأجهزة الحديثة",
    description: "دليل هندسي للتقنيات غير التدميرية.",
    tags: ["أجهزة", "فحص", "حراري", "صوتي"],
  },
];

/** أحياء جدة ذات أولوية للربط الداخلي */
export const FEATURED_DISTRICT_LINKS: InternalLink[] = [
  {
    href: "/coverage/jeddah/al-rawdah",
    title: "كشف تسربات في الروضة",
    description: "خدمة ميدانية في حي الروضة بجدة.",
    tags: ["روضة", "حي", "جدة"],
  },
  {
    href: "/coverage/jeddah/as-safa",
    title: "كشف تسربات في الصفا",
    description: "فحص وعزل في حي الصفا.",
    tags: ["صفا", "حي", "جدة"],
  },
  {
    href: "/coverage/jeddah/al-hamra",
    title: "كشف تسربات في الحمراء",
    description: "تغطية حي الحمراء الساحلي.",
    tags: ["حمراء", "حي", "جدة"],
  },
  {
    href: "/coverage/jeddah/abhur",
    title: "كشف تسربات في أبحر",
    description: "خدمات الكشف والعزل في أبحر.",
    tags: ["أبحر", "حي", "جدة"],
  },
  {
    href: "/coverage/jeddah/al-aziziyah",
    title: "كشف تسربات في العزيزية",
    description: "صفحة محلية لحي العزيزية.",
    tags: ["عزيزية", "حي", "جدة"],
  },
];

export function scoreLinkForContext(link: InternalLink, text: string): number {
  let score = 0;
  for (const tag of link.tags) {
    if (text.includes(tag)) score += 2;
  }
  return score;
}

export function pickLinksByContext(
  pool: InternalLink[],
  context: string,
  count: number,
  excludeHref?: string,
): InternalLink[] {
  return pool
    .filter((l) => l.href !== excludeHref)
    .map((l) => ({ ...l, score: scoreLinkForContext(l, context) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

export const ALL_INTERNAL_LINKS: InternalLink[] = [
  ...HUB_LINKS,
  ...INSULATION_SERVICE_LINKS,
  ...BLOG_ARTICLE_LINKS,
  ...FEATURED_DISTRICT_LINKS,
];

export function linkByHref(href: string): InternalLink | undefined {
  return ALL_INTERNAL_LINKS.find((l) => l.href === href);
}

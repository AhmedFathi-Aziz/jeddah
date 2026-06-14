/**
 * خريطة الكلمات المفتاحية → صفحات موجودة فقط (لا تغيّر الـ URLs).
 * المصدر المركزي لـ meta keywords و knowsAbout والفهرس في الواجهة.
 */
export type KeywordCategory =
  | "leak"
  | "insulation"
  | "bill"
  | "tools"
  | "local";

export type KeywordTopic = {
  /** عبارة البحث المستهدفة */
  keyword: string;
  /** مسار داخلي موجود */
  href: string;
  category: KeywordCategory;
};

export const KEYWORD_CATEGORY_LABELS: Record<KeywordCategory, string> = {
  leak: "كشف تسربات المياه",
  insulation: "العزل المائي والحراري",
  bill: "الفواتير والتشخيص",
  tools: "أدوات وتشخيص",
  local: "جدة والأحياء",
};

/** كل الموضوعات مرتبة حسب الفئة */
export const KEYWORD_TOPICS: KeywordTopic[] = [
  // —— كشف التسربات ——
  { keyword: "كشف تسربات المياه بجدة", href: "/services/kashf-tasribat-miah-jeddah", category: "leak" },
  { keyword: "كشف تسربات المياه جدة", href: "/services/kashf-tasribat-miah-jeddah", category: "leak" },
  { keyword: "شركة كشف تسربات بجدة", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات المياه بدون تكسير", href: "/services/kashf-tasribat-bedun-taksir-jeddah", category: "leak" },
  { keyword: "كشف تسربات بدون تكسير جدة", href: "/services/kashf-tasribat-bedun-taksir-jeddah", category: "leak" },
  { keyword: "كشف تسربات بدون تكسير بجدة", href: "/services/kashf-tasribat-bedun-taksir-jeddah", category: "leak" },
  { keyword: "فحص تسربات المياه إلكتروني", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات إلكتروني", href: "/leak-detection", category: "leak" },
  { keyword: "جهاز كشف التسربات", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات بالأشعة الحرارية", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات صوتي إيكوفون", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات الحمامات", href: "/blog/كشف-تسربات-الحمامات", category: "leak" },
  { keyword: "كشف تسربات المطابخ", href: "/blog/كشف-تسربات-المطابخ-بجدة", category: "leak" },
  { keyword: "كشف تسربات الأسطح", href: "/blog/كشف-تسربات-الأسطح-بجدة", category: "leak" },
  { keyword: "كشف تسربات الخزانات", href: "/services/kashf-tasribat-al-khazanat-jeddah", category: "leak" },
  { keyword: "كشف تسربات الخزانات بجدة", href: "/services/kashf-tasribat-al-khazanat-jeddah", category: "leak" },
  { keyword: "كشف تسربات المسابح", href: "/services/kashf-tasribat-al-masabih-jeddah", category: "leak" },
  { keyword: "كشف تسربات المسابح بجدة", href: "/services/kashf-tasribat-al-masabih-jeddah", category: "leak" },
  { keyword: "فحص تسرب مسبح جدة", href: "/services/kashf-tasribat-al-masabih-jeddah", category: "leak" },
  { keyword: "كشف تسربات مياه التكييف بجدة", href: "/services/kashf-tasribat-miah-al-takyeef-jeddah", category: "leak" },
  { keyword: "كشف تسربات مياه التكييف جدة", href: "/services/kashf-tasribat-miah-al-takyeef-jeddah", category: "leak" },
  { keyword: "تسرب مياه من المكيف جدة", href: "/services/kashf-tasribat-miah-al-takyeef-jeddah", category: "leak" },
  { keyword: "فحص خط تصريف التكييف", href: "/services/kashf-tasribat-miah-al-takyeef-jeddah", category: "leak" },
  { keyword: "كشف تسربات مواسير مخفية", href: "/leak-detection", category: "leak" },
  { keyword: "إصلاح تسربات المياه جدة", href: "/blog/إصلاح-تسربات-المياه", category: "leak" },
  { keyword: "فني كشف تسربات جدة", href: "/leak-detection", category: "leak" },
  { keyword: "أفضل شركة كشف تسربات جدة", href: "/leak-detection", category: "leak" },
  { keyword: "شركة كشف تسربات معتمدة", href: "/leak-detection", category: "leak" },
  { keyword: "تقرير كشف تسربات معتمد", href: "/leak-detection", category: "leak" },
  { keyword: "كشف تسربات شركة المياه الوطنية", href: "/leak-detection", category: "leak" },
  { keyword: "تسرب مياه خفي", href: "/leak-detection", category: "leak" },
  { keyword: "تسرب مياه في الجدار", href: "/leak-detection", category: "leak" },
  { keyword: "رطوبة في الجدار بدون تسرب ظاهر", href: "/leak-detection", category: "leak" },
  { keyword: "طوارئ تسرب مياه جدة", href: "/contact", category: "leak" },

  // —— العزل ——
  { keyword: "عزل أسطح جدة", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل أسطح بجدة", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل مائي بجدة", href: "/services/azl-maei-jeddah", category: "insulation" },
  { keyword: "شركة عزل مائي بجدة", href: "/services/azl-maei-jeddah", category: "insulation" },
  { keyword: "سعر عزل مائي بجدة", href: "/services/azl-maei-jeddah", category: "insulation" },
  { keyword: "أفضل شركة عزل مائي بجدة", href: "/services/azl-maei-jeddah", category: "insulation" },
  { keyword: "عزل بيتومين بجدة", href: "/services/azl-maei-jeddah", category: "insulation" },
  { keyword: "شركة عزل أسطح بجدة", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل مائي للأسطح بجدة", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل حراري للأسطح بجدة", href: "/services/azl-harari-jeddah", category: "insulation" },
  { keyword: "عزل حراري بجدة", href: "/services/azl-harari-jeddah", category: "insulation" },
  { keyword: "شركة عزل حراري بجدة", href: "/services/azl-harari-jeddah", category: "insulation" },
  { keyword: "سعر عزل حراري بجدة", href: "/services/azl-harari-jeddah", category: "insulation" },
  { keyword: "عزل حراري للأسطح", href: "/insulation-services/thermal-insulation", category: "insulation" },
  { keyword: "عزل مائي وحراري بجدة", href: "/insulation", category: "insulation" },
  { keyword: "عزل مائي للأسطح", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل فوم جدة", href: "/services/azl-fom-jeddah", category: "insulation" },
  { keyword: "عزل فوم بجدة", href: "/services/azl-fom-jeddah", category: "insulation" },
  { keyword: "عزل فوم حراري ومائي", href: "/services/azl-fom-jeddah", category: "insulation" },
  { keyword: "عزل بولي يوريثان", href: "/services/azl-fom-jeddah", category: "insulation" },
  { keyword: "عزل حمامات بجدة", href: "/services/azl-hamamat-jeddah", category: "insulation" },
  { keyword: "عزل حمامات بالفوم بجدة", href: "/services/azl-hamamat-jeddah", category: "insulation" },
  { keyword: "شركة عزل حمامات جدة", href: "/services/azl-hamamat-jeddah", category: "insulation" },
  { keyword: "سعر عزل حمام بجدة", href: "/services/azl-hamamat-jeddah", category: "insulation" },
  { keyword: "عزل خزانات بجدة", href: "/services/azl-khazanat-jeddah", category: "insulation" },
  { keyword: "شركة عزل خزانات بجدة", href: "/services/azl-khazanat-jeddah", category: "insulation" },
  { keyword: "سعر عزل خزانات بجدة", href: "/services/azl-khazanat-jeddah", category: "insulation" },
  { keyword: "عزل خزان علوي بجدة", href: "/services/azl-khazanat-jeddah", category: "insulation" },
  { keyword: "عزل خزانات المياه بجدة", href: "/services/azl-khazanat-jeddah", category: "insulation" },
  { keyword: "عزل خزانات إيبوكسي", href: "/insulation-services/tank-epoxy-insulation", category: "insulation" },
  { keyword: "عزل خزان أرضي", href: "/insulation-services/tank-epoxy-insulation", category: "insulation" },
  { keyword: "عزل حمامات بالفوم", href: "/insulation-services/bathroom-foam-insulation", category: "insulation" },
  { keyword: "عزل حمامات حراري", href: "/insulation-services/thermal-bathroom-insulation", category: "insulation" },
  { keyword: "عزل حمامات ومطابخ", href: "/insulation-services/bathroom-foam-insulation", category: "insulation" },
  { keyword: "حقن خزانات المياه", href: "/insulation-services/tank-injection", category: "insulation" },
  { keyword: "عزل خزانات من الخارج", href: "/insulation-services/external-tank-thermal-insulation", category: "insulation" },
  { keyword: "عزل هناجر ومستودعات", href: "/insulation-services/large-area-thermal-insulation", category: "insulation" },
  { keyword: "عزل مساحات كبيرة", href: "/insulation-services/large-area-thermal-insulation", category: "insulation" },
  { keyword: "سعر متر العزل بجدة", href: "/insulation", category: "insulation" },
  { keyword: "أفضل شركة عزل بجدة", href: "/insulation", category: "insulation" },
  { keyword: "عزل بيتومين للأسطح", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "عزل سيكو بروف CIC", href: "/insulation", category: "insulation" },
  { keyword: "ضمان العزل 10 سنوات", href: "/insulation", category: "insulation" },
  { keyword: "علاج تسريب مياه السقف", href: "/services/azl-ashtof-jeddah", category: "insulation" },
  { keyword: "حل رطوبة الجدران جدة", href: "/insulation", category: "insulation" },

  // —— الفواتير والتشخيص ——
  { keyword: "ارتفاع فاتورة المياه جدة", href: "/blog/ارتفاع-فاتورة-المياه-جدة", category: "bill" },
  { keyword: "فاتورة المياه مرتفعة", href: "/blog/ارتفاع-فاتورة-المياه-جدة", category: "bill" },
  { keyword: "تسريب مياه خفي يرفع الفاتورة", href: "/blog/kaif-taktashif-tasarobat-almiyah", category: "bill" },
  { keyword: "كيف أكتشف تسرب المياه", href: "/blog/5-ayat-tasarab", category: "bill" },
  { keyword: "اختبار عداد المياه للتسرب", href: "/smart-leak-diagnosis", category: "bill" },
  { keyword: "علامات تسرب المياه في المنزل", href: "/blog/5-ayat-tasarab", category: "bill" },
  { keyword: "قراءة فاتورة المياه جدة", href: "/blog/irtifaa-fatura-almiyah-jeddah", category: "bill" },

  // —— أدوات ——
  { keyword: "مشخّص تسربات المياه", href: "/smart-leak-diagnosis", category: "tools" },
  { keyword: "تشخيص تسربات ذكي", href: "/smart-leak-diagnosis", category: "tools" },
  { keyword: "حجز فحص تسربات", href: "/contact", category: "tools" },
  { keyword: "معاينة عزل مجانية", href: "/contact", category: "tools" },

  // —— محلي ——
  { keyword: "كشف تسربات وعزل جدة", href: "/", category: "local" },
  { keyword: "خدمات عزل وتسربات جدة", href: "/services", category: "local" },
  { keyword: "أحياء جدة كشف تسربات", href: "/coverage", category: "local" },
  { keyword: "مدونة تسربات وعزل", href: "/blog", category: "local" },
  { keyword: "خطورة تسربات المياه", href: "/blog/خطورة-تسربات-المياه", category: "local" },
  { keyword: "عزل أسطح بجدة دليل", href: "/blog/عزل-أسطح-بجدة", category: "local" },
  { keyword: "موسوعة العزل والتسربات", href: "/#encyclopedia", category: "local" },
];

/** قائمة مسطحة بدون تكرار — لوسم meta keywords */
export const ALL_SITE_KEYWORDS: string[] = [
  ...new Set(KEYWORD_TOPICS.map((t) => t.keyword)),
];

/** أهم عبارات البحث — للعناوين والوصف الافتراضي */
export const PRIMARY_KEYWORDS = [
  "كشف تسربات المياه جدة",
  "عزل أسطح جدة",
  "كشف تسربات بدون تكسير",
  "عزل مائي وحراري بجدة",
  "عزل خزانات وفوم",
  "شركة كشف تسربات بجدة",
  "ارتفاع فاتورة المياه",
] as const;

export function getTopicsByCategory(category: KeywordCategory): KeywordTopic[] {
  return KEYWORD_TOPICS.filter((t) => t.category === category);
}

export function getTopicsGrouped(): { category: KeywordCategory; label: string; topics: KeywordTopic[] }[] {
  return (Object.keys(KEYWORD_CATEGORY_LABELS) as KeywordCategory[]).map((category) => ({
    category,
    label: KEYWORD_CATEGORY_LABELS[category],
    topics: getTopicsByCategory(category),
  }));
}

/** كلمات مفتاحية لصفحة معيّنة (لـ generateMetadata) */
export function keywordsForPath(path: string, extra: string[] = []): string[] {
  const fromTopics = KEYWORD_TOPICS.filter((t) => t.href === path || path.startsWith(t.href + "/")).map(
    (t) => t.keyword,
  );
  return [...new Set([...extra, ...fromTopics, ...PRIMARY_KEYWORDS])];
}

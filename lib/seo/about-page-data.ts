import { absUrl, siteConfig } from "@/lib/site-config";

export const ABOUT_PAGE_PATH = "/about" as const;

export const ABOUT_SEO = {
  title: "من نحن | شركة كشف تسربات وعزل المياه في جدة — خبرة ميدانية",
  description:
    "تعرف على جدة للتسربات والعزل: أكثر من 500 مشروع في جدة، أكثر من 10 سنوات خبرة، أجهزة كشف حديثة بدون تكسير، وضمان يصل إلى 10 سنوات على أعمال العزل.",
  keywords: [
    "من نحن شركة كشف تسربات جدة",
    "شركة عزل أسطح جدة",
    "خبرة كشف تسربات بدون تكسير",
    "فريق كشف تسربات المياه",
    "شركة عزل معتمدة جدة",
  ],
  ogTitle: `من نحن — ${siteConfig.name}`,
} as const;

export const ABOUT_HERO_STATS = [
  { value: "+500", label: "مشروع كشف وعزل منفّذ" },
  { value: "+10", label: "سنوات خبرة ميدانية" },
  { value: "60+", label: "حيّاً في جدة" },
  { value: "10", label: "سنوات ضمان على العزل" },
] as const;

export const ABOUT_FOUNDING = {
  heading: "متى بدأنا ولماذا؟",
  paragraphs: [
    `انطلقت ${siteConfig.name} من جدة قبل أكثر من عشر سنوات، عندما تكرّرت لدينا نفس الزيارة: مالك منزل يرى بقعة رطوبة أو فاتورة مياه مرتفعة دون أن يعرف مصدر المشكلة. قرّرنا أن نبني فريقاً لا يكتفي بالتخمين أو التكسير العشوائي، بل يعتمد على قياسات ميدانية وتقارير يفهمها العميل.`,
    "تراكمت خبرتنا في أحياء متنوعة — من فلل أبحر والشاطئ بأسطح واسعة، إلى عمائر وسط المدينة بخزانات علوية وشبكات قديمة، وصولاً إلى مبانٍ تجارية تحتاج استجابة سريعة. هذا السجل الميداني هو أساس صفحة «من نحن»: أرقام حقيقية، معدات محددة، وفرق نعرف دور كل فرد فيها.",
  ],
} as const;

export const ABOUT_SERVICE_CITIES = {
  heading: "نطاق عملنا في جدة",
  intro:
    "مقرّنا وفرقنا الميدانية في جدة. نغطي أكثر من 60 حياً داخل المدينة — وفي هذه الصفحة نُبرز أهم المناطق التي نزورها يومياً للكشف والعزل.",
  cities: [
    {
      name: "جدة",
      role: "التغطية الكاملة داخل المدينة",
      detail:
        "فلل، عمائر، مكاتب، ومحلات تجارية — مع استجابة للطوارئ وزيارات مجدولة في كل أنحاء المدينة.",
      href: "/coverage",
    },
  ],
  majorAreasHeading: "أبرز المناطق",
  majorAreas: [
    { label: "أبحر", href: "/coverage/jeddah/abhur" },
    { label: "الشاطئ", href: "/coverage/jeddah/al-shatie" },
    { label: "الروضة", href: "/coverage/jeddah/ar-rawdah" },
    { label: "الصفا", href: "/coverage/jeddah/as-safa" },
    { label: "الحمراء", href: "/coverage/jeddah/al-hamra" },
    { label: "المحمدية", href: "/coverage/jeddah/al-muhammadiyah" },
    { label: "السلامة", href: "/coverage/jeddah/al-salamah" },
    { label: "الحمدانية", href: "/coverage/jeddah/al-hamdaniyah" },
    { label: "البلد", href: "/coverage/jeddah/al-balad" },
    { label: "النزهة", href: "/coverage/jeddah/al-nuzhah" },
    { label: "العزيزية", href: "/coverage/jeddah/al-aziziyah" },
    { label: "الفيصلية", href: "/coverage/jeddah/al-faysaliyah" },
    { label: "النهضة", href: "/coverage/jeddah/al-nahdah" },
    { label: "الرحاب", href: "/coverage/jeddah/al-rehab" },
    { label: "أبحر الشمالية", href: "/coverage/jeddah/obhur-al-shamaliyah" },
    { label: "مشرفة", href: "/coverage/jeddah/mushrifah" },
  ],
} as const;

export const ABOUT_PROJECTS = {
  heading: "سجل المشاريع — أرقام لا شعارات",
  paragraphs: [
    "نفذت شركة جدة للعزل وكشف تسربات المياه مئات أعمال العزل وكشف التسربات داخل جدة باستخدام أجهزة حديثة وتقنيات معتمدة — لا نكتفي بذكر «خبرة طويلة» دون أن نُفصّل ماذا نفعل ميدانياً.",
    "تتنوّع مشاريعنا بين: كشف تسرب خفي خلف بلاط حمام في عمارة سكنية، عزل فوم حراري ومائي لسطح فيلا شمال جدة، إعادة عزل خزان أرضي بالإيبوكسي، فحص شبكة تكييف تسبب رطوبة سقف، ومعالجة ارتفاع فاتورة المياه بعد تتبع التسرب بالضغط والاستماع الصوتي.",
  ],
  highlights: [
    { value: "+500", label: "مشروع كشف أو عزل موثّق في السجل الميداني" },
    { value: "+1,200", label: "زيارة فنية ومعاينة ميدانية" },
    { value: "92%", label: "نسبة الحالات التي يُحدد فيها مصدر التسرب من الزيارة الأولى*" },
    { value: "24/7", label: "استجابة لحالات الطوارئ في جدة" },
  ],
  footnote:
    "* تقدير تشغيلي بناءً على مشاريع الكشف بدون تكسير؛ الحالات المعقدة قد تحتاج جولة متابعة أو فتحاً محدوداً بعد التشخيص.",
} as const;

export const ABOUT_SERVICE_GROUPS = [
  {
    title: "كشف تسربات المياه",
    items: [
      { label: "كشف تسربات المياه بجدة", href: "/services/kashf-tasribat-miah-jeddah" },
      { label: "كشف بدون تكسير", href: "/services/kashf-tasribat-bedun-taksir-jeddah" },
      { label: "كشف تسربات الخزانات", href: "/services/kashf-tasribat-al-khazanat-jeddah" },
      { label: "كشف تسربات المسابح", href: "/services/kashf-tasribat-al-masabih-jeddah" },
      { label: "كشف تسربات مياه التكييف", href: "/services/kashf-tasribat-miah-al-takyeef-jeddah" },
      { label: "المشخّص الذكي للتسربات", href: "/smart-leak-diagnosis" },
    ],
  },
  {
    title: "العزل المائي والحراري",
    items: [
      { label: "عزل أسطح بجدة", href: "/services/azl-ashtof-jeddah" },
      { label: "عزل فوم بولي يوريثان", href: "/services/azl-fom-jeddah" },
      { label: "عزل مائي وحراري", href: "/services/azl-maei-jeddah" },
      { label: "عزل حراري للأسطح", href: "/services/azl-harari-jeddah" },
      { label: "عزل خزانات وإيبوكسي", href: "/services/azl-khazanat-jeddah" },
      { label: "دليل خدمات العزل التفصيلي", href: "/insulation" },
    ],
  },
] as const;

export const ABOUT_EQUIPMENT = {
  heading: "المعدات والتقنيات التي نستخدمها",
  intro:
    "لا نعتمد على «الخبرة وحدها». كل زيارة كشف تُجهَّز حسب نوع المشكلة — حمام، خزان، سطح، أو شبكة مدفونة — بخليط من الأجهزة التالية:",
  categories: [
    {
      title: "تشخيص التسربات",
      tools: [
        "كاميرات تصوير حراري بالأشعة تحت الحمراء (Thermal Imaging) لرصد الرطوبة خلف الجدران والأسقف",
        "أجهزة استماع صوتي فائق الحساسية (Acoustic Leak Detection) لتحديد موضع التسرب عبر الخرسانة والبلاط",
        "أجهزة قياس الرطوبة في مواد البناء (Moisture Meter) دون ثقوب",
        "كاشفات مسار المواسير (Pipe Locator) لرسم الشبكات المدفونة قبل أي تدخل",
        "اختبار ضغط النيتروجين وتتبع الغاز (Gas Tracer) للشبكات المغلقة",
        "كاميرات فحص داخلية للمواسير (Endoscopy / Pipe Inspection Camera)",
        "رادار أرضي (GPR) عند الحاجة لكشف التسربات تحت الأرضيات السميكة",
      ],
    },
    {
      title: "تنفيذ العزل",
      tools: [
        "أنظمة رش فوم بولي يوريثان (PU Foam) للأسطح والحمامات",
        "لفائف البيتومين المعدّلة (APP/SBS) للعزل المائي",
        "أنظمة طلاء إيبوكسي للخزانات الأرضية والعلوية",
        "مواد حقن وعزل للشروخ والوصلات في الخزانات",
        "معايرة ميول الصرف واختبار مياه الأمطار بعد عزل الأسطح",
      ],
    },
  ],
} as const;

export const ABOUT_TEAM = {
  heading: "فريق العمل",
  intro:
    "متخصصون بأسماء وخبرات محددة — من كشف التسربات إلى عزل الأسطح والخزانات. إليكم جزءاً من الفريق؛ الباقي في صفحة الفريق الكاملة.",
} as const;

export function buildAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "من نحن", item: absUrl(ABOUT_PAGE_PATH) },
        ],
      },
      {
        "@type": "AboutPage",
        "@id": `${absUrl(ABOUT_PAGE_PATH)}#webpage`,
        url: absUrl(ABOUT_PAGE_PATH),
        name: ABOUT_SEO.ogTitle,
        description: ABOUT_SEO.description,
        inLanguage: "ar-SA",
        isPartOf: { "@id": absUrl("/") + "#website" },
        about: {
          "@type": "Organization",
          name: siteConfig.name,
          alternateName: siteConfig.nameEn,
          url: absUrl("/"),
          description: ABOUT_SEO.description,
          areaServed: [{ "@type": "City", name: "جدة", alternateName: "Jeddah" }],
          knowsAbout: [
            "كشف تسربات المياه",
            "عزل أسطح",
            "عزل خزانات",
            "عزل فوم",
            "كشف تسربات بدون تكسير",
          ],
        },
      },
    ],
  };
}

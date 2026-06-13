import { SCHEMA_ORGANIZATION_ID } from "@/lib/seo/schema-ids";
import { absUrl, siteConfig } from "@/lib/site-config";

export const TEAM_PAGE_PATH = "/team" as const;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  highlights: readonly string[];
  initials: string;
};

export const TEAM_SEO = {
  title: "فريق العمل | متخصصو كشف تسربات وعزل المياه في جدة بخبرة ميدانية",
  description:
    "تعرّف على فريق جدة للتسربات والعزل: مهندسون وفنيون ميدانيون بخبرة 6–12 سنة في كشف التسربات بدون تكسير وعزل الأسطح والخزانات في أحياء جدة.",
  keywords: [
    "فريق كشف تسربات جدة",
    "مهندس عزل أسطح جدة",
    "فني كشف تسربات بدون تكسير",
    "شركة عزل معتمدة جدة",
  ],
  ogTitle: `فريق العمل — ${siteConfig.name}`,
} as const;

export const TEAM_INTRO = {
  heading: "فريقنا الميداني في جدة",
  paragraphs: [
    "وراء كل زيارة كشف أو عزل يقف متخصصون بأسماء وخبرات محددة — لا «فريق مجهول». نعرض هنا من يُشرف على تشخيص التسربات وتنفيذ العزل في مشاريعكم السكنية والتجارية.",
    "كل عضو في الفريق يعمل ضمن مسار واضح: معاينة، تقرير، تنفيذ، وتسليم — مع إمكانية التواصل عبر قنوات الشركة الرسمية لأي استفسار فني.",
  ],
} as const;

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "ahmed-fathy",
    name: "أحمد فتحي",
    role: "مدير التقنية والذكاء الاصطناعي",
    experienceYears: 8,
    bio: "يُطوّر حلول الذكاء الاصطناعي والأنظمة التقنية لدعم كشف التسربات وتحليل البيانات الميدانية — ويربط بين نتائج الفحص وقرارات الإصلاح في مشاريع جدة.",
    highlights: [
      "نماذج تشخيص ذكي لتسربات المياه",
      "تحليل بيانات الفحص والتقارير الفنية",
      "أتمتة دعم القرار للفريق الميداني",
    ],
    initials: "أ ف",
  },
  {
    id: "mohammed-ahmed",
    name: "م. محمد أحمد",
    role: "متخصص كشف تسربات المياه",
    experienceYears: 10,
    bio: "أشرف على عشرات المشاريع السكنية والتجارية في جدة — من فلل أبحر إلى عمائر وسط المدينة.",
    highlights: [
      "كاميرا حرارية وكشف صوتي بدون تكسير",
      "تقارير فنية لشركة المياه الوطنية",
      "تشخيص تسربات الحمامات والخزانات",
    ],
    initials: "م أ",
  },
  {
    id: "khalid-alomari",
    name: "م. خالد سالم العمري",
    role: "مهندس عزل أسطح",
    experienceYears: 12,
    bio: "خبرة في عزل الفوم الحراري والمائي ولفائف البيتومين لأسطح الفلل والعمائر في شمال ووسط جدة.",
    highlights: [
      "معاينة ميول الصرف قبل التنفيذ",
      "عزل فوم بولي يوريثان وAPP/SBS",
      "اختبار نهائي بعد الأمطار",
    ],
    initials: "خ ع",
  },
  {
    id: "saad-alghamdi",
    name: "أ. سعد عبدالرحمن الغامدي",
    role: "مشرف مواقع",
    experienceYears: 8,
    bio: "يتابع جودة التحضير والتنفيذ على الأرض ويُسلّم العميل ضماناً مكتوباً يصل إلى 10 سنوات على أعمال العزل.",
    highlights: [
      "متابعة فرق التنفيذ يومياً",
      "توثيق مراحل العمل بالصور",
      "تسليم موقع نظيف وآمن",
    ],
    initials: "س غ",
  },
  {
    id: "fahad-alzahrani",
    name: "م. فهد محمد الزهراني",
    role: "متخصص عزل خزانات",
    experienceYears: 9,
    bio: "يركّز على عزل الخزانات الأرضية والعلوية بالإيبوكسي وحقن الشروخ — من أكثر المشاركات تكراراً في جدة.",
    highlights: [
      "تنظيف وتجهيز سطح الخزان",
      "أنظمة إيبوكسي متعددة الطبقات",
      "فحص ما بعد العزل",
    ],
    initials: "ف ز",
  },
  {
    id: "abdullah-alharbi",
    name: "م. عبدالله الحربي",
    role: "فني كشف إلكتروني",
    experienceYears: 7,
    bio: "متخصص في أجهزة تتبع الغاز واختبار الضغط والرادار الأرضي لتحديد التسربات المدفونة بدقة.",
    highlights: [
      "GPR وPipe Locator",
      "اختبار ضغط النيتروجين",
      "كشف شبكات التكييف والصرف",
    ],
    initials: "ع ح",
  },
  {
    id: "noura-alqahtani",
    name: "أ. نورة القحطاني",
    role: "منسقة فنية ودعم",
    experienceYears: 6,
    bio: "تُنسّق المواعيد وتُعدّ التقارير للعملاء وتتابع معهم حتى إغلاق الملف — خاصة عند ارتفاع فاتورة المياه.",
    highlights: [
      "استقبال طلبات المعاينة",
      "متابعة حالة التقرير",
      "تنسيق زيارات المتابعة",
    ],
    initials: "ن ق",
  },
] as const;

export function buildTeamPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "فريق العمل", item: absUrl(TEAM_PAGE_PATH) },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${absUrl(TEAM_PAGE_PATH)}#webpage`,
        url: absUrl(TEAM_PAGE_PATH),
        name: TEAM_SEO.ogTitle,
        description: TEAM_SEO.description,
        inLanguage: "ar-SA",
        about: { "@id": SCHEMA_ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: TEAM_MEMBERS.map((member, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Person",
              name: member.name,
              jobTitle: member.role,
              description: member.bio,
              worksFor: { "@id": SCHEMA_ORGANIZATION_ID },
              knowsAbout: [...member.highlights],
            },
          })),
        },
      },
    ],
  };
}

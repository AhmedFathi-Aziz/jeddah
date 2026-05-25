import { getDistrictProfile } from "@/lib/seo/coverage-district-profiles";
import type { DistrictRichContent } from "@/lib/seo/coverage-district-types";
import { generatedHighlight, getDistrictHighlight } from "@/lib/seo/coverage-district-highlights";

function stripDistrictPrefix(district: string): string {
  return district.replace(/^حي\s+/, "");
}

function buildSearchPhrases(district: string, slug: string): string[] {
  const short = stripDistrictPrefix(district);
  const base = [
    `كشف تسربات المياه في ${district} جدة`,
    `شركة كشف تسربات ${short}`,
    `عزل أسطح ${short} جدة`,
    `عزل خزانات ${short}`,
    `كشف تسربات بدون تكسير ${short}`,
    `فني كشف تسربات ${district}`,
    `ارتفاع فاتورة المياه ${short}`,
    `تقرير كشف تسربات ${short}`,
    `عزل فوم ${short}`,
    `كشف تسربات ${slug} جدة`,
  ];
  return [...new Set(base)];
}

function buildBaseFaq(district: string, cityAr: string): { question: string; answer: string }[] {
  return [
    {
      question: `هل تقدمون كشف تسربات المياه في ${district} بجدة؟`,
      answer: `نعم، نغطي ${district} ضمن ${cityAr} بزيارات ميدانية وفحص حراري وصوتي، مع تقرير يوضح مصدر المشكلة قبل أي إصلاح.`,
    },
    {
      question: `كم يستغرق كشف التسرب في ${district}؟`,
      answer: `الشقة الصغيرة غالبًا 45–90 دقيقة. الفلل والعمائر الكبيرة قد تحتاج ساعتين أو أكثر حسب عدد الحمامات والخزانات؛ نعطيك تقديرًا بعد وصف الحالة.`,
    },
    {
      question: `هل يمكن الكشف بدون تكسير في ${district}؟`,
      answer: `نعم، نحدد النقطة إلكترونيًا أولًا. أحيانًا يُفتح موضع ضيق فوق النقطة المؤكدة فقط — وليس هدم حمام كامل.`,
    },
    {
      question: `ما خدمات العزل المتوفرة في ${district}؟`,
      answer: `عزل أسطح (فوم وبيتومين)، عزل خزانات بالإيبوكسي، وعزل حمامات بالفوم — بعد معاينة ميدانية تُحدد المادة والسعر لكل متر.`,
    },
    {
      question: `هل تقدمون تقريرًا لشركة المياه الوطنية من ${district}؟`,
      answer: `نوفر تقريرًا فنيًا يوثّق نتيجة الفحص عند الحاجة لمتابعة الفاتورة أو الإثبات الرسمي، وفق ما يُقاس ميدانيًا.`,
    },
    {
      question: `متى أطلب معاينة عاجلة في ${district}؟`,
      answer: `عند ارتفاع مفاجئ في الفاتورة، رطوبة متوسعة، صوت مياه في الجدار، أو تحرك العداد بعد إغلاق المحابس.`,
    },
  ];
}

/** محتوى دسم ومميز لصفحة الحي */
export function getDistrictRichContent(
  slug: string,
  district: string,
  cityAr: string,
): DistrictRichContent {
  const profile = getDistrictProfile(slug);
  const highlight = profile
    ? {
        intro: profile.character,
        painPoint: profile.issues[0]?.detail ?? "",
        focus: profile.inspectionPriorities[0] ?? "",
        note: profile.seasonalNote,
        localContext: profile.insulationFocus,
      }
    : getDistrictHighlight(slug, district);

  if (!profile) {
    const fallbackHighlight =
      highlight.intro === generatedHighlight(slug, district).intro
        ? getDistrictHighlight(slug, district)
        : highlight;
    return {
      highlight: fallbackHighlight,
      heroExtra: `نقدم في ${district} كشف تسربات المياه والعزل المائي والحراري بخطة واضحة: معاينة، فحص، تقرير، ثم إصلاح أو عزل يناسب منزلك أو عمارتك.`,
      buildingProfile: [
        `يختلف ${district} في نوع المباني والشبكات؛ لذلك نبدأ بمعاينة ميدانية قبل أي تكسير أو عزل.`,
      ],
      servicesDetail: [
        `فحص دقيق للتسربات في ${district} بوسائل غير هدّامة قدر الإمكان، مع تقرير يوضح مصدر المشكلة.`,
        `عزل مائي وحراري للأسطح والخزانات والحمامات حسب حالة المبنى ومناخ ${cityAr}.`,
        `عند ارتفاع الفاتورة أو بقع الرطوبة، ننصح بمعاينة مبكرة في ${district} قبل توسّع الضرر.`,
      ],
      inspectionSteps: [
        `الاتصال والحجز: نستقبل طلبك في ${district} ونحدد موعدًا مناسبًا.`,
        "الفحص الإلكتروني: أجهزة حرارية وصوتية لتحديد مصدر التسرب.",
        "تحديد المشكلة: توثيق النقطة في الخزان أو الحمام أو السطح.",
        "الإصلاح والضمان: معالجة بالخامات المناسبة مع توضيح الضمان.",
      ],
      problemAnalysis: [
        `تختلف طبيعة التسربات بين الشقق والفلل والعمائر في ${district}.`,
        `نهجنا: تحديد النقطة أولًا ثم أقل تدخل ممكن — يحمي التشطيبات في ${district}.`,
        "بعد التشخيص نوضح خيارات الإصلاح أو العزل بخطة مكتوبة.",
      ],
      insulationParagraphs: [
        `عزل الأسطح والخزانات في ${district} يُحدد بعد معاينة: فوم، بيتومين، أو إيبوكسي حسب الحالة.`,
      ],
      scenarios: [],
      tips: [
        "إغلاق المحابس الرئيسية عند مغادرة المنزل لفترات طويلة.",
        "فحص الخزان دوريًا.",
        "مراقبة عداد المياه عند عدم الاستهلاك.",
        `طلب تقرير كشف معتمد عند ارتفاع الفاتورة في ${district}.`,
      ],
      quickFacts: [
        `نطاق الخدمة: ${district} ومحيطه داخل ${cityAr}.`,
        "الفحص: تشخيص إلكتروني قبل أي معالجة.",
        "العزل: أسطح، خزانات، حمامات.",
        "التقرير: توثيق فني عند الحاجة.",
      ],
      searchPhrases: buildSearchPhrases(district, slug),
      faq: buildBaseFaq(district, cityAr),
      neighborSlugs: [],
    };
  }

  const buildingProfile = [
    profile.character,
    `أنواع المباني السائدة في ${district}: ${profile.buildingTypes.join("، ")}.`,
    profile.seasonalNote,
  ];

  const servicesDetail = [
    `في ${district} نعالج ${profile.issues[0].title}: ${profile.issues[0].detail}`,
    `حالة شائعة ثانية — ${profile.issues[1].title}: ${profile.issues[1].detail}`,
    `ننفذ ${profile.insulationFocus}`,
    `للحالات ${profile.issues[2].title} و${profile.issues[3].title} نتبع نفس المنهج: كشف إلكتروني، تقرير، ثم إصلاح أو عزل بخطة مكتوبة قبل التنفيذ.`,
  ];

  const problemAnalysis = profile.issues.map(
    (issue) => `${issue.title}: ${issue.detail} هذا النمط متكرر في ${district} ويتطلب تشخيصًا قبل أي تكسير.`,
  );

  const inspectionSteps = profile.inspectionPriorities.map(
    (step, i) => `المرحلة ${i + 1}: ${step}`,
  );

  const insulationParagraphs = [
    profile.insulationFocus,
    `بالنسبة لـ${profile.issues[2].title} في ${district}، ندمج بين الإصلاح والعزل الوقائي عند الحاجة.`,
    profile.seasonalNote,
  ];

  const quickFacts = [
    `نطاق الخدمة: ${district} ومحيطه داخل ${cityAr}.`,
    `طبيعة المنطقة: ${profile.buildingTypes.slice(0, 2).join(" و")}.`,
    `أولوية الفحص: ${profile.inspectionPriorities[0]}`,
    `موسميًا: ${profile.seasonalNote.slice(0, 80)}${profile.seasonalNote.length > 80 ? "…" : ""}`,
  ];

  const faq = [...buildBaseFaq(district, cityAr), ...profile.extraFaqs];

  return {
    highlight: {
      intro: profile.character,
      painPoint: `${profile.issues[0].title} — ${profile.issues[0].detail}`,
      focus: profile.inspectionPriorities.join(" "),
      note: profile.seasonalNote,
      localContext: profile.insulationFocus,
    },
    heroExtra: `فريقنا يخدم ${district} ضمن ${cityAr} بخطة ميدانية واضحة: معاينة، فحص إلكتروني، تقرير مفصل، ثم إصلاح أو عزل يناسب نوع المبنى في حيّك — دون تكسير عشوائي.`,
    buildingProfile,
    servicesDetail,
    inspectionSteps,
    problemAnalysis,
    insulationParagraphs,
    scenarios: profile.scenarios,
    tips: profile.tips,
    quickFacts,
    searchPhrases: buildSearchPhrases(district, slug),
    faq,
    neighborSlugs: profile.neighbors,
  };
}

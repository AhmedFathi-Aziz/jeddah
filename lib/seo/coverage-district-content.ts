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

function districtSeed(slug: string, salt = 0): number {
  let h = salt;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pickVariant<T>(slug: string, salt: number, options: readonly T[]): T {
  return options[districtSeed(slug, salt) % options.length];
}

function buildBaseFaq(
  district: string,
  cityAr: string,
  slug: string,
): { question: string; answer: string }[] {
  const short = stripDistrictPrefix(district);
  return [
    {
      question: `هل تقدمون كشف تسربات المياه في ${district} بجدة؟`,
      answer: pickVariant(slug, 1, [
        `نعم، نغطي ${district} ضمن ${cityAr} بزيارات ميدانية وفحص حراري وصوتي، مع تقرير يوضح مصدر المشكلة قبل أي إصلاح.`,
        `فريقنا يصل إلى ${short} في جدة بخطة فحص واضحة: معاينة، تشخيص إلكتروني، ثم تقرير مكتوب قبل التكسير.`,
        `نخدم سكان ${district} بكشف تسربات وعزل — نبدأ بتحديد نوع المبنى في الحي ثم نختار أجهزة الفحص المناسبة.`,
      ]),
    },
    {
      question: `كم يستغرق كشف التسرب في ${district}؟`,
      answer: pickVariant(slug, 2, [
        `الشقة الصغيرة في ${short} غالبًا 45–90 دقيقة. الفلل والعمائر قد تحتاج ساعتين أو أكثر حسب عدد الحمامات والخزانات.`,
        `في ${district} نحدد المدة بعد وصف الأعراض: شقة واحدة غالبًا أقل من ساعة؛ فيلا بخزانين قد تحتاج نصف يوم.`,
        `معظم زيارات ${short} تنتهي في زيارة واحدة. الحالات المعقدة (خط مشترك أو أكثر من طابق) قد تتطلب جولة ثانية.`,
      ]),
    },
    {
      question: `هل يمكن الكشف بدون تكسير في ${district}؟`,
      answer: pickVariant(slug, 3, [
        `نعم، نحدد النقطة إلكترونيًا أولًا في ${district}. أحيانًا يُفتح موضع ضيق فوق النقطة المؤكدة فقط — وليس هدم حمام كامل.`,
        `في ${short} نعتمد مسحًا حراريًا وصوتيًا قبل أي كسر. التكسير يقتصر على نقطة واحدة مؤكدة عند الحاجة للإصلاح.`,
        `سكان ${district} يطلبون غالبًا فحصًا غير تدميري — نلتزم بذلك ونوثّق موضع التسرب في التقرير قبل فتح الجدار.`,
      ]),
    },
    {
      question: `ما خدمات العزل المتوفرة في ${district}؟`,
      answer: pickVariant(slug, 4, [
        `عزل أسطح (فوم وبيتومين)، عزل خزانات بالإيبوكسي، وعزل حمامات بالفوم في ${district} — بعد معاينة تُحدد المادة والسعر.`,
        `في ${short} ننفذ عزل مائي وحراري للأسطح، عزل داخلي للخزانات، وعزل حمامات — حسب عمر المبنى وحالة السطح.`,
        `خدمات ${district} تشمل فوم بولي يوريثان، لفائف بيتومين، وإيبوكسي للخزانات؛ المعاينة تحدد الأنسب لمناخ جدة.`,
      ]),
    },
    {
      question: `هل تقدمون تقريرًا لشركة المياه الوطنية من ${district}؟`,
      answer: pickVariant(slug, 5, [
        `نوفر تقريرًا فنيًا لسكان ${district} يوثّق نتيجة الفحص عند متابعة الفاتورة أو الإثبات الرسمي.`,
        `عند طلب تقرير من ${short}، نوضّح ما تم قياسه ميدانيًا — دون وعود خارج نطاق الفحص الفعلي.`,
        `كثير من طلبات ${district} تكون لتوثيق عدم وجود تسرب داخلي؛ نُسلّم تقريرًا واضحًا عند اكتمال الفحص.`,
      ]),
    },
    {
      question: `متى أطلب معاينة عاجلة في ${district}؟`,
      answer: pickVariant(slug, 6, [
        `في ${short} عند ارتفاع مفاجئ في الفاتورة، رطوبة متوسعة، صوت مياه في الجدار، أو تحرك العداد بعد إغلاق المحابس.`,
        `اطلب زيارة سريعة لـ${district} إذا ظهرت بقعة جديدة على السقف، أو رائحة عفن، أو ضعف ضغط مفاجئ.`,
        `لا تؤجل في ${district} إذا تحرك العداد ليلًا، أو تسرب الماء من سقف الحمام إلى الجار — كل يوم تأخير يزيد التلف.`,
      ]),
    },
  ];
}

/** محتوى دسم ومميز لصفحة الحي */
export function getDistrictRichContent(
  slug: string,
  district: string,
  cityAr: string,
): DistrictRichContent {
  const short = stripDistrictPrefix(district);
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
      heroExtra: pickVariant(slug, 7, [
        `نقدم في ${district} كشف تسربات المياه والعزل المائي والحراري بخطة واضحة: معاينة، فحص، تقرير، ثم إصلاح أو عزل يناسب منزلك أو عمارتك.`,
        `سكان ${short} في جدة يحصلون على مسار واحد: تشخيص التسرب أولًا، ثم عزل وقائي إن لزم — دون خلط بين سبب المشكلة وعلاجها.`,
        `في ${district} نربط بين كشف التسربات وعزل الأسطح والخزانات: لأن العزل فوق تسرب نشط يضيع استثمارك.`,
      ]),
      buildingProfile: [
        pickVariant(slug, 8, [
          `يختلف ${district} في نوع المباني والشبكات؛ لذلك نبدأ بمعاينة ميدانية قبل أي تكسير أو عزل.`,
          `مباني ${short} تتراوح بين عمائر قديمة وفلل حديثة — نعدّل خطة الفحص حسب عمر المبنى ونوع التمديدات.`,
          `في ${district} نلاحظ أن أنماط التسرب تختلف بين الشقق العلوية والفلل بخزان أرضي؛ المعاينة تحدد المسار.`,
        ]),
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
      faq: buildBaseFaq(district, cityAr, slug),
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

  const faq = [...buildBaseFaq(district, cityAr, slug), ...profile.extraFaqs];

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

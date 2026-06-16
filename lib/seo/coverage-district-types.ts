/** تصنيف الحي — يحدد قوالب المحتوى الأساسية مع تخصيص لكل slug */
export type DistrictArchetype =
  | "coastal"
  | "historic"
  | "north-villa"
  | "central-urban"
  | "southern-dense"
  | "eastern-industrial"
  | "western-residential"
  | "suburban-new";

export type DistrictIssue = {
  title: string;
  detail: string;
};

export type DistrictScenario = {
  title: string;
  body: string;
};

/** بيانات فريدة لكل حي — مصدر المحتوى الدسم */
export type CoverageDistrictProfile = {
  slug: string;
  archetype: DistrictArchetype;
  /** وصف الحي وطبيعة السكن (فريد) */
  character: string;
  /** أنواع المباني السائدة */
  buildingTypes: string[];
  /** مشكلات شائعة في هذا الحي فقط */
  issues: DistrictIssue[];
  /** أولويات الفحص الميداني */
  inspectionPriorities: string[];
  /** فقرة عزل مخصّصة */
  insulationFocus: string;
  /** ملاحظة موسمية/مناخية */
  seasonalNote: string;
  /** حالتان واقعيتان */
  scenarios: DistrictScenario[];
  /** نصائح محلية (6 على الأقل) */
  tips: string[];
  /** أسئلة إضافية فريدة (2–3) */
  extraFaqs: { question: string; answer: string }[];
  /** أحياء مجاورة للربط الداخلي */
  neighbors: string[];
};

export type DistrictRichContent = {
  highlight: {
    intro: string;
    painPoint: string;
    focus: string;
    note: string;
    localContext?: string;
  };
  heroExtra: string;
  buildingProfile: string[];
  servicesDetail: string[];
  inspectionSteps: string[];
  problemAnalysis: string[];
  insulationParagraphs: string[];
  scenarios: DistrictScenario[];
  tips: string[];
  quickFacts: string[];
  searchPhrases: string[];
  faq: { question: string; answer: string }[];
  neighborSlugs: string[];
  /** محتوى موسّع من ملف Markdown — أقسام فريدة لكل حي */
  extended?: DistrictExtendedSections;
  seoTitle?: string;
  metaDescription?: string;
  pageH1?: string;
  internalLinks?: { href: string; label: string }[];
  imageAlts?: string[];
};

export type DistrictPropertyTypeBlock = {
  title: string;
  body: string;
};

export type DistrictProcessStep = {
  title: string;
  body: string;
};

export type DistrictExtendedSections = {
  introduction: string[];
  aboutDistrict: string[];
  propertyTypes: DistrictPropertyTypeBlock[];
  commonProblems: string[];
  howWeServe: DistrictProcessStep[];
  benefits: string[];
  trustPoints: string[];
  conclusion: string[];
};

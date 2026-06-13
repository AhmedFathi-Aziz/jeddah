import { SCHEMA_LOCAL_BUSINESS_ID } from "@/lib/seo/schema-ids";
import { absImageSrc, absUrl, siteConfig } from "@/lib/site-config";
import { images } from "@/lib/images";

export const INSULATION_PAGE_PATH = "/insulation" as const;

export const INSULATION_SEO = {
  title: "شركة عزل بجدة | عزل مائي وحراري للأسطح والخزانات بمعاينة مجانية",
  description:
    "شركة عزل بجدة: عزل أسطح وخزانات وحمامات بفوم وبيتومين وإيبوكسي، ضمان 10 سنوات، معاينة مجانية، وتنفيذ ميداني منظم. احجز فريقنا المتخصص في جدة.",
  keywords: [
    "شركة عزل بجدة",
    "عزل مائي وحراري بجدة",
    "عزل أسطح بجدة",
    "عزل خزانات بجدة",
    "عزل فوم بجدة",
    "سعر متر العزل بجدة",
    "عزل حراري للأسطح",
  ],
  ogTitle: `شركة عزل بجدة — ${siteConfig.name}`,
} as const;

export const INSULATION_FAQ = [
  {
    question: "ما أفضل عزل للأسطح في جدة: فوم أم بيتومين أم سيكو بروف؟",
    answer:
      "يعتمد على نوع السطح وحالته. الفوم (بولي يوريثان) يجمع عزل حراري ومائي — مثالي للفلل. البيتومين (APP/SBS) مناسب للأسطح الخرسانية التقليدية. السيكو بروف (CIC) قوي للعزل المائي المعرّض للأمطار. نحدد الخيار بعد معاينة ميدانية في جدة.",
  },
  {
    question: "كم سعر متر العزل بجدة؟",
    answer:
      "يختلف حسب المادة (فوم، بيتومين، إيبوكسي)، حالة السطح أو الخزان، والسماكة المطلوبة. نقدّم معاينة مجانية وتقديراً واضحاً بعد رؤية الموقع — لا نسعّر عن بُعد دون فحص.",
  },
  {
    question: "هل تقدمون ضماناً على أعمال العزل؟",
    answer:
      "نعم. نمنح ضماناً يصل إلى 10 سنوات على أعمال العزل المنفّذة بمواد معتمدة وتنفيذ سليم — مع توضيح ما يدخل تحت الضمان وشروط الصيانة الدورية للمصارف والسطح.",
  },
  {
    question: "متى أحتاج عزل خزان المياه في جدة؟",
    answer:
      "عند ظهور رطوبة على جدار الخزان، ملوحة خضراء، ارتفاع استهلاك مرتبط بالخزان، أو قبل استلام عقار قديم. العزل بالإيبوكسي من الداخل أو العزل الحراري من الخارج يقلل التسرب ويحمي جودة المياه.",
  },
  {
    question: "لماذا يرتفع استهلاك الكهرباء مع ضعف العزل في جدة؟",
    answer:
      "الأسطح غير المعزّلة تمرّر حرارة الشمس إلى الداخل، فيعمل التكييف وقتاً أطول. العزل الحراري للأسطح يخفّض الحمل على المكيّف — خاصة في صيف جدة الطويل والرطوبة الساحلية.",
  },
  {
    question: "ما أهمية عزل الحمام قبل تركيب السيراميك؟",
    answer:
      "تجاهل العزل عند التجديد من أشهر أسباب تسرب المياه بين الطوابق. عزل أرضية الحمام بالفوم أو البيتومين قبل السباكة والبلاط يمنع رطوبة تصل للجيران أو للسقف السفلي.",
  },
  {
    question: "هل تفحصون التسرب قبل العزل؟",
    answer:
      "نعم عند وجود رطوبة أو بقع نشطة. نربطك بخدمة كشف التسربات أو نُدمج الفحص في الزيارة — العزل فوق تسرب غير معالج يضيع استثمارك.",
  },
  {
    question: "هل تغطون جميع أحياء جدة؟",
    answer:
      "نعمل داخل نطاق مدينة جدة — 60 حيّاً. راجع صفحة التغطية لاختيار حيّك، أو اتصل لتحديد موعد معاينة في منطقتك.",
  },
] as const;

export function buildInsulationFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSULATION_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildInsulationServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "شركة عزل بجدة — عزل مائي وحراري",
    description: INSULATION_SEO.description,
    url: absUrl(INSULATION_PAGE_PATH),
    image: absImageSrc(images.insulationFoamSpray.src),
    provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "جدة",
      containedInPlace: { "@type": "Country", name: "المملكة العربية السعودية" },
    },
    serviceType: "عزل مائي وحراري",
  };
}

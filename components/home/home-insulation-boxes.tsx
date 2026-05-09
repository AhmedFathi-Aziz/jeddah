import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const insulationTopics = [
  {
    slug: "thermal-insulation",
    title: "عزل حراري",
    summary:
      "تقليل انتقال الحرارة داخل المبنى لتحسين الراحة وتقليل استهلاك أجهزة التكييف خصوصًا في أشهر الصيف.",
  },
  {
    slug: "tank-epoxy-insulation",
    title: "عزل الخزانات + إيبوكسي",
    summary:
      "تنظيف وتجهيز الخزان ثم تطبيق نظام عزل مناسب مع طبقات إيبوكسي لحماية أفضل ومتانة أطول.",
  },
  {
    slug: "bathroom-foam-insulation",
    title: "عزل الحمامات بالفوم",
    summary:
      "تطبيق عزل فوم في المناطق المناسبة لمنع تسرب المياه إلى الأسقف والجدران المجاورة بشكل فعّال.",
  },
  {
    slug: "thermal-bathroom-insulation",
    title: "عزل حمامات حراري",
    summary:
      "حلول عزل حراري للحمامات لتقليل تأثير الرطوبة والحرارة على التشطيبات وتحسين ثبات البيئة الداخلية.",
  },
  {
    slug: "tank-injection",
    title: "حقن خزانات",
    summary:
      "معالجة الشروخ الدقيقة ومواضع الرشح بتقنيات الحقن المناسبة لوقف التسرب وإعادة كفاءة الخزان.",
  },
  {
    slug: "external-tank-thermal-insulation",
    title: "عزل خزانات من الخارج - عزل حراري",
    summary:
      "تنفيذ عزل خارجي للخزانات مع دعم حراري يخفف تأثير الشمس المباشر ويحافظ على استقرار الأداء.",
  },
  {
    slug: "large-area-thermal-insulation",
    title: "عزل حراري لمساحات كبيرة",
    summary:
      "خطط تنفيذ منظمة للمصانع والمستودعات والأسطح الكبيرة مع توزيع فرق العمل لضمان سرعة وجودة التنفيذ.",
  },
  {
    slug: "foam-thermal-waterproof-insulation",
    title: "عزل فوم حراري ومائي",
    summary:
      "نظام يجمع العزل الحراري والمائي في طبقة متماسكة واحدة لنتيجة قوية ومناسبة لطبيعة المناخ الساحلي.",
  },
] as const;

export function HomeInsulationBoxes() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14" aria-labelledby="insulation-boxes-heading">
      <header className="mb-8 text-right">
        <h3 id="insulation-boxes-heading" className="text-2xl font-extrabold text-[#173f55] md:text-3xl">
          حلول العزل المتخصصة
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
          اختر نوع الخدمة المناسبة لمشروعك، وسننفذها بخطة واضحة ومعايير فنية دقيقة.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insulationTopics.map((topic) => (
          <Link
            key={topic.title}
            href={`/insulation-services/${topic.slug}`}
            className="rounded-2xl border border-[#d7e8ee] bg-white p-5 text-right shadow-[0_12px_28px_-24px_rgba(20,67,86,0.8)] transition-transform hover:-translate-y-0.5"
          >
            <div className="mb-3 flex justify-end">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#e8f5f7] text-[#2f7f86]">
                <CheckCircle2 className="size-5" aria-hidden />
              </span>
            </div>
            <h4 className="text-lg font-extrabold leading-7 text-[#173f55]">{topic.title}</h4>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{topic.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

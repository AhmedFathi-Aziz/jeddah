import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getInsulationServiceBySlug, insulationServices } from "@/lib/insulation-services";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

const sectionTitles = [
  "لماذا تحتاج هذه الخدمة؟",
  "كيف ننفذ الخدمة ميدانياً؟",
  "المواد والتقنيات المستخدمة",
  "الأخطاء الشائعة التي نعالجها",
  "خطة الفحص قبل التنفيذ",
  "خطة الضبط أثناء التنفيذ",
  "معايير الجودة بعد التسليم",
  "تأثير الخدمة على خفض التكاليف",
  "أفضل توقيت لتنفيذ الخدمة",
  "نصائح للحفاظ على النتيجة",
  "خطة الصيانة الدورية",
  "أسئلة يتكرر طرحها من العملاء",
] as const;

function buildLongContent(serviceTitle: string): string[] {
  const baseSentences = [
    `تبدأ خدمة ${serviceTitle} من فهم حالة المبنى الحالية، لأن التشخيص الدقيق هو الأساس الذي يحدد نجاح النتيجة النهائية.`,
    "نحن لا نعتمد على الحلول المؤقتة، بل نركز على معالجة السبب الجذري للمشكلة بحيث لا تتكرر الأعراض نفسها بعد فترة قصيرة.",
    "قبل أي خطوة تنفيذية، يتم توثيق حالة الموقع وتحديد نقاط الضعف الإنشائية ونقاط الرطوبة أو التسرب أو انتقال الحرارة بدقة.",
    "فريق التنفيذ يشرح للعميل خطة العمل بلغة واضحة، ويحدد زمن التنفيذ المتوقع، والخامات المقترحة، ومراحل الفحص بعد الانتهاء.",
    "اختيار المادة المناسبة لا يتم بعشوائية؛ بل وفق نوع السطح، طبيعة الاستخدام، درجة التعرض للشمس أو الماء، وحالة التشطيب.",
    "نحرص على أن تكون خطوات التنفيذ نظيفة ومنظمة، مع تقليل الإزعاج داخل الموقع، والحفاظ على سلامة العناصر المحيطة قدر الإمكان.",
    "بعد إنهاء التطبيق، نعيد الفحص ونوثق النتائج، ثم نسلم العميل توصيات تشغيل وصيانة واضحة تساعده على إطالة عمر الخدمة.",
    "الهدف النهائي ليس فقط تنفيذ خدمة فنية، بل تقديم حل عملي يرفع راحة المستخدم ويقلل المصروفات التشغيلية على المدى الطويل.",
  ] as const;

  const paragraphs: string[] = [];
  const targets = 30;

  for (let i = 0; i < targets; i += 1) {
    const s1 = baseSentences[i % baseSentences.length];
    const s2 = baseSentences[(i + 2) % baseSentences.length];
    const s3 = baseSentences[(i + 4) % baseSentences.length];
    paragraphs.push(
      `${s1} في مشاريع ${serviceTitle} داخل جدة، نهتم بأن يرتبط كل قرار فني بنتيجة قابلة للقياس حتى يحصل العميل على قيمة واضحة مقابل التكلفة. العامل الفارق يظل الانضباط في التسلسل التنفيذي: تجهيز صحيح، تطبيق متدرج، ثم فحص تحقق نهائي. ${s2} لذلك نضع خطة تفصيلية لكل موقع على حدة، لأن اختلاف ظروف المباني يعني أن الحل القياسي لا يناسب الجميع. ${s3} بهذه الطريقة تتحول الخدمة من إجراء سريع إلى استثمار طويل الأثر يحسن أداء المبنى ويخفض احتمالات الأعطال اللاحقة.`,
    );
  }

  return paragraphs;
}

export async function generateStaticParams() {
  return insulationServices.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getInsulationServiceBySlug(slug);
  if (!service) return { title: "الخدمة غير موجودة" };

  const path = absUrl(`/insulation-services/${service.slug}`);
  return {
    title: `${service.title} في جدة`,
    description: `${service.summary} دليل تفصيلي يشمل خطوات التنفيذ، المواد، الأسئلة الشائعة، ونصائح الحفاظ على النتيجة.`,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${service.title} | ${siteConfig.name}`,
      description: `${service.summary} مع شرح عملي مفصل عن التنفيذ في جدة.`,
      locale: siteConfig.locale.replace("_", "-"),
    },
  };
}

export default async function InsulationServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getInsulationServiceBySlug(slug);
  if (!service) notFound();

  const paragraphs = buildLongContent(service.title);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-right">
      <Link
        href="/insulation"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#f8fbfc]",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        العودة لصفحة العزل
      </Link>

      <header className="mb-8 rounded-2xl bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
          {service.title} في جدة
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{service.intro}</p>
        <p className="mt-3 text-base leading-8 text-[#2f556d]">
          يشرح هذا الدليل خطوات التنفيذ، آليات الفحص عند الحاجة، النقاط الفنية، والمعايير التي تساعد على نتيجة مستقرة على المدى الطويل.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 lg:col-span-8">
          <section className="space-y-6">
            {sectionTitles.map((title, index) => (
              <article key={title} className="rounded-2xl bg-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.28)] md:p-8">
                <h2 className="mb-4 inline-flex items-center gap-2 text-2xl font-bold text-[#163d57]">
                  <CheckCircle2 className="size-5 text-[#2f7f86]" aria-hidden />
                  {title}
                </h2>
                <div className="space-y-4 text-base leading-8 text-[#4a6677]">
                  <p>{paragraphs[index * 2]}</p>
                  <p>{paragraphs[index * 2 + 1]}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="rounded-2xl bg-[#f8fbfc] p-6 text-right shadow-[0_12px_30px_-20px_rgba(19,66,89,0.24)] md:p-8">
            <h2 className="text-2xl font-extrabold text-[#163d57]">خلاصة تنفيذ الخدمة</h2>
            <p className="mt-3 text-base leading-8 text-[#4a6677]">
              خدمة {service.title} تعتمد على الانضباط الفني أكثر من اعتمادها على مادة واحدة بعينها. عندما تتكامل خطوات
              الفحص والتجهيز والتطبيق والمتابعة، تظهر النتيجة بشكل واضح في الأداء اليومي للمبنى، وفي انخفاض الأعطال
              المستقبلية، وتحسن الراحة العامة. لهذا السبب نوصي دائمًا بالتنفيذ عبر فريق مختص يمتلك خبرة محلية في ظروف جدة.
            </p>
          </section>

        </div>

        <aside className="space-y-6 lg:col-span-4">
          <RequestInspectionBox phone={siteConfig.phone} className="sticky top-24" />
        </aside>
      </div>

      <div className="mt-12">
        <RelatedServicesSection currentPath={`/insulation-services/${service.slug}`} heading="خدمات وصفحات ذات صلة" />
      </div>
    </main>
  );
}

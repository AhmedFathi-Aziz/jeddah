import Link from "next/link";
import { ArrowLeft, Phone, Shield, Droplets, Thermometer } from "lucide-react";

import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jeddahDistricts, type ResolvedCoverageDistrict } from "@/lib/coverage-data";
import { getDistrictHighlight } from "@/lib/seo/coverage-district-highlights";
import { getDistrictFaqItems } from "@/lib/seo/coverage-district-seo";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Props = {
  row: ResolvedCoverageDistrict;
};

const SERVICE_LINKS = [
  {
    href: "/leak-detection",
    title: "كشف تسربات المياه بدون تكسير",
    desc: "فحص حراري وصوتي وتقرير واضح قبل الإصلاح.",
    Icon: Droplets,
  },
  {
    href: "/insulation",
    title: "عزل أسطح وخزانات بجدة",
    desc: "فوم وإيبوكسي وبيتومين مع ضمان يصل إلى 10 سنوات.",
    Icon: Thermometer,
  },
  {
    href: "/smart-leak-diagnosis",
    title: "المشخّص الذكي للتسربات",
    desc: "تقييم أولي سريع قبل حجز الزيارة الميدانية.",
    Icon: Shield,
  },
] as const;

export function CoverageDistrictPageContent({ row }: Props) {
  const tel = `tel:${siteConfig.phone}`;
  const districtContent = getDistrictHighlight(row.slug, row.district);
  const faqItems = getDistrictFaqItems(row.district, row.city.nameAr);

  const howSteps = [
    `الاتصال والحجز: نستقبل طلبك في ${row.district} ونحدد موعدًا مناسبًا داخل الحي.`,
    "الفحص الإلكتروني: أجهزة حرارية وصوتية لتحديد مصدر التسرب دون تكسير عشوائي.",
    "تحديد المشكلة: توثيق النقطة في الخزان أو الحمام أو السطح أو الشبكة الداخلية.",
    "الإصلاح والضمان: معالجة بالخامات المناسبة مع توضيح الضمان والتوصيات الوقائية.",
  ] as const;

  const tips = [
    "إغلاق المحابس الرئيسية عند مغادرة المنزل لفترات طويلة.",
    "فحص الخزان الأرضي دوريًا للتأكد من عدم وجود تشققات.",
    "مراقبة عداد المياه في وقت عدم الاستهلاك لاكتشاف أي تسرب خفي.",
    "تطبيق عزل مائي وحراري مناسب للأسطح للحد من الرطوبة والتلف.",
    `طلب تقرير كشف تسربات معتمد فور ملاحظة ارتفاع غير منطقي في الفاتورة في ${row.district}.`,
  ] as const;

  const searchPhrases = [
    `كشف تسربات المياه في ${row.district} جدة`,
    `شركة كشف تسربات ${row.district}`,
    `عزل أسطح ${row.district}`,
    `عزل خزانات ${row.district}`,
    `كشف تسربات بدون تكسير ${row.district}`,
    `فني كشف تسربات ${row.district}`,
    `ارتفاع فاتورة المياه ${row.district}`,
  ] as const;

  const quickFacts = [
    `نطاق الخدمة: ${row.district} ومحيطه داخل ${row.city.nameAr}.`,
    "الفحص: تشخيص إلكتروني قبل أي معالجة أو تكسير.",
    "العزل: أسطح، خزانات، حمامات — حسب حالة المبنى.",
    "التقرير: توثيق فني عند الحاجة لمتابعة شركة المياه.",
  ] as const;

  const districtLinks = jeddahDistricts
    .filter((district) => district.id !== row.slug)
    .slice(0, 24);

  return (
    <>
      <Link
        href="/coverage"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#f8fbfc]",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        دليل جميع أحياء جدة
      </Link>

      <nav aria-label="مسار التنقل" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <Link href="/coverage" className="hover:text-primary">
          أحياء جدة
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <Link href="/#coverage" className="hover:text-primary">
          خريطة الأحياء
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <span className="font-semibold text-primary">{row.district}</span>
      </nav>

      <header className="mb-8 space-y-4 rounded-2xl border-0 bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <p className="text-base font-semibold text-muted-foreground">
          {row.city.nameAr} — خدمة ميدانية في {row.district}
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
          {row.label}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          {districtContent.intro} {districtContent.painPoint} {districtContent.focus}{" "}
          {districtContent.note}
        </p>
        {districtContent.localContext ? (
          <p className="text-base leading-8 text-muted-foreground">{districtContent.localContext}</p>
        ) : null}
        <p className="text-lg leading-8 text-muted-foreground">
          نقدم في {row.district} كشف تسربات المياه والعزل المائي والحراري بخطة واضحة: معاينة، فحص،
          تقرير، ثم إصلاح أو عزل يناسب منزلك أو عمارتك — مع أقل تأثير ممكن على التشطيبات.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <aside className="space-y-6 lg:col-span-4">
          <RequestInspectionBox phone={siteConfig.phone} className="sticky top-24" />

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.35)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">معلومات سريعة — {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-base leading-8 text-muted-foreground">
                {quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-gradient-to-b from-[#eef7f9] to-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">تواصل مباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base leading-8 text-muted-foreground">
                فريقنا جاهز للرد على استفسارات {row.district} وترتيب موعد مناسب بسرعة.
              </p>
              <a
                href={tel}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "inline-flex w-full flex-row-reverse items-center justify-center gap-2 bg-[#1f7f8a] font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                اتصل الآن
              </a>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-8 lg:col-span-8">
          <section aria-labelledby="local-services-heading">
            <h2 id="local-services-heading" className="mb-4 text-2xl font-extrabold text-[#163d57]">
              خدماتنا في {row.district}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {SERVICE_LINKS.map(({ href, title, desc, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex h-full flex-col rounded-xl border border-[#e8edf0] bg-white p-4 text-right shadow-sm transition hover:border-[#c5dde8] hover:bg-[#f8fbfc]"
                  >
                    <Icon className="mb-2 size-5 text-[#1f7f8a]" aria-hidden />
                    <span className="font-semibold text-[#163d57]">{title}</span>
                    <span className="mt-1 text-sm leading-6 text-muted-foreground">{desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">ماذا نقدم في {row.district}؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                فحص دقيق للتسربات بوسائل غير هدّامة قدر الإمكان، مع تقرير يوضح مصدر المشكلة وخيارات
                المعالجة — مناسب لمن يبحث عن كشف تسربات المياه في {row.district} بدون تكسير واسع.
              </p>
              <p>
                عزل مائي وحراري للأسطح والخزانات والحمامات حسب حالة المبنى ومناخ {row.city.nameAr}.
                ننفذ عزل فوم وإيبوكسي ولفائف بيتومينية بعد معاينة تحدد السماكة والمادة المناسبة.
              </p>
              <p>
                عند ارتفاع الفاتورة أو بقع الرطوبة أو ضعف الضغط، ننصح بمعاينة مبكرة في {row.district}{" "}
                قبل توسّع الضرر على الخرسانة والدهانات.
              </p>
              <p>
                للتفاصيل العامة راجع{" "}
                <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
                  دليل الخدمات
                </Link>{" "}
                أو{" "}
                <Link href="/#encyclopedia" className="font-semibold text-[#1f7f8a] hover:underline">
                  موسوعة الموقع
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">كيف نقوم بالكشف في {row.district}؟</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                {howSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                تحليل مشكلات التسرب والعزل في {row.district}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                تختلف طبيعة التسربات بين الشقق والفلل والعمائر في {row.district}. قد يكون السبب
                مواسير قديمة، وصلات حمام مخفية، خزانًا علويًا، أو ضعف عزل سطح بعد الأمطار. لا
                نعتمد التخمين: نراجع الاستهلاك وسلوك العداد ونفحص النقاط الأكثر عرضة للأعطال.
              </p>
              <p>
                كثير من السكان جرّبوا تكسيرًا عشوائيًا دون نتيجة. نهجنا: تحديد النقطة أولًا ثم أقل
                تدخل ممكن — يوفر الوقت ويحمي السيراميك والدهانات في {row.district}.
              </p>
              <p>
                بعد التشخيص نوضح خيارات الإصلاح أو العزل التكميلي للأسطح والخزانات، بخطة مكتوبة
                يفهمها العميل قبل الموافقة على التنفيذ.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">نصائح لتقليل فاتورة المياه في {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]" id="faq">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                أسئلة شائعة — كشف التسربات والعزل في {row.district}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-4"
                >
                  <h3 className="text-base font-bold leading-8 text-[#163d57]">س: {item.question}</h3>
                  <p className="mt-2 text-base leading-8 text-muted-foreground">ج: {item.answer}</p>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">أحياء جدة القريبة والمجاورة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base leading-8 text-muted-foreground">
                انتقل إلى صفحة حي آخر لمعرفة تفاصيل الخدمة المحلية — كل الروابط تحافظ على نفس
                هيكل الموقع.
              </p>
              <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                {districtLinks.map((district) => (
                  <li key={district.id}>
                    <Link
                      href={district.href}
                      className="block rounded-lg border-0 bg-white px-4 py-3 text-base font-semibold leading-relaxed text-[#1b5a73] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#eef7f9] hover:text-[#163d57]"
                    >
                      {district.district}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                كلمات بحث شائعة في {row.district}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap justify-end gap-2">
                {searchPhrases.map((phrase) => (
                  <li
                    key={phrase}
                    className="rounded-full bg-[#eef7f9] px-3 py-1 text-sm font-medium text-[#35566a]"
                  >
                    {phrase}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

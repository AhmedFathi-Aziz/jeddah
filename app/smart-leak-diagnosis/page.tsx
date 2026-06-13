import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles, Timer } from "lucide-react";

import { LeakDiagnosticToolGate } from "@/components/leak-diagnostic/leak-diagnostic-tool-gate";
import { SmartLeakSeoCopy } from "@/components/leak-diagnostic/smart-leak-seo-copy";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "مُشخّص تسربات المياه الذكي بجدة | اختبار مجاني يحدد مصدر التسرب",
    description:
      "اختبار تسربات المياه بالعربية في جدة: حدّد مصدر التسرب من الجدار أو السقف أو الخزان أو الفاتورة، ثم احجز فحصاً إلكترونياً مجانياً مع فريق متخصص.",
    path: "/smart-leak-diagnosis",
    keywords: keywordsForPath("/smart-leak-diagnosis"),
    ogTitle: `مُشخّص التسربات — ${siteConfig.name}`,
  }),
  openGraph: {
    images: [
      {
        url: images.leakDetection.src,
        width: images.leakDetection.width,
        height: images.leakDetection.height,
        alt: images.leakDetection.alt,
      },
    ],
  },
};

const highlights = [
  {
    icon: Timer,
    title: "أقل من دقيقتين",
    text: "سؤالان بسيطان ثم نتيجة أولية جاهزة للمشاركة مع الفريق.",
  },
  {
    icon: MapPin,
    title: "مناسب لجدة",
    text: "يعتمد على أنماط الشقق والفلل والخزانات الشائعة في المدينة.",
  },
  {
    icon: Sparkles,
    title: "خطوة تالية واضحة",
    text: "ربط مباشر بواتساب لحجز فحص صوتي عند الحاجة — دون التزام.",
  },
] as const;

export default function SmartLeakDiagnosisPage() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[min(55vh,520px)] bg-gradient-to-b from-[#e8f5f8]/95 via-[#f5fbfc]/50 to-transparent"
        aria-hidden
      />

      <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:pb-28 md:pt-14">
        <nav className="mb-8 flex flex-row-reverse flex-wrap items-center justify-between gap-4 text-right">
          <Link
            href="/leak-detection"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "inline-flex flex-row-reverse items-center gap-2 rounded-xl px-3 font-semibold text-[#1f7f8a] hover:bg-[#ecf8f8]",
            )}
          >
            صفحة كشف التسربات
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <div className="text-sm text-[#5a7588]">
            <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
              الرئيسية
            </Link>
            <span className="mx-2 text-[#c5d5de]">/</span>
            <span className="text-[#163d57]">المُشخّص الذكي</span>
          </div>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-[#d7e8ee] bg-white shadow-[0_20px_48px_-28px_rgba(19,66,89,0.38)]">
          <div
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#c8ecf0]/35 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#d4f0e8]/40 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 p-7 md:gap-12 md:p-10 lg:grid-cols-[1fr_320px] lg:items-stretch lg:p-12">
            <div className="flex flex-col justify-center text-right">
              <p className="mb-3 inline-flex w-fit flex-row-reverse items-center gap-2 self-end rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-bold text-[#1f7f8a]">
                <Sparkles className="size-4" aria-hidden />
                مجاني وسريع — تشخيص أولي يوجّه خطوتك القادمة
              </p>
              <h1 className="text-balance text-3xl font-extrabold leading-[1.15] text-[#163d57] md:text-5xl">
                هل عندك تسرب؟ اختصر الطريق بلحظات
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg md:leading-9">
                جاوب عن سؤالين يصفان موقع المشكلة ونوع منزلك، واحصل على{" "}
                <strong className="font-semibold text-[#163d57]">تشخيص أولي إرشادي</strong> يشرح أين يكثر حدوث التسرب في حالات
                مشابهة — ثم انسخ النتيجة إلى{" "}
                <strong className="font-semibold text-[#163d57]">واتساب</strong> لترتيب{" "}
                <strong className="font-semibold text-[#163d57]">فحص مجاني بجهاز الإيكوفون</strong> عند الحاجة.
              </p>

              <ul className="mt-8 w-full space-y-4">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex flex-row items-start gap-3 text-right">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#163d57]">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4a6677] md:text-base">{text}</p>
                    </div>
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ecf8f8] text-[#1f7f8a]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-row-reverse flex-wrap justify-end gap-3">
                <a
                  href="#smart-quiz"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 rounded-xl bg-[#1f7f8a] px-8 font-bold text-white shadow-[0_10px_28px_-12px_rgba(31,127,138,0.85)] hover:bg-[#1a6d76]",
                  )}
                >
                  ابدأ الاختبار الآن
                </a>
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
                  )}
                >
                  أتصل مباشرة
                </Link>
              </div>
            </div>

            <aside className="relative flex flex-col justify-between gap-6 rounded-2xl border border-[#d7e8ee]/80 bg-gradient-to-br from-[#f2fbfc] via-white to-[#fafcfd] p-6 shadow-inner md:p-8">
              <div className="relative overflow-hidden rounded-xl bg-[#163d57]/[0.03]">
                <Image
                  src={images.leakDetection.src}
                  alt={images.leakDetection.alt}
                  width={640}
                  height={400}
                  className="aspect-[5/3] w-full object-cover opacity-95"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#163d57]/50 to-transparent" aria-hidden />
                <p className="absolute bottom-3 right-3 left-3 text-xs font-medium leading-relaxed text-white drop-shadow md:text-sm">
                  الإيكوفون والأجهزة الصوتية تُحدّد موقع التسرب قبل أي تكسير واسع — وهذا ما نرتّب لك موعده بعد الاختبار.
                </p>
              </div>
              <div className="rounded-xl bg-white/90 p-5 text-center shadow-[0_10px_30px_-18px_rgba(19,66,89,0.25)]">
                <p className="text-4xl font-black tabular-nums text-[#1f7f8a] md:text-5xl">2</p>
                <p className="mt-1 text-sm font-bold text-[#163d57]">أسئلة فقط</p>
                <p className="mt-2 text-xs leading-relaxed text-[#4a6677] md:text-sm">ثم خلاصة يمكنك إرسالها لفريقنا بنقرة.</p>
              </div>
            </aside>
          </div>
        </section>

        <div
          id="smart-quiz"
          className="scroll-mt-24 rounded-3xl border-0 bg-white p-6 shadow-[0_22px_56px_-24px_rgba(19,66,89,0.35)] ring-1 ring-[#cfe8ee]/60 md:p-10 lg:p-12"
        >
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1f7f8a] md:text-sm">الخطوة التالية</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#163d57] md:text-3xl">اختبار التشخيص المبدئي</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6677] md:text-base">
              اختر ما يلائم وضعك؛ النتيجة تظهر فوراً ويمكنك تعديل الإجابات في أي وقت.
            </p>
          </div>
          <LeakDiagnosticToolGate />
        </div>

        <SmartLeakSeoCopy />

        <div className="mt-16 md:mt-24">
          <RelatedServicesSection currentPath="/smart-leak-diagnosis" heading="روابط مفيدة بعد الاختبار" />
        </div>

        <p className="mt-14 text-center text-sm text-[#5a7588]">
          <Link href="/contact" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            اتصل بنا
          </Link>
          {" · "}
          <Link href="/blog" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            المدونة
          </Link>
        </p>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { LeakDiagnosticToolGate } from "@/components/leak-diagnostic/leak-diagnostic-tool-gate";
import { SmartLeakSeoCopy } from "@/components/leak-diagnostic/smart-leak-seo-copy";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "مُشخّص تسربات المياه الذكي — اختبار قصير",
  description:
    "اختبار تفاعلي بالعربية لتقدير مصدر تسرب المياه في جدة: الجدران، السقف، الأرضيات، أو ارتفاع الفاتورة. احجز فحصاً مجانياً بجهاز الإيكوفون عبر واتساب.",
  alternates: { canonical: "/smart-leak-diagnosis" },
  openGraph: {
    url: "/smart-leak-diagnosis",
    title: `مُشخّص تسربات المياه الذكي — ${siteConfig.name}`,
    description:
      "مساعد تفاعلي لتشخيص أولي لتسربات المياه ثم حجز فحص إلكتروني في جدة.",
    locale: siteConfig.locale.replace("_", "-"),
  },
};

export default function SmartLeakDiagnosisPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <Link
        href="/leak-detection"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex flex-row-reverse items-center gap-1 text-muted-foreground",
        )}
      >
        <ChevronLeft className="size-4" aria-hidden />
        صفحة كشف التسربات
      </Link>

      <header className="mb-10 text-right">
        <p className="mb-2 text-sm font-semibold text-[#1f7f8a]">أداة تفاعلية — جدة والمنطقة</p>
        <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-4xl">
          مُشخّص تسربات المياه الذكي
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#4a6677] md:text-lg">
          جاوب على سؤالين قصيرين لنقترح عليك تشخيصاً أولياً يشرح احتمال مصدر التسرب — ثم يمكنك إرسال إجاباتك مباشرة لفريقنا على واتساب لحجز{" "}
          <strong className="font-semibold text-[#163d57]">فحص مجاني بجهاز الإيكوفون</strong>.
        </p>
      </header>

      <div className="rounded-3xl border border-[#d7e8ee] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(19,66,89,0.4)] md:p-10">
        <LeakDiagnosticToolGate />
      </div>

      <SmartLeakSeoCopy />

      <RelatedServicesSection currentPath="/smart-leak-diagnosis" heading="روابط مفيدة بعد الاختبار" />
    </main>
  );
}

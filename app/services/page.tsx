import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Building2 } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "خدمات كشف التسربات والعزل في جدة",
  description:
    "كشف تسربات المياه إلكترونياً، عزل أسطح وخزانات، وإصلاحات ميدانية معتمدة في جدة مع تقارير فنية وتغطية أحياء.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title: `خدمات كشف التسربات والعزل — ${siteConfig.name}`,
    description:
      "تشخيص دقيق للتسربات، عزل مائي وحراري، وتنفيذ ميداني مع تقارير واضحة في جدة.",
    locale: siteConfig.locale.replace("_", "-"),
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

const services = [
  {
    title: "كشف تسربات المياه إلكترونيا",
    desc: "فحص دقيق بأجهزة متقدمة لتحديد مصدر التسرب بدون تكسير عشوائي في أغلب الحالات المناسبة.",
  },
  {
    title: "عزل الأسطح والخزانات",
    desc: "حلول عزل مائي وحراري لتحسين كفاءة المبنى وتقليل تأثير الرطوبة والحرارة على المدى الطويل.",
  },
  {
    title: "إصلاحات ميدانية معتمدة",
    desc: "تنفيذ عملي من فريق فني مع تقرير واضح للحالة قبل وبعد الإصلاح وخيارات مناسبة للميزانية.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <section className="rounded-3xl border border-[#d7e8ee] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <ShieldCheck className="size-4" aria-hidden />
          خدمات متكاملة في جدة
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
          خدمات كشف التسربات والعزل
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4a6677]">
          نوفر حلول احترافية تبدأ بالتشخيص الدقيق ثم المعالجة المناسبة، مع اهتمام كامل بسرعة الاستجابة وجودة التنفيذ.
        </p>
        <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
            )}
          >
            احجز زيارة فنية
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
            )}
          >
            تواصل معنا
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-2xl border border-[#d7e8ee] bg-white p-5 text-right shadow-[0_12px_24px_-20px_rgba(19,66,89,0.45)]"
          >
            <h2 className="text-xl font-bold text-[#163d57]">{service.title}</h2>
            <p className="mt-3 text-base leading-8 text-[#4a6677]">{service.desc}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-[#d7e8ee] bg-[#eef7f9] p-6 text-right">
        <h2 className="inline-flex items-center gap-2 text-xl font-bold text-[#163d57]">
          <Building2 className="size-5 text-[#1f7f8a]" aria-hidden />
          تغطية أحياء جدة
        </h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نغطي معظم أحياء جدة بخدمات ميدانية سريعة. يمكنك الانتقال إلى صفحة التغطية لاختيار منطقتك مباشرة.
        </p>
        <Link href="/#coverage" className="mt-3 inline-flex font-semibold text-[#1f7f8a] hover:underline">
          عرض روابط الأحياء
        </Link>
      </section>

      <RelatedServicesSection currentPath="/services" />
    </main>
  );
}

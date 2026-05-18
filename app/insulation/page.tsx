import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Thermometer, Droplets, Shield, CheckCircle2, BadgeCheck } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { EncyclopediaSection } from "@/components/seo/encyclopedia-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { jeddahDistricts } from "@/lib/coverage-data";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "عزل مائي وحراري بجدة — أسطح وخزانات وفوم",
    description:
      "عزل أسطح وخزانات وحمامات بجدة: فوم وبيتومين وإيبوكسي وسيكو بروف، سعر المتر، ضمان حتى 10 سنوات، وحل رطوبة الجدران وتسريب السقف.",
    path: "/insulation",
    keywords: keywordsForPath("/insulation"),
    ogTitle: `عزل مائي وحراري بجدة — ${siteConfig.name}`,
  }),
  openGraph: {
    images: [
      {
        url: images.insulationFoamSpray.src,
        width: images.insulationFoamSpray.width,
        height: images.insulationFoamSpray.height,
        alt: images.insulationFoamSpray.alt,
      },
    ],
  },
};

const insulationTypes = [
  {
    href: "/insulation-services/tank-epoxy-insulation",
    title: "عزل خزانات بجدة مع الضمان",
    desc: "نستخدم مادة الإيبوكسي (Epoxy) المعتمدة والآمنة صحياً، والتي تمنع تفاعل المياه مع جدران الخزان وتمنع التسرب تماماً.",
  },
  {
    href: "/insulation-services/foam-thermal-waterproof-insulation",
    title: "عزل فوم بجدة (مائي + حراري)",
    desc: "نوفر عزل الفوم (بولي يوريثان) كأفضل عازل ثنائي يحمي السقف من التشققات ويخفض فاتورة الكهرباء بفضل تقليل انتقال الحرارة.",
  },
  {
    href: "/insulation-services/bathroom-foam-insulation",
    title: "عزل الحمامات والمطابخ",
    desc: "نقوم بتأسيس طبقات العزل قبل أعمال السباكة باستخدام لفائف البيتومين لضمان عدم حدوث أي تسربات تؤثر على الطوابق السفلية.",
  },
] as const;

export default function InsulationPage() {
  const faqItems = [
    {
      q: "هل تقدمون تقرير كشف تسربات معتمد لشركة المياه الوطنية بجدة؟",
      a: "نعم، نحن شركة معتمدة ونقدم تقارير فنية تساعد في خفض فاتورة المياه المرتفعة وتسريع خطوات المعالجة.",
    },
    {
      q: "ما هي أفضل مادة لـ عزل خزانات المياه بجدة؟",
      a: "نعتمد غالباً على الإيبوكسي والسيكو بروف (CIC) بعد تجهيز السطح بشكل صحيح لضمان منع التسرب نهائياً.",
    },
    {
      q: "كيف يتم علاج تسريب مياه السقف والرطوبة في الجدران بجدة؟",
      a: "نبدأ بفحص إلكتروني دقيق لتحديد مصدر التسرب، ثم نعالج الشروخ ونطبق نظام عزل مناسب مثل الفوم أو البيتومين وفق حالة السطح.",
    },
  ] as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  const insulationGallery = [
    images.insulationFoamSpray,
    images.insulationRoofBitumen,
    images.insulationBitumenRoll,
    images.insulationTankInternal,
    images.insulationEpoxyFloor,
    images.insulationTankExternalBlack,
    images.insulationTankExternalWhite,
  ] as const;

  return (
    <main className="mx-auto max-w-7xl px-6 py-14 md:py-16 bg-[#FFFFFF]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="rounded-3xl border border-[#E7EBF0] bg-[#F1F5F9] p-7 text-right shadow-[0_16px_32px_-24px_rgba(71,85,105,0.25)] md:p-10">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#FFFFFF] px-4 py-2 text-sm font-semibold text-[#475569]">
          <Shield className="size-4" aria-hidden />
          حماية حرارية ومائية طويلة المدى
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#334155] md:text-5xl">
          أفضل خدمات العزل المائي والحراري بجدة - حماية تدوم لسنوات
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[#5F6B78]">
          نقدم في شركتنا حلولاً متكاملة لعزل الأسطح والخزانات باستخدام تقنيات حديثة تضمن لك حماية كاملة من
          تسربات الأمطار وحرارة الشمس الشديدة في جدة. نحن نستخدم مواد معتمدة عالمياً لضمان كفاءة العزل وتقليل
          استهلاك الطاقة.
        </p>
        <p className="mt-3 max-w-4xl text-base font-semibold leading-8 text-[#334155]">
          أفضل شركة للعزل والتسربات — جدة للعزل والتسربات.
        </p>
        <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#475569] px-6 font-bold text-white hover:bg-[#334155]",
            )}
          >
            طلب معاينة عزل
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl border-[#CBD5E1] px-6 font-semibold text-[#334155] hover:bg-[#FFFFFF]",
            )}
          >
            استشارة فنية
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3" aria-label="أنواع العزل التي نقدمها">
        {insulationTypes.map((item, idx) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-[#E7EBF0] bg-[#FFFFFF] p-5 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)]"
          >
            <h2 className="inline-flex items-center gap-2 text-xl font-bold text-[#334155]">
              {idx === 0 && <Thermometer className="size-5 text-[#64748B]" aria-hidden />}
              {idx === 1 && <Droplets className="size-5 text-[#64748B]" aria-hidden />}
              {idx === 2 && <Shield className="size-5 text-[#64748B]" aria-hidden />}
              {item.title}
            </h2>
            <p className="mt-3 text-base leading-8 text-[#5F6B78]">{item.desc}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 md:p-8">
        <h2 className="text-right text-2xl font-extrabold text-[#334155]">صور من أعمال العزل لدينا</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insulationGallery.map((img, idx) => (
            <article key={img.src} className="overflow-hidden rounded-xl border border-[#E7EBF0] bg-[#F1F5F9]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  title={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={72}
                  priority={idx < 2}
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-[#F1F5F9] p-6 text-right md:p-8">
        <h2 className="inline-flex items-center gap-2 text-2xl font-extrabold text-[#334155]">
          <BadgeCheck className="size-6 text-[#64748B]" aria-hidden />
          لماذا تختار خدمة العزل لدينا؟
        </h2>
        <ul className="mt-5 grid gap-3 text-base leading-8 text-[#5F6B78] md:grid-cols-2">
          <li className="inline-flex items-start gap-2">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#64748B]" aria-hidden />
            فريق فني متخصص: مدرب على التعامل مع كافة أنواع الأسطح والخزانات في جدة.
          </li>
          <li className="inline-flex items-start gap-2">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#64748B]" aria-hidden />
            ضمان حقيقي: نمنح عملاءنا ضماناً يصل إلى 10 سنوات على أعمال العزل.
          </li>
          <li className="inline-flex items-start gap-2">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#64748B]" aria-hidden />
            أسعار تنافسية: نوفر أفضل سعر لمتر العزل بجدة مع الالتزام التام بالمواعيد.
          </li>
          <li className="inline-flex items-start gap-2">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#64748B]" aria-hidden />
            مواد معتمدة: جميع المواد المستخدمة مطابقة لمعايير شركة المياه الوطنية والشركة السعودية للكهرباء.
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)] md:p-8">
        <h2 className="text-2xl font-extrabold text-[#334155]">المواد التي نستخدمها في العزل</h2>
        <p className="mt-3 text-base leading-8 text-[#5F6B78]">
          نحرص على استخدام مواد فعالة ومجربة لرفع جودة التنفيذ وزيادة عمر العزل في المباني السكنية والتجارية.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#E7EBF0] bg-[#F1F5F9] p-4">
            <h3 className="text-lg font-bold text-[#334155]">مادة السيكو بروف (CIC)</h3>
            <p className="mt-2 text-sm leading-7 text-[#5F6B78]">للعزل المائي عالي الجودة للأسطح المعرضة للأمطار والرطوبة.</p>
          </article>
          <article className="rounded-xl border border-[#E7EBF0] bg-[#F1F5F9] p-4">
            <h3 className="text-lg font-bold text-[#334155]">مادة الإيبوكسي</h3>
            <p className="mt-2 text-sm leading-7 text-[#5F6B78]">
              لعزل خزانات المياه الأرضية بعد تجهيز اللياسة ومعالجة الشروخ ثم التعقيم، بما يتوافق مع متطلبات السلامة
              وجودة المياه.
            </p>
          </article>
          <article className="rounded-xl border border-[#E7EBF0] bg-[#F1F5F9] p-4">
            <h3 className="text-lg font-bold text-[#334155]">الفوم الحراري (بولي يوريثان)</h3>
            <p className="mt-2 text-sm leading-7 text-[#5F6B78]">لعزل أسطح الفلل والمباني والهناجر والمستودعات بعزل مائي وحراري متكامل.</p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)] md:p-8">
        <h2 className="text-2xl font-extrabold text-[#334155]">خدمات كشف التسربات المعتمدة بجدة</h2>
        <p className="mt-3 text-base leading-8 text-[#5F6B78]">
          نقدم تقرير كشف تسربات المياه معتمد، ونوفر فحص تسربات الخزانات المعتمد عبر جهاز كشف التسربات الإلكتروني
          (Success). كما ننفذ حلولاً عملية مثل علاج تسريب مياه السقف، حل مشكلة الرطوبة في الجدران بجدة، طريقة كشف
          تسربات المياه في الحمامات، إصلاح كسر مواسير المياه بدون تكسير، وعلاج تشققات خزانات المياه الأرضية.
        </p>
        <p className="mt-3 text-base leading-8 text-[#5F6B78]">
          إذا كانت لديك مشكلة في أسباب ارتفاع فاتورة المياه بجدة، نبدأ بالتشخيص الدقيق ثم نقدم خطة تنفيذ واضحة تشمل
          العزل أو الإصلاح المناسب مع شهادة ضمان على العزل بجدة.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)] md:p-8">
        <h2 className="text-2xl font-extrabold text-[#334155]">سعر متر العزل بجدة</h2>
        <p className="mt-3 text-base leading-8 text-[#5F6B78]">
          سعر متر العزل بجدة يختلف حسب نوع المادة، حالة السطح أو الخزان، والسماكة المطلوبة. لذلك نقدم معاينة فنية
          دقيقة قبل التسعير لضمان أفضل تكلفة مقابل أعلى جودة تنفيذ.
        </p>
        <div className="mt-5 flex flex-row-reverse flex-wrap gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#475569] px-6 font-bold text-white hover:bg-[#334155]",
            )}
          >
            اطلب عرض سعر الآن
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl border-[#CBD5E1] px-6 font-semibold text-[#334155] hover:bg-[#F1F5F9]",
            )}
          >
            طلب معاينة ميدانية
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-[#F1F5F9] p-6 text-right md:p-8">
        <h2 className="text-2xl font-extrabold text-[#334155]">تغطية الأحياء في جدة</h2>
        <p className="mt-3 text-base leading-8 text-[#5F6B78]">
          نغطي أحياء جدة بخدمات متكاملة تبدأ من كشف التسربات ثم الإصلاح ثم العزل المناسب لنوع المبنى، سواء عزل
          خزانات، عزل أسطح هناجر ومستودعات، أو عزل حمامات ومطابخ، مع الالتزام بالمواعيد وجودة التنفيذ.
        </p>
        <ul className="mt-5 grid list-none grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jeddahDistricts.map((area) => (
            <li key={area.id}>
              <Link
                href={area.href}
                className="block rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#F8FAFC]"
              >
                {area.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <EncyclopediaSection
        categoryId="insulation"
        heading="مواضيع العزل من موسوعة الموقع"
        className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)] md:p-8"
      />

      <section className="mt-8 rounded-2xl border border-[#E7EBF0] bg-white p-6 text-right shadow-[0_12px_24px_-20px_rgba(71,85,105,0.25)] md:p-8">
        <h2 className="text-2xl font-extrabold text-[#334155]">الأسئلة الشائعة</h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <article key={item.q} className="rounded-xl border border-[#E7EBF0] bg-[#F1F5F9] p-4">
              <h3 className="text-lg font-bold leading-8 text-[#334155]">س: {item.q}</h3>
              <p className="mt-2 text-base leading-8 text-[#5F6B78]">ج: {item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <RelatedServicesSection currentPath="/insulation" />
    </main>
  );
}

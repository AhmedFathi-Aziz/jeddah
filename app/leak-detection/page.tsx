import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Activity, SearchCheck, Wrench } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { EncyclopediaSection } from "@/components/seo/encyclopedia-section";
import { LEAK_DETECTION_FAQ_ITEMS } from "@/lib/seo/leak-detection-faq-data";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { SCHEMA_LOCAL_BUSINESS_ID } from "@/lib/seo/schema-ids";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "دليل كشف تسربات المياه بجدة | أعراض، فحص ذاتي، وحجز ميداني",
    description:
      "دليل تعليمي لسكان جدة: أعراض التسرب الخفي، فحص ذاتي للعداد، متى تحتاج فنيًا، وروابط لصفحة الحجز والمشخّص الذكي — بعيداً عن صفحات الخدمة التجارية.",
    path: "/leak-detection",
    keywords: keywordsForPath("/leak-detection"),
    ogTitle: `كشف تسربات المياه — ${siteConfig.name}`,
  }),
  openGraph: {
    images: [
      {
        url: images.leakGalleryPipelineScan.src,
        width: images.leakGalleryPipelineScan.width,
        height: images.leakGalleryPipelineScan.height,
        alt: images.leakGalleryPipelineScan.alt,
      },
    ],
  },
};

const steps = [
  "معاينة أولية للحالة وجمع المعلومات",
  "فحص إلكتروني حراري/صوتي لتحديد المصدر",
  "تقديم خطة إصلاح واضحة مع تكلفة تقديرية",
  "تنفيذ الإصلاح والاختبار النهائي",
] as const;

const billingTips = [
  "تأكد من إغلاق المحابس الرئيسية عند مغادرة المنزل لفترات طويلة.",
  "افحص الخزان الأرضي دورياً للتأكد من عدم وجود تشققات في الجدران.",
  "راقب عداد المياه في وقت لا يوجد فيه استهلاك؛ إذا تحرك العداد فهناك تسرب خفي.",
  "استخدم العزل المائي والحراري للأسطح لتقليل تبخر المياه وتأثير الرطوبة.",
  "سارع بطلب تقرير كشف تسربات معتمد فور ملاحظة أي ارتفاع غير منطقي في الفاتورة.",
] as const;

const coveredAreaLinks = jeddahDistricts.map((district) => ({
  name: district.district,
  href: district.href,
}));

const testimonials = [
  {
    quote: "خدمة ممتازة وفنيين محترفين، تم حل مشكلة تسرب الخزان في وقت قياسي.",
    author: "أبو فهد",
    area: "حي الصفا",
  },
  {
    quote: "أفضل شركة كشف تسربات تعاملت معها، التقرير تم قبوله فوراً في شركة المياه.",
    author: "م. خالد",
    area: "أبحر",
  },
] as const;

const quickCheckItems = [
  "ارتفاع الفاتورة دون زيادة فعلية في الاستهلاك",
  "سماع صوت مياه داخل الجدار أو الأرضية",
  "رطوبة مستمرة أو تقشر دهان في نفس المنطقة",
  "نقص ضغط المياه في بعض النقاط داخل المنزل",
  "تحرك عداد المياه رغم إغلاق جميع المحابس الداخلية",
] as const;

export default function LeakDetectionPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LEAK_DETECTION_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "كشف تسربات المياه في جدة",
    description:
      "كشف تسربات المياه بجدة بدون تكسير: فحص حراري وصوتي، تقرير فني، وإصلاح بخطة واضحة.",
    url: absUrl("/leak-detection"),
    provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "جدة",
      containedInPlace: { "@type": "Country", name: "المملكة العربية السعودية" },
    },
    serviceType: "كشف تسربات المياه",
  };

  const leakGallery = [
    images.leakGalleryPipelineScan,
    images.leakGalleryBathroomMeter,
    images.leakGalleryPressureCheck,
    images.leakGalleryThermalWall,
    images.leakGalleryAcousticTest,
    images.leakGalleryOutdoorPipeline,
    images.leakGallerySmartMeter,
    images.leakGalleryThermalCrack,
    images.leakGalleryCopperPipe,
  ] as const;

  return (
    <main className="page-main pb-mobile-fab py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />

      <nav className="mb-6 text-sm text-[#5a7588]" aria-label="مسار التصفح">
        <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#163d57]">كشف التسربات</span>
      </nav>

      <section className="rounded-3xl border border-[#e8edf0] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#f1f4f6] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <SearchCheck className="size-4" aria-hidden />
          +500 مشروع · تقارير فنية · جدة
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
          دليل كشف تسربات المياه في جدة — أعراض، فحص، وإصلاح
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4a6677]">
          هذه الصفحة <strong>دليل تعليمي</strong> لساكن جدة: كيف تميّز التسرب الخفي،
          ماذا تفعل قبل الاتصال بفني، وما الفرق بين الفحص الذاتي والفحص الميداني.
          لا نكرّر عروض الخدمة هنا — للحجز والتسعير المباشر انتقل إلى{" "}
          <Link href="/services/kashf-tasribat-miah-jeddah" className="font-semibold text-[#1f7f8a] hover:underline">
            صفحة خدمة كشف التسربات
          </Link>
          .
        </p>
        <p className="mt-3 max-w-4xl text-base leading-8 text-[#4a6677]">
          نغطي أعراض التسرب في الحمامات والمطابخ والخزانات والأسطح وخطوط التكييف.
          للتشخيص الأولي جرّب{" "}
          <Link href="/smart-leak-diagnosis" className="font-semibold text-[#1f7f8a] hover:underline">
            المشخّص الذكي
          </Link>
          {" — "}ثم احجز زيارة ميدانية إذا استمرت الشكوى.
        </p>
        <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
            )}
          >
            طلب فحص الآن
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
            )}
          >
            احجز موعد
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 md:p-8">
        <h2 className="text-right text-2xl font-extrabold text-[#163d57]">صور من فحوصات كشف التسربات</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leakGallery.map((img, idx) => (
            <article key={img.src} className="overflow-hidden rounded-xl border border-[#e8edf0] bg-[#f7f9fa]">
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

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#f7f9fa] p-6 text-right">
        <h2 className="inline-flex items-center gap-2 text-2xl font-bold text-[#163d57]">
          <Activity className="size-5 text-[#1f7f8a]" aria-hidden />
          كيف نقوم بكشف التسربات في منزلك بجدة؟
        </h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نفهم أن العميل يريد معرفة ماذا سيحدث بالضبط من أول اتصال حتى تسليم التقرير، لذلك نعتمد مسار تنفيذ واضح يجمع
          بين الدقة والسرعة ويخدم هدفك الأساسي: إيقاف التسرب، تقليل الهدر، ومعالجة سبب ارتفاع الفاتورة.
        </p>
        <ul className="mt-4 space-y-3">
          <li className="rounded-xl bg-white px-4 py-3 text-base font-medium text-[#33586d]">
            <h3 className="font-extrabold text-[#163d57]">الاتصال والحجز</h3>
            نستقبل مكالمتك ونحدد موعداً فورياً للفحص حسب موقعك داخل جدة.
          </li>
          <li className="rounded-xl bg-white px-4 py-3 text-base font-medium text-[#33586d]">
            <h3 className="font-extrabold text-[#163d57]">الفحص الإلكتروني</h3>
            نرسل فني متخصص يستخدم أجهزة النيتروجين والموجات الصوتية (بدون تكسير) لتحقيق فحص دقيق وسريع.
          </li>
          <li className="rounded-xl bg-white px-4 py-3 text-base font-medium text-[#33586d]">
            <h3 className="font-extrabold text-[#163d57]">تحديد المشكلة</h3>
            نقوم بتحديد مكان التسرب بدقة متناهية سواء في الخزان، الحمام، أو المطبخ مع توثيق واضح للحالة.
          </li>
          <li className="rounded-xl bg-white px-4 py-3 text-base font-medium text-[#33586d]">
            <h3 className="font-extrabold text-[#163d57]">الإصلاح والضمان</h3>
            نقوم بمعالجة التسرب بأجود المواد ونعطيك فاتورة ضمان رسمية وتقرير كشف تسربات معتمد.
          </li>
          {steps.map((step) => (
            <li key={step} className="rounded-xl bg-white px-4 py-3 text-base font-medium text-[#33586d]">
              {step}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 text-right">
        <h2 className="inline-flex items-center gap-2 text-xl font-bold text-[#163d57]">
          <Wrench className="size-5 text-[#1f7f8a]" aria-hidden />
          بعد الكشف
        </h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          بعد تحديد التسرب بدقة، يتم تقديم تقرير واضح وخيارات إصلاح مناسبة. الهدف هو حل المشكلة بأقل تأثير على التشطيبات.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#f7f9fa] p-6 text-right">
        <h2 className="text-2xl font-extrabold text-[#163d57]">خدمات الكشف المتخصصة في جدة</h2>
        <p className="mt-3 leading-8 text-[#4a6677]">
          نغطي كل مسارات التسرب الشائعة في مباني جدة — كل خدمة بصفحة تفصيلية:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            { href: "/services/kashf-tasribat-bedun-taksir-jeddah", label: "كشف تسربات بدون تكسير" },
            { href: "/services/kashf-tasribat-al-khazanat-jeddah", label: "كشف تسربات الخزانات" },
            { href: "/services/kashf-tasribat-al-masabih-jeddah", label: "كشف تسربات المسابح" },
            { href: "/services/kashf-tasribat-miah-al-takyeef-jeddah", label: "كشف تسربات التكييف" },
            { href: "/services/kashf-tasribat-miah-jeddah", label: "كشف تسربات المياه بجدة" },
            { href: "/insulation", label: "عزل مائي وحراري بعد الإصلاح" },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold text-[#1f7f8a] hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 text-right">
        <h2 className="text-2xl font-extrabold text-[#163d57]">5 نصائح ذهبية لتوفير فاتورة المياه في جدة</h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          هذا المحتوى التثقيفي مبني على خبرة ميدانية حقيقية، ويساعدك على تقليل الهدر واكتشاف التسربات مبكراً قبل تضخم
          المشكلة. عندما تجمع بين الفحص الدوري وسرعة الإجراء، تكون فرصة حل ارتفاع فاتورة المياه بجدة أعلى بكثير.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {billingTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-7 text-[#4a6677]">
          للمزيد:{" "}
          <Link href="/blog/ارتفاع-فاتورة-المياه-جدة" className="font-semibold text-[#1f7f8a] hover:underline">
            دليل ارتفاع فاتورة المياه
          </Link>
          {" · "}
          <Link href="/blog/5-ayat-tasarab" className="font-semibold text-[#1f7f8a] hover:underline">
            5 علامات تسرب
          </Link>
          {" · "}
          <Link href="/smart-leak-diagnosis" className="font-semibold text-[#1f7f8a] hover:underline">
            المشخّص الذكي
          </Link>
          {" · "}
          <Link href="/blog/kaif-taktashif-tasarobat-almiyah" className="font-semibold text-[#1f7f8a] hover:underline">
            الكشف قبل فوات الأوان
          </Link>
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 text-right">
        <h2 className="text-xl font-bold text-[#163d57]">تغطية الأحياء في جدة</h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نغطي جميع أحياء جدة — من أبحر والشاطئ إلى الأحياء الجنوبية. اختر حيّك للتفاصيل المحلية،
          أو اتصل مباشرة لحجز فحص في منطقتك.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#f7f9fa] p-6 text-right">
        <h2 className="text-2xl font-extrabold text-[#163d57]">ماذا يقول عملاؤنا في جدة؟</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="rounded-xl border border-[#e8edf0] bg-white p-4">
              <p className="leading-8 text-[#33586d]">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-2 text-sm font-semibold text-[#1f7f8a]">
                {item.author} - {item.area}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#ffffff] p-6 text-right">
        <h2 className="text-2xl font-extrabold text-[#163d57]">الأحياء التي نغطيها في جدة</h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نقدم خدمة سريعة في الأحياء التالية مع تنسيق مباشر للحجز والمعاينة خلال اليوم نفسه حسب المتاح.
        </p>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {coveredAreaLinks.map((area) => (
            <Link
              key={area.name}
              href={area.href}
                className="rounded-full border border-[#e3e8eb] bg-[#f7f9fa] px-3 py-1 text-sm font-bold text-[#35566a] transition hover:border-[#cfd8dd] hover:bg-[#eef2f4] hover:text-[#163d57]"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#f7f9fa] p-6 text-right">
        <h2 className="text-2xl font-extrabold text-[#163d57]">ميزة التشخيص السريع قبل الحجز</h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          أضفنا خطوة عملية تساعدك قبل طلب الزيارة الميدانية: راجع النقاط التالية، وإذا كانت علامتان أو أكثر موجودة لديك،
          فاحتمال وجود تسرب خفي يكون مرتفعًا ويستحق الفحص المبكر.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {quickCheckItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-row-reverse flex-wrap justify-end gap-3">
          <Link
            href="/smart-leak-diagnosis"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
            )}
          >
            ابدأ التشخيص الذكي الآن
          </Link>
          <a
            href={`https://wa.me/${siteConfig.phone.replace("+", "")}?text=${encodeURIComponent("مرحباً، لدي مؤشرات تسرب وأحتاج فحصًا ميدانيًا وتقريرًا معتمدًا.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex h-11 items-center gap-2 rounded-xl border-[#25D366]/50 bg-[#25D366] px-6 font-semibold text-white hover:bg-[#20bd5a]",
            )}
          >
            <WhatsAppLogo className="size-5 shrink-0 text-white" />
            إرسال الحالة عبر واتساب
          </a>
        </div>
      </section>

      <EncyclopediaSection
        categoryId="leak-detection"
        heading="مواضيع ذات صلة من موسوعة كشف التسربات"
        className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8"
      />

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-[#f7f9fa] p-6 text-right md:p-8">
        <h2 className="text-2xl font-extrabold text-[#163d57]">أسئلة شائعة عن كشف التسربات في جدة</h2>
        <div className="mt-4 space-y-4">
          {LEAK_DETECTION_FAQ_ITEMS.map((item) => (
            <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-white p-4">
              <h3 className="text-lg font-bold leading-8 text-[#163d57]">{item.question}</h3>
              <p className="mt-2 text-base leading-8 text-[#4a6677]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <RelatedServicesSection currentPath="/leak-detection" />
    </main>
  );
}

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
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "كشف تسربات المياه في جدة بدون تكسير",
    description:
      "كشف تسربات المياه بجدة بدون تكسير: فحص حراري وصوتي، كشف خزانات وحمامات وأسطح، تقرير معتمد لشركة المياه، وإصلاح بخطة واضحة.",
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
    <main className="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="rounded-3xl border border-[#e8edf0] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#f1f4f6] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <SearchCheck className="size-4" aria-hidden />
          دقة عالية بدون تكسير عشوائي
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
          خدمة كشف تسربات المياه
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4a6677]">
          كشف تسربات المياه بجدة معتمدة لدى شركة المياه الوطنية لتقليل أثر ارتفاع الفاتورة وتوفير تقرير رسمي يدعم موقفك.
          نعتمد على فحص إلكتروني احترافي لتحديد نقاط التسرب بسرعة، ثم نوصي بالحل الأنسب وفق حالة المبنى ونوع الشبكة.
          كشف تسربات المياه بجدة معتمدة لدى شركة المياه الوطنية مع توثيق فني واضح يساعدك في متابعة الطلب مع الجهات المختصة.
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
        <h2 className="text-2xl font-extrabold text-[#163d57]">خدمات كشف التسربات والعزل في جدة</h2>
        <p className="mt-3 leading-8 text-[#4a6677]">
          إذا كنت تبحث عن كشف تسربات المياه بجدة أو شركة كشف تسربات بجدة بخبرة ميدانية، فنحن نقدم فحص تسربات المياه
          بجدة بأجهزة إلكترونية دقيقة مع تقرير كشف تسربات معتمد. كما نوفر خدمة شركة كشف تسربات معتمدة بجدة لتسهيل
          المتابعة عند الحاجة إلى تعديل فاتورة المياه شركة المياه الوطنية وفق الإجراءات الرسمية.
        </p>
        <p className="mt-3 leading-8 text-[#4a6677]">
          خدماتنا تشمل كذلك عزل خزانات بجدة، وشركة عزل خزانات بجدة بخامات مناسبة، بالإضافة إلى شركة عزل أسطح بجدة
          وتنفيذ عزل أسطح بجدة أبحر الشمالية مع مراعاة ظروف الرطوبة والحرارة. ونقدّم أيضًا كشف تسربات الخزانات بجدة
          (بدون تكسير) في الحالات المناسبة لتقليل الضرر على التشطيبات.
        </p>
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
      </section>

      <section className="mt-8 rounded-2xl border border-[#e8edf0] bg-white p-6 text-right">
        <h2 className="text-xl font-bold text-[#163d57]">تغطية الأحياء والاحتياج الفعلي للعميل</h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نغطي أحياء متعددة داخل جدة، وتشمل طلبات شائعة مثل كشف تسربات المياه بجدة حي الحمدانية، وشركة عزل خزانات بجدة
          حي الصفا، وأعمال خدمات العزل والتسربات في حي الروضة، مع تركيز عملي على حل ارتفاع فاتورة المياه بجدة بسرعة
          وتقرير واضح.
        </p>
        <p className="mt-2 leading-8 text-[#4a6677]">
          عند المقارنة بين الخيارات في الأحياء السكنية، يبحث كثير من العملاء عن أفضل شركة كشف تسربات في حي السامر،
          لذلك نركز على نتيجة قابلة للقياس: تحديد مصدر التسرب بدقة، خطة إصلاح واضحة، وتوثيق فني يساعدك في إنهاء
          المشكلة بثقة.
        </p>
        <h3 className="mt-4 text-lg font-extrabold text-[#163d57]">المناطق التي نغطيها</h3>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نحن نصل إليكم في أحياء جدة عبر صفحات تغطية محلية مخصصة. اضغط على الحي المناسب لعرض صفحة الخدمة الخاصة به،
          وخدمة سريعة على مدار 24 ساعة لجميع مناطق جدة.
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
              <h3 className="text-lg font-bold leading-8 text-[#163d57]">س: {item.question}</h3>
              <p className="mt-2 text-base leading-8 text-[#4a6677]">ج: {item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <RelatedServicesSection currentPath="/leak-detection" />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, SearchCheck, ShieldCheck } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import { images } from "@/lib/images";
import {
  KASHF_JEDDAH_BENEFITS,
  KASHF_JEDDAH_FAQ,
  KASHF_JEDDAH_INTERNAL_LINKS,
  KASHF_JEDDAH_PAGE_PATH,
  KASHF_JEDDAH_PROCESS,
  KASHF_JEDDAH_SIGNS,
  KASHF_JEDDAH_TECH,
  KASHF_JEDDAH_WHY_US,
} from "@/lib/seo/kashf-tasribat-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج كشف تسربات مياه في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function KashfTasribatJeddahPageBody() {
  const hero = images.kashfJeddahPageHero;
  const field = images.kashfJeddahPageField;

  return (
    <main className="page-main pb-mobile-fab py-10 md:py-16">
      <Link
        href="/services"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#f8fbfc]",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        العودة لصفحة الخدمات
      </Link>

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-[#e8edf0] bg-white shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)]">
        <div className="relative aspect-[3/2] w-full sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={hero.src}
            alt={hero.alt}
            title={hero.title}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d42]/90 via-[#0f2d42]/50 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-6 text-right text-white md:p-10">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
              <SearchCheck className="size-4" aria-hidden />
              فحص بدون تكسير · تقرير فني · جدة
            </p>
            <h1 className="text-balance text-3xl font-extrabold leading-tight md:text-5xl">
              كشف تسربات المياه بجدة
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-white/95 md:text-lg">
              للفلل والشقق والعمائر والمستودعات — نحدد مصدر التسرب بدقة ونوقف الهدر قبل أن تتضاعف الأضرار.
            </p>
            <div className="mt-6 flex flex-row-reverse flex-wrap justify-end gap-3">
              <a
                href={tel}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4" aria-hidden />
                  طلب فحص الآن
                </span>
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-xl border-white/60 bg-white/10 px-6 font-semibold text-white hover:bg-white/20",
                )}
              >
                احجز معاينة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>مقدمة</h2>
        <p className={pClass}>
          إذا كنت تبحث عن <strong>كشف تسربات المياه بجدة</strong> لأن الفاتورة ارتفعت فجأة، أو لأنك لاحظت
          رطوبة في الحمام دون سبب واضح، فأنت في المكان الصحيح. في <strong>{siteConfig.name}</strong> نُعالج
          الحالة كما هي في الواقع: شقة سكنية، فيlla مستقلة، عمارة متعددة الطوابق، محل تجاري، أو مستودع — لكل
          نوع شبكة مياه وسلوك تسرب مختلف.
        </p>
        <p className={pClass}>
          لا نبيع وعوداً فارغة. نبدأ بأسئلة دقيقة، ثم فحصاً ميدانياً بأجهزة حديثة، ثم تقريراً يشرح أين المشكلة
          وماذا يُفعل بعدها. هدفنا تحويل البحث إلى قرار واضح: إصلاح موضعي، عزل وقائي، أو متابعة مع{" "}
          <Link href="/blog/ارتفاع-فاتورة-المياه-جدة">شركة المياه الوطنية</Link> عند ثبوت التسرب.
        </p>
      </section>

      {/* About + image */}
      <section className={cn(sectionClass, "mt-8")}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className={h2Class}>عن الخدمة</h2>
            <p className={pClass}>
              <strong>كشف تسربات المياه</strong> ليس مجرد «سماع صوت ماء» أو فتح جدار عشوائي. الخدمة الاحترافية
              تعني قياساً منظماً: فحص العداد، تتبع مسار المواسير، استخدام التصوير الحراري أو جهاز صوتي عند
              الحاجة، ثم تحديد نقطة التسرب قبل أي تدخل بناء.
            </p>
            <p className={pClass}>
              نخدم <strong>الفلل</strong> في شمال وجنوب جدة، <strong>الشقق</strong> في الأبراج السكنية،{" "}
              <strong>العمائر</strong> المختلطة، و<strong>المنشآت التجارية</strong> التي لا تحتمل توقفاً
              طويلاً. في المستودعات والورش، التسرب الخفي قد يُفسد مخزوناً أو يرفع تكلفة التشغيل — لذلك
              نُعدّ خطة فحص تتناسب مع حجم الشبكة وساعات العمل.
            </p>
            <p className={pClass}>
              بعد التشخيص، نربطك بمسار الإصلاح أو{" "}
              <Link href="/insulation">العزل المائي</Link> إذا كان سبب الرطوبة تمدداً أو عزلاً تالفاً — دون
              إجبارك على خدمات لا تحتاجها.
            </p>
          </div>
          <figure className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={field.src}
              alt={field.alt}
              title={field.title}
              fill
              sizes="(max-width: 1024px) 100vw, 384px"
              quality={80}
              loading="lazy"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Why important */}
      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>لماذا هذه الخدمة مهمة؟</h2>
        <p className={pClass}>
          في مناخ جدة، الرطوبة العالية تُسرّع ظهور أضرار التسرب: تلف دهان، نمو عفن، تآكل حديد التسليح داخل
          الجدران. التأخير في <strong>كشف تسربات المياه بجدة</strong> يعني فاتورة أعلى كل شهر، وإصلاحاً
          أوسع لاحقاً.
        </p>
        <p className={pClass}>
          كثير من العملاء يصلون إلينا بعد محاولات «تجربة وخطأ»: تغيير خلاط، إعادة سيليكون، أو تكسير بلاط
          دون تحديد المصدر. الفحص المسبق يوفر عليك تكلفة تشطيبات غير ضرورية ويُحدد ما إذا كانت المشكلة من
          وصلة داخلية، شبكة تغذية، خزان، أو تمديدات خارجية.
        </p>
        <p className={pClass}>
          في المباني التجارية، التسرب قد يُعطّل نشاطاً أو يُخالف اشتراطات السلامة. في الشقق المؤجرة،
          الإبلاغ المبكر يحمي المستأجر والمالك من نزاعات حول أضرار الرطوبة.
        </p>
      </section>

      {/* Signs */}
      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى كشف تسربات</h2>
        <p className={pClass}>
          راجع القائمة التالية. إن وُجدت <strong>علامتان أو أكثر</strong>، فالفحص المبكر منطقي — جرّب أيضاً{" "}
          <Link href="/smart-leak-diagnosis">المشخّص الذكي</Link> قبل حجز الزيارة.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {KASHF_JEDDAH_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ الخدمة</h2>
        <ol className="mt-6 space-y-4">
          {KASHF_JEDDAH_PROCESS.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#163d57]">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Tech */}
      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>التقنيات والأجهزة المستخدمة</h2>
        <p className={pClass}>
          نُحدّث أدوات الفحص بما يلائم شبكات جدة: مواسير PVC، نحاس، خزانات علوية، وأسطح مبلطة. لا نعتمد
          على جهاز واحد لكل الحالات.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {KASHF_JEDDAH_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار فحص احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {KASHF_JEDDAH_BENEFITS.map((b) => (
            <li key={b} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Districts */}
      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <MapPin className="size-6 text-[#1f7f8a]" aria-hidden />
          الأحياء التي نخدمها في جدة
        </h2>
        <p className={pClass}>
          نغطي <strong>جميع أحياء جدة</strong> المعروفة في نطاق الخدمة — من أبحر والشاطئ شمالاً إلى
          الأحياء الجنوبية والوسطى. اختر حيّك للتفاصيل المحلية وروابط الحجز:
        </p>
        <p className="mt-3 text-sm leading-8 text-[#4a6677]">
          {jeddahDistricts.map((d) => d.district).join("، ")}.
        </p>
        <div className="mt-5 flex max-h-64 flex-wrap justify-end gap-2 overflow-y-auto">
          {jeddahDistricts.map((area) => (
            <Link
              key={area.id}
              href={area.href}
              className="rounded-full border border-[#e3e8eb] bg-[#f7f9fa] px-3 py-1 text-sm font-semibold text-[#35566a] transition hover:border-[#1f7f8a]/40 hover:text-[#163d57]"
            >
              {area.district}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#4a6677]">
          <Link href="/coverage" className="font-semibold text-[#1f7f8a] hover:underline">
            عرض خريطة التغطية الكاملة
          </Link>
        </p>
      </section>

      {/* Why us */}
      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <ShieldCheck className="size-6 text-[#1f7f8a]" aria-hidden />
          لماذا تختار {siteConfig.name}؟
        </h2>
        <ul className="mt-4 space-y-3 text-right">
          {KASHF_JEDDAH_WHY_US.map((item) => (
            <li key={item} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>أسئلة شائعة</h2>
        <div className="mt-6 space-y-4">
          {KASHF_JEDDAH_FAQ.map((item) => (
            <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="text-lg font-bold text-[#163d57]">{item.question}</h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {KASHF_JEDDAH_INTERNAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#1f7f8a] shadow-sm hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Conclusion CTA */}
      <section className="mt-8 rounded-3xl bg-gradient-to-l from-[#1f7f8a] to-[#163d57] p-8 text-right text-white md:p-10">
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لكشف التسرب في عقارك بجدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى تتضاعف الرطوبة أو ترتفع الفاتورة مرة أخرى. اتصل الآن أو راسلنا على واتساب — نُحدد
          موعد معاينة ونشرح لك الخطوات قبل الوصول.
        </p>
        <div className="mt-6 flex flex-row-reverse flex-wrap justify-end gap-3">
          <a
            href={tel}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-white px-6 font-bold text-[#163d57] hover:bg-white/90",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex h-11 items-center gap-2 rounded-xl border-white/50 bg-[#25D366] px-6 font-semibold text-white hover:bg-[#20bd5a]",
            )}
          >
            <WhatsAppLogo className="size-5 shrink-0 text-white" />
            واتساب
          </a>
        </div>
      </section>

      <RelatedServicesSection currentPath={KASHF_JEDDAH_PAGE_PATH} />
    </main>
  );
}

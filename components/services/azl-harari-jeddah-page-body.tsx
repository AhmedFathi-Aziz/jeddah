import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, ShieldCheck, Sun } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import { images } from "@/lib/images";
import {
  AZL_HARARI_ABOUT,
  AZL_HARARI_APPLICATIONS,
  AZL_HARARI_BENEFITS,
  AZL_HARARI_FAQ,
  AZL_HARARI_INTERNAL_LINKS,
  AZL_HARARI_INTRO,
  AZL_HARARI_PAGE_PATH,
  AZL_HARARI_PROCESS,
  AZL_HARARI_SIGNS,
  AZL_HARARI_TECH,
  AZL_HARARI_WHY,
  AZL_HARARI_WHY_US,
} from "@/lib/seo/azl-harari-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج عزل حراري في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

const galleryImages = [
  images.azlHarariPageRoofFoam,
  images.azlHarariPageField,
  images.azlHarariPageTankExternal,
] as const;

function renderBoldText(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#163d57]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function AzlHarariJeddahPageBody() {
  const field = images.azlHarariPageField;

  return (
    <main className="page-main pb-mobile-fab py-10 md:py-16">
      <nav className="mb-6 text-sm text-[#5a7588]" aria-label="مسار التصفح">
        <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link href="/insulation" className="font-medium text-[#1f7f8a] hover:underline">
          العزل
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#163d57]">عزل حراري بجدة</span>
      </nav>

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

      <section className="overflow-hidden rounded-3xl border border-[#e8edf0] bg-white shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)]">
        <div className="flex min-h-[200px] w-full items-center justify-center bg-white px-6 py-10 sm:min-h-[240px] sm:py-12 md:min-h-[280px] md:py-14">
          <BrandLogo
            variant="full"
            priority
            sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 420px"
            className="h-36 w-auto max-w-[min(420px,90vw)] sm:h-44 md:h-52"
          />
        </div>
        <div className="border-t border-[#e8edf0] bg-gradient-to-b from-[#f8fbfc] to-white p-6 text-right md:p-10">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#ecf8f8] px-3 py-1 text-sm font-semibold text-[#1f7f8a]">
            <Sun className="size-4" aria-hidden />
            فوم · أسطح · خزانات · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            عزل حراري بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            خفّض حرارة أسطحك وفاتورة التكييف — فوم بولي يوريثان، عزل خزانات خارجي، ومعاينة
            ميدانية مع ضمان يصل إلى 10 سنوات على التنفيذ السليم.
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
                طلب معاينة عزل حراري
              </span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex h-11 items-center gap-2 rounded-xl border-[#25D366]/50 bg-[#25D366] px-6 font-semibold text-white hover:bg-[#20bd5a]",
              )}
            >
              <WhatsAppLogo className="size-5 shrink-0 text-white" />
              واتساب
            </a>
          </div>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>مقدمة</h2>
        {AZL_HARARI_INTRO.map((para) => (
          <p key={para.slice(0, 48)} className={pClass}>
            {renderBoldText(para)}
          </p>
        ))}
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className={h2Class}>عن الخدمة — ما هو العزل الحراري؟</h2>
            {AZL_HARARI_ABOUT.map((para) => (
              <p key={para.slice(0, 40)} className={pClass}>
                {renderBoldText(para)}
              </p>
            ))}
            <p className={pClass}>
              سواء كنت مالك فيلا في أبحر، أو مدير{" "}
              <strong className="text-[#163d57]">عمارة</strong> في الروضة، أو مسؤول{" "}
              <strong className="text-[#163d57]">مستودع</strong> بالمنطقة الصناعية — نُعد خطة
              عزل حراري تلائم نوع المبنى واستخدامه، لا «حلّاً عاماً» ينسخ على كل سطح.
            </p>
          </div>
          <figure className="relative mx-auto aspect-[1024/583] w-full max-w-lg overflow-hidden rounded-2xl">
            <Image
              src={field.src}
              alt={field.alt}
              title={field.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
              quality={78}
              loading="lazy"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>لماذا العزل الحراري ضروري في جدة؟</h2>
        {AZL_HARARI_WHY.map((para) => (
          <p key={para.slice(0, 40)} className={pClass}>
            {renderBoldText(para)}
          </p>
        ))}
        <p className={pClass}>
          كثير من العملاء يصلون إلينا بعد تجربة «دهان أبيض عاكس» أو طبقة رقيقة من مقاول عام —
          ثم يتفاجأون بأن الغرفة العلوية ما زالت حارة والفاتورة لم تنخفض. الفرق بين ذلك وبين{" "}
          <strong className="text-[#163d57]">عزل حراري بجدة</strong> احترافي يظهر في السماكة
          المحسوبة، طبقة الحماية من الأشعة فوق البنفسجية، وإغلاق الفجوات عند المكيّفات — لا في
          لون السطح فقط.
        </p>
        <p className={pClass}>
          في المملكة، برامج كفاءة الطاقة تشجّع على عزل المباني — والاستثمار في{" "}
          <strong className="text-[#163d57]">عزل حراري للأسطح</strong> من أوائل الخطوات التي
          يُنصح بها للمباني القائمة في جدة قبل موسم الصيف.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>أين نُطبّق العزل الحراري؟</h2>
        <p className={pClass}>
          <strong className="text-[#163d57]">عزل حراري بجدة</strong> ليس حصراً على أسطح الفلل —
          نغطي كل المواضع التي تتسرّب منها الحرارة:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {AZL_HARARI_APPLICATIONS.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-white p-5">
              <h3 className="text-lg font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{renderBoldText(item.body)}</p>
            </article>
          ))}
        </div>
        <p className={pClass}>
          في <strong className="text-[#163d57]">المباني التجارية</strong> — مكاتب، عيادات،
          مطاعم — حرارة السقف ترفع تكلفة التشغيل وتُقلل راحة الزبائن. في{" "}
          <strong className="text-[#163d57]">الشقق</strong> العلوية، سطح غير معزّل يجعل غرفة
          النوم الأقرب للسقف غير صالحة للنوم بعد الظهر — العزل قبل التشطيب أو على السطح المشترك
          يحل المشكلة من المصدر.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى عزل حراري</h2>
        <p className={pClass}>
          إن وُجدت <strong className="font-semibold text-[#163d57]">علامتان أو أكثر</strong>،
          المعاينة أولوية — خاصة قبل ذروة الصيف:
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {AZL_HARARI_SIGNS.map((sign) => (
            <li key={sign}>{renderBoldText(sign)}</li>
          ))}
        </ul>
        <figure className="relative mt-8 aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl ms-auto">
          <Image
            src={images.azlHarariPageRoofFoam.src}
            alt={images.azlHarariPageRoofFoam.alt}
            title={images.azlHarariPageRoofFoam.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            quality={76}
            loading="lazy"
            className="object-cover"
          />
        </figure>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ عزل حراري بجدة</h2>
        <ol className="mt-6 space-y-4">
          {AZL_HARARI_PROCESS.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#163d57]">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{renderBoldText(step.body)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>التقنيات والمعدات المستخدمة</h2>
        <p className={pClass}>
          مناخ جدة الحار يفرض مواد تتحمل أشعة الشمس المباشرة وحرارة السطح العالية — لا أنظمة
          رقيقة تتآكل خلال موسم:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {AZL_HARARI_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{renderBoldText(item.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>صور من أعمال العزل الحراري</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <figure key={img.src} className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={img.src}
                alt={img.alt}
                title={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={72}
                loading="lazy"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>فوائد اختيار عزل حراري احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {AZL_HARARI_BENEFITS.map((b) => (
            <li key={b} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{renderBoldText(b)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <MapPin className="size-6 text-[#1f7f8a]" aria-hidden />
          الأحياء التي نخدمها في جدة
        </h2>
        <p className={pClass}>
          ننفّذ <strong className="text-[#163d57]">عزل حراري بجدة</strong> في جميع أحياء المدينة —
          من شمال جدة حيث <strong className="text-[#163d57]">أبحر</strong> و
          <strong className="text-[#163d57]"> الشاطئ</strong> والفلل بأسطح واسعة تحتاج عزل
          بسماكة كافية، إلى <strong className="text-[#163d57]">الروضة</strong> و
          <strong className="text-[#163d57]">الصفا</strong> والعمائر الكثيفة، و
          <strong className="text-[#163d57]">الحمدانية</strong> و
          <strong className="text-[#163d57]">النسيم</strong> في الأحياء السكنية، و
          <strong className="text-[#163d57]">المنطقة الصناعية</strong> للمستودعات والهناجر.
          نُنسّق المواعيد حسب حيّك — اذكر منطقتك عند الاتصال للرد الأسرع.
        </p>
        <p className="mt-3 text-sm leading-8 text-[#4a6677]">
          {jeddahDistricts.map((d) => d.district).join("، ")}.
        </p>
        <div className="mt-5 flex max-h-64 flex-wrap justify-end gap-2 overflow-y-auto">
          {jeddahDistricts.map((area) => (
            <Link
              key={area.id}
              href={area.href}
              className="rounded-full border border-[#e3e8eb] bg-white px-3 py-1 text-sm font-semibold text-[#35566a] transition hover:border-[#1f7f8a]/40 hover:text-[#163d57]"
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

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <ShieldCheck className="size-6 text-[#1f7f8a]" aria-hidden />
          لماذا تختار {siteConfig.name}؟
        </h2>
        <ul className="mt-4 space-y-3 text-right">
          {AZL_HARARI_WHY_US.map((item) => (
            <li key={item} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{renderBoldText(item)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>أسئلة شائعة عن العزل الحراري في جدة</h2>
        <div className="mt-6 space-y-4">
          {AZL_HARARI_FAQ.map((item) => (
            <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-white p-5">
              <h3 className="text-lg font-bold text-[#163d57]">{item.question}</h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{renderBoldText(item.answer)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>خاتمة</h2>
        <p className={pClass}>
          <strong className="text-[#163d57]">عزل حراري بجدة</strong> استثمار في راحتك وتوفير
          طاقة — لكنه ينجح فقط عندما تُحسب السماكة لمناخك، وتُحمى الطبقة من الشمس، ويُغلق كل
          ممر حراري على السطح. لا تنتظر حتى يتعطل المكيّف أو ترتفع الفاتورة مرة أخرى.
        </p>
        <p className={pClass}>
          اتصل اليوم أو راسلنا على واتساب — نُحدد موعد معاينة مجانية، نشرح خيارات الفوم
          والألواح وعزل الخزانات، ونُقدّم تقديراً واضحاً قبل أي التزام.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {AZL_HARARI_INTERNAL_LINKS.map((link) => (
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

      <section className="mt-8 rounded-3xl bg-gradient-to-l from-[#1f7f8a] to-[#163d57] p-8 text-right text-white md:p-10">
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لعزل حراري في جدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر ذروة الصيف. احجز معاينة — نحدد المادة والسماكة والتكلفة بعد رؤية السطح أو
          الخزان.
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

      <RelatedServicesSection currentPath={AZL_HARARI_PAGE_PATH} />
    </main>
  );
}

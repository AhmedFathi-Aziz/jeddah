import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Home, MapPin, Phone, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import { images } from "@/lib/images";
import {
  AZL_ASHTOF_BENEFITS,
  AZL_ASHTOF_FAQ,
  AZL_ASHTOF_INTERNAL_LINKS,
  AZL_ASHTOF_PAGE_PATH,
  AZL_ASHTOF_PROCESS,
  AZL_ASHTOF_SIGNS,
  AZL_ASHTOF_TECH,
  AZL_ASHTOF_WHY_US,
} from "@/lib/seo/azl-ashtof-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج عزل أسطح في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function AzlAshtofJeddahPageBody() {
  const field = images.azlAshtofPageField;

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
            <Home className="size-4" aria-hidden />
            فلل · عمائر · مستودعات · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            عزل أسطح بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            عزل مائي وحراري للفلل والشقق والمباني التجارية — فوم، بيتومين، أو نظام مركب بعد معاينة
            ميدانية تحدد ما يناسب سطحك في مناخ جدة.
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
                طلب معاينة سطح
              </span>
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
              )}
            >
              احجز معاينة
            </Link>
          </div>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>مقدمة</h2>
        <p className={pClass}>
          إذا كنت تبحث عن <strong>عزل أسطح بجدة</strong> لأن السقف العلوي حارّ رغم التكييف، أو لأن
          الأمطار تركت بقعاً على الجبس، فأنت لا تحتاج «دهاناً مقاوماً للماء» فقط — تحتاج نظام
          عزل يُختار بعد فحص السطح. في <strong>{siteConfig.name}</strong> نبدأ بالمعاينة: نوع
          السطح، الميل، العزل القديم، والمصارف — ثم نُقترح فوماً أو بيتوميناً أو مزيجاً يناسب
          استخدامك.
        </p>
        <p className={pClass}>
          في <strong>الفلل</strong> بأبحر والشمال، الأسطح واسعة ومعرّضة للشمس ساعات طويلة — العزل
          الحراري يُخفّض فاتورة الكهرباء. في <strong>الشقق</strong> العلوية بالعمائر، تسرب
          الأمطار يظهر أولاً على السقف الداخلي. في <strong>المستودعات</strong> و<strong>المباني
          التجارية</strong>، الحرارة على السطح المعدني تؤثر على التشغيل والمخزون. لكل حالة
          مسار مختلف.
        </p>
        <p className={pClass}>
          نربط العزل بـ{" "}
          <Link href="/leak-detection">كشف التسربات</Link> عند وجود رطوبة نشطة — لأن طبقة عزل فوق
          تسرب غير معالج تضيع استثمارك. راجع{" "}
          <Link href="/blog/عزل-أسطح-بجدة">دليل عزل الأسطح</Link> أو{" "}
          <Link href="/insulation-services/foam-thermal-waterproof-insulation">صفحة عزل الفوم</Link>{" "}
          قبل حجز الزيارة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className={h2Class}>عن الخدمة</h2>
            <p className={pClass}>
              <strong>عزل الأسطح</strong> في جدة يجمع غالباً بين وظيفتين: منع دخول ماء الأمطار
              الموسمية، وتقليل انتقال حرارة الشمس إلى الداخل. ننفّذ عزل مائي بالفوم أو لفائف
              البيتومين، وعزل حراري عند الحاجة — مع حماية UV وصيانة مصارف المطر.
            </p>
            <p className={pClass}>
              نخدم أسطح <strong>الخرسانة</strong> العارية، الأسطح <strong>المبلطة</strong>،
              وأسطح <strong>الشقق</strong> في <strong>العمائر</strong>، و<strong>الفلل</strong>{" "}
              المستقلة، و<strong>المستودعات</strong> والهناجر. في{" "}
              <strong>المباني التجارية</strong> — مكاتب، محلات، عيادات — نُنسّق التنفيذ مع ساعات
              العمل.
            </p>
            <p className={pClass}>
              لا نبيع مادة قبل المعاينة. إن كان السطح يحتاج إزالة عزل متقشر أو معالجة شق قبل
              الرش، نُوضح ذلك في العرض. وإن ثبت تسرب من خزان علوي، نوجهك إلى{" "}
              <Link href="/services/kashf-tasribat-al-khazanat-jeddah">كشف تسربات الخزانات</Link>{" "}
              قبل إغلاق السطح.
            </p>
            <p className={pClass}>
              نُسلّم تقريراً يوضح المادة والسماكة ومناطق التنفيذ — حتى تعرف ما دفعت عنه عند
              التجديد أو البيع.
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

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>لماذا هذه الخدمة مهمة؟</h2>
        <p className={pClass}>
          سطح غير معزول في جدة يُشبّه «سخاناً» فوق رأسك طوال الصيف — و«ثقباً» يسمح للماء في
          موسم الأمطار. تأخير <strong>عزل أسطح بجدة</strong> يعني تشققات بلاط، تلف دهان، عفن في
          الدور العلوي، وخلافات مع الجيران عند تسرب لمياه الشقة السفلية.
        </p>
        <p className={pClass}>
          كثير من أصحاب العقار يطبّقون «حلولاً رخيصة» — طبقة دهان أو سيليكون على الشق — دون
          معالجة الميل أو المصارف. الماء يعود بعد أول أمطار غزيرة. المعاينة المنهجية تمنع
          إعادة العمل مرتين.
        </p>
        <p className={pClass}>
          للمستثمر العقاري، عزل سطح موثّق يرفع قيمة الأصل ويُسهّل التأجير — خاصة في أحياء
          شمال جدة حيث الفلل الكبيرة تتطلب صيانة دورية للأسطح.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى عزل أو إعادة عزل السطح</h2>
        <p className={pClass}>
          راجع القائمة التالية. إن وُجدت <strong>علامتان أو أكثر</strong>، معاينة السطح أولوية
          — خاصة قبل موسم الأمطار أو قبل ذروة الصيف.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {AZL_ASHTOF_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ الخدمة</h2>
        <ol className="mt-6 space-y-4">
          {AZL_ASHTOF_PROCESS.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#163d57]">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>التقنيات والمواد المستخدمة</h2>
        <p className={pClass}>
          أسطح جدة تختلف في العمر والتشطيب — نختار المادة بعد المعاينة، لا قبلها.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {AZL_ASHTOF_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار عزل أسطح احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {AZL_ASHTOF_BENEFITS.map((b) => (
            <li key={b} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <MapPin className="size-6 text-[#1f7f8a]" aria-hidden />
          الأحياء التي نخدمها في جدة
        </h2>
        <p className={pClass}>
          نغطي <strong>جميع أحياء جدة</strong> — من أبحر والشاطئ حيث الفلل بأسطح واسعة، إلى
          الأحياء الجنوبية والوسطى ذات العمائر الكثيفة:
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

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={cn(h2Class, "inline-flex items-center gap-2")}>
          <ShieldCheck className="size-6 text-[#1f7f8a]" aria-hidden />
          لماذا تختار {siteConfig.name}؟
        </h2>
        <ul className="mt-4 space-y-3 text-right">
          {AZL_ASHTOF_WHY_US.map((item) => (
            <li key={item} className="flex w-full items-start gap-3 text-[#33586d]">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#1f7f8a]" aria-hidden />
              <span className="flex-1 text-right leading-8">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>أسئلة شائعة</h2>
        <div className="mt-6 space-y-4">
          {AZL_ASHTOF_FAQ.map((item) => (
            <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="text-lg font-bold text-[#163d57]">{item.question}</h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خاتمة</h2>
        <p className={pClass}>
          <strong>عزل أسطح بجدة</strong> استثمار في راحة منزلك وفاتورة الكهرباء وحماية
          المبنى من الأمطار — لكنه ينجح فقط عندما يُبنى على معاينة صحيحة ومادة مناسبة. سواء
          كنت في فيلا بأبحر، شقة علوية في عمارة، أو مستودعاً في المنطقة الصناعية — ابدأ
          بمعاينة قبل التوقيع على أي عرض.
        </p>
        <p className={pClass}>
          اتصل اليوم أو راسلنا على واتساب — نُحدد موعد زيارة، نشرح خيارات الفوم والبيتومين،
          ونُقدّم تقديراً واضحاً.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {AZL_ASHTOF_INTERNAL_LINKS.map((link) => (
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
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لعزل سطحك في جدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى تتسرب الأمطار أو يشتد الحر. احجز معاينة — نحدد المادة والتكلفة بعد
          رؤية السطح.
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

      <RelatedServicesSection currentPath={AZL_ASHTOF_PAGE_PATH} />
    </main>
  );
}

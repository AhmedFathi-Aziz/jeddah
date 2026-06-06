import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, ShieldCheck, Wind } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import {
  KASHF_TAKYEEF_BENEFITS,
  KASHF_TAKYEEF_FAQ,
  KASHF_TAKYEEF_INTERNAL_LINKS,
  KASHF_TAKYEEF_PAGE_PATH,
  KASHF_TAKYEEF_PROCESS,
  KASHF_TAKYEEF_SIGNS,
  KASHF_TAKYEEF_TECH,
  KASHF_TAKYEEF_WHY_US,
} from "@/lib/seo/kashf-takyeef-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج كشف تسربات مياه تكييف في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function KashfTakyeefJeddahPageBody() {
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
            <Wind className="size-4" aria-hidden />
            فلل · شقق · عمائر · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            كشف تسربات مياه التكييف بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            نحدد مصدر تنقيط المكيف أو الرطوبة على السقف — خط تصريف، بانيو، أو تكثف — قبل أن يتلف
            الجبس أو ينتقل الماء للجار في العمارة.
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
                طلب فحص تكييف
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
          إذا كنت تبحث عن <strong>كشف تسربات مياه التكييف بجدة</strong> لأن السقف تحت المكيف
          اتصبغ، أو لأن الماء يتجمع على الأرضية كل ليلة، فأنت لا تتعامل مع «رطوبة عادية» فقط.
          في <strong>{siteConfig.name}</strong> نُعامل مياه التكييف كمسار تصريف كامل: وحدة داخلية،
          بانيو، خط PVC، ميل، ووصلات — لا كقطرات عشوائية يُتجاهلها حتى يتلف السقف المستعار.
        </p>
        <p className={pClass}>
          في <strong>الفلل</strong> شمال جدة، وحدات سبلit على الجدران الخارجية تُنتج تكثفاً
          كثيفاً طوال الصيف؛ انسداد خط التصريف يملأ البانيو ويُرسل الماء إلى داخل الجبس. في{" "}
          <strong>الشقق</strong> والأبراج، المساحة أصغر لكن العواقب أكبر — رطوبة الجار السفلي
          وخلافات الصيانة. في <strong>العمائر والمباني التجارية</strong> و<strong>المستودعات</strong>{" "}
          ذات أنظمة دكت أو VRF، التسرب قد يظهر في ممرات بعيدة عن الوحدة نفسها.
        </p>
        <p className={pClass}>
          نبدأ بفحص ظاهر للوحدة والخط، ثم رطوبة وتصويراً حرارياً عند الحاجة، ثم تقريراً يُحدد
          هل المشكلة تصريف تكييف أم تسرب شبكة مياه. راجع{" "}
          <Link href="/services/kashf-tasribat-bedun-taksir-jeddah">كشف تسربات بدون تكسير</Link>{" "}
          أو <Link href="/smart-leak-diagnosis">المشخّص الذكي</Link> قبل حجز الزيارة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>عن الخدمة</h2>
            <p className={pClass}>
              <strong>كشف تسربات مياه التكييف</strong> يختلف عن كشف تسربات السباكة: المصدر هنا
              ماء تكثف باردة تُجمَع وتُصرف عبر خط مخصص. عند انسداد الخط أو تآكل البانيو، يتجاوز
              الماء المسار ويظهر كتنقيط أو بقع على السقف — بينما شبكة المياه قد تكون سليمة تماماً.
            </p>
            <p className={pClass}>
              نفحص وحدات <strong>سبlit</strong> و<strong>المخفية (دكت)</strong> و<strong>المركزية</strong>{" "}
              في <strong>الفلل</strong> و<strong>الشقق</strong> و<strong>المكاتب</strong> و<strong>المستودعات</strong>.
              في <strong>المباني التجارية</strong> — عيادات، محلات، مكاتب open space — نُنسّق
              مواعيد الفحص مع ساعات التشغيل حتى لا تُعطّل أنظمة التبريد في ذروة الحر.
            </p>
            <p className={pClass}>
              بعد التشخيص، إن ثبت أن الماء من مواسير التغذية وليس من التكييف، نوجهك إلى{" "}
              <Link href="/services/kashf-tasribat-miah-jeddah">كشف تسربات المياه العام بجدة</Link>.
              وإن كان السبب خط تصريف، نُقدّم خطة تنظيف أو إعادة سحب أو استبدال بانيو — دون بيع
              صيانة مكيف لا تحتاجها.
            </p>
            <p className={pClass}>
              نُوثّق حالة الخط، البانيو، وقراءات الرطوبة — حتى يُنفَّذ الإصلاح من أول محاولة دون
              تكسير السقف بالكامل.
            </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>لماذا هذه الخدمة مهمة؟</h2>
        <p className={pClass}>
          مياه التكييف «صامتة» حتى تتشقق الطلاء: في جدة يعمل المكيف أشهراً متواصلة، والتكثف
          اليومي قد يصل لترات — إن لم يُصرف، يُشبّع العزل ويُضعف حديد التسليح في الأسقف
          المستعارة. تأخير <strong>كشف تسربات مياه التكييف بجدة</strong> يعني استبدال جبس
          كامل، معالجة عفن، أو مطالبات بين جيران في العمارة.
        </p>
        <p className={pClass}>
          كثير من العملاء يستدعون فني تكييف لـ«تنظيف فقط» بينما الخط مسدود داخل الجدار؛ أو
          يستدعون سباكاً فيُكسّر حائطاً للمواسير الساخنة بينما المشكلة بانيو بسيط. الفحص
          المنهجي يُوقف هذا التخمين.
        </p>
        <p className={pClass}>
          في المكاتب والمحلات، بقع السقف أمام الزبائن تُضعف صورة المنشأة — والتقرير الفني
          يُسرّع قرار الإدارة أو المؤجر قبل موسم الذروة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى فحص تصريف التكييف</h2>
        <p className={pClass}>
          راجع القائمة التالية. إن وُجدت <strong>علامتان أو أكثر</strong>، فحص خط التصريف أولوية
          — خاصة قبل ذروة صيف جدة. للتسربات العامة في الجدران راجع{" "}
          <Link href="/leak-detection">كشف التسربات بدون تكسير</Link>.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {KASHF_TAKYEEF_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ الخدمة</h2>
        <ol className="mt-6 space-y-4">
          {KASHF_TAKYEEF_PROCESS.map((step, i) => (
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
        <h2 className={h2Class}>التقنيات والأجهزة المستخدمة</h2>
        <p className={pClass}>
          أنظمة التكييف في جدة تختلف في العمر والتركيب — نجمع بين فحص خط التصريف، قياس الرطوبة،
          والتصوير الحراري، دون الاعتماد على أداة واحدة لكل الحالات.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {KASHF_TAKYEEF_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار فحص تصريف تكييف احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {KASHF_TAKYEEF_BENEFITS.map((b) => (
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
          نغطي <strong>جميع أحياء جدة</strong> — من أبحر والشاطئ حيث الفلل بمكيفات على
          الأسطح، إلى الأحياء الجنوبية والوسطى ذات العمائر الكثيفة:
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
          {KASHF_TAKYEEF_WHY_US.map((item) => (
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
          {KASHF_TAKYEEF_FAQ.map((item) => (
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
          <strong>كشف تسربات مياه التكييف بجدة</strong> ليس رفاهية صيانة — بل خطوة تحمي
          تشطيباتك وتُنهي التخمين بين «سباك» و«فني تكييف». في مناخنا، كل أسبوع تأخير يزيد
          كمية الماء خلف الجبس. سواء كنت في فيلا بأبحر، شقة في عمارة بوسط المدينة، أو
          مكتباً في برج تجاري — الحل يبدأ بتحديد مصدر الماء بدقة.
        </p>
        <p className={pClass}>
          اتصل اليوم أو راسلنا على واتساب؛ نُحدد موعد معاينة، نشرح ما سنفحصه، ونُقدّم
          تقديراً واضحاً قبل أي تكسير.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {KASHF_TAKYEEF_INTERNAL_LINKS.map((link) => (
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
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لفحص تنقيط المكيف في جدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى يسقط الجبس أو يشتكي الجار. اتصل الآن — نُحدد موعد معاينة ونشرح خطوات
          الفحص قبل الوصول.
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

      <RelatedServicesSection currentPath={KASHF_TAKYEEF_PAGE_PATH} />
    </main>
  );
}

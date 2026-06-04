import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, Phone, ShieldCheck, Waves } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import {
  KASHF_MASABIH_BENEFITS,
  KASHF_MASABIH_FAQ,
  KASHF_MASABIH_INTERNAL_LINKS,
  KASHF_MASABIH_PAGE_PATH,
  KASHF_MASABIH_PROCESS,
  KASHF_MASABIH_SIGNS,
  KASHF_MASABIH_TECH,
  KASHF_MASABIH_WHY_US,
} from "@/lib/seo/kashf-masabih-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج كشف تسربات مسبح في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function KashfMasabihJeddahPageBody() {
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
            <Waves className="size-4" aria-hidden />
            فلل · فنادق · مجمعات · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            كشف تسربات المسابح بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            للفلل والقصور والشقق ذات الحوش والمباني التجارية — نحدد مصدر تسرب المسبح قبل أن يهدر الماء
            ويُضعف البلاط أو أساس الحوش.
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
                طلب فحص مسبح
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
          إذا كنت تبحث عن <strong>كشف تسربات المسابح بجدة</strong> لأن المنسوب ينخفض كل يومين، أو لأنك
          لاحظت بللاً دائماً حول حافة البلاط، فالمشكلة غالباً ليست «تبخر صيف» فقط. في{" "}
          <strong>{siteConfig.name}</strong> نتعامل مع المسبح كمنظومة كاملة: جدار، خطوط تغذية وصرف،
          سكيمر، مضخة، وعزل — لا كحوض ماء معزول عن باقي العقار.
        </p>
        <p className={pClass}>
          في <strong>الفلل</strong> شمال جدة وأحياء الشاطئ، المسابح جزء أساسي من الحوش؛ التسرب تحت
          البلاط قد يُشبّع التربة ويُهدد أساسات قريبة. في <strong>الشقق</strong> والأبراج ذات الحوش
          الخاص، المساحة أصغر لكن خطوط التغذية المدفونة لا تقل خطورة. في <strong>القصور والفنادق</strong>{" "}
          والمنشآت التجائية، توقف المسبح يُؤثر على التشغيل — لذلك نُعدّ جدولة فحص تقلل العطل.
        </p>
        <p className={pClass}>
          نبدأ باختبار منسوب موثّق، ثم فحص خطوط ووصلات، ثم تقريراً يحدد هل الإصلاح موضعي أم يحتاج حفراً
          محدوداً. راجع أيضاً{" "}
          <Link href="/blog/كشف-تسربات-المسابح">دليل كشف تسربات المسابح</Link> أو{" "}
          <Link href="/smart-leak-diagnosis">المشخّص الذكي</Link> قبل حجز الزيارة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>عن الخدمة</h2>
        <p className={pClass}>
          <strong>كشف تسربات المسابح</strong> تخصص داخل كشف التسربات: نُميّز بين انخفاض المنسوب
          الطبيعي في حر جدة وبين تسرب حقيقي في خط PVC، وصل سكيمر، أو شق جداري. لا نكتفي بـ«أعد
          تعبئة الماء» دون معرفة أين يذهب.
        </p>
        <p className={pClass}>
          نخدم مسابح <strong>الخرسانة المسلحة</strong> و<strong>الفيبرجلاس</strong>، العلوية
          والأرضية، في <strong>الفلل</strong> و<strong>العمائر</strong> و<strong>المستودعات</strong>{" "}
          ذات مرافق موظفين. في <strong>المباني التجارية</strong> — نوادي، فنادق، مجمعات — نُنسّق
          مع إدارة المنشأة لعدم تعطيل الاستخدام أكثر من اللازم.
        </p>
        <p className={pClass}>
          بعد التشخيص، نربطك بـ{" "}
          <Link href="/services/kashf-tasribat-miah-jeddah">كشف تسربات المياه العام</Link> إذا ثبت
          أن المشكلة من شبكة المنزل لا من المسبح، أو بمسار العزل عند تشققات هيكلية. لا نبيع حزمة
          واحدة لكل الحالات.
        </p>
        <p className={pClass}>
          نُوثّق قراءات المنسوب، صور الوصلات، ونتائج اختبار الضغط — حتى يُنفَّذ الإصلاح من أول
          محاولة دون تخمين.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>لماذا هذه الخدمة مهمة؟</h2>
        <p className={pClass}>
          تسرب المسبح «صامت» أحياناً: الماء يذهب تحت البلاط أو إلى التربة دون بركة ظاهرة. في جدة،
          الحرارة تُسرّع التبخر فتُخفي الانخفاض الحقيقي — حتى تصل فاتورة التعبئة أو تتشقق البلاط.
          التأخير في <strong>كشف تسربات المسابح بجدة</strong> يعني حفراً أوسع، استبدال مواسير، أو
          ترميم حوش كامل.
        </p>
        <p className={pClass}>
          كثير من أصحاب الفلل يصلون بعد «إصلاح السكيمر» أو إعادة سيليكون الحافة دون نتيجة؛ لأن
          التسرب من خط تحت الأرض. الفحص المنهجي يحدد النقطة قبل تكسير بلاط واسع.
        </p>
        <p className={pClass}>
          في المسابح المشتركة للأندية أو الفنادق، التسرب قد يُوقف التشغيل ويُخالف اشتراطات السلامة.
          التقرير الفني يُسرّع القرار الإداري ويُحدد مسؤولية الصيانة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى فحص المسبح</h2>
        <p className={pClass}>
          راجع القائمة التالية. إن وُجدت <strong>علامتان أو أكثر</strong>، فحص المسبح أولوية — خاصة
          قبل موسم الاستخدام الكثيف. للتسربات داخل المنزل راجع{" "}
          <Link href="/services/kashf-tasribat-bedun-taksir-jeddah">كشف تسربات بدون تكسير بجدة</Link>.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {KASHF_MASABIH_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ الخدمة</h2>
        <ol className="mt-6 space-y-4">
          {KASHF_MASABIH_PROCESS.map((step, i) => (
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
          مسابح جدة تختلف في العمر والمواد — نجمع بين اختبار المنسوب، ضغط الخطوط، والفحص الصوتي عند
          الحاجة، دون الاعتماد على أداة واحدة لكل الحالات.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {KASHF_MASABIH_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار فحص مسبح احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {KASHF_MASABIH_BENEFITS.map((b) => (
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
          نغطي <strong>جميع أحياء جدة</strong> — من أبحر والشاطئ حيث كثرة الفلل بمسابح، إلى الأحياء
          الجنوبية والوسطى:
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
          {KASHF_MASABIH_WHY_US.map((item) => (
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
          {KASHF_MASABIH_FAQ.map((item) => (
            <article key={item.question} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="text-lg font-bold text-[#163d57]">{item.question}</h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {KASHF_MASABIH_INTERNAL_LINKS.map((link) => (
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
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لفحص تسرب مسبحك في جدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى يتشقق البلاط أو تتضاعف فاتورة التعبئة. اتصل الآن أو راسلنا على واتساب — نُحدد
          موعد معاينة ونشرح خطوات الفحص قبل الوصول.
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

      <RelatedServicesSection currentPath={KASHF_MASABIH_PAGE_PATH} />
    </main>
  );
}

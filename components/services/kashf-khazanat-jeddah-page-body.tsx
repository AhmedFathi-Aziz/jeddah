import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Droplets, MapPin, Phone, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { buttonVariants } from "@/components/ui/button";
import { jeddahDistricts } from "@/lib/coverage-data";
import { images } from "@/lib/images";
import {
  KASHF_KHAZANAT_BENEFITS,
  KASHF_KHAZANAT_FAQ,
  KASHF_KHAZANAT_INTERNAL_LINKS,
  KASHF_KHAZANAT_PAGE_PATH,
  KASHF_KHAZANAT_PROCESS,
  KASHF_KHAZANAT_SIGNS,
  KASHF_KHAZANAT_TECH,
  KASHF_KHAZANAT_WHY_US,
} from "@/lib/seo/kashf-khazanat-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج كشف تسربات خزان مياه في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function KashfKhazanatJeddahPageBody() {
  const field = images.kashfKhazanatPageField;

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
            <Droplets className="size-4" aria-hidden />
            خزان علوي وأرضي · تقرير فني · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            كشف تسربات الخزانات بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            للفلل والشقق والعمائر والمستودعات — نحدد مصدر تسرب الخزان قبل أن يهدر الماء ويُضعف العزل أو
            أساس المبنى.
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
                طلب فحص خزان
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
          إذا كنت تبحث عن <strong>كشف تسربات الخزانات بجدة</strong> لأن المضخة تعمل دون توقف، أو لأنك
          لاحظت بللاً حول قاعدة الخزان الأرضي، فالمشكلة غالباً ليست في «خلاط الحمام» بل في قلب نظام
          التخزين نفسه. في <strong>{siteConfig.name}</strong> نتعامل مع الحالة كما تظهر في الميدان: خزان
          علوي على سطح فيلا، خزان أرضي في حوش منزل، خزان مشترك في عمارة سكنية، أو خزانات متعددة في مبنى
          تجاري أو مستودع — لكل سيناريو مسار فحص مختلف.
        </p>
        <p className={pClass}>
          خزان يتسرب ويُعاد تعبئته تلقائياً يستهلك مياهاً على مدار الساعة؛ قد لا تلاحظ ذلك في الصنبور،
          لكنك تراه في الفاتورة أو في صوت المضخة ليلاً. نحن لا نكتفي بتغيير التعويم أو إحكام الغطاء دون
          تشخيص؛ نفحص الجدار، الوصلات، العزل، وسلوك مستوى الماء، ثم نُقدّم تقريراً يوضح أين الخلل وماذا
          يُصلح — إصلاح موضعي،{" "}
          <Link href="/insulation-services/tank-epoxy-insulation">عزل إيبوكسي</Link>، أو حقن للشروخ.
        </p>
        <p className={pClass}>
          هدف الصفحة تحويل بحثك التجاري إلى قرار واضح: هل التسرب من الخزان أم من شبكة التوزيع؟ وهل
          يستحق الأمر تدخلاً عاجلاً قبل تلف غرفة الخزان أو تربة مشبعة حول الأساس؟ ابدأ بمعاينة ميدانية
          أو جرّب <Link href="/smart-leak-diagnosis">المشخّص الذكي</Link> إذا كانت الأعراض ما زالت
          غامضة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className={h2Class}>عن الخدمة</h2>
            <p className={pClass}>
              <strong>كشف تسربات الخزانات</strong> خدمة متخصصة ضمن منظومة كشف التسربات: نُركّز على جسم
              الخزان، صمام التعويم، فتحات التغذية والتوزيع، والعزل الداخلي أو الخارجي. لا نخلط بين «رطوبة
              حمام» و«تسرب خزان» دون اختبار؛ الخلط يُضيّع المال ويُطيل الإصلاح.
            </p>
            <p className={pClass}>
              في <strong>الفلل</strong> بجدة، الخزان العلوي شائع على الأسطح المبلطة؛ التسرب قد يظهر تحت
              البلاط قبل أن يصل إلى السقف الداخلي. في <strong>الشقق</strong> والأبراج، قد يكون الخزان
              مشتركاً والمسؤولية موزعة بين الوحدات. في <strong>العمائر</strong> والمباني الإدارية، نُنسّق
              مع الحارس أو إدارة العقار. أما <strong>المستودعات والمنشآت التجارية</strong> فتحتاج جدولة
              فحص لا تعطل التشغيل، خاصة عند خزانات سعة كبيرة أو شبكات تغذية متوازية.
            </p>
            <p className={pClass}>
              بعد التشخيص، نربطك بمسار{" "}
              <Link href="/services/kashf-tasribat-miah-jeddah">كشف تسربات المياه العام</Link> إذا ثبت أن
              التسرب من مواسير داخلية، أو بمسار العزل والحقن إذا كان الخزان هو المصدر. لا نُجبرك على
              باقة واحدة؛ الخطة تُبنى على نتيجة القياس لا على تخمين.
            </p>
            <p className={pClass}>
              نُوثّق مستوى الماء، حالة الغطاء، صور الوصلات، وأي قراءات رطوبة — حتى يفهم المالك أو المقاول
              التالي ماذا يُنفَّذ دون إعادة الفحص من الصفر.
            </p>
          </div>
          <figure className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={field.src}
              alt={field.alt}
              title={field.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
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
          تسرب الخزان مشكلة «صامتة» أحياناً: الماء يذهب إلى التربة أو إلى غرفة الخزان دون أن يظهر في
          الحمام. في جدة، حيث الرطوبة مرتفعة والأمطار موسمية، التربة المشبعة حول خزان أرضي تُسرّع تآكل
          العزل وتُهدد جدران الطابق الأرضي. التأخير في <strong>كشف تسربات الخزانات بجدة</strong> يعني
          فاتورة مياه مضاعفة وإصلاحاً أوسع لاحقاً — حفر، استبدال عزل، أو معالجة أساس.
        </p>
        <p className={pClass}>
          كثير من العملاء يصلون بعد استبدال التعويم أو «إحكام الغطاء» دون نتيجة؛ لأن التسرب من جدار
          خرساني متشقق أو وصلة قديمة تحت الأرض. الفحص المنهجي يفرق بين تسرب الخزان وتسرب شبكة التوزيع
          الداخلية — ويوفر عليك تكسير بلاط في غرفة بعيدة عن موقع المشكلة الحقيقي.
        </p>
        <p className={pClass}>
          في العمائر، تسرب خزان التغذية المشترك قد يُسبب نزاعاً بين السكان حول من يدفع الإصلاح. التقرير
          الفني يوضح مصدر التسرب ويُسهّل اتفاق الإدارة. في المباني التجارية، توقف ضغط المياه أو فيضان
          غرفة المضخة يُعطّل نشاطاً؛ التدخل السريع يقلل خسائر التشغيل.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى فحص الخزان</h2>
        <p className={pClass}>
          راجع القائمة التالية الخاصة بخزانات المياه. إن وُجدت <strong>علامتان أو أكثر</strong>، فحص
          الخزان أولوية قبل توسيع البحث في الجدران الداخلية. للتسربات العامة راجع{" "}
          <Link href="/services/kashf-tasribat-bedun-taksir-jeddah">كشف تسربات بدون تكسير بجدة</Link>.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {KASHF_KHAZANAT_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>خطوات تنفيذ الخدمة</h2>
        <p className={pClass}>
          نتبع مساراً واضحاً من الاستقبال حتى التقرير — دون وعود زمنية مبالغ فيها، مع إمكانية زيارة
          متابعة عند الحالات التي تتطلب مراقبة مستوى ماء ليلية.
        </p>
        <ol className="mt-6 space-y-4">
          {KASHF_KHAZANAT_PROCESS.map((step, i) => (
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
          خزانات جدة تختلف بين بلاستيك، فايبر، وخرسانة مسلحة — وليس لكل خزان نفس أداة الفحص. نجمع بين
          قياس الرطوبة، الاختبارات الهيدروليكية، والفحص الصوتي عند الحاجة، مع معاينة بصرية منظمة للوصلات
          والعزل.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {KASHF_KHAZANAT_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار فحص خزان احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {KASHF_KHAZANAT_BENEFITS.map((b) => (
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
          نغطي <strong>جميع أحياء جدة</strong> في نطاق الخدمة — من أبحر والشاطئ شمالاً إلى الأحياء
          الجنوبية والوسطى. فحص خزانات الفلل والعمائر متاح في كل حي ضمن جدولة زيارات ميدانية:
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
          {KASHF_KHAZANAT_WHY_US.map((item) => (
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
          {KASHF_KHAZANAT_FAQ.map((item) => (
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
          {KASHF_KHAZANAT_INTERNAL_LINKS.map((link) => (
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
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لفحص خزان المياه في عقارك بجدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى تفيض غرفة الخزان أو تتضاعف فاتورة التعبئة. اتصل الآن أو راسلنا على واتساب — نُحدد
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

      <RelatedServicesSection currentPath={KASHF_KHAZANAT_PAGE_PATH} />
    </main>
  );
}

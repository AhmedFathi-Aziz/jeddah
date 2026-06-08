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
  AZL_FOM_BENEFITS,
  AZL_FOM_FAQ,
  AZL_FOM_INTERNAL_LINKS,
  AZL_FOM_PAGE_PATH,
  AZL_FOM_PROCESS,
  AZL_FOM_SIGNS,
  AZL_FOM_TECH,
  AZL_FOM_WHY_US,
} from "@/lib/seo/azl-fom-jeddah-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;
const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "مرحباً، أحتاج عزل فوم في جدة. أرجو تحديد موعد معاينة.",
)}`;

const sectionClass = "rounded-2xl border border-[#e8edf0] bg-white p-6 text-right md:p-8";
const h2Class = "text-2xl font-extrabold text-[#163d57] md:text-3xl";
const h3Class = "text-xl font-bold text-[#163d57] md:text-2xl";
const pClass = "mt-4 text-base leading-[1.95] text-[#4a6677] md:text-lg";

export function AzlFomJeddahPageBody() {
  const field = images.azlFomPageField;

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
            فلل · شقق · عمائر · مستودعات · جدة
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
            عزل فوم بجدة
          </h1>
          <p className="mt-3 max-w-3xl text-pretty text-base leading-8 text-[#4a6677] md:text-lg">
            رش بولي يوريثان حراري ومائي للأسطح والسقوف — معاينة ميدانية، سماكة محسوبة، وطبقة حماية
            UV. للفلل والعمائر والمباني التجارية والمستودعات في مناخ جدة.
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
                طلب معاينة فوم
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
          من يبحث عن <strong>عزل فوم بجدة</strong> غالباً يصل إلينا بعد تجربة مرّة: سطح حارّ يُشغّل
          التكييف طوال النهار، أو أمطار موسمية تركت بقعاً على السقف الداخلي، أو عرض «رخيص» رُش
          فوق سطح غير مُجهّز فانفصل خلال موسم واحد. <strong>عزل الفوم</strong> — بولي يوريثان
          — ليس «رشّة سحرية»؛ هو نظام هندسي يبدأ بمعاينة السطح وينتهي بطبقة متجانسة بسماكة
          واضحة وطبقة حماية من الشمس.
        </p>
        <p className={pClass}>
          في <strong>{siteConfig.name}</strong> ننفّذ <strong>عزل فوم حراري ومائي</strong> للفلل
          والشقق في <strong>العمائر</strong>، و<strong>المستودعات</strong> و<strong>المباني
          التجارية</strong> في جدة. نخدم أصحاب المنازل في أبحر والشمال حيث المساحات واسعة،
          وملّاك الشقق العلوية في الأحياء الوسطى، وممثلي الجمعيات السكنية التي تريد حلاً
          موحّداً للسطح المشترك. الهدف واحد: تقليل الحرارة، منع الماء، وتقرير يوضح ما نُفّذ
          فعلاً.
        </p>
        <p className={pClass}>
          جدة تختلف عن مدن داخلية: رطوبة ساحلية، ملوحة، وحرارة تصل ذروتها قبل الظهر. الفوم
          الذي يُرشّ بدون تحضير أو بدون UV يتقشر. الفوم فوق تسرب نشط من خزان علوي يُخفي
          المشكلة مؤقتاً ثم يتلف. لذلك نربط الخدمة بـ{" "}
          <Link href="/leak-detection">كشف التسربات</Link> عند وجود رطوبة، ونوضح الفرق بين{" "}
          <Link href="/services/azl-ashtof-jeddah">عزل الأسطح</Link> الشامل و{" "}
          <strong>رش الفوم</strong> كخيار محدد بعد المعاينة.
        </p>
        <p className={pClass}>
          إن كنت تقارن عروضاً عبر واتساب فقط، اسأل: ما سماكة الرش؟ هل يشمل إزالة العزل القديم؟
          هل طبقة UV ضمن السعر؟ من ينفّذ على السطح — فريق أم وسيط؟ هذه الأسئلة تفصل عرضاً
          جاداً من إعلاناً مبهماً. الصفحة التالية تشرح بالتفصيل ما نفعله ميدانياً في{" "}
          <strong>عزل فوم جدة</strong> — لتصل لمعاينة وأنت تعرف ما تطلبه.
        </p>
        <p className={pClass}>
          في الساحل الغربي، الفرق بين «سطح يُرشّ يوماً واحداً» و«سطح يُعاد كل ثلاث سنوات»
          غالباً في التحضير: تنظيف، تجفيف، معالجة شق، وضبط مصارف المطر. من يتخطى ذلك
          يوفّر لك سعراً أقل اليوم وتكلفة مضاعفة غداً. نحن نفضّل الوضوح من البداية — حتى
          إن قررت التأجيل، تعرف لماذا.
        </p>
        <p className={pClass}>
          سواء كنت مالك <strong>فيلا</strong> في حي الحمدانية، أو مستأجر <strong>شقة</strong>{" "}
          علوية في عمارة بالفيصلية، أو مدير <strong>مستودع</strong> في المنطقة الصناعية —
          المبدأ واحد: الفوم أداة قوية حين يُوضَع على سطح جاهز وبسماكة مناسبة. هذه الصفحة
          مكتوبة لمن يبحث عن <strong>شركة عزل فوم بجدة</strong> بجدية، لا لمن يريد أرخص
          رقم في محادثة جماعية.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className={h2Class}>عن الخدمة</h2>
            <p className={pClass}>
              <strong>عزل الفوم</strong> يعني رش مادة بولي يوريثان تتمدد وتتصلّب لتكوين طبقة
              متصلة على السطح أو السقف. المادة قد تكون <strong>مغلقة الخلايا</strong> لمقاومة
              مائية أعلى، أو <strong>مفتوحة الخلايا</strong> لعزل حراري داخلي — الاختيار بعد
              فهم الاستخدام: سطح مكشوف للمطر، سقف داخلي قبل الجبس، أو مستودع بسقف معدني.
            </p>
            <p className={pClass}>
              في <strong>الفلل</strong>، نُرشّ الفوم على الأسطح الخرسانية العارية أو فوق
              طبقة تحضير بعد إزالة عزل فاشل. في <strong>الشقق</strong> العلوية، أحياناً يكون
              الحل على جزء من السطح المشترك بعد موافقة الجمعية. في <strong>العمائر</strong>{" "}
              الجديدة، ننسّق مع المقاول أو الإدارة لتجنّب تعارض مع خطوط التكييف والمصائد.
            </p>
            <p className={pClass}>
              <strong>المستودعات</strong> و<strong>الهناجر</strong> في المناطق الصناعية
              وجدة — مثل حي المحمدية أو اللوجستية — تحتاج جدولة خارج ساعات الذروة.{" "}
              <strong>المباني التجارية</strong> — مكاتب، عيادات، محلات — قد تُفضّل الرش
              الداخلي على السقف المعدني لتقليل حرارة الصالة دون إغلاق أيام طويلة.
            </p>
            <p className={pClass}>
              لا نبيع «متراً واحداً للجميع». السعر يعتمد على المساحة، حالة السطح، السماكة،
              وهل يلزم إزالة عزل قديم. نُسلّم تقريراً يوضح المادة والمساحة والسماكة — مفيد
              عند التأجير أو البيع. للتفاصيل التقنية الإضافية راجع{" "}
              <Link href="/insulation-services/foam-thermal-waterproof-insulation">
                صفحة عزل الفوم الحراري والمائي
              </Link>
              .
            </p>
            <p className={pClass}>
              عزل حمامات بالفوم مسار مختلف — رطوبة داخلية وبلاط — نُحيلك إلى{" "}
              <Link href="/insulation-services/bathroom-foam-insulation">عزل حمامات بالفوم</Link>{" "}
              عند الحاجة. هذه الصفحة تركّز على <strong>أسطح وأسقف</strong> في جدة.
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
        <h2 className={h2Class}>لماذا عزل الفوم مهم في جدة؟</h2>
        <p className={pClass}>
          سطح غير معزول في جدة يعمل كـ«صفيحة تسخين» من مارس إلى أكتوبر. الحرارة تنتقل إلى
          الغرف تحت السطح — فيُشغّل التكييف ساعات إضافية دون راحة حقيقية.{" "}
          <strong>عزل فوم بجدة</strong> يقطع جزءاً كبيراً من هذا المسار الحراري، خاصة
          مع طبقة مغلقة الخلايا والسماكة المناسبة.
        </p>
        <p className={pClass}>
          في موسم الأمطار، الماء يبحث عن أضعف نقطة: مصرف مسدود، ميل معكوس، أو شق في
          العزل القديم. الفوم المائي — عند التنفيذ الصحيح — يُكمل نظام الصرف لا يُعوّضه.
          من يتجاهل المصارف ويرشّ فقط «لإرضاء العميل» يُعيد المشكلة بعد أول أمطار غزيرة.
        </p>
        <p className={pClass}>
          للمستثمر العقاري، <strong>عزل فوم</strong> موثّق يرفع جاذبية الفيلا أو الشقة
          العلوية — المستأجر يسأل عن فاتورة الكهرباء والرطوبة. للمستودعات، تقليل حرارة
          السقف يحمي المخزون ويُحسّن بيئة العمل. التأخير يعني إصلاحات دهان وبلاط لاحقة
          أغلى من العزل الوقائي.
        </p>
        <p className={pClass}>
          كثير من العملاء يخلطون بين «عزل الأسطح» كمفهوم عام و«رش الفوم» كتقنية. الفوم
          خيار ممتاز على مساحات كبيرة وأسطح معقدة؛ البيتومين قد يكون أنسب أحياناً — نشرح
          ذلك في المعاينة دون فرض مادة واحدة. الهدف حماية مبناك، لا بيع منتج بعينه.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>أين يُستخدم عزل الفوم في جدة؟</h2>
        <p className={pClass}>
          <strong>فلل مستقلة</strong> في أبحر، الشاطئ، وإسكان الحمدانية — أسطح خرسانية
          واسعة، غالباً مع بلاط فوق عزل قديم. الفوم يُسرّع التغطية ويقلل الوصلات الضعيفة.
        </p>
        <p className={pClass}>
          <strong>شقق علوية</strong> في عمائر الروضة والصفا والحمراء — حرارة السقف المشترك
          تُزعج السكان. بعد تنسيق الجمعية، رش جزء من السطح أو معالجة السقف الداخلي حسب
          الحالة.
        </p>
        <p className={pClass}>
          <strong>مباني تجارية</strong> — مكاتب في طريق الملك، عيادات في العزيزية، محلات
          في الأسواق — تقليل حمل التكييف المركزي أو المنفصل ينعكس على تشغيل أوفر.
        </p>
        <p className={pClass}>
          <strong>مستودعات وهناجر</strong> في المناطق الصناعية — سقف معدني يسخن بشدة. الفوم
          على السطح الخارجي أو الداخلي حسب التصميم؛ للمساحات الضخمة راجع{" "}
          <Link href="/insulation-services/large-area-thermal-insulation">عزل مساحات كبيرة</Link>
          .
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>ما الذي يحدد سعر عزل الفوم في جدة؟</h2>
        <p className={pClass}>
          السؤال الأول الذي نسمعه: «كم المتر؟» — والإجابة الصادقة: «بعد المعاينة».{" "}
          <strong>سعر عزل الفوم في جدة</strong> يتأثر بمساحة السطح، ارتفاعه وسهولة الوصول،
          حالة العزل القائم، عدد مصائد الأمطار والمكيفات، ونوع المادة (مغلق أو مفتوح
          الخلايا، حراري فقط أو حراري ومائي).
        </p>
        <p className={pClass}>
          سطح فيلا 350 م² في أبحر يختلف عن سطح شقة 70 م² في عمارة — ليس في «سعر المتر»
          فقط، بل في تكلفة التحضير والتنقل والمعدات. سطح عليه عزل فوم منتفخ يحتاج
          إزالة — ذلك وقت إضافي وتخلّص آمن. سطح عليه بلاط متهالك قد يحتاج قراراً
          هندسياً قبل الرش.
        </p>
        <p className={pClass}>
          نُقدّم تقديراً مكتوباً بعد الزيارة: بنود التحضير، سماكة الرش، طبقة UV،
          والضمان. لا «رسوم مفاجئة» بعد بدء الرش. إن كان ميزانيتك محدودة، نُقترح
          مرحلة أولى (مثلاً الجزء الأكثر تعرضاً للمطر) بدلاً من وهم تغطية كاملة
          بسماكة ناقصة.
        </p>
        <p className={pClass}>
          قارن العروض على أساس المتساويات: نفس السماكة، نفس نوع الفوم، نفس شمول
          التحضير. أرخص عرض يحذف UV أو التحضير يبدو أوفر حتى يأتي أول صيف أو أول
          موسم أمطار.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>فوم مغلق الخلايا مقابل مفتوح — متى نستخدم أيهما؟</h2>
        <p className={pClass}>
          <strong>بولي يوريثان مغلق الخلايا</strong> كثافته أعلى ومقاومته للماء أفضل — خيار
          شائع للأسطح المكشوفة في جدة حيث الأمطار والمياه الراكدة عند ضعف الميل.{" "}
          <strong>مفتوح الخلايا</strong> أخف وعزل حراري جيد — يُستخدم أحياناً داخلياً على
          أسقف قبل الجبس، أو حيث لا يُتوقع احتكاك مباشر بالماء.
        </p>
        <p className={pClass}>
          لا يُصح قول «الفوم دائماً أفضل» دون سياق. في بعض العمائر القديمة، سطح مبلط مع
          صرف جيد قد يناسبه نظام آخر بعد المعاينة — نشرح الخيارات في{" "}
          <Link href="/services/azl-ashtof-jeddah">صفحة عزل الأسطح</Link>. لكن حين يُختار
          الفوم، نُحدد النوع والسماكة وفق الاستخدام لا وفق المخزون المتاح لدى المقاول.
        </p>
        <p className={pClass}>
          للمستودعات بسقف معدني، قد نجمع بين رش داخلي وخارجي حسب الحرارة المستهدفة —
          ذلك قرار يُتخذ بعد مناقشة مع إدارة التشغيل، لا بعد نسخ حل من فيلا مجاورة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>عزل فوم للفلل والشقق والعمائر — فروق عملية</h2>
        <p className={pClass}>
          في <strong>الفيلا</strong>، غالباً لديك سطح كامل تحت سيطرتك — نُخطط للرش
          والUV والمصارف دون تنسيق مع جيران. التحدي: المساحة والحرارة أثناء التنفيذ؛
          نجدول العمل في ساعات أقل حرارة عند الإمكان.
        </p>
        <p className={pClass}>
          في <strong>الشقة</strong> العلوية، قد يكون جزء من السطح مشتركاً — نحتاج موافقة
          الجمعية أو على الأقل إخطاراً. أحياناً الحل الداخلي على السقف المباشر أنسب من
          انتظار قرار الجمعية — نُقيّم ذلك في المعاينة.
        </p>
        <p className={pClass}>
          في <strong>العمائر</strong> متعددة الطوابق، ننتبه لخطوط التكييف المركزي
          وخزانات المياه العلوية. رش فوم حول قاعدة الخزان دون فحص الوصلات خطأ — إن
          شككنا في تسرب، نُحيلك أولاً إلى{" "}
          <Link href="/services/kashf-tasribat-al-khazanat-jeddah">كشف تسربات الخزانات</Link>.
        </p>
        <p className={pClass}>
          <strong>المباني التجارية</strong> قد تشترط تنفيذاً خارج ساعات العمل أو
          عطلة نهاية الأسبوع — نُعد جدولاً يقلل إزعاج الموظفين والعملاء مع
          تهوية آمنة أثناء الرش.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>صيانة السطح بعد عزل الفوم</h2>
        <p className={pClass}>
          العزل ليس «انتهى ونسيت». في جدة، مصارف الأمطار تنسد بالغبار والأوراق —
          ننصح بفحص دوري قبل موسم الأمطار. طبقة UV تحتاج مراجعة كل بضع سنوات حسب
          التعرض. المشي على الفوم بأحذية حادّة أو سحب معدات ثقيلة دون حماية يُتلف
          الطبقة.
        </p>
        <p className={pClass}>
          إن ظهرت بقع رطوبة داخلية بعد العزل، لا تفترض أن الفوم «فاشل» فوراً — قد
          يكون مصرف مسدود أو تسرباً من مواسير.{" "}
          <Link href="/services/kashf-tasribat-miah-jeddah">كشف تسربات المياه</Link>{" "}
          يحدد المصدر قبل أي إصلاح.
        </p>
        <p className={pClass}>
          نُسلّم توصيات صيانة مكتوبة مع التقرير — حتى تعرف متى تُراجع السطح ومتى
          تتصل بنا. العميل الواعي يُطيل عمر العزل سنوات دون إعادة رش كاملة.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>علامات تحتاج فيها إلى عزل فوم أو إعادة رش</h2>
        <p className={pClass}>
          إن وُجدت <strong>علامتان أو أكثر</strong>، المعاينة أولوية — خاصة قبل موسم
          الأمطار أو قبل ذروة صيف الحر.
        </p>
        <ul className="mt-4 list-disc space-y-2 pr-6 leading-8 text-[#33586d] marker:text-[#1f7f8a]">
          {AZL_FOM_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ul>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h2Class}>خطوات تنفيذ عزل الفوم</h2>
        <p className={pClass}>
          نتبع مساراً واضحاً — لا نبدأ الرش قبل التحضير، ولا نُسلّم قبل التحقق من السماكة
          والحماية.
        </p>
        <ol className="mt-6 space-y-4">
          {AZL_FOM_PROCESS.map((step, i) => (
            <li key={step.title} className="rounded-xl bg-[#f8fbfc] p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#163d57]">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 leading-8 text-[#4a6677]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>التقنيات والمعدات</h2>
        <p className={pClass}>
          جودة <strong>عزل فوم بجدة</strong> تظهر في المادة والمعدات والفني — لا في
          الإعلان فقط.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {AZL_FOM_TECH.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#e8edf0] bg-white p-5">
              <h3 className="font-bold text-[#163d57]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[#4a6677] md:text-base">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className={h3Class}>أخطاء شائعة عند طلب عزل فوم — تجنّبها</h2>
        <p className={pClass}>
          <strong>الرش فوق سطح رطب أو متسخ:</strong> ينفصل الفوم خلال أسابيع. التحضير
          ليس «إضافة» — هو نصف العمل.
        </p>
        <p className={pClass}>
          <strong>تجاهل طبقة UV:</strong> الشمس في جدة تُدمّر الفوم المكشوف خلال سنوات
          قليلة بدون حماية.
        </p>
        <p className={pClass}>
          <strong>سماكة غير كافية للماء:</strong> عزل حراري رقيق لا يُعادل عزل مائي —
          نُوضح الهدف في العرض.
        </p>
        <p className={pClass}>
          <strong>تغطية تسرب نشط:</strong> إن رأيت رطوبة على السقف الداخلي، ابدأ بـ{" "}
          <Link href="/services/kashf-tasribat-miah-jeddah">كشف تسربات المياه</Link> ثم
          الفوم.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8 bg-[#f7f9fa]")}>
        <h2 className={h2Class}>فوائد اختيار عزل فوم احترافي</h2>
        <ul className="mt-4 space-y-3 text-right">
          {AZL_FOM_BENEFITS.map((b) => (
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
          نغطي <strong>جميع أحياء جدة</strong> — من أبحر والشاطئ حيث الفلل بأسطح واسعة
          تحتاج رش فوم على مساحات كبيرة، إلى الأحياء الجنوبية والوسطى ذات العمائر
          الكثيفة والشقق العلوية:
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
          {AZL_FOM_WHY_US.map((item) => (
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
          {AZL_FOM_FAQ.map((item) => (
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
          <strong>عزل فوم بجدة</strong> استثمار في راحة منزلك أو منشأتك — يُخفّض الحرارة،
          يحمي من المطر عند التنفيذ الصحيح، ويُوثّق في تقرير واضح. سواء كنت في فيلا بأبحر،
          شقة علوية في عمارة بالروضة، أو مستودعاً في المنطقة الصناعية — ابدأ بمعاينة قبل
          التوقيع على أي عرض.
        </p>
        <p className={pClass}>
          لا تكتفِ بسؤال «كم السعر للمتر؟» — اسأل عن التحضير، السماكة، UV، ومن ينفّذ.
          اتصل اليوم أو راسلنا على واتساب — نُحدد موعد زيارة ونُقدّم تقديراً بعد رؤية
          السطح.
        </p>
      </section>

      <section className={cn(sectionClass, "mt-8")}>
        <h2 className="text-xl font-bold text-[#163d57]">روابط مفيدة</h2>
        <ul className="mt-3 flex flex-wrap justify-end gap-2">
          {AZL_FOM_INTERNAL_LINKS.map((link) => (
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
        <h2 className="text-2xl font-extrabold md:text-3xl">جاهز لعزل فوم في جدة؟</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/95 md:text-lg">
          لا تنتظر حتى يشتد الحر أو تتسرب الأمطار. احجز معاينة — نحدد السماكة والمادة
          والتكلفة بعد رؤية السطح.
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

      <RelatedServicesSection currentPath={AZL_FOM_PAGE_PATH} />
    </main>
  );
}

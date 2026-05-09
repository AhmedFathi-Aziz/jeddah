import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";

import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jeddahDistricts, type ResolvedCoverageDistrict } from "@/lib/coverage-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Props = {
  row: ResolvedCoverageDistrict;
};

const districtHighlights: Record<
  string,
  { intro: string; painPoint: string; focus: string; note: string }
> = {
  "al-shatie": {
    intro: "في حي الشاطئ تزداد تحديات الرطوبة بسبب القرب من الساحل، لذلك نعتمد فحصًا دقيقًا قبل أي معالجة.",
    painPoint: "أكثر ما يزعج العملاء هو تكرار بقع الرطوبة وارتفاع الفاتورة دون معرفة السبب الحقيقي.",
    focus: "نركز على كشف مصدر التسرب أولًا ثم تحديد الحل الأنسب للجدران والأسطح والخزانات.",
    note: "التدخل المبكر يقلل كثيرًا من تكاليف الصيانة ويمنع تلف التشطيبات.",
  },
  "al-marjan": {
    intro: "خدمة حي المرجان مصممة للمباني السكنية الحديثة التي تحتاج كشفًا غير هدّام قدر الإمكان.",
    painPoint: "الشكوى المتكررة تكون من ارتفاع مفاجئ في فاتورة المياه مع عدم وجود تسريب ظاهر.",
    focus: "نستخدم فحصًا إلكترونيًا لتحديد مكان الخلل بدقة قبل بدء الإصلاح.",
    note: "التقرير الواضح يساعد المالك على اتخاذ قرار سريع ودقيق.",
  },
  "al-muhammadiyah": {
    intro: "في حي المحمدية نهتم بسرعة الاستجابة لأن التأخير يزيد احتمال توسع الرطوبة داخل المبنى.",
    painPoint: "ألم العميل غالبًا يكون في تضخم الفاتورة والحاجة لتوثيق فني واضح.",
    focus: "ننفذ مسار عمل يبدأ بالمعاينة ثم الفحص ثم الإصلاح بخطة مكتوبة.",
    note: "المعالجة المبكرة تمنع تدهور العزل وتقلل الإصلاحات المستقبلية.",
  },
  "al-naim": {
    intro: "خدماتنا في حي النعيم تركز على الكشف السريع للتسربات الداخلية والخارجية.",
    painPoint: "كثير من الحالات تأتي بعد ملاحظة رائحة رطوبة أو ضعف ضغط مفاجئ.",
    focus: "نحدد نقطة التسرب بدقة ثم نقدم خيارات علاج عملية حسب حالة الشبكة.",
    note: "كل خطوة تكون موضحة للعميل لتجنب أي لبس أثناء التنفيذ.",
  },
  "al-salamah": {
    intro: "في حي السلامة نقدم خدمة كشف تسربات وعزل متكاملة للمنازل والعمائر.",
    painPoint: "أغلب العملاء يريدون حلًا فعليًا يوقف المشكلة بدل المعالجات المؤقتة.",
    focus: "نعتمد على فحص تقني وتقرير مبسط يوضح السبب الجذري للتسرب.",
    note: "الهدف هو إنهاء المشكلة مع أقل أثر على التشطيبات.",
  },
  "ar-rawdah": {
    intro: "خدمة حي الروضة مبنية على الخبرة في معالجة التسربات المتكررة في دورات المياه والمطابخ.",
    painPoint: "العميل يبحث عن شركة تفهم مشكلة الفاتورة وتقدم تقريرًا معتمدًا عند الحاجة.",
    focus: "نبدأ بفحص شامل ثم نعالج مصدر الخلل مباشرة بخامات مناسبة.",
    note: "المتابعة بعد الإصلاح جزء مهم لضمان ثبات النتيجة.",
  },
  "al-hamra": {
    intro: "في حي الحمراء نهتم بالكشف المبكر لأن الرطوبة الخفية قد تتطور سريعًا داخل الجدران.",
    painPoint: "التحدي الأكبر يكون في اكتشاف السبب الحقيقي قبل أي تكسير عشوائي.",
    focus: "ننفذ كشفًا احترافيًا يحدد مكان التسرب ثم نضع خطة إصلاح واضحة.",
    note: "هذا الأسلوب يحافظ على الوقت ويقلل التكلفة الإجمالية.",
  },
  "as-samer": {
    intro: "خدمة حي السامر تجمع بين كشف التسربات والعزل الوقائي للحد من تكرار المشكلة.",
    painPoint: "غالبًا ما يطلب العملاء حلاً نهائيًا بعد تجارب سابقة غير دقيقة.",
    focus: "نركز على السبب الحقيقي للتسرب وتوثيق كل مرحلة بوضوح.",
    note: "كلما كان التشخيص دقيقًا كانت نتيجة الإصلاح أفضل وأكثر استدامة.",
  },
  "al-hamdaniyah": {
    intro: "في حي الحمدانية نوفر فحصًا ميدانيًا سريعًا مع تحديد دقيق لمصدر التسرب.",
    painPoint: "الوجع الأساسي هو ارتفاع الفاتورة بشكل غير منطقي والحاجة إلى تقرير رسمي.",
    focus: "نطبق منهجًا واضحًا من الحجز إلى الفحص ثم الإصلاح والضمان.",
    note: "المعالجة المبكرة تساعد على حماية البنية وتقليل الهدر.",
  },
  "al-faysaliyah": {
    intro: "خدمة حي الفيصلية موجهة للحالات التي تحتاج تشخيصًا احترافيًا دون تعطيل طويل.",
    painPoint: "كثير من البلاغات تبدأ من مؤشرات بسيطة ثم تتضح كحالات تسرب خفي.",
    focus: "نحدد مكان الخلل أولًا ثم نقدم حلًا مناسبًا لطبيعة الموقع.",
    note: "الوضوح في التقرير يسهل متابعة الإجراءات المطلوبة.",
  },
  "as-safa": {
    intro: "في حي الصفا نعالج التسربات بأجهزة دقيقة مع أولوية لسلامة التشطيبات.",
    painPoint: "العملاء يهتمون بسرعة حل المشكلة خاصة عند وجود ارتفاع واضح في الفاتورة.",
    focus: "نقدم كشفًا إلكترونيًا وتقريرًا واضحًا مع توصيات إصلاح عملية.",
    note: "الجودة في التنفيذ تقلل احتمالات رجوع المشكلة.",
  },
  "al-aziziyah": {
    intro: "خدمات حي العزيزية تغطي كشف التسربات والعزل للأسطح والخزانات وخطوط التغذية.",
    painPoint: "أكثر ما يسبب القلق هو صعوبة تحديد المصدر بدقة من أول زيارة.",
    focus: "نستخدم أدوات فحص حديثة للوصول إلى السبب الجذري بسرعة.",
    note: "هذا يقلل تكرار الأعطال ويوفر على العميل مصاريف إضافية.",
  },
  abhur: {
    intro: "في حي أبحر نوفر خدمة متخصصة تناسب الظروف الساحلية وتأثير الرطوبة.",
    painPoint: "العملاء غالبًا يبحثون عن شركة معتمدة تفهم مشكلة الفاتورة والتقرير الرسمي.",
    focus: "نبدأ بكشف دقيق للتسرب ثم إصلاح مناسب مع توثيق واضح للحالة.",
    note: "الاستجابة السريعة هنا تصنع فرقًا كبيرًا في تقليل الأضرار.",
  },
};

export function CoverageDistrictPageContent({ row }: Props) {
  const tel = `tel:${siteConfig.phone}`;
  const districtHeadline = `أفضل شركة كشف تسربات في ${row.district} بجدة`;
  const districtContent = districtHighlights[row.slug] ?? {
    intro: `في ${row.district} نقدم خدمة كشف تسربات احترافية مبنية على فحص دقيق وتشخيص واضح.`,
    painPoint: "يركز العملاء عادة على حل ارتفاع الفاتورة ومعرفة سبب المشكلة بدقة.",
    focus: "ننفذ خطة عمل منظمة من المعاينة وحتى الإصلاح النهائي.",
    note: "التدخل المبكر يمنع توسع الأضرار ويحافظ على التشطيبات.",
  };
  const howSteps = [
    "الاتصال والحجز: نستقبل الطلب ونحدد موعدًا مناسبًا حسب موقعك داخل الحي.",
    "الفحص الإلكتروني: نستخدم أجهزة كشف دقيقة (بدون تكسير عشوائي) للوصول لمصدر الخلل.",
    "تحديد المشكلة: نحدد نقطة التسرب في الخزان أو الحمام أو المطبخ أو الشبكة الداخلية.",
    "الإصلاح والضمان: ننفذ المعالجة بخامات مناسبة مع توضيح الضمان والتوصيات.",
  ] as const;
  const tips = [
    "إغلاق المحابس الرئيسية عند مغادرة المنزل لفترات طويلة.",
    "فحص الخزان الأرضي دوريًا للتأكد من عدم وجود تشققات.",
    "مراقبة عداد المياه في وقت عدم الاستهلاك لاكتشاف أي تسرب خفي.",
    "تطبيق عزل مائي وحراري مناسب للأسطح للحد من الرطوبة والتلف.",
    "طلب تقرير كشف تسربات معتمد فور ملاحظة ارتفاع غير منطقي في الفاتورة.",
  ] as const;
  const searchPhrases = [
    `أفضل شركة كشف تسربات في ${row.district} بجدة`,
    `شركة كشف تسربات معتمدة في ${row.district}`,
    `كشف تسربات المياه بدون تكسير في ${row.district}`,
    `فحص تسربات الخزانات والأسطح في ${row.district}`,
    `علاج ارتفاع فاتورة المياه في ${row.district}`,
    `فني كشف تسربات منازل وفلل في ${row.district}`,
  ] as const;
  const quickFacts = [
    `نطاق الخدمة: ${row.district} وما حوله داخل ${row.city.nameAr}.`,
    "نوع الفحص: تشخيص دقيق قبل بدء أي معالجة.",
    "أسلوب التنفيذ: خطوات واضحة مع شرح فني مبسط للعميل.",
    "الهدف: حل المشكلة من جذورها وتقليل احتمالات تكرارها.",
  ] as const;
  const districtLinks = jeddahDistricts
    .filter((district) => district.id !== row.slug)
    .slice(0, 24);

  return (
    <>
      <Link
        href="/#coverage"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#f8fbfc]",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        العودة لقسم الأحياء
      </Link>

      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <Link href="/#coverage" className="hover:text-primary">
          أحياء جدة
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <span className="font-semibold text-primary">{row.district}</span>
      </nav>

      <header className="mb-8 space-y-4 rounded-2xl border-0 bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <p className="text-base font-semibold text-muted-foreground">
          {row.city.nameAr} — {row.district}
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">{row.label}</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          {districtContent.intro} {districtContent.painPoint} {districtContent.focus} {districtContent.note}
        </p>
        <p className="text-lg leading-8 text-muted-foreground">
          {districtHeadline} ليست مجرد عبارة دعائية، بل التزام عملي يبدأ من المعاينة الدقيقة، يمر بتحديد السبب الجذري
          للمشكلة، وينتهي بتنفيذ معالجة واضحة المعالم تمنع تكرار الخلل قدر الإمكان.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <aside className="space-y-6 lg:col-span-4">
          <RequestInspectionBox phone={siteConfig.phone} className="sticky top-24" />

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.35)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">معلومات سريعة عن الخدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-base leading-8 text-muted-foreground">
                {quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-gradient-to-b from-[#eef7f9] to-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">تواصل مباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base leading-8 text-muted-foreground">
                فريقنا جاهز للرد على استفسارات {row.district} وترتيب موعد مناسب بسرعة.
              </p>
              <a
                href={tel}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "inline-flex w-full flex-row-reverse items-center justify-center gap-2 bg-[#1f7f8a] font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                اتصل الآن
              </a>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-8 lg:col-span-8">
          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">ماذا نقدم في {row.district}؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                نقدم فحصًا دقيقًا للتسربات باستخدام وسائل كشف غير هدّامة قدر الإمكان، مع تقرير مبسّط يوضح مصدر المشكلة وخيارات
                المعالجة.
              </p>
              <p>
                عند الحاجة، ننفذ عزلًا مائيًا أو حراريًا حسب حالة السطح أو الخزان أو خطوط التغذية، مع مراعاة ظروف المناخ الساحلي
                في {row.city.nameAr}. لذلك يبحث كثير من العملاء عن خدمات مثل كشف تسربات المياه بدون تكسير، وعزل الأسطح والخزانات
                بمعايير تنفيذ واضحة.
              </p>
              <p>
                إذا لاحظت ارتفاعًا مفاجئًا في الفاتورة أو بقع رطوبة أو ضعف ضغط، ننصح بجدولة معاينة مبكرة قبل توسّع الضرر، خاصة
                في الحالات التي تحتاج فني كشف تسربات محترف داخل {row.district}.
              </p>
              <p>
                نقدم كذلك حلولًا متكاملة تشمل كشف تسربات الحمامات، كشف تسربات المطابخ، فحص تمديدات المياه الداخلية، ومعالجة
                الرطوبة الصاعدة في الجدران قبل وصولها إلى مراحل أكثر تكلفة وتعقيدًا.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">كيف نقوم بالكشف في {row.district}؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              {howSteps.map((step) => (
                <p key={step}>{step}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">تحليل تفصيلي لمشكلات التسرب في {row.district}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                تختلف طبيعة التسربات من مبنى لآخر داخل {row.district}. بعض الحالات تكون بسبب خطوط تغذية قديمة أو وصلات ضعيفة داخل
                دورات المياه والمطابخ، بينما تظهر حالات أخرى على شكل رطوبة صاعدة في الجدران نتيجة تسرب خفي مستمر. لذلك لا نعتمد
                على التخمين، بل نبدأ بخطوات تشخيص دقيقة تشمل مراجعة الاستهلاك، متابعة سلوك العداد، وفحص نقاط الشبكة الأكثر عرضة
                للأعطال.
              </p>
              <p>
                كثير من السكان في {row.district} مرّوا بتجارب سابقة فيها تكسير عشوائي بدون نتيجة واضحة. نهجنا
                مختلف: نحدد نقطة الخلل أولًا ثم نوصي بأقل تدخل ممكن لتحقيق إصلاح فعلي. هذا الأسلوب يوفر الوقت، ويحمي التشطيبات،
                ويمنع تكرار نفس المشكلة خلال فترة قصيرة، خصوصًا في طلبات كشف تسربات الحمامات والمطابخ وتمديدات المياه الداخلية.
              </p>
              <p>
                بعد التشخيص، نوضح للعميل سيناريوهات الحل بحسب الحالة: إصلاح موضعي، إعادة تأهيل جزء من الشبكة، أو تنفيذ عزل مائي
                وحراري تكميلي للأسطح والخزانات إذا كان التسرب مرتبطًا بعوامل مناخية. في كل الأحوال، تكون الخطة مكتوبة وواضحة حتى
                يعرف العميل ما سيتم تنفيذه ولماذا.
              </p>
              <p>
                لهذا السبب يفضّل كثير من العملاء البحث عن شركة كشف تسربات معتمدة في {row.district} تمتلك خبرة ميدانية حقيقية،
                وتقدّم تقريرًا واضحًا وخطوات تنفيذ قابلة للمتابعة بعد انتهاء العمل.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">خطة عملنا داخل {row.district}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                نعتمد داخل {row.district} على خطة عمل واضحة من ثلاث مراحل: فحص وتشخيص، معالجة فنية، ثم متابعة للتأكد من استقرار
                الوضع. هذا التسلسل يضمن أن الإصلاح لا يكون مؤقتًا، وأن كل خطوة تنفذ على أساس ملاحظات دقيقة من أرض الواقع.
              </p>
              <p>
                عند وجود ارتفاع مفاجئ في الفاتورة أو ظهور رطوبة غير مبررة، يكون عامل الوقت مهمًا جدًا. التدخل السريع يقلل استهلاك
                المياه، ويحافظ على الدهانات والديكورات، ويحد من امتداد الضرر إلى أجزاء أخرى من العقار، وهو ما يجعل خدمة
                كشف تسربات المياه في {row.district} خطوة أساسية قبل أي إصلاحات إضافية.
              </p>
              <p>
                كما نقدم بعد التنفيذ إرشادات عملية مبسطة: كيفية متابعة العداد، متى يفضل إعادة الفحص، وما العلامات المبكرة التي
                تستدعي التواصل الفوري. هذه الخطوات تساعد على حماية المنزل أو المنشأة وتخفيف المصروفات غير المتوقعة.
              </p>
              <p>
                سواء كان العقار فيلا، شقة، عمارة سكنية، أو منشأة تجارية في {row.city.nameAr}، فإن جودة التشخيص هي نقطة البداية
                الصحيحة. لذلك نحرص أن تكون كل زيارة مرتبطة بهدف محدد: اكتشاف السبب الجذري، تنفيذ حل مناسب، ثم التأكد من استقرار
                الحالة بعد الإصلاح.
              </p>
              <p>
                إذا كنت تبحث عن أفضل فني كشف تسربات في {row.district} مع خدمة منظمة وتواصل واضح، فالأهم هو اختيار جهة تعمل وفق
                خطة فحص دقيقة وتوصيات عملية تقلل احتمالات رجوع المشكلة.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">نصائح عملية لتقليل فاتورة المياه</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">تصفح باقي أحياء جدة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base leading-8 text-muted-foreground">
                يمكنك الانتقال مباشرة إلى صفحات الأحياء الأخرى للاطلاع على تفاصيل الخدمة حسب المنطقة.
              </p>
              <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                {districtLinks.map((district) => (
                  <li key={district.id}>
                    <Link
                      href={district.href}
                      className="block rounded-lg border-0 bg-white px-4 py-3 text-base font-semibold leading-relaxed text-[#1b5a73] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#eef7f9] hover:text-[#163d57]"
                    >
                      {district.district}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">عبارات يبحث عنها العملاء في {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground">
                {searchPhrases.map((phrase) => (
                  <li key={phrase}>{phrase}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

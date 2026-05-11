"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { sendGtagEvent } from "@/lib/analytics/gtag";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const LOCATIONS = [
  { id: "walls", label: "الجدران", hint: "رطوبة، تقشر دهان، بقع" },
  { id: "ceiling", label: "السقف", hint: "تقطير أو بقع صفراء/بنية" },
  { id: "floors", label: "الأرضيات", hint: "بلاط بارد، رطوبة تحت السيراميك" },
  { id: "bill", label: "فاتورة المياه عالية فقط", hint: "بدون علامات ظاهرة واضحة" },
] as const;

const PROPERTIES = [
  { id: "villa", label: "فيلا" },
  { id: "apartment", label: "شقة" },
  { id: "tank", label: "خزان أرضي" },
] as const;

export type LocationId = (typeof LOCATIONS)[number]["id"];
export type PropertyId = (typeof PROPERTIES)[number]["id"];

function buildDiagnosis(location: LocationId, property: PropertyId): { headline: string; body: string } {
  if (location === "bill") {
    return {
      headline: "تشخيص أولي: تسرب خفي أو بطيء محتمل",
      body:
        "ارتفاع الاستهلاك دون علامات رطوبة بارزة غالباً ما يرتبط بتسرب بطيء في دورة المياه الداخلية، أو في مواسير التغذية تحت البلاط، أو في ملحقات المراحيض والمتحكمات، أو في شبكة الخزان. احتمال كبير لوجود تسرب يحتاج كشفاً إلكترونياً دقيقاً (مثل الإيكوفون) لتحديد النقطة قبل أي تكسير.",
    };
  }

  if (property === "tank") {
    if (location === "walls" || location === "floors") {
      return {
        headline: "تشخيص أولي: ارتباط قوي بالخزان الأرضي والوصلات",
        body:
          "الرطوبة في الجدران أو الأرضيات قرب منطقة الخزان غالباً ما تشير إلى تسرب في وصلات الدخول/الخروج، أو في الطوف الأرضي، أو في جدار الخزان نفسه. يُنصح بفحص ضغط خط التغذية والكشف الصوتي حول المفاصل والطوامق.",
      };
    }
    if (location === "ceiling") {
      return {
        headline: "تشخيص أولي: تسرب علوي أو من خطوط علوية",
        body:
          "رطوبة السقف مع وجود خزان أرضي قد يعكس تسرباً من خطوط صاعدة نحو الطوابق، أو تمديدات تغذية علوية، أو تسرباً من دورة مياه أعلى إن وُجدت. يفضّل الجمع بين الفحص الحراري والصوتي لتحديد المصدر.",
      };
    }
  }

  if (location === "walls") {
    if (property === "apartment") {
      return {
        headline: "تشخيص أولي: تسرب من الحمام/المطبخ أو الجار",
        body:
          "رطوبة الجدران في الشقق غالباً ما تُنسب إلى تسربات في الحمامات أو المطابخ (مواسير تغذية أو تصريف داخل الحائط)، أو إلى تسرب جانبي من الوحدة المجاورة. احتمال كبير لكسر بسيط في مواسير التغذية أو الوصلات المخفية خلف البلاط.",
      };
    }
    return {
      headline: "تشخيص أولي: تسرب في واجهات أو دورات مياه داخلية",
      body:
        "في الفلل، رطوبة الجدران قد ترتبط بدورات مياه متعددة، أو بواجهات مبللة، أو بتمديدات خارجية. غالباً ما يُشتبه في مواسير تغذية داخل الجدار أو في نقاط الالتقاء مع الأسقف.",
    };
  }

  if (location === "ceiling") {
    if (property === "apartment") {
      return {
        headline: "تشخيص أولي: تسرب من الطابق العلوي أو السطح المشترك",
        body:
          "رطوبة أو تقطير السقف في الشقة غالباً ما يعكس تسرباً من حمام الجار العلوي، أو من خطوط التكييف/التصريف، أو من غطاء السطح إن كنت في الطابق الأخير. يُنصح بكشف موضعي فوق منطقة البقع.",
      };
    }
    return {
      headline: "تشخيص أولي: سطح أو مصارف علوية أو تمديدات السطح",
      body:
        "في الفلل، تسرب السقف غالباً ما يرتبط بعيوب عزل السطح، أو بمصارف ماطرة مسدودة، أو بخطوط شمسية/تكييف، أو بتسرب من خزان علوي إن وُجد. احتمال كبير لوجود مسار ماء يصل إلى السقف من الخارج أو من الدور العلوي.",
    };
  }

  /* floors */
  if (property === "apartment") {
    return {
      headline: "تشخيص أولي: بلاطة أو سقف سفلي لجار/حمامك",
      body:
        "رطوبة الأرضيات في الشقة قد تعكس تسرباً من حمامك (شطف أو تصريف)، أو تسرباً من وحدة علوية عبر البلاطة. غالباً ما يُشتبه في تصريف أرضي أو في مواسير تغذية تحت البلاط.",
    };
  }

  if (property === "tank") {
    return {
      headline: "تشخيص أولي: منطقة الخزان والبلاطة المحيطة",
      body:
        "رطوبة الأرضيات مع خزان أرضي تشير غالباً إلى تسرب حول الطوف أو في مفاصل الدخول للخزان أو في خط الرجوع. يُفضّل فحص ضغط الخط وكشف صوتي موضعي.",
    };
  }

  return {
    headline: "تشخيص أولي: تسرب تحت البلاط أو في التمديدات الأرضية",
    body:
      "رطوبة الأرضيات في الفلل غالباً ما ترتبط بتسرب في دورة مياه أرضية، أو في تمديدات تحت البلاط، أو في أساسات قريبة من الحديقة أو المسبح إن وُجد. احتمال كبير لوجود كسر في مواسير التغذية أو في خط التصريف تحت البلاط.",
  };
}

function buildWhatsappMessage(args: {
  locationLabel: string;
  propertyLabel: string;
  headline: string;
}): string {
  return [
    `مرحباً ${siteConfig.name}،`,
    "",
    "أريد حجز *فحص مجاني بجهاز الإيكوفون* بعد استخدام المُشخّص الذكي على الموقع.",
    "",
    "— إجاباتي:",
    `• مكان الملاحظة: ${args.locationLabel}`,
    `• نوع العقار: ${args.propertyLabel}`,
    "",
    "— التشخيص الأولي المعروض لي:",
    args.headline,
    "",
    "أرجو التواصل لتحديد موعد المعاينة.",
  ].join("\n");
}

function whatsappUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return "#";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function LeakDiagnosticTool() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<LocationId | null>(null);
  const [property, setProperty] = useState<PropertyId | null>(null);

  const diagnosis = useMemo(() => {
    if (!location || !property) return null;
    return buildDiagnosis(location, property);
  }, [location, property]);

  const locationLabel = LOCATIONS.find((l) => l.id === location)?.label ?? "";
  const propertyLabel = PROPERTIES.find((p) => p.id === property)?.label ?? "";

  const waHref =
    diagnosis && location && property
      ? whatsappUrl(
          siteConfig.phone,
          buildWhatsappMessage({
            locationLabel,
            propertyLabel,
            headline: diagnosis.headline,
          }),
        )
      : "#";

  const reset = () => {
    sendGtagEvent("leak_quiz_reset");
    setStep(1);
    setLocation(null);
    setProperty(null);
  };

  return (
    <div className="mx-auto max-w-2xl text-right" dir="rtl">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#4a6677]">
          <Sparkles className="size-4 shrink-0 text-[#1f7f8a]" aria-hidden />
          <span>{step === 3 ? "النتيجة" : `الخطوة ${step} من 3`}</span>
        </div>
        <div className="flex gap-1.5" role="presentation" aria-hidden>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-8 rounded-full transition-colors",
                step >= i ? "bg-[#1f7f8a]" : "bg-[#d7e8ee]",
              )}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <section className="space-y-4" aria-labelledby="quiz-step1-title">
          <h2 id="quiz-step1-title" className="text-xl font-extrabold text-[#163d57] md:text-2xl">
            أين تلاحظ المشكلة؟
          </h2>
          <p className="text-sm leading-relaxed text-[#4a6677] md:text-base">
            اختر الخيار الأقرب لما تراه في منزلك أو في فاتورة المياه.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {LOCATIONS.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => {
                    sendGtagEvent("leak_quiz_step", {
                      step_from: 1,
                      step_to: 2,
                      location_id: opt.id,
                    });
                    setLocation(opt.id);
                    setStep(2);
                  }}
                  className={cn(
                    "flex w-full flex-col rounded-2xl border-0 bg-white p-4 text-right shadow-[0_12px_28px_-16px_rgba(19,66,89,0.22)] ring-1 ring-[#d7e8ee]/80 transition-all",
                    "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(19,66,89,0.28)] hover:ring-[#1f7f8a]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7f8a]/45",
                    "min-h-[5.5rem] justify-center",
                  )}
                >
                  <span className="text-base font-bold text-[#163d57]">{opt.label}</span>
                  <span className="mt-1 text-xs text-[#4a6677] md:text-sm">{opt.hint}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4" aria-labelledby="quiz-step2-title">
          <h2 id="quiz-step2-title" className="text-xl font-extrabold text-[#163d57] md:text-2xl">
            ما نوع العقار؟
          </h2>
          <p className="text-sm leading-relaxed text-[#4a6677] md:text-base">
            يساعدنا نوع العقار على تقريب مصدر التسرب الشائع في مثيلاته.
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {PROPERTIES.map((opt) => (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => {
                    sendGtagEvent("leak_quiz_step", {
                      step_from: 2,
                      step_to: 3,
                      property_id: opt.id,
                    });
                    if (location) {
                      sendGtagEvent("leak_quiz_result", {
                        location_id: location,
                        property_id: opt.id,
                      });
                    }
                    setProperty(opt.id);
                    setStep(3);
                  }}
                  className={cn(
                    "flex min-h-[4.5rem] w-full items-center justify-center rounded-2xl border-0 bg-white px-3 py-4 text-center shadow-[0_12px_28px_-16px_rgba(19,66,89,0.22)] ring-1 ring-[#d7e8ee]/80 transition-all",
                    "text-base font-bold text-[#163d57]",
                    "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(19,66,89,0.28)] hover:ring-[#1f7f8a]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7f8a]/45",
                  )}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="ghost"
            className="mt-2 gap-1 text-[#1f7f8a]"
            onClick={() => {
              setStep(1);
              setProperty(null);
            }}
          >
            <ArrowRight className="size-4 rotate-180" aria-hidden />
            رجوع لتعديل الخطوة السابقة
          </Button>
        </section>
      )}

      {step === 3 && diagnosis && location && property && (
        <section className="space-y-6" aria-labelledby="quiz-result-title">
          <div className="rounded-2xl border-0 bg-gradient-to-br from-[#ecf8f8] to-white p-6 shadow-[0_16px_40px_-18px_rgba(19,66,89,0.28)] ring-1 ring-[#1f7f8a]/20 md:p-8">
            <div className="mb-3 flex flex-row-reverse items-center gap-2 text-[#1f7f8a]">
              <CheckCircle2 className="size-6 shrink-0" aria-hidden />
              <h2 id="quiz-result-title" className="text-lg font-extrabold text-[#163d57] md:text-xl">
                {diagnosis.headline}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#33586d] md:text-base">{diagnosis.body}</p>
            <ul className="mt-4 space-y-1.5 border-t border-[#d7e8ee] pt-4 text-xs text-[#4a6677] md:text-sm">
              <li>
                <span className="font-semibold text-[#163d57]">ما اخترته:</span> {locationLabel} — {propertyLabel}
              </li>
            </ul>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
            هذا التشخيص أولي وإرشادي وليس بديلاً عن المعاينة الميدانية. يحدد الفني المصدر بدقة بعد الكشف الإلكتروني.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row-reverse sm:flex-wrap sm:justify-end">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فتح واتساب لحجز فحص مجاني بجهاز الإيكوفون"
              onClick={() => {
                sendGtagEvent("leak_quiz_whatsapp_cta", {
                  location_id: location,
                  property_id: property,
                });
              }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "inline-flex h-auto min-h-12 flex-row items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white hover:bg-[#20bd5a]",
              )}
            >
              <WhatsAppLogo className="h-6 w-auto shrink-0 text-white" />
              احصل على فحص مجاني بجهاز الإيكوفون الآن
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69]",
              )}
            >
              أو تواصل عبر نموذج الاتصال
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <Button type="button" variant="ghost" size="sm" className="gap-1 text-[#1f7f8a]" onClick={() => setStep(2)}>
              <ArrowLeft className="size-4" aria-hidden />
              تعديل الإجابات
            </Button>
            <Button type="button" variant="link" className="text-muted-foreground" onClick={reset}>
              إعادة الاختبار من البداية
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

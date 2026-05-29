import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SCHEMA_LOCAL_BUSINESS_ID, SCHEMA_ORGANIZATION_ID } from "@/lib/seo/schema-ids";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { absUrl, siteConfig } from "@/lib/site-config";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

const digitsOnlyPhone = siteConfig.phone.replace(/\D/g, "");
const whatsappHref =
  digitsOnlyPhone.length >= 10 ? `https://wa.me/${digitsOnlyPhone}` : undefined;

/** روابط سريعة لمجالات العمل — كلمات مفتاحية تشغيلية للزائر */
const serviceKeywordLinks = [
  { href: "/leak-detection", label: "كشف تسربات المياه بدون تكسير" },
  { href: "/smart-leak-diagnosis", label: "تشخيص تسربات ذكي" },
  { href: "/insulation-services/thermal-insulation", label: "عزل حراري للأسطح والمباني" },
  { href: "/insulation-services/foam-thermal-waterproof-insulation", label: "عزل فوم حراري ومائي" },
  { href: "/insulation-services/tank-epoxy-insulation", label: "عزل خزانات إيبوكسي" },
  { href: "/insulation-services/bathroom-foam-insulation", label: "عزل حمامات بالفوم" },
  { href: "/insulation-services/tank-injection", label: "حقن خزانات" },
  { href: "/insulation", label: "عزل مائي وحراري بجدة" },
  { href: "/services", label: "دليل الخدمات الكامل" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "اتصل بنا — كشف تسربات وعزل جدة",
  description:
    "هاتف وواتساب لحجز كشف تسربات أو عزل في جدة: فحص إلكتروني، عزل فوم وخزانات، طوارئ تسرب، ومعاينة مجانية.",
  path: "/contact",
  keywords: keywordsForPath("/contact", [
    "اتصل شركة كشف تسربات جدة",
    "طوارئ تسرب مياه جدة",
    "معاينة مجانية عزل",
  ]),
  ogTitle: `اتصل بنا — ${siteConfig.name}`,
});

export default function ContactPage() {
  const tel = `tel:${siteConfig.phone}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: absUrl("/") },
          { "@type": "ListItem", position: 2, name: "اتصل بنا", item: absUrl("/contact") },
        ],
      },
      {
        "@type": "ContactPage",
        "@id": `${absUrl("/contact")}#webpage`,
        url: absUrl("/contact"),
        name: `اتصل بنا — ${siteConfig.name}`,
        inLanguage: "ar-SA",
        about: { "@id": SCHEMA_ORGANIZATION_ID },
        provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="page-main pb-mobile-fab pt-8 md:pt-14">
        <nav className="mb-8 text-right text-sm text-[#5a7588]" aria-label="مسار التصفح">
          <Link href="/" className="font-medium text-[#1f7f8a] hover:underline">
            الرئيسية
          </Link>
          <span className="mx-2 text-[#b8c9d4]" aria-hidden>
            /
          </span>
          <span className="text-[#163d57]">اتصل بنا</span>
        </nav>

        <section className="rounded-3xl border border-[#d7e8ee] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
          <p className="mb-3 inline-flex w-fit flex-row-reverse items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
            <MessageCircle className="size-4" aria-hidden />
            تواصل مباشر
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">اتصل بنا</h1>
          <p className="mt-4 max-w-4xl text-pretty text-lg leading-8 text-[#4a6677]">
            نستقبل استفساراتكم وطلبات المعاينة في <strong className="font-semibold text-[#163d57]">كشف تسربات المياه</strong>{" "}
            (فحص إلكتروني وأجهزة سمعية حيث يلزم)، و<strong className="font-semibold text-[#163d57]">العزل الحراري والمائي</strong>{" "}
            للأسطح والخزانات، و<strong className="font-semibold text-[#163d57]">عزل الفوم</strong> و<strong className="font-semibold text-[#163d57]">عزل الخزانات بالإيبوكسي</strong>{" "}
            و<strong className="font-semibold text-[#163d57]">حقن الخزانات</strong>، إضافة إلى علاج رطوبة الحمامات وارتفاع{" "}
            <strong className="font-semibold text-[#163d57]">فاتورة المياه</strong> المرتبطة بتسرب خفي — عملنا الميداني في{" "}
            <strong className="font-semibold text-[#163d57]">جدة</strong> وأحيائها.
          </p>
          <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white shadow-[0_8px_20px_-12px_rgba(31,127,138,0.9)] hover:bg-[#1a6d76]",
              )}
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              اتصل الآن — {siteConfig.phoneDisplay}
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
                )}
              >
                <WhatsAppLogo className="size-4 shrink-0 text-[#25D366]" />
                واتساب
              </a>
            )}
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-11 rounded-xl px-4 font-semibold text-[#1f7f8a] hover:bg-[#ecf8f8]",
              )}
            >
              تصفح الخدمات
              <ArrowLeft className="mr-2 size-4" aria-hidden />
            </Link>
          </div>
        </section>

        <section
          className="mt-10 rounded-2xl border border-[#e8eef1] bg-white p-6 text-right shadow-[0_12px_28px_-20px_rgba(19,66,89,0.28)] md:p-8"
          aria-labelledby="contact-keywords-heading"
        >
          <div className="flex flex-row-reverse flex-wrap items-start justify-between gap-4 border-b border-[#eef4f6] pb-5">
            <div>
              <h2 id="contact-keywords-heading" className="text-xl font-extrabold text-[#163d57] md:text-2xl">
                مجالات نستقبل عنها اتصالاتكم
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#4a6677] md:text-base">
                اختصر وقتك: اختر الموضوع الأقرب لحالتك ثم تواصل بالهاتف أو واتساب مع ذكر النطاق (مثلاً: تسرب حمام، عزل سطح، خزان أرضي).
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fafb] px-3 py-1 text-xs font-semibold text-[#2f7f86]">
              <Sparkles className="size-3.5" aria-hidden />
              مجالات الخدمة
            </span>
          </div>
          <ul className="mt-6 flex flex-row-reverse flex-wrap justify-end gap-2 md:gap-2.5">
            {serviceKeywordLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-[#d7e8ee] bg-[#fafcfd] px-3.5 py-2 text-sm font-medium text-[#214f66] transition-colors hover:border-[#8cc7d2] hover:bg-white hover:text-[#1f7f8a]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <Card className="rounded-2xl border-0 bg-white text-right ring-0 shadow-[0_14px_38px_-14px_rgba(19,66,89,0.26)] transition-shadow hover:shadow-[0_20px_48px_-16px_rgba(19,66,89,0.32)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-lg font-bold text-[#163d57]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#ecf8f8] text-[#1f7f8a]">
                  <Phone className="size-5 shrink-0" aria-hidden />
                </span>
                الهاتف والطوارئ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-[#4a6677]">
                للاستجابة السريعة، خاصة عند <strong className="text-[#163d57]">طوارئ تسرب المياه</strong> أو شكوى رطوبة حادة بعد الأمطار.
              </p>
              <a
                href={tel}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex w-full flex-row-reverse items-center justify-center gap-2 rounded-xl bg-[#1f7f8a] font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {siteConfig.phoneDisplay}
              </a>
              <p className="text-xs font-mono text-[#6d8799]" dir="ltr">
                {siteConfig.phone}
              </p>

              {whatsappHref && (
                <>
                  <Separator className="bg-[#e8eef1]" />
                  <div className="space-y-2">
                    <p className="text-sm text-[#4a6677]">واتساب لإرسال صور أو مقاطع قصيرة يوضح موقع التسرب أو الرطوبة.</p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "default" }),
                        "inline-flex w-full flex-row-reverse items-center justify-center gap-2 rounded-xl border-[#8cc7d2] font-semibold text-[#154c69] hover:bg-[#edf8fa]",
                      )}
                    >
                      <WhatsAppLogo className="size-4 shrink-0 text-[#25D366]" />
                      فتح واتساب
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 bg-white text-right ring-0 shadow-[0_14px_38px_-14px_rgba(19,66,89,0.26)] transition-shadow hover:shadow-[0_20px_48px_-16px_rgba(19,66,89,0.32)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-lg font-bold text-[#163d57]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#ecf8f8] text-[#1f7f8a]">
                  <MapPin className="size-5 shrink-0" aria-hidden />
                </span>
                النطاق الجغرافي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <address className="not-italic text-base leading-relaxed text-[#4a6677]">
                جدة، المملكة العربية السعودية
              </address>
              <p className="text-sm leading-relaxed text-[#4a6677]">
                معاينات ميدانية ضمن <strong className="font-semibold text-[#163d57]">أحياء جدة</strong> حسب المواعيد المتاحة والأولوية للحالات الطارئة.
              </p>
              <Link
                href="/#coverage"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "rounded-xl border-[#d7e8ee] bg-[#f5fbfc] font-semibold text-[#154c69] hover:bg-[#ecf8f8]",
                )}
              >
                عرض نطاق التغطية
                <ArrowLeft className="mr-2 size-4" aria-hidden />
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 bg-white text-right ring-0 shadow-[0_14px_38px_-14px_rgba(19,66,89,0.26)] transition-shadow hover:shadow-[0_20px_48px_-16px_rgba(19,66,89,0.32)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-lg font-bold text-[#163d57]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#ecf8f8] text-[#1f7f8a]">
                  <Clock className="size-5 shrink-0" aria-hidden />
                </span>
                أوقات الاستجابة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-[#4a6677]">
              <p>
                <span className="font-semibold text-[#163d57]">الأيام العادية:</span> ننسّق زيارات فنية لـ
                <strong className="font-semibold text-[#163d57]"> كشف التسربات</strong> و<strong className="font-semibold text-[#163d57]">أعمال العزل</strong> حسب الضغط والمواعيد.
              </p>
              <p>
                <span className="font-semibold text-[#163d57]">الطوارئ:</span> عند تسرب حاد أو تضرر واضح يُفضّل الاتصال فوراً لتوجيه الفريق الفني بسرعة.
              </p>
            </CardContent>
          </Card>
        </div>

        {contactEmail && (
          <Card className="mt-6 rounded-2xl border-0 bg-white text-right ring-0 shadow-[0_14px_38px_-14px_rgba(19,66,89,0.26)] transition-shadow hover:shadow-[0_20px_48px_-16px_rgba(19,66,89,0.32)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-lg font-bold text-[#163d57]">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#ecf8f8] text-[#1f7f8a]">
                  <Mail className="size-5 shrink-0" aria-hidden />
                </span>
                البريد الإلكتروني
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("استفسار من الموقع — " + siteConfig.name)}`}
                className="break-all text-base font-semibold text-[#1f7f8a] underline-offset-4 hover:underline"
                dir="ltr"
              >
                {contactEmail}
              </a>
              <p className="mt-2 text-sm text-[#4a6677]">مناسب للاستفسارات الإدارية أو إرفاق مستندات؛ للطوارئ يُفضّل الهاتف.</p>
            </CardContent>
          </Card>
        )}

        <section className="mt-12 rounded-2xl border border-[#e0f2f4] bg-gradient-to-br from-[#f8fcfd] to-white p-6 text-right md:p-8">
          <div className="flex flex-row-reverse flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-[#163d57] md:text-xl">قبل الاتصال</h2>
            <ShieldCheck className="size-8 text-[#2f8f86] opacity-90" aria-hidden />
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a6677] md:text-base">
            إن أمكن، جهّز وصفاً قصيراً للمشكلة: هل الاشتباه في <strong className="text-[#163d57]">شبكة التغذية</strong> أم{" "}
            <strong className="text-[#163d57]">الصرف</strong>؟ هل يوجد <strong className="text-[#163d57]">خزان علوي أو أرضي</strong>؟ هل لاحظتم ارتفاعاً في عداد المياه؟
            هذه التفاصيل تسرّع تحديد نوع الزيارة — كشف تسرب، أو معاينة عزل سطح، أو فحص خزان.
          </p>
        </section>

        <div className="mt-16 md:mt-24">
          <RelatedServicesSection currentPath="/contact" />
        </div>

        <p className="mt-12 text-center text-sm text-[#5a7588]">
          <Link href="/" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            الصفحة الرئيسية
          </Link>
          {" · "}
          <Link href="/blog" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            المدونة
          </Link>
        </p>
      </main>
    </>
  );
}

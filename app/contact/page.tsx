import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SCHEMA_LOCAL_BUSINESS_ID, SCHEMA_ORGANIZATION_ID } from "@/lib/seo/schema-ids";
import { absUrl, siteConfig } from "@/lib/site-config";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

const digitsOnlyPhone = siteConfig.phone.replace(/\D/g, "");
const whatsappHref =
  digitsOnlyPhone.length >= 10 ? `https://wa.me/${digitsOnlyPhone}` : undefined;

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع جدة للتسربات والعزل للطوارئ أو طلب المعاينات وخدمات العزل وكشف التسربات في جدة ومنطقة مكة.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: `اتصل بنا — ${siteConfig.name}`,
    description:
      "هاتف وموقع وفترات عملية للاستجابة لطلباتكم في العزل ومكافحة التسربات بجدة.",
    locale: siteConfig.locale.replace("_", "-"),
  },
};

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
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-10 md:pt-14">
        <header className="mb-12 text-right">
          <nav className="mb-4 text-sm text-muted-foreground" aria-label="مسار القضية">
            <Link href="/" className="hover:text-primary hover:underline">
              الرئيسية
            </Link>
            {" / "}
            <span className="text-foreground">اتصل بنا</span>
          </nav>
          <h1 className="text-balance text-3xl font-extrabold text-primary md:text-4xl">اتصل بنا</h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            نسعد باستفساراتكم حول كشف تسربات المياه، العزل الحراري والمائي، وعزل الخزانات والفوم في جدة وجوارها.
            اتصلوا لجدولة المعاينات أو لتبليغنا عن طوارئ تسرب.
          </p>
        </header>

        <div className="space-y-6">
          <Card className="text-right shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-xl text-primary">
                <Phone className="size-5 shrink-0" aria-hidden />
                الهاتف
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                للتواصل الفوري وطوارئ الإصلاح (أولوية لتسربات المياه):
              </p>
              <a
                href={tel}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex w-full flex-row-reverse items-center justify-center gap-2 sm:w-auto",
                )}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                اتصل الآن — {siteConfig.phoneDisplay}
              </a>
              <p className="text-xs font-mono text-muted-foreground" dir="ltr">
                {siteConfig.phone}
              </p>

              <Separator />

              {whatsappHref && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">واتساب (رسائل وفيديو موقع التسرب عند الحاجة):</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "inline-flex w-full flex-row-reverse items-center justify-center gap-2 sm:w-auto",
                    )}
                  >
                    <MessageCircle className="size-4 shrink-0" aria-hidden />
                    فتح واتساب
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="text-right shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-xl text-primary">
                <MapPin className="size-5 shrink-0" aria-hidden />
                الموقع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-base leading-relaxed text-muted-foreground">
                جدة، منطقة مكة المكرمة، المملكة العربية السعودية
              </address>
              <p className="mt-3 text-sm text-muted-foreground">
                نغطي أحياء جدة الرئيسية للمعاينات الميدانية حسب الاتفاق والأولوية.
              </p>
              <div className="mt-4">
                <Link href="/#coverage" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
                  عرض نطاق التغطية
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="text-right shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-row-reverse items-center gap-2 text-xl text-primary">
                <Clock className="size-5 shrink-0" aria-hidden />
                أوقات الاستجابة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">الأيام العادية:</span> نستقبل الاتصالات خلال ساعات
                العمل المعتادة وننسّق مواعيد الزيارات حسب الضغط والأولوية.
              </p>
              <p>
                <span className="font-semibold text-foreground">الطوارئ:</span> في حالات التسرب الحاد يُفضّل الاتصال
                مباشرة على الرقم أعلاه لترتيب أسرع للتوجيه الفني.
              </p>
            </CardContent>
          </Card>

          {contactEmail && (
            <Card className="text-right shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex flex-row-reverse items-center gap-2 text-xl text-primary">
                  <Mail className="size-5 shrink-0" aria-hidden />
                  البريد الإلكتروني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent("استفسار من الموقع — " + siteConfig.name)}`}
                  className="break-all text-base font-medium text-primary underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  {contactEmail}
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        <RelatedServicesSection currentPath="/contact" />

        <p className="mt-12 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary underline-offset-4 hover:underline">
            العودة للصفحة الرئيسية
          </Link>
          {" · "}
          <Link href="/blog" className="text-primary underline-offset-4 hover:underline">
            المدونة
          </Link>
        </p>
      </main>
    </>
  );
}

import Link from "next/link";
import { ArrowLeft, Phone, Shield, Droplets, Thermometer } from "lucide-react";

import { RequestInspectionBox } from "@/components/layout/request-inspection-box";
import { CoverageDistrictConclusionCta } from "@/components/coverage/coverage-district-conclusion-cta";
import { CoverageInlineMarkdown } from "@/components/coverage/coverage-inline-markdown";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDistrictById, jeddahDistricts, type ResolvedCoverageDistrict } from "@/lib/coverage-data";
import { getDistrictRichContent } from "@/lib/seo/coverage-district-content";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Props = {
  row: ResolvedCoverageDistrict;
};

const SERVICE_LINKS = [
  {
    href: "/leak-detection",
    title: "كشف تسربات المياه بدون تكسير",
    desc: "فحص حراري وصوتي وتقرير واضح قبل الإصلاح.",
    Icon: Droplets,
  },
  {
    href: "/insulation",
    title: "عزل أسطح وخزانات بجدة",
    desc: "فوم وإيبوكسي وبيتومين مع ضمان يصل إلى 10 سنوات.",
    Icon: Thermometer,
  },
  {
    href: "/smart-leak-diagnosis",
    title: "المشخّص الذكي للتسربات",
    desc: "تقييم أولي سريع قبل حجز الزيارة الميدانية.",
    Icon: Shield,
  },
] as const;

export function CoverageDistrictPageContent({ row }: Props) {
  const tel = `tel:${siteConfig.phone}`;
  const content = getDistrictRichContent(row.slug, row.district, row.city.nameAr, row.city.slug);
  const { highlight } = content;
  const ext = content.extended;

  const neighborLinks =
    content.neighborSlugs.length > 0
      ? content.neighborSlugs
          .map((id) => getDistrictById(id))
          .filter((d): d is NonNullable<typeof d> => d != null)
      : jeddahDistricts.filter((d) => d.id !== row.slug).slice(0, 8);

  return (
    <>
      <Link
        href="/coverage"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-6 inline-flex items-center gap-2 rounded-xl border-0 bg-white px-4 text-[#3c596d] shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] hover:bg-[#f8fbfc]",
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        دليل جميع أحياء جدة
      </Link>

      <nav aria-label="مسار التنقل" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <Link href="/coverage" className="hover:text-primary">
          أحياء جدة
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <Link href="/#coverage" className="hover:text-primary">
          خريطة الأحياء
        </Link>
        <ArrowLeft className="size-4" aria-hidden />
        <span className="font-semibold text-primary">{row.district}</span>
      </nav>

      <header className="mb-8 space-y-4 rounded-2xl border-0 bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <p className="text-base font-semibold text-muted-foreground">
          {row.city.nameAr} — خدمة ميدانية في {row.district}
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
          {content.pageH1 ?? row.label}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          <CoverageInlineMarkdown text={highlight.intro} />
        </p>
        {ext?.introduction && ext.introduction.length > 1
          ? ext.introduction.slice(1).map((para) => (
              <p key={para.slice(0, 48)} className="text-base leading-8 text-muted-foreground">
                <CoverageInlineMarkdown text={para} />
              </p>
            ))
          : content.heroExtra ? (
              <p className="text-lg leading-8 text-muted-foreground">
                <CoverageInlineMarkdown text={content.heroExtra} />
              </p>
            ) : null}
        <p className="text-base leading-8 text-muted-foreground">
          <strong className="text-[#163d57]">ما يقلق السكان:</strong>{" "}
          <CoverageInlineMarkdown text={highlight.painPoint} />
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          <strong className="text-[#163d57]">نهجنا في الحي:</strong>{" "}
          <CoverageInlineMarkdown text={highlight.focus} />
        </p>
        {highlight.localContext ? (
          <p className="text-base leading-8 text-muted-foreground">
            <CoverageInlineMarkdown text={highlight.localContext} />
          </p>
        ) : null}
        {highlight.note ? (
          <p className="text-sm leading-7 text-muted-foreground">
            <CoverageInlineMarkdown text={highlight.note} />
          </p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <aside className="space-y-6 lg:col-span-4">
          <RequestInspectionBox phone={siteConfig.phone} className="sticky top-24" />

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.35)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">معلومات سريعة — {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-base leading-8 text-muted-foreground">
                {content.quickFacts.map((fact) => (
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
          <section aria-labelledby="local-services-heading">
            <h2 id="local-services-heading" className="mb-4 text-2xl font-extrabold text-[#163d57]">
              خدماتنا في {row.district}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {SERVICE_LINKS.map(({ href, title, desc, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex h-full flex-col rounded-xl border border-[#e8edf0] bg-white p-4 text-right shadow-sm transition hover:border-[#c5dde8] hover:bg-[#f8fbfc]"
                  >
                    <Icon className="mb-2 size-5 text-[#1f7f8a]" aria-hidden />
                    <span className="font-semibold text-[#163d57]">{title}</span>
                    <span className="mt-1 text-sm leading-6 text-muted-foreground">{desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              أدلة تكميلية:{" "}
              <Link href="/blog/5-ayat-tasarab" className="font-semibold text-[#1f7f8a] hover:underline">
                علامات التسرب
              </Link>
              {" · "}
              <Link href="/blog/ارتفاع-فاتورة-المياه-جدة" className="font-semibold text-[#1f7f8a] hover:underline">
                ارتفاع الفاتورة
              </Link>
              {" · "}
              <Link href="/blog/كشف-تسربات-الحمامات" className="font-semibold text-[#1f7f8a] hover:underline">
                تسربات الحمام
              </Link>
              {" · "}
              <Link href="/insulation-services/bathroom-foam-insulation" className="font-semibold text-[#1f7f8a] hover:underline">
                عزل حمامات
              </Link>
            </p>
          </section>

          {ext?.aboutDistrict.length ? (
            <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">عن {row.district}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
                {ext.aboutDistrict.map((para) => (
                  <p key={para.slice(0, 40)}>
                    <CoverageInlineMarkdown text={para} className="text-base leading-8 text-muted-foreground" />
                  </p>
                ))}
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                {ext?.propertyTypes.length
                  ? `أنواع العقارات في ${row.district}`
                  : `طبيعة المباني والمنطقة في ${row.district}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              {ext?.propertyTypes.length
                ? ext.propertyTypes.map((block) => (
                    <article key={block.title}>
                      <h3 className="text-lg font-bold text-[#163d57]">{block.title}</h3>
                      <p className="mt-2 text-base leading-8 text-muted-foreground">
                        <CoverageInlineMarkdown text={block.body} />
                      </p>
                    </article>
                  ))
                : content.buildingProfile.map((para) => (
                    <p key={para.slice(0, 40)} className="text-base leading-8 text-muted-foreground">
                      <CoverageInlineMarkdown text={para} />
                    </p>
                  ))}
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                {ext?.howWeServe.length ? `كيف نقدم الخدمة في ${row.district}` : `ماذا نقدم في ${row.district}؟`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              {ext?.howWeServe.length
                ? ext.howWeServe.map((step) => (
                    <article key={step.title}>
                      <h3 className="text-lg font-bold text-[#163d57]">{step.title}</h3>
                      <p className="mt-2 text-base leading-8 text-muted-foreground">
                        <CoverageInlineMarkdown text={step.body} />
                      </p>
                    </article>
                  ))
                : content.servicesDetail.map((para) => (
                    <p key={para.slice(0, 48)} className="text-base leading-8 text-muted-foreground">
                      <CoverageInlineMarkdown text={para} />
                    </p>
                  ))}
              {!ext?.howWeServe.length ? (
                <p>
                  للتفاصيل العامة راجع{" "}
                  <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
                    دليل الخدمات
                  </Link>{" "}
                  أو{" "}
                  <Link href="/#encyclopedia" className="font-semibold text-[#1f7f8a] hover:underline">
                    موسوعة الموقع
                  </Link>
                  .
                </p>
              ) : null}
            </CardContent>
          </Card>

          {!ext?.howWeServe.length ? (
          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">كيف نقوم بالكشف في {row.district}؟</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                {content.inspectionSteps.map((step) => (
                  <li key={step} className="text-base leading-8 text-muted-foreground">
                    <CoverageInlineMarkdown text={step} />
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          ) : null}

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                مشكلات التسرب والعزل الشائعة في {row.district}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-base leading-8 text-muted-foreground">
              {content.problemAnalysis.map((para) => (
                <p key={para.slice(0, 48)} className="text-base leading-8 text-muted-foreground">
                  <CoverageInlineMarkdown text={para} />
                </p>
              ))}
            </CardContent>
          </Card>

          {ext?.benefits.length ? (
            <Card className="border-0 ring-0 bg-gradient-to-b from-[#eef7f9] to-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">فوائد لسكان {row.district}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                  {ext.benefits.map((item) => (
                    <li key={item.slice(0, 40)} className="text-base leading-8 text-muted-foreground">
                      <CoverageInlineMarkdown text={item} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          {ext?.trustPoints.length ? (
            <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">لماذا يثق بنا سكان {row.district}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                  {ext.trustPoints.map((item) => (
                    <li key={item.slice(0, 40)} className="text-base leading-8 text-muted-foreground">
                      <CoverageInlineMarkdown text={item} />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-0 ring-0 bg-gradient-to-b from-[#eef7f9] to-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">العزل المائي والحراري في {row.district}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-8 text-muted-foreground">
              {content.insulationParagraphs.map((para) => (
                <p key={para.slice(0, 48)} className="text-base leading-8 text-muted-foreground">
                  <CoverageInlineMarkdown text={para} />
                </p>
              ))}
            </CardContent>
          </Card>

          {content.scenarios.length > 0 ? (
            <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">حالات واقعية من {row.district}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {content.scenarios.map((scenario) => (
                  <article
                    key={scenario.title}
                    className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-5"
                  >
                    <h3 className="text-lg font-bold text-[#163d57]">{scenario.title}</h3>
                    <p className="mt-2 text-base leading-8 text-muted-foreground">{scenario.body}</p>
                  </article>
                ))}
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">نصائح محلية لتقليل فاتورة المياه في {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-3 pr-6 text-base leading-8 text-muted-foreground marker:text-[#1f7f8a]">
                {content.tips.map((tip) => (
                  <li key={tip} className="text-base leading-8 text-muted-foreground">
                    <CoverageInlineMarkdown text={tip} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]" id="faq">
            <CardHeader>
              <CardTitle className="text-[#163d57]">
                أسئلة شائعة — كشف التسربات والعزل في {row.district}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border border-[#e8edf0] bg-[#f8fbfc] p-4"
                >
                  <h3 className="text-base font-bold leading-8 text-[#163d57]">س: {item.question}</h3>
                  <p className="mt-2 text-base leading-8 text-muted-foreground">ج: {item.answer}</p>
                </article>
              ))}
            </CardContent>
          </Card>

          {ext?.conclusion.length ? (
            <CoverageDistrictConclusionCta district={row.district} paragraphs={ext.conclusion} />
          ) : null}

          {content.internalLinks?.length ? (
            <Card className="border-0 ring-0 bg-white shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
              <CardHeader>
                <CardTitle className="text-[#163d57]">روابط مفيدة لسكان {row.district}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap justify-end gap-2">
                  {content.internalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block rounded-lg bg-[#eef7f9] px-3 py-2 text-sm font-semibold text-[#1f7f8a] hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <Card className="border-0 ring-0 bg-[#f8fbfc] shadow-[0_12px_30px_-20px_rgba(19,66,89,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#163d57]">أحياء جدة القريبة من {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-base leading-8 text-muted-foreground">
                كل حي له صفحة مستقلة بمحتوى مختلف — انتقل للحي المجاور لمزيد من التفاصيل المحلية.
              </p>
              <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                {neighborLinks.map((district) => (
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
              <CardTitle className="text-[#163d57]">كلمات بحث شائعة في {row.district}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap justify-end gap-2">
                {content.searchPhrases.map((phrase) => {
                  const href =
                    phrase.includes("عزل") && phrase.includes("سطح")
                      ? "/insulation"
                      : phrase.includes("خزان")
                        ? "/blog/كشف-تسربات-الخزانات-بجدة"
                        : phrase.includes("حمام")
                          ? "/blog/كشف-تسربات-الحمامات"
                          : phrase.includes("فاتورة") || phrase.includes("استهلاك")
                            ? "/blog/ارتفاع-فاتورة-المياه-جدة"
                            : "/leak-detection";
                  return (
                    <li key={phrase}>
                      <Link
                        href={href}
                        className="inline-block rounded-full bg-[#eef7f9] px-3 py-1 text-sm font-medium text-[#35566a] hover:bg-[#dceef2] hover:underline"
                      >
                        {phrase}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

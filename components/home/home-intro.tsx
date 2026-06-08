import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HOME_JEDDAH_CONTEXT, HOME_PROCESS, HOME_TRUST_STATS } from "@/lib/seo/home-page-data";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const tel = `tel:${siteConfig.phone}`;

export function HomeIntro() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20"
      aria-labelledby="home-intro-heading"
    >
      <nav className="mb-8 text-sm text-muted-foreground" aria-label="مسار التصفح">
        <span className="font-semibold text-[#163d57]">الرئيسية</span>
      </nav>

      <header className="mb-10 max-w-3xl text-right">
        <h2 id="home-intro-heading" className="text-balance text-3xl font-extrabold text-primary md:text-4xl">
          شركة كشف تسربات المياه وعزل الأسطح في جدة
        </h2>
        <p className="mt-4 text-lg leading-[1.9] text-muted-foreground">
          إذا لاحظت <strong className="text-[#163d57]">ارتفاعاً في فاتورة المياه</strong>، أو{" "}
          <strong className="text-[#163d57]">رطوبة على الجدران</strong>، أو سطحاً حارّاً رغم التكييف — فأنت
          تبحث غالباً عن <strong className="text-[#163d57]">كشف تسربات المياه في جدة</strong> أو{" "}
          <strong className="text-[#163d57]">عزل أسطح بجدة</strong>. في{" "}
          <strong className="text-[#163d57]">{siteConfig.name}</strong> نجمع التشخيص الدقيق والتنفيذ
          الميداني في مسار واحد: نحدد السبب أولاً، ثم نعالجه، ثم نحمي المبنى بعزل وقائي.
        </p>
      </header>

      <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_TRUST_STATS.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-[#d7e8ee] bg-white p-5 text-center shadow-sm"
          >
            <p className="text-3xl font-extrabold text-[#1f7f8a]">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-[#4a6677]">{stat.label}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#163d57] md:text-2xl">ما الذي نقدمه؟</h3>
          <p className="mt-4 leading-[1.9] text-muted-foreground">
            <strong>كشف تسربات المياه بدون تكسير</strong> بأجهزة حرارية وصوتية — للحمامات، المطابخ،
            الخزانات، الأسطح، وخطوط التكييف. و<strong>عزل مائي وحراري</strong> للأسطح بالفوم
            (بولي يوريثان) أو لفائف البيتومين (APP/SBS)، و<strong>عزل خزانات</strong> بالإيبوكسي
            أو من الخارج، و<strong>عزل حمامات بالفوم</strong> قبل تركيب السيراميك.
          </p>
          <p className="mt-4 leading-[1.9] text-muted-foreground">
            نُسلّم <strong>تقارير فنية</strong> توضّح ما تم فحصه — لتساعدك عند متابعة شركة المياه
            الوطنية أو عند بيع العقار. ونربط بين{" "}
            <Link href="/leak-detection" className="font-semibold text-[#1f7f8a] hover:underline">
              كشف التسربات
            </Link>{" "}
            و{" "}
            <Link href="/insulation" className="font-semibold text-[#1f7f8a] hover:underline">
              العزل
            </Link>{" "}
            لأن العزل فوق تسرب نشط يضيع استثمارك.
          </p>
          <div className="mt-6 flex flex-row-reverse flex-wrap gap-3">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "default" }),
                "rounded-xl bg-[#1f7f8a] font-bold text-white hover:bg-[#1a6d76]",
              )}
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-xl border-[#8cc7d2] font-semibold text-[#154c69]",
              )}
            >
              احجز معاينة
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-[#f7f9fa] p-6 md:p-8">
          <h3 className="inline-flex items-center gap-2 text-xl font-bold text-[#163d57] md:text-2xl">
            <ShieldCheck className="size-6 text-[#1f7f8a]" aria-hidden />
            كيف نعمل؟
          </h3>
          <ol className="mt-5 space-y-4">
            {HOME_PROCESS.map((step, i) => (
              <li key={step.title} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="font-bold text-[#163d57]">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm leading-7 text-[#4a6677]">{step.body}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>

      <article className="mt-10 rounded-2xl border border-[#d7e8ee] bg-white p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#163d57] md:text-2xl">{HOME_JEDDAH_CONTEXT.heading}</h3>
        {HOME_JEDDAH_CONTEXT.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="mt-4 leading-[1.9] text-muted-foreground">
            {p}
          </p>
        ))}
        <p className="mt-4 leading-[1.9] text-muted-foreground">
          <MapPin className="mb-0.5 inline size-4 text-[#1f7f8a]" aria-hidden /> نغطي{" "}
          <Link href="/coverage" className="font-semibold text-[#1f7f8a] hover:underline">
            جميع أحياء جدة
          </Link>{" "}
          — من أبحر والروضة إلى الحمدانية والصفا. اختر حيّك من{" "}
          <Link href="/#coverage" className="font-semibold text-[#1f7f8a] hover:underline">
            خريطة التغطية
          </Link>
          .
        </p>
      </article>

      <p className="mt-8 text-center text-base leading-8 text-muted-foreground">
        للتعمّق:{" "}
        <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
          دليل الخدمات الكامل
        </Link>
        {" · "}
        <Link href="/services/azl-ashtof-jeddah" className="font-semibold text-[#1f7f8a] hover:underline">
          عزل أسطح بجدة
        </Link>
        {" · "}
        <Link href="/services/kashf-tasribat-bedun-taksir-jeddah" className="font-semibold text-[#1f7f8a] hover:underline">
          كشف بدون تكسير
        </Link>
        {" · "}
        <Link href="/smart-leak-diagnosis" className="font-semibold text-[#1f7f8a] hover:underline">
          المشخّص الذكي
        </Link>
      </p>
    </section>
  );
}

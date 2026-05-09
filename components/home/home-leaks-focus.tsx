import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, PhoneCall, Waves, CheckCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";

const leakSteps = ["كشف ميداني", "تحديد المصدر", "إصلاح وتوثيق"] as const;

export function HomeLeaksFocus({ phone }: { phone: string }) {
  const tel = `tel:${phone}`;

  return (
    <section id="leaks-focus" className="mx-auto max-w-7xl px-6 pb-10" aria-labelledby="leaks-focus-heading">
      <div className="grid items-stretch overflow-hidden rounded-3xl border border-[#d7e8ee] bg-white shadow-[0_18px_42px_-26px_rgba(20,67,86,0.55)] lg:grid-cols-2">
        <div className="relative min-h-[280px]">
          <Image
            src={images.leakLocalTools03.src}
            alt={images.leakLocalTools03.alt}
            title={images.leakLocalTools03.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={76}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-7 text-right md:p-10 lg:p-12">
          <p className="mb-3 text-sm font-semibold text-[#5a7d8f]">مسار فني معتمد</p>
          <ul className="mb-5 flex flex-row-reverse flex-wrap justify-end gap-3 text-xs font-semibold text-[#2c6274]">
            {leakSteps.map((step) => (
              <li key={step} className="inline-flex items-center gap-1.5 rounded-full bg-[#ebf6f7] px-3 py-1.5">
                <CheckCircle2 className="size-3.5 text-[#2f8f74]" aria-hidden />
                {step}
              </li>
            ))}
          </ul>

          <h3 id="leaks-focus-heading" className="text-balance text-4xl font-extrabold leading-tight text-[#163c55] md:text-5xl">
            كشف التسربات وعلاجها
          </h3>
          <p className="mt-4 text-lg leading-8 text-[#35566a]">
            فحص تسربات المياه بأجهزة حرارية وأكوستيكية لتحديد مكان العطل بدقة، ثم تنفيذ الإصلاح المناسب وتقليل الأثر على التشطيبات.
          </p>

          <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-xl bg-[#2f7f86] px-6 font-bold text-white hover:bg-[#286e74]",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <PhoneCall className="size-4" aria-hidden />
                واتساب | رد سريع خلال دقائق
              </span>
            </a>
            <Link
              href="/#leak-detection"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-[#2f7f86]/40 px-6 font-semibold text-[#214f66] hover:bg-[#edf6f7]",
              )}
            >
              تفاصيل الخدمة
              <ArrowLeft className="mr-2 size-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#eff8fb] px-4 py-2 text-sm font-semibold text-[#2a5f76]">
            <Waves className="size-4" aria-hidden />
            تشخيص احترافي بدون تكسير عشوائي
          </div>
        </div>
      </div>
    </section>
  );
}

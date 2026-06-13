import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, PhoneCall } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";

const points = ["كفاءة طاقة", "حماية من التسرب", "تنفيذ ميداني منظم"] as const;

export function HomeInsulationFocus({ phone }: { phone: string }) {
  const tel = `tel:${phone}`;

  return (
    <section id="insulation-focus" className="mx-auto max-w-7xl px-6 pb-8" aria-labelledby="insulation-focus-heading">
      <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-[#d7e8ee] bg-white shadow-[0_18px_40px_-26px_rgba(22,70,86,0.55)] lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center p-7 text-right md:p-10 lg:order-2 lg:p-12">
          <ul className="mb-6 flex flex-row-reverse flex-wrap justify-end gap-3 text-xs font-semibold text-[#2c6274]">
            {points.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5 rounded-full bg-[#ebf6f7] px-3 py-1.5">
                <CheckCircle2 className="size-3.5 text-[#2f8f74]" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <h2 id="insulation-focus-heading" className="text-balance text-4xl font-extrabold leading-tight text-[#163c55] md:text-5xl">
            عزل فوم حراري ومائي
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#35566a]">
            عزل فوم بالرش للأسطح والخزانات بطبقات حرارية ومائية متماسكة، مع حماية إضافية ضد الرطوبة وعوامل الطقس لفترة طويلة.
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
                طلب معاينة مجانية
              </span>
            </a>
            <Link
              href="/insulation"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-[#2f7f86]/40 px-6 font-semibold text-[#214f66] hover:bg-[#edf6f7]",
              )}
            >
              تفاصيل خدمات العزل
              <ArrowLeft className="mr-2 size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="order-1 min-h-[260px] lg:order-1">
          <div className="relative h-full w-full">
            <Image
              src={images.foam.src}
              alt={images.foam.alt}
              title={images.foam.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
              quality={76}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

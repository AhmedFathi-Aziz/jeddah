import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";

export function HomeHero({ phone }: { phone: string }) {
  const tel = `tel:${phone}`;

  return (
    <section className="relative min-h-[min(72vh,820px)] overflow-hidden sm:min-h-[min(85vh,820px)]" aria-labelledby="hero-heading">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        title={images.hero.title}
        width={images.hero.width}
        height={images.hero.height}
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={80}
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.45]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/50 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[min(72vh,820px)] max-w-7xl flex-col justify-center px-4 py-12 text-white sm:min-h-[min(85vh,820px)] sm:px-6 sm:py-16">
        <div className="me-auto max-w-2xl text-right">
          <h1 id="hero-heading" className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            كشف تسربات المياه والعزل في جدة
          </h1>
          <p className="mt-4 text-pretty text-base text-white/95 leading-relaxed sm:mt-6 sm:text-lg">
            كشف تسربات المياه بدون تكسير بأجهزة فحص صوتية وحرارية وإلكترونية، مع عزل أسطح وخزانات وفوم وحمامات،
            وتقارير معتمدة لتحديد موضع التسرب وإصلاحه بخطة واضحة في جدة.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row-reverse sm:flex-wrap sm:justify-end sm:gap-4">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 w-full rounded-lg border-0 bg-[#1f7f8a] px-6 font-semibold text-white shadow-sm hover:bg-[#1a6d76] sm:w-auto",
              )}
            >
              <span className="inline-flex flex-row-reverse items-center gap-2">
                <Phone className="size-4" aria-hidden />
                اتصل الآن
              </span>
            </a>
            <Link
              href="/leak-detection"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11 w-full rounded-lg border-2 border-white bg-transparent px-6 text-white hover:bg-white/10 hover:text-white sm:w-auto",
              )}
            >
              كشف تسربات بدون تكسير
            </Link>
            <Link
              href="/insulation"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11 rounded-lg border-2 border-white/70 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white",
              )}
            >
              عزل أسطح وخزانات
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/85">
            <Link href="/smart-leak-diagnosis" className="font-semibold underline underline-offset-2 hover:text-white">
              المشخّص الذكي
            </Link>
            {" · "}
            <Link href="/blog/5-ayat-tasarab" className="font-semibold underline underline-offset-2 hover:text-white">
              5 علامات تسرب
            </Link>
            {" · "}
            <Link href="/coverage" className="font-semibold underline underline-offset-2 hover:text-white">
              أحياء جدة
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";

export function HomeHero({ phone }: { phone: string }) {
  const tel = `tel:${phone}`;

  return (
    <section className="relative min-h-[min(85vh,820px)] overflow-hidden" aria-labelledby="hero-heading">
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
      <div className="relative z-10 mx-auto flex min-h-[min(85vh,820px)] max-w-7xl flex-col justify-center px-6 py-16 text-white">
        <div className="me-auto max-w-2xl text-right">
          <h1 id="hero-heading" className="text-balance text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
            أفضل شركة كشف تسربات المياه بجدة
            <span className="mt-2 block text-[#8fd8dc]">بأحدث التقنيات وبدون تكسير</span>
          </h1>
          <p className="mt-6 text-pretty text-lg text-white/95 leading-relaxed">
            نقدم حلولاً متكاملة لكشف وإصلاح تسربات المياه في جدة بأجهزة صوتية وحرارية دقيقة، لحماية منزلك وتقليل هدر المياه.
          </p>
          <div className="mt-8 flex flex-row-reverse flex-wrap justify-end gap-4">
            <a
              href={tel}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 rounded-lg border-0 bg-[#1f7f8a] px-6 font-semibold text-white shadow-sm hover:bg-[#1a6d76]",
              )}
            >
              <span className="inline-flex flex-row-reverse items-center gap-2">
                <Phone className="size-4" aria-hidden />
                اتصل الآن
              </span>
            </a>
            <a
              href={tel}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-11 rounded-lg border-2 border-white bg-transparent px-6 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              طلب معاينة مجانية
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

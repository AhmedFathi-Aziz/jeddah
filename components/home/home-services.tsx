import Image from "next/image";
import Link from "next/link";
import { Droplets, Home, Waves, ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { images } from "@/lib/images";

export function HomeServices() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-16 md:py-20" aria-labelledby="services-heading">
      <header className="mb-10 text-center md:mb-12">
        <h2 id="services-heading" className="text-balance text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          خدماتنا التخصصية في العزل وتسربات المياه بجدة
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          نوفّر خدمات عملية ومنظمة بخطة واضحة، لتشخيص المشكلة ومعالجتها بطريقة دقيقة ومريحة بصرياً وتنفيذياً.
        </p>
      </header>

      <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
        <article
          id="leak-detection"
          className="overflow-hidden rounded-3xl border-0 ring-0 bg-card shadow-[0_18px_38px_-24px_rgba(19,66,89,0.42)] transition-transform hover:-translate-y-0.5 lg:col-span-8 lg:flex lg:flex-row-reverse"
        >
          <div className="relative w-full shrink-0 overflow-hidden max-lg:aspect-[16/10] lg:min-h-[360px] lg:w-[52%]">
            <Image
              src={images.leakGalleryPressureCheck.src}
              alt={images.leakGalleryPressureCheck.alt}
              title={images.leakGalleryPressureCheck.title}
              width={images.leakGalleryPressureCheck.width}
              height={images.leakGalleryPressureCheck.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={72}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <Card className="rounded-none border-0 ring-0 bg-transparent shadow-none lg:w-[48%]">
            <CardHeader className="pb-5 pt-7 text-right md:px-8">
              <div className="mb-4 flex justify-end">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#eaf6f7] text-[#257a86]">
                  <Waves className="size-6" aria-hidden />
                </span>
              </div>
              <CardTitle className="text-2xl leading-tight text-[#163d57] md:text-[1.75rem]">
                كشف تسربات المياه إلكترونياً بدون كسر في جدة
              </CardTitle>
              <CardDescription className="pt-1 text-base leading-8 text-[#4a6677]">
                أجهزة أكوستيكية وحساسات حرارية لتحديد مكان التسرب بدقة دون تكسير عام في معظم الحالات المناسبة لمباني جدة.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-end pb-7 pt-0 md:px-8">
              <Link
                href="/#faq"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "gap-1 rounded-lg px-4 font-semibold text-[#1f7783] hover:bg-[#edf6f7] hover:text-[#165d6f]",
                )}
              >
                اطلع على الأسئلة الشائعة <ArrowLeft className="size-4 mr-2" aria-hidden />
              </Link>
            </CardFooter>
          </Card>
        </article>

        <div id="insulation" className="flex flex-col gap-6 lg:col-span-4">
          <Card className="flex-1 rounded-3xl border-0 ring-0 bg-card text-right shadow-[0_14px_34px_-24px_rgba(19,66,89,0.38)] transition-transform hover:-translate-y-0.5">
            <CardHeader className="pb-3">
              <div className="mb-4 flex justify-end">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#eaf6f7] text-[#257a86]">
                  <Home className="size-6" aria-hidden />
                </span>
              </div>
              <CardTitle className="text-xl text-[#163d57]">عزل الأسطح ضد الحرارة والمياه</CardTitle>
              <CardDescription className="text-base leading-8 text-[#4a6677]">
                عزل مائي وحراري لمقاومة حر الصيف وسقوط الأمطار الموسمي على الأسطح السكنية والتجارية.
              </CardDescription>
              <Link
                href="/insulation"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "mt-2 w-fit self-end gap-1 rounded-lg px-2 text-[#1f7783] hover:bg-[#edf6f7] hover:text-[#165d6f]",
                )}
              >
                عرض صفحة العزل <ArrowLeft className="size-4 mr-2" aria-hidden />
              </Link>
            </CardHeader>
          </Card>

          <Card className="flex-1 rounded-3xl border-0 ring-0 bg-card text-right shadow-[0_14px_34px_-24px_rgba(19,66,89,0.38)] transition-transform hover:-translate-y-0.5">
            <CardHeader className="pb-3">
              <div className="mb-4 flex justify-end">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#eaf6f7] text-[#257a86]">
                  <Droplets className="size-6" aria-hidden />
                </span>
              </div>
              <CardTitle className="text-xl text-[#163d57]">عزل خزانات المياه</CardTitle>
              <CardDescription className="text-base leading-8 text-[#4a6677]">
                طبقات إيبوكسي مع تقليل التسربات والمحافظة على جودة المياه حيث ينطبق ذلك.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

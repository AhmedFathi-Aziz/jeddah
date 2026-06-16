import { MapPin, Phone } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";
import { CoverageInlineMarkdown } from "@/components/coverage/coverage-inline-markdown";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  district: string;
  paragraphs: string[];
};

export function CoverageDistrictConclusionCta({ district, paragraphs }: Props) {
  const tel = `tel:${siteConfig.phone}`;
  const whatsappHref = `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `مرحباً، أريد حجز كشف تسربات في ${district}`,
  )}`;

  return (
    <section
      aria-labelledby="district-conclusion-heading"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-[#1f7f8a] via-[#1a6d76] to-[#163d57] p-6 text-right shadow-[0_20px_50px_-24px_rgba(15,45,62,0.55)] md:p-10"
    >
      <div
        className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-white/5"
        aria-hidden
      />

      <div className="relative">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-sm">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          خدمة محلية في {district}
        </span>

        <h2
          id="district-conclusion-heading"
          className="text-balance text-2xl font-extrabold leading-tight text-white md:text-3xl"
        >
          احجز كشف تسربات في {district}
        </h2>

        <div className="mt-5 max-w-3xl space-y-4">
          {paragraphs.map((para) => (
            <p
              key={para.slice(0, 40)}
              className="text-base leading-8 text-white/90 md:text-lg md:leading-9"
            >
              <CoverageInlineMarkdown text={para} tone="onDark" />
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-row-reverse flex-wrap items-center justify-end gap-3 border-t border-white/15 pt-6">
          <a
            href={tel}
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex h-12 flex-row-reverse items-center gap-2 rounded-xl bg-white px-6 font-bold text-[#163d57] shadow-sm hover:bg-white/95",
            )}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex h-12 flex-row-reverse items-center gap-2 rounded-xl border-white/40 bg-[#25D366] px-6 font-semibold text-white hover:bg-[#20bd5a]",
            )}
          >
            <WhatsAppLogo className="size-5 shrink-0 text-white" />
            واتساب
          </a>
        </div>
      </div>
    </section>
  );
}

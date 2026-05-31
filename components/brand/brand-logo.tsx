import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type BrandLogoProps = {
  variant?: "mark" | "full";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({ variant = "mark", className, priority, sizes }: BrandLogoProps) {
  const logo = variant === "full" ? siteConfig.logo.full : siteConfig.logo.mark;

  if (variant === "mark") {
    return (
      <span
        className={cn("relative inline-block h-10 shrink-0 sm:h-11", className)}
        style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          priority={priority}
          sizes={sizes ?? "120px"}
          quality={90}
          className="object-contain object-center"
        />
      </span>
    );
  }

  return (
    <span
      className={cn("relative inline-block h-32 shrink-0 sm:h-36", className)}
      style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 640px) 126px, 142px"}
        quality={90}
        className="object-contain object-center"
      />
    </span>
  );
}

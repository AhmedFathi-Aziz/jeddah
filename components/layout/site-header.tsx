"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/coverage", label: "الأحياء" },
  { href: "/leak-detection", label: "كشف التسربات" },
  { href: "/smart-leak-diagnosis", label: "مُشخّص ذكي" },
  { href: "/insulation", label: "العزل" },
  { href: "/blog", label: "المدونة" },
  { href: "/news", label: "الأخبار" },
  { href: "/contact", label: "اتصل بنا" },
] as const;

export function SiteHeader({ phone }: { phone: string }) {
  const telHref = `tel:${phone}`;
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el || typeof document === "undefined") return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${el.getBoundingClientRect().height}px`,
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[60] shrink-0 border-b border-border/80 bg-[#f4f5f7] shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-[#f4f5f7]/95"
    >
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 md:min-h-[4.75rem] md:gap-4 md:py-3 lg:gap-8">
        <Link
          href="/"
          aria-label={`الرئيسية — ${siteConfig.name}`}
          className={cn(
            "inline-flex shrink-0 items-center outline-none",
            "no-underline decoration-0 hover:no-underline",
            "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#1f7f8a]/40 focus-visible:ring-offset-2",
          )}
        >
          <BrandLogo variant="full" priority className="h-10 sm:h-12 md:h-14" sizes="(max-width: 768px) 40px, 56px" />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1 md:flex lg:gap-x-4"
          aria-label="التنقل الرئيسي"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-[#1f7f8a] hover:underline lg:text-sm lg:whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={telHref}
            className={cn(
              buttonVariants({ size: "default" }),
              "h-10 rounded-full bg-[#1f7f8a] px-3 text-xs font-semibold text-white hover:bg-[#1a6d76] sm:min-h-11 sm:px-5 sm:py-3 sm:text-sm md:min-h-12 md:px-8 md:py-3.5",
            )}
          >
            <span className="inline-flex flex-row items-center gap-1.5 sm:gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              <span className="sm:hidden">اتصل</span>
              <span className="hidden sm:inline">طلب عرض سعراً</span>
            </span>
          </a>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="md:hidden" aria-label="فتح القائمة" />
              }
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent
              side="left"
              fullBleed
              insetBelowHeader
              showCloseButton
              backdropClassName="z-50 bg-black/30 supports-backdrop-filter:backdrop-blur-[2px]"
              className="z-50 gap-0 border-0 border-e border-border bg-background p-0 shadow-xl"
              dir="rtl"
            >
              <div className="flex min-h-14 items-center border-b border-border/80 bg-background px-4 py-3 ps-14">
                <BrandLogo variant="full" className="h-11" sizes="88px" />
              </div>
              <nav
                className="flex min-h-0 flex-1 flex-col divide-y divide-border/60 overflow-y-auto overscroll-contain px-2 py-1 text-start"
                aria-label="قائمة الجوال"
              >
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="block w-full rounded-lg px-3 py-3.5 text-start text-base font-semibold text-foreground transition-colors hover:bg-muted/70 active:bg-muted"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="shrink-0 border-t border-border bg-muted/25 p-4">
                <SheetClose
                  nativeButton={false}
                  render={
                    <a
                      href={telHref}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f7f8a] px-4 py-3.5 text-center text-base font-bold text-white shadow-sm transition-colors hover:bg-[#1a6d76] active:bg-[#156a72]"
                    />
                  }
                >
                  <Phone className="size-5 shrink-0" aria-hidden />
                  اتصال مباشر: {phone}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

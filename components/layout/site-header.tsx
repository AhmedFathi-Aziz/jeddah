"use client";

import Link from "next/link";
import { Phone, Menu } from "lucide-react";

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
  { href: "/contact", label: "اتصل بنا" },
] as const;

export function SiteHeader({ phone }: { phone: string }) {
  const telHref = `tel:${phone}`;

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border/80 bg-[#f4f5f7] shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-[#f4f5f7]/95">
      {/* صف واحد: اسم الموقع فقط ← روابط ← زر الهاتف */}
      <div className="mx-auto flex w-full max-w-7xl min-h-[4.75rem] flex-row flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 py-3 md:flex-nowrap md:gap-x-6 lg:gap-x-10">
        <Link
          href="/"
          aria-label={`الرئيسية — ${siteConfig.name}`}
          className={cn(
            "inline-flex shrink-0 items-center outline-none",
            "no-underline decoration-0 hover:no-underline",
            "visited:text-[#123a5a]",
            "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#1f7f8a]/40 focus-visible:ring-offset-2",
          )}
        >
          <span className="max-w-[min(100%,18rem)] text-balance text-center text-lg font-extrabold leading-tight text-[#123a5a] md:max-w-none md:text-xl md:leading-snug">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-wrap items-center justify-center gap-x-3 md:flex md:flex-nowrap md:gap-x-5"
          aria-label="التنقل الرئيسي"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-[#1f7f8a] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 flex-row items-center gap-2">
          <a
            href={telHref}
            className={cn(buttonVariants({ size: "default" }), "rounded-lg bg-[#1f7f8a] font-semibold whitespace-nowrap text-white hover:bg-[#1a6d76]")}
          >
            <span className="inline-flex flex-row items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              طلب عرض سعراً
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
            <SheetContent side="bottom" showCloseButton className="max-h-[85vh]" dir="rtl">
              <nav className="flex flex-col gap-2 text-end" aria-label="قائمة الجوال">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-3 text-lg font-semibold hover:bg-muted"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
                <SheetClose
                  render={<a href={telHref} className="block rounded-md px-3 py-3 text-lg font-semibold text-primary hover:bg-muted" />}
                >
                  اتصال: {phone}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter({
  phone,
  phoneDisplay,
}: {
  phone: string;
  phoneDisplay: string;
}) {
  const tel = `tel:${phone}`;

  return (
    <footer id="contact" className="shrink-0 border-t border-border bg-muted/40 [contain:paint]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="text-right space-y-3">
          <p className="text-lg font-bold text-primary">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            خدمات متخصصة لكشف تسربات المياه وعزل الأسطح والخزانات في جدة ومنطقة مكة بالمملكة العربية السعودية.
          </p>
        </div>
        <nav className="text-right" aria-label="خدمات">
          <p className="font-semibold text-primary mb-3">خدماتنا</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/leak-detection" className="hover:text-primary hover:underline">
                كشف تسربات المياه
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary hover:underline">
                عزل أسطح بجدة
              </Link>
            </li>
            <li>
              <Link href="/insulation" className="hover:text-primary hover:underline">
                عزل خزانات
              </Link>
            </li>
            <li>
              <Link href="/smart-leak-diagnosis" className="hover:text-primary hover:underline">
                مُشخّص التسربات الذكي
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="text-right" aria-label="روابط">
          <p className="font-semibold text-primary mb-3">روابط</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary hover:underline">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary hover:underline">
                المدونة
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-primary hover:underline">
                الأسئلة الشائعة
              </Link>
            </li>
            <li>
              <Link href="/#coverage" className="hover:text-primary hover:underline">
                نطاق التغطية
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary hover:underline">
                اتصل بنا
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-right space-y-3">
          <p className="font-semibold text-primary">تواصل</p>
          <address className="not-italic text-sm text-muted-foreground space-y-2">
            <span className="flex flex-row-reverse items-start gap-2 justify-end">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              جدة، منطقة مكة المكرمة، المملكة العربية السعودية
            </span>
            <a href={tel} className="flex flex-row-reverse items-center gap-2 justify-end font-medium text-foreground hover:underline">
              <Phone className="size-4 shrink-0" aria-hidden />
              {phoneDisplay}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name} — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

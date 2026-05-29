import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";

type FloatingWhatsAppButtonProps = {
  phone: string;
};

export function FloatingWhatsAppButton({ phone }: FloatingWhatsAppButtonProps) {
  const whatsappHref = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "مرحباً، أحتاج خدمة كشف تسربات وعزل في جدة.",
  )}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fab-bottom fab-end fixed z-50 inline-flex h-11 max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-[#25D366] px-3.5 text-xs font-bold text-white shadow-lg transition hover:brightness-95 sm:h-12 sm:px-5 sm:text-sm"
    >
      <WhatsAppLogo className="size-5 shrink-0 text-white" />
      واتساب
    </a>
  );
}

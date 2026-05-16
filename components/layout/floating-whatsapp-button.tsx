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
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-lg transition hover:brightness-95"
    >
      <WhatsAppLogo className="size-5 shrink-0 text-white" />
      واتساب
    </a>
  );
}

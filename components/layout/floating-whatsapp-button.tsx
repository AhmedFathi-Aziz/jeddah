import { MessageCircle } from "lucide-react";

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
      <MessageCircle className="size-4" aria-hidden />
      واتساب
    </a>
  );
}

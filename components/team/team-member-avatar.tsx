import { BrandLogo } from "@/components/brand/brand-logo";
import { cn } from "@/lib/utils";

type TeamMemberAvatarProps = {
  className?: string;
  /** حجم أصغر للقوائم والبطاقات المختصرة */
  compact?: boolean;
};

/** الشعار الرسمي للموقع (نفس ‎brand-logo.png‎ في الهيدر) */
export function TeamMemberAvatar({ className, compact }: TeamMemberAvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-white p-1.5",
        compact && "rounded-lg p-1",
        className,
      )}
    >
      <BrandLogo
        variant="full"
        className={compact ? "h-8 w-auto sm:h-9" : "h-14 w-auto sm:h-16"}
        sizes={compact ? "48px" : "80px"}
      />
    </span>
  );
}

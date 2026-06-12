import Link from "next/link";

import type { ArticleAuthor } from "@/lib/articles/article-authors";
import { TeamMemberAvatar } from "@/components/team/team-member-avatar";
import { cn } from "@/lib/utils";

type Props = {
  author: ArticleAuthor;
  className?: string;
  compact?: boolean;
  /** عدد المشاركين الإضافيين (مراجع/محرر) للعرض المختصر */
  teamSize?: number;
  /** عطّل الرابط عند وضع المؤلف داخل ‎Link‎ آخر (مثل بطاقة مقال) */
  linkToProfile?: boolean;
};

export function ArticleAuthorByline({
  author,
  className,
  compact,
  teamSize = 0,
  linkToProfile = true,
}: Props) {
  const nameEl =
    linkToProfile && author.profileHref ? (
      <Link href={author.profileHref} className="font-semibold text-[#163d57] hover:text-[#1f7f8a] hover:underline">
        {author.name}
      </Link>
    ) : (
      <span className="font-semibold text-[#163d57]">{author.name}</span>
    );

  const teamHint = teamSize > 0 ? <span className="text-[#1f7f8a]"> · +{teamSize}</span> : null;

  if (compact) {
    return (
      <p className={cn("inline-flex flex-row-reverse items-center gap-1.5 text-xs text-muted-foreground", className)}>
        <TeamMemberAvatar compact />
        <span>
          {nameEl}
          {teamHint}
        </span>
      </p>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-row-reverse items-start gap-3 rounded-xl bg-[#f7f9fa] px-4 py-3 text-right",
        className,
      )}
    >
      <TeamMemberAvatar compact />
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5a7588]">المؤلف</p>
        <p className="mt-0.5 text-sm leading-6">
          {nameEl}
          {teamHint}
          <span className="text-muted-foreground"> — {author.role}</span>
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, PenLine, ShieldCheck, Sparkles } from "lucide-react";

import {
  ARTICLE_AUTHOR_KIND_LABELS,
  type ArticleAuthorKind,
  type ArticleContributor,
} from "@/lib/articles/article-authors";
import { TeamMemberAvatar } from "@/components/team/team-member-avatar";
import { TEAM_PAGE_PATH } from "@/lib/seo/team-page-data";
import { cn } from "@/lib/utils";

const sectionSurface =
  "border-0 shadow-[0_16px_40px_-24px_rgba(19,66,89,0.32)]";

const kindStyles: Record<
  ArticleAuthorKind,
  { badge: string; icon: typeof PenLine }
> = {
  writer: {
    badge: "bg-[#ecf8f8] text-[#1f7f8a]",
    icon: PenLine,
  },
  reviewer: {
    badge: "bg-[#eef4f8] text-[#163d57]",
    icon: ShieldCheck,
  },
  editor: {
    badge: "bg-[#f4f6f8] text-[#5a7588]",
    icon: Sparkles,
  },
};

type Props = {
  contributors: ArticleContributor[];
  className?: string;
};

function ContributorCard({ person, linkToProfile = true }: { person: ArticleContributor; linkToProfile?: boolean }) {
  const style = kindStyles[person.kind];
  const Icon = style.icon;

  const nameEl =
    linkToProfile && person.profileHref ? (
      <Link
        href={person.profileHref}
        className="font-extrabold text-[#163d57] transition-colors hover:text-[#1f7f8a] hover:underline"
      >
        {person.name}
      </Link>
    ) : (
      <span className="font-extrabold text-[#163d57]">{person.name}</span>
    );

  return (
    <article
      className={cn(
        "flex flex-row-reverse items-start gap-3 rounded-xl bg-white/80 p-4 text-right",
        "shadow-[0_8px_24px_-18px_rgba(19,66,89,0.22)] transition-shadow hover:shadow-[0_12px_28px_-16px_rgba(19,66,89,0.28)]",
      )}
    >
      <TeamMemberAvatar
        compact
        className="shadow-[0_6px_16px_-12px_rgba(19,66,89,0.35)]"
      />
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "inline-flex flex-row-reverse items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
            style.badge,
          )}
        >
          <Icon className="size-3 shrink-0" aria-hidden />
          {ARTICLE_AUTHOR_KIND_LABELS[person.kind]}
        </span>
        <p className="mt-2 text-base leading-snug">{nameEl}</p>
        <p className="mt-1 text-sm leading-6 text-[#5a7588]">{person.role}</p>
      </div>
    </article>
  );
}

export function ArticleContributorsSection({ contributors, className }: Props) {
  if (contributors.length === 0) return null;

  const writers = contributors.filter((c) => c.kind === "writer");
  const others = contributors.filter((c) => c.kind !== "writer");

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl bg-gradient-to-l from-[#eef8f9] via-[#f8fbfc] to-white p-4 sm:p-5",
        sectionSurface,
        className,
      )}
      aria-labelledby="article-contributors-heading"
    >
      <header className="mb-4 flex flex-row-reverse flex-wrap items-start justify-between gap-3 border-b border-[#dce8ec]/80 pb-4">
        <div className="text-right">
          <h2 id="article-contributors-heading" className="text-lg font-extrabold text-[#163d57] sm:text-xl">
            فريق إعداد المقال
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#5a7588]">
            {writers.length > 1
              ? "عدة متخصصين شاركوا في كتابة ومراجعة هذا المحتوى"
              : "متخصصون من فريق جدة كتب ومراجعوا هذا المحتوى"}
          </p>
        </div>
        <Link
          href={TEAM_PAGE_PATH}
          className="inline-flex shrink-0 flex-row-reverse items-center gap-1 text-xs font-semibold text-[#1f7f8a] hover:text-[#163d57] hover:underline sm:text-sm"
        >
          الفريق الكامل
          <ArrowLeft className="size-3.5" aria-hidden />
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {contributors.map((person) => (
          <ContributorCard key={`${person.kind}-${person.name}`} person={person} />
        ))}
      </div>

      {others.length > 0 ? (
        <p className="mt-4 text-center text-xs leading-6 text-[#5a7588] sm:text-sm">
          يُراجع المحتوى فنياً قبل النشر لضمان دقة المعلومات في سياق خدمات جدة.
        </p>
      ) : null}
    </section>
  );
}

import { Clock, CheckCircle2 } from "lucide-react";

import { TeamMemberAvatar } from "@/components/team/team-member-avatar";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/seo/team-page-data";

const cardSurface =
  "border-0 shadow-[0_12px_32px_-20px_rgba(19,66,89,0.28)] transition-shadow hover:shadow-[0_16px_40px_-18px_rgba(19,66,89,0.32)]";

export function TeamMemberCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 text-right",
        cardSurface,
        className,
      )}
    >
      <div className="flex flex-row-reverse items-start gap-4">
        <TeamMemberAvatar />
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-extrabold text-[#163d57]">{member.name}</h2>
          <p className="mt-1 text-sm font-semibold text-[#1f7f8a]">{member.role}</p>
          <p className="mt-2 inline-flex flex-row-reverse items-center gap-1.5 text-xs font-medium text-[#5a7588]">
            <Clock className="size-3.5 shrink-0 text-[#1f7f8a]" aria-hidden />
            خبرة {member.experienceYears} سنوات
          </p>
        </div>
      </div>

      <p className="mt-5 leading-8 text-[#4a6677]">{member.bio}</p>

      <ul className="mt-4 space-y-2 border-t border-[#eef4f6] pt-4">
        {member.highlights.map((item) => (
          <li
            key={item}
            className="flex flex-row-reverse items-start gap-2 text-sm leading-7 text-[#4a6677]"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#1f7f8a]" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

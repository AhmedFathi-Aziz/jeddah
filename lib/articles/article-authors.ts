import { TEAM_MEMBERS } from "@/lib/seo/team-page-data";
import { absUrl } from "@/lib/site-config";
import { SCHEMA_ORGANIZATION_ID } from "@/lib/seo/schema-ids";

export type ArticleAuthorKind = "writer" | "reviewer" | "editor";

export const ARTICLE_AUTHOR_KIND_LABELS: Record<ArticleAuthorKind, string> = {
  writer: "كاتب المحتوى",
  reviewer: "مراجع فني",
  editor: "محرر",
};

/** للعرض المختصر في البطاقات — الكاتب الرئيسي */
export type ArticleAuthor = {
  name: string;
  role: string;
  profileHref?: string;
};

export type ArticleContributor = ArticleAuthor & {
  kind: ArticleAuthorKind;
  initials: string;
};

export type ArticleContributorInput = {
  name?: string;
  role?: string;
  profileHref?: string;
  kind?: ArticleAuthorKind;
};

const TEAM_PROFILE = "/team" as const;

const DEFAULT_EDITOR: Omit<ArticleContributor, "kind"> = {
  name: "أحمد فتحي",
  role: "مدير التقنية والذكاء الاصطناعي",
  profileHref: TEAM_PROFILE,
  initials: "أ ف",
};

type ContributorTemplate = Omit<ArticleContributor, "kind" | "initials"> & { initials?: string };

function withKind(kind: ArticleAuthorKind, t: ContributorTemplate): ArticleContributor {
  return {
    kind,
    name: t.name,
    role: t.role,
    profileHref: t.profileHref ?? TEAM_PROFILE,
    initials: t.initials ?? initialsForName(t.name),
  };
}

function initialsForName(name: string): string {
  const member = TEAM_MEMBERS.find((m) => m.name === name);
  if (member) return member.initials;
  const parts = name.replace(/^[مأ]\.\s*/, "").trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0]!} ${parts[1]![0]!}`;
  return parts[0]?.[0] ?? "؟";
}

/** تعيين تلقائي حسب تصنيف المقال */
function contributorsFromCategory(category: string): ArticleContributor[] {
  const c = category.trim();

  if (/تسرب|كشف|فاتورة/i.test(c)) {
    return [
      withKind("writer", { name: "م. محمد أحمد", role: "متخصص كشف تسربات المياه" }),
      withKind("reviewer", { name: "م. عبدالله الحربي", role: "فني كشف إلكتروني" }),
      withKind("editor", DEFAULT_EDITOR),
    ];
  }

  if (/خزان/i.test(c)) {
    return [
      withKind("writer", { name: "م. فهد محمد الزهراني", role: "متخصص عزل خزانات" }),
      withKind("reviewer", { name: "م. محمد أحمد", role: "متخصص كشف تسربات المياه" }),
      withKind("editor", { name: "أ. سعد عبدالرحمن الغامدي", role: "مشرف مواقع" }),
    ];
  }

  if (/عزل|أسطح|فوم|حراري|مائي/i.test(c)) {
    return [
      withKind("writer", { name: "م. خالد سالم العمري", role: "مهندس عزل أسطح" }),
      withKind("reviewer", { name: "أ. سعد عبدالرحمن الغامدي", role: "مشرف مواقع" }),
      withKind("editor", DEFAULT_EDITOR),
    ];
  }

  return [
    withKind("writer", DEFAULT_EDITOR),
    withKind("reviewer", { name: "م. محمد أحمد", role: "متخصص كشف تسربات المياه" }),
    withKind("editor", { name: "أ. نورة القحطاني", role: "منسقة فنية ودعم" }),
  ];
}

function parseKind(value: unknown): ArticleAuthorKind | undefined {
  if (value === "writer" || value === "reviewer" || value === "editor") return value;
  if (typeof value !== "string") return undefined;
  const v = value.trim().toLowerCase();
  if (v === "writer" || v === "كاتب" || v === "author") return "writer";
  if (v === "reviewer" || v === "مراجع" || v === "review") return "reviewer";
  if (v === "editor" || v === "محرر" || v === "edit") return "editor";
  return undefined;
}

function parseContributorEntry(raw: unknown): ArticleContributorInput | null {
  if (typeof raw === "string" && raw.trim()) {
    return { name: raw.trim(), kind: "writer" };
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  if (!name) return null;
  return {
    name,
    role: typeof o.role === "string" ? o.role.trim() : undefined,
    profileHref: typeof o.profileHref === "string" ? o.profileHref.trim() : undefined,
    kind: parseKind(o.kind ?? o.type),
  };
}

export function parseContributorsFromFrontmatter(
  data: Record<string, unknown>,
): ArticleContributorInput[] | undefined {
  const rawAuthors = data.authors;
  if (Array.isArray(rawAuthors) && rawAuthors.length > 0) {
    const parsed = rawAuthors.map(parseContributorEntry).filter((x): x is ArticleContributorInput => x !== null);
    if (parsed.length > 0) return parsed;
  }

  const rawAuthor = data.author;
  if (typeof rawAuthor === "string" && rawAuthor.trim()) {
    return [{ name: rawAuthor.trim(), kind: "writer" }];
  }
  if (rawAuthor && typeof rawAuthor === "object" && !Array.isArray(rawAuthor)) {
    const entry = parseContributorEntry(rawAuthor);
    if (entry) return [{ ...entry, kind: entry.kind ?? "writer" }];
  }

  const name = typeof data.authorName === "string" ? data.authorName.trim() : "";
  if (name) {
    return [
      {
        name,
        role: typeof data.authorRole === "string" ? data.authorRole.trim() : undefined,
        profileHref: typeof data.authorProfileHref === "string" ? data.authorProfileHref.trim() : undefined,
        kind: "writer",
      },
    ];
  }

  return undefined;
}

/** @deprecated استخدم parseContributorsFromFrontmatter */
export function parseAuthorFromFrontmatter(data: Record<string, unknown>): ArticleContributorInput | undefined {
  return parseContributorsFromFrontmatter(data)?.[0];
}

function fallbackForKind(kind: ArticleAuthorKind, category: string): ArticleContributor {
  return contributorsFromCategory(category).find((c) => c.kind === kind)!;
}

function resolveContributor(input: ArticleContributorInput, category: string): ArticleContributor {
  const kind = input.kind ?? "writer";
  const fallback = fallbackForKind(kind, category);
  const name = input.name?.trim() || fallback.name;
  return {
    kind,
    name,
    role: input.role?.trim() || fallback.role,
    profileHref: input.profileHref?.trim() || fallback.profileHref || TEAM_PROFILE,
    initials: initialsForName(name),
  };
}

const KIND_ORDER: Record<ArticleAuthorKind, number> = { writer: 0, reviewer: 1, editor: 2 };

export function resolveArticleContributors(
  input: ArticleContributorInput[] | undefined,
  category: string,
): ArticleContributor[] {
  if (!input?.length) return contributorsFromCategory(category);

  const resolved = input.map((entry) => resolveContributor(entry, category));
  const seen = new Set<string>();
  const unique = resolved.filter((c) => {
    const key = `${c.kind}:${c.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}

export function primaryAuthorFromContributors(contributors: ArticleContributor[]): ArticleAuthor {
  const writer = contributors.find((c) => c.kind === "writer");
  const first = writer ?? contributors[0]!;
  return {
    name: first.name,
    role: first.role,
    profileHref: first.profileHref,
  };
}

/** @deprecated */
export function authorFromCategory(category: string): ArticleAuthor {
  return primaryAuthorFromContributors(contributorsFromCategory(category));
}

/** @deprecated */
export function resolveArticleAuthor(
  input: ArticleContributorInput | undefined,
  category: string,
): ArticleAuthor {
  return primaryAuthorFromContributors(resolveArticleContributors(input ? [input] : undefined, category));
}

export function articleAuthorToJsonLd(author: ArticleAuthor) {
  return {
    "@type": "Person" as const,
    name: author.name,
    jobTitle: author.role,
    ...(author.profileHref ? { url: absUrl(author.profileHref) } : {}),
    worksFor: { "@id": SCHEMA_ORGANIZATION_ID },
  };
}

export function articleContributorsToJsonLd(contributors: ArticleContributor[]) {
  const writers = contributors.filter((c) => c.kind === "writer");
  const reviewers = contributors.filter((c) => c.kind === "reviewer");
  return {
    author: writers.length === 1 ? articleAuthorToJsonLd(writers[0]!) : writers.map(articleAuthorToJsonLd),
    ...(reviewers.length > 0
      ? {
          reviewedBy:
            reviewers.length === 1 ? articleAuthorToJsonLd(reviewers[0]!) : reviewers.map(articleAuthorToJsonLd),
        }
      : {}),
  };
}

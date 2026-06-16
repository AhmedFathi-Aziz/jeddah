import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type {
  DistrictExtendedSections,
  DistrictProcessStep,
  DistrictPropertyTypeBlock,
} from "@/lib/seo/coverage-district-types";

export type DistrictMarkdownBundle = {
  slug: string;
  district?: string;
  h1?: string;
  seoTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  coverAlt?: string;
  keywords?: string[];
  imageAlts?: string[];
  internalLinks?: { href: string; label: string }[];
  faq?: { question: string; answer: string }[];
  extended: DistrictExtendedSections;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "coverage");

function normalizeInlineText(text: string): string {
  return text.replace(/\n/g, " ").trim();
}

function parseParagraphs(block: string): string[] {
  return block
    .split(/\n{2,}/)
    .map((p) => normalizeInlineText(p))
    .filter(Boolean);
}

function parsePropertyTypes(block: string): DistrictPropertyTypeBlock[] {
  const items: DistrictPropertyTypeBlock[] = [];
  const normalized = block.trim().replace(/^###\s*/, "");
  const chunks = normalized.split(/\n### /).filter(Boolean);
  for (const chunk of chunks) {
    const [titleLine, ...rest] = chunk.split("\n");
    const title = titleLine.trim();
    const body = normalizeInlineText(rest.join("\n"));
    if (title && body) items.push({ title, body });
  }
  return items;
}

function parseProcessSteps(block: string): DistrictProcessStep[] {
  const items: DistrictProcessStep[] = [];
  const normalized = block.trim().replace(/^###\s*/, "");
  const chunks = normalized.split(/\n### /).filter(Boolean);
  for (const chunk of chunks) {
    const [titleLine, ...rest] = chunk.split("\n");
    const title = titleLine.trim();
    const body = normalizeInlineText(rest.join("\n"));
    if (title && body) items.push({ title, body });
  }
  return items;
}

function parseSections(body: string): Partial<DistrictExtendedSections> {
  const sections: Partial<DistrictExtendedSections> = {};
  const parts = body.split(/^## /m).filter(Boolean);

  for (const part of parts) {
    const newline = part.indexOf("\n");
    if (newline === -1) continue;
    const heading = part.slice(0, newline).trim();
    const content = part.slice(newline + 1).trim();

    switch (heading) {
      case "مقدمة":
        sections.introduction = parseParagraphs(content);
        break;
      case "عن الحي":
        sections.aboutDistrict = parseParagraphs(content);
        break;
      case "أنواع العقارات":
        sections.propertyTypes = parsePropertyTypes(content);
        break;
      case "المشكلات الشائعة":
        sections.commonProblems = parseParagraphs(content);
        break;
      case "كيف نقدم الخدمة":
        sections.howWeServe = parseProcessSteps(content);
        break;
      case "فوائد لسكان الحي":
        sections.benefits = parseParagraphs(content);
        break;
      case "لماذا يثق بنا السكان":
        sections.trustPoints = parseParagraphs(content);
        break;
      case "خاتمة":
        sections.conclusion = parseParagraphs(content);
        break;
      default:
        break;
    }
  }

  return sections;
}

const cache = new Map<string, DistrictMarkdownBundle | null>();

export function getDistrictMarkdownBundle(
  citySlug: string,
  districtSlug: string,
): DistrictMarkdownBundle | null {
  const filePath = path.join(CONTENT_ROOT, citySlug, `${districtSlug}.md`);
  if (!fs.existsSync(filePath)) {
    cache.set(`${citySlug}/${districtSlug}`, null);
    return null;
  }

  const mtime = fs.statSync(filePath).mtimeMs;
  const key = `${citySlug}/${districtSlug}:${mtime}`;
  const stalePrefix = `${citySlug}/${districtSlug}:`;
  for (const cachedKey of cache.keys()) {
    if (cachedKey.startsWith(stalePrefix) && cachedKey !== key) cache.delete(cachedKey);
  }
  if (cache.has(key)) return cache.get(key) ?? null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const parsed = parseSections(content);

  const extended: DistrictExtendedSections = {
    introduction: parsed.introduction ?? [],
    aboutDistrict: parsed.aboutDistrict ?? [],
    propertyTypes: parsed.propertyTypes ?? [],
    commonProblems: parsed.commonProblems ?? [],
    howWeServe: parsed.howWeServe ?? [],
    benefits: parsed.benefits ?? [],
    trustPoints: parsed.trustPoints ?? [],
    conclusion: parsed.conclusion ?? [],
  };

  const bundle: DistrictMarkdownBundle = {
    slug: districtSlug,
    district: typeof data.district === "string" ? data.district : undefined,
    h1: typeof data.h1 === "string" ? data.h1 : undefined,
    seoTitle: typeof data.seoTitle === "string" ? data.seoTitle : undefined,
    metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : undefined,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : undefined,
    keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
    imageAlts: Array.isArray(data.imageAlts) ? data.imageAlts : undefined,
    internalLinks: Array.isArray(data.internalLinks) ? data.internalLinks : undefined,
    faq: Array.isArray(data.faq) ? data.faq : undefined,
    extended,
  };

  cache.set(key, bundle);
  return bundle;
}
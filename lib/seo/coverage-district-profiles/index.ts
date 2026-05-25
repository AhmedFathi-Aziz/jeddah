import { PROFILES_PART_A } from "@/lib/seo/coverage-district-profiles/part-a";
import { PROFILES_PART_B } from "@/lib/seo/coverage-district-profiles/part-b";
import type { CoverageDistrictProfile } from "@/lib/seo/coverage-district-types";

const ALL_PROFILES: CoverageDistrictProfile[] = [...PROFILES_PART_A, ...PROFILES_PART_B];

export const COVERAGE_DISTRICT_PROFILES: Record<string, CoverageDistrictProfile> =
  Object.fromEntries(ALL_PROFILES.map((p) => [p.slug, p]));

export function getDistrictProfile(slug: string): CoverageDistrictProfile | undefined {
  return COVERAGE_DISTRICT_PROFILES[slug];
}

export function listDistrictProfileSlugs(): string[] {
  return ALL_PROFILES.map((p) => p.slug);
}

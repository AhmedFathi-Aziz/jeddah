import coverageRaw from "@/data/coverage-locations.json";

export type CoverageDistrictJson = {
  slug: string;
  district: string;
  label: string;
};

export type CoverageCityJson = {
  slug: string;
  nameAr: string;
  districts: CoverageDistrictJson[];
};

/** صف واحد لقائمة الأحياء (واجهة + روابط داخلية). */
export type JeddahDistrict = {
  id: string;
  district: string;
  label: string;
  href: string;
};

type CoverageFile = { cities: CoverageCityJson[] };

const coverageData = coverageRaw as CoverageFile;

export function listCities(): CoverageCityJson[] {
  return coverageData.cities;
}

export function getCity(citySlug: string): CoverageCityJson | undefined {
  return coverageData.cities.find((c) => c.slug === citySlug);
}

export type ResolvedCoverageDistrict = CoverageDistrictJson & {
  city: CoverageCityJson;
};

export function getDistrictByCityAndSlug(
  citySlug: string,
  districtSlug: string,
): ResolvedCoverageDistrict | undefined {
  const city = getCity(citySlug);
  if (!city) return undefined;
  const d = city.districts.find((x) => x.slug === districtSlug);
  if (!d) return undefined;
  return { ...d, city };
}

/** مسارات ثابتة لـ generateStaticParams */
export function getAllCoverageCityDistrictParams(): { city: string; district: string }[] {
  return coverageData.cities.flatMap((city) =>
    city.districts.map((d) => ({ city: city.slug, district: d.slug })),
  );
}

/**
 * قائمة أحياء جدة للواجهات (روابط Programmatic SEO: /coverage/jeddah/[district]).
 * يُبنى من JSON لسهولة التوسع دون تعديل كود الصفحات.
 */
export const jeddahDistricts: JeddahDistrict[] = (() => {
  const jeddah = getCity("jeddah");
  if (!jeddah) return [];
  return jeddah.districts.map((d) => ({
    id: d.slug,
    district: d.district,
    label: d.label,
    href: `/coverage/jeddah/${d.slug}`,
  }));
})();

export function getDistrictById(id: string): JeddahDistrict | undefined {
  return jeddahDistricts.find((d) => d.id === id);
}

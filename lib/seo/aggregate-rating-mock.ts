/**
 * بيانات تقييم مؤقتة لـ AggregateRating في JSON-LD.
 * استبدلها بقيم حقيقية من مراجعات موثقة قبل الاعتماد التسويقي الكامل — جوجل يتحقق من التطابق مع المراجع الظاهرة على الموقع.
 */
export const SCHEMA_MOCK_AGGREGATE_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: 4.8,
  bestRating: 5,
  worstRating: 1,
  reviewCount: 127,
};

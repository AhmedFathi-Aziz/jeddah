/** تاريخ ثابت بين السيرفر والمتصفح (تفادي hydration مع ar-SA). */
export function formatNewsDate(iso: string): string {
  try {
    return new Date(`${iso}T12:00:00Z`).toLocaleDateString("ar-SA", {
      dateStyle: "long",
      timeZone: "UTC",
      numberingSystem: "latn",
    });
  } catch {
    return iso;
  }
}

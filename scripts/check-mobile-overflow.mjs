/**
 * يكتشف العناصر التي تتجاوز عرض الشاشة (سكرول أفقي).
 * الاستخدام: node scripts/check-mobile-overflow.mjs [url]
 */
import { chromium, devices } from "playwright";

const urls = [
  process.argv[2] ??
    "http://127.0.0.1:3002/blog/%D9%83%D8%B4%D9%81-%D8%AA%D8%B3%D8%B1%D8%A8%D8%A7%D8%AA-%D8%A8%D8%AC%D8%AF%D8%A9-%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B4%D8%A7%D9%85%D9%84",
];

const viewports = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 13", width: 390, height: 844 },
  { name: "iPhone 14 Pro Max", width: 430, height: 932 },
  { name: "Galaxy S8", width: 360, height: 740 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: vp, userAgent: devices["iPhone 13"].userAgent });
  try {
    await page.goto(urls[0], { waitUntil: "networkidle", timeout: 60_000 });
  } catch (e) {
    console.error(vp.name, "load failed", e.message);
    continue;
  }

  // فتح القائمة
  const menuOpen = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="فتح القائمة"]');
    if (!btn) return false;
    btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return true;
  });
  await page.waitForTimeout(400);

  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      const overRight = rect.right - vw;
      const overLeft = -rect.left;
      if (overRight > 1 || overLeft > 1) {
        const style = getComputedStyle(el);
        offenders.push({
          tag: el.tagName.toLowerCase(),
          className: (el.className?.toString?.() ?? "").slice(0, 100),
          overRight: Math.round(overRight),
          overLeft: Math.round(overLeft),
          width: Math.round(rect.width),
          position: style.position,
        });
      }
    }
    const innerScrollers = [];
    for (const el of document.querySelectorAll("body *")) {
      if (el.scrollWidth > el.clientWidth + 2) {
        innerScrollers.push({
          tag: el.tagName.toLowerCase(),
          className: (el.className?.toString?.() ?? "").slice(0, 80),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          overflowX: getComputedStyle(el).overflowX,
        });
      }
    }
    return {
      htmlScroll: document.documentElement.scrollWidth,
      bodyScroll: document.body.scrollWidth,
      hasHorizontalScroll:
        document.documentElement.scrollWidth > vw + 1 || document.body.scrollWidth > vw + 1,
      innerScrollers: innerScrollers.slice(0, 10),
      offenders: offenders.sort((a, b) => b.overRight - a.overRight).slice(0, 8),
    };
  });

  console.log("\n===", vp.name, vp.width, "menu:", menuOpen, "===");
  console.log(JSON.stringify(report, null, 2));
}

await browser.close();

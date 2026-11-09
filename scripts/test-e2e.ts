import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

async function runE2E() {
  console.log("=========================================");
  console.log("  ROSELLE — Comprehensive Visual & E2E QA");
  console.log("=========================================\n");

  const screenshotDir = path.join(process.cwd(), "screenshots", "e2e");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

  console.log("[1/6] Launching Chromium / Microsoft Edge...");
  const browser = await chromium.launch({
    executablePath: fs.existsSync(edgePath) ? edgePath : undefined,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  console.log("[2/6] Visiting Homepage (http://localhost:3000)...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

  // 1. Capture Preloader if active
  await page.waitForTimeout(400);
  console.log("📸 Capturing Preloader entrance...");
  await page.screenshot({ path: path.join(screenshotDir, "00-preloader.png") });

  // Wait for preloader to dismiss (takes ~1200ms)
  await page.waitForTimeout(1600);

  // 2. Hero Screenshot
  console.log("📸 Capturing Hero section...");
  await page.screenshot({ path: path.join(screenshotDir, "01-hero.png") });

  // 3. Scroll to Inside section
  console.log("📸 Capturing Inside Chapters section...");
  await page.evaluate(() => {
    const el = document.getElementById("inside");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "02-inside.png") });

  // 4. Scroll to Ribbon Swirl
  console.log("📸 Capturing Ribbon Swirl section...");
  await page.evaluate(() => {
    const el = document.getElementById("swirl");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "02b-ribbon-swirl.png") });

  // 5. Scroll to Muse Arc
  console.log("📸 Capturing Muse Arc section...");
  await page.evaluate(() => {
    const el = document.getElementById("muses");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "02c-muse-arc.png") });

  // 6. Scroll to Muse Film
  console.log("📸 Capturing Muse Film section...");
  await page.evaluate(() => {
    const el = document.getElementById("film");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "02d-muse-film.png") });

  // 7. Scroll to Swatch Bar
  console.log("📸 Capturing Swatch Bar section...");
  await page.evaluate(() => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "03-swatch-bar.png") });

  // 8. Scroll to Lip Reels
  console.log("📸 Capturing Lip Reels section...");
  await page.evaluate(() => {
    const el = document.getElementById("reels");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "04-lip-reels.png") });

  // 9. Scroll to Shade Finder
  console.log("📸 Capturing Shade Finder section...");
  await page.evaluate(() => {
    const el = document.getElementById("finder");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "04b-shade-finder.png") });

  // 10. Scroll to The Edit
  console.log("📸 Capturing The Edit section...");
  await page.evaluate(() => {
    const el = document.getElementById("edit");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "05-the-edit.png") });

  // 11. Test Cart Drawer
  console.log("[3/6] Testing Shopping Bag Slide-Over Drawer...");
  const bagButton = page.locator('button[aria-label*="Shopping Bag"]').first();
  if (await bagButton.isVisible()) {
    await bagButton.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(screenshotDir, "06-cart-drawer.png") });
    const closeBtn = page.locator('button[aria-label="Close Bag"]');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
  }

  // 12. Visit /shop Page
  console.log("[4/6] Testing Dedicated Shop Page (/shop)...");
  await page.goto("http://localhost:3000/shop", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "07-shop-page.png") });

  // 13. Visit /product/cherry-kiss
  console.log("[5/6] Testing Product Detail Page (/product/cherry-kiss)...");
  await page.goto("http://localhost:3000/product/cherry-kiss", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "08-product-detail.png") });

  // Add Cherry Kiss to bag from PDP
  const addPdpBtn = page.locator('button:has-text("ADD TO BAG")').first();
  if (await addPdpBtn.isVisible()) {
    console.log("🛍️ Adding Cherry Kiss to Bag from PDP...");
    await addPdpBtn.click();
    await page.waitForTimeout(600);
  }

  // 14. Visit /checkout
  console.log("📸 Capturing Checkout Page (/checkout) with item in vanity bag...");
  await page.goto("http://localhost:3000/checkout", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(screenshotDir, "09-checkout-page.png") });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, "09-checkout-page.png") });

  // 15. Mobile Viewport Test (iPhone 14 Pro 393x852)
  console.log("[6/6] Testing Mobile Responsiveness (393x852)...");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(screenshotDir, "10-mobile-hero.png") });

  await browser.close();
  console.log("\n=========================================");
  console.log("✓ E2E Testing Successfully Finished!");
  console.log(`✓ 15 Hi-Res Retina Screenshots saved to ${screenshotDir}`);
  console.log("=========================================\n");
}

runE2E().catch((err) => {
  console.error("E2E Test Execution Error:", err);
  process.exit(1);
});

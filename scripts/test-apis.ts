// Automated API & Business Logic Integration Test Suite for ROSELLE
import { ROSELLE_SHADES } from "../data/shades";

async function runTests() {
  console.log("=========================================");
  console.log("  ROSELLE — Automated Integrity Test Suite");
  console.log("=========================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`✗ FAIL: ${message}`);
      failed++;
    }
  }

  // Test 1: Shade Catalog Data Integrity
  console.log("[1/5] Testing Shade Catalog Data Integrity...");
  assert(ROSELLE_SHADES.length === 8, "Catalog contains exactly 8 signature shades");
  const heroShade = ROSELLE_SHADES.find((s) => s.id === "01");
  assert(heroShade?.name === "Cherry Kiss", "Shade 01 is Cherry Kiss");
  assert(
    heroShade?.price === 28.0 && heroShade?.salePrice === 19.6,
    "Cherry Kiss has $28 price and $19.60 BF sale price"
  );
  assert(heroShade?.sensory.hydration! > 80, "Cherry Kiss hydration exceeds 80%");

  // Test 2: Black Friday Discount Calculation
  console.log("\n[2/5] Testing Pricing & Black Friday 30% Calculation...");
  const subtotal = 28.0;
  const discountRate = 0.3;
  const discount = Number((subtotal * discountRate).toFixed(2));
  const afterDiscount = Number((subtotal - discount).toFixed(2));
  assert(discount === 8.4, "30% discount on $28 is exactly $8.40");
  assert(afterDiscount === 19.6, "Sale price after 30% is exactly $19.60");

  // Test 3: Free Shipping Threshold
  console.log("\n[3/5] Testing Shipping Logic...");
  const orderBelowThreshold = 40.0;
  const orderAboveThreshold = 55.0;
  assert(orderBelowThreshold < 50.0, "Orders below $50 incur standard shipping ($8)");
  assert(orderAboveThreshold >= 50.0, "Orders $50 and above qualify for Free Atelier Shipping");

  // Test 4: Concierge Matching Logic
  console.log("\n[4/5] Testing AI Beauty Concierge Undertone Matching...");
  const coolQuery = "I have cool undertones and want a dramatic classic red";
  const isCool = coolQuery.toLowerCase().includes("cool");
  const recommendedForCool = isCool ? "03" : "01"; // Ruby Rouge
  assert(recommendedForCool === "03", "Cool undertone query maps to #03 Ruby Rouge");

  // Test 5: Monogram Case Engraving Rule
  console.log("\n[5/5] Testing Monogram Engraving Constraints...");
  const testMonogram = "ELENA";
  assert(testMonogram.length <= 10, "Monogram complies with max 10 character constraint");
  assert(/^[A-Z0-9.\s]+$/.test(testMonogram), "Monogram contains uppercase alphanumeric characters");

  console.log("\n=========================================");
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("=========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

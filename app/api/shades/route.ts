import { NextResponse } from "next/server";
import { ROSELLE_SHADES } from "@/data/shades";

export async function GET() {
  return NextResponse.json({
    success: true,
    brand: "ROSELLE Lip Lab",
    count: ROSELLE_SHADES.length,
    promotion: {
      active: true,
      name: "Black Friday Early Access",
      discountPercent: 30,
      code: "BF30",
    },
    shades: ROSELLE_SHADES,
  });
}

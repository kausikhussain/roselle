import { NextResponse } from "next/server";
import { ROSELLE_SHADES } from "@/data/shades";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query: string = (body.query || "").trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Query text cannot be empty." },
        { status: 400 }
      );
    }

    let reply = "";
    let recommendedShadeId = "01";

    if (query.includes("cool") || query.includes("blue") || query.includes("fair")) {
      reply =
        "For cool and fair complexions, #03 Ruby Rouge (an iconic Old Hollywood blue-red) and #01 Cherry Kiss provide stark, luminous contrast that makes teeth appear whiter and brightens skin instantly.";
      recommendedShadeId = "03";
    } else if (query.includes("warm") || query.includes("tan") || query.includes("olive") || query.includes("coral")) {
      reply =
        "Warm and olive complexions radiate with #07 Coral Crush and #04 Rose Petal. The warm terracotta and damask rose undertones enhance natural golden highlights.";
      recommendedShadeId = "07";
    } else if (query.includes("dark") || query.includes("deep") || query.includes("noir") || query.includes("berry")) {
      reply =
        "For deep, rich skin tones, #08 Berry Noir and #06 Mauve Velvet offer unmatched opaque luxury with dramatic, sculptured depth that stays plush all night.";
      recommendedShadeId = "08";
    } else if (query.includes("everyday") || query.includes("nude") || query.includes("natural")) {
      reply =
        "#02 Barely Blush is our signature modern nude. Formulated with micronized Japanese pearl powder and peach kernel nectar, it creates an effortless 'your lips but better' satin glaze.";
      recommendedShadeId = "02";
    } else if (query.includes("gloss") || query.includes("shine") || query.includes("pink")) {
      reply =
        "#05 Hot Flamingo delivers mirror-like 3D gloss without any stickiness, packed with cross-linked hyaluronic acid micro-spheres for maximum hydration.";
      recommendedShadeId = "05";
    } else if (query.includes("formula") || query.includes("clean") || query.includes("vegan") || query.includes("ingredient")) {
      reply =
        "Every Roselle lipstick is 100% vegan, cruelty-free, and formulated without parabens or micro-plastics. Our core cushion is made from 12% whipped organic shea butter and cold-pressed Damask rose-hip oil.";
      recommendedShadeId = "01";
    } else {
      reply =
        "Our Black Friday launch features 30% off our entire archive with code 'BF30'. We recommend starting with our bestselling velvet icon, #01 Cherry Kiss.";
      recommendedShadeId = "01";
    }

    return NextResponse.json({
      success: true,
      reply,
      recommendedShadeId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in beauty concierge logic." },
      { status: 500 }
    );
  }
}

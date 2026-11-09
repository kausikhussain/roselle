import { NextResponse } from "next/server";
import { ROSELLE_SHADES } from "@/data/shades";

interface CartRequestItem {
  id: string;
  quantity: number;
}

const PROMO_CODES: Record<string, number> = {
  BF30: 30,
  ROSELLE30: 30,
  VIPACCESS: 25,
  ATELIER: 20,
};

const FREE_SHIPPING_THRESHOLD = 50.0;
const STANDARD_SHIPPING_FEE = 8.0;
const TAX_RATE = 0.08;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: CartRequestItem[] = body.items || [];
    const promoCode: string = (body.promoCode || "").trim().toUpperCase();

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const shade = ROSELLE_SHADES.find((s) => s.id === item.id);
      if (shade) {
        const itemSubtotal = shade.price * (item.quantity || 1);
        subtotal += itemSubtotal;
        validatedItems.push({
          id: shade.id,
          name: shade.name,
          finish: shade.finish,
          unitPrice: shade.price,
          salePrice: shade.salePrice,
          quantity: item.quantity,
          itemTotal: itemSubtotal,
        });
      }
    }

    const discountPercent = PROMO_CODES[promoCode] || 0;
    const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
    const discountedSubtotal = subtotal - discountAmount;

    const freeShippingQualified = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = freeShippingQualified || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
    const tax = Number((discountedSubtotal * TAX_RATE).toFixed(2));
    const total = Number((discountedSubtotal + shipping + tax).toFixed(2));

    return NextResponse.json({
      success: true,
      subtotal,
      discountPercent,
      discountAmount,
      shipping,
      freeShippingQualified,
      tax,
      total,
      items: validatedItems,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid cart payload." },
      { status: 400 }
    );
  }
}

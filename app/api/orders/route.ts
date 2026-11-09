import { NextResponse } from "next/server";
import { ROSELLE_SHADES } from "@/data/shades";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, shippingAddress, items, promoCode } = body;

    // Validation
    if (!customer?.email || !customer?.firstName || !customer?.lastName) {
      return NextResponse.json(
        { success: false, message: "Customer contact details are required." },
        { status: 400 }
      );
    }

    if (!shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.zip) {
      return NextResponse.json(
        { success: false, message: "Valid delivery shipping address is required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cannot place order with an empty bag." },
        { status: 400 }
      );
    }

    // Generate unique luxury order number: e.g. RSL-2026-8492
    const orderNumber = `RSL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderDate = new Date().toISOString();

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      const shade = ROSELLE_SHADES.find((s) => s.id === item.shadeId);
      if (shade) {
        subtotal += shade.price * (item.quantity || 1);
      }
    }

    const discountRate = promoCode?.toUpperCase() === "BF30" ? 0.3 : 0;
    const discountAmount = subtotal * discountRate;
    const finalSubtotal = subtotal - discountAmount;
    const shippingFee = finalSubtotal >= 50 ? 0 : 8.0;
    const taxFee = Number((finalSubtotal * 0.08).toFixed(2));
    const totalAmount = Number((finalSubtotal + shippingFee + taxFee).toFixed(2));

    const orderConfirmation = {
      orderNumber,
      orderDate,
      status: "Confirmed",
      estimatedDelivery: "2-3 Business Days (Paris Atelier Priority Courier)",
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
      },
      shippingAddress,
      financials: {
        subtotal,
        discountAmount,
        shippingFee,
        taxFee,
        totalAmount,
      },
      itemCount: items.length,
      trackingUrl: `https://roselleliplab.com/orders/${orderNumber}`,
    };

    return NextResponse.json({
      success: true,
      message: "Order placed successfully! Confirmation email dispatched.",
      order: orderConfirmation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error processing checkout." },
      { status: 500 }
    );
  }
}

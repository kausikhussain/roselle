import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    // In a production environment with RESEND_API_KEY, send transactional welcome email
    return NextResponse.json({
      success: true,
      message: "You have been enrolled in the Roselle VIP Atelier. Your early access key is active.",
      promoCode: "BF30",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Subscription failed." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findContactByPhone } from "@/lib/salesforce";
import { sendPin } from "@/lib/twilio";

const schema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = schema.parse(body);

    // Check if phone exists in Salesforce
    const contact = await findContactByPhone(phone);

    if (!contact) {
      return NextResponse.json(
        {
          error:
            "Phone number not found. Please contact support if you believe this is an error.",
        },
        { status: 404 }
      );
    }

    // Send PIN via Twilio
    const result = await sendPin(phone);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send verification code" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your phone",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Send PIN error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

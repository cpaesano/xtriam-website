import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findContactByPhone } from "@/lib/salesforce";
import { sendPin } from "@/lib/twilio";

const schema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Check required environment variables
function checkEnvironment(): string | null {
  const required = {
    SF_USERNAME: process.env.SF_USERNAME,
    SF_PASSWORD: process.env.SF_PASSWORD,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    return `Missing environment variables: ${missing.join(", ")}`;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Check environment configuration
    const envError = checkEnvironment();
    if (envError) {
      console.error("Configuration error:", envError);
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { phone } = schema.parse(body);

    // Check if phone exists in Salesforce
    console.log("Looking up phone in Salesforce:", phone);
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

    console.log("Found contact:", contact.FirstName, contact.LastName);

    // Send PIN via Twilio
    console.log("Sending PIN via Twilio...");
    const result = await sendPin(phone);

    if (!result.success) {
      console.error("Twilio error:", result.error);
      return NextResponse.json(
        { error: result.error || "Failed to send verification code" },
        { status: 500 }
      );
    }

    console.log("PIN sent successfully");
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

    // Log detailed error for debugging
    console.error("Send PIN error:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

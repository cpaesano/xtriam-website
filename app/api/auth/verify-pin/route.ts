import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findContactByPhone } from "@/lib/salesforce";
import { verifyPin } from "@/lib/twilio";
import { createSession } from "@/lib/session";

const schema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  pin: z.string().length(6, "PIN must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, pin } = schema.parse(body);

    // Verify PIN using Twilio Verify
    const isValid = await verifyPin(phone, pin);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 401 }
      );
    }

    // Get contact info for session
    const contact = await findContactByPhone(phone);

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Create session
    await createSession({
      contactId: contact.Id,
      accountId: contact.AccountId,
      firstName: contact.FirstName || "",
      lastName: contact.LastName || "",
      email: contact.Email || "",
      phone: phone,
    });

    return NextResponse.json({
      success: true,
      redirect: "/support",
      user: {
        firstName: contact.FirstName,
        lastName: contact.LastName,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Verify PIN error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

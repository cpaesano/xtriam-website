import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getAccountInfo } from "@/lib/salesforce";

/**
 * GET /api/support/account
 * Returns account information for the authenticated user
 */
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const account = await getAccountInfo(session.accountId);

    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    // Also include contact info from session
    return NextResponse.json({
      success: true,
      account,
      contact: {
        firstName: session.firstName,
        lastName: session.lastName,
        email: session.email,
        phone: session.phone,
      },
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    return NextResponse.json(
      { error: "Failed to fetch account information" },
      { status: 500 }
    );
  }
}

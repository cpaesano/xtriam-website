import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { searchContacts } from "@/lib/salesforce";

/**
 * GET /api/support/contacts/search?q=...
 * Admin-only contact lookup used by the "Log Ticket" intake modal to pick the
 * client a ticket is being logged on behalf of.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const q = request.nextUrl.searchParams.get("q") || "";
    if (q.trim().length < 2) {
      return NextResponse.json({ success: true, contacts: [] });
    }

    const contacts = await searchContacts(q);
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("Contact search error:", error);
    return NextResponse.json(
      { error: "Failed to search contacts" },
      { status: 500 }
    );
  }
}

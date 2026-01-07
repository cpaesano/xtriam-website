import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCases, createCase } from "@/lib/salesforce";
import type { CreateTicketRequest } from "@/types/auth";

/**
 * GET /api/support/tickets
 * Returns all support tickets for the authenticated user
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

    const tickets = await getCases(session.contactId);

    return NextResponse.json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/support/tickets
 * Creates a new support ticket
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: CreateTicketRequest = await request.json();

    // Validate required fields
    if (!body.subject || !body.description) {
      return NextResponse.json(
        { error: "Subject and description are required" },
        { status: 400 }
      );
    }

    const result = await createCase({
      contactId: session.contactId,
      accountId: session.accountId,
      subject: body.subject,
      description: body.description,
      priority: body.priority || "Medium",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to create ticket" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      caseId: result.id,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}

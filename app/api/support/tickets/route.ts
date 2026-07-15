import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCases, getAllCases, createCase } from "@/lib/support-store";
import type { CreateTicketRequest } from "@/types/auth";

/**
 * GET /api/support/tickets
 * Returns support tickets for the authenticated user
 * Admin users can pass ?all=true to see all tickets across all contacts
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const showAll = request.nextUrl.searchParams.get("all") === "true";
    const isAdmin = !!session.isAdmin;

    const tickets = (showAll && isAdmin)
      ? await getAllCases()
      : await getCases(session.contactId);

    return NextResponse.json({
      success: true,
      tickets,
      isAdmin,
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

    // Admin intake: log a ticket on behalf of a client contact. Only honored
    // when the session is an admin AND a target contact was supplied; otherwise
    // the ticket is stamped with the caller's own identity (self-service).
    const isAdminIntake = !!session.isAdmin && !!body.onBehalfContactId;

    if (isAdminIntake) {
      const reportedAt = body.reportedAt ? new Date(body.reportedAt) : undefined;
      if (reportedAt && isNaN(reportedAt.getTime())) {
        return NextResponse.json(
          { error: "Invalid reported-on date" },
          { status: 400 }
        );
      }

      const result = await createCase({
        contactId: body.onBehalfContactId!,
        accountId: body.onBehalfAccountId || "",
        subject: body.subject,
        description: body.description,
        priority: body.priority || "Medium",
        type: body.type || "Issue",
        submitterName: body.onBehalfName || "",
        submitterEmail: body.onBehalfEmail || "",
        accountName: body.onBehalfAccountName || null,
        origin: body.origin || "phone",
        onBehalf: true,
        createdByAdmin: session.email,
        createdAt: reportedAt,
        status: body.resolveNow ? "Closed" : "New",
        resolution: body.resolveNow ? body.resolution : undefined,
        internalNote: body.internalNote,
        // Default off when resolving after the fact; otherwise honor the toggle.
        notify: body.notify ?? !body.resolveNow,
      });

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Failed to create ticket" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, caseId: result.id });
    }

    const result = await createCase({
      contactId: session.contactId,
      accountId: session.accountId,
      subject: body.subject,
      description: body.description,
      priority: body.priority || "Medium",
      type: body.type || "Issue",
      submitterName: `${session.firstName} ${session.lastName}`.trim(),
      submitterEmail: session.email,
      accountName: session.orgName || null,
      origin: session.authMethod || "web",
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

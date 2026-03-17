import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCaseById, updateCaseStatus, getCaseComments, addCaseComment, getAdjacentCaseIds } from "@/lib/salesforce";

interface RouteParams {
  params: Promise<{ caseId: string }>;
}

/**
 * GET /api/support/tickets/[caseId]
 * Returns a single support ticket by ID
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { caseId } = await params;

    if (!caseId) {
      return NextResponse.json(
        { error: "Case ID is required" },
        { status: 400 }
      );
    }

    const contactId = session.isAdmin ? undefined : session.contactId;

    const [ticket, comments, adjacent] = await Promise.all([
      getCaseById(caseId),
      getCaseComments(caseId),
      getAdjacentCaseIds(caseId, contactId),
    ]);

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket,
      comments,
      isAdmin: !!session.isAdmin,
      prevCaseId: adjacent.prevCaseId,
      nextCaseId: adjacent.nextCaseId,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}

const VALID_STATUSES = ["New", "Working", "On Hold", "Escalated", "Closed"];

/**
 * PATCH /api/support/tickets/[caseId]
 * Update ticket status (admin only)
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { caseId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // Update status
    const result = await updateCaseStatus(caseId, status);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update" },
        { status: 500 }
      );
    }

    // If a comment was included with the status change, add it
    if (body.comment && body.comment.trim()) {
      await addCaseComment(caseId, body.comment.trim());
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/support/tickets/[caseId]
 * Add a comment to a ticket
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseId } = await params;
    const body = await request.json();
    const { comment } = body;

    if (!comment || !comment.trim()) {
      return NextResponse.json(
        { error: "Comment is required" },
        { status: 400 }
      );
    }

    const result = await addCaseComment(caseId, comment.trim());

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to add comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

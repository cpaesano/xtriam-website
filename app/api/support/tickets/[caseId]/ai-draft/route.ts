import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCaseById, getCaseComments } from "@/lib/support-store";
import { draftSupportReply } from "@/lib/claude";

interface RouteParams {
  params: Promise<{ caseId: string }>;
}

/**
 * POST /api/support/tickets/[caseId]/ai-draft  (admin only)
 * Body: { instruction: string } — what to say, or a rough draft to improve.
 * Returns { draft } — a polished reply for the operator to review/edit/send.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { caseId } = await params;
    const body = await request.json().catch(() => ({}));
    const instruction = (body?.instruction ?? "").toString().trim();
    if (!instruction) {
      return NextResponse.json({ error: "Tell the AI what to say." }, { status: 400 });
    }

    const [ticket, comments] = await Promise.all([
      getCaseById(caseId),
      getCaseComments(caseId),
    ]);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // getCaseComments returns newest-first; reverse to oldest-first for context.
    const thread = [...comments].reverse().map((c) => ({
      author: c.CreatedBy?.Name || "",
      body: c.CommentBody || "",
    }));

    const draft = await draftSupportReply({
      subject: ticket.Subject,
      description: ticket.Description || "",
      customerName: ticket.Contact?.Name,
      accountName: ticket.Contact?.Account?.Name,
      thread,
      instruction,
    });

    return NextResponse.json({ success: true, draft });
  } catch (error) {
    console.error("ai-draft error:", error);
    return NextResponse.json({ error: "Failed to draft reply" }, { status: 500 });
  }
}

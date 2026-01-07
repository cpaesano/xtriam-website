import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getCaseById } from "@/lib/salesforce";

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

    const ticket = await getCaseById(caseId);

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}

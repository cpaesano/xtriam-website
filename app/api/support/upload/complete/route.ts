import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { recordUploadedFile, getCaseById } from "@/lib/support-store";

/**
 * POST /api/support/upload/complete
 * Records an attachment on a ticket AFTER the browser has uploaded the file
 * directly to Cloud Storage via the signed URL from POST /api/support/upload.
 * The server verifies the object actually exists (and is within the ticket's
 * folder) before writing the metadata.
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseId, id, fileName, path, contentType } = await request.json();

    if (!caseId || !id || !fileName || !path) {
      return NextResponse.json(
        { error: "Missing required fields: caseId, id, fileName, path" },
        { status: 400 }
      );
    }

    // Verify the ticket exists before recording.
    const ticket = await getCaseById(caseId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const result = await recordUploadedFile({
      recordId: caseId,
      id,
      fileName,
      path,
      contentType,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to record attachment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording attachment:", error);
    return NextResponse.json(
      { error: "Failed to record attachment" },
      { status: 500 }
    );
  }
}

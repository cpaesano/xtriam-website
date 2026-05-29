import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createSignedUploadUrl, getCaseById } from "@/lib/support-store";

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types for screenshots
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
];

/**
 * POST /api/support/upload
 * Returns a short-lived signed URL the browser uses to upload an attachment
 * DIRECTLY to Cloud Storage (bypassing the serverless request-body size limit).
 * After the upload, the client calls POST /api/support/upload/complete to record
 * the attachment on the ticket.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseId, fileName, contentType, fileSize } = await request.json();

    if (!caseId || !fileName || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields: caseId, fileName, contentType" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed (PNG, JPG, GIF, WebP)" },
        { status: 400 }
      );
    }

    if (typeof fileSize === "number" && fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Verify the ticket exists before issuing an upload URL for it.
    const ticket = await getCaseById(caseId);
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const { id, path, uploadUrl } = await createSignedUploadUrl({
      recordId: caseId,
      fileName,
      contentType,
    });

    return NextResponse.json({ success: true, id, path, uploadUrl });
  } catch (error) {
    console.error("Error creating upload URL:", error);
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 }
    );
  }
}

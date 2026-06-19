import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createSignedUploadUrl, getCaseById } from "@/lib/support-store";

// Max file size: 10MB (uploads go straight to Cloud Storage, not through the function)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed by file EXTENSION — some formats (notably iPhone HEIC) report an
// empty or unreliable MIME type in the browser, so extension is the reliable signal.
const ALLOWED_EXT = ["png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "pdf"];
const ALLOWED_LABEL = "PNG, JPG, GIF, WebP, HEIC, or PDF";
const MIME_BY_EXT: Record<string, string> = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif",
  webp: "image/webp", heic: "image/heic", heif: "image/heif", pdf: "application/pdf",
};

function extOf(name: string): string {
  return (name.split(".").pop() || "").toLowerCase();
}

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

    if (!caseId || !fileName) {
      return NextResponse.json(
        { error: "Missing required fields: caseId, fileName" },
        { status: 400 }
      );
    }

    const ext = extOf(fileName);
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${ALLOWED_LABEL}.` },
        { status: 400 }
      );
    }

    // Derive a content type when the browser didn't provide one (e.g. HEIC).
    const resolvedContentType = contentType || MIME_BY_EXT[ext] || "application/octet-stream";

    if (typeof fileSize === "number" && fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
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
      contentType: resolvedContentType,
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

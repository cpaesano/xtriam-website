import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { uploadFileToRecord, getCaseById } from "@/lib/salesforce";

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
 * Uploads a file (screenshot) to a Case in Salesforce
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { caseId, fileName, base64Data, contentType } = body;

    // Validate required fields
    if (!caseId || !fileName || !base64Data || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields: caseId, fileName, base64Data, contentType" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed (PNG, JPG, GIF, WebP)" },
        { status: 400 }
      );
    }

    // Validate file size (base64 is ~33% larger than original)
    const estimatedSize = (base64Data.length * 3) / 4;
    if (estimatedSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Verify the Case exists and belongs to this user's contact
    const caseRecord = await getCaseById(caseId);
    if (!caseRecord) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Upload file to Salesforce
    const result = await uploadFileToRecord({
      recordId: caseId,
      fileName,
      base64Data,
      contentType,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to upload file" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contentDocumentId: result.contentDocumentId,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

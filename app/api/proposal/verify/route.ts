import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createProposalSession,
  getProposalConfig,
  validatePasscode,
} from "@/lib/proposal";

const schema = z.object({
  code: z.string().min(1),
  passcode: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, passcode } = schema.parse(body);

    const config = getProposalConfig(code);
    if (!config) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    const viewer = validatePasscode(code, passcode);
    if (!viewer) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
    }

    await createProposalSession(code, viewer);
    return NextResponse.json({
      success: true,
      viewer: { name: viewer.name, avatar: viewer.avatar },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

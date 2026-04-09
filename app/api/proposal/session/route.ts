import { NextResponse } from "next/server";
import { getProposalSession } from "@/lib/proposal";

export async function GET() {
  const session = await getProposalSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    viewerId: session.viewerId,
    viewerName: session.viewerName,
    viewerRole: session.viewerRole,
    viewerAvatar: session.viewerAvatar,
    proposalCode: session.proposalCode,
  });
}

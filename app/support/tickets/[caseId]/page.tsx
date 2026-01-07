import { Metadata } from "next";
import { TicketDetail } from "@/components/support";

export const metadata: Metadata = {
  title: "Ticket Details | bpmPro Customer Portal",
  description: "View support ticket details.",
};

interface PageProps {
  params: Promise<{ caseId: string }>;
}

export default async function TicketDetailPage({ params }: PageProps) {
  const { caseId } = await params;

  return <TicketDetail caseId={caseId} />;
}

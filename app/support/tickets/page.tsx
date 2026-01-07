import { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TicketList } from "@/components/support";

export const metadata: Metadata = {
  title: "Support Tickets | bpmPro Customer Portal",
  description: "View and manage your support tickets.",
};

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
          <p className="mt-1 text-muted-foreground">
            View and track your support requests
          </p>
        </div>
        <Link
          href="/support/tickets/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </Link>
      </div>

      <TicketList />
    </div>
  );
}

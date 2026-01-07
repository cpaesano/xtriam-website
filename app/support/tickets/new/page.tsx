import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TicketForm } from "@/components/support";

export const metadata: Metadata = {
  title: "Create Ticket | bpmPro Customer Portal",
  description: "Submit a new support ticket.",
};

export default function NewTicketPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/support/tickets"
        className="inline-flex items-center gap-2 text-brand-blue-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tickets
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Ticket</h1>
        <p className="mt-1 text-muted-foreground">
          Describe your issue and we&apos;ll get back to you as soon as possible
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <TicketForm />
      </div>

      <div className="rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4 text-sm text-brand-blue-700">
        <strong>Tip:</strong> For faster resolution, include any error messages,
        screenshots, or steps to reproduce the issue in your description.
      </div>
    </div>
  );
}

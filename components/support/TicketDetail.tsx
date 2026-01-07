"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Calendar,
  Tag,
} from "lucide-react";
import type { SalesforceCase } from "@/types/auth";

interface TicketDetailProps {
  caseId: string;
}

export function TicketDetail({ caseId }: TicketDetailProps) {
  const [ticket, setTicket] = useState<SalesforceCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch(`/api/support/tickets/${caseId}`);
        const data = await response.json();

        if (data.success) {
          setTicket(data.ticket);
        } else {
          setError(data.error || "Failed to load ticket");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [caseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="space-y-4">
        <Link
          href="/support/tickets"
          className="inline-flex items-center gap-2 text-brand-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tickets
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error || "Ticket not found"}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/support/tickets"
        className="inline-flex items-center gap-2 text-brand-blue-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tickets
      </Link>

      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Case #{ticket.CaseNumber}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-foreground">
              {ticket.Subject}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={ticket.Status} />
            <PriorityBadge priority={ticket.Priority} />
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Created</div>
              <div className="text-sm font-medium text-foreground">
                {formatDate(ticket.CreatedDate)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Last Updated</div>
              <div className="text-sm font-medium text-foreground">
                {formatDate(ticket.LastModifiedDate)}
              </div>
            </div>
          </div>
          {ticket.ClosedDate && (
            <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-xs text-muted-foreground">Closed</div>
                <div className="text-sm font-medium text-foreground">
                  {formatDate(ticket.ClosedDate)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Description
          </h2>
          <div className="rounded-lg bg-muted/30 p-4">
            {ticket.Description ? (
              <p className="text-foreground whitespace-pre-wrap">
                {ticket.Description}
              </p>
            ) : (
              <p className="text-muted-foreground italic">
                No description provided
              </p>
            )}
          </div>
        </div>

        {/* Help text */}
        <div className="mt-6 rounded-lg border border-brand-blue-200 bg-brand-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Tag className="h-5 w-5 text-brand-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-brand-blue-900">
                Need to add more information?
              </h3>
              <p className="mt-1 text-sm text-brand-blue-700">
                If you need to provide additional details about this ticket,
                please contact us at{" "}
                <a
                  href="mailto:support@xtriam.com"
                  className="font-medium underline"
                >
                  support@xtriam.com
                </a>{" "}
                or call{" "}
                <a href="tel:305-204-9694" className="font-medium underline">
                  (305) 204-9694
                </a>{" "}
                and reference case #{ticket.CaseNumber}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    New: {
      color: "bg-blue-100 text-blue-700",
      icon: <Clock className="h-4 w-4" />,
    },
    Working: {
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="h-4 w-4" />,
    },
    "In Progress": {
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="h-4 w-4" />,
    },
    Escalated: {
      color: "bg-orange-100 text-orange-700",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    Closed: {
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  };

  const config = statusConfig[status] || {
    color: "bg-gray-100 text-gray-700",
    icon: <Clock className="h-4 w-4" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.color}`}
    >
      {config.icon}
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const priorityConfig: Record<string, string> = {
    Low: "bg-gray-100 text-gray-600",
    Medium: "bg-blue-100 text-blue-600",
    High: "bg-orange-100 text-orange-600",
    Critical: "bg-red-100 text-red-600",
  };

  const color = priorityConfig[priority] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${color}`}
    >
      {priority}
    </span>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

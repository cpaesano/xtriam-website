"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Ticket, Clock, AlertCircle, CheckCircle2, Loader2, Shield } from "lucide-react";
import type { SalesforceCase } from "@/types/auth";

type FilterTab = "all" | "open" | "closed";

const CLOSED_STATUSES = ["Closed"];

interface TicketListProps {
  limit?: number;
  showViewAll?: boolean;
}

export function TicketList({ limit, showViewAll = false }: TicketListProps) {
  const [allTickets, setAllTickets] = useState<SalesforceCase[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("open");
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const url = viewAll ? "/api/support/tickets?all=true" : "/api/support/tickets";
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setAllTickets(data.tickets);
          if (data.isAdmin !== undefined) {
            setIsAdmin(data.isAdmin);
          }
        } else {
          setError(data.error || "Failed to load tickets");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, [viewAll]);

  const counts = useMemo(() => {
    const closed = allTickets.filter((t) => CLOSED_STATUSES.includes(t.Status)).length;
    return { all: allTickets.length, open: allTickets.length - closed, closed };
  }, [allTickets]);

  const tickets = useMemo(() => {
    let filtered = allTickets;
    if (activeFilter === "open") {
      filtered = allTickets.filter((t) => !CLOSED_STATUSES.includes(t.Status));
    } else if (activeFilter === "closed") {
      filtered = allTickets.filter((t) => CLOSED_STATUSES.includes(t.Status));
    }
    return limit ? filtered.slice(0, limit) : filtered;
  }, [allTickets, activeFilter, limit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (allTickets.length === 0 && !viewAll) {
    return (
      <div className="space-y-4">
        {isAdmin && !limit && <AdminToggle viewAll={viewAll} onToggle={setViewAll} />}
        <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
          <Ticket className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-semibold text-foreground">No tickets yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            When you create support tickets, they will appear here.
          </p>
          <Link
            href="/support/tickets/new"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-600 transition-colors"
          >
            Create Your First Ticket
          </Link>
        </div>
      </div>
    );
  }

  const filterTabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "open", label: "Open", count: counts.open },
    { key: "closed", label: "Closed", count: counts.closed },
  ];

  const showCustomerColumn = viewAll && isAdmin;

  return (
    <div className="space-y-4">
      {/* Admin Toggle */}
      {isAdmin && !limit && <AdminToggle viewAll={viewAll} onToggle={setViewAll} />}

      {/* Filter Tabs */}
      {!limit && (
        <div className="flex gap-1 border-b border-border">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeFilter === tab.key
                  ? "border-brand-blue-500 text-brand-blue-600"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs ${
                  activeFilter === tab.key
                    ? "bg-brand-blue-100 text-brand-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No {activeFilter === "open" ? "open" : "closed"} tickets.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Case #
                </th>
                {showCustomerColumn && (
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Customer
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.Id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/support/tickets/${ticket.Id}`}
                      className="text-brand-blue-600 hover:underline font-medium"
                    >
                      {ticket.CaseNumber}
                    </Link>
                  </td>
                  {showCustomerColumn && (
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-foreground">
                        {ticket.Contact?.Name || "—"}
                      </div>
                      {ticket.Contact?.Account?.Name && (
                        <div className="text-xs text-muted-foreground">
                          {ticket.Contact.Account.Name}
                        </div>
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <Link
                      href={`/support/tickets/${ticket.Id}`}
                      className="text-foreground hover:text-brand-blue-600"
                    >
                      {ticket.Subject}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusBadge status={ticket.Status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <PriorityBadge priority={ticket.Priority} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                    {formatDate(ticket.CreatedDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showViewAll && tickets.length > 0 && (
        <div className="text-center">
          <Link
            href="/support/tickets"
            className="text-sm text-brand-blue-600 hover:underline"
          >
            View all tickets
          </Link>
        </div>
      )}
    </div>
  );
}

function AdminToggle({ viewAll, onToggle }: { viewAll: boolean; onToggle: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
      <Shield className="h-4 w-4 text-purple-600" />
      <span className="text-sm font-medium text-purple-800">Admin</span>
      <div className="flex gap-1 ml-auto">
        <button
          onClick={() => onToggle(false)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            !viewAll
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-100"
          }`}
        >
          My Tickets
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            viewAll
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-100"
          }`}
        >
          All Tickets
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    New: {
      color: "bg-blue-100 text-blue-700",
      icon: <Clock className="h-3 w-3" />,
    },
    "Working": {
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock className="h-3 w-3" />,
    },
    "On Hold": {
      color: "bg-gray-100 text-gray-700",
      icon: <Clock className="h-3 w-3" />,
    },
    Escalated: {
      color: "bg-orange-100 text-orange-700",
      icon: <AlertCircle className="h-3 w-3" />,
    },
    Closed: {
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status] || {
    color: "bg-gray-100 text-gray-700",
    icon: <Clock className="h-3 w-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${config.color}`}
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
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${color}`}
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
  });
}

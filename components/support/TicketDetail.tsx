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
  MessageSquare,
  Send,
} from "lucide-react";
import type { SalesforceCase } from "@/types/auth";

interface CaseComment {
  Id: string;
  CommentBody: string;
  CreatedDate: string;
  CreatedBy: {
    Name: string;
  };
}

interface TicketDetailProps {
  caseId: string;
}

const STATUSES = ["New", "Working", "On Hold", "Escalated", "Closed"];

export function TicketDetail({ caseId }: TicketDetailProps) {
  const [ticket, setTicket] = useState<SalesforceCase | null>(null);
  const [comments, setComments] = useState<CaseComment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await fetch(`/api/support/tickets/${caseId}`);
        const data = await response.json();

        if (data.success) {
          setTicket(data.ticket);
          setComments(data.comments || []);
          if (data.isAdmin !== undefined) setIsAdmin(data.isAdmin);
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

  async function handleStatusChange(newStatus: string) {
    if (!ticket || updating) return;
    setUpdating(true);
    try {
      const response = await fetch(`/api/support/tickets/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setTicket({ ...ticket, Status: newStatus });
      }
    } catch {
      console.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;

    setSubmittingComment(true);
    try {
      const response = await fetch(`/api/support/tickets/${caseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newComment.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        // Add comment to list locally
        setComments((prev) => [
          {
            Id: Date.now().toString(),
            CommentBody: newComment.trim(),
            CreatedDate: new Date().toISOString(),
            CreatedBy: { Name: "You" },
          },
          ...prev,
        ]);
        setNewComment("");
      }
    } catch {
      console.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  }

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
            {isAdmin ? (
              <select
                value={ticket.Status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <StatusBadge status={ticket.Status} />
            )}
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

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4">
            <div className="flex gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={2}
                disabled={submittingComment}
                className="flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500
                  disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="self-end px-4 py-2 bg-brand-blue-600 text-white rounded-lg text-sm font-medium
                  hover:bg-brand-blue-700 transition-colors
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {submittingComment ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          {/* Comment List */}
          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment.Id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.CreatedBy.Name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.CreatedDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.CommentBody}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No comments yet.
            </p>
          )}
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
    "On Hold": {
      color: "bg-gray-100 text-gray-700",
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

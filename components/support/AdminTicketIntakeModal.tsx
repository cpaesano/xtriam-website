"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Search,
  Loader2,
  AlertCircle,
  Send,
  Check,
  User,
  Mail,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui";

interface ContactResult {
  Id: string;
  Name: string;
  Email: string | null;
  AccountId: string;
  AccountName: string;
  Phone: string | null;
  MobilePhone: string | null;
}

interface AdminTicketIntakeModalProps {
  onClose: () => void;
  onCreated: (caseId: string) => void;
}

const CHANNELS = ["Phone", "Email", "SMS", "Zoom", "Walkthrough", "Web"] as const;

/** Format a Date as the value a <input type="datetime-local"> expects (local time). */
function toDateTimeLocal(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function AdminTicketIntakeModal({
  onClose,
  onCreated,
}: AdminTicketIntakeModalProps) {
  // Contact picker
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ContactResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<ContactResult | null>(null);
  const searchAbort = useRef<AbortController | null>(null);

  // Ticket fields
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>("Phone");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"Issue" | "Feature Request" | "Question">("Issue");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [internalNote, setInternalNote] = useState("");
  const [reportedAt, setReportedAt] = useState(() => toDateTimeLocal(new Date()));
  const [resolveNow, setResolveNow] = useState(false);
  const [resolution, setResolution] = useState("");
  const [notify, setNotify] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasEmail = !!selected?.Email;

  // When "resolve now" is toggled on, default the client email off (we are
  // logging something already handled). Admin can turn it back on.
  useEffect(() => {
    setNotify(!resolveNow);
  }, [resolveNow]);

  // Debounced contact search.
  useEffect(() => {
    if (selected) return; // don't search once a contact is locked in
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const t = setTimeout(async () => {
      searchAbort.current?.abort();
      const controller = new AbortController();
      searchAbort.current = controller;
      try {
        const res = await fetch(
          `/api/support/contacts/search?q=${encodeURIComponent(term)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.success) setResults(data.contacts);
        else setResults([]);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, selected]);

  function selectContact(c: ContactResult) {
    setSelected(c);
    setResults([]);
    setQuery("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selected) {
      setError("Select the client this ticket is for.");
      return;
    }
    if (!subject.trim() || !description.trim()) {
      setError("Subject and description are required.");
      return;
    }
    if (resolveNow && !resolution.trim()) {
      setError("Add the resolution, or uncheck Resolve now.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          description: description.trim(),
          type,
          priority,
          onBehalfContactId: selected.Id,
          onBehalfAccountId: selected.AccountId,
          onBehalfName: selected.Name,
          onBehalfEmail: selected.Email || "",
          onBehalfAccountName: selected.AccountName,
          origin: channel.toLowerCase(),
          reportedAt: new Date(reportedAt).toISOString(),
          resolveNow,
          resolution: resolveNow ? resolution.trim() : undefined,
          internalNote: internalNote.trim() || undefined,
          notify: hasEmail ? notify : false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onCreated(data.caseId);
      } else {
        setError(data.error || "Failed to log the ticket.");
      }
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-6">
      <div className="my-8 w-full max-w-2xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Log a Ticket</h2>
            <p className="text-sm text-muted-foreground">
              Create a ticket on behalf of a client.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Client picker */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Client <span className="text-red-500">*</span>
            </label>

            {selected ? (
              <div className="flex items-start justify-between gap-3 rounded-lg border border-brand-blue-200 bg-brand-blue-50/50 p-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-brand-blue-600" />
                    {selected.Name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {selected.AccountName || "No account"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    {selected.Email || "No email on file"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-xs font-medium text-brand-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`${inputClass} pl-9`}
                    autoFocus
                  />
                  {searching && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
                  )}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Search by name, email, or phone.
                </p>

                {results.length > 0 && (
                  <div className="mt-1 max-h-56 overflow-y-auto rounded-lg border border-border bg-white shadow-sm">
                    {results.map((c) => (
                      <button
                        key={c.Id}
                        type="button"
                        onClick={() => selectContact(c)}
                        className="flex w-full items-start justify-between gap-2 border-b border-border px-3 py-2 text-left last:border-0 hover:bg-muted/50"
                      >
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {c.Name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {c.AccountName || "No account"}
                            {c.Email ? ` · ${c.Email}` : ""}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {query.trim().length >= 2 && !searching && results.length === 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    No contacts found. Add the contact in Salesforce first.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Channel + Reported on */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Channel
              </label>
              <select
                value={channel}
                onChange={(e) =>
                  setChannel(e.target.value as (typeof CHANNELS)[number])
                }
                className={inputClass}
              >
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Reported on
              </label>
              <input
                type="datetime-local"
                value={reportedAt}
                onChange={(e) => setReportedAt(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Type + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Type
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "Issue" | "Feature Request" | "Question")
                }
                className={inputClass}
              >
                <option value="Issue">Issue</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Question">Question</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "Low" | "Medium" | "High")
                }
                className={inputClass}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Internal note */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Internal note (support only)
            </label>
            <textarea
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              rows={2}
              className={`${inputClass} resize-none`}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Diagnosis or context for the team. The client never sees this.
            </p>
          </div>

          {/* Resolve now */}
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={resolveNow}
                onChange={(e) => setResolveNow(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500"
              />
              Resolve now (close with a resolution)
            </label>
            {resolveNow && (
              <div className="mt-3">
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Posted as a support reply on the ticket, which is created closed.
                </p>
              </div>
            )}
          </div>

          {/* Notify client */}
          <label
            className={`flex items-center gap-2 text-sm ${
              hasEmail
                ? "cursor-pointer text-foreground"
                : "cursor-not-allowed text-muted-foreground"
            }`}
          >
            <input
              type="checkbox"
              checked={hasEmail && notify}
              disabled={!hasEmail}
              onChange={(e) => setNotify(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 disabled:opacity-50"
            />
            Email the client
            {selected && !hasEmail && (
              <span className="text-xs">(no email on file, none will be sent)</span>
            )}
          </label>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging...
                </>
              ) : (
                <>
                  {resolveNow ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {resolveNow ? "Log & Close" : "Log Ticket"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

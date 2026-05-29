"use client";

import { Loader2 } from "lucide-react";

interface ProcessingOverlayProps {
  show: boolean;
  /** Action-specific message, e.g. "Submitting your ticket..." */
  message?: string;
}

/**
 * Full-screen blocking overlay shown while a server-backed action is in flight.
 * Dims + blurs the page, centers a spinner with an action-specific message, and
 * captures all pointer events so the user can't navigate or double-submit until
 * the action completes.
 */
export function ProcessingOverlay({ show, message = "Processing..." }: ProcessingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-8 py-6 shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </div>
  );
}

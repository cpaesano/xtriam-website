import { getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

/**
 * Support ticket email notifications.
 *
 * Notifications are delivered by the "Trigger Email from Firestore" extension
 * installed on the xtriam-support project: we write a document to the `mail`
 * collection and the extension sends it via SendGrid. No SMTP code lives here.
 *
 * Client-facing copy follows xtriam-website/docs/SUPPORT_EMAIL_CONVENTIONS.md:
 * no markdown syntax, no em dashes, no exclamation marks, UPPERCASE section
 * titles, and the fixed team signature block.
 */

const SUPPORT_EMAIL = process.env.SUPPORT_NOTIFICATION_EMAIL || "support@xtriam.com";
const FROM = process.env.SUPPORT_FROM_EMAIL || "xTriam Support <support@xtriam.com>";
const PORTAL_URL = process.env.SUPPORT_PORTAL_URL || "https://www.xtriam.com/support";

const SIGNATURE = [
  "Best regards,",
  "",
  "",
  "xTriam Support Team",
  "support@xtriam.com",
  "https://www.xtriam.com/support",
  "AI-powered customer support, tutorials, and support tickets",
].join("\n");

function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Render a plain-text body to simple, whitespace-preserving HTML. */
function toHtml(text: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;line-height:1.5;white-space:pre-wrap">${esc(
    text
  )}</div>`;
}

async function enqueue(to: string | string[], subject: string, text: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("mail").add({
    to,
    from: FROM,
    message: {
      subject,
      text,
      html: toHtml(text),
    },
    createdAt: Timestamp.now(),
  });
}

function firstName(full: string): string {
  return (full || "").trim().split(/\s+/)[0] || "there";
}

// --- Internal (xTriam support team) notifications ---

export async function notifyNewTicket(t: {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  description: string;
  submitterName: string;
  submitterEmail: string;
  accountName: string;
  priority: string;
  type: string;
}): Promise<void> {
  const link = `${PORTAL_URL}/tickets/${t.ticketId}`;
  const text = [
    "A new support ticket was submitted through the portal.",
    "",
    `TICKET: #${t.ticketNumber}`,
    `SUBJECT: ${t.subject}`,
    `FROM: ${t.submitterName} (${t.submitterEmail || "no email"})`,
    `ACCOUNT: ${t.accountName || "Unknown"}`,
    `PRIORITY: ${t.priority}`,
    `TYPE: ${t.type}`,
    "",
    "DESCRIPTION:",
    t.description,
    "",
    `View in the portal: ${link}`,
  ].join("\n");
  await enqueue(SUPPORT_EMAIL, `New Support Ticket #${t.ticketNumber}: ${t.subject}`, text);
}

export async function notifyCommentToSupport(t: {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  authorName: string;
  body: string;
  accountName: string;
}): Promise<void> {
  const link = `${PORTAL_URL}/tickets/${t.ticketId}`;
  const text = [
    "A customer posted a new reply on a support ticket.",
    "",
    `TICKET: #${t.ticketNumber}`,
    `SUBJECT: ${t.subject}`,
    `FROM: ${t.authorName}`,
    `ACCOUNT: ${t.accountName || "Unknown"}`,
    "",
    "REPLY:",
    t.body,
    "",
    `View in the portal: ${link}`,
  ].join("\n");
  await enqueue(SUPPORT_EMAIL, `Re: Ticket #${t.ticketNumber}: ${t.subject}`, text);
}

// --- Client-facing notifications (follow SUPPORT_EMAIL_CONVENTIONS.md) ---

export async function notifyReplyToClient(t: {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  submitterEmail: string;
  submitterName: string;
  body: string;
}): Promise<void> {
  if (!t.submitterEmail) return;
  const link = `${PORTAL_URL}/tickets/${t.ticketId}`;
  const text = [
    `Dear ${firstName(t.submitterName)},`,
    "",
    `We have posted a new reply to your support ticket #${t.ticketNumber} regarding "${t.subject}".`,
    "",
    "OUR REPLY:",
    t.body,
    "",
    "You can view the full conversation here:",
    link,
    "",
    "If you run into anything else, just let us know.",
    "",
    SIGNATURE,
  ].join("\n");
  await enqueue(t.submitterEmail, `Support Ticket #${t.ticketNumber}: New Reply`, text);
}

const STATUS_PHRASES: Record<string, string> = {
  New: "received and is now open",
  Working: "now being worked on",
  "On Hold": "placed on hold",
  Escalated: "escalated to our team for priority handling",
  Closed: "marked as resolved and closed",
};

export async function notifyStatusChangeToClient(t: {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  submitterEmail: string;
  submitterName: string;
  status: string;
}): Promise<void> {
  if (!t.submitterEmail) return;
  const link = `${PORTAL_URL}/tickets/${t.ticketId}`;
  const phrase = STATUS_PHRASES[t.status] || `updated to ${t.status}`;
  const text = [
    `Dear ${firstName(t.submitterName)},`,
    "",
    `Your support ticket #${t.ticketNumber} regarding "${t.subject}" has been ${phrase}.`,
    "",
    "You can view the ticket here:",
    link,
    "",
    "If you run into anything else, just let us know.",
    "",
    SIGNATURE,
  ].join("\n");
  await enqueue(t.submitterEmail, `Support Ticket #${t.ticketNumber}: Status Update`, text);
}

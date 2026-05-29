import { randomUUID } from "crypto";
import { getAdminDb, getSupportBucket } from "@/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import type { SalesforceCase, SalesforceAccount } from "@/types/auth";
import {
  notifyNewTicket,
  notifyCommentToSupport,
  notifyReplyToClient,
  notifyStatusChangeToClient,
} from "@/lib/support-notify";

/**
 * Firestore-backed support ticket store for the xtriam-support project.
 *
 * This module replaces the support-specific functions that previously lived in
 * lib/salesforce.ts. The exported function names, signatures, and RETURN SHAPES
 * are kept compatible with the old Salesforce layer (SalesforceCase / CaseComment)
 * so the API routes and UI components require no shape changes — this is a pure
 * persistence swap. Internally, documents use clean field names; we map to the
 * SF-shaped views at read time.
 *
 * Collections (all server-side, Admin SDK only):
 *   tickets/{ticketId}
 *   tickets/{ticketId}/comments/{commentId}
 *   counters/tickets        (atomic sequential ticket number)
 *   accounts/{accountId}    (lightweight account record for the account page)
 *   mail/{id}               (Trigger Email queue — see support-notify.ts)
 */

const TICKETS = "tickets";

// CaseComment shape preserved for UI compatibility (mirrors the old
// lib/salesforce.ts export). The route response sends these as `comments`.
export interface CaseComment {
  Id: string;
  CommentBody: string;
  CreatedDate: string;
  CreatedBy: { Name: string };
  IsPublished: boolean;
}

// ---------- helpers ----------

function tsToISO(v: unknown): string {
  if (!v) return new Date(0).toISOString();
  if (v instanceof Timestamp) return v.toDate().toISOString();
  if (typeof v === "object" && v !== null && "toDate" in v) {
    return (v as { toDate: () => Date }).toDate().toISOString();
  }
  return new Date(v as string | number).toISOString();
}

interface TicketData {
  ticketNumber?: number;
  ticketNumberFormatted?: string;
  subject?: string;
  description?: string | null;
  status?: string;
  priority?: string;
  type?: string;
  productKey?: string;
  contactId?: string;
  accountId?: string;
  accountName?: string | null;
  submitterName?: string;
  submitterEmail?: string;
  origin?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  lastModifiedAt?: Timestamp;
  closedAt?: Timestamp | null;
  attachments?: AttachmentMeta[];
}

function docToCase(id: string, d: TicketData): SalesforceCase {
  return {
    Id: id,
    CaseNumber: d.ticketNumberFormatted || String(d.ticketNumber ?? ""),
    Subject: d.subject ?? "",
    Status: d.status ?? "New",
    Priority: d.priority ?? "Medium",
    Description: d.description ?? null,
    CreatedDate: tsToISO(d.createdAt),
    ClosedDate: d.closedAt ? tsToISO(d.closedAt) : null,
    LastModifiedDate: tsToISO(d.lastModifiedAt || d.updatedAt || d.createdAt),
    Contact: {
      Name: d.submitterName ?? "",
      Account: { Name: d.accountName ?? "" },
    },
  };
}

async function safeNotify(fn: () => Promise<void>): Promise<void> {
  // Notification failures must never fail the underlying ticket operation.
  try {
    await fn();
  } catch (error) {
    console.error("[support-notify] notification failed:", error);
  }
}

// ---------- reads ----------

/** All tickets for a given contact (the authenticated user's own tickets). */
export async function getCases(contactId: string): Promise<SalesforceCase[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(TICKETS)
    .where("contactId", "==", contactId)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((doc) => docToCase(doc.id, doc.data() as TicketData));
}

/** All tickets across all contacts (admin view). */
export async function getAllCases(): Promise<SalesforceCase[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(TICKETS)
    .orderBy("createdAt", "desc")
    .limit(500)
    .get();
  return snap.docs.map((doc) => docToCase(doc.id, doc.data() as TicketData));
}

/** A single ticket by document id. */
export async function getCaseById(caseId: string): Promise<SalesforceCase | null> {
  const db = getAdminDb();
  const doc = await db.collection(TICKETS).doc(caseId).get();
  if (!doc.exists) return null;
  return docToCase(doc.id, doc.data() as TicketData);
}

/**
 * Adjacent ticket ids (prev/next) for detail-page navigation.
 * Ordered by ticketNumber DESC (stable, unique) to match the old behavior that
 * fixed same-timestamp navigation skips. Scoped to a contact unless admin.
 */
export async function getAdjacentCaseIds(
  caseId: string,
  contactId?: string
): Promise<{ prevCaseId: string | null; nextCaseId: string | null }> {
  const db = getAdminDb();
  const base = db.collection(TICKETS);
  const snap = contactId
    ? await base.where("contactId", "==", contactId).orderBy("ticketNumber", "desc").get()
    : await base.orderBy("ticketNumber", "desc").get();

  const ids = snap.docs.map((d) => d.id);
  const i = ids.indexOf(caseId);
  if (i === -1) return { prevCaseId: null, nextCaseId: null };

  return {
    prevCaseId: i > 0 ? ids[i - 1] : null,
    nextCaseId: i < ids.length - 1 ? ids[i + 1] : null,
  };
}

/** Comments (thread) for a ticket, newest first (matches old ordering). */
export async function getCaseComments(caseId: string): Promise<CaseComment[]> {
  const db = getAdminDb();
  const snap = await db
    .collection(TICKETS)
    .doc(caseId)
    .collection("comments")
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((doc) => {
    const c = doc.data() as {
      body?: string;
      authorName?: string;
      isInternal?: boolean;
      createdAt?: Timestamp;
    };
    return {
      Id: doc.id,
      CommentBody: c.body ?? "",
      CreatedDate: tsToISO(c.createdAt),
      CreatedBy: { Name: c.authorName ?? "" },
      IsPublished: !c.isInternal,
    };
  });
}

/** Lightweight account record for the account page. */
export async function getAccountInfo(accountId: string): Promise<SalesforceAccount | null> {
  const db = getAdminDb();
  const doc = await db.collection("accounts").doc(accountId).get();
  if (!doc.exists) return null;
  const a = doc.data() as { name?: string; phone?: string; website?: string; description?: string };
  return {
    Id: accountId,
    Name: a.name ?? "Account",
    Phone: a.phone ?? null,
    BillingStreet: null,
    BillingCity: null,
    BillingState: null,
    BillingPostalCode: null,
    Website: a.website ?? null,
    Description: a.description ?? null,
  };
}

// ---------- writes ----------

/** Create a support ticket with an atomic sequential ticket number. */
export async function createCase(data: {
  contactId: string;
  accountId: string;
  subject: string;
  description: string;
  priority?: string;
  type?: string;
  submitterName?: string;
  submitterEmail?: string;
  accountName?: string | null;
  origin?: string;
  productKey?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const db = getAdminDb();
  try {
    const ticketRef = db.collection(TICKETS).doc();
    const counterRef = db.collection("counters").doc(TICKETS);
    const now = Timestamp.now();
    let ticketNumber = 0;

    await db.runTransaction(async (tx) => {
      const counter = await tx.get(counterRef);
      const current = counter.exists ? (counter.data()!.current as number) : 1000;
      ticketNumber = current + 1;
      tx.set(counterRef, { current: ticketNumber }, { merge: true });

      tx.set(ticketRef, {
        ticketNumber,
        ticketNumberFormatted: String(ticketNumber).padStart(8, "0"),
        subject: data.subject,
        description: data.description,
        status: "New",
        priority: data.priority || "Medium",
        type: data.type || "Issue",
        productKey: data.productKey || "bpmpro",
        contactId: data.contactId,
        accountId: data.accountId,
        accountName: data.accountName ?? null,
        submitterName: data.submitterName || "",
        submitterEmail: data.submitterEmail || "",
        origin: data.origin || "web",
        createdAt: now,
        updatedAt: now,
        lastModifiedAt: now,
        closedAt: null,
        attachments: [],
      });
    });

    // Upsert a lightweight account record for the account page.
    await db
      .collection("accounts")
      .doc(data.accountId)
      .set(
        {
          name: data.accountName || data.submitterName || "Account",
          productKey: data.productKey || "bpmpro",
          updatedAt: Timestamp.now(),
        },
        { merge: true }
      );

    const formatted = String(ticketNumber).padStart(8, "0");
    await safeNotify(() =>
      notifyNewTicket({
        ticketId: ticketRef.id,
        ticketNumber: formatted,
        subject: data.subject,
        description: data.description,
        submitterName: data.submitterName || "",
        submitterEmail: data.submitterEmail || "",
        accountName: data.accountName ?? "",
        priority: data.priority || "Medium",
        type: data.type || "Issue",
      })
    );

    return { success: true, id: ticketRef.id };
  } catch (error) {
    console.error("createCase (Firestore) error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Add a comment to a ticket and route the appropriate notification:
 *   - admin reply  -> email the submitter
 *   - customer reply -> email the support team
 * Internal-only comments send no notification.
 */
export async function addCaseComment(
  caseId: string,
  commentBody: string,
  opts?: { authorName?: string; isAdmin?: boolean; isInternal?: boolean }
): Promise<{ success: boolean; error?: string }> {
  const db = getAdminDb();
  try {
    const ticketRef = db.collection(TICKETS).doc(caseId);
    const now = Timestamp.now();
    const authorName =
      opts?.authorName || (opts?.isAdmin ? "xTriam Support" : "Customer");

    await ticketRef.collection("comments").add({
      body: commentBody,
      authorName,
      isAdmin: !!opts?.isAdmin,
      isInternal: !!opts?.isInternal,
      createdAt: now,
    });

    await ticketRef.update({
      updatedAt: now,
      lastModifiedAt: now,
      lastReplyAt: now,
      lastReplyBy: authorName,
    });

    if (!opts?.isInternal) {
      const snap = await ticketRef.get();
      const t = snap.data() as TicketData | undefined;
      if (t) {
        if (opts?.isAdmin) {
          await safeNotify(() =>
            notifyReplyToClient({
              ticketId: caseId,
              ticketNumber: t.ticketNumberFormatted ?? "",
              subject: t.subject ?? "",
              submitterEmail: t.submitterEmail ?? "",
              submitterName: t.submitterName ?? "",
              body: commentBody,
            })
          );
        } else {
          await safeNotify(() =>
            notifyCommentToSupport({
              ticketId: caseId,
              ticketNumber: t.ticketNumberFormatted ?? "",
              subject: t.subject ?? "",
              authorName,
              body: commentBody,
              accountName: t.accountName ?? "",
            })
          );
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("addCaseComment (Firestore) error:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

/** Update a ticket's status, optionally notifying the submitter. */
export async function updateCaseStatus(
  caseId: string,
  status: string,
  opts?: { notifyClient?: boolean }
): Promise<{ success: boolean; error?: string }> {
  const db = getAdminDb();
  try {
    const ticketRef = db.collection(TICKETS).doc(caseId);
    const now = Timestamp.now();
    const update: Record<string, unknown> = {
      status,
      updatedAt: now,
      lastModifiedAt: now,
    };
    if (status === "Closed") update.closedAt = now;

    await ticketRef.update(update);

    if (opts?.notifyClient !== false) {
      const snap = await ticketRef.get();
      const t = snap.data() as TicketData | undefined;
      if (t?.submitterEmail) {
        await safeNotify(() =>
          notifyStatusChangeToClient({
            ticketId: caseId,
            ticketNumber: t.ticketNumberFormatted ?? "",
            subject: t.subject ?? "",
            submitterEmail: t.submitterEmail ?? "",
            submitterName: t.submitterName ?? "",
            status,
          })
        );
      }
    }

    return { success: true };
  } catch (error) {
    console.error("updateCaseStatus (Firestore) error:", error);
    return { success: false, error: "Failed to update case status" };
  }
}

// ---------- attachments (Cloud Storage) ----------

interface AttachmentMeta {
  id: string;
  title: string;
  path: string;
  fileExtension: string;
  contentSize: number;
  contentType: string;
  uploadedAt: string;
}

/**
 * Generate a short-lived v4 signed URL the browser uses to upload an attachment
 * DIRECTLY to Cloud Storage. This bypasses the serverless request-body limit
 * (Vercel caps function bodies at ~4.5 MB; a base64 photo can exceed that), and
 * keeps large file bytes off our API routes entirely. Signing is done locally
 * with the service-account private key (no iam.signBlob permission required).
 */
export async function createSignedUploadUrl(data: {
  recordId: string;
  fileName: string;
  contentType: string;
}): Promise<{ id: string; path: string; uploadUrl: string }> {
  const id = randomUUID();
  const safeName = data.fileName.replace(/[^\w.\-]/g, "_");
  const path = `support/${data.recordId}/${id}-${safeName}`;

  const [uploadUrl] = await getSupportBucket()
    .file(path)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: data.contentType,
    });

  return { id, path, uploadUrl };
}

/**
 * Record an uploaded attachment on the ticket after the browser has PUT the
 * bytes to Cloud Storage. Verifies the object exists and lives inside the
 * ticket's own folder (so a client can't register a path it doesn't own)
 * before persisting the metadata.
 */
export async function recordUploadedFile(data: {
  recordId: string;
  id: string;
  fileName: string;
  path: string;
  contentType?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Security: the path must be within this ticket's own folder.
    if (!data.path.startsWith(`support/${data.recordId}/`)) {
      return { success: false, error: "Invalid attachment path" };
    }

    const file = getSupportBucket().file(data.path);
    const [exists] = await file.exists();
    if (!exists) {
      return { success: false, error: "Uploaded file not found in storage" };
    }

    const [meta] = await file.getMetadata();

    const attachment: AttachmentMeta = {
      id: data.id,
      title: data.fileName,
      path: data.path,
      fileExtension: (data.fileName.split(".").pop() || "").toLowerCase(),
      contentSize: Number(meta.size) || 0,
      contentType: data.contentType || meta.contentType || "",
      uploadedAt: new Date().toISOString(),
    };

    await getAdminDb()
      .collection(TICKETS)
      .doc(data.recordId)
      .update({
        attachments: FieldValue.arrayUnion(attachment),
        updatedAt: Timestamp.now(),
      });

    return { success: true };
  } catch (error) {
    console.error("recordUploadedFile error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to record attachment",
    };
  }
}

/** List a ticket's attachments (SF-compatible shape). */
export async function getFilesForRecord(recordId: string): Promise<
  { Id: string; Title: string; ContentDocumentId: string; FileExtension: string; ContentSize: number }[]
> {
  const db = getAdminDb();
  const doc = await db.collection(TICKETS).doc(recordId).get();
  const attachments = (doc.data()?.attachments as AttachmentMeta[]) || [];
  return attachments.map((a) => ({
    Id: a.id,
    Title: a.title,
    ContentDocumentId: a.id,
    FileExtension: a.fileExtension,
    ContentSize: a.contentSize,
  }));
}

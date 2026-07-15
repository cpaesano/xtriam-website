# Admin Ticket Intake — Design Spec

**Status:** Deferred — future work (decisions baked in; ready to build when picked up)
**Author:** xTriam (drafted 2026-07-09)
**Project:** xtriam-website (xtriam-support portal)
**Related code:** `lib/support-store.ts`, `app/api/support/tickets/route.ts`, `lib/salesforce.ts`, `components/support/`

---

## 1. Problem

The support portal can only create a ticket for the **currently logged-in user**. The single creation path, `POST /api/support/tickets`, stamps every ticket with `session.contactId` / `session.accountId` (see `app/api/support/tickets/route.ts:68`). There is no way for the support team to open or log a ticket on behalf of a client.

In practice, most support arrives off-portal: email, phone, and Zoom walkthroughs. Those tickets never enter the system unless someone hand-writes Firestore documents (as was done for the two Palm Aluminum tickets on 2026-07-09 via a one-off script).

### Consequences today
- The portal is **not a true system of record.** Ticket history reflects only the rare self-service web submission.
- **Response-time metrics are impossible** — there is no timestamped record of when a client reported vs. when we replied.
- The **AI Assistant** gets no signal from the real support corpus (which lives in Gmail).
- Every off-portal ticket is a manual script.

## 2. Goals

1. Let an admin create a ticket on behalf of any client contact, from the portal UI.
2. Capture the **channel** the request actually came in on (Phone / Email / Zoom / Walkthrough / Web).
3. Support both **live intake** (open ticket, optionally notify the client) and **after-the-fact logging** (resolve + close in one step, no client email).
4. Reuse the existing `createCase` machinery; keep document shapes identical so the rest of the app needs no changes.
5. Admin-only, behind the existing `session.isAdmin` guard.

## 3. Non-goals

- No change to the client-facing self-service flow.
- No two-way email ingestion (Gmail replies into tickets) — separate, larger effort.
- No new auth model. Contact selection reuses Salesforce as the source of truth.

## 4. Current state (what already exists)

- **Identity source:** Portal login is phone-based against the xTriam Salesforce org (`cpaesano@xtriam.com`). `findContactByPhone()` (`lib/salesforce.ts:57`) returns `{ Id, FirstName, LastName, Email, AccountId, Account.Name }`. `contactId`/`accountId` are Salesforce IDs.
- **Admin flag:** `session.isAdmin` is set when the contact's email is in `ADMIN_EMAILS` (`app/api/auth/verify-pin/route.ts:35`).
- **Create path:** `createCase()` (`lib/support-store.ts:248`) already: allocates an atomic ticket number, builds the customer-facing code `YYYY-MM-II-RRRR`, writes the ticket doc, upserts the `accounts/{accountId}` cache record, and fires two notifications (`notifyNewTicket` to support, `notifyTicketCreatedToClient` to the submitter).
- **Status values:** `New`, `Working`, `Escalated`, `Closed` (`components/support/TicketDetail.tsx`, `app/api/support/tickets/[caseId]/route.ts`).
- **Types:** `Issue`, `Feature Request`, `Question`. **Priorities:** `Low`, `Medium`, `High`.
- **Comments:** `addCaseComment()` supports `isAdmin` / `isInternal`; a published admin comment is the resolution mechanism.

## 5. Proposed UX

A **"Log / Create Ticket"** button visible only to admins on the ticket list page. Opens a modal:

1. **Client** — a contact search box. Type a name, email, or phone; results come from Salesforce. Selecting one locks in `contactId`, `accountId`, `accountName`, `submitterName`, `submitterEmail`.
2. **Channel** — dropdown: Phone / Email / SMS / Zoom / Walkthrough / Web. Stored as `origin`. (See Decision 1.)
3. **Subject** + **Description** (required).
4. **Type** (Issue / Feature Request / Question) + **Priority** (Low / Medium / High).
5. **Internal note** — optional textarea, support-team-only, saved as an `isInternal` comment. For diagnosis/context that must not be client-visible. (See Decision 3.)
6. **Reported on** — date/time, defaults to now, editable so a ticket can be backdated to when the client actually reported it.
7. **Resolve now?** — checkbox. When checked, reveals a **Resolution** textarea; on submit the ticket is created `Closed` with the resolution added as a published support reply.
8. **Notify client** — checkbox.
   - Default **on** for a new/open ticket (sends the admin-opened acknowledgment, Decision 2).
   - Default **off** when "Resolve now" is checked (we are logging something already handled; do not email a stale acknowledgment).

## 6. Data model

No new collections. Additions to the existing ticket document:

| Field | Type | Notes |
|-------|------|-------|
| `origin` | string | Now carries the channel (`phone`, `email`, `zoom`, `walkthrough`, `web`). Already exists; today it holds the auth method. |
| `createdByAdmin` | string \| null | Email of the admin who logged it. New. Distinguishes admin-intake from self-service. |
| `onBehalf` | boolean | `true` for admin-created. New. Cheap filter for analytics. |

`createdAt` becomes settable (the "Reported on" value) instead of always `now`.

## 7. API

**New:** `GET /api/support/contacts/search?q=...` (admin-only)
- Guard: `session.isAdmin`, else 403.
- Calls a new `searchContacts(q)` in `lib/salesforce.ts` — SOQL over `Contact` by `Name`, `Email`, and phone fields, `LIMIT 10`, returning `{ Id, Name, Email, AccountId, AccountName }`.

**Modified:** `POST /api/support/tickets`
- When `session.isAdmin` **and** the body includes `onBehalfContactId`, use the supplied `contactId`/`accountId`/submitter fields instead of the session's, and honor `origin`, `createdAt`, `status`, `notify`, and optional `resolution`.
- Non-admin callers: unchanged (body overrides ignored).

## 8. Backend changes to `createCase`

Extend the input with optional fields (all default to today's behavior):

```
contactId, accountId, accountName, submitterName, submitterEmail  // already present
origin?        // channel
createdAt?     // defaults to now
status?        // defaults to "New"; may be "Closed"
notify?        // defaults to true; false suppresses BOTH notifications
resolution?    // if present, added as a published admin comment
createdByAdmin?, onBehalf?
```

Behavior:
- If `status === "Closed"`, also set `closedAt = createdAt-or-now` and `replyCount` accordingly.
- If `notify === false`, skip `notifyNewTicket` and `notifyTicketCreatedToClient`.
- If `resolution` present, write a published (`isAdmin: true, isInternal: false`) comment after the ticket doc.

This is the same shape the 2026-07-09 backfill script produced by hand; folding it into `createCase` retires that script.

## 9. Edge cases

- **Shared office phone.** Danny Booty and Michele Diaz share `954-421-8572`. Login-by-phone resolves to one contact (`LIMIT 1`), so a client may see the other's ticket in "my tickets." Admin intake via the **contact picker** sidesteps this for creation, but do not build per-person metrics that assume one phone = one person. Consider showing account-scoped tickets rather than contact-scoped in a later pass.
- **Contact not in Salesforce.** If a caller has no SF contact, either (a) block with a clear message ("add them in Salesforce first"), or (b) a later enhancement to create the SF contact inline. Phase 1: block.
- **Account cache.** `createCase` already upserts `accounts/{accountId}`; admin intake gets this for free.
- **Notification correctness.** The single most important toggle. A stale "we received your ticket" email for something closed a week ago erodes trust. Default off when resolving.

## 10. Phasing & effort

**Phase 1 (~1 day):**
- `searchContacts()` + `/api/support/contacts/search` (~2 hrs)
- `createCase` extensions (~2 hrs)
- Admin intake modal with contact picker, channel, resolve-now, notify toggle (~3–4 hrs)
- `isAdmin` guards + manual test (~1 hr)

**Phase 2 (later, optional):**
- Response-time reporting off `createdAt` vs first admin reply.
- Channel analytics (`onBehalf` / `origin`).
- Account-scoped ticket visibility to fix the shared-phone overlap.
- Inline SF contact creation.

## 11. Decisions

1. **Channel list: Phone / Email / SMS / Zoom / Walkthrough / Web — include SMS.**
   Rationale: xTriam already runs SMS-based support (the AI Support Operator over SMS, and RingCentral texting at Castle/FSPU/PAG). SMS is a real, distinct intake channel we will want to measure separately, so it belongs in the set from day one. Web stays in the list so an admin can also log a ticket a client raised through the site outside the normal flow.

2. **Admin-opened live tickets use a distinct acknowledgment template.**
   Rationale: the self-service acknowledgment reads as "thanks for submitting your ticket," which is wrong when *we* opened it on the client's behalf after a call or email. Use a short variant, "We've logged your request and opened ticket <code>," so the client is not told they did something they didn't. Reuse the existing send plumbing in `lib/support-notify.ts`; only the template body differs. When "Resolve now" is checked, no acknowledgment fires at all (notify defaults off).

3. **Include an optional internal-only note at creation.**
   Rationale: when logging a phone/Zoom ticket, the admin usually has diagnosis or context that should not be client-visible (root cause, account history, who to follow up with). Capturing it at creation, rather than as a separate step afterward, keeps the record complete. Implemented as an `isInternal: true` comment, which the existing thread already supports and hides from the client view. Low cost, high value for continuity.

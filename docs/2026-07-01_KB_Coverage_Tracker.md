# bpmPro Knowledge Base — Coverage Tracker

**Purpose:** the single source of truth for **which bpmPro features are documented in the external AI-support knowledge base** (the tutorials in `content/tutorials-data.json`, loaded by `lib/knowledge-loader.ts`) — and which are **gaps**. Keeps the KB from silently drifting behind what we ship.

**How to use / maintain:**
- When a **new feature ships** in bpmPro, add a row here and set status. If it's user-facing, it needs a tutorial.
- When a tutorial is **written/updated**, flip the status to ✅ and set the "KB Updated" date.
- Review this whenever cutting a package version (the bpmPro release and the KB should move together).

**Status legend:** ✅ Covered · 🟡 Stale (feature changed materially since the tutorial was written) · 🔴 Gap (no tutorial) · ⚪ N/A (not user-facing)

> **KB snapshot as of this doc:** 26 tutorials, **all last-updated `2026-05-29`.** Everything shipped after that date is unreviewed for KB coverage — that's the source of the gaps below.

---

## 🔴 Priority gaps — new modules shipped since 2026-05-29, NO coverage

| Feature | Shipped | KB Tutorial | Status | Notes |
|---|---|---|---|---|
| **RingCentral Call Logging & Call History** | Jun 2026 (v8.13–8.16) | — | 🔴 | Whole module: Call Logs tab, Call History on Account/Contact, Missed Calls list, recording playback, enrichment. Zero coverage. First live client: Castle. |
| **Customer Follow-Up Console** | Jun 2026 (v8.13+) | — | 🔴 | Thank-you emails + review requests, call logging, review platforms, CC sales rep/PM, standalone tab + Sales Hub entry. Zero coverage. |
| **My Signature (Sales Person Signature on file)** | 2026-06-17 | — | 🔴 | The company/rep **counter-signature** that goes on every e-signed Sales Document. NOT the same as "Creating Your Email Signature" (that's the email footer). ⚠️ Also verify reps can actually *upload* it (feature vs bug). |
| **Interactive "Before You Sign" clauses + Clause Manager** | 2026-06-16/17 | (partial: "Customizing Sales Document Clauses") | 🔴 | The e-sign interview clauses (Acknowledge / Yes-No / Initials) + the "Show in Before You Sign" flag. The existing clauses tutorial predates this. |

---

## 🟡 Stale — feature changed materially after its tutorial was written

| Feature | Shipped | KB Tutorial | Status | Notes |
|---|---|---|---|---|
| **Timesheet GPS Clock In/Out** | 2026-06-16 (v8.11) | "Timesheet Console — Who Sees What" (2026-05-29) | 🟡 | Real-time GPS punch (Clock In/Out) is new; the console tutorial predates it. |
| **CSV import — header-based, multi-vendor** | 2026-06-15 (v8.16) | "Importing from PGT Industries" (2026-05-29) | 🟡 | New header-name matching + added vendors (Eurocraft, Mr Glass, Air Master, etc.). The PGT tutorial is now one of several. |
| **Service Tickets — intake wizard / calendar sync / lifecycle** | 2026-06-01 | "Service Tickets" (2026-05-29) | 🟡 | Intake wizard, board search/completed view, schedule-time calendar Event, lifecycle path all shipped just after the tutorial. |

---

## ✅ Covered — the 26 existing tutorials (all `2026-05-29`)

| Area | Tutorial | Status |
|---|---|---|
| Getting started | Introduction to bpmPro | ✅ |
| Accounts & Contacts | Creating Accounts · Creating Contacts · Merging Duplicate Contacts | ✅ |
| Leads | Lead Quick Start Wizard | ✅ |
| Sales team | Adding a New Sales Person · Making a Sales Person Inactive | ✅ |
| Sales Documents | Creating Sales Documents · Creating Special Discounts · Cost and Price Overrides · Adding Chargebacks to Sales Documents · Managing Product and Labor Items · Customizing Sales Document Clauses · Printing Sales Documents · Customize Sales Document Report View | ✅ (clauses now 🟡 — see above) |
| E-signature | Creating Your Email Signature | ✅ (email sig only — My Signature is a 🔴 gap) |
| Timesheets | Timesheet Console — Who Sees What | ✅ (GPS punch now 🟡) |
| Service | Service Tickets | ✅ (enhancements now 🟡) |
| Reports | How to Build a Sales Cycle Duration Report · Filtering Sales Reports by SalesDoc Status | ✅ |
| Setup / config | Setting Up Building Materials · Mapping Dealer Items in bpmPro · Adding Work Assignment Calendars | ✅ |
| Imports | Importing from PGT Industries | ✅ (now 🟡 — see above) |
| Installation | Installation Notes · Updating Product Installation Items | ✅ |

---

## Backlog — tutorials to write (priority order)

1. **My Signature** (Sales Person Signature) — reps are blocked/confused today; highest urgency.
2. **RingCentral Call Logging & Call History** — new module, live on Castle.
3. **Customer Follow-Up Console** — new module.
4. **Before You Sign clauses + Clause Manager** — e-sign interview.
5. **Timesheet GPS Clock In/Out** — update/extend the Timesheet Console tutorial.
6. **CSV import (multi-vendor, header-based)** — generalize the PGT tutorial.
7. **Service Ticket intake wizard** — update the Service Tickets tutorial.

---

*Maintainer note: the KB content lives in `xtriam-website/content/tutorials-data.json`. bpmPro feature history is in `bpmpro-package/` git log + `docs/releases/` + `docs/SUBSCRIBER_ORG_UPGRADE_CHECKLIST.md`. When in doubt about what shipped, `git log --since=<KB last-updated date> --grep=feat` in bpmpro-package.*

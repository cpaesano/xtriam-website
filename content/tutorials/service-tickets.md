---
title: "Service Tickets"
description: "How to create, schedule, complete, and notify on service tickets in bpmPro — start to finish."
category: operations
keywords:
  - service ticket
  - service tickets board
  - dispatch
  - schedule
  - technician
  - warranty
  - repair
  - resolution
  - reopen
---

# Service Tickets

How to create, schedule, complete, and notify on service tickets — start to finish.

> **Who this is for:** Dispatchers, service coordinators, technicians, customer service reps, owners.

---

## 1. Where to find Service Tickets

From the bpmPro app, click the **Service Tickets** tab in the top navigation. This opens the **Service Tickets Board** — your home base for managing service work.

![The Service Tickets Board, your home base for managing service work](/images/tutorials/service_tickets_board_landing.jpeg)

---

## 2. The Service Tickets Board at a glance

The board has three active columns:

- **New** (blue) — Tickets just created, waiting to be scheduled
- **Scheduled** (teal) — Tickets with a date/time assigned
- **In Progress** (amber) — Tickets currently being worked on

Below the columns is a **Recently Completed** strip — tickets closed out in the last 7 days (toggle to 14 days using the filter).

Each card shows the ticket number, account, problem summary, priority, and how long it's been open. Cards in red are overdue.

![A ticket card on the board — number, account, summary, priority chip, days open](/images/tutorials/service_tickets_card_closeup.jpeg)

---

## 3. Creating a new ticket

Click **+ New Ticket** in the top-right of the board. A small form opens with just the essentials:

- **Account** (required) — Which customer is this for?
- **Problem Summary** (required) — One sentence describing the issue
- **Service Type** — Repair, Warranty, Install, etc.
- **Priority** — Defaults to Normal; change to High or Emergency if urgent
- **Assigned To** — Who will own this ticket
- **Source** — Phone, email, walk-in, etc.

![The New Ticket form — just the essentials at intake](/images/tutorials/service_tickets_new_ticket_modal.jpeg)

---

## 4. The Service Ticket Console

After saving, you land on the ticket's record page. The top is the **Service Ticket Console** — a focused view of everything that matters for this ticket.

![The Service Ticket Console — every section organized by ticket lifecycle](/images/tutorials/service_tickets_console_read_mode.jpeg)

The console is organized in the natural order of how a ticket lifecycle plays out:

1. **Problem Summary** — what the ticket is about
2. **Ticket Information** — account, contact, service type
3. **Assignment & Project** — who's working it, optional project link
4. **Status & Urgency** — current state at a glance
5. **Intake** — when the call came in, target response date
6. **Scheduling** — when the work happens
7. **Service Location** — where the work happens
8. **Problem Detail** — long-form description
9. **Resolution** — what was done when complete

---

## 5. The Next Action banner

At the very top of the console is the **Next Action banner**. It tells you what to do next and gives you a one-click button to do it.

![The Next Action banner morphs by status — always shows the suggested next step](/images/tutorials/service_tickets_new_banner.jpeg)

The banner changes as the ticket moves through its lifecycle:

| Stage | Next Action |
|---|---|
| New | Schedule Now — opens a form to pick date/time |
| Scheduled | Start Work — one click, no form |
| In Progress | Complete Ticket — opens a form for completion date + resolution notes |
| Completed | Reopen — reverts to In Progress if you need to do more work |

---

## 6. Scheduling a ticket

Click **Schedule Now**. A small modal opens with sensible defaults — tomorrow at 9:00 AM, ending at 11:00 AM.

![Pick the scheduled window. End time is optional](/images/tutorials/service_tickets_schedule_modal.jpeg)

Adjust the times if needed, then click **Schedule**. The ticket moves to Scheduled status, and the Scheduling section of the console fills in with the dates.

![After scheduling, the banner advances to the next step](/images/tutorials/service_tickets_scheduled_banner.jpeg)

> **Automatic email:** When a ticket moves to Scheduled, bpmPro automatically sends an email to the assigned tech and the primary contact. You don't have to do anything — the subject will end with `(Auto)`.

---

## 7. Starting work

When the technician arrives at the job, click **Start Work** in the Next Action banner. One click moves the ticket to **In Progress**. No form, no email — just a status update.

![In Progress — the banner is ready for the next step](/images/tutorials/service_tickets_in_progress_banner.jpeg)

---

## 8. Completing a ticket

When the work is done, click **Complete Ticket** in the banner. The modal opens with the completed date pre-filled to "now" and an optional resolution-notes field.

![Add resolution notes if you want — they're optional but useful for history](/images/tutorials/service_tickets_complete_modal.jpeg)

After saving, the ticket moves to **Completed** status. The Resolution section of the console shows the completed date + your notes.

![The Resolution section preserves what was done — visible even if you reopen later](/images/tutorials/service_tickets_resolution_section.jpeg)

> **Automatic email:** When a ticket moves to Completed, bpmPro again sends an automatic email to the assigned tech + primary contact — letting them know the work is done. Subject ends with `(Auto)`.

---

## 9. Editing ticket details

Outside of the Next Action workflow, you can edit any field on the ticket. Click **Edit** in the console header or footer.

![Edit mode — every section's content becomes input fields](/images/tutorials/service_tickets_edit_mode.jpeg)

In edit mode:

- Every section's content swaps from read-only text to input fields
- Required fields (Account, Problem Summary) have a red `*` indicator
- The Assigned To dropdown is a pre-loaded list of active bpmPro users
- Click **Save** at the top OR bottom of the console to commit changes

The first option in the Assigned To dropdown is **"— Unassigned —"** which lets you clear an assignment without searching.

![The Assigned To dropdown — active bpmPro users only](/images/tutorials/service_tickets_assigned_to_dropdown.jpeg)

---

## 10. Linking the ticket to a project

A Service Ticket can be linked to a project so service activity ties back to ongoing project history. The **Assignment & Project** section on the console manages this:

- **Linked state**: shows the project name + buttons to View or Change
- **Unlinked state**: shows three buttons — Link to a Suggested Project (if the account has exactly one), Link to Existing Project (picker), or Create Service Project (placeholder)

![Three peer choices for linking. The suggested project leads when the account has exactly one](/images/tutorials/service_tickets_project_section_unlinked.jpeg)

> **Tip:** If your customer has no project in bpmPro (the original install predates the system), click **Create Service Project** to make a placeholder. You'll need this if you ever order parts for the ticket.

---

## 11. Sending a notification

Click **Send Notification** in the console action bar to email an update to anyone — your team, the customer, or an ad-hoc email address.

![Step 1 — pick recipients from internal users, external contacts, or ad-hoc emails](/images/tutorials/service_tickets_send_notification_step1.jpeg)

The wizard has two steps:

**Step 1 — Pick recipients.** Three sources:

- Internal Recipients (bpmPro Users)
- External Recipients (Contacts on the account + Primary Contact)
- Ad-hoc email (just type an address)

**Step 2 — Compose and preview.**

![Step 2 — toggle sections, optionally add a personal message, preview live](/images/tutorials/service_tickets_send_notification_step2.jpeg)

Choose what to include in the email (toggle the sections), optionally type a personal message at the top, then click Send. Each recipient gets their own email — internal recipients see the full version, external recipients see a stripped variant without internal-only details.

---

## 12. The Recently Completed strip

Back on the Service Tickets Board, scroll to the bottom for the **Recently Completed** strip — tickets closed out in the last 7 days. Useful for confirming what your team wrapped up this week.

![Recently Completed — last 7 days by default, toggleable to 14](/images/tutorials/service_tickets_recently_completed.jpeg)

Change the time window using the filter at the top of the board — toggle between **Last 7 days** and **Last 14 days**.

---

## 13. Filtering the board

Use the filters at the top of the board to focus on what's yours:

- **Assignee** — see only one person's tickets
- **Priority** — focus on High or Emergency tickets
- **Service Type** — filter by Repair vs Warranty vs etc.

Your filter choices are remembered between sessions — set them once and the board opens that way next time.

![Filter once, the board remembers your preferences across sessions](/images/tutorials/service_tickets_filter_bar.jpeg)

---

## 14. Common questions

### I made a mistake — how do I undo a status change?

Use the **Reopen** button in the banner when the ticket is Completed/Closed. It moves the ticket back to In Progress and clears the Completed Date.

### Why is my Assigned To dropdown missing someone?

The dropdown only shows active human users with a bpmPro license. Inactive users, community users, and system accounts are filtered out by design.

### I dragged a card on the board — did it save?

Yes. A toast in the top-right of the screen confirms the move. The card's column changes immediately.

### I changed status to Scheduled but the calendar fields are blank — is something wrong?

A warning will appear inside the Scheduling section. Click the **Schedule Now** button in the Next Action banner at the top to set the dates properly.

### How do I create a ticket for an account that doesn't have a project in bpmPro yet?

Create the ticket normally. When you later need to attach a Product Order, use **Create Service Project** in the Project section — bpmPro will make a placeholder project automatically.

### I don't see Service Tickets in my nav bar.

It may be in the **More** dropdown the first time you load the app. Once you click it, it pins to the main nav.

---

## 15. Cheat sheet

| What you want to do | How |
|---|---|
| Create a new ticket | **+ New Ticket** on the board |
| Schedule a ticket | Banner → **Schedule Now** |
| Start work | Banner → **Start Work** |
| Complete a ticket | Banner → **Complete Ticket** |
| Reopen a closed ticket | Banner → **Reopen** |
| Edit ticket details | Console → **Edit** button (header or footer) |
| Reassign to another person | Edit → Assigned To dropdown |
| Send a notification email | Console → **Send Notification** |
| Link to a project | Project section → **Link to Existing Project** |
| Find a specific ticket | Board filters at top, or App Launcher → Service Tickets list view |

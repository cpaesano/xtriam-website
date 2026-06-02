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

You can also create a ticket without leaving whatever you're working on: the **New Service Ticket** item lives on the **utility bar** at the bottom of the screen. This is built for taking a call live — open it, log the ticket, and the panel minimizes itself when you're done. (See section 3.)

---

## 2. The Service Tickets Board at a glance

The board has three active columns:

- **New** (blue) — Tickets just created, waiting to be scheduled
- **Scheduled** (teal) — Tickets with a date/time assigned
- **In Progress** (amber) — Tickets currently being worked on

Below the columns is a **Recently Completed** strip — tickets closed out recently, with a time window you can widen to 7 days, 14 days, or All (see section 12).

Each card shows the ticket number, account, problem summary, priority, and how long it's been open. Cards in red are overdue.

![A ticket card on the board — number, account, summary, priority chip, days open](/images/tutorials/service_tickets_card_closeup.jpeg)

At the top of the board is a **search box**. Type any part of a ticket number, account name, problem summary, or assignee to filter the board instantly. Search works alongside the assignee, priority, and service-type filters (see section 13).

---

## 3. Creating a new ticket — the intake wizard

Creating a ticket is a guided **two-step wizard**, optimized for taking the call live. Open it two ways:

- **Utility bar** (bottom of the screen) → **New Service Ticket**. The wizard appears right there; after you create the ticket, the panel minimizes itself.
- **Service Tickets board** → **+ New Ticket** in the top-right. This opens the New Service Ticket tab hosting the same wizard.

The wizard renders inline — it is not a pop-up modal.

### Step 1 — Who is reporting this ticket?

A single search box finds the caller by **name or phone**, across both Accounts and Contacts.

- Pick a **Contact** and the wizard attaches both their account and that contact as the ticket's primary contact.
- No match? Click **Create new account** to capture name, **caller type** (Homeowner or Contractor), phone, and address right there. The new account is created as a Client, and the caller type is recorded on the account's Description.

### Step 2 — Ticket details

- **Problem Summary** (required) — one sentence describing the issue
- **Service Type** (required) — Repair, Warranty, Install, etc.
- **Priority** (required) — defaults to **Normal**; change to High or Emergency if urgent
- **Primary contact** (optional)
- **Service address** — pre-filled from the account

**Create Ticket** stays disabled until Problem Summary, Service Type, and Priority are filled. On save, the wizard opens the new ticket. **Ticket Source** defaults to Phone and the **Call-In Date** is set automatically.

![Step 2 of the intake wizard — the ticket details](/images/tutorials/service_tickets_new_ticket_modal.jpeg)

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

## 5. The lifecycle progress path

At the top of the console is a color-coded **progress path** that shows where the ticket stands at a glance:

**New → Scheduled → In Progress → Completed**

Completed steps are green, the current step is highlighted, and upcoming steps are muted.

![The progress path at the top of the console shows the ticket's current stage](/images/tutorials/service_tickets_new_banner.jpeg)

Each stage carries a one-click action, and you can jump the ticket straight to any stage by clicking its pill:

| Stage | One-click action |
|---|---|
| New | Schedule Now — opens a form to pick date/time and assign a tech |
| Scheduled | Start Work — one click, no form |
| In Progress | Complete Ticket — opens a form for completion date + resolution notes |
| Completed | Reopen — reverts to In Progress if you need to do more work |

A **canceled** ticket shows a "Canceled" badge with a Reopen option instead of the path. A completed or closed ticket shows the full path in green.

---

## 6. Scheduling a ticket and assigning a technician

Click **Schedule Now**. A small modal opens with sensible defaults — tomorrow at 9:00 AM, ending at 11:00 AM.

![Pick the scheduled window and the technician. End time is optional](/images/tutorials/service_tickets_schedule_modal.jpeg)

The Schedule modal includes an **Assigned To** picker, so you set the technician at the same moment you pick the window. Adjust the times if needed, choose the tech, then click **Schedule**. The ticket moves to Scheduled status, and the Scheduling section of the console fills in with the dates.

> **Schedule without a tech?** Scheduling with no assignee shows a soft warning, but you can still click **Schedule anyway** if you don't know who's going yet.

![After scheduling, the progress path advances to the next step](/images/tutorials/service_tickets_scheduled_banner.jpeg)

> **It lands on the tech's calendar.** When a ticket has an assignee and a scheduled start, bpmPro creates a standard Salesforce calendar **Event** on that technician's calendar, titled `Service Visit: <Account> (SVC-####)`. The event's **Related To** links back to the ticket, so the tech is one click from the calendar to the full ticket. It updates if you reschedule, moves to the new owner if you reassign, and is removed if the ticket is canceled or unassigned.
>
> This is the standard Salesforce calendar — not the bpmPro **Schedule** calendar, which is for record activity dates like product orders, inspections, and permits.

> **Automatic email:** When a ticket moves to Scheduled, bpmPro also sends an email to the assigned tech and the primary contact. You don't have to do anything — the subject will end with `(Auto)`.

---

## 7. Starting work

When the technician arrives at the job, click **Start Work** on the progress path. One click moves the ticket to **In Progress**. No form, no email — just a status update.

![In Progress — the progress path is ready for the next step](/images/tutorials/service_tickets_in_progress_banner.jpeg)

---

## 8. Completing a ticket

When the work is done, click **Complete Ticket** on the progress path. The modal opens with the completed date pre-filled to "now" and an optional resolution-notes field.

![Add resolution notes if you want — they're optional but useful for history](/images/tutorials/service_tickets_complete_modal.jpeg)

After saving, the ticket moves to **Completed** status. The Resolution section of the console shows the completed date + your notes.

![The Resolution section preserves what was done — visible even if you reopen later](/images/tutorials/service_tickets_resolution_section.jpeg)

> **Automatic email:** When a ticket moves to Completed, bpmPro again sends an automatic email to the assigned tech + primary contact — letting them know the work is done. Subject ends with `(Auto)`.

---

## 9. Editing ticket details

Outside of the progress-path actions, you can edit any field on the ticket. Click **Edit** in the console header or footer.

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

## 12. The Completed view

Back on the Service Tickets Board, scroll to the bottom for the **Recently Completed** strip — tickets your team has closed out. Useful for confirming what got wrapped up.

![Recently Completed — switch between 7 days, 14 days, and All](/images/tutorials/service_tickets_recently_completed.jpeg)

Change the time window using the toggle: **7 days**, **14 days**, or **All**. Long lists page in — you'll see a "Showing X of Y" count with a **Load more** button. To work the completed tickets in a full Salesforce list, click **Open in list view**, which opens the standard "Completed Service Tickets" list view.

---

## 13. Filtering the board

Use the filters at the top of the board to focus on what's yours:

- **Search** — type any part of a ticket number, account name, problem summary, or assignee to filter the board instantly
- **Assignee** — see only one person's tickets
- **Priority** — focus on High or Emergency tickets
- **Service Type** — filter by Repair vs Warranty vs etc.

Search and the filters combine, so you can narrow to one rep's High-priority warranty tickets in a couple of clicks. Your filter choices are remembered between sessions — set them once and the board opens that way next time.

![Filter once, the board remembers your preferences across sessions](/images/tutorials/service_tickets_filter_bar.jpeg)

---

## 14. Common questions

### I made a mistake — how do I undo a status change?

Use the **Reopen** button on the progress path when the ticket is Completed, Closed, or Canceled. It moves the ticket back to In Progress and clears the Completed Date.

### Will the scheduled visit show on the technician's calendar?

Yes. As long as the ticket has an assignee and a scheduled start, bpmPro creates an Event on that technician's Salesforce calendar titled `Service Visit: <Account> (SVC-####)`. Its Related To links back to the ticket. Reschedule, reassign, or cancel the ticket and the event follows along automatically.

### Why is my Assigned To dropdown missing someone?

The dropdown only shows active human users with a bpmPro license. Inactive users, community users, and system accounts are filtered out by design.

### I dragged a card on the board — did it save?

Yes. A toast in the top-right of the screen confirms the move. The card's column changes immediately.

### I changed status to Scheduled but the calendar fields are blank — is something wrong?

A warning will appear inside the Scheduling section. Click **Schedule Now** on the progress path at the top to set the dates properly.

### Create Service Project gave a "Server Error" — what happened?

That was fixed. Older versions could fail to create a Service Project on orgs whose Lead Source picklist had no "Service" value. bpmPro now handles any Lead Source configuration, so make sure your org is on the latest version and try again.

### How do I create a ticket for an account that doesn't have a project in bpmPro yet?

Create the ticket normally. When you later need to attach a Product Order, use **Create Service Project** in the Project section — bpmPro will make a placeholder project automatically.

### I don't see Service Tickets in my nav bar.

It may be in the **More** dropdown the first time you load the app. Once you click it, it pins to the main nav.

---

## 15. Cheat sheet

| What you want to do | How |
|---|---|
| Create a ticket while on a call | Utility bar → **New Service Ticket** (or **+ New Ticket** on the board) |
| Schedule a ticket + assign a tech | Progress path → **Schedule Now** → set window + Assigned To |
| Start work | Progress path → **Start Work** |
| Complete a ticket | Progress path → **Complete Ticket** |
| Jump a ticket to any stage | Click that stage's pill on the progress path |
| Reopen a closed or canceled ticket | Progress path → **Reopen** |
| Edit ticket details | Console → **Edit** button (header or footer) |
| Reassign to another person | Edit → Assigned To dropdown (or the Schedule modal) |
| Send a notification email | Console → **Send Notification** |
| Link to a project | Project section → **Link to Existing Project** |
| Find a specific ticket | Board **search box**, or App Launcher → Service Tickets list view |
| Pull up older completed tickets | Completed view → **All**, or **Open in list view** |

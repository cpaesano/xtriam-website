---
title: "Service Tickets"
keywords:
  - service ticket
  - service tickets board
  - service ticket wizard
  - new service ticket
  - service ticket intake
  - caller intake
  - utility bar
  - dispatch
  - schedule
  - assign technician
  - service visit calendar
  - progress path
  - technician
  - warranty
  - repair
  - resolution
  - reopen
  - cancel ticket
  - create service project
category: "operations"
tutorialUrl: "/tutorials/service-tickets"
---

Service Tickets

# Service Tickets

How to create, schedule, complete, and notify on service tickets — start to finish.

> **Who this is for:** Dispatchers, service coordinators, technicians, customer service reps, owners.

---

## 1. Where to find Service Tickets

From the bpmPro app, click the **Service Tickets** tab in the top navigation to open the **Service Tickets Board** — your home base for managing service work. You can also create a ticket from anywhere using the **New Service Ticket** item on the utility bar at the bottom of the screen.

---

## 2. The Service Tickets Board at a glance

The board has three active columns:

- **New** (blue) — Tickets just created, waiting to be scheduled
- **Scheduled** (teal) — Tickets with a date/time assigned
- **In Progress** (amber) — Tickets currently being worked on

A **search box** at the top filters the board by ticket number, account name, problem summary, or assignee, and combines with the assignee, priority, and service-type filters. Below the columns is a **Completed** strip with a 7 days / 14 days / All toggle, paging ("Showing X of Y" + Load more), and an "Open in list view" link.

Each card shows the ticket number, account, problem summary, priority, and how long it's been open. Cards in red are overdue.

---

## 3. Creating a new ticket (intake wizard)

Creating a ticket is a guided **two-step wizard**, built for taking the call live. Open it from the **New Service Ticket** item on the utility bar, or **+ New Ticket** on the board.

- **Step 1 — Who is reporting this ticket?** One search box finds the caller by name or phone across Accounts and Contacts. Picking a Contact attaches both the account and that contact. No match? Click **Create new account** to capture name, caller type (Homeowner / Contractor), phone, and address; the new account is created as a Client.
- **Step 2 — Ticket details:** Problem Summary (required), Service Type (required), Priority (required, defaults to Normal), optional primary contact, and the service address pre-filled from the account. Create Ticket stays disabled until the required fields are set. Ticket Source defaults to Phone and the Call-In Date is set automatically.

---

## 4. The Service Ticket Console and progress path

After saving, you land on the ticket's record page. The top is the **Service Ticket Console**, which shows a color-coded **progress path**: New → Scheduled → In Progress → Completed. Completed steps are green, the current step is highlighted, upcoming steps are muted.

- Each stage has a one-click action: Schedule Now, Start Work, Complete Ticket, or Reopen.
- Click any stage pill to jump the ticket directly to that stage.
- A canceled ticket shows a "Canceled" badge with a Reopen option instead of the path.

---

## 5. Scheduling, assignee, and the calendar

Click **Schedule Now** (or the Scheduled stage pill). The modal includes an **Assigned To** picker, so you set the technician while picking the window. Scheduling with no assignee shows a soft warning but is still allowed.

When a ticket has an assignee and a scheduled start, bpmPro creates a standard Salesforce calendar **Event** on the assignee's calendar titled "Service Visit: <Account> (SVC-####)". The event's Related To links back to the ticket, and it updates on reschedule, moves owner on reassignment, and is removed if the ticket is canceled or unassigned.

---

Full Tutorial:
For the complete step-by-step guide with screenshots, visit: /tutorials/service-tickets

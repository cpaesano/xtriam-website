---
title: "What's New in bpmPro - June 2026"
keywords:
  - whats new
  - what's new
  - new features
  - recent updates
  - changelog
  - release notes
  - latest version
  - v8.10
  - service ticket
  - service tickets
  - service ticket wizard
  - new service ticket
  - service ticket intake
  - service ticket board
  - service ticket progress path
  - service ticket calendar
  - service visit calendar
  - schedule service ticket
  - assign technician
  - create service project
  - caller intake
  - utility bar
category: "general"
---

What's New in bpmPro - June 2026

Overview:
This summarizes the customer-facing changes in v8.10 (June 2026). This release adds intake, scheduling, calendar, and board features to the Service Ticket module.

How to Access the Full Page:
The full What's New page lives in the support portal at xtriam.com/support/whats-new. It has a search box and an expandable timeline. The full Service Tickets tutorial is at xtriam.com/support/tutorials/service-tickets.

Headline Themes:

1. New Service Ticket Intake Wizard
A guided two-step form for creating a Service Ticket, built for taking a call live.
- Step 1 - Who is reporting this ticket? A single search box finds the caller by name or phone across Accounts and Contacts. Picking a Contact attaches both the account and that contact as the ticket's primary contact. If there is no match, click "Create new account" to capture name, caller type (Homeowner or Contractor), phone, and address inline. The new account is created as a Client.
- Step 2 - Ticket details: Problem Summary (required), Service Type (required), Priority (required, defaults to Normal), an optional primary contact, and the service address pre-filled from the account. Create Ticket stays disabled until the required fields are set. On save it opens the new ticket.
- Ticket Source defaults to Phone and the Call-In Date is set automatically.
- Where to open it: the "New Service Ticket" item on the utility bar at the bottom of the screen, or the "+ New Ticket" button on the Service Tickets board. The wizard renders inline, not as a pop-up modal. After a ticket is created from the utility bar, the panel minimizes itself.

2. Service Ticket Lifecycle Progress Path
The Service Ticket Console on the ticket record page now shows a color-coded progress path - New, then Scheduled, then In Progress, then Completed - instead of the single next-action banner it showed before.
- Completed steps are green, the current step is highlighted, and upcoming steps are muted.
- Each stage has a one-click action: Schedule Now, Start Work, Complete Ticket, or Reopen.
- Click any stage pill to jump the ticket directly to that stage.
- A canceled ticket shows a "Canceled" badge with a Reopen option instead of the path. A closed or completed ticket shows the full path in green.

3. Schedule a Visit with Assignee and Calendar Event
Scheduling now captures the technician and creates a calendar event at the same time.
- The Schedule action includes an Assigned To picker, so the technician is assigned at the moment of scheduling. Scheduling with no assignee shows a soft warning ("Schedule anyway") but is still allowed.
- When a ticket has an assignee and a scheduled start, a standard Salesforce calendar Event is created on the assignee's calendar, with the subject "Service Visit: <Account> (SVC-####)". It updates on reschedule, changes owner on reassignment, and is removed if the ticket is canceled or unassigned.
- The calendar event's Related To links back to the Service Ticket, so you are one click from the calendar to the ticket. This is on the standard Salesforce calendar, not the bpmPro Schedule calendar (which is for record activity dates like orders, inspections, and permits).

4. Service Tickets Board - Search and Completed View
- Keyword search: a search box filters the board by ticket number, account name, problem summary, or assignee. It combines with the existing assignee, priority, and service-type filters.
- Completed view: the completed strip offers 7 days, 14 days, or All, with paging ("Showing X of Y" plus Load more) and an "Open in list view" link that opens the standard Completed Service Tickets list view.

5. Create Service Project Reliability Fix
Creating a Service Project from a Service Ticket previously could fail on orgs whose Lead Source picklist did not contain a "Service" value, surfacing as a generic Server Error. The package now resolves picklist values defensively, so Create Service Project works regardless of the org's Lead Source values.

How Do I Know What Version I Am On?

Go to Setup, then search Installed Packages, then look at the row for "bpmPro Fall 2023 v5." The version number shown there is the version your org is running.

Setup Notes for Admins:
These are admin steps after upgrade, not end-user steps. They matter if support is helping an admin enable the features.
- New Service Ticket tab: add the "New Service Ticket" Lightning tab to the app and grant tab visibility on the relevant profiles and permission sets.
- Utility bar item: the wizard ships on the package utility bar. Confirm the "New Service Ticket" item appears after upgrade. Subscriber-customized utility bars may not auto-merge.
- No data setup is needed for the calendar feature. It works as soon as a ticket has an assignee and a scheduled start.

Common Questions:

How do I create a service ticket for a customer who just called?
- Use the New Service Ticket button on the utility bar, or "+ New Ticket" on the Service Tickets board. Search the caller by name or phone, pick their account or create a new one, then fill Problem Summary, Service Type, and Priority and click Create Ticket.

The caller is not in the system. How do I add them?
- In the New Service Ticket search step, click "Create new account," enter name, caller type, phone, and address, then continue to the ticket details.

Why can't I click Create Ticket?
- Create Ticket stays disabled until Problem Summary, Service Type, and Priority are filled. Priority defaults to Normal.

How do I schedule a ticket and assign a technician?
- Click Schedule Now (or the Scheduled stage on the progress path), set the window, choose the Assigned To technician, and save. The visit appears on that technician's Salesforce calendar.

Will the scheduled visit show on the technician's calendar?
- Yes. A calendar event is created on the assignee's Salesforce calendar, and its Related To links back to the ticket.

How do I find an older completed service ticket?
- On the Service Tickets board, use the search box, or in the Completed section switch to 14 days or All, or click "Open in list view."

Creating a Service Project gave a Server Error.
- That was fixed in this release. Have the org updated to the latest bpmPro version.

What Changed vs. Prior Behavior:
- Creating a Service Ticket previously used the standard New form. The guided wizard is new.
- The Service Ticket Console previously showed a single next-action banner. It now shows the full progress path.
- Scheduling previously set only the window. It now also captures the assignee and creates the calendar event.
- The board previously had no text search and a fixed completed window. Both are now configurable.

Tips:
- The full What's New page on the support portal has a search box - try typing "service ticket," "schedule," or "calendar" to jump to the relevant entry.
- The Service Ticket module is a premium add-on to your bpmPro subscription.

---
title: "Timesheet Console — Who Sees What"
description: "Plain-English guide to the Timesheet Console visibility rules: what regular employees see, what accounting and managers see, and how to grant access. Use this to onboard your team to bi-weekly payroll review without confusion."
category: admin
---

# Timesheet Console — Who Sees What

**Who this is for:** Owners, general managers, accounting staff, and HR. Anyone who needs to know what employees can and cannot see in the Timesheet Console, and how to set up team access correctly.

**Time:** about 10 minutes to read; 5 minutes to assign permissions.

---

## The short version

The Timesheet Console serves two different audiences from the same page.

| You are… | You see |
|----------|---------|
| A regular employee | Your own timesheet, and your own pay summary for each pay period. Nothing about your coworkers. |
| Accounting / payroll / a manager who approves time | Your own timesheet **plus** every employee's timesheet, every employee's payroll, the team approval list, and CSV exports for the whole company. |

The system tells these two audiences apart by checking whether you are assigned a **permission set called "bpmPro Accounting"**. If you are, you see everything. If you are not, you only see your own data.

This document explains:

1. What each audience sees on each tab
2. How to decide who needs the bpmPro Accounting permission set
3. How to assign and remove the permission set
4. What the system protects against (so you can answer "is my hourly rate private?" with confidence)

---

## What regular employees see

When a regular employee — anyone without the bpmPro Accounting permission set — opens the Timesheet Console, this is their experience:

### My Timesheet tab

- They see **their own** timesheet for the current pay period.
- They can navigate previous and next pay periods using the arrow buttons.
- They can add, edit, and delete their own time entries while the timesheet is in Draft or Returned for Edits status.
- They can submit their timesheet for approval.
- **There is no employee dropdown.** They cannot pick another person's name and view another person's hours.

### Payroll & Reports tab

- They see a section titled **"Your Payroll"** for the current pay period.
- It shows their own time entries (date, clock in, clock out, hours, activity, project) for the period.
- It shows their own pay summary (regular hours × hourly rate, plus overtime if any, plus gross pay).
- They can navigate previous and next pay periods.
- They can export their own pay-period CSV (a paper trail of their hours).
- **They cannot see any other employee's payroll.** No multi-employee table, no totals across the team, no other employees' hourly rates.

### Team Timesheets tab

- **The tab is hidden.** Regular employees never see the Team Timesheets tab at all.

### Contact records (employee profile pages)

- On any employee Contact record, the section called **"Employee Contact Internal Setup"** — the section that contains Hourly Rate, Internal Company Role, Company Role Active, and Associated User — **is hidden.**
- Regular employees cannot see anyone's Hourly Rate, including their own, on the Contact page. *(They can see their own pay summary in the Payroll & Reports tab, which is the appropriate place.)*

---

## What accounting / managers see

When you assign the **bpmPro Accounting** permission set to a user, that user gains a different experience.

### My Timesheet tab

- An **employee dropdown** appears at the top.
- They can pick any employee in the company and view that employee's timesheet for any pay period.
- They can edit other employees' time entries, submit on their behalf, etc.
- They can also still see and edit their own.

### Payroll & Reports tab

- They see a **multi-employee overview table** showing every employee's total hours, regular hours, overtime hours, hourly rate, gross pay, and timesheet status for the selected date range.
- They can filter by status (Draft, Submitted, Approved, etc.).
- They can click any row to drill down into that employee's full pay-period detail.
- They can export the whole-company payroll CSV.
- They can also drill into any single employee and export just that employee's CSV.

### Team Timesheets tab

- **The tab is visible.**
- It shows every employee's timesheet status for the selected pay period — useful for a "who hasn't submitted yet" review on payroll day.
- A **filter bar** lets them narrow the list by:
  - **Active status** — Active employees only, Inactive only, or All
  - **Internal Role** — Operations, Sales and Estimating, Management, etc. (multi-select)
  - **Timesheet Status** — Not Started, Draft, Submitted, Approved, Returned for Edits (multi-select)
  - **Name search** — partial name match
  - **Clear Filters** button to reset
- From this tab they can approve a submitted timesheet or return it for edits, in one click.

### Contact records (employee profile pages)

- The **"Employee Contact Internal Setup"** section is visible on Employee Contact records.
- They can see and edit Hourly Rate, Internal Company Role, Company Role Active, and Associated User.
- The section is still hidden on non-employee Contacts (vendors, clients), so it doesn't clutter customer-facing records.

---

## Who needs bpmPro Accounting?

Assign the **bpmPro Accounting** permission set to anyone who:

- Reviews payroll across the team
- Approves or returns timesheets
- Sets or adjusts hourly rates
- Generates payroll CSVs for an external payroll provider (Gusto, ADP, QuickBooks Payroll, etc.)
- Audits time across employees for billing or job costing
- Is the General Manager / owner who oversees the schedule

Do **not** assign it to:

- Field installers, technicians, sales reps, or any employee whose only job in the system is logging their own hours
- New hires during their first week (assign it after they've been confirmed in role)
- Contractors / temporary staff who should not see other employees' compensation

When in doubt, leave it off. You can always add it later.

---

## How to assign bpmPro Accounting

You'll do this once per accounting / management user.

1. Click the **gear icon** at the top right and choose **Setup**.
2. In the Quick Find search box, type **Permission Sets** and click the result.
3. Find **bpmPro Accounting** in the list and click it.
4. Click **Manage Assignments** at the top of the page.
5. Click **Add Assignments**.
6. Check the box next to each user who needs full Timesheet Console access.
7. Click **Next**, then **Assign**, then **Done**.

The user will see the new tabs and dropdowns the next time they open the Timesheet Console, after a hard refresh of their browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows).

To **remove** the permission set later, follow the same path, but click the user's row on the Manage Assignments page and click **Remove Assignment**.

---

## Frequently asked questions

### Can a regular employee accidentally see someone else's hourly rate?

**No.** Hourly rates are protected on three different layers:

1. The Hourly Rate field is hidden on the Contact record page for non-Accounting users.
2. The Payroll & Reports tab does not return any other employee's data to the user's browser.
3. The system rejects any direct attempt (browser extension, URL manipulation, etc.) to retrieve another employee's data, with an error message.

The only way someone sees another employee's hourly rate is if you've explicitly assigned them the bpmPro Accounting permission set.

### What if a regular employee tampers with the page in their browser to show the hidden tabs?

The hidden tabs (Team Timesheets, the employee dropdown, etc.) are **only hidden in the user interface for clarity**. The real protection is on the server. Even if someone manipulates the page in their browser, the server checks every request for the bpmPro Accounting permission set and refuses to return data the user shouldn't see.

### Why is approval restricted to Accounting?

Approving a timesheet has compliance implications — it locks in the hours that go to payroll. Restricting it to Accounting (and the General Manager) keeps a clear audit trail of who approved what. If a regular employee could approve their own timesheet, there'd be no oversight.

### Can a manager who isn't in accounting still approve their team's timesheets?

Yes. Assign the **bpmPro Accounting** permission set to that manager. The permission set name is just a label — you don't have to be in accounting to receive it. Many companies grant it to general managers, project managers, or owners.

### What if our company runs bi-weekly pay periods on Wednesdays instead of weekly Mondays?

The Timesheet Console adapts to your payroll cadence. In **Company Settings**, set the **Pay Period Anchor Date** to any one of your historic period start dates (e.g., 2026-04-22 for a Wednesday-start) and the **Pay Period Length (Days)** to your cycle length (typically 7 or 14). The console will use those values for everyone.

See the separate [Pay Period Configuration](#) tutorial for screenshots.

### A new employee I just added isn't showing up in the team list. Why?

The Team Timesheets tab and the multi-employee Payroll table show only **active** employees by default. Make sure the new Contact record has:

- **Account.Business Internal Role** = "Owning Entity"
- **Company Role Active** = checked
- **Internal Company Role** = filled in (Operations, Sales and Estimating, etc.)

If the employee should appear under a specific Active filter, also check that filter's selection in the Team filter bar.

To see ex-employees, change the **Active** filter on the Team tab to **Inactive only** or **All**.

### Where does the system pull "current user" from?

When you open the Timesheet Console, it looks up the Contact that's linked to your User record (via the Associated User field on Contact). That Contact is treated as "you" everywhere in the console. If your User isn't linked to any Contact, the Console shows an error and asks you to contact your administrator. Have your accounting team set up the link in the **Employee Contact Internal Setup** section of your Contact record.

---

## Quick reference card

Print or screenshot this and pin it to your accounting team's wiki.

```
WHO SEES WHAT — TIMESHEET CONSOLE

  Regular employee (default)
  ─────────────────────────────
    My Timesheet            : Yes — own only
    Payroll & Reports tab   : Yes — "Your Payroll" view, own period only
    Team Timesheets tab     : Hidden
    Approve / Return        : Disabled
    Contact > Hourly Rate   : Hidden
    Multi-employee CSV      : Disabled
    Single-employee CSV     : Yes — own only

  Accounting / Manager (bpmPro Accounting permission set)
  ─────────────────────────────────────────────────────────
    My Timesheet            : Yes — own + employee dropdown to view others
    Payroll & Reports tab   : Yes — multi-employee table + drill-down
    Team Timesheets tab     : Visible — full filter bar, approval / return
    Approve / Return        : Enabled
    Contact > Hourly Rate   : Visible & editable on Employee Contacts
    Multi-employee CSV      : Enabled
    Single-employee CSV     : Enabled — any employee
```

---

## Need help?

- **Set up the bpmPro Accounting permission set or troubleshoot visibility:** contact xTriam Support at support@xtriam.com or use the chat at https://www.xtriam.com/support
- **Configure your pay period cadence:** see the [Pay Period Configuration](#) tutorial
- **Pricing or licensing questions about Timesheet Console:** contact your xTriam account manager

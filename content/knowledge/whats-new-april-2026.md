---
title: "What's New in bpmPro - April 2026"
keywords:
  - whats new
  - what's new
  - new features
  - recent updates
  - changelog
  - release notes
  - latest version
  - v7.80
  - v7.90
  - v7.96
  - v7.98
  - v7.99
  - workforce manager
  - locked sales document
  - locked deal sheet
  - customer deposit before sold
  - timesheet console
  - payroll csv
  - payroll pdf
  - es windows csv
  - linea rossa csv
  - permit fee invoice
  - accepted status
  - close deal checklist
  - picbuh
  - clone plus safety
category: "general"
---

What's New in bpmPro - April 2026

Overview:
This summarizes the customer-facing changes between v7.80 (March 2026) and v7.99 (April 28, 2026). Released across 19 versions over about six weeks.

How to Access the Full Page:
The full What's New page lives in the support portal at xtriam.com/support/whats-new. It has a search box and an expandable timeline.

Headline Themes:

1. Locked Sales Documents and Deal Sheets after Sold/Booked (v7.98)
Once a Sales Document is Sold or Booked, only Accounting can change its status away from those states or edit the Close Date. Once a Deal Sheet is created on a Sales Document, only Accounting can modify the commission terms, sales rep assignment, or the linked project. Sales reps still see the buttons but the system explains they need Accounting to make the change. Commission rollups stay accurate.

2. Customer Deposit Before Sold (v7.98 and v7.99)
Sales reps can collect a deposit at the moment the customer agrees instead of waiting for "Sold." Open the Send Sales Document Wizard, check "Also create Customer Deposit / Invoice," pick a payment term (Upon Agreement is the default), and the customer receives the agreement and the deposit invoice in the same email. The Sales Document stays in its current status until the customer signs.

3. Workforce Manager Tab in Timesheet Console (v7.98)
New tab in the Timesheet Console for Accounting. Click an employee name to edit their hourly rate, active flag, employment type (W-2, 1099 Contractor, or Salaried), title, and phone in one modal. Filter by name, employment type, and active status. Bulk actions and a + New Employee button are coming next.

4. Payroll-Ready CSV and PDF Exports from the Timesheet Console (v7.96 and v7.97)
Brand-new Timesheet Console with three tabs: My Timesheet, Payroll & Reports, and Team Timesheets. Pay Period configurable per company (weekly Monday-anchored, bi-weekly Wed-Tue, etc.). CSV export formatted for Gusto, ADP, and QuickBooks Payroll. Polished payroll PDF in landscape, color-coded, ready to hand to your accountant. Hourly rate now lives on the employee Contact and feeds straight into payroll math.

5. E-Signature with Image Cache (v7.80, v7.90, v7.91)
Email customers a "View and Sign" link. They sign in the browser. We track view, sign, and accept events. A Sales Document that has been signed in the customer's browser flips to "Accepted" automatically when the e-sign chain completes. This is a separate state from "Sold" so accounting decides when to mark Sold based on payment. Image cache speeds up rendering because product illustrations are cached in Firebase instead of re-fetched per render. Clearer error messages when a customer's link expires or a phone signature fails. New Close Deal Checklist on the Sales Document with the steps that must be done before marking Sold.

6. Stage Integration Emails (v7.80 and v7.82)
When a project moves through stages, the right people get notified automatically. Fires when a stage is marked Passed and also when a stage moves to In Progress (added in v7.82). Appointment Integration so scheduled customer visits feed into the same emails and timeline. Subscribers configure who receives notifications per stage.

7. Permit Fee Invoicing That Matches the Accounting Package (v7.92 and v7.95)
Permit fees that were left as Estimated until permit submission now flow correctly into the customer's invoice when the actual amount is recorded. Separate permit-fee line on the Project Invoice, distinct from labor and product lines. County-tax cap distribution matches the Accounting Package exactly.

8. CSV Imports That Survive Vendor Format Changes (v7.93 through v7.99)
Linea Rossa changed their export columns. ES Windows added a column on April 28, 2026. Older bpmPro versions read every column from a fixed position, which silently shifted every value to the wrong field after the change. v7.99 reads each column by header name so the import survives this kind of vendor change. New column-count safety banner on the Import Quote Records page shows actual vs. expected counts before you click Import. Stronger Labor Items processing keeps the import going when a Dealer Item has a missing cost field.

Other Notable Changes:

PicBuh Photo Gallery (v7.86):
Replaces the older SharinPix integration with our own picbuh.com gallery, accessed through a cleaner LWC interface inside Salesforce. Field crews attach photos to a project, office staff see them inline.

Clone Plus Safety Guards (v7.88 and v7.89):
Clone Plus (clone a Sales Document onto a different account, e.g., a re-bid) now safely re-runs all pricing, tax, and commission calculations against the new account. Prevents stale field values from carrying over.

Projects Board Time-on-Stage Counter (v7.94 and v7.95):
The "time on stage" counter on the Projects Board now reflects current values without a manual refresh.

Subscriber Hotfixes (v7.81):
Fixed a missing field that caused wrong Financial Summary numbers on some Projects in subscriber installs.

Send Wizard Preview Fix (v7.82):
Fixed a small bug where the Send Sales Document Wizard occasionally previewed an outdated PDF.

How Do I Know What Version I Am On?

Go to Setup, then search Installed Packages, then look at the row for "bpmPro Fall 2023 v5." The version number shown there is the version your org is running.

Common Questions:

Where is the Workforce Manager?
- App Launcher, then search for Timesheet Console, then click the Workforce Manager tab. Visible to Accounting users.

How do I collect a deposit before the deal is Sold?
- Open the Sales Document, click Send for Signature, check "Also create Customer Deposit / Invoice," pick a payment term, and send. The customer receives the agreement and the invoice together.

Why can't I change a Sold Sales Document back to Quoted?
- Sales Documents are locked after Sold or Booked. Accounting can change the status. The system shows you who to ask.

My ES Windows or Linea Rossa CSV upload looks wrong - what changed?
- Vendors occasionally adjust their export format. v7.99 reads columns by header name and warns you on the Import Quote Records page if the column count differs from what bpmPro expects. If you see the warning, contact xTriam Support.

Tips:
- The full What's New page on the support portal has a search box - try typing "deposit," "payroll," "permit," or "csv" to jump to the relevant entry
- The Workforce Manager replaces the older approach of editing employee Contacts one at a time
- Pay Period settings live in Company Settings and need to be confirmed once when you upgrade

---
title: "How to Build a Sales Cycle Duration Report"
description: "Build a custom report that shows how long each project spends in every sales stage — Leads/Unquoted, Being Quoted, Quoted, Sold — so owners and sales managers can see where deals stall."
category: sales
---

# How to Build a Sales Cycle Duration Report

**Who this is for:** Owners, sales managers, and anyone who wants to see how long projects spend in each sales stage — Leads/Unquoted, Being Quoted, Quoted, Sold.

**What you'll need:**
- Report access (RunReports + CreateCustomizeReports permissions)
- The "Projects with Stage Assignments" report type *(included in bpmPro 7.94 and later)*

**Time:** about 5 minutes

---

## Step 1 — Open Reports and start a new report

In the bpmPro navigation bar, click **Reports**. At the top-right, click **New Report**.

![Reports app showing the Recent reports list with New Report button highlighted](/images/tutorials/sales_cycle_reports_menu.png)

---

## Step 2 — Pick the report type

In the "Create Report" dialog:

1. On the left, click **Other Reports** *(or skip the category and just search)*.
2. In the search box, type `projects with`.
3. Select **Projects with Stage Assignments**.
4. Click **Start Report**.

![Create Report dialog showing Recently Used Report Types](/images/tutorials/sales_cycle_create_report_window.png)

![Other Reports category with Projects with Stage Assignments selected](/images/tutorials/sales_cycle_other_reports.png)

> **Why this report type?** It pairs each Project with its Project Stage Assignment records (PSAs). PSAs track when each stage started and ended — that's where the duration information lives.

---

## Step 3 — Land on the report builder

You're now inside the builder. Key things to notice:

- The left pane has two tabs: **Outline** (groupings + columns) and **Filters**.
- Toggle **Update Preview Automatically** on (top-right) so the preview refreshes as you build.

![Blank report builder with Outline tab and Update Preview toggle highlighted](/images/tutorials/sales_cycle_outline_tab.png)

---

## Step 4 — Add the columns you want to see

In the Outline pane → **Columns** section, use the search box to add these fields one at a time.

**From the Projects table:**

- Account: Account Name
- Call In Date
- Contracted Amount
- Sales Stage

![Column picker searching "account na" showing Account: Account Name](/images/tutorials/sales_cycle_columns_account_name.png)

**From the Project Stages Assignment table:**

- Project Stage Name
- PS Assignment # *(the PSA record name)*
- Duration Days
- Assigned Date
- Completed Date
- Status

![Column picker searching "project sta" showing Project Stage Name option](/images/tutorials/sales_cycle_columns_project_stage_name.png)

![Column picker searching "durat" showing Duration Days option](/images/tutorials/sales_cycle_columns_duration_days.png)

> **Tip:** Fields from both tables appear in the same dropdown. Watch the section labels — "PROJECTS" vs "PROJECT STAGES ASSIGNMENT" — to pick the right one. A field called *Status* exists in both places and means different things.

---

## Step 5 — Filter out stages that haven't happened yet

Click the **Filters** tab. Type `status` in the search box and choose **Status** from the *Project Stages Assignment* section (not the one under Projects — those are two different fields).

![Filter field picker showing Status under Project Stages Assignment](/images/tutorials/sales_cycle_filter_status_picker.png)

Configure the filter:

- **Operator:** equals
- **Value:** Passed
- Click **Apply**

![Filter By dialog with Status equals Passed configured](/images/tutorials/sales_cycle_filter_passed.png)

> **Why "Passed" only?** A PSA in "Passed" status is a completed stage — its duration is real. Stages in other statuses haven't finished yet, so their duration is zero or misleading.

---

## Step 6 — Group the report by Project

In the preview table, click the dropdown arrow on the **Project Name** column header and choose **Group Rows by This Field**.

![Right-click menu on Project Name column showing Group Rows by This Field](/images/tutorials/sales_cycle_group_by_project.png)

Each project now becomes a collapsible group, with its Passed stages listed underneath and days spent in each.

---

## Step 7 — Save the report

Click **Save** at the top right.

| Field | Value |
|-------|-------|
| Report Name | Sales Cycle Duration |
| Report Unique Name | `Sales_Cycle_Duration` *(delete any auto-suffix such as `_pI9`)* |
| Description | *(optional)* Days spent in each sales stage per project |
| Folder | **bpmPro Reports** |

Click **Save**.

![Save Report dialog with name Sales Cycle Duration and folder bpmPro Reports](/images/tutorials/sales_cycle_save_dialog.png)

---

## Step 8 — Run and explore

The report opens. You'll see each project as a row group, its Passed stages listed underneath, and Duration Days showing how many days each stage took. Subtotals give you the total sales cycle per project.

![Final Sales Cycle Duration report showing projects grouped with their stages and durations](/images/tutorials/sales_cycle_final_report.png)

---

## What to do next

- **Add a chart** — click **Add Chart** at the top of the run view and pick *Stacked Bar*. Each project becomes a horizontal bar, with colored segments per stage, lengths proportional to days.
- **Drill into a specific PSA** — click any detail row to open that Project Stage Assignment record.
- **Schedule it** — in Run view, click the dropdown next to Edit and choose *Subscribe* to have a summary emailed to you on a schedule.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Only one project shows in the results | In the Filters tab, change **Show Me** from "My Projects" to "All Projects" |
| Duration is zero on every row | PSAs don't yet have realistic Assigned Date / Completed Date values — this is a data issue, not a report issue |
| The "Projects with Stage Assignments" report type doesn't appear in the picker | Confirm you're on bpmPro 7.94 or later, and that your user has RunReports + CreateCustomizeReports permissions |
| I can't find the "bpmPro Reports" folder when saving | Your permission set may not include access to it — ask your admin |

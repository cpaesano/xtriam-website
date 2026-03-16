---
title: "Filtering Sales Reports by SalesDoc Status"
description: "Learn how to add a SalesDoc Status filter to Salesforce reports in bpmPro so you only see sold jobs, quoted proposals, or any other status you need."
category: sales
---

# Filtering Sales Reports by SalesDoc Status in bpmPro

bpmPro's sales reports show all sales documents by default — including quotes that are still being worked on, cancelled proposals, and sold contracts. To get an accurate picture of your actual sales, you need to filter by **SalesDoc Status**.

This tutorial shows how to add a status filter to the **Year to Date Sales - By Month** report, but the same steps work for any Salesforce report that includes sales document fields.

---

## Step 1 — Open the Report

Navigate to the report you want to filter. In this example, we're using the **Year to Date Sales - By Month** report, which shows sales grouped by close date with a bar chart.

![Year to Date Sales - By Month report showing bar chart and data table](/images/tutorials/filter_report_overview.jpeg)

---

## Step 2 — Click Filters

Click the **Filters** tab in the left sidebar to open the filter panel. You'll see any existing filters (such as SalesDoc Close Date range).

![Report with Filters tab highlighted in the left sidebar](/images/tutorials/filter_report_click_filters.jpeg)

---

## Step 3 — Add a New Filter

Click the **Add filter...** field at the top of the Filters panel.

![Filters panel showing the Add filter search field](/images/tutorials/filter_report_add_filter.jpeg)

Type **"salesdoc"** to search for sales document fields. Click **SalesDoc Status** from the dropdown results.

![Search results showing SalesDoc Status field highlighted](/images/tutorials/filter_report_search_salesdoc.jpeg)

---

## Step 4 — Select the Status Value

The **Filter By** dialog will appear. The field is set to **SalesDoc Status** and the operator defaults to **equals**.

In the Value list, select **Sold** (or whichever status you want to filter by).

![Filter By dialog showing SalesDoc Status with Sold option highlighted](/images/tutorials/filter_report_select_sold.jpeg)

Available status values include:
- **Quoted** — Proposals still being worked on
- **Booked** — Signed but not yet closed
- **Sold** — Closed and completed sales
- **Cancelled** — Cancelled proposals
- **Superseded** — Replaced by a newer version
- **Lost** — Lost to competition or customer declined

Click **Apply** to add the filter.

![Filter By dialog with Sold selected and Apply button highlighted](/images/tutorials/filter_report_apply.jpeg)

---

## Step 5 — Save & Run

Click **Save & Run** in the top-right corner to save the filter and run the report with the new criteria.

![Report toolbar with Save & Run button highlighted](/images/tutorials/filter_report_save_run.jpeg)

The report will now only show sales documents with the status you selected. The chart and totals will update to reflect the filtered data.

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Open the report |
| 2 | Click the **Filters** tab in the sidebar |
| 3 | Click **Add filter...** and type "salesdoc" |
| 4 | Select **SalesDoc Status** |
| 5 | Choose the status value (e.g., **Sold**) and click **Apply** |
| 6 | Click **Save & Run** |

> **Tip:** You can select multiple status values in the filter. For example, select both **Sold** and **Booked** to see all committed sales.

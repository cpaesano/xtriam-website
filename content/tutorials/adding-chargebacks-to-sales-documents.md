---
title: "Adding Chargebacks to Sales Documents"
description: "Learn how to add product or labor chargebacks to a sales document in bpmPro to track reorders, errors, and cost adjustments that affect job profitability."
category: financial
---

# Adding Chargebacks to Sales Documents in bpmPro

Chargebacks let you track additional costs that weren't part of the original quote — such as product reorders due to sales errors, damaged items, or extra labor. bpmPro records these chargebacks on the sales document and automatically adjusts your job costing and sales commission calculations.

---

## Step 1 — Open the Accounting Tab

Navigate to the sales document where you need to add a chargeback. In the **Sales Document Workspace**, click on the **Accounting** tab.

![Sales Document Workspace with the Accounting tab highlighted](/images/tutorials/chargebacks_accounting_tab.jpeg)

---

## Step 2 — Locate the Chargeback Management Section

Scroll down to the **Chargeback Management** section. This is where you create and manage all chargebacks for this sales document.

You'll see the following fields:

- **Category** — Select **Product** or **Labor**
- **Quantity** — Number of items (defaults to 1)
- **Amount** — The chargeback dollar amount
- **Vendor** — Required for Product chargebacks
- **Vendor Quote #** — Reference number from the vendor
- **Remarks** — Notes explaining the chargeback

![Chargeback Management section showing empty form with Category, Quantity, Amount, Vendor, and Remarks fields](/images/tutorials/chargebacks_management_section.jpeg)

---

## Step 3 — Fill Out the Chargeback

**Enter the amount** — Type the chargeback cost in the **Amount** field (e.g., 1,450).

![Chargeback form with Amount set to 1,450 and Vendor field highlighted](/images/tutorials/chargebacks_amount_entered.jpeg)

**Select the vendor** — For Product chargebacks, you must select a vendor. Click the **Vendor** field to search and select from your product vendors.

![Vendor search dropdown showing vendor options](/images/tutorials/chargebacks_vendor_search.jpeg)

**Add remarks** — In the **Remarks** field, explain why the chargeback is needed (e.g., "Reorder of sliding glass door panel. Error by Sales Person.").

![Completed chargeback form with vendor quote number and remarks filled in](/images/tutorials/chargebacks_remarks_filled.jpeg)

---

## Step 4 — Click Add Chargeback

Once all fields are filled, click the **Add Chargeback** button to save it.

![Add Chargeback button highlighted with completed form](/images/tutorials/chargebacks_add_button.jpeg)

---

## Step 5 — View the Impact on Job Costing

To see how the chargeback affects your numbers, open the **Accounting Package** report from the Sales Document Navigator. Scroll down to the **Job Costing Adjustments: Chargebacks** section.

This table shows:
- **Original Commissionable Cost** vs. **Adjusted Commissionable Cost**
- **Original Markup** vs. **Adjusted Markup**
- **Adjusted Sales Commission** — how the chargeback reduces the sales person's commission

![Accounting Package report showing Job Costing Adjustments table with chargeback of $1,450 and adjusted commission calculations](/images/tutorials/chargebacks_job_costing.jpeg)

> **Why this matters:** Chargebacks reduce the commissionable cost basis, which means the sales person's commission is automatically adjusted downward. This holds the team accountable for errors that cost the company money.

---

## Step 6 — Review Existing Chargebacks

Back in the Sales Document Workspace under the **Accounting** tab, the **Existing Chargebacks** section shows all chargebacks you've created, including the item type, cost, vendor, and remarks.

![Existing Chargebacks list showing a Product chargeback of $1,450.00 to CGI Windows and Doors Inc](/images/tutorials/chargebacks_existing_list.jpeg)

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Open the Sales Document → click the **Accounting** tab |
| 2 | Scroll to **Chargeback Management** |
| 3 | Select **Category** (Product or Labor) |
| 4 | Enter **Amount** |
| 5 | Select **Vendor** (required for Product chargebacks) |
| 6 | Enter **Vendor Quote #** and **Remarks** |
| 7 | Click **Add Chargeback** |
| 8 | View impact in the **Accounting Package** report under Job Costing Adjustments |

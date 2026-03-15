---
title: "Creating Special Discounts"
description: "Learn how to add a special discount to a sales document in bpmPro using the Specialty Items feature, and how it appears on your proposal report."
category: sales
---

# Creating Special Discounts in bpmPro

Special discounts in bpmPro are added as **Specialty Items** on a sales document. By entering a negative dollar amount, you can apply a discount that reduces the total price on your proposal — perfect for vendor promotions, negotiated deals, or customer incentives.

---

## Step 1 — Navigate to the Specialty Items Section

Open the sales document where you want to add the discount. On the right side of the Sales Document Workspace, scroll down to the **Specialty Items** section.

Click the **dropdown arrow** to create a new Specialty Item record.

![Specialty Items section on the Sales Document Workspace with the dropdown arrow highlighted](/images/tutorials/discounts_specialty_items_section.jpeg)

---

## Step 2 — Fill Out the Specialty Item Form

The **New Specialty Item** form will open. At the top you'll see the **Special Options** checkboxes — we'll come back to these in a moment.

![New Specialty Item form showing Special Options, Item Name, and Remarks sections](/images/tutorials/discounts_new_form_top.jpeg)

Scroll down to the **Item Name and Quantity** section and enter:

- **Item Name** — Type a descriptive name like "Special Discount"
- **Quantity** — Leave as 1

![Item Name field filled with Special Discount](/images/tutorials/discounts_item_name.jpeg)

---

## Step 3 — Enter the Discount Amount as a Negative Number

In the **Product Purchase Details** section, enter the discount amount in the **Product Cost Pretax [Unit]** field.

> **Important:** Enter the amount as a **negative number** (e.g., -$3,500.00). This is what makes it a discount — the negative value reduces the sales document total.

Select the **Vendor** by searching for the vendor account that is offering the discount. You can also fill in the **Vendor's Quote #** for reference.

![Product Cost showing -$3,500.00 and Vendor search showing Mr Glass Doors and Windows](/images/tutorials/discounts_negative_amount_vendor.jpeg)

---

## Step 4 — Check Pass-Through Item (Recommended)

Scroll back up to the **Special Options** section and check the **Pass-Through Item** checkbox.

![Special Options section with Pass-Through Item checkbox highlighted](/images/tutorials/discounts_pass_through.jpeg)

> **Why this matters:** When Pass-Through Item is checked, the discount amount is **not multiplied by your markup**. This ensures the discount passes through at its exact dollar value. Without this, your markup percentage would be applied to the negative amount, changing the discount value.

---

## Step 5 — Save

Review your entries and click **Save**.

![Completed Specialty Item form with Save button highlighted](/images/tutorials/discounts_save.jpeg)

---

## Step 6 — View the Discount on Your Proposal

To see the discount on your sales document report, go to the **Sales Document Navigator** and click **View Sales Document** under Generate PDF Presentations.

![Sales Document Navigator showing the View Sales Document button](/images/tutorials/discounts_navigator_view_report.jpeg)

The report will show the special discount as a line item with the negative amount:

![Sales document report showing line item #010 SPECIAL DISCOUNT with $-3,500.00](/images/tutorials/discounts_report_line_item.jpeg)

---

## Showing or Hiding Line Item Pricing

You can control whether individual line item prices are visible on the proposal by clicking **Customize Report View** at the top of the report.

![Customize Report View header with Sales Document, Installation Ticket, and other buttons](/images/tutorials/discounts_customize_report_view.jpeg)

Toggle the **Line Item Pricing** button to show or hide prices for each item. When turned on, the discount line item will display with its extended price visible to the customer:

![Final report view with line item pricing showing the special discount of $-3,500.00](/images/tutorials/discounts_report_with_pricing.jpeg)

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Open the Sales Document → scroll to **Specialty Items** → click the dropdown arrow |
| 2 | Enter **Item Name** (e.g., "Special Discount") and **Remarks** |
| 3 | Enter the discount as a **negative number** in Product Cost Pretax (e.g., -$3,500.00) |
| 4 | Select the **Vendor** and optionally fill in Vendor's Quote # |
| 5 | Check **Pass-Through Item** so markup doesn't affect the discount |
| 6 | Click **Save** |
| 7 | View the report via **Sales Document Navigator** → **View Sales Document** |

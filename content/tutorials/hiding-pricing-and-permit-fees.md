---
title: "Hiding Pricing and Permit Fees on a Proposal"
description: "Control how much pricing your customer sees on a proposal, from a full breakdown down to a single Total Contract Price, and hide the permit fee while keeping it in the total."
category: sales
---

# Hiding Pricing and Permit Fees on a Proposal

Sometimes you want to present a clean bottom-line price without breaking out every line item or fee, for example to keep customers from price-shopping individual pieces. bpmPro lets you dial that in with two toggles in the **Customize Report View** panel on the Sales Document report.

> **Important:** When you hide itemization, the permit fee is hidden from the customer, but its amount always stays inside the **Grand Total**, so the customer is still billed for it.

> This is a companion to the [Customize Sales Document Report View](/support/tutorials/customize-sales-document-report-view) tutorial, which covers all of the report toggles.

---

## Where to Find It

Open a Sales Document and open its report view. At the top, expand **Customize Report View** and look at the **Pricing Details** column. After changing any toggle, always click **Apply Settings** to refresh the preview.

---

## The Two Pricing Toggles

| Toggle | What It Does |
|--------|--------------|
| **Line Item Pricing** | **On** shows each line item with its own price. **Off** hides individual prices (the proposal becomes "not itemized"), and the permit fee (the Plans Package) is hidden from the customer. Its cost stays in the Grand Total. |
| **Total Category Breakdown** | **On** shows category subtotals such as Total Product and Total Labor, with the payment schedule alongside. |

---

## What Your Customer Sees

| Line Item Pricing | Category Breakdown | The Customer Sees |
|-------------------|--------------------|-------------------|
| On | Off | Each line item with its price, plus the Grand Total. |
| On | On | Category subtotals (Product, Labor, permit) that add up to the Grand Total. |
| Off | Off | No prices at all, just a single Grand Total. |
| Off | On | A single **Total Contract Price** line (see below), with the breakdown hidden so the numbers still add up. |

---

## The "Total Contract Price" Line

If you hide itemization but leave **Total Category Breakdown** on, the category subtotals wouldn't add up, because the hidden permit fee isn't shown. So bpmPro presents one clean line instead, equal to the Grand Total, with the payment schedule intact:

| Category | Sales Price | Payment Term | % |
|----------|-------------|--------------|---|
| **Total Contract Price** | $27,000.00 | Upon Agreement | 50% |
| | | Upon Delivery | 40% |
| | | Upon Completion | 10% |
| **Grand Total** | **$27,000.00** | | |

Everything reconciles, and the permit fee stays hidden. To bring the full Product and Labor breakdown back, turn **Line Item Pricing** on.

> **Tip:** While you're configuring, a short note appears under the **Total Category Breakdown** toggle whenever the breakdown will be hidden, so you always know what the customer will and won't see.

---

## Common Questions

**The permit fee is still showing on the proposal.**
Turn **Line Item Pricing** off, then click Apply Settings. With Line Item Pricing on, the permit / Plans Package shows as its own line by design.

**My category totals don't add up to the Grand Total.**
That happens when Category Breakdown is on but Line Item Pricing is off, so the hidden permit fee isn't in the visible categories. bpmPro handles this by collapsing the breakdown into the single Total Contract Price line. Click Apply Settings to refresh, and make sure you're on the latest bpmPro version.

**If I hide the permit fee, is the customer still charged for it?**
Yes. Hiding it only removes it from the customer's view. The full amount stays inside the Grand Total, so it's still billed.

**I still see the words "Plans Package" even with prices hidden.**
The report was corrected so "Plans Package" no longer appears anywhere when Line Item Pricing is off. Click Apply Settings to refresh, and confirm you're on the latest version.

---

## Quick Tips

- Always click **Apply Settings** after changing a toggle to update the preview.
- Use **Line Item Pricing off** for a single-price presentation that keeps the permit fee out of view.
- Seeing **Total Contract Price** instead of category subtotals? That's intended when itemization is hidden.

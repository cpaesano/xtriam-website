---
title: "Hiding Pricing and Permit Fees on a Proposal"
keywords:
  - hide pricing
  - hide prices
  - hide itemization
  - not itemized
  - itemized pricing
  - line item pricing
  - category breakdown
  - total category breakdown
  - permit fee
  - hide permit fee
  - permit package
  - plans package
  - total contract price
  - sales document report
  - customize report view
  - report view settings
  - proposal pricing
  - price shopping
  - grand total does not match
  - category totals do not add up
  - breakdown does not reconcile
  - hide cost
category: "sales-documents"
---

Hiding Pricing and Permit Fees on a Proposal

Overview:
When you send a proposal, you control how much pricing detail the customer sees using the Customize Report View settings on the Sales Document report. This is useful when you want to present a single bottom-line price without breaking out every line item or fee, for example to avoid customers price-shopping individual items. When you hide itemization, the permit fee package is hidden from the customer, but its amount is always still included in the Grand Total.

How to Access:
Open a Sales Document and open its report/preview view. At the top you will see the Customize Report View panel with a Pricing Details column of toggles. After changing any toggle you must click Apply Settings to update the preview.

The Pricing Toggles:

Line Item Pricing:
Turn this ON to show each line item with its individual price. Turn it OFF to hide individual prices, which makes the proposal not itemized. When Line Item Pricing is OFF, the permit fee package (also called the Plans Package) is hidden from the customer. It is not shown as its own line, but its cost stays inside the Grand Total.

Total Category Breakdown:
Turn this ON to show category subtotals such as Total Product and Total Labor.

How the Pricing Displays Combine:
- Line Item Pricing ON: the customer sees each priced line, including the permit / Plans Package line.
- Line Item Pricing OFF: the customer sees no individual prices and no permit fee line, only the Grand Total. The permit cost is bundled into that total.
- Total Category Breakdown ON with Line Item Pricing ON: the customer sees category subtotals that add up to the Grand Total.
- Total Category Breakdown ON with Line Item Pricing OFF: because the permit fee is hidden, the category subtotals by themselves would not add up to the Grand Total. To keep the document accurate, bpmPro automatically shows a single Total Contract Price line equal to the Grand Total instead of a breakdown that would not reconcile.

Total Contract Price:
When you hide itemization but still have Total Category Breakdown turned on, the proposal shows one clean Total Contract Price line equal to the Grand Total, along with the payment schedule (Upon Agreement, Upon Delivery, Upon Completion). This keeps the numbers consistent for the customer. To show the full category breakdown instead, turn Line Item Pricing back on.

Common Issues:

The permit fee is still showing on the proposal:
- Make sure Line Item Pricing is turned OFF, then click Apply Settings. With Line Item Pricing ON, the permit / Plans Package is shown as its own line by design.

The category totals do not add up to the Grand Total:
- This happens when Total Category Breakdown is on but Line Item Pricing is off, so the hidden permit fee is not part of the visible categories. bpmPro handles this automatically by collapsing the breakdown into a single Total Contract Price line. If you still see mismatched totals, click Apply Settings to refresh and confirm the latest bpmPro version is installed.

The words Plans Package still appear even though prices are hidden:
- The document was corrected so Plans Package no longer appears anywhere when Line Item Pricing is off. If you still see it, click Apply Settings to refresh and confirm the latest version is installed.

I turned off itemization, is the permit fee still charged?:
- Yes. Hiding the permit fee only hides it from the customer's view. The full amount stays inside the Grand Total, so the customer is still billed for it.

Tips:
- After changing any toggle, always click Apply Settings to update the preview.
- Use Line Item Pricing OFF when you want a single-price presentation and do not want the customer to see the permit fee broken out.
- When you hide itemization and have Total Category Breakdown on, expect to see Total Contract Price instead of category subtotals. That is intended.
- A short warning appears under the Total Category Breakdown toggle when the breakdown will be hidden, explaining why and how to bring it back.

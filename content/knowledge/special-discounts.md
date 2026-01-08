---
title: "Creating Special Discounts"
keywords:
  - discount
  - discounts
  - special discount
  - price reduction
  - specialty item
  - negative price
  - sales document
  - pricing
  - pass-through
category: "sales"
---

Creating Special Discounts

Overview:
This guide shows how to create a special discount on a Sales Document using Specialty Items. Discounts are entered as negative amounts.

---

Step-by-Step Guide:

Step 1: Open the Sales Document
- Navigate to the Sales Document you want to add a discount to
- You should be in the Sales Document Workspace

Step 2: Navigate to Specialty Items
- On the right side menus, find the "Specialty Items" section
- Click the dropdown arrow to create a new Specialty Item record

Step 3: Fill Out Item Details
- Item Name: Enter a name like "Special Discount"
- Remarks: Add a description of the discount (e.g., "Special Discount for valued customer")

Step 4: Enter the Discount Amount (IMPORTANT)
- In the "Product Cost Pretax [Unit]" field, enter the discount amount as a NEGATIVE number
- Example: For a $3,500 discount, enter -$3,500.00
- The negative amount will subtract from the total

Step 5: Select a Vendor
- Choose the vendor associated with the discount
- This is required for tracking purposes

Step 6: Enter Vendor's Quote Number
- Fill in the Vendor's Quote # field if applicable

Step 7: Optional - Select Pass-Through Item
- Check the "Pass-Through Item" checkbox
- This is recommended so the discounted amount is NOT multiplied by your markup
- Without this, your markup percentage would be applied to the discount

Step 8: Save
- Click "Save" to create the Specialty Item
- The discount will now appear in the Sales Document

---

Viewing the Discount:

Generate a Sales Document Report:
- Click on "Sales Document" in the Sales Document Navigator
- The report will show the discount as a line item with a negative extended price
- Example: #010 SPECIAL DISCOUNT, Quantity 1, Extended Price: $-3,500.00

Customize Report View:
- Click "Customize Report View" to show or hide line item pricing
- Toggle "Line Item Pricing" on to see individual item prices including the discount
- Click "Apply Settings" to update the view

---

How It Appears on Reports:

When Line Item Pricing is enabled:
- The discount appears as a separate line item
- Shows the negative amount clearly
- Included in the Grand Total calculation

Example:
- Item #009: Product - $5,812.28
- Item #010: SPECIAL DISCOUNT - $-3,500.00
- Sales Tax: $3,891.63
- Grand Total: $75,186.38

---

Important Notes:

Negative Numbers:
- Always enter discounts as NEGATIVE amounts
- The system subtracts negative values from the total

Pass-Through Item:
- When checked, the amount bypasses your markup calculation
- Recommended for discounts to ensure accurate pricing

Vendor Selection:
- Required for Specialty Items
- Select the vendor providing the discount

Remarks:
- Use the Remarks field to document why the discount was given
- This helps with record-keeping and auditing

---

Common Issues:

"Discount Not Showing":
- Make sure you entered a negative number
- Verify the Specialty Item was saved successfully

"Discount Being Multiplied":
- Check the "Pass-Through Item" checkbox to prevent markup from being applied

"Need to Adjust Discount":
- Edit the Specialty Item record to change the amount
- The Sales Document will update automatically

Tips:
- Always document the reason for discounts in the Remarks field
- Use Pass-Through for discounts to maintain accurate pricing
- Review the Sales Document report to verify the discount appears correctly


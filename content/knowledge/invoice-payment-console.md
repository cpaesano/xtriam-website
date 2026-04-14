---
title: "Invoice Payment Console"
keywords:
  - invoice
  - payment
  - payment console
  - record payment
  - apply payment
  - void payment
  - balance due
  - paid
  - partially paid
  - deposit
  - deposit request
  - transaction fee
  - processing fee
  - invoice status
  - billing
category: "invoicing"
---

Invoice Payment Console

Overview:
The Invoice Payment Console is the central place to manage invoices and payments for a project. From here you can create invoices, record payments, void bounced payments, add transaction fees, and track balances.

How to Access:
Open any Project Invoice record, or navigate to the Invoice section on the Project record page.

Key Features:

Creating Invoices:
1. From the Project, go to the Invoice section
2. Click "New Invoice"
3. Select the Sales Document to invoice
4. Set the billing percentage or amount
5. The invoice is created with line items from the Sales Document

Deposit Requests:
When collecting an upfront deposit, toggle the invoice to display as a "Deposit Request" instead of a formal invoice. This matters for tax purposes since sales tax is typically due only when a formal invoice is issued.

Recording Payments:
1. Open the Invoice Payment Console
2. Click "Record Payment"
3. Enter the payment amount, date, reference number, and payment method
4. The system updates the balance due and invoice status automatically
5. Overpayment protection prevents entering amounts larger than the balance

Voiding Payments:
If a payment bounces (bad check, failed ACH, reversed credit card):
1. Find the payment in the payment list
2. Click "Void"
3. Enter the reason (e.g., "NSF check" or "Customer disputed")
4. The original payment stays in the system with a "Void" status
5. The balance is automatically reversed

Transaction Fees:
Add processing fees (e.g., 3% credit card fee) directly to an invoice:
1. Click "Add Transaction Fee"
2. Enter the fee percentage or flat amount
3. The fee appears as a separate line item on the invoice PDF

Invoice Statuses:
- Issued: Invoice created, no payments received
- Partially Paid: Some payment received, balance remaining
- Paid: Full amount received
- Void: Invoice cancelled

Common Issues:

Invoice shows wrong balance:
- Check if all payments have been recorded
- Verify no duplicate payments exist
- Transaction fees are separate from the invoice amount

Cannot edit invoice:
- Invoice may be locked after payments are applied
- Void the payment first if you need to adjust the invoice

Tips:
- Use Deposit Request for upfront payments before work begins
- Always include a reference number when recording payments for easy tracking
- The system aggregates payments by date so customers see one payment amount, not internal allocations

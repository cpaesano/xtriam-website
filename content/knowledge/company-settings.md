---
title: "Company Settings"
keywords:
  - company settings
  - settings
  - configuration
  - configure
  - setup
  - logo
  - company logo
  - tax rate
  - county tax
  - default
  - company name
  - address
  - phone number
  - stripe
  - connected account
category: "admin"
---

Company Settings

Overview:
Company Settings is the central configuration page for your bpmPro installation. It controls company information, tax rates, default behaviors, integrations, and branding that apply across the entire system.

How to Access:
Search for "Company Settings" in Salesforce global search, or navigate to the Company Settings tab. There is typically one Company Settings record per organization.

Key Sections:

Company Information:
- Company name, address, phone number
- This information appears on PDFs, invoices, and email notifications

Company Logo:
- Upload your company logo using the Logo Uploader component
- The logo appears on Sales Document PDFs, invoices, and email notifications

Tax Configuration:
- State tax rate
- County tax rate
- County Tax Markup Start Date: controls when county tax markup takes effect on new invoices

Stripe Integration:
- Connected Account ID for payment processing
- Links your Stripe account for online invoice payments

Close Deal Settings:
- Configure what happens when the Close Deal wizard is used
- Close Deal Checklist items
- Auto-advance to next stage toggle

Projects Board:
- Default view settings for the Projects Board
- Column configurations

Invoice Defaults:
- Default payment terms
- Default billing percentages

Common Issues:

Logo not appearing on PDFs:
- Make sure the logo is uploaded via the Logo Uploader component on the Company Settings page
- The logo URL must be accessible (not behind authentication)

Tax rate changes not taking effect:
- New tax rates apply to new invoices only
- Existing invoices keep the rate that was active when they were created

Tips:
- Review Company Settings after each package upgrade as new configuration options may be available
- The County Tax Markup Start Date should match the date you install updates that include tax changes
- Only admins should have edit access to Company Settings

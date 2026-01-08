# bpmPro Knowledge Base

This folder contains the knowledge base that powers the AI support assistant.

## How to Add New Content

1. Create a new `.md` file in this folder
2. Use `_TEMPLATE.md` as your starting point
3. Fill in the frontmatter (title, keywords, category)
4. Write clear, helpful content in PLAIN TEXT format
5. The AI will automatically use your new content

## File Naming Convention

Use lowercase with hyphens:
- quotes.md (correct)
- projects-board.md (correct)
- common-errors.md (correct)
- MyFeature.md (incorrect)

## Frontmatter Format

Every file must start with frontmatter:

---
title: "Human-readable title"
keywords:
  - keyword1
  - keyword2
  - keyword3
category: "sales"
---

### Keywords

Keywords determine when the AI shows this content. Think about:
- What words would a user type when asking about this?
- Include common misspellings or abbreviations
- Include related terms

### Categories

- sales: Quotes, opportunities, leads, closing deals
- operations: Projects, scheduling, installation
- financial: Payments, invoices, commissions
- support: Troubleshooting, errors, help
- admin: Setup, configuration, permissions
- general: Getting started, navigation, overview

## Content Format (IMPORTANT)

Use PLAIN TEXT formatting - NO markdown symbols like:
- NO asterisks for bold (avoid this)
- NO pound signs for headers (use "Section Name:" instead)
- NO pipe tables (use lists instead)
- NO backticks for code

This is because the AI chat displays responses as plain text, and markdown symbols would appear as raw characters.

Good Example:

  Common Issues:

  "Missing Price" Error:
  The product doesn't have a price in the active Price Book.
  Go to Product record, then Price Books, then Add entry.

Bad Example (avoid this):

  ## Common Issues

  **"Missing Price" Error**
  The product doesn't have a price in the `active Price Book`.

## Content Structure

Follow this pattern:

  Feature Name

  Overview:
  Brief description of what this feature does.

  How to Access:
  Navigation path in Salesforce/bpmPro.

  Step-by-Step Guide:

  Step 1: First Step
  1. Action one
  2. Action two
  3. Action three

  Common Issues:

  "Error Message Here":
  - Explanation of why this happens
  - How to fix it

  Tips:
  - Helpful tip 1
  - Helpful tip 2

## Current Files

Sales:
- quotes.md: Creating and managing quotes
- close-deal-wizard.md: Closing deals and contracts
- accounts-contacts-projects-salesdocs.md: Managing accounts, contacts, projects, and sales documents
- special-discounts.md: Creating special discounts via Specialty Items

Operations:
- projects-board.md: Kanban project management
- es-windows-import.md: Importing from ES Windows
- pgt-csv-export.md: Exporting from PGT Industries
- email-wizard.md: Email templates and notifications
- work-assignment-calendars.md: Adding work assignments to calendar

Financial:
- payments-stripe.md: Payment collection and Stripe
- commissions.md: Commission tracking and payouts
- chargebacks.md: Adding chargebacks to sales documents

Admin:
- onboarding.md: bpmPro onboarding and company setup
- reports-dashboards.md: Reports and analytics
- product-catalog.md: Managing products and pricing
- permissions.md: User roles and access control
- adding-sales-person.md: Adding new sales people

Support:
- common-errors.md: Troubleshooting guide

General:
- getting-started.md: New user onboarding
- mobile-access.md: Using the mobile app

Index Files:
- TUTORIALS_INDEX.md: Tracks converted PDF tutorials from xTriam Tutorials folder

## Need Help?

Contact the development team or email support@xtriam.com

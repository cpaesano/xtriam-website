---
title: "Creating Sales Documents"
description: "Learn how to create sales documents (quotes, proposals, contracts) in bpmPro and understand how they relate to projects."
category: sales
---

# Creating Sales Documents in bpmPro

Sales documents are where you build your quotes, proposals, and contracts. Each sales document belongs to a project, and a project can have multiple sales documents — for example, different product configurations or pricing options for the same job.

---

## How Sales Documents Fit the Data Model

The hierarchy in bpmPro works like this:

- **Account** — The customer (e.g., John Smith)
  - **Contact(s)** — People linked to the account
  - **Project(s)** — Jobs or opportunities for the account
    - **Sales Document(s)** — Quotes and proposals for each project

For example, a single project might have:
- **Sales Doc #01** — Standard paint version
- **Sales Doc #02** — Kynar paint version (premium option)
- **Sales Doc #03** — Entry door only

This lets you present multiple options to the customer without duplicating the project.

---

## Two Ways to Create a Sales Document

### Option 1 — From Within a Project

1. Navigate to the project record
2. Click on the **Sales Documents** tab
3. Click **New** to create a new sales document under that project

This is the most common approach when you already have the account, contact, and project set up.

### Option 2 — Automatically via the QuickStart Flow

When using the [QuickStart New Lead Creation](/support/tutorials/entering-new-leads) flow, check the **Create Sales Document** checkbox on the second screen. bpmPro will create the sales document automatically along with the account, contact, and project.

---

## What Happens Next

Once your sales document is created, you can:
- **Add line items** — Products, labor, and services
- **Import from manufacturers** — Use the import feature for PGT, ES Windows, and other vendor formats
- **Generate proposals** — Create professional PDF proposals to send to customers
- **Convert to contract** — Move the quote to a sold status when the customer signs

---

## Quick Reference

| Method | Steps |
|--------|-------|
| **From a Project** | Open Project → Sales Documents tab → **New** |
| **Via QuickStart** | Leads tab → QuickStart flow → Check **Create Sales Document** |

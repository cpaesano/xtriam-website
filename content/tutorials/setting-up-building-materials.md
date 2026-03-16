---
title: "Setting Up Building Materials"
description: "Learn how to create and configure building materials in bpmPro, including coverage rates and cost calculations, as a prerequisite for setting up Dealer Items."
category: estimating
youtubeId: ADp6skkGYOM
---

# Setting Up Building Materials in bpmPro

Building materials are a foundational setup step in bpmPro. They define the products used during installation — wood bucks, flashing membranes, screws, caulking, and more. Once configured, these materials are available when setting up Dealer Items for product installation, saving you time and reducing errors when creating quotes.

> **Important:** Building materials should be set up **before** configuring Dealer Items for product installation.

---

## Navigating to Building Materials

From the homepage, click **Command Center** (next to the Home menu). Under the **Labor Price Book Setup** section, click **Building Materials** to view the list of existing materials.

---

## Creating a New Building Material

Click the **New** button and fill in the following fields:

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Descriptive name for the material | 1 x 6 x 12 Pressure-Treated Wood Buck |
| **Units** | Number of units per package | 1 |
| **Material Type** | Category of material (Wood, Membrane, etc.) | Wood |
| **Cost** | Cost including sales tax | $8.38 |
| **Coverage Rate** | How much area/length one unit covers | 12 linear feet |

Click **Save** when done.

---

## Understanding Coverage Rates

The **coverage rate** is critical for accurate cost-per-unit calculations. bpmPro uses this value to determine how much material is needed per line item.

### Example 1: Wood Buck

- **Package:** 1 x 6 x 12 pressure-treated board
- **Coverage rate:** 12 linear feet
- **Cost:** $8.38
- **Cost per linear foot:** ~$0.70

### Example 2: Waterproofing Flashing Membrane

For materials like membranes, you'll need to reference the **product data sheet** to determine coverage:

1. Check the manufacturer's coverage spec (e.g., 60–70 sq ft per gallon on masonry)
2. Use a conservative estimate (e.g., 50 sq ft per gallon)
3. Multiply by the container size (e.g., 5 gallons x 50 = 250 sq ft)
4. Divide by number of coats if applicable (e.g., 250 / 2 coats = 125 sq ft)

| Field | Value |
|-------|-------|
| **Name** | Waterproofing Flashing Membrane |
| **Container** | 5 gallons |
| **Cost** | $468.60 + tax |
| **Coverage rate** | 125 sq ft (for 2 coats) |

> **Tip:** Use the tooltips next to each field for guidance on what to enter. When in doubt on coverage, be conservative — it's better to slightly overestimate material needs than to come up short on a job.

---

## After Setup

Once you've entered all your building materials, you're ready to move on to the next step: configuring **Dealer Items** for product installation. The building materials you created here will be available as selections when setting up screws, wood bucks, caulking, and flashing for each dealer item.

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Go to **Command Center** → **Labor Price Book Setup** → **Building Materials** |
| 2 | Click **New** |
| 3 | Enter name, units, material type, and cost (including tax) |
| 4 | Enter the **coverage rate** (reference product data sheets as needed) |
| 5 | Click **Save** |
| 6 | Review the calculated cost per unit |

---

## Related Tutorials

- [Updating Product Installation Items](/support/tutorials/updating-product-installation-items) — How to configure dealer items that use these building materials
- [Managing Product and Labor Items](/support/tutorials/managing-product-and-labor-items) — How building materials factor into line items on sales documents

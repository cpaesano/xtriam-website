---
title: "Mapping Dealer Items in bpmPro"
description: "Learn how to map dealer items to line items on a sales document using the Dealer Item Lookup in bpmPro's Manage Items page."
category: estimating
---

# Mapping Dealer Items in bpmPro

Dealer Item mapping connects each line item on a sales document to a specific product from your dealer item library. This tells bpmPro which product drawing and default dimensions apply to each line, and it's essential for accurate quoting and ordering. This tutorial walks through how to use the **Dealer Item Lookup** to find, filter, and assign dealer items.

---

## Step 1 — Navigate to the Manage Items Page

Open the sales document and go to the **Manage Items** page. You'll see all the line items listed with their product details, labor details, and extended values.

![Manage Items page showing line items with product and labor details](/images/tutorials/mapping_dealer_items_overview.jpeg)

---

## Step 2 — Click Edit

Click the **Edit** button on the line item you want to map a dealer item to. This puts the line item into edit mode.

![Edit button highlighted on line item 1](/images/tutorials/mapping_dealer_items_edit.jpeg)

---

## Step 3 — Open the Dealer Item Lookup

In edit mode, click the **zoom icon** next to the **Dealer Item Lookup** field. This opens the Select Dealer Item dialog.

![Edit mode showing the zoom icon next to the Dealer Item Lookup field highlighted](/images/tutorials/mapping_dealer_items_zoom_icon.jpeg)

---

## Step 4 — Browse and Filter Dealer Items

The **Select Dealer Item** dialog displays all available dealer items as visual cards with product names, default dimensions, and drawings. You have two ways to find the item you need:

### Filter by Name

Type a keyword in the **Filter by Name** search box to narrow down the list. For example:

- Type **"door"** to see all door products (36 items)

![Filter by Name showing "door" with 36 matching items](/images/tutorials/mapping_dealer_items_filter_door.jpeg)

- Type **"window"** to see all window products (13 items)

![Filter by Name showing "window" with 13 matching items](/images/tutorials/mapping_dealer_items_filter_window.jpeg)

- Type **"mu"** to find mullion items (1 item)

![Filter by Name showing "mu" with 1 Mullion item](/images/tutorials/mapping_dealer_items_filter_mullion.jpeg)

Click **Clear Filters** between searches to reset the results.

### Filter by Item Type

Click the **Filter by Item Type** dropdown to filter by standard categories:

![Filter by Item Type dropdown showing All Types, Door, Mullion, Sidelite, Storefront, and Window](/images/tutorials/mapping_dealer_items_type_dropdown.jpeg)

Available types include:
- **Door** — All door products (bifold, French, sliding, etc.)
- **Mullion** — Mullion connectors
- **Sidelite** — Sidelite panels
- **Storefront** — Storefront panel configurations
- **Window** — All window products (awning, casement, horizontal roller, etc.)

For example, selecting **Storefront** shows all 8 storefront configurations:

![Storefront type selected showing 8 storefront items with panel drawings](/images/tutorials/mapping_dealer_items_storefront_type.jpeg)

> **Tip:** You can combine both filters — type a keyword in the name field while a type filter is active to narrow results further.

---

## Step 5 — Select the Dealer Item

Click on the dealer item card you want to assign. The dialog will close and the item name will appear in the **Dealer Item Lookup** field on the line item.

![Line item showing "Storefront SF 1-Panel" populated in the Dealer Item Lookup field](/images/tutorials/mapping_dealer_items_selected.jpeg)

---

## Step 6 — Copy Dealer Items to Other Line Items

If multiple line items need the same dealer item, you can copy and paste the value instead of looking it up again:

1. Click the **Dealer Item Lookup** field on the line item that already has a dealer item assigned
2. Select the text and press **Cmd + C** (Mac) or **Ctrl + C** (Windows) to copy

![Cursor placed in the Dealer Item Lookup field on line item 2](/images/tutorials/mapping_dealer_items_paste_target.jpeg)

3. Click the **Dealer Item Lookup** field on the target line item
4. Press **Cmd + V** (Mac) or **Ctrl + V** (Windows) to paste

![Dealer Item Lookup on line item 2 showing pasted "Storefront SF 1-Panel"](/images/tutorials/mapping_dealer_items_pasted.jpeg)

---

## Step 7 — Save

Once all line items are mapped, click **Save** to save your changes.

![Save button highlighted on the Manage Items page](/images/tutorials/mapping_dealer_items_save.jpeg)

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Open the sales document → go to **Manage Items** |
| 2 | Click **Edit** on the line item |
| 3 | Click the **zoom icon** next to Dealer Item Lookup |
| 4 | Use **Filter by Name** or **Filter by Item Type** to find the item |
| 5 | Click the dealer item card to select it |
| 6 | Copy/paste dealer item names to other line items if needed |
| 7 | Click **Save** |

> **Tip:** Always map dealer items before generating vendor purchase orders. The dealer item mapping determines which product codes and dimensions bpmPro uses when creating orders.

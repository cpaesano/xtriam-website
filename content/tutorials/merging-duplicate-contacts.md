---
title: "Merging Duplicate Contacts"
description: "Learn how to use Salesforce's built-in duplicate detection to find and merge duplicate contact records in bpmPro."
category: admin
---

# Merging Duplicate Contacts in bpmPro

Duplicate contacts create confusion — the wrong phone number gets called, emails go to the wrong address, and sales history gets split across two records. bpmPro uses Salesforce's built-in duplicate detection to alert you when duplicates exist and provides a guided merge process to combine them into a single record.

> **Important:** Merging contacts cannot be undone. Always review the field values carefully before confirming the merge.

---

## How Salesforce Detects Duplicates

When a contact is created or updated with a name that matches an existing contact, Salesforce automatically flags it. You'll see this in two places:

- **During editing** — A message appears saying "We found no potential duplicates of this Contact" (if clean) or alerting you that duplicates were found
- **On the contact record** — A blue banner appears at the top: "It looks as if duplicates exist for this Contact"

---

## Step 1 — Identify the Duplicate

When you notice two contacts with the same name under an account, open one of the contact records. In this example, the Chipper Jones account has two contacts with the same name.

![Account Workspace showing Contacts tab with two contacts — Chipper Jones and a duplicate Test First Test Last Name](/images/tutorials/duplicate_contacts_list.jpeg)

---

## Step 2 — Click View Duplicates

On the contact record, look for the blue banner at the top that says **"It looks as if duplicates exist for this Contact."** Click **View Duplicates**.

![Contact record for Chipper Jones showing the duplicate detection banner with View Duplicates link highlighted](/images/tutorials/duplicate_banner.jpeg)

---

## Step 3 — Select the Records to Merge

The **Potential Duplicate Records** screen appears, showing all matching contacts. Check the boxes next to the records you want to merge (you can select up to 3 contacts at a time).

![Potential Duplicate Records screen showing two Chipper Jones contacts with checkboxes](/images/tutorials/duplicate_select_records.jpeg)

Click **Next** to proceed to the comparison screen.

![Duplicate records list with Next button highlighted](/images/tutorials/duplicate_click_next.jpeg)

---

## Step 4 — Compare and Choose Field Values

The **Compare contacts** screen shows the two records side by side, displaying only the fields where the values differ. For each field, select which value you want to keep in the merged record:

- **Principal Record** — Choose which contact will be the surviving record by selecting **Use as principal**
- **Home Phone** — Pick the correct phone number (or leave empty)
- **Mailing Address** — Select the correct address
- **Created Date** and **Last Modified Date** — Shown for reference

![Compare contacts screen showing field-by-field comparison with radio buttons to select values from each record](/images/tutorials/duplicate_compare_fields.jpeg)

> **Tip:** Click **Show All Fields** at the bottom to see every field, not just the ones with different values. Use **Select All** under a contact's name to quickly choose all values from one record.

Click **Next** when you've selected the correct values for each field.

---

## Step 5 — Confirm and Merge

The final screen warns that merging cannot be undone. Review the confirmation message, then click **Merge** to combine the records.

![Confirm merge screen showing "You're about to merge these contacts. You can't undo merging." with Merge button highlighted](/images/tutorials/duplicate_confirm_merge.jpeg)

After merging:
- The **principal record** is kept with your selected field values
- The **duplicate record** is deleted
- All related records (projects, sales documents, activities) from the deleted contact are automatically moved to the surviving contact

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Open the duplicate contact record |
| 2 | Click **View Duplicates** in the blue banner |
| 3 | Check the records to merge → Click **Next** |
| 4 | Compare fields and select the values to keep → Click **Next** |
| 5 | Click **Merge** to confirm |

---

## Related Tutorials

- [Lead Quick Start Wizard](/support/tutorials/lead-quickstart-wizard) — The wizard includes built-in duplicate detection to prevent creating duplicate records

---
title: "Adding Work Assignment Calendars"
description: "Learn how to create custom calendars in bpmPro to visualize your work assignments — installations, measurements, and appointments — right on the calendar."
category: operations
---

# Adding Work Assignment Calendars in bpmPro

By default, bpmPro's calendar only shows your personal events. But you can add custom calendars that display your **work assignments** — installations, final measurements, measuring appointments, and more — so your entire schedule is visible in one place.

Here's what the calendar looks like after adding work assignment calendars:

![Calendar view with custom work assignment calendars showing installations, final measurements, and measuring appointments](/images/tutorials/calendar_sidebar_after_setup.jpeg)

Compare that to the default view, which only shows **My Events**:

![Default calendar sidebar showing only My Events](/images/tutorials/calendar_my_events_default.jpeg)

---

## Step 1 — Open Calendar Settings

From the calendar view, click the **Settings gear icon** in the top-right corner of the sidebar. A tooltip will show **New Calendar**.

![Settings gear icon with New Calendar tooltip](/images/tutorials/calendar_settings_gear_icon.jpeg)

---

## Step 2 — Select the Object

In the first step of the Create Calendar wizard, you need to select which Salesforce object the calendar will pull data from.

![Create Calendar Step 1 showing the object selector](/images/tutorials/calendar_step1_object_selector.jpeg)

Click the **Object** dropdown and select **Work Assignment**.

![Object dropdown with Work Assignment selected](/images/tutorials/calendar_step1_work_assignment.jpeg)

Click **Next** to continue.

---

## Step 3 — Configure Calendar Details

On the second screen, fill out the calendar details:

![Create Calendar Step 2 showing the calendar details form](/images/tutorials/calendar_step2_details_form.jpeg)

Here's an example of a completed calendar for **Final Measurements**:

![Edit Calendar form filled out with Final Measurements example](/images/tutorials/calendar_step2_filled_example.jpeg)

**Fields to configure:**

| Field | What to Enter |
|-------|---------------|
| **Calendar Name** | A descriptive name (e.g., "Final Measurements", "Installations") |
| **Start Date & Time** | The field that contains the start date — select from the dropdown |
| **End Date & Time** | The field that contains the end date — select from the dropdown |
| **Filter by** | Filter to only show specific work assignment types (e.g., filter by assignment type) |
| **Field Name to Display** | What text to show on the calendar event — typically **Resource and Project** so you can see who is assigned and which project it's for |

Here's a completed example showing all fields filled in:

![Completed calendar form with all fields configured including Resource and Project display](/images/tutorials/calendar_step2_completed.jpeg)

Click **Save** when you're done.

---

## Recommended Calendars to Create

For most bpmPro users, we recommend creating these three work assignment calendars:

| Calendar Name | Purpose |
|---------------|---------|
| **Installations** | See all scheduled installation jobs |
| **Final Measurements** | Track final measurement appointments |
| **Measuring Appointments** | Track initial measuring appointments |

Repeat the steps above for each calendar you want to add. Once created, they will appear in your sidebar and you can toggle them on and off as needed.

---

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Click the **Settings gear icon** in the calendar sidebar |
| 2 | Select **Work Assignment** as the object |
| 3 | Fill in the calendar name, date fields, filter, and display field |
| 4 | Click **Save** |
| 5 | Repeat for each work assignment type you want to track |

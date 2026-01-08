---
title: "Adding Work Assignments to Calendar"
keywords:
  - calendar
  - work assignment
  - work assignments
  - my calendar
  - schedule
  - scheduling
  - final measurements
  - installations
  - measuring appointments
  - add calendar
  - new calendar
category: "operations"
---

Adding Work Assignments to Calendar

Overview:
You can add Work Assignment dates to your "My Calendar" section in bpmPro. This allows you to see scheduled work assignments (like Final Measurements, Installations, and Measuring Appointments) directly on your calendar alongside your regular events.

What You'll Achieve:
After setup, your calendar will show multiple color-coded calendars:
- My Events (Blue) - Your personal events
- Final Measurements (Green) - Final measurement appointments
- Installations (Orange) - Installation schedules
- Measuring Appointments (Purple) - Initial measuring appointments

How to Access:
1. Click the Calendar tab in the navigation bar
2. Look for the "My Calendars" section on the right side

Step-by-Step Guide:

Step 1: Open Calendar Settings
1. Navigate to the Calendar tab
2. Find the "My Calendars" section (bottom right of calendar view)
3. Click the Settings icon (gear/cog) next to "My Calendars"
4. Click "New Calendar"

Step 2: Select Work Assignment Object
1. In the "Create Calendar" dialog (Step 1 of 2), you'll see "Create a calendar from a Salesforce standard or custom object"
2. Click the Object dropdown (shows "Select...")
3. Scroll down and select "Work Assignment"
4. Click Next

Step 3: Configure Calendar Details
Fill out the following fields:
- Calendar Name: Name for this calendar (e.g., "Final Measurements")
- Field for Start: Select "Start Date & Time (Date/Time)"
- Field for End: Select "End Date & Time (Date/Time)"
- Apply a Filter: Choose work assignment type (e.g., "31 ~ All ~ Final Measurements")
- Field Name to Display: Select "Resource and Project"

Step 4: Save
1. Review your settings
2. Click Save
3. The new calendar appears in your "My Calendars" list

Repeat for Other Work Assignment Types:
Create separate calendars for each type:
- Final Measurements
- Installations
- Measuring Appointments

Field Options for Display:
When choosing "Field Name to Display", common options include:
- Resource and Project: Shows who is assigned and which project
- Resource and Location: Shows who is assigned and the address
- Resource Full Name: Shows just the assigned person's name
- Project Full Address: Shows the project location

Common Issues:

Calendar Not Showing Work Assignments:
- Make sure you selected the correct filter for the work assignment type
- Verify work assignments have Start Date & Time filled in
- Check that you have access to view those work assignments

Times Are Wrong:
- Ensure you selected date/time fields (not just date fields) for both Start and End
- Check your timezone settings in Salesforce

Can't Find Work Assignment in Object List:
- Scroll down in the dropdown - it's alphabetical
- If not visible, contact your admin - you may need permissions

Tips:
- Use different colors for each calendar type to easily distinguish them
- You can show/hide calendars by clicking the checkbox next to each one
- Click on a calendar item to jump directly to the Work Assignment record
- Create calendars only for the work assignment types you need to track

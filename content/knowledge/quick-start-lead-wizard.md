---
title: "Quick Start Lead Wizard"
keywords:
  - lead
  - new lead
  - create lead
  - quick start
  - lead wizard
  - schedule appointment
  - book appointment
  - sales appointment
  - speed to lead
  - new customer
  - incoming call
  - walk-in
  - duplicate
  - team calendar
category: "leads"
---

Quick Start Lead Wizard

Overview:
The Quick Start Lead Wizard is a step-by-step tool for creating new leads quickly while on the phone with a customer. It handles everything in one screen: client information, address, project details, appointment scheduling, and sales rep notification. No need to jump between multiple screens.

How to Access:
From the Command Center, click the "New Lead" tile. Or navigate to the Quick Start Lead Wizard tab.

Step-by-Step Guide:

Step 1: Contact Information
1. Enter the customer's first name, last name, mobile, and email
2. The system automatically checks for duplicate accounts and contacts
3. If duplicates are found, you can use the existing record or create a new one

Step 2: Address
1. Enter the billing address (street, city, state, zip)
2. Use the address autocomplete to speed things up
3. If the project address is different from billing, uncheck "Same as Billing" and enter the project address

Step 3: Project Details
1. Select Service Type (required)
2. Select Lead Source, Construction Type, and Relationship
3. Assign a Sales Person and Project Manager
4. Add any notes for the sales person

Step 4: Schedule Appointment (Optional)
1. The assigned sales person is pre-selected as the appointment employee
2. Use the team calendar sidebar to check availability (day, week, or month view)
3. Pick a date and time for the appointment
4. Or click "Skip Appointment" if no appointment is needed right now

Step 5: Review and Create
1. Review all the information: contact, project details, and appointment
2. Check "Create Sales Document" if you want a quote started automatically
3. Check "Send Notification to Sales Person" to email the rep with all the details including appointment info
4. If an appointment was scheduled, optionally check "Send Appointment Confirmation to Client" to send the customer a confirmation email with a calendar invite
5. Click "Create Lead" to create everything at once

What Gets Created:
- A new Account (or uses existing if duplicate was selected)
- A new Contact linked to the account
- A new Project
- A Sales Document (optional)
- A calendar Event for the appointment (if scheduled)
- Notification email to the sales rep (if checked)
- Confirmation email to the client with .ics calendar invite (if checked)

Sidebar Features:
The wizard includes two sidebars:
- Lead Pipeline: Shows how many unquoted leads each sales rep has, helping you balance workload
- Team Calendar: Shows the full team schedule so you can find open time slots before booking

Common Issues:

Sales person not showing in the dropdown:
- The employee must have an active Contact under the Owning Entity account
- They must have Company Role Active checked

Appointment not visible after creation:
- The appointment is created as a Salesforce Event owned by the selected employee
- Check the employee's calendar in Salesforce

Tips:
- Use this wizard for phone calls and walk-ins where speed matters
- The pipeline sidebar helps you assign leads to the least busy sales rep
- The notification email includes all appointment details so the sales rep has everything in one place

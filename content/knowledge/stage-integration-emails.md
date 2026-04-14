---
title: "Stage Integration Emails"
keywords:
  - integration email
  - stage email
  - notification
  - stage notification
  - automation
  - chiirp
  - zapier
  - webhook
  - trigger email
  - stage change
  - workflow automation
category: "integrations"
---

Stage Integration Emails

Overview:
Stage Integration Emails automatically send email notifications when a project reaches specific stages. These emails can trigger external automation platforms like Chiirp, Zapier, or a8n.pro for follow-up workflows.

How to Access:
Integration emails are configured on Project Stage records. Go to Setup, then navigate to Project Stage records.

Setting Up Integration Emails:

1. Open the Project Stage record where you want emails triggered
2. Check the "Enable Integration Emails" checkbox
3. Enter the target email addresses in "Integration Email Addresses" (comma-separated for multiple recipients)
4. Save the record

When Integration Emails Fire:
- When a Project Stage Assignment status changes to "Passed" (stage completed)
- The email is sent to all addresses listed on that Project Stage

Email Content:
The integration email includes:
- Project number and name
- Customer name and contact info
- The stage that was completed
- Project address
- Additional project details

Use Cases:
- Trigger Chiirp automated follow-ups when installation is complete
- Notify a Zapier workflow to update external systems
- Send alerts to management when specific stages are reached
- Feed AI automation platforms (like a8n.pro) with project status updates

Common Issues:

Emails not sending:
- Verify "Enable Integration Emails" is checked on the Project Stage
- Check that the email addresses are entered correctly
- Make sure DKIM domain verification is set up for your org (required by Salesforce)

Emails going to spam:
- Add the Salesforce sending domain to the recipient's safe sender list
- DKIM verification helps with deliverability

Tips:
- Test with your own email address first before connecting to automation platforms
- Each Project Stage can have different recipient addresses
- Integration emails work alongside internal notifications, they are separate systems

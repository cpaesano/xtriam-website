import { NextRequest, NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";

/**
 * Email Open Tracking Pixel
 *
 * This endpoint serves a 1x1 transparent GIF and records the email open
 * in Salesforce. It's embedded in marketing emails as an invisible image.
 *
 * Query Parameters:
 * - cid: Contact ID
 * - camp: Campaign ID (optional)
 *
 * Usage in email:
 * <img src="https://www.xtriam.com/api/email/track?cid=003xxx&camp=701xxx" width="1" height="1" />
 */

// 1x1 transparent GIF
const TRACKING_PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(request: NextRequest) {
  try {
    // Get tracking parameters
    const searchParams = request.nextUrl.searchParams;
    const contactId = searchParams.get("cid");
    const campaignId = searchParams.get("camp");

    // Log the open (async, don't block response)
    if (contactId) {
      // Fire and forget - don't wait for Salesforce
      logEmailOpen(contactId, campaignId).catch((error) => {
        console.error("Failed to log email open:", error);
      });
    }

    // Return tracking pixel immediately
    return new NextResponse(TRACKING_PIXEL, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Tracking pixel error:", error);
    // Still return the pixel even on error
    return new NextResponse(TRACKING_PIXEL, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
      },
    });
  }
}

/**
 * Log email open to Salesforce
 */
async function logEmailOpen(
  contactId: string,
  campaignId: string | null
): Promise<void> {
  const conn = await getSalesforceConnection();

  // Create a Task to record the open
  const taskData: Record<string, unknown> = {
    Subject: "Email Opened",
    Description: `Marketing email was opened.\nContact ID: ${contactId}${campaignId ? `\nCampaign ID: ${campaignId}` : ""}\nTimestamp: ${new Date().toISOString()}`,
    Status: "Completed",
    Priority: "Normal",
    WhoId: contactId,
    ActivityDate: new Date().toISOString().split("T")[0],
    TaskSubtype: "Email",
  };

  // Try to find related Opportunity to link to WhatId
  const oppQuery = `
    SELECT Id FROM Opportunity
    WHERE AccountId IN (SELECT AccountId FROM Contact WHERE Id = '${contactId}')
    AND IsClosed = false
    ORDER BY CreatedDate DESC
    LIMIT 1
  `;

  try {
    const oppResult = await conn.query<{ Id: string }>(oppQuery);
    if (oppResult.records.length > 0) {
      taskData.WhatId = oppResult.records[0].Id;
    }
  } catch (e) {
    // Ignore - WhatId is optional
  }

  // Create the Task
  await conn.sobject("Task").create(taskData);

  // If campaign specified, update CampaignMember status
  if (campaignId) {
    try {
      const cmQuery = `
        SELECT Id, Status FROM CampaignMember
        WHERE CampaignId = '${campaignId}' AND ContactId = '${contactId}'
        LIMIT 1
      `;
      const cmResult = await conn.query<{ Id: string; Status: string }>(cmQuery);

      if (cmResult.records.length > 0 && cmResult.records[0].Status === "Sent") {
        await conn.sobject("CampaignMember").update({
          Id: cmResult.records[0].Id,
          Status: "Responded",
        });
      }
    } catch (e) {
      // Ignore campaign member update errors
    }
  }
}

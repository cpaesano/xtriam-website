import { NextRequest, NextResponse } from "next/server";
import { getSalesforceConnection } from "@/lib/salesforce";

/**
 * Email Unsubscribe API
 *
 * Processes unsubscribe requests from marketing emails.
 * Updates the Contact's HasOptedOutOfEmail field in Salesforce.
 *
 * GET: Verify token is valid (used by unsubscribe page)
 * POST: Process the unsubscribe
 *
 * Query/Body Parameters:
 * - token: The unique unsubscribe token from the email
 */

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const conn = await getSalesforceConnection();

    // Find contact by unsubscribe token
    const query = `
      SELECT Id, FirstName, LastName, Email, HasOptedOutOfEmail
      FROM Contact
      WHERE Email_Unsubscribe_Token__c = '${token.replace(/'/g, "\\'")}'
      LIMIT 1
    `;

    const result = await conn.query<{
      Id: string;
      FirstName: string;
      LastName: string;
      Email: string;
      HasOptedOutOfEmail: boolean;
    }>(query);

    if (result.records.length === 0) {
      return NextResponse.json(
        { valid: false, error: "Invalid token" },
        { status: 404 }
      );
    }

    const contact = result.records[0];

    return NextResponse.json({
      valid: true,
      email: contact.Email,
      firstName: contact.FirstName,
      alreadyUnsubscribed: contact.HasOptedOutOfEmail,
    });
  } catch (error) {
    console.error("Unsubscribe verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const conn = await getSalesforceConnection();

    // Find contact by unsubscribe token
    const query = `
      SELECT Id, Email, HasOptedOutOfEmail
      FROM Contact
      WHERE Email_Unsubscribe_Token__c = '${token.replace(/'/g, "\\'")}'
      LIMIT 1
    `;

    const result = await conn.query<{
      Id: string;
      Email: string;
      HasOptedOutOfEmail: boolean;
    }>(query);

    if (result.records.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 404 }
      );
    }

    const contact = result.records[0];

    // Check if already unsubscribed
    if (contact.HasOptedOutOfEmail) {
      return NextResponse.json({
        success: true,
        message: "You were already unsubscribed",
        alreadyUnsubscribed: true,
      });
    }

    // Update the contact to opt out
    await conn.sobject("Contact").update({
      Id: contact.Id,
      HasOptedOutOfEmail: true,
    });

    // Log the unsubscribe as a Task
    await conn.sobject("Task").create({
      Subject: "Unsubscribed from Marketing Emails",
      Description: `Contact unsubscribed from marketing emails via link.\nEmail: ${contact.Email}\nTimestamp: ${new Date().toISOString()}`,
      Status: "Completed",
      Priority: "Normal",
      WhoId: contact.Id,
      ActivityDate: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
      email: contact.Email,
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

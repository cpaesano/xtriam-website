import jsforce, { Connection } from "jsforce";
import type {
  SalesforceContact,
  SalesforceAccount,
  SalesforceCase,
} from "@/types/auth";

let connection: Connection | null = null;

/**
 * Get or create a cached Salesforce connection
 */
export async function getSalesforceConnection(): Promise<Connection> {
  if (connection && connection.accessToken) {
    return connection;
  }

  connection = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL || "https://login.salesforce.com",
  });

  await connection.login(
    process.env.SF_USERNAME!,
    process.env.SF_PASSWORD! + (process.env.SF_SECURITY_TOKEN || "")
  );

  return connection;
}

/**
 * Normalize phone number to match Salesforce format
 * Handles various input formats and returns (XXX) XXX-XXXX
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");

  // Handle 10-digit number
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // Handle 11-digit number starting with 1
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // Return cleaned digits if format doesn't match
  return digits;
}

/**
 * Find a Contact by phone number
 * Searches Phone, MobilePhone, HomePhone, and OtherPhone fields
 */
export async function findContactByPhone(
  phone: string
): Promise<SalesforceContact | null> {
  const conn = await getSalesforceConnection();
  const normalizedPhone = normalizePhoneNumber(phone);

  // Escape single quotes for SOQL
  const escapedPhone = normalizedPhone.replace(/'/g, "\\'");

  const query = `
    SELECT Id, FirstName, LastName, Email, Phone, MobilePhone, HomePhone, OtherPhone,
           AccountId, Account.Id, Account.Name
    FROM Contact
    WHERE Phone = '${escapedPhone}'
       OR MobilePhone = '${escapedPhone}'
       OR HomePhone = '${escapedPhone}'
       OR OtherPhone = '${escapedPhone}'
    LIMIT 1
  `;

  const result = await conn.query<SalesforceContact>(query);

  return result.records.length > 0 ? result.records[0] : null;
}

/**
 * Get Account information by ID
 */
export async function getAccountInfo(
  accountId: string
): Promise<SalesforceAccount | null> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT Id, Name, Phone, BillingStreet, BillingCity, BillingState,
           BillingPostalCode, Website, Description
    FROM Account
    WHERE Id = '${accountId}'
  `;

  const result = await conn.query<SalesforceAccount>(query);

  return result.records.length > 0 ? result.records[0] : null;
}

/**
 * Get all Cases for a Contact
 */
export async function getCases(contactId: string): Promise<SalesforceCase[]> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT Id, CaseNumber, Subject, Status, Priority, Description,
           CreatedDate, ClosedDate, LastModifiedDate
    FROM Case
    WHERE ContactId = '${contactId}'
    ORDER BY CreatedDate DESC
  `;

  const result = await conn.query<SalesforceCase>(query);

  return result.records;
}

/**
 * Get a single Case by ID
 */
export async function getCaseById(
  caseId: string
): Promise<SalesforceCase | null> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT Id, CaseNumber, Subject, Status, Priority, Description,
           CreatedDate, ClosedDate, LastModifiedDate
    FROM Case
    WHERE Id = '${caseId}'
  `;

  const result = await conn.query<SalesforceCase>(query);

  return result.records.length > 0 ? result.records[0] : null;
}

/**
 * Create a new Case (support ticket)
 */
export async function createCase(data: {
  contactId: string;
  accountId: string;
  subject: string;
  description: string;
  priority?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const conn = await getSalesforceConnection();

  try {
    const result = await conn.sobject("Case").create({
      ContactId: data.contactId,
      AccountId: data.accountId,
      Subject: data.subject,
      Description: data.description,
      Priority: data.priority || "Medium",
      Origin: "Web",
      Status: "New",
    });

    if (result.success) {
      return { success: true, id: result.id };
    } else {
      return { success: false, error: "Failed to create case" };
    }
  } catch (error) {
    console.error("Salesforce createCase error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

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
 * Uses LIKE queries to match various phone formats
 */
export async function findContactByPhone(
  phone: string
): Promise<SalesforceContact | null> {
  const conn = await getSalesforceConnection();

  // Extract just the digits for flexible matching
  const digits = phone.replace(/\D/g, "");

  // Handle 11-digit numbers starting with 1 (US country code)
  const searchDigits = digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;

  if (searchDigits.length !== 10) {
    console.error("Invalid phone number length:", searchDigits.length);
    return null;
  }

  // Create a pattern that matches the last 10 digits regardless of formatting
  // Using LIKE with % wildcards to match any format
  const pattern = `%${searchDigits.slice(0, 3)}%${searchDigits.slice(3, 6)}%${searchDigits.slice(6)}%`;

  const query = `
    SELECT Id, FirstName, LastName, Email, Phone, MobilePhone, HomePhone, OtherPhone,
           AccountId, Account.Id, Account.Name
    FROM Contact
    WHERE Phone LIKE '${pattern}'
       OR MobilePhone LIKE '${pattern}'
       OR HomePhone LIKE '${pattern}'
       OR OtherPhone LIKE '${pattern}'
    LIMIT 1
  `;

  console.log("Searching for phone pattern:", pattern);

  const result = await conn.query<SalesforceContact>(query);

  if (result.records.length > 0) {
    console.log("Found contact:", result.records[0].FirstName, result.records[0].LastName);
  } else {
    console.log("No contact found for pattern:", pattern);
  }

  return result.records.length > 0 ? result.records[0] : null;
}

/**
 * Admin contact search (for logging tickets on behalf of a client).
 * Matches Name / Email, and phone fields when the term looks like a number.
 * Returns up to 10 results, ordered by Name.
 *
 * NOTE: identity source is the xTriam Salesforce org, the SAME source
 * phone-PIN login resolves against. A ticket stored under one of these
 * contactIds only surfaces for a client who ALSO logs in via phone-PIN.
 * SSO users (bpmPro "Need Help?" button) get a subscriber-org contactId,
 * which will not match — see the admin intake modal's identity note.
 */
export interface ContactSearchResult {
  Id: string;
  Name: string;
  Email: string | null;
  AccountId: string;
  AccountName: string;
  Phone: string | null;
  MobilePhone: string | null;
}

export async function searchContacts(q: string): Promise<ContactSearchResult[]> {
  const term = (q || "").trim();
  if (term.length < 2) return [];

  const conn = await getSalesforceConnection();

  // Escape SOQL string literals to prevent injection (jsforce does not param-bind).
  const escapeSoql = (s: string) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  const like = `%${escapeSoql(term)}%`;

  const clauses = [`Name LIKE '${like}'`, `Email LIKE '${like}'`];

  // When the term carries enough digits, also match phone fields regardless of
  // formatting by interleaving the digits with wildcards.
  const digits = term.replace(/\D/g, "");
  if (digits.length >= 7) {
    const phonePattern = `%${digits.split("").join("%")}%`;
    clauses.push(
      `Phone LIKE '${phonePattern}'`,
      `MobilePhone LIKE '${phonePattern}'`,
      `HomePhone LIKE '${phonePattern}'`,
      `OtherPhone LIKE '${phonePattern}'`
    );
  }

  const query = `
    SELECT Id, Name, Email, Phone, MobilePhone, AccountId, Account.Name
    FROM Contact
    WHERE ${clauses.join(" OR ")}
    ORDER BY Name
    LIMIT 10
  `;

  const result = await conn.query<{
    Id: string;
    Name: string;
    Email: string | null;
    Phone: string | null;
    MobilePhone: string | null;
    AccountId: string;
    Account?: { Name: string };
  }>(query);

  return result.records.map((r) => ({
    Id: r.Id,
    Name: r.Name,
    Email: r.Email,
    AccountId: r.AccountId,
    AccountName: r.Account?.Name ?? "",
    Phone: r.Phone,
    MobilePhone: r.MobilePhone,
  }));
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
 * Get all Cases across all contacts (admin view)
 */
export async function getAllCases(): Promise<SalesforceCase[]> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT Id, CaseNumber, Subject, Status, Priority, Description,
           CreatedDate, ClosedDate, LastModifiedDate,
           Contact.Name, Contact.Account.Name
    FROM Case
    ORDER BY CreatedDate DESC
    LIMIT 500
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
 * Get adjacent Case IDs (prev/next) for navigation
 * Uses CaseNumber DESC ordering (stable, unique per case)
 * Fetches the full ordered ID list and finds neighbors by position
 */
export async function getAdjacentCaseIds(
  caseId: string,
  contactId?: string
): Promise<{ prevCaseId: string | null; nextCaseId: string | null }> {
  const conn = await getSalesforceConnection();

  const contactFilter = contactId ? `WHERE ContactId = '${contactId}'` : "";

  const result = await conn.query<{ Id: string }>(
    `SELECT Id FROM Case ${contactFilter} ORDER BY CaseNumber DESC`
  );

  const ids = result.records.map((r) => r.Id);
  const currentIndex = ids.indexOf(caseId);

  if (currentIndex === -1) {
    return { prevCaseId: null, nextCaseId: null };
  }

  return {
    prevCaseId: currentIndex > 0 ? ids[currentIndex - 1] : null,
    nextCaseId: currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null,
  };
}

/**
 * Get comments for a Case
 */
export interface CaseComment {
  Id: string;
  CommentBody: string;
  CreatedDate: string;
  CreatedBy: {
    Name: string;
  };
  IsPublished: boolean;
}

export async function getCaseComments(caseId: string): Promise<CaseComment[]> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT Id, CommentBody, CreatedDate, CreatedBy.Name, IsPublished
    FROM CaseComment
    WHERE ParentId = '${caseId}'
    ORDER BY CreatedDate DESC
  `;

  const result = await conn.query<CaseComment>(query);
  return result.records;
}

/**
 * Add a comment to a Case
 */
export async function addCaseComment(
  caseId: string,
  commentBody: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const conn = await getSalesforceConnection();
    await conn.sobject("CaseComment").create({
      ParentId: caseId,
      CommentBody: commentBody,
      IsPublished: false,
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding case comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

/**
 * Update a Case's status
 */
export async function updateCaseStatus(
  caseId: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const conn = await getSalesforceConnection();
    await conn.sobject("Case").update({ Id: caseId, Status: status });
    return { success: true };
  } catch (error) {
    console.error("Error updating case status:", error);
    return { success: false, error: "Failed to update case status" };
  }
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
  type?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const conn = await getSalesforceConnection();

  try {
    const result = await conn.sobject("Case").create({
      ContactId: data.contactId,
      AccountId: data.accountId,
      Subject: data.subject,
      Description: data.description,
      Priority: data.priority || "Medium",
      Type: data.type || "Issue",
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

/**
 * Upload a file to Salesforce and attach it to a record (e.g., Case)
 * Uses ContentVersion + ContentDocumentLink
 */
export async function uploadFileToRecord(data: {
  recordId: string;
  fileName: string;
  base64Data: string;
  contentType: string;
}): Promise<{ success: boolean; contentDocumentId?: string; error?: string }> {
  const conn = await getSalesforceConnection();

  try {
    // Step 1: Create ContentVersion (the file itself)
    const contentVersion = await conn.sobject("ContentVersion").create({
      Title: data.fileName,
      PathOnClient: data.fileName,
      VersionData: data.base64Data,
      FirstPublishLocationId: data.recordId, // Automatically creates ContentDocumentLink
    });

    if (!contentVersion.success) {
      return { success: false, error: "Failed to upload file to Salesforce" };
    }

    // Query to get the ContentDocumentId
    const cvRecord = await conn.query<{ ContentDocumentId: string }>(
      `SELECT ContentDocumentId FROM ContentVersion WHERE Id = '${contentVersion.id}'`
    );

    const contentDocumentId = cvRecord.records[0]?.ContentDocumentId;

    console.log(`File uploaded: ${data.fileName}, ContentDocumentId: ${contentDocumentId}`);

    return { success: true, contentDocumentId };
  } catch (error) {
    console.error("Salesforce uploadFileToRecord error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload file",
    };
  }
}

/**
 * Get files attached to a record
 */
export async function getFilesForRecord(
  recordId: string
): Promise<{ Id: string; Title: string; ContentDocumentId: string; FileExtension: string; ContentSize: number }[]> {
  const conn = await getSalesforceConnection();

  const query = `
    SELECT ContentDocument.Id, ContentDocument.Title, ContentDocument.FileExtension,
           ContentDocument.ContentSize, ContentDocument.LatestPublishedVersionId
    FROM ContentDocumentLink
    WHERE LinkedEntityId = '${recordId}'
  `;

  const result = await conn.query<{
    ContentDocument: {
      Id: string;
      Title: string;
      FileExtension: string;
      ContentSize: number;
      LatestPublishedVersionId: string;
    };
  }>(query);

  return result.records.map((r) => ({
    Id: r.ContentDocument.LatestPublishedVersionId,
    Title: r.ContentDocument.Title,
    ContentDocumentId: r.ContentDocument.Id,
    FileExtension: r.ContentDocument.FileExtension,
    ContentSize: r.ContentDocument.ContentSize,
  }));
}

import { JWTPayload } from "jose";

// Session payload stored in JWT cookie
export interface SessionPayload extends JWTPayload {
  contactId: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // SSO-specific fields (optional, present when authenticated via package SSO)
  authMethod?: "phone" | "sso";
  orgId?: string;      // Subscriber org ID (SSO only)
  orgName?: string;    // Subscriber org name (SSO only)
  sfUserId?: string;   // Salesforce User ID from subscriber org (SSO only)
}

// SSO Token payload from bpmPro package
export interface SSOTokenPayload {
  sub: string;       // Salesforce User ID
  name: string;      // User's full name
  email: string;     // User's email
  phone: string;     // User's phone (digits only)
  orgId: string;     // Subscriber Org ID
  orgName: string;   // Subscriber Org Name
  iat: number;       // Issued at (Unix timestamp)
  exp: number;       // Expires at (Unix timestamp)
}

// Salesforce Contact record
export interface SalesforceContact {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string | null;
  Phone: string | null;
  MobilePhone: string | null;
  HomePhone: string | null;
  OtherPhone: string | null;
  AccountId: string;
  Account?: {
    Id: string;
    Name: string;
  };
}

// Salesforce Account record
export interface SalesforceAccount {
  Id: string;
  Name: string;
  Phone: string | null;
  BillingStreet: string | null;
  BillingCity: string | null;
  BillingState: string | null;
  BillingPostalCode: string | null;
  Website: string | null;
  Description: string | null;
}

// Salesforce Case record
export interface SalesforceCase {
  Id: string;
  CaseNumber: string;
  Subject: string;
  Status: string;
  Priority: string;
  Description: string | null;
  CreatedDate: string;
  ClosedDate: string | null;
  LastModifiedDate: string;
}

// API request/response types
export interface SendPinRequest {
  phone: string;
}

export interface VerifyPinRequest {
  phone: string;
  pin: string;
}

export interface CreateTicketRequest {
  subject: string;
  description: string;
  priority?: "Low" | "Medium" | "High";
  type?: "Issue" | "Feature Request" | "Question";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

// User info returned to client (safe to expose)
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { SalesforceAccount } from "@/types/auth";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function AccountCard() {
  const [account, setAccount] = useState<SalesforceAccount | null>(null);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      try {
        const response = await fetch("/api/support/account");
        const data = await response.json();

        if (data.success) {
          setAccount(data.account);
          setContact(data.contact);
        } else {
          setError(data.error || "Failed to load account");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    }

    fetchAccount();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      {contact && (
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Your Information
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Name</div>
                <div className="font-medium text-foreground">
                  {contact.firstName} {contact.lastName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-brand-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <a
                  href={`tel:${contact.phone}`}
                  className="font-medium text-brand-blue-600 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      {account && (
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-600">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Company Information
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Company Name</div>
                <div className="font-medium text-foreground">{account.Name}</div>
              </div>
            </div>

            {account.Phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">
                    Company Phone
                  </div>
                  <a
                    href={`tel:${account.Phone}`}
                    className="font-medium text-brand-blue-600 hover:underline"
                  >
                    {account.Phone}
                  </a>
                </div>
              </div>
            )}

            {account.Website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Website</div>
                  <a
                    href={
                      account.Website.startsWith("http")
                        ? account.Website
                        : `https://${account.Website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-blue-600 hover:underline"
                  >
                    {account.Website}
                  </a>
                </div>
              </div>
            )}

            {(account.BillingStreet ||
              account.BillingCity ||
              account.BillingState) && (
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground">Address</div>
                  <div className="font-medium text-foreground">
                    {account.BillingStreet && (
                      <div>{account.BillingStreet}</div>
                    )}
                    <div>
                      {[
                        account.BillingCity,
                        account.BillingState,
                        account.BillingPostalCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {account.Description && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">About</div>
              <p className="text-sm text-foreground">{account.Description}</p>
            </div>
          )}
        </div>
      )}

      {/* Support Contact */}
      <div className="rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-6">
        <h3 className="font-semibold text-brand-blue-900 mb-2">
          Need to update your information?
        </h3>
        <p className="text-sm text-brand-blue-700">
          Contact us at{" "}
          <a
            href="mailto:support@xtriam.com"
            className="font-medium underline"
          >
            support@xtriam.com
          </a>{" "}
          or call{" "}
          <a href="tel:305-204-9694" className="font-medium underline">
            (305) 204-9694
          </a>{" "}
          to update your account information.
        </p>
      </div>
    </div>
  );
}

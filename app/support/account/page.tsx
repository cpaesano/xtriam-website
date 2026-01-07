import { Metadata } from "next";
import { AccountCard } from "@/components/support";

export const metadata: Metadata = {
  title: "Account Information | bpmPro Customer Portal",
  description: "View your account and contact information.",
};

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Account Information
        </h1>
        <p className="mt-1 text-muted-foreground">
          View your contact and company details
        </p>
      </div>

      <AccountCard />
    </div>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import { PasscodeForm } from "@/components/proposal/PasscodeForm";
import { getProposalConfig } from "@/lib/proposal";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Proposal Access | xTriam",
  robots: { index: false, follow: false },
};

export default async function ProposalAccessPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const config = getProposalConfig(code);

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-950 to-brand-blue-900 flex flex-col">
      <header className="p-6">
        <Image
          src="/images/logo/xTriam-Logo-Outlines-White-Orange.png"
          alt="xTriam"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-2xl shadow-2xl p-8 sm:p-10">
            <PasscodeForm code={code} />
          </div>

          <p className="mt-8 text-center text-sm text-brand-blue-300">
            Prepared for {config.client} &middot; {config.date}
          </p>
        </div>
      </main>

      <footer className="p-6 text-center text-sm text-brand-blue-400">
        &copy; {new Date().getFullYear()} xTriam, LLC. All rights reserved.
      </footer>
    </div>
  );
}

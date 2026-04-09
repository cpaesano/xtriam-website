import { Metadata } from "next";
import { ThemeProvider } from "@/components/proposal/ThemeProvider";
import { ViewerProvider } from "@/components/proposal/ViewerProvider";
import { ScrollProgress } from "@/components/proposal/ScrollProgress";
import { ProposalNav } from "@/components/proposal/ProposalNav";
import { getProposalConfig } from "@/lib/proposal";

export const metadata: Metadata = {
  title: "xTriam — Palm City Iron Works Proposal",
  robots: { index: false, follow: false },
};

export default async function ProposalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const config = getProposalConfig(code);

  return (
    <ThemeProvider>
      <ViewerProvider>
        <ScrollProgress />
        <ProposalNav clientName={config?.client || ""} />
        <main>{children}</main>
      </ViewerProvider>
    </ThemeProvider>
  );
}

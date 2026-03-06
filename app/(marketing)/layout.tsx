import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingHelpButton } from "@/components/ui/FloatingHelpButton";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingHelpButton />
    </>
  );
}

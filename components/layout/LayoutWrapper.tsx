"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingHelpButton } from "@/components/ui";

// Routes that should NOT show the main site header/footer
const PORTAL_ROUTES = ["/support", "/login"];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current path is a portal route
  const isPortalRoute = PORTAL_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Portal routes get a clean layout without main site chrome
  if (isPortalRoute) {
    return <>{children}</>;
  }

  // Marketing pages get the full header/footer
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingHelpButton />
    </>
  );
}

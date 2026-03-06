import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { MobileMenuButton, DesktopMoreDropdown } from "./MobileNav";

const primaryNav = [
  { label: "Meet bpmPro", href: "/bpmpro" },
  { label: "Features", href: "/bpmpro-features" },
  { label: "Cash Calculator", href: "/savings" },
  { label: "Success Stories", href: "/customer-success-stories" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/xTriam-Logo-Outlines-Blue-Orange.png"
            alt="xTriam"
            width={140}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* More Dropdown (client component) */}
          <DesktopMoreDropdown />
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-blue-200 bg-brand-blue-50 px-4 py-2 text-sm font-medium text-brand-blue-700 hover:bg-brand-blue-100 hover:border-brand-blue-300 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Customer Portal
          </Link>
          <Link href="/book-a-demo">
            <Button variant="accent">Book a Demo</Button>
          </Link>
        </div>

        {/* Mobile menu button (client component) */}
        <MobileMenuButton />
      </nav>
    </header>
  );
}

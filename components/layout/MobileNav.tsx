"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

const primaryNav = [
  { label: "Meet bpmPro", href: "/bpmpro" },
  { label: "Features", href: "/bpmpro-features" },
  { label: "Cash Calculator", href: "/savings" },
  { label: "Success Stories", href: "/customer-success-stories" },
];

const moreNav = [
  { label: "Video Library", href: "/video-library" },
  { label: "About xTriam", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Help", href: "/help" },
];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}

export function DesktopMoreDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        More
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg">
          <div className="py-1">
            {moreNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="lg:hidden -m-2.5 p-2.5 text-foreground"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Toggle menu</span>
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full border-t border-border bg-background">
          <div className="space-y-1 px-4 py-4">
            {[...primaryNav, ...moreNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/support"
                className="flex items-center gap-2 rounded-lg border border-brand-blue-200 bg-brand-blue-50 px-3 py-2.5 text-base font-medium text-brand-blue-700"
                onClick={() => setOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Portal
              </Link>
              <Link href="/book-a-demo" onClick={() => setOpen(false)}>
                <Button variant="accent" className="w-full">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

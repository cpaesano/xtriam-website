"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const sections = [
  { id: "hero", label: "Welcome" },
  { id: "transformation", label: "The Journey" },
  { id: "challenge", label: "The Challenge" },
  { id: "partner", label: "The Partner" },
  { id: "testimonials", label: "Results" },
  { id: "platform", label: "The Platform" },
  { id: "deliverables", label: "Phase 1" },
  { id: "demo", label: "Live Demo" },
  { id: "future", label: "Future Vision" },
  { id: "investment", label: "Investment" },
  { id: "next-steps", label: "Next Steps" },
];

export function ProposalNav({ clientName }: { clientName: string }) {
  const { theme } = useTheme();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-brand-blue-950/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/xTriam-Logo-Outlines-White-Orange.png"
            alt="xTriam"
            width={90}
            height={30}
            className="h-7 w-auto"
          />
          <span className="hidden sm:inline text-brand-blue-300 text-sm">
            &middot; {clientName}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-2.5 py-1 text-xs text-brand-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}

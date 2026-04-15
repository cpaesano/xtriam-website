"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SectionWrapperProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  isNew?: boolean;
  commentsReadOnly?: boolean;
}

export function SectionWrapper({ sectionId, title, children, defaultExpanded = false, isNew = false, commentsReadOnly = false }: SectionWrapperProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div id={`section-${sectionId}`}>
      {/* Collapse bar */}
      <div className="flex justify-center py-4 px-4 bg-brand-blue-900 dark:bg-brand-blue-950">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`relative flex items-center gap-3 px-7 py-3 rounded-full border transition-all duration-200 group ${
            expanded
              ? "bg-white dark:bg-brand-blue-100 border-white/80 shadow-lg shadow-brand-blue-950/20"
              : "bg-white/90 dark:bg-brand-blue-100/90 border-white/60 hover:bg-white hover:shadow-lg hover:shadow-brand-blue-950/20"
          }`}
        >
          {isNew && (
            <span className="absolute -top-2.5 -right-2 bg-amber-400 text-brand-blue-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
              New
            </span>
          )}
          <span className={`text-sm font-semibold tracking-wide transition-colors ${
            expanded
              ? "text-brand-blue-700"
              : "text-brand-blue-800 group-hover:text-brand-blue-700"
          }`}>
            {title}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 ${
              expanded
                ? "text-brand-blue-600 rotate-180"
                : "text-brand-blue-400 group-hover:text-brand-blue-600"
            }`}
          />
        </button>
      </div>

      {/* Collapsible content */}
      {expanded && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

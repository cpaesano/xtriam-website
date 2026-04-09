"use client";

import { SectionReveal } from "../SectionReveal";

const leftToRight = [
  "Approved orders → Sales orders",
  "Quote requests → Order entries",
];

const rightToLeft = [
  "Product & inventory data",
  "Order & production status",
  "Invoice & AR data",
];

export function BisTrackDiagram() {
  return (
    <SectionReveal>
      <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8 my-6">
        <h4 className="text-center text-base font-medium text-muted-foreground mb-6">
          BisTrack Integration &mdash; Bidirectional Data Flow
        </h4>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
          {/* Dealer Portal box */}
          <div className="bg-brand-blue-600 text-white px-6 py-4 rounded-xl text-center w-full sm:w-48 shrink-0">
            <p className="font-semibold text-sm">Dealer Portal</p>
            <p className="text-sm text-brand-blue-200 mt-1">xTriam Platform</p>
          </div>

          {/* Arrows */}
          <div className="flex flex-col gap-3 flex-1 max-w-xs w-full">
            {leftToRight.map((label) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex-1 h-px bg-brand-blue-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-400 to-transparent animate-[flow_2s_linear_infinite]" />
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{label}</span>
                <span className="text-brand-blue-400">&rarr;</span>
              </div>
            ))}
            <div className="h-px bg-border" />
            {rightToLeft.map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-brand-orange-400">&larr;</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{label}</span>
                <div className="flex-1 h-px bg-brand-orange-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-l from-brand-orange-400 to-transparent animate-[flow_2s_linear_infinite]" />
                </div>
              </div>
            ))}
          </div>

          {/* BisTrack box */}
          <div className="bg-brand-orange-500 text-white px-6 py-4 rounded-xl text-center w-full sm:w-48 shrink-0">
            <p className="font-semibold text-sm">BisTrack</p>
            <p className="text-sm text-brand-orange-200 mt-1">Epicor ERP</p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

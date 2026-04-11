"use client";

import { SectionReveal } from "../SectionReveal";
import { Monitor, CheckCircle2 } from "lucide-react";

const demoHighlights = [
  "Product catalog with full iron door lineup",
  "CPQ engine — configure dimensions, options, and pricing in real time",
  "Three-layer pricing: vendor cost → dealer cost → retail",
  "Branded proposal PDF generation",
  "Dealer and vendor dashboards with order tracking",
  "Role-based access — vendor sees everything, dealer sees their view",
];

export function DemoSection() {
  return (
    <section id="demo" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <div className="w-16 h-16 rounded-2xl bg-brand-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-8 h-8 text-brand-orange-400" />
          </div>

          <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-base mb-3">
            Working prototype
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            We&apos;ve Already Started Building
          </h2>
          <p className="text-xl text-brand-blue-200 max-w-2xl mx-auto mb-10">
            A live prototype of the Dealer Portal was presented on-site at Palm City Ironworks
            on April 8, 2026. Here&apos;s what was demonstrated:
          </p>

          <div className="bg-brand-blue-800/50 border border-brand-blue-700 rounded-2xl p-8 text-left max-w-xl mx-auto">
            <div className="space-y-4">
              {demoHighlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-brand-blue-100 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-brand-blue-300 text-lg max-w-lg mx-auto">
            The prototype is built on the same production stack that will power your live platform.
            What you saw is not a mockup &mdash; it&apos;s the foundation.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

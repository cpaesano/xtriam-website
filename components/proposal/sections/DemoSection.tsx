"use client";

import { SectionReveal } from "../SectionReveal";
import { ExternalLink, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DemoSection() {
  return (
    <section id="demo" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <div className="w-16 h-16 rounded-2xl bg-brand-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-8 h-8 text-brand-orange-400" />
          </div>

          <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-sm mb-3">
            See it in action
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Live Prototype
          </h2>
          <p className="text-lg text-brand-blue-200 max-w-2xl mx-auto mb-10">
            We&apos;ve already started building. Explore the working prototype — browse the catalog,
            configure a product, generate a quote. This is the foundation your platform will be built on.
          </p>

          <div className="bg-brand-blue-800/50 border border-brand-blue-700 rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              <div>
                <p className="text-brand-blue-400 text-sm uppercase tracking-wider mb-1">Vendor login</p>
                <p className="text-white text-base">vendor@demo.com</p>
              </div>
              <div>
                <p className="text-brand-blue-400 text-sm uppercase tracking-wider mb-1">Dealer login</p>
                <p className="text-white text-base">dealer@demo.com</p>
              </div>
            </div>
            <p className="text-brand-blue-300 text-sm">
              Both accounts are pre-configured with Palm City products, pricing, and sample orders.
            </p>
          </div>

          <Button
            variant="accent"
            size="lg"
            onClick={() => window.open("https://dealer-portal.xtriam.com", "_blank")}
            className="gap-2"
          >
            Launch Prototype <ExternalLink className="w-4 h-4" />
          </Button>

          <p className="mt-4 text-brand-blue-400 text-sm">
            Opens in a new tab &middot; No login required for demo
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

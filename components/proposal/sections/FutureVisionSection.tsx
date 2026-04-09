"use client";

import { useState, useEffect } from "react";
import { SectionReveal } from "../SectionReveal";
import { Lightbulb, Check } from "lucide-react";

const features = [
  { id: "ai-assistant", label: "AI Operations Assistant", description: "Conversational AI for instant operational insights — order status, top dealers, profitability, via text or voice" },
  { id: "visual-configurator", label: "Visual product configurator (2D)", description: "SVG-based preview of configured door/window in the CPQ" },
  { id: "dealer-self-service", label: "Dealer self-service onboarding", description: "Public application flow — dealers apply, Palm City approves" },
  { id: "territory-enforcement", label: "Territory enforcement", description: "Block or flag orders outside a dealer's assigned territory" },
  { id: "quote-followup", label: "Quote expiration follow-up", description: "Automated reminder sequence before and after quote expiry" },
  { id: "end-client-esign", label: "End-client e-signature on proposals", description: "Legal signature from the homeowner before order conversion" },
  { id: "offline-cpq", label: "Offline / mobile CPQ", description: "Dealers build quotes at job sites without connectivity" },
  { id: "analytics-dashboard", label: "Advanced analytics dashboard", description: "BigQuery export, Looker Studio integration, conversion rates" },
  { id: "ai-quoting", label: "AI-assisted quoting", description: "Suggest add-ons, flag low-margin quotes, surface stale opportunities" },
  { id: "erp-integrations", label: "Additional ERP integrations", description: "Dynamics GP, custom CSV exports" },
  { id: "expanded-bistrack", label: "Expanded BisTrack integration", description: "AP/AR sync, deeper production status, invoice delivery" },
  { id: "more-channels", label: "Additional notification channels", description: "Push notifications, WhatsApp" },
  { id: "multi-language", label: "Multi-language dealer portal", description: "Spanish-language support for the dealer network" },
];

export function FutureVisionSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("proposal-palmcity-votes");
    if (stored) {
      try {
        setSelected(new Set(JSON.parse(stored)));
      } catch { /* ignore */ }
    }
  }, []);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("proposal-palmcity-votes", JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <section id="future" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-brand-orange-500 font-medium tracking-widest uppercase text-sm mb-3">
              Beyond Phase 1
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What matters most to you?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the features that would have the biggest impact on your operation.
              Your priorities shape the roadmap.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-brand-orange-500" />
              <span className="text-base text-muted-foreground">
                Click to select &middot; {selected.size} of {features.length} selected
              </span>
            </div>

            <div className="space-y-3">
              {features.map((f, i) => (
                <SectionReveal key={f.id} delay={i * 50}>
                  <button
                    onClick={() => toggle(f.id)}
                    className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                      selected.has(f.id)
                        ? "bg-brand-blue-50 dark:bg-brand-blue-950 border-brand-blue-500 shadow-sm"
                        : "bg-background border-border hover:border-brand-blue-300"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      selected.has(f.id)
                        ? "bg-brand-blue-600 border-brand-blue-600"
                        : "border-border"
                    }`}>
                      {selected.has(f.id) && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-base">{f.label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{f.description}</p>
                    </div>
                  </button>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

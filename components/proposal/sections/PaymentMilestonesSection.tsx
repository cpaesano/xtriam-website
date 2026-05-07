"use client";

import { SectionReveal } from "../SectionReveal";
import { Shield, ScrollText } from "lucide-react";

const milestones = [
  {
    label: "Signing / Kickoff",
    pct: 30,
    amount: 16500,
    trigger:
      "Statement of Work countersigned by both parties.",
  },
  {
    label: "Discovery Complete",
    pct: 20,
    amount: 11000,
    trigger:
      "Workflow map, confirmed SKU count, BisTrack integration spec, and notification triggers — all signed off by Palm City.",
  },
  {
    label: "Catalog Built + Integration Live",
    pct: 20,
    amount: 11000,
    trigger:
      "All product lines configured + BisTrack bidirectional flow tested in staging with real Palm City data.",
  },
  {
    label: "Training Done + Pilot Dealer Live",
    pct: 20,
    amount: 11000,
    trigger:
      "4 training sessions delivered + 1 designated dealer actively quoting through the portal.",
  },
  {
    label: "Go-Live + 30-Day Support Closed",
    pct: 10,
    amount: 5500,
    trigger:
      "Full dealer rollout complete AND the 30-day post-launch support window expires with no unresolved P0 issues.",
  },
];

export function PaymentMilestonesSection() {
  return (
    <section
      id="payment"
      className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-900 to-brand-blue-950"
    >
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-base mb-3">
              Payment terms
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              How you&apos;d pay this
            </h2>
            <p className="mt-4 text-xl text-brand-blue-200 max-w-2xl mx-auto">
              30% upfront, then milestone-based payments tied to deliverables
              you can verify.
            </p>
          </div>
        </SectionReveal>

        {/* Milestones list */}
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <SectionReveal key={m.label} delay={i * 100}>
              <div className="bg-brand-blue-800/30 border border-brand-blue-700 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-600/30 border border-brand-blue-500/40 flex items-center justify-center shrink-0 text-white font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {m.label}
                      </h3>
                      <div className="flex items-baseline gap-3 shrink-0">
                        <span className="text-2xl font-bold text-brand-orange-400">
                          {m.pct}%
                        </span>
                        <span className="text-lg text-brand-blue-200">
                          ${m.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-brand-blue-300 text-base leading-relaxed">
                      <strong className="text-white">Trigger:</strong>{" "}
                      {m.trigger}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Hold-back callout */}
        <SectionReveal>
          <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-400 shrink-0 mt-1" />
              <div>
                <p className="text-green-300 font-semibold text-lg mb-2">
                  Quality hold-back built in
                </p>
                <p className="text-brand-blue-200 text-base leading-relaxed">
                  The final 10% releases only after the 30-day post-launch
                  support window closes with no unresolved P0 issues. This is a
                  standard implementation hold-back — it ensures xTriam stands
                  behind the go-live, not just the build.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Subscription separate footnote */}
        <SectionReveal>
          <div className="mt-4 bg-brand-blue-800/20 border border-brand-blue-700/50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <ScrollText className="w-5 h-5 text-brand-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-base mb-1">
                  Monthly subscription is separate.
                </p>
                <p className="text-brand-blue-300 text-base leading-relaxed">
                  The $55,000 above covers the Phase 1 implementation only.
                  Your monthly platform subscription ($700 base + $30/vendor
                  user + $8/dealer user) begins at go-live and invoices
                  monthly — not bundled into milestone payments.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Cash flow summary */}
        <SectionReveal>
          <div className="mt-8 text-center">
            <p className="text-brand-blue-300 text-base max-w-2xl mx-auto leading-relaxed">
              Total Phase 1 implementation:{" "}
              <span className="text-white font-bold">$55,000</span> across 5
              milestones. Exact dates and acceptance criteria are formalized in
              the Statement of Work after Discovery.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

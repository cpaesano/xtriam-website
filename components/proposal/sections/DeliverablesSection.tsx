"use client";

import { SectionReveal } from "../SectionReveal";
import { BisTrackDiagram } from "./BisTrackDiagram";
import { NotificationWorkflow } from "./NotificationWorkflow";
import {
  MapPin, Database, Link2, Sliders, Users,
  BellRing, GraduationCap, HeadphonesIcon,
} from "lucide-react";

const deliverables = [
  {
    icon: MapPin,
    title: "On-Site Business Consulting & Discovery",
    description: "Carlos embeds with your team in Fort Myers. Shadows every role, maps every workflow, reviews BisTrack, and documents the full order lifecycle before configuring a single setting.",
    highlight: "This is the highest-value component — what ensures the platform works from day one.",
    special: null,
  },
  {
    icon: Database,
    title: "Product Catalog Setup",
    description: "Every product line, option group, and pricing rule entered, tested, and validated. xTriam builds the catalog for you — not a self-service import.",
    highlight: "SKU count to be confirmed during on-site discovery.",
    special: null,
  },
  {
    icon: Link2,
    title: "BisTrack Integration",
    description: "Bidirectional integration with your Epicor BisTrack ERP. Orders flow out, inventory and status flow in.",
    highlight: "Confirmed as Phase 1 requirement.",
    special: "bistrack",
  },
  {
    icon: Sliders,
    title: "CPQ Configuration",
    description: "Dealer pricing tiers, discount assignments, guardrails on courtesy discounts, and branded proposal PDF templates.",
    highlight: "Three-layer pricing: vendor cost is never exposed to dealers.",
    special: null,
  },
  {
    icon: Users,
    title: "Dealer Onboarding",
    description: "Up to 150 dealer accounts configured with role assignments, discount tiers, and territory assignments. Every account provisioned and tested.",
    highlight: "Covers all active dealers plus growth buffer.",
    special: null,
  },
  {
    icon: BellRing,
    title: "Notification System — Email + SMS",
    description: "Automated notifications to dealers and Palm City team members at every stage of the order lifecycle. SendGrid for email, Twilio for SMS.",
    highlight: "The right person knows what they need to know, the moment it happens.",
    special: "notifications",
  },
  {
    icon: GraduationCap,
    title: "Training",
    description: "4 sessions included: 2 vendor-side (all Palm City roles), 2 dealer-side (top accounts). On-site in Fort Myers for vendor training.",
    highlight: "In-person training, not a video library.",
    special: null,
  },
  {
    icon: HeadphonesIcon,
    title: "Go-Live Support",
    description: "30 days of dedicated post-launch support. Carlos on-call during first real orders through the system.",
    highlight: "Bug fixes and configuration adjustments at no extra charge within the 30-day window.",
    special: null,
  },
];

export function DeliverablesSection() {
  return (
    <section id="deliverables" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold tracking-widest uppercase text-sm mb-3">
              Phase 1 — Scope & Deliverables
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Everything included in Phase 1
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete, hands-on implementation. Not a software license — a partnership.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {deliverables.map((d, i) => (
            <SectionReveal key={d.title} delay={i * 75}>
              <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950 flex items-center justify-center shrink-0">
                    <d.icon className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-50 dark:bg-brand-blue-950 px-2 py-0.5 rounded">
                        {i + 1} of 8
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">{d.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-base mt-2 leading-relaxed">
                      {d.description}
                    </p>
                    {d.highlight && (
                      <p className="text-base text-brand-orange-600 dark:text-brand-orange-400 font-medium mt-3">
                        {d.highlight}
                      </p>
                    )}
                  </div>
                </div>

                {/* Special embedded components */}
                {d.special === "bistrack" && <BisTrackDiagram />}
                {d.special === "notifications" && <NotificationWorkflow />}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

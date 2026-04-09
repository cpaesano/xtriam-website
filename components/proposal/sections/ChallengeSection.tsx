"use client";

import { Clock, Eye, DollarSign, FileX, Bell, BarChart3 } from "lucide-react";
import { SectionReveal } from "../SectionReveal";

const painPoints = [
  {
    icon: Clock,
    title: "Quotes take days, not minutes",
    description: "Dealers assemble quotes by email and phone. Every quote that takes hours should take minutes.",
    insight: "Companies that automate quoting see 75% faster turnaround and 40% higher close rates.",
    source: "Industry benchmark",
  },
  {
    icon: Eye,
    title: "No visibility into operations",
    description: "No centralized view of dealer orders or pipeline. Management relies on phone calls and gut feel.",
    insight: "Lack of real-time visibility is the #1 operational bottleneck in manufacturing-distribution channels.",
    source: "Deloitte, 2024",
  },
  {
    icon: DollarSign,
    title: "Inconsistent pricing & unmonitored discounts",
    description: "No guardrails on dealer discounts. Pricing varies across the network without controls.",
    insight: "Uncontrolled discounting costs distributors 2-5% of gross margin annually.",
    source: "McKinsey Pricing Study",
  },
  {
    icon: FileX,
    title: "No professional proposal tool",
    description: "Dealers have no branded tool to present to end clients. Proposals are manual and inconsistent.",
    insight: "Professional proposals improve close rates by 35% vs. manual or verbal quotes.",
    source: "HubSpot Research",
  },
  {
    icon: Bell,
    title: "No automated notifications",
    description: "No automatic alerts to dealers or team members on order events. Everything requires a phone call.",
    insight: "Automated notifications reduce order inquiry calls by 60% and improve dealer satisfaction.",
    source: "Salesforce State of Service",
  },
  {
    icon: BarChart3,
    title: "No instant operational overview",
    description: "Getting a status report requires pulling data manually or asking multiple people.",
    insight: "Executives spend 2+ hours daily gathering data that AI dashboards surface in seconds.",
    source: "Gartner, 2025",
  },
];

export function ChallengeSection() {
  return (
    <section id="challenge" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-500 font-medium tracking-widest uppercase text-sm mb-3">
              Where you are today
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              The challenges holding back growth
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We listened. These are the pain points you shared with us &mdash; and the industry data that shows you&apos;re not alone.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <SectionReveal key={point.title} delay={i * 100}>
              <div className="group h-full bg-muted/50 border border-border rounded-2xl p-6 hover:border-brand-blue-500/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950 flex items-center justify-center mb-4 group-hover:bg-brand-blue-100 dark:group-hover:bg-brand-blue-900 transition-colors">
                  <point.icon className="w-6 h-6 text-brand-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-base mb-4">
                  {point.description}
                </p>

                <div className="border-t border-border pt-4 mt-auto">
                  <p className="text-base text-brand-blue-600 dark:text-brand-blue-400 font-medium leading-relaxed">
                    &ldquo;{point.insight}&rdquo;
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    &mdash; {point.source}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

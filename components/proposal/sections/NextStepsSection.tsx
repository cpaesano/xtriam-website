"use client";

import { SectionReveal } from "../SectionReveal";
import { MapPin, FileText, Rocket, HeadphonesIcon, Phone, Mail } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Discovery Session",
    description: "Carlos on-site at Palm City. Shadow team members, review BisTrack, confirm SKU count, map production stages and notification triggers.",
  },
  {
    icon: FileText,
    title: "Scope Agreement",
    description: "xTriam delivers formal Statement of Work with exact deliverables, SKU count, integration spec, notification triggers, timeline, and payment milestones.",
  },
  {
    icon: Rocket,
    title: "Implementation Kickoff",
    description: "Catalog data collection and BisTrack integration begins within 5 business days of signed agreement.",
  },
  {
    icon: HeadphonesIcon,
    title: "Go Live",
    description: "Dealers start quoting and ordering through the portal. Carlos on-call for 30 days.",
  },
];

export function NextStepsSection() {
  return (
    <section id="next-steps" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold tracking-widest uppercase text-sm mb-3">
              What happens next
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Four steps to go live
            </h2>
          </div>
        </SectionReveal>

        <div className="space-y-6 mb-16">
          {steps.map((step, i) => (
            <SectionReveal key={step.title} delay={i * 150}>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-lg">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <step.icon className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400" />
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Contact */}
        <SectionReveal>
          <div className="text-center bg-gradient-to-b from-brand-blue-50 to-brand-blue-100 dark:from-brand-blue-950 dark:to-brand-blue-900 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground mb-8">
              Let&apos;s schedule the discovery session and make this real.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:+19545921256"
                className="flex items-center gap-2 text-brand-blue-600 dark:text-brand-blue-400 hover:underline font-medium"
              >
                <Phone className="w-5 h-5" /> (954) 592-1256
              </a>
              <a
                href="mailto:cpaesano@xtriam.com"
                className="flex items-center gap-2 text-brand-blue-600 dark:text-brand-blue-400 hover:underline font-medium"
              >
                <Mail className="w-5 h-5" /> cpaesano@xtriam.com
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-base font-semibold text-foreground">Carlos A. Paesano</p>
              <p className="text-sm text-muted-foreground">Founder &amp; Chief Software Architect</p>
              <p className="text-sm text-muted-foreground">xTriam</p>
              <p className="text-sm text-muted-foreground mt-2">
                5966 S Dixie Hwy Ste 300, South Miami, FL 33143
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} xTriam, LLC. All rights reserved.</p>
          <p className="mt-1">This proposal is confidential and intended solely for Palm City Ironworks.</p>
        </div>
      </div>
    </section>
  );
}

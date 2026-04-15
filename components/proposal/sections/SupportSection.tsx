"use client";

import { SectionReveal } from "../SectionReveal";
import {
  Bot, Mail, Video, AlertTriangle, Shield, Clock, Wrench,
  Users, Building2, ArrowDown, Phone, Lightbulb,
} from "lucide-react";

/* ── Palm City (Vendor) Support Tiers ── */

const vendorTiers = [
  {
    icon: Bot,
    title: "AI-Assisted Support",
    availability: "24 / 7",
    bgClass: "bg-brand-blue-50 dark:bg-brand-blue-950/40 border-brand-blue-200 dark:border-brand-blue-800",
    iconBgClass: "bg-brand-blue-100 dark:bg-brand-blue-900",
    iconClass: "text-brand-blue-600",
    items: [
      "Instant answers to how-to questions",
      "Walk your team through features step-by-step",
      "Check order status, aging, and pipeline data",
      "Troubleshoot common issues in real time",
      "Document requests and feature ideas on your behalf",
    ],
  },
  {
    icon: Mail,
    title: "Email & Ticket Support",
    availability: "Business Hours",
    bgClass: "bg-brand-orange-50 dark:bg-brand-orange-950/20 border-brand-orange-200 dark:border-brand-orange-800",
    iconBgClass: "bg-brand-orange-100 dark:bg-brand-orange-900",
    iconClass: "text-brand-orange-600",
    items: [
      "Submit tickets directly from the platform",
      "Bug fixes and configuration adjustments",
      "Minor enhancements and tweaks",
      "Track status and resolution in real time",
    ],
  },
  {
    icon: Video,
    title: "Live Human Support",
    availability: "2 hrs / month included",
    bgClass: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    iconBgClass: "bg-green-100 dark:bg-green-900",
    iconClass: "text-green-600",
    items: [
      "Scheduled video calls and screen shares",
      "Strategic discussions and planning",
      "Hands-on training sessions",
      "Complex issue resolution",
      "Additional hours available at agreed rate",
    ],
  },
];

/* ── Response SLAs ── */

const slaItems = [
  {
    icon: AlertTriangle,
    label: "Critical",
    description: "Platform down, data access issues",
    sla: "4-hour response",
    badgeClass: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400",
  },
  {
    icon: Wrench,
    label: "Standard",
    description: "Bugs, config issues, general requests",
    sla: "24-hour response",
    badgeClass: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400",
  },
  {
    icon: Clock,
    label: "Enhancement",
    description: "Feature requests, improvements",
    sla: "Acknowledged within 48 hours",
    badgeClass: "bg-brand-blue-100 dark:bg-brand-blue-950 text-brand-blue-700 dark:text-brand-blue-400",
  },
];

/* ── Dealer Support Flow Steps ── */

const dealerFlowSteps = [
  {
    icon: Bot,
    title: "AI Self-Service",
    who: "Built into the portal",
    description: "Dealers get 24/7 AI support built into the portal — answers how-to questions, checks order status, walks through quoting, and resolves most issues instantly.",
    handles: "Handles ~80% of dealer questions",
    color: "brand-blue",
  },
  {
    icon: Users,
    title: "Palm City Liaison",
    who: "Your trained team member",
    description: "A designated person on your team (the same role that already fields dealer calls today) handles questions the AI can\u2019t resolve. The portal gives them an admin view of all dealer tickets.",
    handles: "Handles ~15% \u2014 the human touch",
    color: "brand-orange",
  },
  {
    icon: Building2,
    title: "xTriam Escalation",
    who: "Platform-level issues only",
    description: "If your liaison identifies a platform bug or system issue, they escalate to xTriam through your vendor support channels. This is rare once the platform stabilizes.",
    handles: "Handles ~5% \u2014 true platform bugs",
    color: "green",
  },
];

export function SupportSection() {
  return (
    <section id="support" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-base mb-3">
              Ongoing Support
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              We don&apos;t disappear after go-live
            </h2>
            <p className="mt-4 text-xl text-brand-blue-200 max-w-2xl mx-auto">
              A clear support model for Palm City and your dealer network.
            </p>
          </div>
        </SectionReveal>

        {/* ═══ SECTION 1: Palm City Vendor Support ═══ */}
        <SectionReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-orange-500 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Palm City Support</h3>
                <p className="text-brand-blue-300">Your team&apos;s direct line to xTriam</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vendorTiers.map((tier, i) => (
                <SectionReveal key={tier.title} delay={i * 150}>
                  <div className={`h-full rounded-2xl border p-6 ${tier.bgClass}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${tier.iconBgClass} flex items-center justify-center`}>
                        <tier.icon className={`w-5 h-5 ${tier.iconClass}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{tier.title}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{tier.availability}</p>
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {tier.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 mt-2 shrink-0" />
                          <span className="text-base text-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Response SLAs */}
        <SectionReveal>
          <div className="bg-brand-blue-800/30 border border-brand-blue-700 rounded-2xl p-6 sm:p-8 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-blue-400" />
              <h3 className="text-xl font-bold text-white">Response Time SLAs</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {slaItems.map((item) => (
                <div key={item.label} className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-brand-blue-300" />
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badgeClass}`}>
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-brand-blue-300 mb-2">{item.description}</p>
                  <p className="text-lg font-bold text-white">{item.sla}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* ═══ SECTION 2: Dealer Support Model ═══ */}
        <SectionReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Dealer Support Model</h3>
                <p className="text-brand-blue-300">How your dealers get help without adding to your costs</p>
              </div>
            </div>

            {/* Advisory callout */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-300 font-semibold text-lg mb-2">Our recommendation: don&apos;t pay for dealer support</p>
                  <p className="text-brand-blue-200 text-base leading-relaxed">
                    We could offer a paid dealer support package, but we advise against it.
                    With AI handling most questions and a trained liaison on your team,
                    a separate support contract for 100+ dealers would be underutilized.
                    This is a proven model across B2B platforms. Your dealers get great support,
                    and you keep costs predictable.
                  </p>
                </div>
              </div>
            </div>

            {/* Three-tier dealer flow */}
            <div className="space-y-4">
              {dealerFlowSteps.map((step, i) => (
                <SectionReveal key={step.title} delay={i * 150}>
                  <div>
                    <div className="bg-brand-blue-800/40 border border-brand-blue-700 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          step.color === "brand-blue" ? "bg-brand-blue-600" :
                          step.color === "brand-orange" ? "bg-brand-orange-500" :
                          "bg-green-600"
                        }`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-brand-blue-400 bg-brand-blue-900 px-2.5 py-0.5 rounded-full">
                              Tier {i + 1}
                            </span>
                            <h4 className="text-lg font-bold text-white">{step.title}</h4>
                            <span className="text-sm text-brand-blue-400">/ {step.who}</span>
                          </div>
                          <p className="text-brand-blue-200 text-base leading-relaxed mb-2">
                            {step.description}
                          </p>
                          <p className={`text-sm font-semibold ${
                            step.color === "brand-blue" ? "text-brand-blue-400" :
                            step.color === "brand-orange" ? "text-brand-orange-400" :
                            "text-green-400"
                          }`}>
                            {step.handles}
                          </p>
                        </div>
                      </div>
                    </div>
                    {i < dealerFlowSteps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowDown className="w-5 h-5 text-brand-blue-600" />
                      </div>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Branded experience note */}
            <SectionReveal>
              <div className="mt-6 bg-brand-blue-800/20 border border-brand-blue-700/50 rounded-2xl p-6">
                <p className="text-brand-blue-200 text-base text-center leading-relaxed">
                  <strong className="text-white">Your portal, your brand.</strong>{" "}
                  The portal is customized to Palm City: your logo, your colors, your identity front and center.
                  A subtle &ldquo;Powered by xTriam&rdquo; appears in the footer, but the experience feels like your own platform.
                  The portal <em>reduces</em> your team&apos;s support load because dealers can self-serve
                  (check orders, pull aging, generate quotes) instead of calling your staff.
                </p>
              </div>
            </SectionReveal>

            {/* AI Voice future option */}
            <SectionReveal>
              <div className="mt-4 bg-brand-blue-800/20 border border-brand-blue-700/50 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-base mb-1">Future option: AI Voice Support</p>
                    <p className="text-brand-blue-300 text-base leading-relaxed">
                      When you&apos;re ready, we can enable AI-powered voice support. Dealers call a number and
                      an AI agent handles their questions by voice in real time. Available as a future add-on
                      at approximately $0.55&ndash;$0.75/minute based on usage volume, billed on actual usage.
                      Exact pricing to be evaluated when needed. Not required at launch, but the infrastructure
                      is ready when you want it.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </SectionReveal>

        {/* ═══ Warranty + Included ═══ */}
        <SectionReveal>
          <div className="text-center">
            <p className="text-brand-blue-200 text-lg">
              <strong className="text-white">First 30 days after launch:</strong>
              all support channels are fully active at no additional cost.
              Bug fixes, configuration adjustments, and training reinforcement included as part of go-live stabilization.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-8 bg-brand-blue-800/20 border border-brand-blue-700/50 rounded-2xl p-6 text-center">
            <p className="text-brand-blue-300 text-base">
              Your monthly subscription also includes: <strong className="text-white">system monitoring</strong>,{" "}
              <strong className="text-white">security updates</strong>,{" "}
              <strong className="text-white">infrastructure maintenance</strong>, and{" "}
              <strong className="text-white">platform improvements</strong> that benefit all clients.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

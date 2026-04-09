"use client";

import { SectionReveal } from "../SectionReveal";
import {
  FileSpreadsheet, Rocket, Brain, Crown,
  Phone, Mail, Clock, Users,
  Handshake, Megaphone, HeartHandshake, Globe,
} from "lucide-react";

const stages = [
  {
    phase: "Today",
    title: "Manual Operations",
    icon: FileSpreadsheet,
    color: "bg-amber-500",
    borderColor: "border-amber-500",
    textColor: "text-amber-500",
    description: "Quotes by email and phone. Orders tracked in spreadsheets. Team chasing status updates. Management flying blind.",
    items: [
      { icon: Phone, text: "Dealer quotes via phone & email" },
      { icon: FileSpreadsheet, text: "Spreadsheets for order tracking" },
      { icon: Clock, text: "Hours spent on manual coordination" },
      { icon: Users, text: "Staff tied to repetitive admin tasks" },
    ],
  },
  {
    phase: "Phase 1",
    title: "Digital Foundation",
    icon: Rocket,
    color: "bg-brand-blue-600",
    borderColor: "border-brand-blue-600",
    textColor: "text-brand-blue-600 dark:text-brand-blue-400",
    description: "Dealer Portal live. CPQ automating quotes. BisTrack integrated. Notifications keeping everyone in sync.",
    items: [
      { icon: Rocket, text: "Dealers self-serve quotes in minutes" },
      { icon: Mail, text: "Automated email & SMS notifications" },
      { icon: FileSpreadsheet, text: "BisTrack data flowing in real-time" },
      { icon: Users, text: "Staff freed from order entry & status calls" },
    ],
  },
  {
    phase: "2026–2027",
    title: "AI-First, Mobile-First",
    icon: Brain,
    color: "bg-emerald-500",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-400",
    description: "AI assistant managing operations. Mobile-first tools for the field. Every process automated or augmented by AI.",
    items: [
      { icon: Brain, text: "AI operations assistant for instant insights" },
      { icon: Phone, text: "Mobile-first CPQ for dealers in the field" },
      { icon: Clock, text: "AI-assisted quoting & follow-up" },
      { icon: Users, text: "Team focuses on high-value work" },
    ],
  },
  {
    phase: "The Vision",
    title: "Industry Leader",
    icon: Crown,
    color: "bg-brand-orange-500",
    borderColor: "border-brand-orange-500",
    textColor: "text-brand-orange-500",
    description: "Palm City Ironworks as the most technologically advanced iron door manufacturer in the Southeast. Your team free to focus on what moves the needle.",
    items: [
      { icon: Handshake, text: "Negotiation & closing — face-to-face with clients" },
      { icon: Megaphone, text: "Marketing & brand exposure" },
      { icon: HeartHandshake, text: "Exceptional customer service" },
      { icon: Globe, text: "Public relations & industry leadership" },
    ],
  },
];

export function TransformationSection() {
  return (
    <section id="transformation" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-sm mb-3">
              The journey
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              From manual operations to industry leader
            </h2>
            <p className="mt-4 text-lg text-brand-blue-200 max-w-3xl mx-auto">
              This isn&apos;t just a software implementation. It&apos;s a transformation that frees your team
              to focus on the work that actually grows the business.
            </p>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div className="space-y-8">
          {stages.map((stage, i) => (
            <SectionReveal key={stage.phase} delay={i * 200}>
              <div className={`relative bg-brand-blue-800/30 border ${stage.borderColor}/30 rounded-2xl p-6 sm:p-8`}>
                {/* Phase badge */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stage.color} flex items-center justify-center`}>
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${stage.textColor} uppercase tracking-wider`}>
                      {stage.phase}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{stage.title}</h3>
                  </div>
                </div>

                <p className="text-brand-blue-200 text-base mb-6 leading-relaxed">
                  {stage.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stage.items.map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${stage.textColor} shrink-0`} />
                      <span className="text-brand-blue-100 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow connector */}
                {i < stages.length - 1 && (
                  <div className="flex justify-center mt-6 -mb-12 relative z-10">
                    <div className="w-px h-8 bg-gradient-to-b from-brand-blue-500/50 to-transparent" />
                  </div>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

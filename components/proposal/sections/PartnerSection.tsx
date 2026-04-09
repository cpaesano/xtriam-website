"use client";

import { SectionReveal } from "../SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Wrench, GraduationCap, Building2, Code2, Handshake } from "lucide-react";

const timeline = [
  {
    year: "1990s",
    icon: GraduationCap,
    title: "Civil Engineer & MBA",
    description: "Degree in Civil Engineering. Chicago Booth MBA. The analytical foundation for everything that followed.",
  },
  {
    year: "2003",
    icon: Building2,
    title: "Construction & Home Services",
    description: "Licensed General Contractor. Licensed Real Estate Broker. 17 years running a window and door installation business.",
  },
  {
    year: "2003–2020",
    icon: Wrench,
    title: "Living the Pain",
    description: "Spreadsheet quoting. Chasing payments. Scheduling on whiteboards. Hours lost to admin that should take minutes. Lived every workflow challenge you face today.",
  },
  {
    year: "2020+",
    icon: Code2,
    title: "Building the Solution",
    description: "Founded xTriam. Turned 17 years of operational pain into software. $150M+ in contractor revenue managed on our platforms.",
  },
  {
    year: "2026",
    icon: Handshake,
    title: "Your Partner",
    description: "Not a sales engineer with a demo. The person who will be on-site, embedded with your team, configuring a platform around how Palm City actually operates.",
  },
];

const stats = [
  { end: 150, prefix: "$", suffix: "M+", label: "Revenue managed on our platforms" },
  { end: 20, suffix: "+", label: "Production organizations" },
  { end: 75, suffix: "%", label: "Faster quoting vs. manual" },
  { end: 500, prefix: "~$", suffix: "/day", label: "Estimated savings per client" },
];

export function PartnerSection() {
  return (
    <section id="partner" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-sm mb-3">
              Why this is different
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              The partner makes the difference
            </h2>
            <p className="mt-4 text-lg text-brand-blue-200 max-w-3xl mx-auto">
              Anyone can build software. The question is whether the person building it understands your business
              well enough to make it work from day one.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <blockquote className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-2xl sm:text-3xl font-medium text-white italic leading-relaxed">
              &ldquo;Built by someone who ran a construction company &mdash; not by someone who read about it.&rdquo;
            </p>
            <cite className="mt-4 block text-brand-blue-300 text-base not-italic">
              Carlos A. Paesano &mdash; Founder &amp; Chief Software Architect, xTriam
            </cite>
          </blockquote>
        </SectionReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-20">
          {timeline.map((item, i) => (
            <SectionReveal key={item.year} delay={i * 100}>
              <div className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-orange-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-orange-400" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-brand-blue-700 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-brand-orange-400 text-sm font-medium">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-brand-blue-300 text-base mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Stats */}
        <SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                  className="text-4xl sm:text-5xl font-bold text-white"
                />
                <p className="mt-2 text-brand-blue-300 text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

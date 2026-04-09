"use client";

import { SectionReveal } from "../SectionReveal";
import {
  Settings, ShoppingCart, Users, Database, FileText, Truck,
  BarChart3, BellRing, Bot, Shield, Layers, Sliders
} from "lucide-react";

const columns = [
  {
    title: "Vendor Console",
    subtitle: "Palm City Ironworks",
    color: "brand-blue",
    features: [
      { icon: Database, text: "Product catalog & pricing management" },
      { icon: Users, text: "Dealer accounts & discount tiers" },
      { icon: ShoppingCart, text: "Order review & approval workflow" },
      { icon: Truck, text: "Container & shipment tracking" },
      { icon: BarChart3, text: "Sales pipeline & dealer performance" },
      { icon: Bot, text: "AI operations assistant" },
    ],
  },
  {
    title: "CPQ Engine",
    subtitle: "Configure, Price, Quote",
    color: "brand-orange",
    features: [
      { icon: Sliders, text: "Dimension-based pricing (sq ft, linear ft, united inches)" },
      { icon: Settings, text: "Option groups with constraint rules" },
      { icon: Layers, text: "Three-layer pricing: vendor → dealer → retail" },
      { icon: Shield, text: "Discount guardrails & markup controls" },
      { icon: FileText, text: "Branded proposal PDF generation" },
    ],
  },
  {
    title: "Dealer Portal",
    subtitle: "250+ dealers",
    color: "brand-blue",
    features: [
      { icon: Database, text: "Browse Palm City product catalog" },
      { icon: Sliders, text: "Configure products with CPQ engine" },
      { icon: FileText, text: "Generate branded proposals for end clients" },
      { icon: ShoppingCart, text: "Convert quotes to orders with e-signature" },
      { icon: Truck, text: "Track order status & shipment ETAs" },
      { icon: BellRing, text: "Automated email + SMS notifications" },
    ],
  },
];

export function PlatformSection() {
  return (
    <section id="platform" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-500 font-medium tracking-widest uppercase text-sm mb-3">
              The solution
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              xTriam Dealer Portal
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              A white-label platform connecting Palm City with your dealer network.
              Purpose-built for the manufacturer&ndash;dealer channel.
            </p>
          </div>
        </SectionReveal>

        {/* Tenancy diagram */}
        <SectionReveal>
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-muted/50 border border-border rounded-2xl p-6">
              <div className="text-center mb-4">
                <span className="text-base text-muted-foreground">Three-level tenancy model</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="bg-brand-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                  xTriam (Platform Owner)
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="bg-brand-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
                  Palm City Ironworks (Vendor)
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex flex-wrap justify-center gap-3">
                  {["Sunshine Doors LLC", "Gulf Coast Windows", "... up to 250 dealers"].map((d) => (
                    <div key={d} className="bg-muted border border-border px-4 py-2 rounded-lg text-xs text-foreground">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Three columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((col, i) => (
            <SectionReveal key={col.title} delay={i * 150}>
              <div className="h-full bg-muted/50 border border-border rounded-2xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{col.title}</h3>
                <p className="text-base text-muted-foreground mb-6">{col.subtitle}</p>
                <ul className="space-y-3">
                  {col.features.map((f) => (
                    <li key={f.text} className="flex gap-3 items-start">
                      <f.icon className="w-5 h-5 text-brand-blue-600 dark:text-brand-blue-400 shrink-0 mt-0.5" />
                      <span className="text-base text-foreground">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

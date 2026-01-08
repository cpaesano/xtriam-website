"use client";

import { AnimatedCounter } from "@/components/ui";

export function StatsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Active Clients */}
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-blue-600">
              <AnimatedCounter end={25} suffix="+" />
            </div>
            <div className="mt-2 text-muted-foreground">Active Clients</div>
          </div>

          {/* Projects Managed - Animated & Growing */}
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-blue-600">
              <AnimatedCounter
                end={22500}
                suffix="+"
                dailyGrowth={87}  // ~25 clients × 3.5 projects/day
              />
            </div>
            <div className="mt-2 text-muted-foreground">Projects Managed</div>
          </div>

          {/* Time Saved */}
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-blue-600">
              <AnimatedCounter end={50} suffix="%" />
            </div>
            <div className="mt-2 text-muted-foreground">Time Saved</div>
          </div>

          {/* Uptime */}
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-blue-600">
              99.9%
            </div>
            <div className="mt-2 text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}

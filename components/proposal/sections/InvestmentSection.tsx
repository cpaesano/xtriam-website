"use client";

import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "../SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { X, Minus, Check } from "lucide-react";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function InvestmentSection() {
  const { ref, inView } = useInView(0.2);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const timers = [
      setTimeout(() => setPhase(1), 500),   // competitors
      setTimeout(() => setPhase(2), 3000),   // labor
      setTimeout(() => setPhase(3), 5500),   // xTriam
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="investment" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-sm mb-3">
              The investment
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              What does this cost?
            </h2>
            <p className="mt-4 text-lg text-brand-blue-200">
              Let&apos;s put it in perspective.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {/* Competitor pricing */}
          <div className={`transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-base text-red-300 uppercase tracking-wider mb-1">Enterprise alternative</p>
                  <p className="text-base text-brand-blue-300 mb-3">
                    Paradigm Omni and similar enterprise CPQ platforms
                  </p>
                  <div className="flex items-baseline gap-2">
                    {phase >= 1 && (
                      <AnimatedCounter
                        end={100}
                        prefix="$"
                        suffix="K+"
                        duration={1500}
                        className="text-4xl sm:text-5xl font-bold text-red-400"
                      />
                    )}
                    <span className="text-red-300 text-base">to start, plus $3K–$8K/month</span>
                  </div>
                  <p className="text-brand-blue-400 text-sm mt-2">
                    Built for Pella, Andersen, and Home Depot &mdash; not for a family business
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Labor cost */}
          <div className={`transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Minus className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-base text-amber-300 uppercase tracking-wider mb-1">The status quo alternative</p>
                  <p className="text-base text-brand-blue-300 mb-3">
                    Hire one operations coordinator to manage dealers manually
                  </p>
                  <div className="flex items-baseline gap-2">
                    {phase >= 2 && (
                      <AnimatedCounter
                        end={60}
                        prefix="$"
                        suffix="K"
                        duration={1500}
                        className="text-4xl sm:text-5xl font-bold text-amber-400"
                      />
                    )}
                    <span className="text-amber-300 text-base">per year — and they still can&apos;t do what the platform does</span>
                  </div>
                  <p className="text-brand-blue-400 text-sm mt-2">
                    No automation, no real-time visibility, no AI insights, no dealer self-service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* xTriam */}
          <div className={`transition-all duration-700 ${phase >= 3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8 shadow-lg shadow-green-500/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-base text-green-300 uppercase tracking-wider mb-1">xTriam &mdash; Phase 1 Implementation</p>
                  <p className="text-base text-brand-blue-300 mb-3">
                    Full hands-on implementation by Carlos Paesano, including on-site consulting, catalog setup,
                    BisTrack integration, notifications, AI assistant, dealer onboarding, training, and 30 days of go-live support
                  </p>
                  <div className="flex items-baseline gap-2">
                    {phase >= 3 && (
                      <AnimatedCounter
                        end={55}
                        prefix="$"
                        suffix=",000"
                        duration={1500}
                        className="text-5xl sm:text-6xl font-bold text-green-400"
                      />
                    )}
                    <span className="text-green-300 text-base">one-time investment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly subscription model */}
        <div className={`transition-all duration-700 delay-500 mt-8 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-brand-blue-800/50 border border-brand-blue-700 rounded-2xl p-6 sm:p-8">
            <p className="text-white font-semibold text-lg mb-1 text-center">Monthly Platform Subscription</p>
            <p className="text-brand-blue-300 text-base mb-6 text-center">
              You pay for active users &mdash; the fee scales with the value your network is getting.
            </p>

            {/* Three components */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$700</p>
                <p className="text-brand-blue-400 text-sm">/month</p>
                <p className="text-brand-blue-300 text-sm mt-2">Base Platform Fee</p>
                <p className="text-brand-blue-400 text-xs mt-1">Hosting, AI, email, SMS</p>
              </div>
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$30</p>
                <p className="text-brand-blue-400 text-sm">/user/month</p>
                <p className="text-brand-blue-300 text-sm mt-2">Vendor-Side Users</p>
                <p className="text-brand-blue-400 text-xs mt-1">Palm City internal team</p>
              </div>
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$8</p>
                <p className="text-brand-blue-400 text-sm">/user/month</p>
                <p className="text-brand-blue-300 text-sm mt-2">Dealer-Side Users</p>
                <p className="text-brand-blue-400 text-xs mt-1">Per active dealer login</p>
              </div>
            </div>

            {/* Estimated range */}
            <div className="bg-brand-blue-900/30 border border-brand-blue-600/30 rounded-xl p-4 text-center">
              <p className="text-brand-blue-200 text-base">
                Estimated at launch with 120 active dealers:
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                $3,000 &ndash; $3,400<span className="text-lg font-normal text-brand-blue-300">/month</span>
              </p>
              <p className="text-brand-blue-400 text-sm mt-2">
                Scales with your network &mdash; you never pay for inactive dealers.
              </p>
            </div>
          </div>
        </div>

        {/* What NOT paying for */}
        <SectionReveal>
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">What you are NOT paying for</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
              {[
                "Not funding xTriam's software development",
                "Not acquiring any intellectual property",
                "Not paying for features that benefit all future clients",
                "The platform exists regardless of this engagement",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-brand-blue-300 text-base">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-brand-blue-200 text-base max-w-xl mx-auto">
              You&apos;re paying for a partner &mdash; Carlos Paesano&apos;s time, presence, and 20+ years of expertise
              applied directly to your business.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

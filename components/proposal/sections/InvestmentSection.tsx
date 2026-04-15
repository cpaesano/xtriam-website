"use client";

import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "../SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { X, Minus, Check, Handshake } from "lucide-react";

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
      setTimeout(() => setPhase(1), 500),   // status quo
      setTimeout(() => setPhase(2), 3000),   // xTriam full
      setTimeout(() => setPhase(3), 5500),   // partnership courtesy
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="investment" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-brand-blue-950 to-brand-blue-900">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-base mb-3">
              The investment
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              What does this cost?
            </h2>
            <p className="mt-4 text-xl text-brand-blue-200">
              Let&apos;s put it in perspective.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {/* Status quo */}
          <div className={`transition-all duration-700 ${phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Minus className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg text-amber-300 uppercase tracking-wider mb-1">The status quo alternative</p>
                  <p className="text-lg text-brand-blue-300 mb-3">
                    Hire one operations coordinator or use existing internal staff to manage dealers manually
                  </p>
                  <div className="flex items-baseline gap-2">
                    {phase >= 1 && (
                      <>
                        <AnimatedCounter
                          end={60}
                          prefix="$"
                          suffix="K"
                          duration={1500}
                          className="text-4xl sm:text-5xl font-bold text-amber-400"
                        />
                        <span className="text-amber-400 text-2xl sm:text-3xl font-bold">&ndash; $80K</span>
                      </>
                    )}
                    <span className="text-amber-300 text-lg">per year</span>
                  </div>
                  <p className="text-brand-blue-400 text-base mt-2">
                    No automation, no real-time visibility, no AI insights, no dealer self-service &mdash;
                    and they still can&apos;t do what the platform does
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* xTriam full price */}
          <div className={`transition-all duration-700 ${phase >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
            <div className="bg-brand-blue-800/30 border border-brand-blue-600/30 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue-600/20 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-brand-blue-400" />
                </div>
                <div>
                  <p className="text-lg text-brand-blue-300 uppercase tracking-wider mb-1">xTriam &mdash; Phase 1 Implementation</p>
                  <p className="text-lg text-brand-blue-300 mb-3">
                    Full hands-on implementation by Carlos Paesano and his xTriam team, including on-site consulting, catalog setup,
                    BisTrack integration, notifications, dealer onboarding, training, and 30 days of go-live support
                  </p>
                  <div className="flex items-baseline gap-2">
                    {phase >= 2 && (
                      <AnimatedCounter
                        end={69}
                        prefix="$"
                        suffix=",000"
                        duration={1500}
                        className="text-5xl sm:text-6xl font-bold text-white"
                      />
                    )}
                    <span className="text-brand-blue-300 text-lg">standard engagement fee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership courtesy */}
          <div className={`transition-all duration-700 ${phase >= 3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
            <div className="bg-green-500/10 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8 shadow-lg shadow-green-500/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <Handshake className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-lg text-green-300 uppercase tracking-wider mb-1">Partnership Investment</p>
                  <p className="text-lg text-brand-blue-300 mb-3">
                    xTriam is investing in the long-term relationship with Palm City Ironworks and the
                    opportunity to bring operational excellence to Suncoast Contractors Supply.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-brand-blue-400 text-2xl line-through">$69,000</span>
                    </div>
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
                      <span className="text-green-300 text-lg">your investment</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    <p className="text-green-300 text-base">
                      <strong>$14,000 partnership courtesy</strong> &mdash; xTriam is investing in the opportunity
                      to expand this partnership to streamline operations at Suncoast Contractors Supply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly subscription model */}
        <div className={`transition-all duration-700 delay-500 mt-8 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-brand-blue-800/50 border border-brand-blue-700 rounded-2xl p-6 sm:p-8">
            <p className="text-white font-semibold text-xl mb-1 text-center">Monthly Platform Subscription</p>
            <p className="text-brand-blue-300 text-lg mb-6 text-center">
              You pay for active users &mdash; the fee scales with the value your network is getting.
            </p>

            {/* Three components */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$700</p>
                <p className="text-brand-blue-400 text-base">/month</p>
                <p className="text-brand-blue-300 text-base mt-2">Base Platform Fee</p>
                <p className="text-brand-blue-400 text-sm mt-1">Hosting, AI, email, SMS</p>
              </div>
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$30</p>
                <p className="text-brand-blue-400 text-base">/user/month</p>
                <p className="text-brand-blue-300 text-base mt-2">Vendor-Side Users</p>
                <p className="text-brand-blue-400 text-sm mt-1">Palm City internal team</p>
              </div>
              <div className="bg-brand-blue-900/50 border border-brand-blue-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">$8</p>
                <p className="text-brand-blue-400 text-base">/user/month</p>
                <p className="text-brand-blue-300 text-base mt-2">Dealer-Side Users</p>
                <p className="text-brand-blue-400 text-sm mt-1">Per individual login. Each rep at a dealer counts as one user.</p>
              </div>
            </div>

            {/* Estimated range */}
            <div className="bg-brand-blue-900/30 border border-brand-blue-600/30 rounded-xl p-4 text-center">
              <p className="text-brand-blue-200 text-lg">
                No cap on dealers. Your monthly cost scales with active users.
              </p>
              <p className="text-brand-blue-400 text-base mt-2">
                You only pay for users who are actively logging in. Inactive accounts cost nothing.
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
                  <span className="text-brand-blue-300 text-lg">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-brand-blue-200 text-lg max-w-xl mx-auto">
              You&apos;re paying for a partner &mdash; Carlos Paesano and his xTriam team&apos;s time, presence, and 20+ years of expertise
              applied directly to your business.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

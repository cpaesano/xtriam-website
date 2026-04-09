"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-brand-blue-950 via-brand-blue-900 to-brand-blue-950 overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-4xl">
        <p className="text-brand-blue-300 font-medium tracking-widest uppercase text-sm sm:text-base mb-8">
          Implementation Proposal
        </p>

        <Image
          src="/images/logo/palm-city-ironworks-logo-white.png"
          alt="Palm City Iron Works"
          width={500}
          height={150}
          className="h-24 sm:h-32 lg:h-40 w-auto mx-auto mb-10"
        />

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
          The beginning of the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-400 to-brand-orange-500">
            xTriam &mdash; Palm City
          </span>{" "}
          partnership
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-brand-blue-200 max-w-2xl mx-auto leading-relaxed">
          A platform customized around how your business actually works &mdash;
          not around how a software company assumed it does.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-brand-blue-500/50" />
            <span className="text-brand-blue-400 text-sm tracking-widest uppercase">Presented by</span>
            <div className="w-12 h-px bg-brand-blue-500/50" />
          </div>
          <Image
            src="/images/logo/xTriam-Logo-Outlines-White-Orange.png"
            alt="xTriam"
            width={140}
            height={45}
            className="h-8 sm:h-10 w-auto"
          />
          <div className="flex items-center gap-3 mt-2">
            <Image
              src="/images/team/carlos-paesano.png"
              alt="Carlos A. Paesano"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-brand-blue-500/30"
            />
            <div className="text-left text-brand-blue-400 text-sm">
              <p className="text-white font-medium">Carlos A. Paesano</p>
              <p>Founder &amp; Chief Software Architect</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("challenge")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 animate-bounce text-brand-blue-400 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}

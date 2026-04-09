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
        {/* Partner logos */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
          <Image
            src="/images/logo/xTriam-Logo-Outlines-White-Orange.png"
            alt="xTriam"
            width={160}
            height={50}
            className="h-10 sm:h-14 w-auto"
          />
          <span className="text-brand-blue-500 text-3xl font-light">&times;</span>
          <Image
            src="/images/logo/palm-city-ironworks-logo-white.png"
            alt="Palm City Iron Works"
            width={200}
            height={60}
            className="h-10 sm:h-14 w-auto"
          />
        </div>

        <p className="text-brand-orange-400 font-medium tracking-widest uppercase text-sm mb-6">
          Implementation Proposal &middot; April 2026
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
          The beginning of the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-400 to-brand-orange-500">
            xTriam &mdash; Palm City
          </span>{" "}
          partnership
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-brand-blue-200 max-w-2xl mx-auto leading-relaxed">
          A platform built around how your business actually works &mdash;
          not around how a software company assumed it does.
        </p>

        <p className="mt-6 text-brand-blue-400 text-sm">
          Prepared by Carlos A. Paesano, Founder &mdash; xTriam
        </p>
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

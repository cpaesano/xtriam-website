"use client";

import { useState } from "react";
import { SectionReveal } from "../SectionReveal";
import { Play, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anthony Infante",
    title: "TISW Corp",
    headline: "Saving 60 Hours per Month When Quoting",
    quote: "60 hours saved every month on quoting alone — time that goes back into selling, not paperwork.",
    videoId: "fyaX4dWULW8",
    stat: "60 hrs/mo",
    statLabel: "saved on quoting",
  },
  {
    name: "Hisham Aljamal",
    title: "Founder, Hurricane Window & Screen",
    headline: "Driving a 50% Increase in Net Profits",
    quote: "50% increase in net profits through streamlined operations and better business visibility.",
    videoId: "FtWksXxC_tg",
    stat: "50%",
    statLabel: "increase in net profits",
  },
  {
    name: "Stephen Demos",
    title: "Sr Sales Rep, Palm Aluminum & Glass",
    headline: "Effortless Proposal Delivery",
    quote: "Automated pricing and proposals — delivery to customers is now effortless and professional.",
    videoId: "8kZgQVvzJVA",
    stat: "Effortless",
    statLabel: "proposal delivery",
  },
  {
    name: "Michele Diaz",
    title: "President, Palm Aluminum & Glass",
    headline: "Streamline Operations",
    quote: "Streamlined entire operations at Palm Aluminum & Glass, from sales through installation.",
    videoId: "85sBR952yYk",
    stat: "End-to-end",
    statLabel: "operations streamlined",
  },
];

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full aspect-video rounded-xl overflow-hidden group"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
          <Play className="w-7 h-7 text-brand-blue-900 ml-1" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-brand-blue-600 dark:text-brand-blue-400 font-bold tracking-widest uppercase text-sm mb-3">
              Proven results
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What our clients say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Window and door professionals who transformed their operations with xTriam.
              The same approach, the same commitment — now applied to Palm City Ironworks.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.videoId} delay={i * 150}>
              <div className="bg-muted/50 border border-border rounded-2xl overflow-hidden">
                <VideoEmbed videoId={t.videoId} title={t.headline} />

                <div className="p-6">
                  {/* Stat */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-brand-blue-600 dark:text-brand-blue-400">
                      {t.stat}
                    </span>
                    <span className="text-base text-muted-foreground ml-2">
                      {t.statLabel}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="flex gap-2 mb-4">
                    <Quote className="w-5 h-5 text-brand-orange-400 shrink-0 mt-0.5" />
                    <p className="text-base text-foreground leading-relaxed italic">
                      {t.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

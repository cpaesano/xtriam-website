"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
  buttonText?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function CalendlyEmbed({
  url,
  className = "",
  buttonText = "Schedule Your Demo"
}: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      const existingLink = document.querySelector(
        'link[href="https://assets.calendly.com/assets/external/widget.css"]'
      );
      if (existingScript) existingScript.remove();
      if (existingLink) existingLink.remove();
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="mb-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange-100 text-brand-orange-600 mb-4">
          <Calendar className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          Pick a Time That Works for You
        </h3>
        <p className="mt-2 text-muted-foreground">
          Select an available slot from our calendar and book your demo instantly.
        </p>
      </div>

      <button
        onClick={openCalendly}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-brand-orange-600 transition-colors"
      >
        <Calendar className="h-5 w-5" />
        {buttonText}
      </button>

      <p className="mt-4 text-sm text-muted-foreground">
        Free • No obligation • 30-45 minutes
      </p>
    </div>
  );
}

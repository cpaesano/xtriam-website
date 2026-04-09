"use client";

import { useEffect, useState } from "react";
import { SectionReveal } from "../SectionReveal";
import { Bot, User } from "lucide-react";

const conversation = [
  {
    role: "user" as const,
    text: "What's our order status this week?",
  },
  {
    role: "assistant" as const,
    text: "This week: 14 new orders received, 8 approved and in production, 3 shipped. Top dealer: Sunshine Doors LLC ($47,200). Average order cycle: 4.2 days. One order flagged — Gulf Coast #1082 has been in QC for 48 hours.",
  },
  {
    role: "user" as const,
    text: "Who was our best dealer last month?",
  },
  {
    role: "assistant" as const,
    text: "Sunshine Doors LLC — $128,400 in orders (23 orders total). Up 18% from February. Their top product: Urban Impact Series. Second place: Premier Iron Works at $94,100.",
  },
];

function TypewriterText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-4 bg-brand-blue-500 ml-0.5 animate-pulse align-middle" />}
    </span>
  );
}

export function AiAssistantDemo() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= conversation.length) return;

    const delays = [500, 2000, 1500, 2500];
    const timeout = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, delays[visibleCount] || 1500);

    return () => clearTimeout(timeout);
  }, [visibleCount]);

  return (
    <SectionReveal>
      <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8 my-6">
        <h4 className="text-center text-base font-medium text-muted-foreground mb-6">
          AI Operations Assistant &mdash; Instant Answers from Live Data
        </h4>

        <div className="max-w-lg mx-auto space-y-4">
          {conversation.slice(0, visibleCount).map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-brand-blue-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[80%] text-base leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-blue-600 text-white rounded-br-md"
                    : "bg-background border border-border text-foreground rounded-bl-md"
                }`}
              >
                {i === visibleCount - 1 && msg.role === "assistant" ? (
                  <TypewriterText text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-brand-orange-500 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {visibleCount === 0 && (
            <div className="text-center text-muted-foreground text-base py-8">
              <Bot className="w-8 h-8 mx-auto mb-2 text-brand-blue-400" />
              Loading conversation...
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Powered by Claude AI &middot; Pulls live data from Firestore &amp; BisTrack
        </p>
      </div>
    </SectionReveal>
  );
}

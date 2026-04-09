"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "fade";
  delay?: number;
  className?: string;
}

const directionClasses = {
  up: { hidden: "translate-y-8", visible: "translate-y-0" },
  left: { hidden: "translate-x-8", visible: "translate-x-0" },
  right: { hidden: "-translate-x-8", visible: "translate-x-0" },
  fade: { hidden: "", visible: "" },
};

export function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: SectionRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const dc = directionClasses[direction];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? `opacity-100 ${dc.visible}` : `opacity-0 ${dc.hidden}`,
        className
      )}
    >
      {children}
    </div>
  );
}

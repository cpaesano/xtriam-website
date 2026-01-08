"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Projects added per day (will slowly increment the counter) */
  dailyGrowth?: number;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  dailyGrowth = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [baseCount, setBaseCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);

  // Initial animation when element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Continuous growth after initial animation
  useEffect(() => {
    if (!hasAnimated || dailyGrowth <= 0) return;

    // Calculate increment interval: dailyGrowth projects per day
    // = dailyGrowth / (24 * 60 * 60 * 1000) projects per millisecond
    // For visual effect, we'll add 1 project every few seconds
    const secondsPerProject = (24 * 60 * 60) / dailyGrowth;
    const intervalMs = Math.max(secondsPerProject * 1000, 3000); // At least 3 seconds between increments

    const interval = setInterval(() => {
      setBaseCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [hasAnimated, dailyGrowth]);

  const animateCount = () => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
        setBaseCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

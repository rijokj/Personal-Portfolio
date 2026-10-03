"use client";

import React, { useState, useEffect, useRef } from "react";
import { stats } from "@/data/portfolio";

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Smooth easeOutCubic curve matching Milin Joseph reference
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 text-center select-none">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center transition-transform duration-300 hover:scale-105 select-none"
            >
              {/* Display Gradient Number */}
              <p className="font-sans font-bold text-display glow-text -mb-[0.15em] w-fit pb-[0.15em] mx-auto select-none pointer-events-none">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>

              {/* Wide-Tracked Sans Accent Label */}
              <p className="text-label font-sans font-semibold uppercase text-accent mt-5 select-none pointer-events-none">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

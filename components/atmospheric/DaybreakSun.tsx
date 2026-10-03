import React from "react";

/**
 * DaybreakSun — SVG sun for the Daybreak hero right column.
 * Replaces the inline sun markup in Hero.tsx.
 *
 * Layers (inside-out):
 *   1. Outer breathing halo (radial gradient, 9s pulse)
 *   2. Sun disc (gold → orange linear gradient)
 *   3. Inner dotted orbit ring (clockwise, 120s)
 *   4. Outer partial arc ring (counter-clockwise, 80s)
 */
export function DaybreakSun({ className = "" }: { className?: string }) {
  return (
    <div
      className={`daybreak-only relative select-none pointer-events-none flex items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Outer halo — warm gold that fades to transparent */}
          <radialGradient id="db-sun-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--color-highlight)" stopOpacity="0.5" />
            <stop offset="55%"  stopColor="var(--color-highlight)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-highlight)" stopOpacity="0" />
          </radialGradient>

          {/* Sun disc — gold top-left to orange bottom-right */}
          <linearGradient id="db-sun-disc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--color-shine)" />
            <stop offset="100%" stopColor="var(--color-brand)" />
          </linearGradient>
        </defs>

        {/* 1. Outer breathing halo */}
        <circle
          cx="200" cy="200" r="196"
          fill="url(#db-sun-halo)"
          className="animate-sun-breathe"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* 2. Sun disc */}
        <circle cx="200" cy="200" r="118" fill="url(#db-sun-disc)" />

        {/* 3. Inner dotted orbit ring — clockwise 120s */}
        <circle
          cx="200" cy="200" r="152"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeDasharray="1.5 12"
          strokeLinecap="round"
          opacity="0.5"
          className="sun-orbit"
        />

        {/* 4. Outer partial arc — counter-clockwise 80s */}
        <circle
          cx="200" cy="200" r="174"
          stroke="var(--color-brand)"
          strokeWidth="1.5"
          strokeDasharray="72 1021"
          strokeLinecap="round"
          opacity="0.7"
          className="sun-orbit-reverse"
        />
      </svg>
    </div>
  );
}

export default DaybreakSun;

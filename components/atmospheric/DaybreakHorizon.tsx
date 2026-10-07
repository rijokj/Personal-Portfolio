"use client";

import React from "react";

/**
 * DaybreakHorizon — Warm golden-hour sunset glow fixed at the page bottom.
 * Daybreak mode only. Global fixed layer (in layout.tsx), not hero-confined.
 *
 * Because it's fixed, it always shows at the bottom of the viewport as you
 * scroll — creating the warm ambient glow visible in all sections.
 */
export function DaybreakHorizon() {

  return (
    <div
      aria-hidden="true"
      className="daybreak-only pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[55vh] overflow-hidden"
    >
      {/* 1. Base warm gradient strip — bleeds from the very bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] blur-[50px]"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--color-brand) 22%, transparent), color-mix(in srgb, var(--color-highlight) 14%, transparent), transparent)",
        }}
      />

      {/* 2. Rose/flare orb — soft pink warmth */}
      <div className="animate-drift-c absolute -bottom-[15%] left-[8vw] h-[34%] w-[84vw] rounded-[50%] bg-[var(--color-flare)]/[0.08] blur-[90px]" />

      {/* 3. Brand/orange orb — wide, strong warm anchor */}
      <div className="animate-drift-b absolute -bottom-[20%] left-[2vw] h-[38%] w-[96vw] rounded-[50%] bg-[var(--color-brand)]/[0.13] blur-[90px]" />

      {/* 4. Highlight/gold orb — centered warm light */}
      <div className="animate-drift-a absolute -bottom-[12%] left-[18vw] h-[30%] w-[64vw] rounded-[50%] bg-[var(--color-highlight)]/[0.12] blur-[80px]" />

      {/* 5. Breathing sun-glow blob — centered, faintest */}
      <div
        className="animate-sun-breathe absolute -bottom-[30%] left-1/2 h-[55%] -translate-x-1/2 rounded-[50%] bg-[var(--color-shine)]/[0.25] blur-[80px]"
        style={{ width: "min(55vw, 36rem)", transformOrigin: "center" }}
      />
    </div>
  );
}

export default DaybreakHorizon;

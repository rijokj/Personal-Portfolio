import React from "react";

/**
 * DaybreakClouds — 3 animated CSS clouds + warm gold background orb.
 * Daybreak mode only — rendered inside the Hero section.
 *
 * Each cloud = 2–3 stacked rounded-full divs:
 *   - Base layer: wide flat bottom (blur-xl, 65-70% opacity)
 *   - Puff(s):    taller domes on top  (blur-lg, 80-90% opacity)
 *
 * bg-[var(--color-surface)] = #ffffff in Daybreak → white clouds on warm paper sky.
 */
export function DaybreakClouds() {
  return (
    <div
      aria-hidden="true"
      className="daybreak-only pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Background gold orb — warm golden-hour glow from top-right corner */}
      <div
        className="absolute -right-[12vw] -top-[14vh] rounded-full bg-[var(--color-highlight)]/[0.16] blur-[120px]"
        style={{ width: "max(26rem, 52vw)", height: "max(26rem, 52vw)" }}
      />

      {/* ── Cloud 1: Large, top-left ── */}
      <div
        className="animate-cloud-a absolute left-[3vw] top-[13vh]"
        style={{ height: "max(6rem, 8vw)", width: "max(20rem, 32vw)" }}
      >
        {/* Base — wide flat bottom */}
        <div className="absolute left-0 top-[35%] h-[55%] w-full rounded-full bg-[var(--color-surface)] opacity-70 blur-xl" />
        {/* Puff 1 — tall left dome */}
        <div className="absolute left-[18%] top-0 h-[70%] w-[52%] rounded-full bg-[var(--color-surface)] opacity-90 blur-lg" />
        {/* Puff 2 — shorter right dome */}
        <div className="absolute left-[52%] top-[22%] h-[52%] w-[42%] rounded-full bg-[var(--color-surface)] opacity-80 blur-lg" />
      </div>

      {/* ── Cloud 2: Medium, right ── */}
      <div
        className="animate-cloud-b absolute right-[4vw] top-[36vh]"
        style={{ height: "max(5rem, 7vw)", width: "max(17rem, 27vw)" }}
      >
        {/* Base */}
        <div className="absolute left-0 top-[40%] h-[50%] w-full rounded-full bg-[var(--color-surface)] opacity-[0.65] blur-xl" />
        {/* Puff 1 — center dome */}
        <div className="absolute left-[30%] top-0 h-[68%] w-[46%] rounded-full bg-[var(--color-surface)] opacity-[0.85] blur-lg" />
        {/* Puff 2 — left dome */}
        <div className="absolute left-[6%] top-[26%] h-[48%] w-[36%] rounded-full bg-[var(--color-surface)] opacity-75 blur-lg" />
      </div>

      {/* ── Cloud 3: Small, lower-center ── */}
      <div
        className="animate-cloud-c absolute left-[28vw] top-[64vh] opacity-70"
        style={{ height: "max(4.5rem, 6vw)", width: "max(15rem, 24vw)" }}
      >
        {/* Base */}
        <div className="absolute left-0 top-[40%] h-[50%] w-full rounded-full bg-[var(--color-surface)] opacity-70 blur-xl" />
        {/* Puff */}
        <div className="absolute left-[24%] top-0 h-[70%] w-[50%] rounded-full bg-[var(--color-surface)] opacity-[0.85] blur-lg" />
      </div>
    </div>
  );
}

export default DaybreakClouds;

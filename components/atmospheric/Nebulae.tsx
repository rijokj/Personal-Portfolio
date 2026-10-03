import React from "react";

/**
 * Nebulae — Global ambient color wash.
 *
 * Reference: milinjoseph.com shows a near-black background with color only
 * appearing as faint localized glows in specific spots — NOT spread everywhere.
 *
 * Rules:
 *  - Hero area: one soft violet orb, far left, very faint (0.05 opacity)
 *  - Mid-page:  one blue orb, far right, even fainter (0.06 opacity)
 *  - Lower:     one accent orb, far left, barely there (0.05 opacity)
 *  All blurs >= 140px, all pushed partially off-screen so the effect is
 *  localized color warmth, NOT a visible blob.
 */
export function Nebulae() {
  return (
    <>
      {/* ── Upper field: Hero viewport ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="nebula-fade pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden"
      >
        {/* Nebula 1: Brand Violet — far left, 7.5% → reduced to 5% */}
        <div className="animate-drift-a absolute top-[38vh] -left-[20vw] size-[48vw] max-w-[34rem] rounded-full bg-[var(--color-brand)]/[0.05] blur-[160px] transform-gpu will-change-transform" />
      </div>

      {/* ── Mid + Lower field: Experience → Contact ─────────────────── */}
      <div
        aria-hidden="true"
        className="nebula-fade pointer-events-none absolute inset-x-0 top-[100vh] -z-10 h-[220vh] overflow-hidden"
      >
        {/* Nebula 2: Accent Blue — far right, very faint */}
        <div className="animate-drift-a absolute top-[15vh] -right-[24vw] size-[60vw] max-w-[44rem] rounded-full bg-[var(--color-accent)]/[0.06] blur-[160px] transform-gpu will-change-transform" />

        {/* Nebula 3: Brand Violet — far left, lower mid-page */}
        <div className="animate-drift-b absolute top-[90vh] -left-[22vw] size-[55vw] max-w-[40rem] rounded-full bg-[var(--color-brand)]/[0.05] blur-[170px] transform-gpu will-change-transform" />
      </div>
    </>
  );
}

export default Nebulae;

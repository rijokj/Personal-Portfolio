import React from "react";

/**
 * AuroraHorizon — A whisper of violet at the very bottom of the hero.
 * Nearly invisible — just enough to suggest depth, not enough to see clearly.
 */
export function AuroraHorizon() {
  return (
    <div
      aria-hidden="true"
      className="galaxy-only pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[35vh] overflow-hidden"
    >
      {/* Single soft violet bloom — very faint, large blur, bottom-anchored */}
      <div
        className="animate-aurora-b absolute -bottom-[40%] left-1/2 h-[90%] w-[60vw] max-w-[36rem] -translate-x-1/2 origin-bottom rounded-[50%] blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-brand) 10%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default AuroraHorizon;

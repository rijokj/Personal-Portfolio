"use client";

import React from "react";

/**
 * MeteorShower — CSS-driven shooting stars, Galaxy mode only.
 *
 * 6 pre-positioned meteors with staggered delays so they never all
 * fire at once. Each meteor:
 *  - body: h-px gradient from transparent → highlight/70 → fg
 *  - head: 1×1 round dot with highlight glow shadow
 *  - animates via @keyframes meteor (16s loop, visible ~7.5% of the time)
 */

const meteors = [
  {
    position: "top-[17%] left-[53%]",
    rotate: "-rotate-[22deg]",
    width: "w-20",
    delay: "1.6s",
    via: "via-[var(--color-highlight)]/70",
  },
  {
    position: "top-[12%] left-[62%]",
    rotate: "-rotate-[18deg]",
    width: "w-16",
    delay: "1.75s",
    via: "via-[var(--color-flare)]/60",
  },
  {
    position: "top-[22%] left-[43%]",
    rotate: "-rotate-[24deg]",
    width: "w-24",
    delay: "1.85s",
    via: "via-[var(--color-highlight)]/70",
  },
  {
    position: "top-[34%] left-[26%]",
    rotate: "-rotate-[26deg]",
    width: "w-24",
    delay: "2.15s",
    via: "via-[var(--color-accent)]/60",
  },
  {
    position: "top-[37%] left-[12%]",
    rotate: "-rotate-[27deg]",
    width: "w-28",
    delay: "2.3s",
    via: "via-[var(--color-highlight)]/70",
  },
  {
    position: "top-[8%] left-[74%]",
    rotate: "-rotate-[20deg]",
    width: "w-20",
    delay: "2.7s",
    via: "via-[var(--color-brand)]/50",
  },
] as const;

export function MeteorShower() {

  return (
    <div
      aria-hidden="true"
      className="galaxy-only pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className={`absolute ${m.position} ${m.rotate}`}
        >
          {/* Streak body */}
          <span
            className={`animate-meteor relative block h-px ${m.width} bg-gradient-to-r from-transparent ${m.via} to-[var(--color-fg)]`}
            style={{ "--meteor-delay": m.delay } as React.CSSProperties}
          >
            {/* Glowing head dot */}
            <span
              className="absolute -top-px right-0 size-1 -translate-y-px rounded-full bg-[var(--color-fg)]"
              style={{
                boxShadow: "0 0 6px 2px color-mix(in srgb, var(--color-highlight) 50%, transparent)",
              }}
            />
          </span>
        </span>
      ))}
    </div>
  );
}

export default MeteorShower;

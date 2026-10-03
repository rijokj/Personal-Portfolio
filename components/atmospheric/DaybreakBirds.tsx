import React from "react";

/**
 * DaybreakBirds — A flock of 5 SVG birds flying across the hero.
 * Daybreak mode only.
 *
 * Each bird is a single SVG <path> stroke shaped like a "W" / "M":
 *   d="M0 6 Q6 -1 12 6 Q18 -1 24 6"
 *
 * Each bird has a unique:
 *   - y position (different altitude in the flock)
 *   - scale (depth illusion — bigger = closer)
 *   - animationDelay (never all flapping in sync)
 *   - animationDuration (different flap speeds)
 *
 * The flock container (.animate-flock) flies from -15vw to 105vw over 40s,
 * spending 24s off-screen (60% of the loop hidden).
 */

const birds = [
  { x: 0,   y: 28, scale: 1.00, delay: "0s",    duration: "1.30s" },
  { x: 34,  y: 14, scale: 0.85, delay: "-0.4s",  duration: "1.15s" },
  { x: 62,  y: 32, scale: 0.90, delay: "-0.9s",  duration: "1.45s" },
  { x: 92,  y: 6,  scale: 1.05, delay: "-0.2s",  duration: "1.25s" },
  { x: 122, y: 22, scale: 0.80, delay: "-0.7s",  duration: "1.10s" },
] as const;

export function DaybreakBirds() {
  return (
    <div
      aria-hidden="true"
      className="daybreak-only pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Flock container — animated as one unit across the viewport */}
      <div
        className="animate-flock absolute left-0 top-[24%] w-36 sm:w-44"
        style={{ color: "var(--color-fg)", opacity: 0.7 }}
      >
        <svg viewBox="0 0 150 44" fill="none" className="w-full" aria-hidden="true">
          {birds.map((bird, i) => (
            <g
              key={i}
              transform={`translate(${bird.x} ${bird.y}) scale(${bird.scale})`}
            >
              {/* Classic M-shape bird: two quadratic bezier curves */}
              <path
                d="M0 6 Q6 -1 12 6 Q18 -1 24 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-flap"
                style={{
                  animationDelay: bird.delay,
                  animationDuration: bird.duration,
                }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default DaybreakBirds;

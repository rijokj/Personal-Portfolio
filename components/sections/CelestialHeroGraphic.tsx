"use client";

import React, { useEffect, useState } from "react";

export function CelestialHeroGraphic() {
  const [theme, setTheme] = useState<"galaxy" | "daybreak">("galaxy");

  useEffect(() => {
    const updateTheme = () => {
      const current = (document.documentElement.dataset.theme as "galaxy" | "daybreak") || "galaxy";
      setTheme(current);
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          updateTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const isDaybreak = theme === "daybreak";

  return (
    <div className="relative flex items-center justify-center size-72 sm:size-88 lg:size-96 mx-auto select-none pointer-events-none">
      {isDaybreak ? (
        /* DAYBREAK MODE: Warm Solar Sun & Orbital Trajectory */
        <div className="relative flex items-center justify-center size-full">
          {/* Ambient Warm Sun Glow Halo */}
          <div
            aria-hidden="true"
            className="absolute size-72 rounded-full bg-amber-400/25 blur-[70px] -z-10"
          />

          {/* Drifting Sky Clouds */}
          <div className="animate-cloud absolute top-6 -left-8 opacity-70">
            <svg width="68" height="28" viewBox="0 0 68 28" fill="none">
              <path
                d="M10 24h48a9 9 0 0 0 0-18 14 14 0 0 0-27-3 10 10 0 0 0-17 11 8 8 0 0 0-4 10z"
                fill="rgba(245, 158, 11, 0.18)"
              />
            </svg>
          </div>

          <div className="animate-cloud absolute bottom-8 -right-6 opacity-60" style={{ animationDelay: "-7s" }}>
            <svg width="84" height="34" viewBox="0 0 84 34" fill="none">
              <path
                d="M12 30h60a11 11 0 0 0 0-22 17 17 0 0 0-33-4 12 12 0 0 0-21 14 10 10 0 0 0-6 12z"
                fill="rgba(234, 88, 12, 0.15)"
              />
            </svg>
          </div>

          {/* Outer Dashed Orbit Ring */}
          <div className="animate-orbit absolute size-72 sm:size-80 rounded-full border border-dashed border-amber-600/35">
            {/* Orbiting Satellite / Sunspot Node */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 size-3 rounded-full bg-amber-600 shadow-md shadow-amber-500/50" />
          </div>

          {/* Reverse Orbit Arc */}
          <div className="animate-orbit-reverse absolute size-60 rounded-full border border-amber-500/20">
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 size-2 rounded-full bg-orange-500 shadow-sm" />
          </div>

          {/* The Solar Sun Core */}
          <div className="animate-sun-breathe relative size-44 sm:size-52 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-300 shadow-[0_0_80px_rgba(245,158,11,0.45)] border border-amber-200/40 flex items-center justify-center">
            {/* Internal Solar Core Texture */}
            <div className="size-36 sm:size-44 rounded-full bg-gradient-to-br from-amber-200/50 via-transparent to-orange-600/40 blur-[2px]" />
          </div>
        </div>
      ) : (
        /* GALAXY MODE: Geodesic Constellation Globe & Meteor Shower */
        <div className="relative flex items-center justify-center size-full">
          {/* Ambient Cosmic Violet Nebula Glow */}
          <div
            aria-hidden="true"
            className="absolute size-72 rounded-full bg-violet-600/20 blur-[80px] -z-10"
          />

          {/* Shooting Star Meteors */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span
              className="animate-meteor absolute top-4 right-10 h-0.5 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_8px_#22d3ee]"
              style={{ "--meteor-delay": "1s" } as React.CSSProperties}
            />
            <span
              className="animate-meteor absolute top-20 right-4 h-0.5 w-32 bg-gradient-to-r from-transparent via-violet-400 to-white shadow-[0_0_8px_#a855f7]"
              style={{ "--meteor-delay": "3.5s" } as React.CSSProperties}
            />
            <span
              className="animate-meteor absolute top-36 right-16 h-0.5 w-20 bg-gradient-to-r from-transparent via-indigo-400 to-white shadow-[0_0_8px_#818cf8]"
              style={{ "--meteor-delay": "6s" } as React.CSSProperties}
            />
          </div>

          {/* Outer Rotating Constellation Orbital Ring */}
          <div className="animate-orbit absolute size-72 sm:size-84 rounded-full border border-dashed border-violet-500/30">
            {/* Constellation Star Node */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 size-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>

          {/* Reverse Orbit Ring with Secondary Star */}
          <div className="animate-orbit-reverse absolute size-64 rounded-full border border-indigo-500/25">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 size-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
          </div>

          {/* Geodesic Constellation Sphere Core */}
          <div className="relative size-48 sm:size-56 rounded-full border border-violet-500/40 bg-gradient-to-br from-violet-950/60 via-slate-950/80 to-indigo-950/60 backdrop-blur-md shadow-[0_0_60px_rgba(124,58,237,0.35)] flex items-center justify-center overflow-hidden">
            {/* SVG Coordinate Grid Lines */}
            <svg className="absolute inset-0 size-full animate-orbit" style={{ animationDuration: "90s" }} viewBox="0 0 200 200" fill="none">
              {/* Latitude Rings */}
              <ellipse cx="100" cy="100" rx="90" ry="30" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="100" cy="100" rx="90" ry="60" stroke="rgba(99, 102, 241, 0.35)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="90" ry="85" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
              {/* Longitude Ring */}
              <ellipse cx="100" cy="100" rx="35" ry="90" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="1" />
            </svg>

            {/* Glowing Celestial Constellation Core Points */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-4">
                <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                <span className="size-3 rounded-full bg-violet-400 shadow-[0_0_12px_#a855f7]" />
              </div>
              <div className="flex items-center gap-5">
                <span className="size-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#67e8f9] animate-pulse" />
                <span className="size-2 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

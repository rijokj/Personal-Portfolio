"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { milestones } from "@/data/portfolio";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<{ mobile: HTMLDivElement | null; desktop: HTMLDivElement | null }[]>([]);
  const lastScrollY = useRef(0);
  const progressRef = useRef(0);
  const ticking = useRef(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // --- CUSTOMIZATION ---
  // Mobile positioning
  const mobileLeft = "left-[24px]"; // Controls horizontal alignment of mobile timeline and dots
  const mobileTop = "top-1.5"; // Controls vertical alignment of mobile dots

  // Desktop positioning
  const desktopTranslateX = "translate-x-[0px]"; // Moves desktop dots and center line left/right
  const desktopTranslateY = "translate-y-[0px]"; // Moves desktop dots up/down
  // ---------------------

  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;

    const scrollY = window.scrollY;
    const scrollingDown = scrollY > lastScrollY.current;
    const scrollingUp = scrollY < lastScrollY.current;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // The horizontal line representing the tip of the progressive tracker
    const start = windowH * 0.6;
    const scrolled = start - rect.top;
    const total = rect.height;
    let newProgress = Math.min(1, Math.max(0, scrolled / total));

    if (scrollingDown) {
      if (newProgress >= progressRef.current) {
        progressRef.current = newProgress;
      } else {
        newProgress = progressRef.current;
      }
    } else if (scrollingUp) {
      if (newProgress <= progressRef.current) {
        progressRef.current = newProgress;
      } else {
        newProgress = progressRef.current;
      }
    } else {
      progressRef.current = newProgress;
    }

    lastScrollY.current = scrollY;

    containerRef.current.style.setProperty("--timeline-track-h", `${newProgress * 100}%`);

    let active = -1;
    const isMobile = window.innerWidth < 1024; // Tailwind 'lg' breakpoint

    dotsRef.current.forEach((dotObj, index) => {
      if (dotObj) {
        // Use the physical element based on the current responsive layout
        const dot = isMobile ? dotObj.mobile : dotObj.desktop;
        if (dot) {
          const dotRect = dot.getBoundingClientRect();
          // The exact visual center of the dot on the screen
          const dotPhysicalY = dotRect.top + dotRect.height / 2;
          
          // Activate when the tracker line reaches the exact Y coordinate of the dot
          if (dotPhysicalY <= start) {
            active = index;
          }
        }
      }
    });
    
    setActiveIndex(active);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateProgress]);

  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-36 max-sm:scroll-mt-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20 text-left">
          <h2 className="font-sans font-bold text-title glow-heading -mb-[0.15em] w-fit pb-[0.15em] text-balance">
            The path so far
          </h2>
          <p className="mt-4 text-body text-[var(--color-fg-subtle)] max-w-lg">
            2 years plus experience by sharpening facing difficulties and challenges.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">

          {/* ── Mobile: Left-anchored vertical line ── */}
          <div className={`lg:hidden absolute ${mobileLeft} top-0 bottom-0 w-[1px] bg-[var(--color-border)] -translate-x-1/2`} />
          <div
            aria-hidden="true"
            className={`lg:hidden absolute ${mobileLeft} top-0 w-[2px] rounded-full -translate-x-1/2 pointer-events-none`}
            style={{
              height: "var(--timeline-track-h, 0%)",
              background: "linear-gradient(to bottom, var(--color-brand), var(--color-accent))",
              boxShadow: "0 0 8px var(--color-brand), 0 0 18px var(--color-brand)",
            }}
          />

          {/* ── Desktop: Center vertical line ── */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-0">
            <div className={`h-full w-[1px] bg-[var(--color-border)] ${desktopTranslateX}`} />
          </div>
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-10">
            <div
              className={`w-[2px] rounded-full ${desktopTranslateX}`}
              style={{
                height: "var(--timeline-track-h, 0%)",
                background: "linear-gradient(to bottom, var(--color-brand), var(--color-accent))",
                boxShadow: "0 0 8px var(--color-brand), 0 0 18px var(--color-brand)",
              }}
            />
          </div>

          {/* ── Company pill badge at top ── */}
          <div className="relative flex lg:justify-center justify-start mb-10 pl-10 lg:pl-0">
            <div
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-2 text-xs font-bold tracking-widest text-[var(--color-fg)] shadow-lg uppercase"
              style={{
                boxShadow: "0 0 0 4px var(--color-brand)/15, 0 2px 16px rgba(0,0,0,0.4)",
              }}
            >
              {milestones[0]?.company ?? "QBurst"}
            </div>
          </div>

          {/* ── Milestone entries ── */}
          <div className="space-y-10 sm:space-y-14 lg:space-y-20 pb-10">
            {milestones.map((item, index) => {
              const isLeft = index % 2 !== 0;
              const isReached = index <= activeIndex;

              return (
                <div key={`${item.year}-${index}`}>
                  {/* MOBILE: Simple stacked single-column entry */}
                  <div className={`lg:hidden relative pl-[60px] transition-all duration-700 ${isReached ? "opacity-100" : "opacity-30"}`}>
                    {/* Dot on left line */}
                    <div 
                      className={`absolute ${mobileLeft} ${mobileTop} z-10 -translate-x-1/2`}
                      ref={(el) => {
                        if (!dotsRef.current[index]) dotsRef.current[index] = { mobile: null, desktop: null };
                        dotsRef.current[index].mobile = el;
                      }}
                    >
                      <div
                        className={`size-3 rounded-full border-2 transition-all duration-500 ${
                          isReached
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] ring-4 ring-[var(--color-brand)]/20"
                            : "border-[var(--color-border-strong)] bg-[var(--color-surface)]"
                        }`}
                        style={isReached ? { boxShadow: "0 0 10px var(--color-brand)" } : {}}
                      />
                    </div>
                    <span
                      className="block text-xs font-bold tracking-widest mb-1"
                      style={{ color: "var(--color-brand)" }}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-fg)]">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--color-fg-subtle)] leading-relaxed">
                      {item.note}
                    </p>
                  </div>

                  {/* DESKTOP: Zigzag alternating layout */}
                  <div className={`hidden lg:grid relative grid-cols-[1fr_auto_1fr] items-center gap-x-0 transition-all duration-700`}>
                    {/* LEFT cell */}
                    <div
                      className={`pr-10 text-right transition-all duration-700 ${
                        isLeft ? "" : "opacity-0 pointer-events-none"
                      } ${isReached ? "opacity-100" : "opacity-30"}`}
                    >
                      {isLeft && (
                        <>
                          <span
                            className="block text-xs font-bold tracking-widest mb-1"
                            style={{ color: "var(--color-brand)" }}
                          >
                            {item.year}
                          </span>
                          <h3 className="text-lg xl:text-xl font-bold text-[var(--color-fg)]">
                            {item.role}
                          </h3>
                          <p className="mt-1.5 text-sm text-[var(--color-fg-subtle)] leading-relaxed max-w-[220px] ml-auto">
                            {item.note}
                          </p>
                        </>
                      )}
                    </div>

                    {/* CENTER dot */}
                    <div 
                      className={`relative z-10 flex items-center justify-center ${desktopTranslateX} ${desktopTranslateY}`}
                      ref={(el) => {
                        if (!dotsRef.current[index]) dotsRef.current[index] = { mobile: null, desktop: null };
                        dotsRef.current[index].desktop = el;
                      }}
                    >
                      <div
                        className={`size-3.5 rounded-full border-2 transition-all duration-500 ${
                          isReached
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] scale-110 ring-4 ring-[var(--color-brand)]/20"
                            : "border-[var(--color-border-strong)] bg-[var(--color-surface)] scale-90"
                        }`}
                        style={isReached ? { boxShadow: "0 0 10px var(--color-brand)" } : {}}
                      />
                    </div>

                    {/* RIGHT cell */}
                    <div
                      className={`pl-10 transition-all duration-700 ${
                        !isLeft ? "" : "opacity-0 pointer-events-none"
                      } ${isReached ? "opacity-100" : "opacity-30"}`}
                    >
                      {!isLeft && (
                        <>
                          <span
                            className="block text-xs font-bold tracking-widest mb-1"
                            style={{ color: "var(--color-brand)" }}
                          >
                            {item.year}
                          </span>
                          <h3 className="text-lg xl:text-xl font-bold text-[var(--color-fg)]">
                            {item.role}
                          </h3>
                          <p className="mt-1.5 text-sm text-[var(--color-fg-subtle)] leading-relaxed max-w-[220px]">
                            {item.note}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bottom dot ── */}
          <div className="flex lg:justify-center justify-start lg:pl-0" style={{ paddingLeft: `var(--mobile-left, 24px)` }}>
            {/* The bottom dot on mobile needs to align horizontally but the left class is dynamically applied */}
          </div>
          {/* We will apply the mobileLeft class manually to the wrapper below for bottom dot */}
          <div className="flex lg:justify-center justify-start w-full relative h-4">
             {/* Mobile bottom dot */}
             <div className={`lg:hidden absolute ${mobileLeft} top-0 size-2 rounded-full bg-[var(--color-border-strong)] -translate-x-1/2`} />
             {/* Desktop bottom dot */}
             <div className={`hidden lg:block absolute left-1/2 top-0 size-2 rounded-full bg-[var(--color-border-strong)] -translate-x-1/2 ${desktopTranslateX}`} />
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { milestones } from "@/data/portfolio";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const updateProgress = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    const start = windowH * 0.6;
    const scrolled = start - rect.top;
    const total = rect.height;
    const progress = Math.min(1, Math.max(0, scrolled / total));

    trackRef.current.style.height = `${progress * 100}%`;

    const newActive = Math.floor(progress * milestones.length) - 1;
    const target = Math.min(newActive, milestones.length - 1);
    setActiveIndex((prev) => (prev === target ? prev : target));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
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
            7 years, one company. QBurst changed who I am, and the people here
            feel like family.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">

          {/* ── Mobile: Left-anchored vertical line ── */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[1px] bg-[var(--color-border)]" />
          <div
            ref={trackRef}
            aria-hidden="true"
            className="lg:hidden absolute left-4 top-0 w-[2px] rounded-full"
            style={{
              height: "0%",
              background: "linear-gradient(to bottom, var(--color-brand), var(--color-accent))",
              boxShadow: "0 0 8px var(--color-brand), 0 0 18px var(--color-brand)",
            }}
          />

          {/* ── Desktop: Center vertical line ── */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-border)]" />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full pointer-events-none"
            style={{
              height: "var(--timeline-track-h, 0%)",
              background: "linear-gradient(to bottom, var(--color-brand), var(--color-accent))",
              boxShadow: "0 0 8px var(--color-brand), 0 0 18px var(--color-brand)",
            }}
          />

          {/* ── Company pill badge at top ── */}
          <div className="relative flex lg:justify-center justify-start mb-10">
            <div
              className="relative z-10 ml-[1.625rem] lg:ml-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-2 text-xs font-bold tracking-widest text-[var(--color-fg)] shadow-lg uppercase"
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
                  <div className={`lg:hidden relative pl-10 transition-all duration-700 ${isReached ? "opacity-100" : "opacity-30"}`}>
                    {/* Dot on left line */}
                    <div className="absolute left-[0.875rem] top-1 z-10 -translate-x-1/2">
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
                    <div className="relative z-10 flex items-center justify-center">
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
          <div className="flex lg:justify-center justify-start pl-4">
            <div className="size-2 rounded-full bg-[var(--color-border-strong)]" />
          </div>
        </div>
      </div>
    </section>
  );
}


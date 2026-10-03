"use client";

import React, { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        if (!barRef.current) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        barRef.current.style.transform = `scaleX(${progress})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={barRef}
      aria-hidden="true"
      style={{ transform: "scaleX(0)" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-accent)] to-[var(--color-highlight)]"
    />
  );
}

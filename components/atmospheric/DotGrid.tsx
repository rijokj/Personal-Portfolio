"use client";

import React, { useEffect, useRef } from "react";

export function DotGrid({
  className = "pointer-events-none fixed inset-0 -z-10 dot-field",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let clientX = 0;
    let clientY = 0;
    let curX = 0;
    let curY = 0;
    let glow = 0;
    let targetGlow = 0;
    let rafId = 0;
    let isIntersecting = false;

    const updateStyles = () => {
      el.style.setProperty("--dot-x", `${curX.toFixed(1)}px`);
      el.style.setProperty("--dot-y", `${curY.toFixed(1)}px`);
      el.style.setProperty("--dot-glow", glow.toFixed(3));
    };

    const getCoords = () => {
      const rect = el.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      targetGlow =
        localX >= -160 && localX <= rect.width + 160 && localY >= -120 && localY <= rect.height + 120
          ? 1
          : 0;
      return { localX, localY };
    };

    const loop = () => {
      const { localX, localY } = getCoords();
      // 12% spring smoothing lag towards mouse coordinates
      curX += (localX - curX) * 0.12;
      curY += (localY - curY) * 0.12;
      glow += (targetGlow - glow) * 0.08;

      if (targetGlow === 0 && glow < 0.005) {
        glow = 0;
        updateStyles();
        rafId = 0;
        return;
      }
      updateStyles();
      rafId = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (prefersReduced) {
        const { localX, localY } = getCoords();
        curX = localX;
        curY = localY;
        glow = targetGlow;
        updateStyles();
        return;
      }
      if (!rafId) {
        const { localX, localY } = getCoords();
        if (glow === 0) {
          curX = localX;
          curY = localY;
        }
        rafId = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting !== isIntersecting) {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            window.addEventListener("mousemove", onMouseMove, { passive: true });
          } else {
            window.removeEventListener("mousemove", onMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
            glow = 0;
            updateStyles();
          }
        }
      },
      { rootMargin: "20% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className={className}>
      {/* Layer 5A: Base Celestial Grid (40px Matrix at 6% Opacity) */}
      <div className="dot-field-layer dot-field-base absolute inset-0" />

      {/* Layer 5B: Interactive Cursor Spotlight (40px Matrix at 20% Opacity, 220px Radial Mask) */}
      <div className="dot-field-layer dot-field-glow absolute inset-0" />
    </div>
  );
}

export default DotGrid;

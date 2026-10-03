"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export function BrowserFrame({
  children,
  className = "",
  enableTilt = true,
}: BrowserFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Spring Physics State for 3D Tilt
  useEffect(() => {
    if (!enableTilt || prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    // Configuration constants from design spec
    const MAX_ROTATION = 5; // Maximum tilt is ~5 degrees
    const STIFFNESS = 180;  // Spring response speed
    const DAMPING = 22;     // Settling factor without oscillation

    // Spring state refs
    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;
    let vx = 0;
    let vy = 0;

    let targetGlareX = 50;
    let targetGlareY = 50;
    let currentGlareX = 50;
    let currentGlareY = 50;

    let isHovered = false;
    let animId: number | null = null;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Spring physics formula: F = -k*(x - target) - c*v
      const ax = -STIFFNESS * (currentRx - targetRx) - DAMPING * vx;
      const ay = -STIFFNESS * (currentRy - targetRy) - DAMPING * vy;

      vx += ax * dt;
      vy += ay * dt;
      currentRx += vx * dt;
      currentRy += vy * dt;

      // Smooth glare position
      currentGlareX += (targetGlareX - currentGlareX) * 0.15;
      currentGlareY += (targetGlareY - currentGlareY) * 0.15;

      // Apply 3D perspective (1200px) and rotation directly to GPU-accelerated layer
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg)`;
      }

      // Dynamic specular reflection on glass surface
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${currentGlareX.toFixed(1)}% ${currentGlareY.toFixed(1)}%, rgba(255,255,255,0.08) 0%, transparent 65%)`;
        glareRef.current.style.opacity = isHovered ? "1" : "0";
      }

      // Check if spring has settled
      const isSettled =
        Math.abs(currentRx - targetRx) < 0.01 &&
        Math.abs(currentRy - targetRy) < 0.01 &&
        Math.abs(vx) < 0.01 &&
        Math.abs(vy) < 0.01;

      if (!isSettled || isHovered) {
        animId = requestAnimationFrame(tick);
      } else {
        // At rest
        currentRx = targetRx;
        currentRy = targetRy;
        vx = 0;
        vy = 0;
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1200px) rotateX(${targetRx}deg) rotateY(${targetRy}deg)`;
        }
        animId = null;
      }
    };

    const startAnimation = () => {
      if (animId === null) {
        lastTime = performance.now();
        animId = requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      isHovered = true;

      // Calculate normalized position from center: -0.5 (left/top) to +0.5 (right/bottom)
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normX = Math.max(-0.5, Math.min(0.5, mouseX / rect.width - 0.5));
      const normY = Math.max(-0.5, Math.min(0.5, mouseY / rect.height - 0.5));

      // Tilting toward mouse:
      // Mouse at top (-normY) -> tilts top towards viewer (+rotateX)
      // Mouse at right (+normX) -> tilts right towards viewer (+rotateY)
      targetRx = -normY * (MAX_ROTATION * 2);
      targetRy = normX * (MAX_ROTATION * 2);

      targetGlareX = (normX + 0.5) * 100;
      targetGlareY = (normY + 0.5) * 100;

      startAnimation();
    };

    const handleMouseLeave = () => {
      isHovered = false;
      // Reset target rotation to flat center (0, 0)
      targetRx = 0;
      targetRy = 0;
      targetGlareX = 50;
      targetGlareY = 50;

      startAnimation();
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, [enableTilt, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative [perspective:1200px] w-full"
    >
      <div
        ref={cardRef}
        className={`glass relative overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-2xl shadow-[var(--color-brand)]/10 transition-shadow duration-300 hover:shadow-[var(--color-brand)]/20 [transform-style:preserve-3d] will-change-transform ${className}`}
        style={{
          transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Specular glare layer reacting to mouse position */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 65%)",
          }}
        />

        {/* Browser Content */}
        {children}
      </div>
    </div>
  );
}

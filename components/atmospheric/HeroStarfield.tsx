"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Star {
  nx: number;           // normalised X 0–1
  ny: number;           // normalised Y 0–1
  z: number;            // depth layer 0.2–1.0
  size: number;         // base radius px (0.6–1.7)
  baseOpacity: number;  // 0.35–0.80
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  opacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STAR_COLORS = [
  "#ffffff",  // pure white
  "#e6e9ff",  // lavender-white  (matches --color-fg)
  "#c4b5fd",  // soft violet-300
  "#a5f3fc",  // soft cyan-200
  "#fbcfe8",  // soft pink-200
];

const PROXIMITY_RADIUS = 180;   // px — glow activation radius
const GLOW_OPACITY_BOOST = 0.45;
const GLOW_SIZE_BOOST = 0.6;    // ×1.6 at cursor center
const REPULSE_STRENGTH = 14;    // px push at full glow, full depth
const PARALLAX_SCALE = 12;      // px max shift per depth unit
const ACCENT_HALO_ALPHA = 0.18; // blue halo max opacity
const SOFT_HALO_ALPHA = 0.12;   // permanent halo for large stars
const LERP_PARALLAX = 0.05;     // 5%/frame smoothing
const LERP_INTENSITY = 0.08;    // 8%/frame smoothing

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Mouse state — raw targets + lerped smooth values
  const cursorTargetX = useRef<number>(0);
  const cursorTargetY = useRef<number>(0);
  const smoothCenterX = useRef<number>(0);
  const smoothCenterY = useRef<number>(0);
  const mouseIntensity = useRef<number>(0);
  const smoothIntensity = useRef<number>(0);
  const canvasRect = useRef<DOMRect | null>(null);

  // ─── Star generation ──────────────────────────────────────────────────────
  const initStars = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 9000), 160);
    smoothCenterX.current = width / 2;
    smoothCenterY.current = height / 2;
    cursorTargetX.current = width / 2;
    cursorTargetY.current = height / 2;

    starsRef.current = Array.from({ length: count }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      z: 0.8 * Math.random() + 0.2,
      size: 1.1 * Math.random() + 0.6,
      baseOpacity: 0.45 * Math.random() + 0.35,
      twinkleSpeed: 0.002 * Math.random() + 0.001,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));
  }, []);

  // ─── Procedural canvas shooting stars ────────────────────────────────────
  const trySpawnMeteor = useCallback((width: number, height: number) => {
    if (Math.random() > 0.0015) return;
    const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.4;
    const speed = 8 + Math.random() * 6;
    meteorsRef.current.push({
      x: Math.random() * width * 0.7 + width * 0.05,
      y: Math.random() * height * 0.45,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 60,
      opacity: 0,
    });
  }, []);

  // ─── Main effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Interaction guards from the spec
    const isMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const noReduceMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enableHover = isMouse && noReduceMotion;

    // ─── Resize ───────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      canvasRect.current = canvas.getBoundingClientRect();
      initStars(canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      canvasRect.current = canvas.getBoundingClientRect();
    });
    ro.observe(canvas);

    // ─── Mouse handlers ───────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (!enableHover) return;
      const rect = canvasRect.current ?? canvas.getBoundingClientRect();
      cursorTargetX.current = e.clientX - rect.left;
      cursorTargetY.current = e.clientY - rect.top;
      mouseIntensity.current = 1;
    };

    const onMouseLeave = () => {
      // Reset to canvas center on leave
      cursorTargetX.current = canvas.width / 2;
      cursorTargetY.current = canvas.height / 2;
      mouseIntensity.current = 0;
    };

    // Attach to the parent section (not just canvas) for full hero coverage
    const section = canvas.closest("section") ?? canvas.parentElement ?? document;
    section.addEventListener("mousemove", onMouseMove as EventListener, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave as EventListener, { passive: true });

    // ─── Accent color ─────────────────────────────────────────────────────
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent").trim() || "#3b82f6";

    // ─── Render loop ──────────────────────────────────────────────────────
    const draw = (now: number) => {
      const delta = now - (lastTimeRef.current || now);
      lastTimeRef.current = now;
      timeRef.current += delta;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // ── Step 1 & 2: Lerp smooth cursor + intensity every frame ──────────
      smoothCenterX.current += (cursorTargetX.current - smoothCenterX.current) * LERP_PARALLAX;
      smoothCenterY.current += (cursorTargetY.current - smoothCenterY.current) * LERP_PARALLAX;
      smoothIntensity.current += (mouseIntensity.current - smoothIntensity.current) * LERP_INTENSITY;

      const scx = smoothCenterX.current;
      const scy = smoothCenterY.current;
      const si = smoothIntensity.current;

      // Parallax offset from canvas centre
      const parallaxOffsetX = (scx - width / 2) * 0.01;
      const parallaxOffsetY = (scy - height / 2) * 0.01;

      // ── Draw Stars ───────────────────────────────────────────────────────
      for (const star of starsRef.current) {
        const t = timeRef.current;

        // A. Screen position with depth parallax
        let starX = star.nx * width + parallaxOffsetX * star.z * PARALLAX_SCALE;
        let starY = star.ny * height + parallaxOffsetY * star.z * PARALLAX_SCALE;

        // B. Twinkle opacity
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        let opacity = star.baseOpacity + 0.15 * twinkle;
        let radius = star.size;
        let glowFactor = 0;

        // C. Distance to smooth cursor
        const dx = starX - scx;
        const dy = starY - scy;
        const dist = Math.hypot(dx, dy);

        if (dist < PROXIMITY_RADIUS && si > 0.001) {
          // D. Quadratic falloff — sharp center, gentle edges
          const proximity = 1 - dist / PROXIMITY_RADIUS;
          glowFactor = proximity * proximity * si;

          // E. Brightness boost
          opacity = Math.min(1, opacity + GLOW_OPACITY_BOOST * glowFactor);

          // F. Size boost
          radius *= 1 + GLOW_SIZE_BOOST * glowFactor;

          // G. Repulsion — push star away from cursor
          if (dist > 0.001) {
            const repulse = REPULSE_STRENGTH * glowFactor * star.z / dist;
            starX += dx * repulse;
            starY += dy * repulse;
          }
        }

        // ── Draw: permanent soft halo for large stars ───────────────────
        if (star.size > 1.1) {
          ctx.beginPath();
          ctx.arc(starX, starY, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = SOFT_HALO_ALPHA * opacity;
          ctx.fill();
        }

        // ── Draw: star body ─────────────────────────────────────────────
        ctx.beginPath();
        ctx.arc(starX, starY, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // ── Draw: blue accent halo when glowing ─────────────────────────
        if (glowFactor > 0) {
          ctx.beginPath();
          ctx.arc(starX, starY, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = ACCENT_HALO_ALPHA * glowFactor;
          ctx.fill();
        }
      }

      // Reset globalAlpha
      ctx.globalAlpha = 1;

      // ── Procedural shooting stars ────────────────────────────────────
      trySpawnMeteor(width, height);

      meteorsRef.current = meteorsRef.current.filter((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const progress = m.life / m.maxLife;
        if (progress < 0.1) m.opacity = progress / 0.1;
        else if (progress > 0.7) m.opacity = Math.max(0, 1 - (progress - 0.7) / 0.3);
        else m.opacity = 1;

        if (m.life >= m.maxLife || m.x > width + 150 || m.y < -150) return false;

        const tailX = m.x - 8 * m.vx;
        const tailY = m.y - 8 * m.vy;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(230,233,255,${m.opacity})`);
        grad.addColorStop(1, "rgba(230,233,255,0)");

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1;
        ctx.stroke();
        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // ─── IntersectionObserver — pause when off-screen ─────────────────────
    let isVisible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          rafRef.current = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("mousemove", onMouseMove as EventListener);
      section.removeEventListener("mouseleave", onMouseLeave as EventListener);
    };
  }, [initStars, trySpawnMeteor]);

  return (
    <div
      aria-hidden="true"
      className="galaxy-only pointer-events-none absolute inset-x-0 top-0 z-0 h-[130vh] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full"
      />
    </div>
  );
}

export default HeroStarfield;

"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { Compass, RotateCw } from "lucide-react";

interface Interactive3DGlobeProps {
  className?: string;
}

export function Interactive3DGlobe({ className = "" }: Interactive3DGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.2);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [theme, setTheme] = useState<"galaxy" | "daybreak">("galaxy");

  // Track active theme
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.dataset.theme;
      setTheme(current === "daybreak" ? "daybreak" : "galaxy");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.offsetWidth;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2, 2);

    const onResize = () => {
      if (container && canvas) {
        width = container.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);

    const isDark = theme === "galaxy";

    // Palette configuration for Galaxy (dark cosmic) vs Daybreak (warm solar)
    const baseColor: [number, number, number] = isDark
      ? [0.35, 0.28, 0.55] // Deep cosmic indigo-violet dots
      : [0.85, 0.65, 0.45]; // Warm terracotta-sand dots

    const markerColor: [number, number, number] = isDark
      ? [0.15, 0.85, 1.0] // Cyan starlight
      : [0.95, 0.4, 0.1]; // Solar orange

    const glowColor: [number, number, number] = isDark
      ? [0.55, 0.25, 0.95] // Electric violet atmospheric rim
      : [0.95, 0.65, 0.25]; // Warm solar flare

    const arcColor: [number, number, number] = isDark
      ? [0.35, 0.75, 1.0] // Luminous cyan arcs
      : [0.92, 0.35, 0.15]; // Glowing terracotta arcs

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId: number = 0;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: isDark ? 1 : 0,
        diffuse: 1.25,
        scale: 1.05,
        mapSamples: 16000,
        mapBrightness: isDark ? 5.5 : 4.0,
        baseColor,
        markerColor,
        glowColor,
        offset: [0, 0],
        // Coordinates for key hubs: Kerala (India), Dubai (UAE), San Francisco, London, Singapore, Tokyo
        markers: [
          { location: [10.8505, 76.2711], size: 0.08, color: [0.95, 0.3, 0.85] }, // Kerala
          { location: [25.2048, 55.2708], size: 0.09, color: [0.15, 0.85, 1.0] }, // Dubai
          { location: [37.7749, -122.4194], size: 0.06, color: [0.2, 0.95, 0.55] }, // San Francisco
          { location: [51.5074, -0.1278], size: 0.06, color: [0.95, 0.75, 0.2] }, // London
          { location: [1.3521, 103.8198], size: 0.06, color: [0.4, 0.7, 1.0] }, // Singapore
          { location: [35.6762, 139.6503], size: 0.06, color: [0.9, 0.45, 0.95] }, // Tokyo
        ],
        // Interconnecting flight arcs
        arcs: [
          { from: [10.8505, 76.2711], to: [25.2048, 55.2708] }, // Kerala <-> Dubai
          { from: [25.2048, 55.2708], to: [51.5074, -0.1278] }, // Dubai <-> London
          { from: [51.5074, -0.1278], to: [37.7749, -122.4194] }, // London <-> SF
          { from: [25.2048, 55.2708], to: [1.3521, 103.8198] }, // Dubai <-> Singapore
          { from: [1.3521, 103.8198], to: [35.6762, 139.6503] }, // Singapore <-> Tokyo
        ],
        arcColor,
        arcWidth: 0.65,
        arcHeight: 0.35,
        markerElevation: 0.03,
      });

      // Animation frame loop using globe.update
      const render = () => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.0035;
        }
        if (globe) {
          globe.update({
            phi: phiRef.current,
            theta: thetaRef.current,
          });
        }
        animId = requestAnimationFrame(render);
      };
      animId = requestAnimationFrame(render);
    } catch (err) {
      console.error("Failed to initialize 3D Globe:", err);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (globe) {
        globe.destroy();
      }
    };
  }, [theme]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
    setHasInteracted(true);
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x;
      const deltaY = e.clientY - pointerInteracting.current.y;

      pointerInteracting.current = { x: e.clientX, y: e.clientY };

      // Update horizontal rotation (phi) and vertical tilt (theta)
      phiRef.current += deltaX * 0.006;
      thetaRef.current = Math.max(-0.6, Math.min(0.6, thetaRef.current - deltaY * 0.006));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient Atmospheric Backdrop Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full blur-[70px] opacity-70 transition-colors duration-700"
        style={{
          background:
            theme === "galaxy"
              ? "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(34,211,238,0.15) 50%, transparent 75%)"
              : "radial-gradient(circle, rgba(242,106,27,0.25) 0%, rgba(245,158,11,0.12) 50%, transparent 75%)",
        }}
      />

      {/* Decorative Outer Constellation Orbit Ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-[92%] rounded-full border border-dashed opacity-40 animate-orbit"
        style={{
          borderColor: theme === "galaxy" ? "rgba(168,85,247,0.3)" : "rgba(242,106,27,0.3)",
          animationDuration: "80s",
        }}
      >
        <span
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full shadow-lg"
          style={{
            backgroundColor: theme === "galaxy" ? "#22d3ee" : "#f26a1b",
            boxShadow: theme === "galaxy" ? "0 0 12px #22d3ee" : "0 0 12px #f26a1b",
          }}
        />
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
        className="size-full aspect-square cursor-grab touch-none transition-opacity duration-500 rounded-full"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Interactive Helper Hint Badge (Fades after first touch) */}
      {!hasInteracted && (
        <div className="pointer-events-none absolute bottom-1 sm:bottom-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-3 py-1 text-[11px] font-medium text-[var(--color-fg-muted)] backdrop-blur-md shadow-lg transition-opacity duration-300 animate-pulse">
          <RotateCw className="size-3 text-[var(--color-brand)] animate-spin" style={{ animationDuration: "6s" }} />
          <span>Click & drag to rotate 3D globe</span>
        </div>
      )}

      {/* Live Hubs Badge (Top Right) */}
      <div className="pointer-events-none absolute top-2 right-2 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-overlay)]/60 px-2.5 py-0.5 text-[10px] font-mono text-[var(--color-fg-subtle)] backdrop-blur-sm">
        <Compass className="size-3 text-[var(--color-flare)]" />
        <span>Dubai • Kerala • SF</span>
      </div>
    </div>
  );
}

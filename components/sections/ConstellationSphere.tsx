"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { RotateCw, Sparkles } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  tier: "major" | "prominent" | "minor";
  pulseOffset: number;
  pulseSpeed: number;
}

interface Edge {
  a: number;
  b: number;
}

interface Star {
  nx: number;
  ny: number;
  size: number;
  alpha: number;
  speed: number;
  twinklePhase: number;
  tint: "white" | "violet" | "amber";
}

// ─── STATIC GEOMETRY PRE-GENERATION (0ms runtime overhead on mount) ─────────
function generateSphereGeometry() {
  const R = 135;
  const N = 120;
  const K = 3;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: Node3D[] = [];
  let bigCount = 0;

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;

    let tier: Node3D["tier"] = "minor";
    if (i % 6 === 0 || i === 0 || i === N - 1) {
      tier = "major";
      bigCount++;
    } else if (i % 3 === 0) {
      tier = "prominent";
      bigCount++;
    }

    nodes.push({
      x: Math.cos(theta) * rad * R,
      y: -y * R,
      z: Math.sin(theta) * rad * R,
      tier,
      pulseOffset: (i * 1.37) % (Math.PI * 2),
      pulseSpeed: 1.8 + ((i * 0.7) % 2.2),
    });
  }

  const dist2 = (a: Node3D, b: Node3D) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return dx * dx + dy * dy + dz * dz;
  };

  const edgeSet = new Set<string>();
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i !== j) dists.push([dist2(nodes[i], nodes[j]), j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < K; k++) {
      const j = dists[k][1];
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ a, b });
      }
    }
  }

  const stars: Star[] = [];
  const tints: Star["tint"][] = ["white", "white", "white", "violet", "amber"];
  for (let i = 0; i < 50; i++) {
    stars.push({
      nx: ((i * 37) % 100) / 100,
      ny: ((i * 53) % 100) / 100,
      size: ((i * 13) % 13) / 10 + 0.3,
      alpha: 0.15 + ((i * 17) % 45) / 100,
      speed: 0.4 + ((i * 7) % 8) / 10,
      twinklePhase: (i * 2.1) % (Math.PI * 2),
      tint: tints[i % tints.length],
    });
  }

  return { nodes, edges, stars, counts: { nodes: nodes.length, edges: edges.length, bigNodes: bigCount } };
}

const STATIC_GEOMETRY = generateSphereGeometry();

export function ConstellationSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<"galaxy" | "daybreak">("galaxy");
  const [hasInteracted, setHasInteracted] = useState(false);
  const counts = STATIC_GEOMETRY.counts;

  // ─── ROTATION SPEED & VELOCITY ─────────────────────────────────────
  const rotX = useRef(-0.22);
  const rotY = useRef(0.4);
  const velX = useRef(0);
  const velY = useRef(0.0025);

  // Pointer drag & hover interaction state
  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const mouseParallax = useRef({ x: 0, y: 0 });
  const mouseScreenPos = useRef<{ x: number; y: number } | null>(null);

  // Geometry references
  const nodesRef = useRef<Node3D[]>(STATIC_GEOMETRY.nodes);
  const edgesRef = useRef<Edge[]>(STATIC_GEOMETRY.edges);
  const starsRef = useRef<Star[]>(STATIC_GEOMETRY.stars);
  const animFrameRef = useRef<number>(0);

  // Theme observer (Galaxy vs Daybreak)
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

  // ─── 2. 3D RENDER LOOP ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height) || 360;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);

    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible) {
          isVisible = true;
          if (!animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(render);
          }
        } else if (!nowVisible) {
          isVisible = false;
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = 0;
          }
        }
      },
      { rootMargin: "150px" }
    );
    if (containerRef.current) io.observe(containerRef.current);

    let t = 0;

    const render = () => {
      t += 1 / 60;
      const isDark = theme === "galaxy";
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // 100% Transparent canvas background — clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Starfield, scattered across canvas, softly twinkling
      starsRef.current.forEach((st) => {
        const flick = 0.5 + 0.5 * Math.sin(t * st.speed + st.twinklePhase);
        const a = st.alpha * (0.4 + 0.6 * flick);
        const color =
          st.tint === "violet"
            ? `rgba(192,132,252,${a})`
            : st.tint === "amber"
            ? `rgba(253,186,116,${a})`
            : `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(st.nx * width, st.ny * height, st.size * (dpr / 2), 0, Math.PI * 2);
        ctx.fill();
      });

      // Inertia & continuous idle standby rotation (pure West-to-East horizontal spin)
      if (!isDragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;

        // Steady West-to-East rotation (front nodes move from Left/West to Right/East)
        velY.current += (0.0025 - velY.current) * 0.04;

        // Damp vertical tilt velocity to zero and smoothly maintain natural astronomical tilt
        velX.current *= 0.92;
        rotX.current += (-0.22 - rotX.current) * 0.02;
      }

      // 3D rotation math with mouse parallax
      const currentRotX = rotX.current + mouseParallax.current.y * 0.2;
      const currentRotY = rotY.current + mouseParallax.current.x * 0.25;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const cameraD = width * 1.05;
      const R = (width / 2) * 0.78;

      // Project 3D nodes into 2D camera coordinates (proportional to sphere radius)
      const HOVER_RADIUS = R * 0.7;

      const projectedNodes = nodesRef.current.map((n) => {
        const ox = (n.x / 135) * R;
        const oy = (n.y / 135) * R;
        const oz = (n.z / 135) * R;

        const x1 = ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;

        const y2 = oy * cosX - z1 * sinX;
        const z2 = oy * sinX + z1 * cosX;

        const scale = cameraD / (cameraD - z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;
        const depth = Math.max(0, Math.min(1, (z2 + R) / (2 * R)));

        // Mouse hover proximity calculation for local area glow
        let hoverGlow = 0;
        if (mouseScreenPos.current) {
          const dx = screenX - mouseScreenPos.current.x;
          const dy = screenY - mouseScreenPos.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < HOVER_RADIUS) {
            hoverGlow = Math.pow(1 - dist / HOVER_RADIUS, 1.6);
          }
        }

        return {
          screenX,
          screenY,
          z: z2,
          depth,
          tier: n.tier,
          persp: scale,
          pulseOffset: n.pulseOffset,
          pulseSpeed: n.pulseSpeed,
          hoverGlow,
        };
      });

      // ─── WIREFRAME EDGES ───────────────────────────────────────────
      const sortedEdges = edgesRef.current
        .map((e) => {
          const p1 = projectedNodes[e.a];
          const p2 = projectedNodes[e.b];
          const avgDepth = (p1.depth + p2.depth) / 2;
          const maxHover = Math.max(p1.hoverGlow, p2.hoverGlow);
          return { p1, p2, avgDepth, maxHover };
        })
        .sort((a, b) => a.avgDepth - b.avgDepth);

      sortedEdges.forEach(({ p1, p2, avgDepth, maxHover }) => {
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);

        if (isDark) {
          const hue = 250 + avgDepth * 30 + maxHover * 15;
          const alpha = 0.08 + avgDepth * 0.32 + maxHover * 0.45;
          ctx.strokeStyle = maxHover > 0.2
            ? `rgba(216, 180, 254, ${Math.min(1, alpha)})` // Illuminated bright violet
            : `hsla(${hue},70%,65%,${alpha})`;
        } else {
          const alpha = avgDepth > 0.5 ? 0.28 + (avgDepth - 0.5) * 0.65 : 0.08 + avgDepth * 0.22;
          ctx.strokeStyle = maxHover > 0.2
            ? `rgba(249, 115, 22, ${Math.min(1, alpha + 0.3)})`
            : `rgba(242,106,27,${alpha})`;
        }
        ctx.lineWidth = ((avgDepth > 0.5 ? 1.0 : 0.6) + maxHover * 1.2) * (dpr / 2);
        ctx.stroke();
      });

      // ─── SHINING NODES & BLOOM ─────────────────────────────────────
      // Render from back to front
      const sortedNodeIndices = [...projectedNodes].sort((a, b) => a.z - b.z);

      sortedNodeIndices.forEach((n) => {
        const isBig = n.tier === "major" || n.tier === "prominent";
        const isMajor = n.tier === "major";

        // Dynamic breathing shimmer for shining effect
        const shimmer = 0.82 + 0.18 * Math.sin(t * n.pulseSpeed + n.pulseOffset);

        // Size scaling: Tiered base size + depth perspective + hover expansion
        let sizeMultiplier = 1.5;
        if (isMajor) sizeMultiplier = 3.6;
        else if (isBig) sizeMultiplier = 2.6;

        const baseR =
          sizeMultiplier *
          (0.6 + n.depth * 0.75) *
          n.persp *
          shimmer *
          (1 + n.hoverGlow * 0.65) *
          (dpr / 2);

        const alpha = Math.min(1, (0.35 + n.depth * 0.55 + n.hoverGlow * 0.4) * shimmer);
        const hue = 255 + n.depth * 25;

        ctx.save();

        // 1. Radiant Atmospheric Bloom (for Big nodes or any hovered node)
        if (isDark && (isBig || n.hoverGlow > 0.15)) {
          const bloomMult = isMajor ? 5.8 : 4.2;
          const bloomRadius = baseR * bloomMult * (1 + n.hoverGlow * 0.7);
          const bloom = ctx.createRadialGradient(n.screenX, n.screenY, 0, n.screenX, n.screenY, bloomRadius);

          if (n.hoverGlow > 0.2) {
            // Intense glowing flare when cursor hovers this area
            bloom.addColorStop(0, `rgba(240, 171, 252, ${0.85 * alpha})`);
            bloom.addColorStop(0.4, `rgba(192, 132, 252, ${0.45 * alpha})`);
            bloom.addColorStop(1, "rgba(168, 85, 247, 0)");
          } else {
            // Natural shining starlight bloom
            bloom.addColorStop(0, `hsla(${hue}, 90%, 75%, ${0.5 * alpha})`);
            bloom.addColorStop(0.6, `hsla(${hue}, 80%, 60%, ${0.15 * alpha})`);
            bloom.addColorStop(1, "rgba(0,0,0,0)");
          }

          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(n.screenX, n.screenY, bloomRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Primary Node Body
        ctx.beginPath();
        ctx.arc(n.screenX, n.screenY, baseR, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = isBig || n.hoverGlow > 0.2
            ? `hsla(${hue}, 90%, ${isMajor ? 78 : 72}%, ${alpha})`
            : `hsla(${hue}, 75%, 65%, ${alpha})`;

          // Shadow blur glow
          ctx.shadowColor = n.hoverGlow > 0.2 ? "#f0abfc" : "#c084fc";
          ctx.shadowBlur = (isMajor ? 12 : 6) * (1 + n.hoverGlow * 1.5) * (dpr / 2);
        } else {
          ctx.fillStyle = isBig || n.hoverGlow > 0.2
            ? `rgba(242, 106, 27, ${alpha})`
            : `rgba(217, 119, 6, ${alpha})`;
          ctx.shadowColor = "#f97316";
          ctx.shadowBlur = 8 * (dpr / 2);
        }
        ctx.fill();

        // 3. Ultra-Bright Shining Core (Diamond star spark)
        if (isBig || n.hoverGlow > 0.25) {
          const coreR = Math.max(1, baseR * (isMajor ? 0.45 : 0.38));
          ctx.beginPath();
          ctx.arc(n.screenX, n.screenY, coreR, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${Math.min(1, alpha + 0.35)})`
            : `rgba(255, 247, 237, ${Math.min(1, alpha + 0.35)})`;
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 4 * (dpr / 2);
          ctx.fill();
        }

        ctx.restore();
      });

      if (isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // Synchronous initial frame render for instant paint
    render();
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [theme]);

  // ─── 3. POINTER DRAG & HOVER HANDLERS ──────────────────────────────
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setHasInteracted(true);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // 1. Update cursor coordinates for hover area glow
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 2, 2);
      mouseScreenPos.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    }

    // 2. Drag rotation
    if (isDragging.current && lastPointer.current) {
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };

      rotY.current += dx * 0.008;
      rotX.current -= dy * 0.008;

      velY.current = dx * 0.004;
      velX.current = -dy * 0.004;
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseParallax.current = { x: nx, y: ny };
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    lastPointer.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    lastPointer.current = null;
    mouseScreenPos.current = null; // Clear hover glow when pointer leaves
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient background glow aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full blur-[80px] opacity-75 transition-colors duration-700"
        style={{
          background:
            theme === "galaxy"
              ? "radial-gradient(circle, rgba(124,58,237,0.32) 0%, rgba(99,102,241,0.14) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(242,106,27,0.22) 0%, rgba(245,158,11,0.10) 45%, transparent 70%)",
        }}
      />

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="relative z-10 cursor-grab touch-none rounded-full"
      />

      {/* Badges Removed */}
    </div>
  );
}

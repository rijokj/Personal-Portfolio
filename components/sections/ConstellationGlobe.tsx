"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface ConstellationNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  glowColor: string;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

const NODE_DEFS = [
  { bx: 0.5,  by: 0.12, r: 4.5, color: "#22d3ee", glow: "#22d3ee", connections: [1, 5] },
  { bx: 0.75, by: 0.28, r: 3.0, color: "#a78bfa", glow: "#8b5cf6", connections: [2, 4] },
  { bx: 0.82, by: 0.55, r: 3.5, color: "#60a5fa", glow: "#3b82f6", connections: [3] },
  { bx: 0.62, by: 0.82, r: 2.5, color: "#a78bfa", glow: "#8b5cf6", connections: [6] },
  { bx: 0.38, by: 0.80, r: 3.0, color: "#22d3ee", glow: "#22d3ee", connections: [6] },
  { bx: 0.18, by: 0.52, r: 2.5, color: "#f472b6", glow: "#ec4899", connections: [4] },
  { bx: 0.50, by: 0.50, r: 5.0, color: "#c4b5fd", glow: "#8b5cf6", connections: [] },
];

export function ConstellationGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<ConstellationNode[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0-1
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    nodesRef.current = NODE_DEFS.map((d, i) => ({
      x: d.bx * w,
      y: d.by * h,
      baseX: d.bx * w,
      baseY: d.by * h,
      radius: d.r,
      color: d.color,
      glowColor: d.glow,
      connections: d.connections,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.015,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    // Listen on window so parallax works even when mouse is over left column
    window.addEventListener("mousemove", onMouse, { passive: true });

    let last = performance.now();
    const draw = (now: number) => {
      const delta = now - last;
      last = now;
      timeRef.current += delta;

      // Smooth-lerp mouse
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.06;

      const { width, height } = canvas;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      // Parallax offset: mouse moves nodes up to ±18px
      const px = (mx - 0.5) * 36;
      const py = (my - 0.5) * 28;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      // Update node positions with parallax + subtle drift
      nodes.forEach((n, i) => {
        const drift = Math.sin(timeRef.current * 0.0005 + i * 0.7) * 3;
        n.x = n.baseX + px + drift;
        n.y = n.baseY + py + drift * 0.6;
        n.pulse += n.pulseSpeed;
      });

      // Draw edges / constellation lines
      nodes.forEach((n) => {
        n.connections.forEach((ci) => {
          const target = nodes[ci];
          if (!target) return;
          const dist = Math.hypot(target.x - n.x, target.y - n.y);
          const alpha = Math.max(0, 1 - dist / (Math.max(width, height) * 0.7));

          const grad = ctx.createLinearGradient(n.x, n.y, target.x, target.y);
          grad.addColorStop(0, `${n.color}55`);
          grad.addColorStop(1, `${target.color}22`);

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      });

      // Draw sphere wireframe — latitude & longitude ellipses
      const cx = width / 2 + px * 0.3;
      const cy = height / 2 + py * 0.3;
      const rx = width * 0.44;
      const ry = height * 0.44;
      const sphereRotation = timeRef.current * 0.00015;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(sphereRotation);
      ctx.translate(-cx, -cy);

      // Latitude rings
      [-0.6, -0.3, 0, 0.3, 0.6].forEach((t) => {
        const yOffset = t * ry;
        const scaleX = Math.sqrt(Math.max(0, 1 - t * t));
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, rx * scaleX, ry * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(148, 130, 255, 0.18)";
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Longitude arc
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx * 0.3, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.22)";
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.restore();

      // Draw nodes
      nodes.forEach((n) => {
        const pulseFactor = 0.75 + Math.sin(n.pulse) * 0.25;
        const r = n.radius * pulseFactor;

        // Outer glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        glowGrad.addColorStop(0, `${n.glowColor}55`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = n.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="size-full"
      aria-hidden="true"
    />
  );
}

"use client";

import React, { useState, useEffect, useId } from "react";
import { ArrowUpRight, Sparkles, X, Heart, Send } from "lucide-react";

// --- Hash Algorithm for 10 Generative Cosmic Variants ---
export function wallVariant(id: string): number {
  let t = 0;
  for (let r = 0; r < id.length; r += 1) {
    t = (31 * t + id.charCodeAt(r)) % 100003;
  }
  return t % 10;
}

// --- Adaptive Text Sizing Based on Character Count ---
export function messageSize(length: number): string {
  if (length <= 70) {
    return "text-[1.125rem] sm:text-[1.25rem] font-bold line-clamp-4 leading-snug";
  }
  if (length <= 150) {
    return "text-[0.95rem] sm:text-[1.05rem] font-semibold line-clamp-4 leading-relaxed";
  }
  return "text-[0.85rem] sm:text-[0.875rem] font-normal line-clamp-5 leading-normal";
}

// --- Star / Particle Coordinates for Cosmic Backgrounds ---
const dots_n: [number, number, number, number][] = [
  [132, 48, 1.1, 0.7], [168, 52, 1, 0.62], [158, 74, 0.9, 0.5], [142, 70, 1.2, 0.48],
  [176, 66, 0.8, 0.5], [120, 62, 0.9, 0.5], [190, 44, 1, 0.5], [112, 40, 0.8, 0.5],
  [204, 72, 0.9, 0.4], [96, 74, 1, 0.4], [220, 50, 0.7, 0.42], [80, 50, 0.8, 0.42],
  [236, 88, 0.9, 0.3], [64, 92, 0.7, 0.3], [252, 110, 0.8, 0.26], [48, 116, 0.9, 0.26],
  [268, 64, 0.6, 0.3], [36, 66, 0.7, 0.3], [276, 138, 0.7, 0.24], [28, 142, 0.6, 0.24],
  [292, 96, 0.6, 0.2], [18, 98, 0.6, 0.2], [204, 158, 0.7, 0.24], [110, 164, 0.6, 0.24]
];

const dots_p: [number, number, number, number][] = [
  [64, 36, 1.2, 0.7], [112, 26, 0.9, 0.55], [196, 30, 1, 0.6], [262, 44, 1.1, 0.6],
  [300, 70, 0.8, 0.42], [24, 72, 0.9, 0.42], [86, 96, 0.8, 0.36], [236, 104, 0.9, 0.36],
  [160, 118, 0.7, 0.32], [52, 140, 0.9, 0.34], [276, 150, 1, 0.4], [128, 168, 0.8, 0.4],
  [212, 178, 0.9, 0.45], [40, 186, 0.7, 0.35]
];

const dots_y: [number, number, number, number][] = [
  [40, 30, 1.1, 0.62], [86, 52, 0.9, 0.5], [148, 26, 1, 0.58], [206, 44, 0.9, 0.5],
  [258, 24, 1.1, 0.6], [292, 58, 0.8, 0.42], [22, 66, 0.8, 0.42], [124, 62, 0.7, 0.36],
  [178, 78, 0.7, 0.3], [240, 92, 0.8, 0.3], [66, 100, 0.7, 0.28], [300, 118, 0.7, 0.26],
  [12, 126, 0.6, 0.24], [284, 160, 0.7, 0.28]
];

const dots_d: [number, number, number, number][] = [
  [158, 58, 1.8, 0.72], [146, 50, 1.5, 0.7], [170, 66, 1.4, 0.55], [150, 72, 1.3, 0.5],
  [168, 46, 1.4, 0.65], [134, 64, 1.2, 0.55], [182, 56, 1.3, 0.6], [160, 80, 1.1, 0.45],
  [140, 38, 1.2, 0.6], [190, 72, 1.1, 0.42], [122, 50, 1.1, 0.55], [176, 34, 1, 0.5],
  [196, 44, 1, 0.5], [128, 80, 1, 0.4], [204, 64, 0.9, 0.42], [110, 66, 1, 0.45],
  [186, 88, 0.9, 0.34], [144, 90, 0.9, 0.34], [214, 84, 0.8, 0.32], [100, 42, 0.9, 0.45],
  [216, 32, 0.8, 0.42], [96, 88, 0.8, 0.32], [228, 54, 0.8, 0.38], [86, 58, 0.8, 0.4],
  [232, 100, 0.7, 0.28], [74, 78, 0.7, 0.3], [240, 72, 0.7, 0.34], [66, 40, 0.8, 0.4],
  [248, 110, 0.6, 0.24], [58, 104, 0.7, 0.26], [254, 88, 0.6, 0.28], [46, 66, 0.7, 0.32],
  [262, 124, 0.6, 0.22], [38, 132, 0.6, 0.22], [270, 46, 0.6, 0.3], [30, 90, 0.6, 0.26],
  [280, 102, 0.6, 0.22], [22, 44, 0.6, 0.28], [168, 116, 0.7, 0.26], [132, 124, 0.6, 0.24],
  [200, 138, 0.6, 0.24], [104, 146, 0.6, 0.24], [236, 158, 0.6, 0.24], [70, 164, 0.6, 0.24],
  [160, 166, 0.6, 0.24], [188, 180, 0.5, 0.22], [112, 182, 0.5, 0.22]
];

const dots_j: [number, number, number, number][] = [
  [34, 34, 1, 0.55], [92, 22, 0.9, 0.5], [156, 40, 0.8, 0.45], [196, 20, 1, 0.55],
  [286, 92, 0.9, 0.4], [304, 40, 0.8, 0.45], [64, 72, 0.7, 0.3], [128, 88, 0.7, 0.28],
  [222, 118, 0.7, 0.26], [268, 146, 0.8, 0.3], [172, 164, 0.7, 0.3], [96, 178, 0.8, 0.34],
  [30, 150, 0.6, 0.26], [242, 184, 0.7, 0.3]
];

const dots_f: [number, number, number, number][] = [
  [30, 32, 1, 0.55], [98, 20, 0.8, 0.45], [232, 24, 0.9, 0.5], [298, 46, 1, 0.5],
  [58, 62, 0.7, 0.3], [276, 84, 0.7, 0.3], [20, 104, 0.7, 0.26], [306, 128, 0.7, 0.26],
  [124, 148, 0.7, 0.3], [206, 158, 0.8, 0.32], [64, 174, 0.7, 0.3], [268, 182, 0.7, 0.3],
  [160, 186, 0.6, 0.28]
];

const dots_g: [number, number, number, number][] = [
  [40, 24, 1.1, 0.6], [96, 40, 0.9, 0.5], [148, 22, 1, 0.55], [200, 36, 0.9, 0.5],
  [252, 20, 1, 0.5], [296, 48, 0.8, 0.42], [18, 54, 0.8, 0.42], [124, 58, 0.8, 0.36],
  [222, 62, 0.8, 0.34], [70, 76, 0.7, 0.28], [174, 84, 0.7, 0.26], [278, 96, 0.7, 0.26],
  [34, 120, 0.7, 0.24], [136, 132, 0.6, 0.22], [244, 140, 0.7, 0.26], [88, 160, 0.7, 0.3],
  [190, 172, 0.8, 0.32], [292, 178, 0.7, 0.3], [46, 186, 0.6, 0.28]
];

const dots_h: [number, number, number, number][] = [
  [-14, 72, 4.2, 0.85], [22, 82, 3, 0.7], [54, 68, 5, 0.9], [88, 84, 2.6, 0.6],
  [118, 70, 4.4, 0.85], [148, 84, 3.2, 0.7], [180, 68, 4.8, 0.9], [210, 84, 2.8, 0.6],
  [242, 70, 4.2, 0.85], [272, 82, 3.2, 0.7], [304, 68, 4.6, 0.85], [336, 82, 3, 0.6]
];

const dots_u: [number, number, number, number][] = [
  [36, 26, 1, 0.55], [268, 24, 1, 0.55], [152, 20, 0.8, 0.45], [300, 62, 0.8, 0.4],
  [22, 66, 0.8, 0.4], [88, 98, 0.7, 0.28], [232, 104, 0.7, 0.28], [160, 118, 0.7, 0.26],
  [52, 134, 0.7, 0.26], [274, 142, 0.8, 0.3], [118, 158, 0.7, 0.3], [204, 172, 0.8, 0.32],
  [40, 184, 0.6, 0.28], [296, 182, 0.6, 0.28]
];

const dots_dollar: [number, number, number, number][] = [
  [46, 26, 0.9, 0.5], [112, 38, 0.8, 0.42], [176, 24, 0.9, 0.5], [238, 40, 0.8, 0.42],
  [296, 28, 0.9, 0.45], [22, 52, 0.7, 0.32], [148, 56, 0.7, 0.3], [268, 66, 0.7, 0.28],
  [80, 74, 0.6, 0.24], [312, 84, 0.6, 0.24]
];

const dots_C: [number, number, number, number][] = [
  [28, 52, 0.8, 0.45], [104, 34, 0.7, 0.4], [188, 46, 0.8, 0.42], [262, 30, 0.7, 0.4],
  [306, 66, 0.6, 0.32], [62, 88, 0.6, 0.24], [148, 104, 0.6, 0.22], [226, 96, 0.6, 0.22],
  [16, 118, 0.6, 0.22], [292, 132, 0.6, 0.24], [86, 150, 0.7, 0.3], [170, 168, 0.7, 0.3],
  [246, 182, 0.6, 0.28], [40, 178, 0.6, 0.28]
];

const accretion_disks: [number, number, number, number, number, number][] = [
  [46, 44, 10, 3.2, -24, 0.5], [116, 28, 7.5, 2.4, 38, 0.42], [196, 38, 9, 2.6, -12, 0.45],
  [268, 56, 6.5, 2.2, 62, 0.4], [30, 96, 8, 2.4, 14, 0.26], [128, 84, 6, 2, -48, 0.24],
  [214, 116, 9.5, 2.8, 26, 0.26], [296, 104, 7, 2.2, -34, 0.24], [72, 134, 8.5, 2.6, 52, 0.34],
  [160, 148, 11, 3.4, -16, 0.4], [240, 160, 7.5, 2.4, 34, 0.4], [104, 176, 9, 2.8, -40, 0.44],
  [286, 184, 6.5, 2, 18, 0.4]
];

// --- Sub-components for SVG Construction ---
function Dots({ dots, color = "var(--color-fg)" }: { dots: [number, number, number, number][]; color?: string }) {
  return (
    <g fill={color}>
      {dots.map(([cx, cy, r, op], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} opacity={op} />
      ))}
    </g>
  );
}

function RadialGlow({
  id,
  cx,
  cy,
  rx,
  ry,
  color,
  opacity,
}: {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  color: string;
  opacity: number;
}) {
  return (
    <>
      <radialGradient id={id}>
        <stop offset="0%" stopColor={color} stopOpacity={opacity} />
        <stop offset="55%" stopColor={color} stopOpacity={0.34 * opacity} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </radialGradient>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? rx} fill={`url(#${id})`} />
    </>
  );
}

function SparkleStar({ x, y, s, o, color }: { x: number; y: number; s: number; o: number; color: string }) {
  const p = 0.16 * s;
  return (
    <path
      d={`M ${x} ${y - s} Q ${x + p} ${y - p} ${x + s} ${y} Q ${x + p} ${y + p} ${x} ${y + s} Q ${x - p} ${y + p} ${x - s} ${y} Q ${x - p} ${y - p} ${x} ${y - s} Z`}
      fill={color}
      opacity={o}
    />
  );
}

// --- The 10 Generative Cosmic Artwork Variants ---
function CosmicVariant0({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const spiral = (
    <>
      <path d="M 18 -6 C 56 -26 104 -10 116 38 C 126 78 98 114 56 124 C 32 130 10 124 -4 110" />
      <path d="M -18 6 C -56 26 -104 10 -116 -38 C -126 -78 -98 -114 -56 -124 C -32 -130 -10 -124 4 -110" />
    </>
  );
  return (
    <>
      <RadialGlow id={`gx-${id}-halo`} cx={154} cy={62} rx={132} ry={70} color={t} opacity={0.3} />
      <g transform="translate(154 62) rotate(-12) scale(1 0.54)" fill="none" strokeLinecap="round">
        <g stroke={r} strokeWidth={13} opacity={0.26}>{spiral}</g>
        <g stroke={t} strokeWidth={4} opacity={0.5}>{spiral}</g>
      </g>
      <RadialGlow id={`gx-${id}-core`} cx={154} cy={62} rx={40} ry={22} color={c} opacity={0.45} />
      <Dots dots={dots_n} />
    </>
  );
}

function CosmicVariant1({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  return (
    <>
      <RadialGlow id={`gx-${id}-a`} cx={96} cy={56} rx={80} ry={62} color={t} opacity={0.55} />
      <RadialGlow id={`gx-${id}-b`} cx={172} cy={38} rx={66} ry={52} color={c} opacity={0.4} />
      <RadialGlow id={`gx-${id}-c`} cx={240} cy={72} rx={74} ry={58} color={r} opacity={0.5} />
      <RadialGlow id={`gx-${id}-d`} cx={176} cy={156} rx={120} ry={46} color={t} opacity={0.22} />
      <ellipse cx={152} cy={54} rx={94} ry={46} transform="rotate(-8 152 54)" fill="none" stroke={i} strokeWidth={1.2} opacity={0.3} />
      <Dots dots={dots_p} />
    </>
  );
}

function CosmicVariant2({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  const x = "var(--galaxy-void, #05060a)";
  return (
    <>
      <RadialGlow id={`gx-${id}-halo`} cx={118} cy={170} rx={130} ry={104} color={r} opacity={0.26} />
      <Dots dots={dots_y} />
      <linearGradient id={`gx-${id}-planet`} x1="0" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor={t} stopOpacity={0.55} />
        <stop offset="50%" stopColor={t} stopOpacity={0.2} />
        <stop offset="100%" stopColor={x} stopOpacity={0.9} />
      </linearGradient>
      <g transform="rotate(-16 118 176)">
        <ellipse cx={118} cy={176} rx={132} ry={34} fill="none" stroke={c} strokeWidth={5} opacity={0.28} />
        <ellipse cx={118} cy={176} rx={110} ry={26} fill="none" stroke={i} strokeWidth={1.5} opacity={0.24} />
        <circle cx={118} cy={176} r={58} fill={`url(#gx-${id}-planet)`} />
        <circle cx={118} cy={176} r={58} fill="none" stroke={i} strokeWidth={1.2} opacity={0.22} />
        <path d="M -14 176 A 132 34 0 0 1 250 176" fill="none" stroke={c} strokeWidth={5} opacity={0.42} />
      </g>
    </>
  );
}

function CosmicVariant3({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  return (
    <>
      <RadialGlow id={`gx-${id}-halo`} cx={158} cy={62} rx={128} ry={72} color={r} opacity={0.28} />
      <Dots dots={dots_d} />
      <SparkleStar x={70} y={44} s={13} o={0.4} color={i} />
      <SparkleStar x={250} y={36} s={15} o={0.42} color={t} />
      <SparkleStar x={54} y={168} s={12} o={0.34} color={c} />
      <SparkleStar x={262} y={162} s={11} o={0.34} color={i} />
      <SparkleStar x={158} y={58} s={9} o={0.45} color="var(--color-fg)" />
    </>
  );
}

function CosmicVariant4({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  return (
    <>
      <linearGradient id={`gx-${id}-tail`} gradientUnits="userSpaceOnUse" x1="252" y1="46" x2="10" y2="186">
        <stop offset="0%" stopColor={i} stopOpacity={0.5} />
        <stop offset="40%" stopColor={r} stopOpacity={0.26} />
        <stop offset="100%" stopColor={t} stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`gx-${id}-dust`} gradientUnits="userSpaceOnUse" x1="252" y1="46" x2="6" y2="182">
        <stop offset="0%" stopColor={c} stopOpacity={0.34} />
        <stop offset="100%" stopColor={c} stopOpacity={0} />
      </linearGradient>
      <Dots dots={dots_j} />
      <path d="M 250 42 C 180 74 96 116 -3 164 L 23 208 C 120 152 200 96 254 50 Z" fill={`url(#gx-${id}-tail)`} />
      <path d="M 248 56 C 178 96 102 132 6 180" fill="none" stroke={`url(#gx-${id}-dust)`} strokeWidth={12} strokeLinecap="round" />
      <RadialGlow id={`gx-${id}-head`} cx={252} cy={46} rx={34} color={i} opacity={0.5} />
      <circle cx={252} cy={46} r={4.5} fill="var(--color-fg)" opacity={0.55} />
      <SparkleStar x={252} y={46} s={22} o={0.4} color={i} />
    </>
  );
}

function CosmicVariant5({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  return (
    <>
      <Dots dots={dots_f} />
      <g transform="rotate(-14 162 72)" fill="none">
        <ellipse cx={162} cy={72} rx={58} ry={20} stroke={i} strokeWidth={1.3} opacity={0.45} />
        <ellipse cx={162} cy={72} rx={96} ry={33} stroke={r} strokeWidth={1.3} opacity={0.36} />
        <ellipse cx={162} cy={72} rx={134} ry={46} stroke={t} strokeWidth={1.3} opacity={0.28} />
        <g fill="var(--color-fg)">
          <circle cx={206} cy={85} r={2.6} opacity={0.55} />
          <circle cx={72} cy={61} r={2.2} opacity={0.5} />
          <circle cx={248} cy={37} r={2.8} opacity={0.55} />
        </g>
      </g>
      <RadialGlow id={`gx-${id}-core`} cx={162} cy={72} rx={30} color={c} opacity={0.45} />
      <circle cx={162} cy={72} r={4} fill="var(--color-fg)" opacity={0.5} />
    </>
  );
}

function CosmicVariant6({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const x = "var(--galaxy-void, #05060a)";
  return (
    <>
      <Dots dots={dots_g} />
      <linearGradient id={`gx-${id}-lane`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={x} stopOpacity={0} />
        <stop offset="40%" stopColor={x} stopOpacity={0.98} />
        <stop offset="100%" stopColor={x} stopOpacity={0} />
      </linearGradient>
      <g transform="rotate(-20 160 72)">
        <RadialGlow id={`gx-${id}-field`} cx={160} cy={72} rx={180} ry={48} color={t} opacity={0.6} />
        <RadialGlow id={`gx-${id}-core`} cx={160} cy={72} rx={78} ry={30} color={r} opacity={0.5} />
        <rect x={-90} y={58} width={500} height={34} fill={`url(#gx-${id}-lane)`} />
        <rect x={-90} y={57} width={500} height={1.4} fill={c} opacity={0.3} />
        <Dots dots={dots_h} color={x} />
      </g>
    </>
  );
}

function CosmicVariant7({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  return (
    <>
      <Dots dots={dots_u} />
      <path
        d="M 160 56 C 186 22 254 24 252 62 C 250 98 184 92 160 56 C 136 20 68 22 70 60 C 72 96 138 92 160 56 Z"
        fill="none"
        stroke={i}
        strokeWidth={1.2}
        opacity={0.32}
      />
      <RadialGlow id={`gx-${id}-left`} cx={110} cy={54} rx={54} color={t} opacity={0.5} />
      <RadialGlow id={`gx-${id}-right`} cx={208} cy={58} rx={44} color={c} opacity={0.45} />
      <circle cx={110} cy={54} r={5} fill="var(--color-fg)" opacity={0.55} />
      <circle cx={208} cy={58} r={4} fill="var(--color-fg)" opacity={0.5} />
      <SparkleStar x={110} y={54} s={20} o={0.32} color={t} />
      <SparkleStar x={208} y={58} s={16} o={0.3} color={c} />
    </>
  );
}

function CosmicVariant8({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const i = "var(--galaxy-aurora, #22d3ee)";
  const pillars: [string, string][] = [
    ["M 28 200 C 38 158 18 128 36 88 L 48 84 C 36 126 54 156 48 200 Z", i],
    ["M 72 200 C 84 150 62 118 80 68 L 92 64 C 78 116 96 148 90 200 Z", t],
    ["M 122 200 C 136 158 114 122 132 76 L 148 72 C 132 120 150 156 142 200 Z", i],
    ["M 174 200 C 186 152 166 120 182 74 L 194 70 C 180 118 198 150 190 200 Z", t],
    ["M 224 200 C 236 156 216 126 232 86 L 248 82 C 232 126 250 156 242 200 Z", i],
    ["M 272 200 C 282 160 264 132 278 98 L 290 94 C 276 132 292 158 286 200 Z", t],
  ];
  return (
    <>
      <Dots dots={dots_dollar} />
      <RadialGlow id={`gx-${id}-base`} cx={158} cy={198} rx={190} ry={60} color={t} opacity={0.3} />
      <linearGradient id={`gx-${id}-cyan`} gradientUnits="userSpaceOnUse" x1="0" y1="196" x2="0" y2="50">
        <stop offset="0%" stopColor={i} stopOpacity={0.5} />
        <stop offset="35%" stopColor={i} stopOpacity={0.24} />
        <stop offset="100%" stopColor={i} stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`gx-${id}-violet`} gradientUnits="userSpaceOnUse" x1="0" y1="196" x2="0" y2="50">
        <stop offset="0%" stopColor={t} stopOpacity={0.55} />
        <stop offset="35%" stopColor={t} stopOpacity={0.28} />
        <stop offset="100%" stopColor={t} stopOpacity={0} />
      </linearGradient>
      <g>
        {pillars.map(([d, color], idx) => (
          <path key={idx} d={d} fill={`url(#gx-${id}-${color === i ? "cyan" : "violet"})`} />
        ))}
      </g>
    </>
  );
}

function CosmicVariant9({ id }: { id: string }) {
  const t = "var(--galaxy-cosmic-1, #7c3aed)";
  const r = "var(--galaxy-cosmic-2, #3b82f6)";
  const c = "var(--galaxy-cosmic-3, #ec4899)";
  const colors = [t, r, c];
  return (
    <>
      <RadialGlow id={`gx-${id}-void`} cx={160} cy={54} rx={200} ry={96} color={r} opacity={0.16} />
      <Dots dots={dots_C} />
      {accretion_disks.map(([cx, cy, rx, ry, rot, op], idx) => (
        <g key={idx} transform={`rotate(${rot} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors[idx % 3]} opacity={0.7 * op} />
          <ellipse cx={cx} cy={cy} rx={0.36 * rx} ry={0.7 * ry} fill="var(--color-fg)" opacity={op} />
        </g>
      ))}
    </>
  );
}

const variantComponents = [
  CosmicVariant0,
  CosmicVariant1,
  CosmicVariant2,
  CosmicVariant3,
  CosmicVariant4,
  CosmicVariant5,
  CosmicVariant6,
  CosmicVariant7,
  CosmicVariant8,
  CosmicVariant9,
];

export function CosmicArtwork({ variant, uniqueId }: { variant: number; uniqueId: string }) {
  const v = ((variant % 10) + 10) % 10;
  const Comp = variantComponents[v];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="size-full opacity-[0.45]"
      >
        <Comp id={`${uniqueId}-${v}`} />
      </svg>
    </div>
  );
}

// --- The SVG Orbit Animation for Call to Action Card ---
const twinklingStars = [
  { cx: 22, cy: 16, r: 1.5, delay: "0s" },
  { cx: 64, cy: 40, r: 1.1, delay: "0.9s" },
  { cx: 104, cy: 10, r: 1.8, delay: "0.4s" },
  { cx: 186, cy: 18, r: 1.3, delay: "1.5s" },
  { cx: 232, cy: 44, r: 1.1, delay: "2.1s" },
  { cx: 262, cy: 12, r: 1.7, delay: "1.1s" },
  { cx: 34, cy: 92, r: 1.1, delay: "2.6s" },
  { cx: 250, cy: 96, r: 1.2, delay: "0.6s" },
];

const bubbleTemplates = [
  { offset: 0.08, fill: "var(--color-brand)", ink: "var(--color-background)", kind: "star" },
  { offset: 0.33, fill: "var(--color-surface)", ink: "var(--color-fg-subtle)", kind: "lines" },
  { offset: 0.58, fill: "var(--color-accent)", ink: "var(--color-background)", kind: "dots" },
  { offset: 0.83, fill: "var(--color-surface)", ink: "var(--color-fg-subtle)", kind: "heart" },
];

const sealStarPath = "M20 12.5 C20.6 17.6 22.4 19.4 27.5 20 C22.4 20.6 20.6 22.4 20 27.5 C19.4 22.4 17.6 20.6 12.5 20 C17.6 19.4 19.4 17.6 20 12.5 Z";

function BubbleShape({
  bubble,
}: {
  bubble: { fill: string; ink: string; kind: string };
}) {
  return (
    <>
      <path
        d="M-8 -9H8A5 5 0 0 1 13 -4V0A5 5 0 0 1 8 5H-2L-8 11V5.4A5 5 0 0 1 -13 0V-4A5 5 0 0 1 -8 -9Z"
        fill={bubble.fill}
        stroke="var(--color-border-strong)"
        strokeWidth={bubble.fill === "var(--color-surface)" ? 1 : 0}
      />
      {bubble.kind === "star" && (
        <path d={sealStarPath} transform="translate(-12 -14) scale(0.6)" fill={bubble.ink} />
      )}
      {bubble.kind === "dots" && (
        <g fill={bubble.ink}>
          <circle cx="-6" cy="-2" r="1.8" />
          <circle cx="0" cy="-2" r="1.8" />
          <circle cx="6" cy="-2" r="1.8" />
        </g>
      )}
      {bubble.kind === "heart" && (
        <path
          d="M0 3.2C-1.2 2.1 -6 -0.6 -6 -3.6a3 3 0 0 1 6 -1.1a3 3 0 0 1 6 1.1c0 3 -4.8 5.7 -6 6.8Z"
          fill="var(--color-highlight)"
        />
      )}
      {bubble.kind === "lines" && (
        <g fill={bubble.ink}>
          <rect x="-8" y="-5" width="16" height="2.4" rx="1.2" />
          <rect x="-8" y="-0.2" width="11" height="2.4" rx="1.2" />
        </g>
      )}
    </>
  );
}

export function OrbitAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let start: number | null = null;
    const DURATION = 18000; // 18 seconds full cycle

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % DURATION) / DURATION;
      setPhase(progress);
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <svg aria-hidden="true" viewBox="0 0 280 112" fill="none" className="h-28 w-auto max-w-full">
      <defs>
        <linearGradient id="note-orbit-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-surface)" />
          <stop offset="100%" stopColor="var(--color-surface-deep)" />
        </linearGradient>
        <radialGradient id="note-orbit-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Twinkling background stars */}
      {twinklingStars.map((s, idx) => (
        <circle
          key={idx}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          className="fill-[var(--color-highlight)] animate-twinkle"
          style={{ animationDelay: s.delay }}
        />
      ))}

      {/* Elliptical dashed orbit path */}
      <ellipse
        cx="140"
        cy="58"
        rx="108"
        ry="24"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="2 5"
        opacity="0.7"
      />

      {/* Planet in Center with atmosphere and craters */}
      <circle cx="140" cy="82" r="28" fill="url(#note-orbit-glow)" />
      <circle
        cx="140"
        cy="82"
        r="22"
        fill="url(#note-orbit-surface)"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <ellipse cx="140" cy="68" rx="12" ry="3.6" fill="var(--color-accent)" opacity="0.14" />
      <ellipse cx="133" cy="76" rx="4.5" ry="1.6" fill="var(--color-background)" opacity="0.45" />
      <ellipse cx="149" cy="86" rx="3.2" ry="1.2" fill="var(--color-background)" opacity="0.4" />

      {/* Orbiting Elements traveling along the elliptical path */}
      {bubbleTemplates.map((bubble, idx) => {
        const theta = ((phase + bubble.offset) % 1) * 2 * Math.PI;
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        const depthRatio = (sin + 1) / 2; // 0 (back) to 1 (front)
        const x = 140 + 108 * cos;
        const y = 58 + 24 * sin;
        const scale = 1.15 * (0.65 + 0.35 * depthRatio);
        const opacity = 0.35 + 0.65 * depthRatio;

        return (
          <g
            key={idx}
            transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)})`}
            opacity={opacity.toFixed(3)}
          >
            <BubbleShape bubble={bubble} />
          </g>
        );
      })}
    </svg>
  );
}

// --- Entry Interface ---
export interface GuestbookEntry {
  id: string;
  display_name: string;
  message: string;
  avatar_url?: string | null;
  created_at: string;
}

// --- Initial Entries ---
const initialGuestbookEntries: GuestbookEntry[] = [
  {
    id: "gb-101",
    display_name: "Hadia",
    message: "The cosmic theme is so calming...",
    created_at: "2026-08-28T12:00:00Z",
  },
  {
    id: "gb-102",
    display_name: "Alex Miller",
    message: "Inspiring portfolio! Love the cosmic theme and buttery smooth animations.",
    created_at: "2026-09-02T15:30:00Z",
  },
  {
    id: "gb-103",
    display_name: "Sarah Chen",
    message: "The 3D cards and subtle glow work so well together. Incredible attention to detail!",
    created_at: "2026-09-10T09:15:00Z",
  },
  {
    id: "gb-104",
    display_name: "Elena Rostova",
    message: "The starlight trajectory and interactive details make this stand out from any other portfolio.",
    created_at: "2026-09-14T18:45:00Z",
  },
  {
    id: "gb-105",
    display_name: "Kiran R.",
    message: "Super slick UI and clean performance throughout. Great craftsmanship!",
    created_at: "2026-09-18T14:20:00Z",
  },
  {
    id: "gb-106",
    display_name: "Maya Lin",
    message: "Bookmarked this for inspiration! The micro-interactions feel so alive.",
    created_at: "2026-09-22T11:00:00Z",
  },
  {
    id: "gb-107",
    display_name: "David K.",
    message: "Stunning design language. Pure visual poetry.",
    created_at: "2026-09-24T16:10:00Z",
  },
  {
    id: "gb-108",
    display_name: "Priya Sharma",
    message: "The celestial aesthetics and typography hierarchy are top tier.",
    created_at: "2026-09-26T20:05:00Z",
  },
  {
    id: "gb-109",
    display_name: "Marcus Thorne",
    message: "One of the best developer portfolios I've seen in years. Hats off!",
    created_at: "2026-09-27T08:40:00Z",
  },
];

// --- Formatter for Dates ---
const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// --- Type 1: Guest Note Card ---
export function GuestNoteCard({ entry, onOpenModal }: { entry: GuestbookEntry; onOpenModal: () => void }) {
  const uniqueId = useId();
  const variant = wallVariant(entry.id);

  // Avatar initials and subtle color
  const initials = entry.display_name.trim().charAt(0).toUpperCase() || "?";
  const avatarBgColors = [
    "bg-violet-600/30 text-violet-300 border-violet-500/40",
    "bg-blue-600/30 text-blue-300 border-blue-500/40",
    "bg-cyan-600/30 text-cyan-300 border-cyan-500/40",
    "bg-pink-600/30 text-pink-300 border-pink-500/40",
    "bg-amber-600/30 text-amber-300 border-amber-500/40",
    "bg-emerald-600/30 text-emerald-300 border-emerald-500/40",
  ];
  const avatarStyle = avatarBgColors[variant % avatarBgColors.length];

  return (
    <div
      onClick={onOpenModal}
      className="group block w-72 lg:w-[360px] shrink-0 cursor-pointer rounded-2xl focus-ring transition-transform hover:-translate-y-1 duration-300"
    >
      <div className="relative flex h-[200px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg shadow-black/20 hover:border-[var(--color-border-strong)] transition-all">
        {/* Layer 1: Generative Cosmic Background */}
        <CosmicArtwork variant={variant} uniqueId={uniqueId} />

        {/* Layer 2: Dark Scrim Overlay for Legibility */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-[var(--color-background)]/55 to-[var(--color-background)]/35"
        />

        {/* Layer 3: Text Content with Adaptive Font Sizing */}
        <div className="relative flex flex-1 items-center justify-center px-5 text-center">
          <p
            className={`whitespace-pre-wrap break-words text-balance text-[var(--color-fg)] tracking-tight ${messageSize(
              entry.message.length
            )}`}
          >
            &ldquo;{entry.message}&rdquo;
          </p>
        </div>

        {/* Layer 4: Bottom Author Bar */}
        <div className="relative mt-auto flex h-14 items-center gap-3 border-t border-[var(--color-border)]/60 bg-[var(--color-background)]/75 px-4 py-2.5 backdrop-blur-xs">
          {/* Avatar */}
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${avatarStyle}`}
          >
            {initials}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-xs font-semibold text-[var(--color-fg)] leading-tight">
              {entry.display_name}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-[var(--color-fg-subtle)]">
              <time dateTime={entry.created_at}>
                {dateFormatter.format(new Date(entry.created_at))}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Type 2: Call to Action "Sign Guestbook" Card ---
export function SignGuestbookCard({ onOpenModal }: { onOpenModal: () => void }) {
  const uniqueId = useId();

  return (
    <div
      onClick={onOpenModal}
      className="group block w-72 lg:w-[360px] shrink-0 cursor-pointer rounded-2xl focus-ring transition-transform hover:-translate-y-1 duration-300"
    >
      <div className="relative flex h-[200px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg shadow-black/20 hover:border-[var(--color-border-strong)] transition-all">
        {/* Generative Variant 0 Background */}
        <CosmicArtwork variant={0} uniqueId={uniqueId} />

        {/* Scrim */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/85 via-[var(--color-background)]/50 to-[var(--color-background)]/30"
        />

        {/* Celestial Orbit Animation */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-2">
          <OrbitAnimation />
        </div>

        {/* Sign Button Bar with Diagonal Arrow Hover */}
        <div className="relative mt-auto flex h-14 items-center justify-center border-t border-[var(--color-border)]/60 bg-[var(--color-background)]/75 px-4 py-2.5 backdrop-blur-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--color-fg)] shadow-sm hover:border-[var(--color-border-strong)] transition-colors group-hover:bg-[var(--color-overlay)]">
            <span>Sign the guest book</span>
            <ArrowUpRight
              size={15}
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Interactive Modal for Signing the Guestbook ---
function GuestbookModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, message: string) => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(name.trim(), message.trim());
      setName("");
      setMessage("");
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-[var(--color-fg-muted)] hover:bg-[var(--color-overlay)] hover:text-[var(--color-fg)] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand)]/20 text-[var(--color-brand)]">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-[var(--color-fg)]">
              Leave a mark
            </h3>
            <p className="text-xs text-[var(--color-fg-subtle)]">
              Sign the celestial wall. Drop a hello or a thought.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-fg-muted)] mb-1.5">
              Your Name / Handle
            </label>
            <input
              type="text"
              required
              maxLength={40}
              placeholder="e.g. Elena Rostova"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[var(--color-fg-muted)]">
                Your Note
              </label>
              <span className="text-[11px] text-[var(--color-fg-faint)]">
                {message.length} / 180 chars
              </span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={180}
              placeholder="The cosmic theme is so calming..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[var(--color-fg-faint)] flex items-center gap-1.5">
              <Heart className="size-3 text-rose-500" /> Stardust wall
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-xs font-medium text-[var(--color-fg-muted)] hover:bg-[var(--color-overlay)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 active:scale-95 disabled:opacity-50 transition-all"
              >
                <span>{isSubmitting ? "Signing..." : "Sign Wall"}</span>
                <Send size={13} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main Guestbook Section Component ---
export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialGuestbookEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSignGuestbook = (name: string, message: string) => {
    const newEntry: GuestbookEntry = {
      id: `user-${Date.now()}`,
      display_name: name,
      message: message,
      created_at: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setToastMessage("✨ Your mark has been etched into the cosmos!");
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Build the list of cards for the marquee
  // Format: [SignGuestbookCard, Note 1, Note 2, Note 3, Note 4, SignGuestbookCard, Note 5...]
  const half = Math.ceil(entries.length / 2);
  const firstHalf = entries.slice(0, half);
  const secondHalf = entries.slice(half);

  const renderCardRow = (isDuplicate = false) => (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      <SignGuestbookCard onOpenModal={() => setIsModalOpen(true)} />
      {firstHalf.map((entry) => (
        <GuestNoteCard
          key={`${isDuplicate ? "dup-" : ""}${entry.id}`}
          entry={entry}
          onOpenModal={() => setIsModalOpen(true)}
        />
      ))}
      <SignGuestbookCard onOpenModal={() => setIsModalOpen(true)} />
      {secondHalf.map((entry) => (
        <GuestNoteCard
          key={`${isDuplicate ? "dup-" : ""}${entry.id}`}
          entry={entry}
          onOpenModal={() => setIsModalOpen(true)}
        />
      ))}
    </div>
  );

  return (
    <section id="guestbook" className="relative py-20 max-sm:scroll-mt-6 sm:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl sm:mb-10 text-left">
          <div className="flex items-center gap-4 sm:gap-5">
            <h2 className="font-sans font-bold text-title glow-heading -mb-[0.15em] w-fit pb-[0.15em] text-balance">
              Leave a mark
            </h2>
          </div>
          <div className="mt-4">
            <p className="text-body text-[var(--color-fg-subtle)]">
              Sign the wall just to say you were here. It does not have to be about work.
            </p>
          </div>
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 shadow-md animate-fade-in">
            {toastMessage}
          </div>
        )}

        {/* Infinite Horizontal Marquee Container */}
        <div className="group relative -mx-4 overflow-hidden pt-4 sm:-mx-6 sm:pt-6 lg:-mx-8">
          {/* Edge Fading Mask + Gradient Overlays for Smooth Entry/Exit */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent"
          />

          {/* Marquee Track with CSS mask-image and Pause on Hover */}
          <div className="marquee-mask w-full overflow-hidden">
            <div
              className="flex w-max animate-marquee items-center py-4 select-none group-hover:[animation-play-state:paused] active:[animation-play-state:paused]"
              style={{ animationDuration: "56s" }}
            >
              {/* Primary Sequence */}
              {renderCardRow(false)}

              {/* Duplicate Sequence for Seamless Infinite Loop */}
              <div aria-hidden="true">
                {renderCardRow(true)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Signing */}
      <GuestbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSignGuestbook}
      />
    </section>
  );
}

export default Guestbook;

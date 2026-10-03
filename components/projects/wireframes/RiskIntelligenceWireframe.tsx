"use client";

import React from "react";

export function RiskIntelligenceWireframe() {
  // 7 Network Node Coordinates (x, y percentages in SVG viewBox 0 0 300 160)
  const nodes = [
    { id: 1, cx: 45, cy: 35, r: 6, delay: "0s", label: "Hub A" },
    { id: 2, cx: 125, cy: 25, r: 5, delay: "0.4s", label: "Intel" },
    { id: 3, cx: 95, cy: 95, r: 7, delay: "0.8s", label: "Tier 1" },
    { id: 4, cx: 185, cy: 65, r: 8, delay: "1.2s", label: "Port R" },
    { id: 5, cx: 165, cy: 125, r: 5, delay: "1.6s", label: "TSMC" },
    { id: 6, cx: 255, cy: 45, r: 6, delay: "2.0s", label: "Semi B" },
    { id: 7, cx: 245, cy: 115, r: 5.5, delay: "2.4s", label: "Logistics" },
  ];

  const edges = [
    { x1: 45, y1: 35, x2: 125, y2: 25 },
    { x1: 45, y1: 35, x2: 95, y2: 95 },
    { x1: 125, y1: 25, x2: 185, y2: 65 },
    { x1: 95, y1: 95, x2: 185, y2: 65 },
    { x1: 95, y1: 95, x2: 165, y2: 125 },
    { x1: 185, y1: 65, x2: 255, y2: 45 },
    { x1: 185, y1: 65, x2: 245, y2: 115 },
    { x1: 165, y1: 125, x2: 245, y2: 115 },
  ];

  return (
    <div className="flex h-full flex-col justify-between p-3.5 select-none" aria-hidden="true">
      {/* Top Section: Sidebar + SVG Network Graph */}
      <div className="flex flex-1 gap-2.5 min-h-0">
        {/* Left Sidebar (25% width) with Supplier List */}
        <div className="w-1/4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 pb-1.5 border-b border-[var(--color-border)] mb-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
              Suppliers
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Intel Corp", status: "bg-emerald-400" },
              { name: "ABC Fab", status: "bg-cyan-400" },
              { name: "XYZ Logistics", status: "bg-emerald-400" },
              { name: "DEF Foundry", status: "bg-amber-400" },
            ].map((sup, idx) => (
              <div key={idx} className="flex items-center justify-between text-[8px] text-[var(--color-fg-muted)]">
                <span className="truncate">{sup.name}</span>
                <span className={`size-1 rounded-full ${sup.status} shrink-0`} />
              </div>
            ))}
          </div>
          <div className="h-1 w-full rounded bg-[var(--color-overlay)] mt-1" />
        </div>

        {/* Right Main Area: SVG Network Graph */}
        <div className="relative flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]/60 overflow-hidden flex items-center justify-center">
          {/* Subtle Grid background */}
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* SVG Vector Connections & 7 Glowing Nodes */}
          <svg className="w-full h-full" viewBox="0 0 300 160" fill="none">
            {/* Edges */}
            {edges.map((e, idx) => (
              <line
                key={idx}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--color-brand)"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            ))}

            {/* 7 Glowing Network Nodes with organic pulse */}
            {nodes.map((node) => (
              <g key={node.id}>
                {/* Outer Glow Halo */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * 1.8}
                  fill="var(--color-flare)"
                  fillOpacity="0.2"
                  className="animate-pulse"
                  style={{ animationDelay: node.delay, animationDuration: "3s" }}
                />
                {/* Solid Core Node */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="var(--color-surface)"
                  stroke="var(--color-flare)"
                  strokeWidth="1.5"
                />
                <circle cx={node.cx} cy={node.cy} r={node.r * 0.45} fill="var(--color-flare)" />
              </g>
            ))}
          </svg>

          {/* Radar Tag */}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-[var(--color-surface)]/90 px-1.5 py-0.5 border border-[var(--color-border)] text-[8px] text-emerald-400">
            <span className="size-1 rounded-full bg-emerald-400 animate-ping" />
            <span>Telemetry Online</span>
          </div>
        </div>
      </div>

      {/* Bottom 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-2 mt-2.5 h-[28%]">
        {[
          { label: "Overall Risk", val: "14.2", tone: "text-emerald-400", bar: "w-4/5 bg-emerald-400" },
          { label: "Network Active", val: "99.8%", tone: "text-[var(--color-flare)]", bar: "w-11/12 bg-[var(--color-flare)]" },
          { label: "Disruptions", val: "0", tone: "text-white", bar: "w-1/3 bg-[var(--color-brand)]" },
        ].map((m, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2"
          >
            <div className="text-[8px] text-[var(--color-fg-subtle)] uppercase tracking-wider">{m.label}</div>
            <div className={`text-xs font-bold font-mono ${m.tone}`}>{m.val}</div>
            <div className="h-1 w-full rounded-full bg-[var(--color-surface-deep)] overflow-hidden">
              <div className={`h-full rounded-full ${m.bar}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

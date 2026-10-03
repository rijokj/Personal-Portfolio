"use client";

import React from "react";

export function VideoEditorWireframe() {
  return (
    <div className="flex h-full flex-col justify-between p-3.5 select-none" aria-hidden="true">
      {/* Top Split: Video Player Preview (Left 70%) + Asset Panel (Right 30%) */}
      <div className="flex flex-1 gap-2.5 min-h-0">
        {/* Video Player Canvas with CSS Triangle Play Button */}
        <div className="relative flex-[2.2] rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden flex flex-col justify-between p-2">
          {/* Top timecode indicator */}
          <div className="flex items-center justify-between text-[8px] font-mono text-[var(--color-fg-subtle)]">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
              REC
            </span>
            <span>00:04:18:12</span>
          </div>

          {/* Centered CSS Triangle Play Button */}
          <div className="flex items-center justify-center">
            <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)]/80 border border-[var(--color-brand)] shadow-lg shadow-[var(--color-brand)]/20">
              {/* CSS Triangle */}
              <div className="ml-0.5 size-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-white" />
            </div>
          </div>

          {/* Player controls bar */}
          <div className="flex items-center justify-between text-[8px] text-[var(--color-fg-subtle)]">
            <div className="h-1 w-2/3 rounded-full bg-[var(--color-surface-deep)] overflow-hidden">
              <div className="h-full w-3/5 bg-[var(--color-flare)]" />
            </div>
            <span>4K 60fps</span>
          </div>
        </div>

        {/* Right Asset Panel */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2 flex flex-col justify-between">
          <div className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-fg-subtle)] border-b border-[var(--color-border)] pb-1 mb-1">
            Media Pool
          </div>
          <div className="space-y-1.5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-deep)]/60 p-1"
              >
                <div className="size-4 rounded bg-[var(--color-brand)]/30 shrink-0" />
                <div className="flex-1 space-y-0.5">
                  <div className="h-1 w-full rounded bg-[var(--color-overlay)]" />
                  <div className="h-0.5 w-1/2 rounded bg-[var(--color-overlay)]/60" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 w-3/4 rounded bg-[var(--color-overlay)] mt-1" />
        </div>
      </div>

      {/* Bottom Multi-Track Timeline with Playhead */}
      <div className="relative mt-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 space-y-1.5 overflow-hidden">
        {/* Scrubber Playhead Line positioned at ~65% */}
        <div
          className="absolute inset-y-0 left-[65%] w-px bg-[var(--color-flare)] z-20 pointer-events-none"
          style={{ boxShadow: "0 0 8px var(--color-flare)" }}
        >
          <div className="absolute -top-1 -left-1.5 size-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-[var(--color-flare)]" />
        </div>

        {/* Track 1: Video Blocks */}
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-[var(--color-fg-subtle)]">
          <span className="w-4 shrink-0 font-bold">V1</span>
          <div className="flex-1 flex gap-1 h-3.5 rounded bg-[var(--color-surface-deep)] p-0.5">
            <div className="w-1/4 rounded bg-[var(--color-brand)]/60 border border-[var(--color-brand)]/40" />
            <div className="w-2/5 rounded bg-[var(--color-accent)]/60 border border-[var(--color-accent)]/40" />
            <div className="w-1/3 rounded bg-[var(--color-brand)]/50 border border-[var(--color-brand)]/30" />
          </div>
        </div>

        {/* Track 2: Audio Waveform Blocks */}
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-[var(--color-fg-subtle)]">
          <span className="w-4 shrink-0 font-bold">A1</span>
          <div className="flex-1 flex gap-1 h-3.5 rounded bg-[var(--color-surface-deep)] p-0.5">
            <div className="w-1/2 rounded bg-[var(--color-flare)]/30 border border-[var(--color-flare)]/40 flex items-center justify-around px-1">
              {[40, 75, 100, 60, 90, 50, 80, 45].map((h, idx) => (
                <div key={idx} className="w-0.5 rounded-full bg-[var(--color-flare)]" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="w-1/2 rounded bg-[var(--color-flare)]/20 border border-[var(--color-flare)]/30 flex items-center justify-around px-1">
              {[60, 90, 40, 80, 100, 55, 70, 85].map((h, idx) => (
                <div key={idx} className="w-0.5 rounded-full bg-[var(--color-flare)]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

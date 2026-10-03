"use client";

import React from "react";

export function ColivWireframe() {
  return (
    <div className="flex h-full flex-col justify-between p-3.5 select-none" aria-hidden="true">
      {/* Mini App Navigation Bar */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-overlay)]/40 px-2.5 py-1.5">
        <div className="h-2.5 w-8 rounded-full bg-[var(--color-brand)]/60" />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-7 rounded-full bg-[var(--color-overlay)]" />
          <div className="h-1.5 w-7 rounded-full bg-[var(--color-overlay)]" />
          <div className="h-1.5 w-7 rounded-full bg-[var(--color-overlay)]" />
        </div>
        <div className="h-2.5 w-10 rounded-full bg-[var(--color-accent)]/40" />
      </div>

      {/* Large Hero Section */}
      <div className="my-2.5 flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-brand)]/20 via-transparent to-[var(--color-accent)]/10 p-3">
        <div className="h-2.5 w-1/2 rounded-full bg-[var(--color-overlay)]" />
        <div className="h-1.5 w-1/3 rounded-full bg-[var(--color-overlay)]" />
        <div className="mt-1 h-4 w-20 rounded-full bg-[var(--color-brand)]/40 border border-[var(--color-brand)]/30 flex items-center justify-center">
          <div className="h-1 w-10 rounded-full bg-white/70" />
        </div>
      </div>

      {/* 3-Column Listing Grid */}
      <div className="grid h-[34%] grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2"
          >
            <div className="relative flex-1 min-h-[36px] rounded bg-[var(--color-surface-deep)] overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand)]/20 to-transparent"
                style={{ opacity: 0.6 + i * 0.2 }}
              />
            </div>
            <div className="h-1.5 w-full rounded bg-[var(--color-overlay)]" />
            <div className="h-1 w-2/3 rounded bg-[var(--color-overlay)]/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Sparkles, Bot, User, TrendingUp } from "lucide-react";

export function AiCxWireframe() {
  const chartBars = [
    { height: "45%", label: "Mon", tone: "from-[var(--color-brand)] to-[var(--color-accent)]" },
    { height: "68%", label: "Tue", tone: "from-[var(--color-brand)] to-[var(--color-accent)]" },
    { height: "88%", label: "Wed", tone: "from-[var(--color-accent)] to-[var(--color-flare)]" },
    { height: "55%", label: "Thu", tone: "from-[var(--color-brand)] to-[var(--color-accent)]" },
    { height: "94%", label: "Fri", tone: "from-[var(--color-accent)] to-[var(--color-flare)]" },
    { height: "76%", label: "Sat", tone: "from-[var(--color-brand)] to-[var(--color-accent)]" },
    { height: "100%", label: "Sun", tone: "from-[var(--color-flare)] to-emerald-400" },
  ];

  return (
    <div className="flex h-full flex-col justify-between p-3.5 select-none" aria-hidden="true">
      {/* Top Split: Conversation Panel (Left 55%) + Analytics Histogram (Right 45%) */}
      <div className="flex flex-1 gap-2.5 min-h-0">
        {/* Left Side: Conversation Panel */}
        <div className="flex-[1.2] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 flex flex-col justify-between overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-[var(--color-flare)]/20 text-[var(--color-flare)]">
                <Sparkles className="size-2.5" />
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--color-fg-subtle)]">
                Live AI Stream
              </span>
            </div>
            <span className="text-[8px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
              Auto-Classifying
            </span>
          </div>

          {/* Conversation Chat Bubbles */}
          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {/* User Message */}
            <div className="flex items-start gap-1.5 self-start max-w-[90%]">
              <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--color-overlay)] text-[var(--color-fg-muted)] mt-0.5">
                <User className="size-2" />
              </span>
              <div className="rounded-lg rounded-tl-xs border border-[var(--color-border)] bg-[var(--color-overlay)]/60 px-2 py-1 text-[8.5px] text-[var(--color-fg-muted)] leading-tight">
                How smoothly did the onboarding flow feel for your team?
              </div>
            </div>

            {/* AI Response Message */}
            <div className="flex items-start gap-1.5 self-end max-w-[92%] flex-row-reverse">
              <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/30 text-[var(--color-flare)] mt-0.5">
                <Bot className="size-2" />
              </span>
              <div className="rounded-lg rounded-tr-xs border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/15 px-2 py-1 text-[8.5px] text-[var(--color-fg)] leading-tight">
                <div className="flex items-center gap-1 mb-0.5 text-[7.5px] font-mono text-[var(--color-flare)] font-bold">
                  <span>Sentiment: +0.94</span>
                  <span>•</span>
                  <span>Enterprise Cohort</span>
                </div>
                &ldquo;Seamless setup, resolved sync friction instantly.&rdquo;
              </div>
            </div>

            {/* Follow-up / Classification pill */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-deep)] px-2 py-0.5 text-[7.5px] text-[var(--color-fg-subtle)]">
                <TrendingUp className="size-2 text-[var(--color-accent)]" />
                <span>NPS impact tagged: Promoter (+9)</span>
              </div>
            </div>
          </div>

          {/* Micro Footer Input Bar */}
          <div className="mt-1.5 flex items-center justify-between rounded border border-[var(--color-border)] bg-[var(--color-surface-deep)] px-2 py-1">
            <span className="text-[8px] text-[var(--color-fg-subtle)]">AI generating contextual follow-up...</span>
            <span className="size-1.5 rounded-full bg-[var(--color-flare)] animate-ping" />
          </div>
        </div>

        {/* Right Side: Analytics Histogram / Bar Chart */}
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 flex flex-col justify-between overflow-hidden">
          {/* Chart Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-1.5 mb-2">
            <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--color-fg-subtle)]">
              Sentiment Distribution
            </span>
            <span className="text-[8px] font-mono font-bold text-[var(--color-flare)]">
              94.8% CSAT
            </span>
          </div>

          {/* Histogram Bars Canvas */}
          <div className="relative flex-1 flex items-end justify-between gap-1.5 px-1 py-1 rounded bg-[var(--color-background)]/60 border border-[var(--color-border)]">
            {/* Subtle Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-1.5 px-1 pointer-events-none opacity-20">
              <div className="border-b border-[var(--color-border-strong)] border-dashed w-full" />
              <div className="border-b border-[var(--color-border-strong)] border-dashed w-full" />
              <div className="border-b border-[var(--color-border-strong)] border-dashed w-full" />
            </div>

            {/* Vertical Bars */}
            {chartBars.map((bar, idx) => (
              <div key={idx} className="relative z-10 flex flex-1 flex-col items-center h-full justify-end group">
                <div
                  className={`w-full rounded-t bg-gradient-to-t ${bar.tone} transition-all duration-300 opacity-85 group-hover:opacity-100 shadow-xs`}
                  style={{ height: bar.height }}
                />
                <span className="mt-1 text-[7px] font-mono text-[var(--color-fg-subtle)]">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>

          {/* Metric Highlights */}
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[8px]">
            <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-deep)] p-1 text-center">
              <div className="text-[7px] text-[var(--color-fg-subtle)]">Confidence</div>
              <div className="font-mono font-bold text-emerald-400">98.2%</div>
            </div>
            <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface-deep)] p-1 text-center">
              <div className="text-[7px] text-[var(--color-fg-subtle)]">Responses</div>
              <div className="font-mono font-bold text-[var(--color-flare)]">2.8M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-2.5 flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-2.5 py-1.5 text-[8.5px] text-[var(--color-fg-subtle)]">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Realtime executive synthesis active
        </span>
        <span className="font-mono text-[var(--color-flare)]">Model: Gemini 1.5 Pro</span>
      </div>
    </div>
  );
}

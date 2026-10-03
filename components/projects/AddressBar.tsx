"use client";

import React from "react";

interface AddressBarProps {
  displayUrl: string;
  href?: string;
}

export function AddressBar({ displayUrl, href }: AddressBarProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/url relative flex h-9 lg:h-7 min-w-0 flex-1 items-center justify-between overflow-hidden rounded-full bg-[var(--color-overlay)] px-3 text-xs border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all"
        title={`Visit ${displayUrl}`}
      >
        {/* URL Text with Color Transition */}
        <span className="truncate text-[var(--color-fg-muted)] group-hover/url:text-[var(--color-accent)] transition-colors duration-200 font-mono text-[11px]">
          {displayUrl}
        </span>

        {/* External Link Arrow (M7 7h10v10, M7 17 17 7) with 2px shift */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3 shrink-0 text-[var(--color-fg-subtle)] group-hover/url:text-[var(--color-accent)] transition-all duration-200 group-hover/url:translate-x-0.5 group-hover/url:-translate-y-0.5 ml-2"
          aria-hidden="true"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>

        {/* Shimmer / Sheen Sweeping Effect */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover/url:translate-x-full duration-700 transition-transform bg-gradient-to-r from-transparent via-[var(--color-border-strong)]/40 to-transparent"
        />
      </a>
    );
  }

  // Internal private project: static address bar
  return (
    <div className="flex h-9 lg:h-7 min-w-0 flex-1 items-center rounded-full bg-[var(--color-overlay)] px-3 text-xs border border-[var(--color-border)]">
      <span className="truncate text-[var(--color-fg-subtle)] font-mono text-[11px]">
        {displayUrl}
      </span>
    </div>
  );
}

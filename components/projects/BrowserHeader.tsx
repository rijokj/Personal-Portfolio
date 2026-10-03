"use client";

import React from "react";
import { WindowControls } from "./WindowControls";
import { AddressBar } from "./AddressBar";

interface BrowserHeaderProps {
  displayUrl: string;
  href?: string;
}

export function BrowserHeader({ displayUrl, href }: BrowserHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3 bg-[var(--color-overlay)]/40">
      {/* 3 Muted Window Controls */}
      <WindowControls />

      {/* Flexible Stretch Address Bar */}
      <AddressBar displayUrl={displayUrl} href={href} />
    </div>
  );
}

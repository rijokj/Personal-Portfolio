"use client";

import React from "react";

export function WindowControls() {
  return (
    <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/50" />
      <span className="size-2.5 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/50" />
      <span className="size-2.5 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/50" />
    </div>
  );
}


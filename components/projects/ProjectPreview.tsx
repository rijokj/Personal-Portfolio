"use client";

import React from "react";
import { BrowserFrame } from "./BrowserFrame";
import { BrowserHeader } from "./BrowserHeader";
import { ColivWireframe } from "./wireframes/ColivWireframe";
import { RiskIntelligenceWireframe } from "./wireframes/RiskIntelligenceWireframe";
import { VideoEditorWireframe } from "./wireframes/VideoEditorWireframe";
import { AiCxWireframe } from "./wireframes/AiCxWireframe";
import { Project } from "@/data/portfolio";

export interface ProjectPreviewProps {
  displayUrl?: string;
  href?: string;
  wireframe?: string;
  project?: Project;
  className?: string;
  enableTilt?: boolean;
}

export function ProjectPreview({
  displayUrl,
  href,
  wireframe,
  project,
  className = "",
  enableTilt = true,
}: ProjectPreviewProps) {
  // Support either direct props or a project object
  const activeDisplayUrl = displayUrl ?? project?.displayUrl ?? "example.com";
  const activeHref = href !== undefined ? href : project?.href;
  const activeWireframe = wireframe ?? project?.wireframe ?? "dot-coliv";

  // Render the appropriate miniature abstract wireframe
  const renderWireframe = () => {
    switch (activeWireframe) {
      case "dot-coliv":
        return <ColivWireframe />;
      case "risk-intelligence":
        return <RiskIntelligenceWireframe />;
      case "media-library":
        return <VideoEditorWireframe />;
      case "ai-cx":
        return <AiCxWireframe />;
      default:
        return <ColivWireframe />;
    }
  };

  return (
    <BrowserFrame enableTilt={enableTilt} className={className}>
      {/* ─── Level 2 Interaction: Browser Header & Interactive Address Bar ─── */}
      <BrowserHeader displayUrl={activeDisplayUrl} href={activeHref} />

      {/* ─── Level 3 Interaction: Responsive 16:10 Canvas with Smooth Crossfade ─── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-background)]/50 select-none">
        <div
          key={activeWireframe}
          className="h-full w-full animate-in fade-in zoom-in-[0.98] duration-500 ease-out"
        >
          {renderWireframe()}
        </div>
      </div>
    </BrowserFrame>
  );
}

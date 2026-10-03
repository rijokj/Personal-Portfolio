"use client";

import React, { useState, useEffect, useRef } from "react";
import { projects } from "@/data/portfolio";
import { ProjectPreview } from "@/components/projects";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiRedux,
  SiThreedotjs,
  SiAngular,
  SiJest,
  SiSass,
  SiMapbox,
  SiMui,
  SiReactquery,
  SiZod,
} from "react-icons/si";
import { Layers, LineChart, AreaChart, Code2 } from "lucide-react";

function getTechBadgeIcon(tech: string) {
  switch (tech) {
    case "Next.js":
      return <SiNextdotjs className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-white" />;
    case "TypeScript":
      return <SiTypescript className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#3178c6]" />;
    case "Tailwind CSS":
      return <SiTailwindcss className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#06b6d4]" />;
    case "React":
      return <SiReact className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#61dafb]" />;
    case "Redux":
      return <SiRedux className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#764abc]" />;
    case "Three.js":
      return <SiThreedotjs className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-white" />;
    case "Angular":
      return <SiAngular className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#dd0031]" />;
    case "Jest":
      return <SiJest className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#c21325]" />;
    case "SCSS":
      return <SiSass className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#cf649a]" />;
    case "Mapbox":
      return <SiMapbox className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#4264fb]" />;
    case "Recharts":
      return <AreaChart className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#22c55e]" />;
    case "Material UI":
      return <SiMui className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#007fff]" />;
    case "TanStack Query":
      return <SiReactquery className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#ff4154]" />;
    case "Zustand":
      return <Layers className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#e0a050]" />;
    case "Zod":
      return <SiZod className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#3068b7]" />;
    case "shadcn/ui":
      return <Code2 className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-white" />;
    case "amCharts":
      return <LineChart className="size-3.5 shrink-0 text-fg-subtle transition-colors duration-300 group-hover:text-[#67b7dc]" />;
    default:
      return null;
  }
}

export function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [expandedBadges, setExpandedBadges] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  // ─── IntersectionObserver for active project detection ─────────────
  useEffect(() => {
    const cardElements = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (cardElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idxAttr = entry.target.getAttribute("data-index");
            if (idxAttr !== null) {
              const idx = parseInt(idxAttr, 10);
              if (!isNaN(idx)) {
                setActiveProjectIndex(idx);
              }
            }
          }
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    cardElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeProject = projects[activeProjectIndex] || projects[0];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 max-sm:scroll-mt-6 sm:py-32 lg:pb-0"
    >
      {/* Ambient Nebula Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 rounded-full blur-[110px] bg-accent/[0.07] size-[22rem] sm:size-[36rem] right-0 top-1/3 sm:-right-[10%]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header (No description paragraph, no quick links) ─── */}
        <div className="mb-8 max-w-3xl sm:mb-10">
          <h2 className="font-sans font-bold text-title glow-heading -mb-[0.15em] w-fit pb-[0.15em] text-balance">
            Things I&apos;ve built
          </h2>
        </div>

        {/* ─── Two-Column Grid: Sticky Left Stage + Scrolling Right Rail ─── */}
        <div className="project-rail grid lg:-mt-24 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          {/* ─── LEFT COLUMN: Sticky Centered Stage (Desktop) ─── */}
          <div className="hidden lg:sticky lg:top-[var(--project-rail-top)] lg:flex lg:h-[var(--project-stage)] lg:items-center">
            <div className="w-full relative">
              {/* Visually hidden accessibility announcement */}
              <div className="sr-only" aria-live="polite">
                Showing {activeProject.name}, project {activeProjectIndex + 1} of{" "}
                {projects.length}
              </div>

              {/* Stable Sticky Preview Container with 3D Tilt */}
              <ProjectPreview
                displayUrl={activeProject.displayUrl}
                href={activeProject.href}
                wireframe={activeProject.wireframe}
              />
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Minimalist Editorial Project Rail ─── */}
          <div>
            {projects.map((project, index) => {
              const isActive = activeProjectIndex === index;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  data-index={index}
                  className="flex flex-col justify-center py-10 max-lg:last:pb-0 lg:min-h-[var(--project-stage)] lg:py-0"
                >
                  <div
                    className="transition-opacity duration-500 ease-out"
                    style={{ opacity: isActive ? 1 : 0.3 }}
                  >
                    {/* Project Title */}
                    <h3 className="font-sans font-semibold text-heading text-fg">
                      {project.name}
                    </h3>

                    {/* Project Tagline/Description */}
                    <p className="text-body text-fg-subtle mt-4 max-w-md">
                      {project.tagline}
                    </p>

                    {/* ─── MOBILE: Render Browser Preview inline within each card ─── */}
                    <div className="mt-6 lg:hidden">
                      <ProjectPreview
                        displayUrl={project.displayUrl}
                        href={project.href}
                        wireframe={project.wireframe}
                        enableTilt={false}
                      />
                    </div>

                    {/* ─── Tech Stack Badges: Desktop shows all, Mobile shows first 3 + expand ─── */}
                    <div className="mt-6">
                      {/* MOBILE: First 3 badges + expand button */}
                      <div className="flex flex-wrap items-center gap-2 sm:hidden">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="group inline-flex items-center rounded-full border border-border bg-overlay backdrop-blur transition-all min-h-8 gap-2 px-3 py-1.5 text-label uppercase text-fg-muted"
                          >
                            {getTechBadgeIcon(tech)}
                            {tech}
                          </span>
                        ))}
                        {expandedBadges.has(project.id)
                          ? project.stack.slice(3).map((tech) => (
                              <span
                                key={tech}
                                className="group inline-flex items-center rounded-full border border-border bg-overlay backdrop-blur transition-all min-h-8 gap-2 px-3 py-1.5 text-label uppercase text-fg-muted"
                              >
                                {getTechBadgeIcon(tech)}
                                {tech}
                              </span>
                            ))
                          : project.stack.length > 3 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedBadges((prev) => {
                                    const next = new Set(prev);
                                    next.add(project.id);
                                    return next;
                                  })
                                }
                                className="inline-flex items-center rounded-full border border-border bg-overlay min-h-8 px-3 py-1.5 text-label text-fg-muted hover:text-fg hover:border-border-strong transition-all"
                              >
                                +{project.stack.length - 3}
                              </button>
                            )}
                      </div>

                      {/* TABLET+: All badges visible */}
                      <div className="hidden sm:flex flex-wrap items-center gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="group inline-flex items-center rounded-full border border-border bg-overlay backdrop-blur transition-all min-h-8 gap-2 px-3 py-1.5 text-label uppercase text-fg-muted hover:border-border-strong hover:text-fg"
                          >
                            {getTechBadgeIcon(tech)}
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

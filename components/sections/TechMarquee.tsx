"use client";

import React from "react";
import { techStack } from "@/data/portfolio";
import {
  SiReact,
  SiRedux,
  SiReactrouter,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiSocketdotio,
  SiChartdotjs,
  SiJest,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiJsonwebtokens,
  SiRazorpay,
  SiClaude,
} from "react-icons/si";
import { TbBrandCss3 } from "react-icons/tb";
import {
  Layers,
  LineChart,
  AreaChart,
  Zap,
  ShieldCheck,
  Code2,
} from "lucide-react";

function getTechIcon(name: string) {
  switch (name) {
    case "React":
      return <SiReact className="size-5 shrink-0" />;
    case "Redux Toolkit":
    case "Redux / Redux Thunk":
      return <SiRedux className="size-5 shrink-0" />;
    case "React Router":
      return <SiReactrouter className="size-5 shrink-0" />;
    case "JavaScript (ES6+)":
      return <SiJavascript className="size-5 shrink-0" />;
    case "TypeScript":
      return <SiTypescript className="size-5 shrink-0" />;
    case "HTML5":
      return <SiHtml5 className="size-5 shrink-0" />;
    case "CSS3":
      return <TbBrandCss3 className="size-5 shrink-0" />;
    case "Tailwind CSS":
      return <SiTailwindcss className="size-5 shrink-0" />;
    case "Bootstrap 5":
      return <SiBootstrap className="size-5 shrink-0" />;
    case "SCSS":
      return <SiSass className="size-5 shrink-0" />;
    case "Context API":
      return <Layers className="size-5 shrink-0" />;
    case "Socket.IO":
      return <SiSocketdotio className="size-5 shrink-0" />;
    case "Chart.js":
      return <SiChartdotjs className="size-5 shrink-0" />;
    case "Recharts":
      return <LineChart className="size-5 shrink-0" />;
    case "ApexCharts":
      return <AreaChart className="size-5 shrink-0" />;
    case "Jest":
      return <SiJest className="size-5 shrink-0" />;
    case "Node.js":
      return <SiNodedotjs className="size-5 shrink-0" />;
    case "Express.js":
      return <SiExpress className="size-5 shrink-0" />;
    case "MongoDB":
      return <SiMongodb className="size-5 shrink-0" />;
    case "PostgreSQL":
      return <SiPostgresql className="size-5 shrink-0" />;
    case "Prisma ORM":
      return <SiPrisma className="size-5 shrink-0" />;
    case "Redis":
      return <SiRedis className="size-5 shrink-0" />;
    case "BullMQ":
      return <Zap className="size-5 shrink-0" />;
    case "Docker":
      return <SiDocker className="size-5 shrink-0" />;
    case "Git":
      return <SiGit className="size-5 shrink-0" />;
    case "GitHub":
      return <SiGithub className="size-5 shrink-0" />;
    case "JWT Authentication":
      return <SiJsonwebtokens className="size-5 shrink-0" />;
    case "RBAC":
      return <ShieldCheck className="size-5 shrink-0" />;
    case "Razorpay":
      return <SiRazorpay className="size-5 shrink-0" />;
    case "Claude":
      return <SiClaude className="size-5 shrink-0" />;
    default:
      return <Code2 className="size-5 shrink-0" />;
  }
}

export function TechMarquee() {
  // Duplicate array to create a seamless infinite loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <section id="tech" aria-label="Technologies" className="relative full-bleed my-12 overflow-hidden border-y border-[var(--color-border)] py-4">
      {/* Left Gradient Edge Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[var(--color-background)] to-transparent"
      />

      {/* Right Gradient Edge Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[var(--color-background)] to-transparent"
      />

      {/* Scrolling Ticker Track */}
      <div className="flex w-max animate-marquee items-center">
        {duplicatedTech.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group flex shrink-0 items-center gap-3 border-r border-[var(--color-border)]/60 px-5 sm:px-7 transition-colors duration-300"
          >
            {/* Authentic Brand Icon */}
            <span
              className="flex items-center justify-center text-[var(--color-fg-subtle)] transition-all duration-300 group-hover:scale-110"
              style={{
                color: undefined,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
              }}
            >
              {getTechIcon(tech.name)}
            </span>

            {/* Tech Label */}
            <span
              className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--color-fg-muted)] transition-colors duration-300 group-hover:text-[var(--color-fg)] whitespace-nowrap"
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

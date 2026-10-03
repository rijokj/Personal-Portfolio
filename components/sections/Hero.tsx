"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Linkedin, Github, Instagram, Mail } from "lucide-react";
import { profile, greetings } from "@/data/portfolio";
import { HeroStarfield } from "@/components/atmospheric/HeroStarfield";
import { AuroraHorizon } from "@/components/atmospheric/AuroraHorizon";
import { MeteorShower } from "@/components/atmospheric/MeteorShower";
import { DaybreakClouds } from "@/components/atmospheric/DaybreakClouds";
import { DaybreakBirds } from "@/components/atmospheric/DaybreakBirds";
import { DaybreakSun } from "@/components/atmospheric/DaybreakSun";
import { ConstellationSphere } from "./ConstellationSphere";

export function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = greetings[greetingIndex].text;
    
    let timer: NodeJS.Timeout;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setGreetingIndex((prev) => (prev + 1) % greetings.length);
        }
      }, 50);
    } else {
      if (displayedText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, 100);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, greetingIndex]);

  return (
    <section
      id="intro"
      className="relative flex min-h-[95vh] items-center pt-28 pb-16 overflow-hidden"
    >
      {/* ──────────────────────────────────────────────────────
          GALAXY MODE: Starfield + aurora + meteors
          DAYBREAK MODE: Clouds + birds
          Controlled via CSS .galaxy-only / .daybreak-only for zero hydration flash
      ────────────────────────────────────────────────────── */}
      <HeroStarfield />
      <AuroraHorizon />
      <MeteorShower />
      <DaybreakClouds />
      <DaybreakBirds />

      {/* Subtle radial depth gradient behind hero content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background: "var(--hero-radial-bg)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 w-full">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-center gap-8 lg:gap-16">

          {/* ─── LEFT: Text ─── */}
          <div className="text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-overlay)] text-[11px] font-semibold text-[var(--color-fg-muted)] mb-4 shadow-xs backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for high-impact frontend roles</span>
            </div>

            {/* Greeting + Glowing Name */}
            <h1 className="font-bold tracking-tight leading-[1.1] mb-4">
              <span className="block font-normal text-[var(--color-fg)] text-lg sm:text-xl lg:text-2xl mb-1">
                <span className="inline-block">
                  {displayedText}
                </span>
                <span
                  aria-hidden="true"
                  className="animate-caret ml-1 inline-block h-[0.8em] w-[2px] rounded-full bg-[var(--color-accent)] align-baseline"
                />
                {", I'm"}
              </span>
              <span className="glow-text text-3.5xl sm:text-4.5xl lg:text-5xl text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem]">
                {profile.name}
              </span>
            </h1>

            {/* Creed */}
            <p className="max-w-lg text-sm sm:text-[15px] text-[var(--color-fg-subtle)] leading-relaxed mb-6 mx-auto lg:mx-0">
              {profile.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[var(--color-brand)]/20 transition-all hover:shadow-lg hover:shadow-[var(--color-brand)]/35 active:scale-[0.98]"
              >
                <span>See my work</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-flare)] to-[var(--color-brand)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="glass focus-ring inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--color-fg)] transition-all hover:border-[var(--color-border-strong)] active:scale-[0.98]"
              >
                Get in touch
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              {[
                { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: profile.github, label: "GitHub", Icon: Github },
                { href: profile.instagram, label: "Instagram", Icon: Instagram },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="glass flex size-9 items-center justify-center rounded-full text-[var(--color-fg-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-[var(--color-brand)] hover:border-[var(--color-border-strong)] shadow-xs"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Interactive Celestial Visual (Desktop only) ─── */}
          {/* Hidden on mobile/tablet — ambient glow is the atmosphere, not the 3D object */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* GALAXY: Interactive 3D Wireframe Constellation Sphere */}
            <div className="galaxy-only relative size-[20rem] xl:size-[22.5rem] flex items-center justify-center">
              <ConstellationSphere className="size-full" />
            </div>

            {/* DAYBREAK: SVG Sun with breathing halo + orbit rings */}
            <DaybreakSun className="size-96" />
          </div>
        </div>
      </div>
    </section>
  );
}

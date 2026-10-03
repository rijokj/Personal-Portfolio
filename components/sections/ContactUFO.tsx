"use client";

import React, { useRef, useState, useEffect } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";

// --- Cycling Sci-Fi Captions ---
const contactCaptions = [
  "Your message has been beamed aboard.",
  "Abduction successful. Reply inbound.",
  "Resistance is futile, I will get back to you.",
  "Message acquired. Probing not included.",
  "Beamed up, no roaming charges.",
];

// --- UFO Vessel SVG Illustration ---
function UfoVessel() {
  return (
    <svg aria-hidden="true" width="72" height="30" viewBox="0 0 72 30" fill="none">
      {/* UFO Disc Underbody */}
      <ellipse cx="36" cy="20" rx="34" ry="9" className="fill-[var(--color-brand)]" />
      <ellipse
        cx="36"
        cy="20"
        rx="34"
        ry="9"
        className="fill-[var(--color-accent)]"
        opacity="0.35"
      />

      {/* Cockpit Dome */}
      <path
        d="M20 16c2-9 10-14 16-14s14 5 16 14"
        className="stroke-[var(--color-fg-subtle)]"
        strokeWidth="2"
        fill="var(--color-surface)"
        fillOpacity="0.85"
      />

      {/* Blinking Saucer Perimeter Lights */}
      <circle cx="18" cy="21" r="2" className="fill-[var(--color-highlight)] animate-twinkle" />
      <circle
        cx="36"
        cy="24"
        r="2"
        className="fill-[var(--color-highlight)] animate-twinkle"
        style={{ animationDelay: "0.4s" }}
      />
      <circle
        cx="54"
        cy="21"
        r="2"
        className="fill-[var(--color-highlight)] animate-twinkle"
        style={{ animationDelay: "0.8s" }}
      />
    </svg>
  );
}

// --- Changing Captions Component ---
function CyclingCaptions({
  lines,
  intervalMs = 7000,
  active = true,
}: {
  lines: string[];
  intervalMs?: number;
  active?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [active, intervalMs, lines.length]);

  return (
    <p
      key={index}
      className="text-[11px] sm:text-xs text-[var(--color-fg-faint)] tracking-wide font-mono animate-rise"
    >
      {lines[index]}
    </p>
  );
}

// --- Interactive UFO & Email CTA Link ---
function ContactUfoLink({ email }: { email: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = linkRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={linkRef}
      href={`mailto:${email}?subject=Hello%20Rijo`}
      aria-label={`Email ${email}`}
      className="focus-ring group -my-2 flex w-full flex-col items-center gap-6 rounded-3xl px-4 py-2 transition-transform select-none cursor-pointer"
    >
      {/* UFO Abduction Canvas */}
      <div className="relative h-28 w-56 max-w-full">
        {/* Tractor Light Cone Beam */}
        <div
          aria-hidden="true"
          className="animate-ufo-beam absolute left-1/2 top-9 h-11 w-3 -translate-x-1/2 pointer-events-none"
          style={{
            clipPath: "polygon(45% 0%, 55% 0%, 88% 100%, 12% 100%)",
            transformOrigin: "top center",
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--color-shine) 55%, transparent), transparent)",
          }}
        />

        {/* Mail / Envelope Icon getting abducted */}
        <div className="animate-ufo-mail absolute bottom-3 left-1/2 -translate-x-1/2 text-[var(--color-fg-subtle)] pointer-events-none">
          <Mail size={18} />
        </div>

        {/* UFO Blurred Speed / Glow Trail Reflections */}
        <div
          aria-hidden="true"
          className="animate-ufo absolute left-1/2 top-2 -translate-x-1/2 pointer-events-none opacity-30"
          style={{ animationDelay: "0.12s", filter: "blur(2px)" }}
        >
          <svg aria-hidden="true" width="72" height="30" viewBox="0 0 72 30" fill="none">
            <ellipse cx="36" cy="20" rx="34" ry="9" className="fill-[var(--color-shine)]" />
          </svg>
        </div>
        <div
          aria-hidden="true"
          className="animate-ufo absolute left-1/2 top-2 -translate-x-1/2 pointer-events-none opacity-15"
          style={{ animationDelay: "0.26s", filter: "blur(4px)" }}
        >
          <svg aria-hidden="true" width="72" height="30" viewBox="0 0 72 30" fill="none">
            <ellipse cx="36" cy="20" rx="34" ry="9" className="fill-[var(--color-shine)]" />
          </svg>
        </div>

        {/* Main UFO Body */}
        <div className="animate-ufo absolute left-1/2 top-2 -translate-x-1/2 pointer-events-none">
          <UfoVessel />
        </div>
      </div>

      {/* Large Pill-Shaped Email Button with Sweeping Gradient */}
      <span className="focus-ring relative isolate inline-flex max-w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-shine)] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[var(--color-brand)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-brand)]/40 active:scale-95">
        <span className="truncate">{email}</span>
        <ArrowUpRight
          size={16}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />

        {/* Diagonal Sweeping Gradient Highlight on Hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-flare)] to-[var(--color-brand)] transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      </span>

      {/* Rotating Captions Area */}
      <div className="flex min-h-9 items-center justify-center">
        <CyclingCaptions lines={contactCaptions} intervalMs={7000} active={isInView} />
      </div>
    </a>
  );
}

// --- Main Contact UFO Section Component ---
export function ContactUFO() {
  return (
    <section id="contact" className="relative py-20 max-sm:scroll-mt-6 sm:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl sm:mb-10 text-left">
          <div className="flex items-center gap-4 sm:gap-5">
            <h2 className="font-sans font-bold text-title glow-heading -mb-[0.15em] w-fit pb-[0.15em] text-balance">
              Get in touch
            </h2>
          </div>
          <div className="mt-4">
            <p className="text-body text-[var(--color-fg-subtle)]">
              Always happy to chat about interesting problems, good interfaces, or opportunities worth exploring. Email me about work.
            </p>
          </div>
        </div>

        {/* UFO Abduction Canvas & Pill Email Link */}
        <div className="mx-auto flex max-w-xl justify-center pt-14 text-center sm:pt-20">
          <ContactUfoLink email={profile.email} />
        </div>
      </div>
    </section>
  );
}

export default ContactUFO;

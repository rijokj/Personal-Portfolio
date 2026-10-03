"use client";

import React from "react";
import { profile } from "@/data/portfolio";
import { ArrowUp, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12 pb-24 min-[992px]:pb-12 text-xs text-[var(--color-fg-subtle)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
          {/* Quick Nav Links */}
          <div className="flex items-center gap-6 font-medium">
            <a href="#experience" className="hover:text-[var(--color-fg)] transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-[var(--color-fg)] transition-colors">
              Projects
            </a>
            <a href="#testimonials" className="hover:text-[var(--color-fg)] transition-colors">
              Testimonials
            </a>
            <a href="#guestbook" className="hover:text-[var(--color-fg)] transition-colors">
              Guest book
            </a>
          </div>

          {/* Channels */}
          <div className="flex items-center gap-5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              Instagram
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Colophon & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <div>
            <p>
              © {new Date().getFullYear()} {profile.name}. Made with care in {profile.location.split(",")[1] || "Kerala"}.
            </p>
            <p className="text-[11px] text-[var(--color-fg-faint)] mt-1 flex items-center gap-1">
              <span>Built with Next.js, Tailwind, and a little stardust</span>
              <Sparkles className="size-3 text-[var(--color-highlight)] inline" />
            </p>
          </div>

          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Scroll back to top"
            className="glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--color-fg)] hover:border-[var(--color-border-strong)] transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

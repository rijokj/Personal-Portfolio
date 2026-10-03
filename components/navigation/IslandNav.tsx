"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  BookOpen,
  Quote,
  Trophy,
  Home,
  Briefcase,
  FolderGit2,
  Mail,
  Compass,
  X,
} from "lucide-react";
import { navLinks, moreLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";

export function IslandNav() {
  const [activeSection, setActiveSection] = useState("#intro");
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (window.scrollY < 200) {
          setActiveSection("#intro");
          return;
        }

        const scrollPosition = window.scrollY + window.innerHeight * 0.35;

        for (let i = navLinks.length - 1; i >= 0; i--) {
          const link = navLinks[i];
          const el = document.querySelector(link.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            if (scrollPosition >= top) {
              setActiveSection((prev) => (prev === link.href ? prev : link.href));
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = `/${href}`;
        return;
      }
      e.preventDefault();
      if (href === "#intro" || href === "#" || href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (mobileMoreRef.current && !mobileMoreRef.current.contains(e.target as Node)) {
        setMobileMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMoreIcon = (iconName: string) => {
    switch (iconName) {
      case "spade":
        return <Trophy className="size-4 text-[var(--color-brand)]" />;
      case "book":
        return <BookOpen className="size-4 text-[var(--color-accent)]" />;
      default:
        return <Quote className="size-4 text-[var(--color-flare)]" />;
    }
  };

  const getNavIcon = (href: string, isActive: boolean) => {
    const cls = `size-4 shrink-0 transition-transform duration-300 ${
      isActive ? "scale-110 text-[var(--color-brand)]" : "text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)]"
    }`;
    switch (href) {
      case "#intro":
        return <Home className={cls} />;
      case "#experience":
        return <Briefcase className={cls} />;
      case "#projects":
        return <FolderGit2 className={cls} />;
      case "#contact":
        return <Mail className={cls} />;
      default:
        return <Compass className={cls} />;
    }
  };

  return (
    <>
      {/* 1. DESKTOP FLOATING NAVIGATION HEADER (Screen width >= 992px) */}
      <header className="fixed inset-x-0 top-0 z-50 hidden py-5 transition-all duration-500 lg:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex justify-center">
            <div
              ref={moreRef}
              className="glass relative w-max rounded-full transition-all duration-300 shadow-2xl"
            >
              <div className="flex items-center justify-center px-6 py-1.5 gap-1">
                <nav className="relative flex items-center gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`focus-ring group relative inline-block rounded-full px-3 py-1.5 text-sm font-semibold transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      >
                        <span
                          className={`text-[var(--color-fg-muted)] transition-[color,opacity] duration-300 group-hover:text-[var(--color-fg)] group-focus-visible:text-[var(--color-fg)] ${
                            isActive ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`nav-link-active absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {link.label}
                        </span>
                      </a>
                    );
                  })}

                  {/* Desktop More Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setMoreOpen(!moreOpen)}
                      aria-expanded={moreOpen}
                      className="focus-ring relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
                    >
                      <span>More</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          moreOpen ? "rotate-180 text-[var(--color-brand)]" : ""
                        }`}
                      />
                    </button>

                    {/* Desktop More Menu */}
                    {moreOpen && (
                      <div className="glass absolute right-0 top-11 z-50 w-72 origin-top-right rounded-2xl p-3 shadow-2xl animate-rise">
                        <div className="space-y-1">
                          {moreLinks.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => {
                                setMoreOpen(false);
                                handleNavClick(e, item.href);
                              }}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--color-border)]"
                            >
                              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-overlay)] border border-[var(--color-border)]">
                                {getMoreIcon(item.icon)}
                              </span>
                              <div>
                                <span className="block text-xs font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-brand)] transition-colors">
                                  {item.label}
                                </span>
                                <span className="block text-[11px] text-[var(--color-fg-subtle)] leading-snug">
                                  {item.description}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-1 pl-1 border-l border-[var(--color-border)]">
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MOBILE & TABLET TOP BRAND & THEME BAR (< 992px) */}
      <header className="fixed inset-x-0 top-0 z-40 py-3 transition-all duration-500 lg:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <a
              href="#intro"
              onClick={(e) => handleNavClick(e, "#intro")}
              className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-lg"
            >
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-tight text-[var(--color-fg)]">
                {profile.name}
              </span>
            </a>
            <div className="glass rounded-full p-1 shadow-lg">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* 3. PROGRESSIVE FLOATING BOTTOM NAVBAR (< 992px) */}
      <div
        ref={mobileMoreRef}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md lg:hidden"
      >
        {/* Mobile "More" Popover Sheet */}
        {mobileMoreOpen && (
          <div className="glass absolute bottom-16 inset-x-0 mx-auto w-full max-w-sm origin-bottom rounded-2xl p-4 shadow-2xl animate-rise border border-[var(--color-border)] backdrop-blur-2xl bg-[var(--color-bg)]/90">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-border)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-fg-subtle)]">
                More Sections
              </span>
              <button
                onClick={() => setMobileMoreOpen(false)}
                className="p-1 text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] rounded-full"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-1">
              {moreLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMoreOpen(false);
                    handleNavClick(e, item.href);
                  }}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--color-border)]"
                >
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--color-overlay)] border border-[var(--color-border)]">
                    {getMoreIcon(item.icon)}
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-brand)] transition-colors">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-[var(--color-fg-subtle)] leading-snug">
                      {item.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Floating Progressive Bottom Nav Bar */}
        <nav className="glass flex items-center justify-between rounded-full p-1.5 shadow-2xl border border-[var(--color-border)] backdrop-blur-xl bg-[var(--color-bg)]/85">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href && !mobileMoreOpen;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMobileMoreOpen(false);
                  handleNavClick(e, link.href);
                }}
                className={`group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-overlay)] text-[var(--color-fg)] shadow-sm border border-[var(--color-brand)]/20 flex-1 justify-center max-w-[120px]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {getNavIcon(link.href, isActive)}
                {isActive && (
                  <span className="truncate animate-fadeIn font-bold text-[var(--color-brand)]">
                    {link.label}
                  </span>
                )}
              </a>
            );
          })}

          {/* More Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
            className={`group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 ${
              mobileMoreOpen
                ? "bg-[var(--color-overlay)] text-[var(--color-brand)] border border-[var(--color-brand)]/20 shadow-sm flex-1 justify-center max-w-[120px]"
                : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            }`}
            aria-label="More section options"
          >
            <Compass
              className={`size-4 shrink-0 transition-transform duration-300 ${
                mobileMoreOpen ? "rotate-90 text-[var(--color-brand)]" : "text-[var(--color-fg-muted)]"
              }`}
            />
            {mobileMoreOpen && (
              <span className="truncate animate-fadeIn font-bold text-[var(--color-brand)]">
                More
              </span>
            )}
          </button>
        </nav>
      </div>
    </>
  );
}


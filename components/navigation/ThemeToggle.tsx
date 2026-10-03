"use client";

import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, MoonStar } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"galaxy" | "daybreak">("galaxy");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "galaxy" | "daybreak" | null;
    const initial = saved || (document.documentElement.dataset.theme as "galaxy" | "daybreak") || "galaxy";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "galaxy" ? "daybreak" : "galaxy";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // View Transitions API circular ripple wipe from clicked button coordinates
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !prefersReduced
    ) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.style.setProperty("--wipe-x", `${x.toFixed(1)}px`);
      document.documentElement.style.setProperty("--wipe-y", `${y.toFixed(1)}px`);
      document.documentElement.style.setProperty("--wipe-r", `${maxRadius.toFixed(1)}px`);
      document.documentElement.setAttribute("data-theme-switching", "");

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
          document.documentElement.dataset.theme = nextTheme;
          localStorage.setItem("theme", nextTheme);
        });
      });

      transition.finished.finally(() => {
        document.documentElement.removeAttribute("data-theme-switching");
      });
    } else {
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("theme", nextTheme);
    }
  };

  if (!mounted) {
    return <div className="size-9 rounded-full" />;
  }

  const isDaybreak = theme === "daybreak";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring relative flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-overlay)] text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)] active:scale-95 cursor-pointer"
      aria-label={isDaybreak ? "Switch to Galaxy theme (Dark)" : "Switch to Daybreak theme (Light)"}
      title={isDaybreak ? "Galaxy theme" : "Daybreak theme"}
    >
      <span className="grid place-items-center">
        {/* Moon Icon for Galaxy */}
        <MoonStar
          className={`col-start-1 row-start-1 size-4 transition-all duration-500 ease-[var(--ease-out-expo)] ${
            isDaybreak ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-[var(--color-brand)]"
          }`}
        />
        {/* Sun Icon for Daybreak */}
        <Sun
          className={`col-start-1 row-start-1 size-4 transition-all duration-500 ease-[var(--ease-out-expo)] ${
            isDaybreak ? "rotate-0 scale-100 opacity-100 text-[var(--color-brand)]" : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;

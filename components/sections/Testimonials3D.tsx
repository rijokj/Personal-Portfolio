"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { testimonials, Testimonial } from "@/data/portfolio";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// ─── 3D Card Spatial Transform Geometry ──────────────────────────────
interface CardTransform {
  dim: number;
  transform: string;
  opacity: number;
  zIndex: number;
}

function getCardTransform(offset: number, isDesktop: boolean): CardTransform {
  const sign = Math.sign(offset);
  const abs = Math.abs(offset);

  if (abs === 0) {
    // Center Active Card
    return {
      dim: 0,
      transform: "translate3d(0%, 0, 0px) rotateY(0deg) scale(1)",
      opacity: 1,
      zIndex: 3,
    };
  }

  if (abs === 1) {
    // Adjacent Previous or Next Card
    return isDesktop
      ? {
          dim: 0.55,
          transform: `translate3d(${60 * sign}%, 0, -150px) rotateY(${26 * sign}deg) scale(0.9)`,
          opacity: 1,
          zIndex: 2,
        }
      : {
          dim: 0.68,
          transform: `translate3d(${94 * sign}%, 0, -90px) rotateY(${14 * sign}deg) scale(0.94)`,
          opacity: 1,
          zIndex: 2,
        };
  }

  // Cards further in the deck (overflow / hidden depth)
  return {
    dim: 0.8,
    transform: `translate3d(${sign * (isDesktop ? 96 : 150)}%, 0, -300px) rotateY(${30 * sign}deg) scale(0.82)`,
    opacity: 0,
    zIndex: 1,
  };
}

// ─── 10-Second Avatar Countdown Ring ─────────────────────────────────
function CountdownRing({
  paused = false,
  onDone,
  durationMs = 10000,
}: {
  paused?: boolean;
  onDone: () => void;
  durationMs?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="animate-testimonial-tick pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-accent"
      style={{
        animationDuration: `${durationMs}ms`,
        animationPlayState: paused ? "paused" : undefined,
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "testimonial-tick") {
          onDone();
        }
      }}
    />
  );
}

// ─── Custom Glowing Energy Rail with Comet & Seek ────────────────────
function QuoteRail({
  onSeek,
  atEnd,
}: {
  onSeek: (progress: number, smooth: boolean) => void;
  atEnd: boolean;
}) {
  const railRef = useRef<HTMLSpanElement>(null);
  const isDragging = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const seekFromClientY = (clientY: number, smooth: boolean) => {
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect || rect.height === 0) return;
    const progress = (clientY - rect.top) / rect.height;
    onSeek(progress, smooth);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      e.stopPropagation();
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      isDragging.current = false;
      setGrabbing(false);
    }
  };

  return (
    <span
      ref={railRef}
      aria-hidden="true"
      onPointerDown={(e) => {
        if (e.button === 0) {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.setPointerCapture(e.pointerId);
          isDragging.current = true;
          setGrabbing(true);
          seekFromClientY(e.clientY, true);
        }
      }}
      onPointerMove={(e) => {
        if (isDragging.current) {
          e.stopPropagation();
          seekFromClientY(e.clientY, false);
        }
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`absolute inset-y-0 right-0 w-4 touch-none ${
        atEnd ? "quote-rail-end" : ""
      } ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
    >
      {/* Background Subtle Meridian */}
      <span className="quote-meridian" />

      {/* Lit Active Energy Meridian */}
      <span className="quote-lit">
        <span className="quote-meridian quote-meridian-on" />
      </span>

      {/* Luminous Glowing Comet with Radiant Tail */}
      <span className="quote-comet" />
    </span>
  );
}

// ─── Single Testimonial Card ─────────────────────────────────────────
interface TestimonialCardProps {
  testimonial: Testimonial;
  active: boolean;
  dim: number;
  ticking: boolean;
  onTickDone: () => void;
  onQuoteScrollActivity: (isScrolling: boolean) => void;
}

function TestimonialCard({
  testimonial,
  active,
  dim,
  ticking,
  onTickDone,
  onQuoteScrollActivity,
}: TestimonialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLQuoteElement>(null);
  const [scrollState, setScrollState] = useState({
    overflowing: false,
    atStart: true,
    atEnd: true,
  });

  // Track quote internal scroll to position comet and trigger edge mask fades
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollTimeout: NodeJS.Timeout;
    let isActivelyScrolling = false;

    const calculateRead = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 1) {
        containerRef.current?.style.setProperty("--read", "0");
        setScrollState({ overflowing: false, atStart: true, atEnd: true });
        return;
      }

      const atEnd = el.scrollTop >= maxScroll - 1;
      const progress = atEnd
        ? 1
        : Math.min(1, Math.max(0, el.scrollTop / maxScroll));

      containerRef.current?.style.setProperty("--read", progress.toFixed(4));
      setScrollState({
        overflowing: true,
        atStart: el.scrollTop <= 1,
        atEnd,
      });
    };

    const handleScroll = () => {
      calculateRead();
      if (!isActivelyScrolling) {
        isActivelyScrolling = true;
        onQuoteScrollActivity(true);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isActivelyScrolling = false;
        onQuoteScrollActivity(false);
      }, 1500);
    };

    calculateRead();
    const ro = new ResizeObserver(calculateRead);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      if (isActivelyScrolling) {
        onQuoteScrollActivity(false);
      }
    };
  }, [onQuoteScrollActivity]);

  const handleSeek = useCallback((progress: number, smooth: boolean) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;
    const target = Math.min(1, Math.max(0, progress)) * maxScroll;
    if (smooth) {
      el.scrollTo({ top: target, behavior: "smooth" });
    } else {
      el.scrollTop = target;
    }
  }, []);

  return (
    <figure
      className={`glass bg-[var(--color-surface)] overflow-hidden relative flex h-[360px] sm:h-[400px] flex-col gap-6 rounded-3xl p-6 sm:p-8 transition-[border-color,box-shadow] duration-500 border ${
        active
          ? "shadow-2xl shadow-brand/20 border-border-strong"
          : dim < 0.8
          ? "shadow-xl shadow-brand/10 border-border"
          : "border-border"
      }`}
    >
      {/* ─── Card Header: Avatar with Countdown Ring, Info, Quote Icon ─── */}
      <figcaption className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar with Circular Countdown Ring */}
          <div className="relative grid size-11 shrink-0 place-items-center">
            {/* Avatar Pill */}
            <div className="size-9 rounded-full bg-overlay border border-border flex items-center justify-center font-bold text-caption text-fg select-none">
              {testimonial.initial || testimonial.author[0]}
            </div>

            {/* Circular Progress Ring */}
            {ticking && (
              <CountdownRing
                onDone={onTickDone}
                durationMs={10000}
              />
            )}
          </div>

          {/* Author Name and Role */}
          <div className="min-w-0">
            <span className="block truncate text-small font-medium text-fg">
              {testimonial.author}
            </span>
            <span className="mt-0.5 block truncate text-caption text-fg-muted">
              {testimonial.role}
            </span>
          </div>
        </div>

        {/* Decorative Quote Icon */}
        <Quote
          aria-hidden="true"
          strokeWidth={1.5}
          className="hidden size-7 shrink-0 text-fg-faint sm:block"
        />
      </figcaption>

      {/* ─── Card Body: Quote with Custom Rail and Mask Fades ─── */}
      <div ref={containerRef} className="relative min-h-0 flex-1">
        <blockquote
          ref={scrollRef}
          tabIndex={active ? 0 : -1}
          className={`peer scrollbar-hidden quote-scroll h-full space-y-4 overflow-y-auto overscroll-contain pr-6 text-body font-medium text-fg focus-visible:outline-none ${
            scrollState.overflowing && !scrollState.atStart ? "quote-fade-top" : ""
          } ${
            scrollState.overflowing && !scrollState.atEnd ? "quote-fade-bottom" : ""
          }`}
        >
          {testimonial.quote.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </blockquote>

        {/* Accessible Focus Ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 hidden rounded-xl outline-2 outline-accent peer-focus-visible:block"
        />

        {/* Custom Glowing Energy Rail with Comet */}
        {scrollState.overflowing && (
          <QuoteRail onSeek={handleSeek} atEnd={scrollState.atEnd} />
        )}
      </div>

      {/* ─── Glowing Top Accent Line (Active) & Background Dim Overlay ─── */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500 ${
          active ? "opacity-70" : "opacity-0"
        }`}
      />
      <span
        aria-hidden="true"
        style={{ opacity: dim }}
        className="pointer-events-none absolute -inset-px rounded-3xl bg-background transition-opacity duration-500"
      />
    </figure>
  );
}

// ─── Main 3D Testimonials Section ────────────────────────────────────
export function Testimonials3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [tickKey, setTickKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pauseReasonsRef = useRef<Set<string>>(new Set());
  const activeCardWrapperRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Update paused state and sync data-paused attribute for CSS animation freeze
  const setPauseReason = useCallback((reason: string, active: boolean) => {
    const reasons = pauseReasonsRef.current;
    if (active) {
      reasons.add(reason);
    } else {
      reasons.delete(reason);
    }
    const paused = reasons.size > 0;
    setIsPaused(paused);
    containerRef.current?.toggleAttribute("data-paused", paused);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setTickKey((prev) => prev + 1);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTickKey((prev) => prev + 1);
  }, [total]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setTickKey((prev) => prev + 1);
    },
    []
  );

  // ─── Drag Gesture with Pointer Capture and Velocity Flick ───────────
  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    claimed: boolean;
    dead: boolean;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastTime: e.timeStamp,
      velocity: 0,
      claimed: false,
      dead: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state || state.dead || state.id !== e.pointerId) return;

    const deltaX = e.clientX - state.startX;
    const deltaY = e.clientY - state.startY;

    if (!state.claimed) {
      // Natural vertical scroll: release claim
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        state.dead = true;
        return;
      }
      if (Math.abs(deltaX) < 8) return;

      // Claim pointer drag
      state.claimed = true;
      e.currentTarget.setPointerCapture(state.id);
      setPauseReason("drag", true);

      if (activeCardWrapperRef.current) {
        activeCardWrapperRef.current.style.transition = "";
        activeCardWrapperRef.current.style.userSelect = "none";
      }
      window.getSelection()?.removeAllRanges();
    }

    const dt = e.timeStamp - state.lastTime;
    if (dt > 0) {
      state.velocity = ((e.clientX - state.lastX) / dt) * 1000;
      state.lastX = e.clientX;
      state.lastTime = e.timeStamp;
    }

    // Soft follow with resistance
    if (activeCardWrapperRef.current) {
      const followX = Math.sign(deltaX) * Math.pow(Math.abs(deltaX), 0.85);
      activeCardWrapperRef.current.style.transform = `translate3d(${followX}px, 0, 0)`;
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    dragRef.current = null;
    if (!state || !state.claimed) return;

    if (e.currentTarget.hasPointerCapture(state.id)) {
      e.currentTarget.releasePointerCapture(state.id);
    }
    setPauseReason("drag", false);

    if (activeCardWrapperRef.current) {
      activeCardWrapperRef.current.style.userSelect = "";
      activeCardWrapperRef.current.style.transition =
        "transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)";
      activeCardWrapperRef.current.style.transform = "";
    }

    const deltaX = e.clientX - state.startX;
    const isQuickFlick = e.timeStamp - state.lastTime < 120;
    const velocity = isQuickFlick ? state.velocity : 0;

    if (deltaX > 80 || velocity > 400) {
      handlePrev();
    } else if (deltaX < -80 || velocity < -400) {
      handleNext();
    }
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-32 overflow-hidden"
    >
      {/* Ambient Aurora Tone Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 rounded-full blur-[120px] bg-brand/[0.08] size-[24rem] sm:size-[40rem] left-0 top-1/3 sm:-left-[10%]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <h2 className="font-sans font-bold text-title glow-heading -mb-[0.15em] w-fit pb-[0.15em] text-balance">
            Don&apos;t take my word for it
          </h2>
          <p className="mt-3 text-body text-[var(--color-fg-subtle)] max-w-xl">
            Feedback and recommendations from tech leads and engineering directors I&apos;ve worked with.
          </p>
        </div>

        {/* ─── 3D Card Deck Carousel ─────────────────────────────────── */}
        <div
          ref={containerRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              handleNext();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              handlePrev();
            }
          }}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setPauseReason("hover", true);
          }}
          onPointerLeave={() => setPauseReason("hover", false)}
          onFocus={() => setPauseReason("focus", true)}
          onBlur={() => setPauseReason("focus", false)}
          className="relative focus-ring outline-none"
        >
          {/* Spatial 3D Perspective Grid Stage */}
          <div className="relative grid rounded-3xl [perspective:1600px] select-none py-6 sm:py-10">
            {testimonials.map((item, index) => {
              // Calculate circular offset relative to active card
              let offset = (index - activeIndex + total) % total;
              if (2 * offset > total) offset -= total;

              const isActive = offset === 0;
              const isNearby = Math.abs(offset) <= 1;
              const { dim, transform, opacity, zIndex } = getCardTransform(
                offset,
                isDesktop
              );

              return (
                <div
                  key={item.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                  aria-hidden={!isActive}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition:
                      "transform 0.62s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.62s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                  className={`relative col-start-1 row-start-1 mx-auto w-[calc(100%-2.5rem)] sm:w-[26rem] lg:w-[28rem] xl:w-[32rem] ${
                    isActive ? "cursor-grab active:cursor-grabbing" : ""
                  } ${!(isActive || isNearby) ? "pointer-events-none" : ""}`}
                >
                  <div
                    ref={isActive ? activeCardWrapperRef : undefined}
                    onPointerDown={isActive ? handlePointerDown : undefined}
                    onPointerMove={isActive ? handlePointerMove : undefined}
                    onPointerUp={isActive ? handlePointerEnd : undefined}
                    onPointerCancel={isActive ? handlePointerEnd : undefined}
                    className={`relative ${isActive ? "touch-pan-y" : ""}`}
                  >
                    <TestimonialCard
                      key={`${item.id}-${isActive ? tickKey : 0}`}
                      testimonial={item}
                      active={isActive}
                      dim={dim}
                      ticking={isActive && !isPaused}
                      onTickDone={handleNext}
                      onQuoteScrollActivity={(scrolling) =>
                        setPauseReason("quoteScroll", scrolling)
                      }
                    />

                    {/* Click nearby adjacent card to bring it to center */}
                    {!isActive && isNearby && (
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => handleSelect(index)}
                        className="absolute inset-0 cursor-pointer rounded-3xl"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Bottom Navigation Controls: Arrows + Glowing Dots ─────── */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Previous Card Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="hidden lg:inline-flex size-9 items-center justify-center rounded-full border border-border bg-overlay text-fg-muted hover:border-border-strong hover:text-fg transition-all duration-200"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Dynamic Pill Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={activeIndex === i}
                  className="focus-ring -my-3 flex h-11 items-center justify-center px-1.5"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === i
                        ? "w-6 bg-gradient-to-r from-brand to-shine"
                        : "w-1.5 bg-border hover:bg-border-strong"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next Card Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="hidden lg:inline-flex size-9 items-center justify-center rounded-full border border-border bg-overlay text-fg-muted hover:border-border-strong hover:text-fg transition-all duration-200"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// ─── MODULE-LEVEL CONSTANTS ──────────────────────────────────────────────────
const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508790762848-8a3096277c8f?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1677137262472-f17cbb543de5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const N = SLIDES.length;
// Duration of the column slide transition in ms
const TRANSITION_MS = 900;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
// Returns a CSS translateY string for a column at a given slide index.
// Even columns stack [slide0→slideN-1] top-to-bottom and move UP when going forward.
// Odd  columns stack [slideN-1→slide0] top-to-bottom and move DOWN when going forward.
// Using vh units avoids dependency on window.innerHeight in the initial render.
function getTranslateY(colIndex: number, slideIndex: number): string {
  const isEven = colIndex % 2 === 0;
  const vh = isEven
    ? -slideIndex * 100          // moves up  (translateY decreases)
    : -(N - 1 - slideIndex) * 100; // moves down (translateY increases)
  return `translateY(${vh}vh)`;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cols, setCols] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // DOM refs for column inner containers — animated via CSS transition (no React re-render)
  const colInnerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // Stable refs for event handlers (avoids stale closure issues)
  const isAnimatingRef = useRef(false);
  const currentSlideRef = useRef(0);
  const colsRef = useRef(3);
  const scrollRafRef = useRef<number>(0);

  // Touch tracking
  const touchStartYRef = useRef<number | null>(null);

  // ── Mount ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Layout detection — single setState to avoid double re-render ───────────
  useEffect(() => {
    if (!mounted) return;
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCols(mobile ? 1 : 3);
      colsRef.current = mobile ? 1 : 3;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mounted]);

  // ── Navigate to a specific slide ───────────────────────────────────────────
  const goToSlide = useCallback(
    (targetSlide: number) => {
      if (isAnimatingRef.current) return;
      if (targetSlide < 0 || targetSlide >= N) return;
      if (targetSlide === currentSlideRef.current) return;
      if (!containerRef.current) return;

      isAnimatingRef.current = true;
      currentSlideRef.current = targetSlide;
      setCurrentSlide(targetSlide);

      // — Animate all column inner containers via CSS transition
      const numCols = colsRef.current;
      for (let i = 0; i < numCols; i++) {
        const el = colInnerRefs.current[i];
        if (!el) continue;
        el.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`;
        el.style.transform = getTranslateY(i, targetSlide);
      }

      // — Sync page scroll position with the target slide.
      // Each slide occupies one viewport height (100vh) within the section.
      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const vh = window.innerHeight;
      const targetY = sectionTop + targetSlide * vh;
      const startY = window.scrollY;
      const diff = targetY - startY;
      const t0 = performance.now();

      cancelAnimationFrame(scrollRafRef.current);
      const scrollStep = (now: number) => {
        const ratio = Math.min((now - t0) / TRANSITION_MS, 1);
        // cubic easeInOut — matches column animation curve
        const ease =
          ratio < 0.5
            ? 4 * ratio ** 3
            : 1 - Math.pow(-2 * ratio + 2, 3) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (ratio < 1) {
          scrollRafRef.current = requestAnimationFrame(scrollStep);
        }
      };
      scrollRafRef.current = requestAnimationFrame(scrollStep);

      // Release animation lock after transition completes
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, TRANSITION_MS + 60);
    },
    []
  );

  // ── Wheel event — intercept when section is the active sticky viewport ─────
  // When the user scrolls down: go to next slide (preventDefault).
  // When at the last slide and scrolling down: release (let page scroll past).
  // Same logic for scrolling up / first slide.
  useEffect(() => {
    if (!mounted) return;

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Section is in "sticky mode" when its top is flush with the viewport top
      // and it still covers the full viewport height
      const isSticky =
        rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
      if (!isSticky) return;

      const slide = currentSlideRef.current;

      if (e.deltaY > 0 && slide < N - 1) {
        // Forward — not at last slide
        e.preventDefault();
        goToSlide(slide + 1);
      } else if (e.deltaY < 0 && slide > 0) {
        // Backward — not at first slide
        e.preventDefault();
        goToSlide(slide - 1);
      }
      // At boundary slides: do NOT preventDefault → page scrolls past naturally
    };

    // Must be non-passive to call preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [mounted, goToSlide]);

  // ── Touch events ───────────────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const delta = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;
      if (Math.abs(delta) < 40) return; // ignore tiny swipes

      const slide = currentSlideRef.current;
      if (delta > 0 && slide < N - 1) goToSlide(slide + 1);
      else if (delta < 0 && slide > 0) goToSlide(slide - 1);
    },
    [goToSlide]
  );

  // ── SSR placeholder ────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <section
        className="relative w-full bg-bg-dark"
        style={{ height: `${N * 100}vh` }}
      />
    );
  }

  // ── Derived display values (from discrete currentSlide state) ─────────────
  const overlayOpacity = currentSlide === N - 1 ? 0.75 : 0.45;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-dark"
      // Section height = N viewports worth of scroll room (N * 100vh)
      style={{ height: `${N * 100}vh` }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ─── SLICED COLUMNS ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex pointer-events-none z-0">
          {Array.from({ length: cols }).map((_, colIndex) => {
            const isEven = colIndex % 2 === 0;
            // Even columns: slides stacked top→bottom [0, 1, 2, …]
            // Odd  columns: slides stacked top→bottom [N-1, …, 1, 0] (reversed)
            // This gives alternating movement directions during transitions.
            const orderedSlides = isEven ? SLIDES : [...SLIDES].reverse();

            return (
              <div
                key={colIndex}
                className="h-full relative overflow-hidden flex-1"
                style={{
                  // Overlap adjacent columns by 1.5px to prevent subpixel gap rendering
                  width: `calc(${100 / cols}% + 1.5px)`,
                  marginLeft: colIndex === 0 ? "0" : "-1px",
                }}
              >
                {/* Column inner — animated via CSS transition, not React re-renders */}
                <div
                  ref={(el) => {
                    colInnerRefs.current[colIndex] = el;
                  }}
                  className="flex flex-col"
                  style={{
                    // N stacked slots, each 100vh tall
                    height: `${N * 100}vh`,
                    willChange: "transform",
                    // Initial position for slide 0 (no transition on initial render)
                    transform: getTranslateY(colIndex, 0),
                  }}
                >
                  {orderedSlides.map((slide, si) => (
                    <div
                      key={si}
                      className="relative overflow-hidden shrink-0"
                      style={{ height: "100vh", width: "100%" }}
                    >
                      <img
                        src={slide.image}
                        alt={`Slide ${si}`}
                        draggable={false}
                        className="absolute top-0 max-w-none h-full object-cover pointer-events-none select-none"
                        style={{
                          // Span the full viewport width across all columns
                          width: `${cols * 100}%`,
                          // Offset horizontally so each column shows its own slice
                          left: `${-100 * colIndex}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── CINEMATIC DARK OVERLAY ──────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-[#2F343A] z-10 pointer-events-none transition-opacity duration-700"
          style={{ opacity: overlayOpacity }}
        />

        {/* ─── TEXT 0: MISSION (visible on slide 0) ────────────────────────── */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-700"
          style={{
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            opacity: currentSlide === 0 ? 1 : 0,
            transform:
              currentSlide === 0
                ? "translateY(0px)"
                : currentSlide > 0
                  ? "translateY(-30px)"
                  : "translateY(30px)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "#F08A1D",
              }}
            >
              Наша миссия
            </span>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
                color: "#F5F1EC",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Трансформировать передовые мировые инновации в энергетическую
              независимость и экономическую прочность Кыргызской Республики,
              делая ставку на доступность, неисчерпаемость и экологичность
              солнечной энергии.
            </p>
            <div
              style={{
                marginTop: "2rem",
                width: "4rem",
                height: "2px",
                background: "linear-gradient(to right, transparent, #F08A1D, transparent)",
              }}
            />
          </div>
        </div>

        {/* ─── TEXT 1: STRATEGIC GOAL (visible on slide 1) ─────────────────── */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-700"
          style={{
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            opacity: currentSlide === 1 ? 1 : 0,
            transform:
              currentSlide === 1
                ? "translateY(0px)"
                : currentSlide > 1
                  ? "translateY(-30px)"
                  : "translateY(30px)",
          }}
        >
          <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "#F08A1D",
              }}
            >
              Стратегическая цель
            </span>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
                color: "#F5F1EC",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Развитие высокотехнологичной зеленой энергетики в Кыргызской
              Республике через строительство современных СЭС, обеспечивая
              экономику региона экологически чистой и неисчерпаемой энергией.
            </p>
            <div
              style={{
                marginTop: "2rem",
                width: "4rem",
                height: "2px",
                background: "linear-gradient(to right, transparent, #F08A1D, transparent)",
              }}
            />
          </div>
        </div>

        {/* ─── TEXT 2: PROJECT ORTOK — metrics (visible on slide 2) ─────────── */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-700"
          style={{
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            opacity: currentSlide === 2 ? 1 : 0,
            transform:
              currentSlide === 2 ? "translateY(0px)" : "translateY(30px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "80rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(2rem, 5vh, 4rem)",
            }}
          >
            <h2
              className="text-white"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3.75rem)",
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.15,
                maxWidth: "56rem",
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              Проектирование, строительство и запуск СЭС в селе Орток
            </h2>

            <div
              style={{
                width: "100%",
                paddingTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 0,
                position: "relative",
              }}
            >
              {/* Connecting line between metric dots */}
              <div
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "calc(100% / 6)",
                  right: "calc(100% / 6)",
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              {[
                {
                  value: "325",
                  unit: "МВт",
                  label: "Мощность солнечной электростанции",
                },
                { value: "с. Орток", label: "Место строительства" },
                { value: "Нарын", label: "Кочкорский район" },
              ].map((metric, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    position: "relative",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 4.5rem)",
                      fontWeight: 300,
                      color: "white",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    {metric.value}{" "}
                    {metric.unit && (
                      <span
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1.875rem)",
                          marginLeft: "0.25rem",
                        }}
                      >
                        {metric.unit}
                      </span>
                    )}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.6rem, 1vw, 1rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.8)",
                      lineHeight: "1.2",
                      textAlign: "center",
                    }}
                  >
                    {metric.label}
                  </p>
                  {/* Decorative dot on the connecting line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "white",
                      zIndex: 2,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── VERTICAL MINIMALIST NAVIGATION ARROWS (Right side) ─────────── */}
        {!isMobile && (
          <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30 pointer-events-auto">
            {/* Up Arrow */}
            <button
              onClick={() =>
                currentSlide > 0 && goToSlide(currentSlide - 1)
              }
              disabled={currentSlide === 0}
              className="text-[#F5F1EC] hover:text-[#F08A1D] transition-colors duration-300 disabled:opacity-20 cursor-pointer p-2 flex items-center justify-center"
              aria-label="Предыдущий слайд"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-10 md:w-8 md:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20V4M7 9l5-5"
                />
              </svg>
            </button>

            {/* Down Arrow */}
            <button
              onClick={() =>
                currentSlide < N - 1 && goToSlide(currentSlide + 1)
              }
              disabled={currentSlide === N - 1}
              className="text-[#F5F1EC] hover:text-[#F08A1D] transition-colors duration-300 disabled:opacity-20 cursor-pointer p-2 flex items-center justify-center"
              aria-label="Следующий слайд"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-10 md:w-8 md:h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16M7 15l5 5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

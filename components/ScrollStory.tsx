"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// ─── INTERPOLATION HELPER ─────────────────────────────────
function lerp(stops: [number, number][], p: number): number {
  if (p <= stops[0][0]) return stops[0][1];
  if (p >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (p >= stops[i][0] && p <= stops[i + 1][0]) {
      const t = (p - stops[i][0]) / (stops[i + 1][0] - stops[i][0]);
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return stops[i][1] + (stops[i + 1][1] - stops[i][1]) * easedT;
    }
  }
  return stops[stops.length - 1][1];
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const animateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mounted]);

  // Calculate raw scroll progress
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrolled = -rect.top;
    const totalScrollable = containerHeight - viewportHeight;
    const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
    targetProgressRef.current = p;
  }, []);

  // rAF-based smooth interpolation toward target progress
  useEffect(() => {
    if (!mounted) return;

    const animate = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        const next = current + diff * 0.1;
        currentProgressRef.current = next;
        setProgress(next);
      } else if (current !== target) {
        currentProgressRef.current = target;
        setProgress(target);
      }

      // Continue loop only if section is visible or still interpolating
      if (isVisibleRef.current || Math.abs(diff) > 0.0001) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    animateRef.current = animate;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, handleScroll]);

  // Pause rAF loop when section is not visible
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!wasVisible && entry.isIntersecting && animateRef.current) {
          rafRef.current = requestAnimationFrame(animateRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  // ─── PHASE BREAKDOWN ──────────────────────────────────────
  //
  //  0.00 → 0.30  Phase 1: Video LEFT (44%), Text on RIGHT
  //  0.30 → 0.65  Phase 2: Video slides to RIGHT, Text appears LEFT
  //  0.65 → 1.00  Phase 3: Video expands FULL SCREEN, overlay text + metrics
  //

  // Video block position (% of viewport width for left offset)
  const videoLeftPct = lerp([
    [0, 4], [0.25, 4], [0.35, 20], [0.55, 52], [0.65, 52], [0.78, 0], [1, 0]
  ], progress);

  // Video block width (% of viewport)
  const videoWidthPct = lerp([
    [0, 44], [0.65, 44], [0.78, 100], [1, 100]
  ], progress);

  // Video block height (% of viewport)
  const videoHeightPct = lerp([
    [0, 65], [0.65, 65], [0.78, 100], [1, 100]
  ], progress);

  // Video block top offset
  const videoTopPct = lerp([
    [0, 17.5], [0.65, 17.5], [0.78, 0], [1, 0]
  ], progress);

  // Video border radius
  const videoBorderRadiusPx = lerp([
    [0, 20], [0.65, 20], [0.78, 0], [1, 0]
  ], progress);

  // ─── TEXT OPACITIES ─────────────────────────────────
  // Text 1 (RIGHT side): visible 0.00 → 0.25
  const text1Opacity = lerp([
    [0, 1], [0.22, 1], [0.30, 0]
  ], progress);
  const text1TranslateX = lerp([
    [0, 0], [0.22, 0], [0.30, -40]
  ], progress);

  // Text 2 (LEFT side): visible 0.38 → 0.60
  const text2Opacity = lerp([
    [0.33, 0], [0.40, 1], [0.56, 1], [0.64, 0]
  ], progress);
  const text2TranslateX = lerp([
    [0.33, -50], [0.40, 0], [0.56, 0], [0.64, 40]
  ], progress);

  // Combined Phase 3 overlay (text + metrics): visible 0.80 → 1.00
  const text3Opacity = lerp([
    [0.80, 0], [0.88, 1], [1, 1]
  ], progress);
  const text3TranslateY = lerp([
    [0.80, 40], [0.88, 0]
  ], progress);

  // Dark overlay for Phase 3
  const darkOverlayOpacity = lerp([
    [0.72, 0], [0.82, 0.6], [1, 0.6]
  ], progress);

  const overlayOpacity = isMobile
    ? lerp([[0.65, 0], [0.72, 0.75], [1, 0.75]], progress)
    : darkOverlayOpacity;

  if (!mounted) {
    return <section className="relative w-full h-[500vh] bg-bg-dark" />;
  }

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-bg-dark">
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ─── TEXT 1: RIGHT SIDE (Phase 1) ─── */}
        <div
          style={{
            position: "absolute",
            left: isMobile ? 0 : "auto",
            right: 0,
            top: 0,
            width: isMobile ? "100vw" : "50vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: isMobile ? "8vw" : "4vw",
            paddingRight: isMobile ? "8vw" : "6vw",
            zIndex: 20,
            pointerEvents: "none",
            opacity: text1Opacity,
            transform: `translateX(${text1TranslateX}px)`,
            willChange: "opacity, transform",
          }}
        >
          <div style={{ maxWidth: "520px" }}>
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
              Трансформировать передовые мировые инновации в энергетическую независимость и экономическую прочность Кыргызской Республики, делая ставку на доступность, неисчерпаемость и экологичность солнечной энергии.
            </p>
            <div
              style={{
                marginTop: "2rem",
                width: "4rem",
                height: "2px",
                background: "linear-gradient(to right, #F08A1D, transparent)",
              }}
            />
          </div>
        </div>

        {/* ─── TEXT 2: LEFT SIDE (Phase 2) ─── */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: isMobile ? 0 : "auto",
            top: 0,
            width: isMobile ? "100vw" : "48vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: isMobile ? "8vw" : "6vw",
            paddingRight: isMobile ? "8vw" : "4vw",
            zIndex: 20,
            opacity: text2Opacity,
            transform: `translateX(${text2TranslateX}px)`,
            willChange: "opacity, transform",
          }}
        >
          <div style={{ maxWidth: "520px" }}>
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
                marginBottom: "2rem",
              }}
            >
              Развитие высокотехнологичной зеленой энергетики в Кыргызской Республике через строительство современных СЭС, обеспечивая экономику региона экологически чистой и неисчерпаемой энергией.
            </p>
          </div>
        </div>

        {/* ─── THE MOVING VIDEO BLOCK ─── */}
        <div
          style={
            isMobile
              ? {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
                overflow: "hidden",
                zIndex: 10,
                opacity: lerp([[0, 0], [0.65, 0], [0.72, 1], [1, 1]], progress),
                willChange: "opacity",
              }
              : {
                position: "absolute",
                left: `${videoLeftPct}vw`,
                top: `${videoTopPct}vh`,
                width: `${videoWidthPct}vw`,
                height: `${videoHeightPct}vh`,
                borderRadius: `${videoBorderRadiusPx}px`,
                overflow: "hidden",
                zIndex: 10,
                boxShadow: "0 25px 80px -15px rgba(0,0,0,0.5), 0 10px 30px -10px rgba(0,0,0,0.3)",
                willChange: "left, top, width, height, border-radius",
              }
          }
        >
          {/* Video */}
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero_backdrop_v3.jpg"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Fallback gradient for when video hasn't loaded */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #3a4049 0%, #2F343A 50%, #252930 100%)",
              zIndex: -1,
            }}
          />

          {/* Subtle gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(47,52,58,0.1) 0%, transparent 50%, rgba(47,52,58,0.2) 100%)",
              zIndex: 5,
              pointerEvents: "none",
            }}
          />

          {/* Dark overlay for Phase 3 text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(47,52,58,0.85)",
              opacity: overlayOpacity,
              zIndex: 6,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ─── COMBINED OVERLAY (Phase 3 — fullscreen) ─── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 30,
            padding: "2rem 1.5rem",
            opacity: text3Opacity,
            transform: `translateY(${text3TranslateY}px)`,
            willChange: "opacity, transform",
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
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3.75rem)",
                color: "white",
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.15,
                maxWidth: "56rem",
                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              Ключевой проект: Проектирование, строительство и запуск СЭС в селе Орток
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
              {/* Connecting line from Dot 1 to Dot 3 */}
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
                { value: "325", unit: "МВт", label: "Мощность солнечной электростанции (СЭС)" },
                { value: "Ак-Кудук", label: "Место строительства в с. Орток" },
                { value: "Нарын", label: "Кочкорский район Нарынской области" },
              ].map((metric, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", position: "relative" }}>
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
                      <span style={{ fontSize: "clamp(0.9rem, 2vw, 1.875rem)", marginLeft: "0.25rem" }}>
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
                  {/* Decorative node */}
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

      </div>
    </section>
  );
}

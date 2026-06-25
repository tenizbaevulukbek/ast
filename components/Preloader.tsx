"use client";

import React, { useEffect, useState } from "react";
import SolarPanelIcon from "@/components/SolarPanelIcon";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-dark text-bg-light transition-all duration-700 ease-in-out ${loading ? "opacity-100" : "opacity-0 pointer-events-none translate-y-[-100%]"
        }`}
    >
      {/* Turkic Ornament Corner Frames (Decorative Background) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 p-8 flex flex-col justify-between">
        <div className="flex justify-between w-full">
          {/* Top Left Corner Ornament */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 2 20 L 2 2 C 2 2, 10 2, 10 10 C 10 18, 2 18, 2 20 C 2 22, 18 22, 18 10 C 18 2, 10 2, 2 2" />
          </svg>
          {/* Top Right Corner Ornament */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform rotate-90">
            <path d="M 2 20 L 2 2 C 2 2, 10 2, 10 10 C 10 18, 2 18, 2 20 C 2 22, 18 22, 18 10 C 18 2, 10 2, 2 2" />
          </svg>
        </div>
        <div className="flex justify-between w-full mt-auto">
          {/* Bottom Left Corner Ornament */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform -rotate-90">
            <path d="M 2 20 L 2 2 C 2 2, 10 2, 10 10 C 10 18, 2 18, 2 20 C 2 22, 18 22, 18 10 C 18 2, 10 2, 2 2" />
          </svg>
          {/* Bottom Right Corner Ornament */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform rotate-180">
            <path d="M 2 20 L 2 2 C 2 2, 10 2, 10 10 C 10 18, 2 18, 2 20 C 2 22, 18 22, 18 10 C 18 2, 10 2, 2 2" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 text-center max-w-sm px-6">
        {/* Animated Solar Energy Icon in Center */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 text-brand">
          <SolarPanelIcon />

          {/* Subtle pulse core representing energy flow */}
          <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-brand/35 animate-ping" />
        </div>
      </div>
    </div>
  );
}

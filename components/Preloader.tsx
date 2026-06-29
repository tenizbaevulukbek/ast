"use client";

import React, { useEffect, useState } from "react";
import SolarPanelIcon from "@/components/SolarPanelIcon";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      // Restore scrolling
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      // Fallback cleanup
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-dark text-bg-light transition-all duration-700 ease-in-out ${loading ? "opacity-100" : "opacity-0 pointer-events-none translate-y-[-100%]"
        }`}
    >

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

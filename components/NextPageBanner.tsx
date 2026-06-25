"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function NextPageBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full bg-bg-light py-16 md:py-24 px-6 md:px-12 border-t border-border-light overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        <a
          href="https://bishkek.headhunter.kg/employer/12344286?hhtmFrom=vacancy&tab=VACANCIES"
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-col gap-2 pr-[80px] sm:pr-[120px] md:pr-[160px]">
            {/* Next page cue */}
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              Карьера в АСТ Империал Строй
            </span>

            {/* Giant Title + Arrow Row */}
            <div className="flex justify-between items-end gap-8 pb-6 relative">
              <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-extrabold tracking-tight text-brand leading-none select-none transition-colors duration-500">
                Вакансии
              </h2>

              {/* Giant clean arrow indicator */}
              <div className="shrink-0 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-16 h-16 md:w-24 md:h-24 text-brand transform transition-transform duration-500 ease-out ${hovered ? "translate-x-4 scale-105" : ""
                    }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>

              {/* Underlying thick bar */}
              <div
                className={`absolute bottom-0 left-0 w-full h-[6px] bg-brand origin-left transition-transform duration-700 ease-out ${hovered ? "scale-x-100" : "scale-x-75 opacity-70"
                  }`}
              />
            </div>
          </div>
        </a>
      </div>

      {/* Right side absolute: identity.png image stretched to full height of the block */}
      <div className="absolute right-0 top-0 bottom-0 h-full w-[80px] sm:w-[120px] md:w-[160px] pointer-events-none z-0">
        <Image
          src="/identity_v2.png"
          alt="AST Identity"
          fill
          className="object-cover object-right"
          priority
        />
      </div>
    </div>
  );
}

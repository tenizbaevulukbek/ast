"use client";

import React from "react";

export default function Facts() {
  return (
    <section id="facts" className="relative w-full bg-white text-[#2F343A] py-24 md:py-36 px-6 md:px-12 border-t border-[#E8E2DA] overflow-hidden">

      {/* Clip paths for custom card shapes with smooth rounded transitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="clip-top-left" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0 L 0.94,0 Q 1,0 1,0.06 L 1,0.70 Q 1,0.75 0.95,0.80 L 0.80,0.95 Q 0.75,1 0.70,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z" />
          </clipPath>
          <clipPath id="clip-top-right" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0 L 0.94,0 Q 1,0 1,0.06 L 1,0.94 Q 1,1 0.94,1 L 0.30,1 Q 0.25,1 0.20,0.95 L 0.05,0.80 Q 0,0.75 0,0.70 L 0,0.06 Q 0,0 0.06,0 Z" />
          </clipPath>
          <clipPath id="clip-bottom-left" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0 L 0.70,0 Q 0.75,0 0.80,0.05 L 0.95,0.20 Q 1,0.25 1,0.30 L 1,0.94 Q 1,1 0.94,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z" />
          </clipPath>
          <clipPath id="clip-bottom-right" clipPathUnits="objectBoundingBox">
            <path d="M 0.30,0 L 0.94,0 Q 1,0 1,0.06 L 1,0.94 Q 1,1 0.94,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.30 Q 0,0.25 0.05,0.20 L 0.20,0.05 Q 0.25,0 0.30,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative">

        {/* Title */}
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-normal text-[#2F343A] leading-tight">
            Факты об АСТ Империал Строй
          </h2>
        </div>

        {/* Symmetrical Grid Container */}
        <div className="relative w-full">

          {/* Symmetrical 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

            {/* Card 1: Top-Left */}
            <div
              className="bg-[#E8E2DA] p-[1.5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ clipPath: "url(#clip-top-left)" }}
            >
              <div
                className="bg-white p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px]"
                style={{ clipPath: "url(#clip-top-left)" }}
              >
                {/* Upper Content */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-[#2F343A] tracking-tight">
                    Мощность СЭС
                  </h3>
                  <p className="text-sm md:text-base text-[#2F343A]/70 leading-relaxed">
                    Проектируемая солнечная электростанция обеспечит регион чистой энергией.
                  </p>
                </div>

                {/* Lower Stat */}
                <div className="flex flex-col gap-1 pt-6 border-t border-[#E8E2DA]/50">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2F343A]/30 font-sans tracking-tight">
                    325 МВт
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2F343A]/50">
                    мощность станции
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Top-Right */}
            <div
              className="bg-[#E8E2DA] p-[1.5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ clipPath: "url(#clip-top-right)" }}
            >
              <div
                className="bg-white p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px] text-right items-end"
                style={{ clipPath: "url(#clip-top-right)" }}
              >
                {/* Upper Content */}
                <div className="flex flex-col gap-4 items-end">
                  <h3 className="text-2xl font-bold text-[#2F343A] tracking-tight">
                    Локация проекта
                  </h3>
                  <p className="text-sm md:text-base text-[#2F343A]/70 leading-relaxed max-w-sm">
                    Строительство развернется в селе Орток на участке Ак-Кудук Кочкорского района.
                  </p>
                </div>

                {/* Lower Stat */}
                <div className="flex flex-col gap-1 pt-6 border-t border-[#E8E2DA]/50 w-full items-end">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2F343A]/30 font-sans tracking-tight">
                    с. Орток
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2F343A]/50">
                    участок Ак-Кудук
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Bottom-Left */}
            <div
              className="bg-[#E8E2DA] p-[1.5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ clipPath: "url(#clip-bottom-left)" }}
            >
              <div
                className="bg-white p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px]"
                style={{ clipPath: "url(#clip-bottom-left)" }}
              >
                {/* Upper Stat */}
                <div className="flex flex-col gap-1 pb-6 border-b border-[#E8E2DA]/50">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2F343A]/30 font-sans tracking-tight">
                    100%
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2F343A]/50">
                    экологически чистая энергия
                  </span>
                </div>

                {/* Lower Content */}
                <div className="flex flex-col gap-4 pt-6">
                  <h3 className="text-2xl font-bold text-[#2F343A] tracking-tight">
                    Зеленая энергия
                  </h3>
                  <p className="text-sm md:text-base text-[#2F343A]/70 leading-relaxed">
                    Обеспечение экономики Кыргызстана экологически чистой и неисчерпаемой энергией.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Bottom-Right */}
            <div
              className="bg-[#E8E2DA] p-[1.5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ clipPath: "url(#clip-bottom-right)" }}
            >
              <div
                className="bg-white p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px] text-right items-end"
                style={{ clipPath: "url(#clip-bottom-right)" }}
              >
                {/* Upper Stat */}
                <div className="flex flex-col gap-1 pb-6 border-b border-[#E8E2DA]/50 w-full items-end">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#2F343A]/30 font-sans tracking-tight">
                    EPC
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2F343A]/50">
                    стандарты управления
                  </span>
                </div>

                {/* Lower Content */}
                <div className="flex flex-col gap-4 pt-6 items-end">
                  <h3 className="text-2xl font-bold text-[#2F343A] tracking-tight">
                    Мировой уровень
                  </h3>
                  <p className="text-sm md:text-base text-[#2F343A]/70 leading-relaxed max-w-sm">
                    Внедрение инженерных решений исключительно мирового уровня.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Decorative Symmetrical Center Diamond */}
          <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center pointer-events-none select-none">
            {/* Center container without background */}
            <div className="w-36 h-36 flex items-center justify-center">
              {/* SVG Solar Symbol */}
              <svg
                viewBox="0 0 200 200"
                className="w-28 h-28 text-brand rotate-45"
                stroke="currentColor"
                fill="none"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Outer square */}
                <rect x="50" y="50" width="100" height="100" rx="4" />

                {/* Inner square */}
                <rect x="74" y="74" width="52" height="52" rx="2" />

                {/* Grid lines */}
                <line x1="52" y1="88" x2="148" y2="88" />
                <line x1="52" y1="112" x2="148" y2="112" />
                <line x1="88" y1="52" x2="88" y2="148" />
                <line x1="112" y1="52" x2="112" y2="148" />

                {/* Small corner squares */}
                <rect x="44" y="44" width="12" height="12" rx="1.5" />
                <rect x="144" y="44" width="12" height="12" rx="1.5" />
                <rect x="44" y="144" width="12" height="12" rx="1.5" />
                <rect x="144" y="144" width="12" height="12" rx="1.5" />

                {/* Brackets on the sides */}
                {/* Top */}
                <path d="M 80,50 L 80,34 L 120,34 L 120,50" />
                <path d="M 100,34 L 100,22" />
                <rect x="94" y="10" width="12" height="12" rx="1.5" />

                {/* Bottom */}
                <path d="M 80,150 L 80,166 L 120,166 L 120,150" />
                <path d="M 100,166 L 100,178" />
                <rect x="94" y="178" width="12" height="12" rx="1.5" />

                {/* Left */}
                <path d="M 50,80 L 34,80 L 34,120 L 50,120" />
                <path d="M 34,100 L 22,100" />
                <rect x="10" y="94" width="12" height="12" rx="1.5" />

                {/* Right */}
                <path d="M 150,80 L 166,80 L 166,120 L 150,120" />
                <path d="M 166,100 L 178,100" />
                <rect x="178" y="94" width="12" height="12" rx="1.5" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Showcase() {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  return (
    <section className="relative w-full h-[70vh] md:h-screen min-h-[500px] overflow-hidden bg-bg-dark group select-none">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/commercial_solar.jpg"
          alt="AST Solar Commercial Application"
          fill
          priority
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        {/* Sleek shadow overlay with brand dark slate color */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-bg-dark/40 z-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between py-16 md:py-24 text-[#F5F1EC]">
        {/* Top Header Row */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-brand font-bold">
              Ключевой проект / 01
            </span>
            <span className="text-[#F5F1EC]/60 text-sm">СЭС 325 МВт</span>
          </div>
        </div>

        {/* Center Text Layer */}
        <div
          className="max-w-2xl cursor-pointer w-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setModalOpen(true)}
        >
          <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 w-full">
            <h3 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F5F1EC] leading-none">
              Энергия солнца
              <br />
              для Кыргызстана.
            </h3>
            {/* Round animated arrow key */}
            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#F5F1EC]/30 flex items-center justify-center shrink-0 backdrop-blur-sm transition-all duration-500 ${hovered
              ? "bg-brand border-brand text-bg-dark scale-105 shadow-[0_0_25px_rgba(240,138,29,0.4)]"
              : "bg-bg-dark/25 text-[#F5F1EC] hover:border-[#F5F1EC]/60"
              }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`w-6 h-6 md:w-8 md:h-8 transform transition-transform duration-500 ${hovered ? "translate-x-1 rotate-45" : ""
                  }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1 max-w-sm">
            <p className="text-[#F5F1EC]/80 font-semibold text-base">Солнечная электростанция Орток</p>
            <p className="text-[#F5F1EC]/45 text-sm font-light">
              Строительство и запуск в эксплуатацию высокотехнологичной зеленой электростанции в Кочкорском районе.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold tracking-wider text-[#F5F1EC]/50">
            <div>
              <span className="text-brand mr-2">325</span> МВТ
            </div>
            <div>
              <span className="text-brand mr-2">100%</span> ЭКО
            </div>
            <div>
              <span className="text-brand mr-2">EPC</span> СТАНДАРТЫ
            </div>
          </div>
        </div>
      </div>

      {/* About Us Modal Overlay */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        >
          {/* Modal Container: 70% of screen */}
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="showcase-modal-title"
            className="w-[70vw] h-[70vh] bg-white text-[#2F343A] rounded-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-[#E8E2DA] cursor-default"
          >
            {/* Left Column: Premium Image (40% width, hidden on mobile) */}
            <div className="relative hidden md:block md:w-[40%] h-full bg-[#E8E2DA]">
              <Image
                src="/commercial_solar.jpg"
                alt="О компании АСТ"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#2F343A]/10" />
            </div>

            {/* Right Column: Content (60% width on md, 100% on small) */}
            <div className="w-full md:w-[60%] h-full flex flex-col p-8 md:p-12 justify-between overflow-y-auto">

              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 text-[#2F343A]/50 hover:text-[#2F343A] hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-none p-1 z-10 bg-white/80 rounded-full backdrop-blur-sm"
                aria-label="Закрыть"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Text Content */}
              <div className="flex flex-col gap-6 pr-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand font-bold">О компании</span>
                  <h3 
                    id="showcase-modal-title"
                    className="text-3xl md:text-4xl font-extrabold text-[#2F343A] tracking-tight mt-1"
                  >
                    АСТ Империал Строй
                  </h3>
                </div>

                <div className="w-12 h-[2px] bg-brand" />

                <div className="flex flex-col gap-4 text-sm md:text-base text-[#2F343A]/80 leading-relaxed font-light">
                  <p>
                    АСТ Империал Строй - это высокотехнологичная компания электроэнергетики, заставляющая передовые мировые технологии работать на благо экономики. Мы занимается развитием в области солнечной энергии. Доступность, неисчерпаемость, экологичность — вот основные достоинства применения солнечной энергии в современном мире.
                  </p>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
    </section>
  );
}

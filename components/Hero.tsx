"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Module-level constant — created once, never re-allocated during re-renders
const WORDS = ["Чистая энергия", "Зеленое будущее", "Солнечная сила"];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);


  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % WORDS.length;
      const fullWord = WORDS[i];

      if (isDeleting) {
        setTypedText(fullWord.substring(0, typedText.length - 1));
        setTypingSpeed(50); // faster deleting
      } else {
        setTypedText(fullWord.substring(0, typedText.length + 1));
        setTypingSpeed(120); // normal typing
      }

      if (!isDeleting && typedText === fullWord) {
        setTimeout(() => setIsDeleting(true), 1500); // hold word
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // pause before next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 overflow-hidden bg-bg-dark">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_backdrop_v3.jpg"
          alt="AST Solar Architectural House"
          fill
          priority
          className="object-cover object-center opacity-85 select-none"
        />
        {/* Sleek Gradient Overlay using dark brand slate color */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F343A] via-[#2F343A]/30 to-[#2F343A]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2F343A]/50 via-transparent to-[#2F343A]/10 z-10" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full mt-16 md:mt-24">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-normal leading-[0.85] text-[#F5F1EC] select-none">
            АСТ Империал Строй
            <br />
            <span className="text-brand min-h-[1.1em]">
              {typedText}
              <span className="inline-block ml-1 w-[4px] h-[0.85em] bg-brand animate-pulse align-baseline" />
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom Row Info */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between mt-auto pt-8 sm:pt-12 pb-16 sm:pb-0 border-t border-white/10 gap-6 sm:gap-0">
        <div className="flex flex-col gap-1 max-w-xs md:max-w-md animate-fade-in-up delay-200">
          <span className="text-xs uppercase tracking-widest text-brand font-bold">
            Зеленая энергетика
          </span>
          <p className="text-sm md:text-lg text-[#F5F1EC]/70 font-medium">
            Проектирование и строительство солнечной электростанции мощностью 325 МВт в Нарынской области.
          </p>
        </div>
      </div>

      {/* Scrolling Indicator Arrow (Centered absolutely relative to the section/viewport) */}
      <div className="absolute left-1/2 bottom-4 sm:bottom-6 -translate-x-1/2 z-20">
        <a
          href="/#mission"
          className="group relative flex flex-col items-center justify-end pb-2 sm:pb-3 w-9 h-12 sm:w-12 sm:h-16 rounded-full border border-white/20 hover:border-brand/50 bg-[#2F343A]/40 hover:bg-[#2F343A]/80 backdrop-blur-sm transition-all duration-300 overflow-hidden"
          aria-label="Scroll Down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 25 25"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5 text-white/45 group-hover:text-brand transition-colors animate-arrow-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

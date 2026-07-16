"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface BannerItem {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}

const bannerData: BannerItem[] = [
  {
    id: 1,
    date: "24 Июня 2026",
    title: 'В Кочкорском районе планируется строительство солнечной электростанции мощностью 325 МВт',
    image: "/news1.webp",
    link: "https://economist.kg/enierghietika/2026/06/24/v-kochkorskom-raione-planiruetsia-stroitelstvo-solnechnoi-elektrostantsii-moshchnostiu-325-mvt/?fbclid=IwZnRzaASoQoBleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAo2NjI4NTY4Mzc5AAEe3T6vu7WHcsPzV7pOtGjzPrTSnNZx-9rbmOCP61ZTruBpeyRchU3irkbRR-o_aem_PlkQsXdOG5mQ9T8bp9bDDw",
  },
  {
    id: 2,
    date: "02 Ноября 2024",
    title: "Кабмин одобрил проект соглашения с частной компанией о строительстве солнечной электростанции в Кочкорском районе",
    image: "/news2.jpg",
    link: "https://www.tazabek.kg/news:2187058",
  },
  {
    id: 3,
    date: "12 Сентября 2025",
    title: "Крупный проект СЭС в Нарыне: Кабмин одобрил участие российского инвестора",
    image: "/news3.jpg",
    link: "https://bishkek.media/dlia-stroitelstva-solnechnoi-elektrostancii-v-kochkorskom-raione-mestnaia-k.html",
  },
  {
    id: 4,
    date: "14 Августа 2025",
    title: "По итогам VII Кыргызско-Российского экономического форума будет подписан ряд документов",
    image: "/news4.webp",
    link: "https://ru.kabar.kg/news/po-itogam-vii-kyrgyzsko-rossijskogo-ekonomicheskogo-foruma-budet-podpisan-ryad-dokumentov/",
  },
];

export default function PressCenter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // touch and drag states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const maxIndex = bannerData.length - 1;

  // ─── AUTOPLAY ────────────────────────────────────────────────────────────────
  // Uses functional setState to avoid stale closures — no dependency on currentIndex.
  // Called once on mount and reset manually after user interaction.
  const startAutoplay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    }, 20000);
  }, [maxIndex]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [startAutoplay]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    startAutoplay();
  }, [maxIndex, startAutoplay]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
    startAutoplay();
  }, [maxIndex, startAutoplay]);


  // Touch triggers (swiping)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag triggers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button, span")) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 80;
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  return (
    <section id="press-center" className="w-full bg-white py-16 md:py-24 border-t border-border-light relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header section with arrows */}
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-[#F08A1D] font-bold mb-2">
              Пресс-центр
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2F343A]">
              Новости и публикации
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#E8E2DA] flex items-center justify-center text-[#2F343A] hover:bg-[#F08A1D] hover:text-white hover:border-[#F08A1D] transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Предыдущая новость"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#E8E2DA] flex items-center justify-center text-[#2F343A] hover:bg-[#F08A1D] hover:text-white hover:border-[#F08A1D] transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Следующая новость"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport for unified banner slider */}
        <div
          className={`overflow-hidden rounded-[32px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-out"}`}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {bannerData.map((item) => (
              <div key={item.id} className="w-full shrink-0 relative h-[440px] md:h-[500px]">
                {/* Banner Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  draggable={false}
                  className="object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
                  priority={item.id === 1}
                />

                {/* Dark readable gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 z-10 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20 flex flex-col justify-end text-white select-none pointer-events-none">

                  {/* Date */}
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[#F08A1D] mb-3 inline-block">
                    {item.date}
                  </span>

                  {/* Footer Row (Title and external link button) */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">

                    {/* Banner Title */}
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight max-w-4xl text-white">
                      {item.title}
                    </h3>

                    {/* External redirection button */}
                    <div className="self-start md:self-auto pointer-events-auto shrink-0">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-[#2F343A] font-bold text-sm md:text-base px-8 py-3.5 rounded-2xl transition-all duration-300 hover:bg-[#F08A1D] hover:text-white hover:scale-102 focus:outline-none"
                      >
                        Узнать
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators at the bottom */}
        <div className="flex justify-center gap-2 mt-6">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${currentIndex === index ? "w-10 bg-[#F08A1D]" : "w-6 bg-[#E8E2DA] hover:bg-black/20"
                }`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

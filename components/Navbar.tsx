"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // запрет на скролл когда менюшка или модалка QR открыта + закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setQrOpen(false);
      }
    };

    if (mobileMenuOpen || qrOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, qrOpen]);

  const menuItems = [
    { label: "Главная", target: "home" },
    { label: "Миссия и Цель", target: "mission" },
    { label: "Ценности", target: "values" },
    { label: "О нас", target: "about-us" },
  ];

  // Dynamic text color classes based on scrolling state to ensure legibility
  const textColorClass = scrolled ? "text-[#2F343A]" : "text-[#F5F1EC]";
  const textMutedColorClass = scrolled ? "text-[#2F343A]/80 hover:text-[#2F343A]" : "text-[#F5F1EC]/85 hover:text-[#F5F1EC]";
  const logoColorClass = scrolled ? "text-[#2F343A]" : "text-[#F5F1EC]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#F5F1EC]/40 backdrop-blur-lg border-b border-[#E8E2DA]/30 py-4 shadow-[0_4px_30px_rgba(47,52,58,0.03)]"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo_v2.png"
              alt="AST Logo"
              width={168}
              height={90}
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-9" : "h-12"
                }`}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`/#${item.target}`}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative group py-2 ${textMutedColorClass}`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action: Project Info QR Trigger Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setQrOpen(true)}
              className={`flex items-center gap-3 group bg-transparent transition-colors duration-300 ${textColorClass} hover:text-brand cursor-pointer focus:outline-none`}
            >
              <span className="text-sm font-bold tracking-wide">Информация о проекте</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-[#F5F1EC] group-hover:scale-105 ${scrolled
                ? "bg-[#2F343A] text-[#F5F1EC] shadow-[0_0_15px_rgba(47,52,58,0.15)]"
                : "bg-[#F5F1EC] text-[#2F343A] shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                } group-hover:shadow-[0_0_20px_rgba(240,138,29,0.4)]`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex flex-col justify-between w-6 h-4 focus:outline-none z-50 transition-colors duration-300 ${mobileMenuOpen ? "text-[#F5F1EC]/70 hover:text-[#F5F1EC]" : textColorClass
              }`}
            aria-label="Toggle menu"
          >
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
                }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-1"
                }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                }`}
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop (Dimmed overlay outside) */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 z-40 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Mobile Left Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 h-full w-[280px] sm:w-[320px] bg-white border-r border-[#E8E2DA] flex flex-col px-8 py-24 gap-8 transition-transform duration-500 ease-out z-55 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo inside sidebar */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/logo.png"
            alt="AST Logo"
            width={112}
            height={60}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Links list */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={`/#${item.target}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-bold text-[#2F343A]/85 hover:text-brand transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action button inside sidebar */}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setQrOpen(true);
          }}
          className="flex items-center justify-center gap-3 mt-auto px-6 py-3 rounded-full bg-[#2F343A] hover:bg-brand text-[#F5F1EC] hover:text-white transition-all duration-300 shadow-[0_4px_12px_rgba(47,52,58,0.15)] cursor-pointer focus:outline-none"
        >
          <span className="font-semibold text-lg">Информация о проекте</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* QR Code Modal Overlay */}
      {qrOpen && (
        <div 
          onClick={() => setQrOpen(false)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
        >
          {/* Modal Card */}
          <div 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            className="relative bg-white p-8 rounded-2xl max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center gap-5 transform scale-100 transition-transform duration-300 border border-[#E8E2DA] cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 text-[#2F343A]/55 hover:text-[#2F343A] hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-none p-1"
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 
              id="qr-modal-title"
              className="text-xl font-bold text-[#2F343A] mt-2 tracking-tight text-center"
            >
              Информация о проекте
            </h3>

            {/* QR Image Container */}
            <div className="relative w-64 h-64 border-2 border-[#E8E2DA] rounded-xl overflow-hidden shadow-inner bg-bg-light">
              <Image
                src="/qr.jpg"
                alt="QR-код с информацией о проекте"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#2F343A]/60 text-center leading-relaxed max-w-[280px]">
              Отсканируйте QR-код с помощью камеры вашего телефона, чтобы прочитать подробное описание проекта СЭС.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

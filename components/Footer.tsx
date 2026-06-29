"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SolarPanelIcon from "@/components/SolarPanelIcon";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-bg-dark text-bg-light pt-16 pb-12 px-6 md:px-12 border-t border-border-light/10 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Upper Footer: Main Menu Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-border-light/10">
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo_v2.png"
              alt="AST Logo"
              width={140}
              height={75}
              className="h-10 w-auto object-contain invert hue-rotate-180"
            />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { label: "Главная", target: "home" },
              { label: "Миссия и Цель", target: "mission" },
              { label: "Ценности", target: "values" },
              { label: "О нас", target: "about-us" },
              { label: "Новости", target: "press-center" },
            ].map((link, idx) => (
              <a
                key={link.label + idx}
                href={`/#${link.target}`}
                className="text-sm font-semibold tracking-wider text-[#F5F1EC]/80 hover:text-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Lower Footer: Navigation Grid & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12 text-sm text-[#F5F1EC]/50">
          {/* Column 1: О компании */}
          <div className="flex flex-col gap-4">
            <span className="text-[#F5F1EC] font-semibold uppercase tracking-wider text-xs">О компании</span>
            <p className="leading-relaxed text-[#F5F1EC]/70">
              ОсОО «АСТ Империал Строй» — ведущий разработчик высокотехнологичной зеленой энергетики в Кыргызской Республике.
            </p>
          </div>

          {/* Column 2: Локация */}
          <div className="flex flex-col gap-4">
            <span className="text-[#F5F1EC] font-semibold uppercase tracking-wider text-xs">Адрес и локация</span>
            <ul className="flex flex-col gap-2 text-[#F5F1EC]/70">
              <li>Кыргызская Республика</li>
              <li>Нарынская область, Кочкорский район</li>
              <li>село Орток, участок Ак-Кудук</li>
            </ul>
          </div>

          {/* Column 3: Проект */}
          <div className="flex flex-col gap-4">
            <span className="text-[#F5F1EC] font-semibold uppercase tracking-wider text-xs">Ключевой проект</span>
            <ul className="flex flex-col gap-2 text-[#F5F1EC]/70">
              <li>Строительство СЭС мощностью 325 МВт</li>
              <li>Экологически чистая солнечная энергия</li>
              <li>Международные стандарты EPC</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Address, Copyright & Decorative SVG */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-0 pt-12 border-t border-border-light/10 relative">

          {/* Address & Copyright */}
          <div className="flex flex-col gap-6 text-xs text-[#F5F1EC]/40 z-10">
            <div className="flex flex-col gap-1">
              <span>© 2026 ОсОО «АСТ Империал Строй» 🇰🇬</span>
              <span>Все права защищены.</span>
            </div>
            <div className="flex flex-col gap-1 font-mono">
              <span>Кыргызская Республика</span>
              <span>село Орток, Кочкорский район</span>
            </div>
          </div>

          {/* Premium decorative solar panel representing green energy */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none select-none w-14 h-14 md:w-36 md:h-36 text-brand">
            <SolarPanelIcon />
          </div>

        </div>
      </div>
    </footer>
  );
}

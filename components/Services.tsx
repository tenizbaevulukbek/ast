"use client";

import React from "react";

const servicesList = [
  {
    id: "safety",
    title: "Безопасность и командная работа",
    description: "Мы ценим каждого сотрудника, обеспечиваем безопасные условия труда и поддерживаем дружественную атмосферу. Наш абсолютный приоритет — строжайшее соблюдение техники безопасности на площадке для достижения нулевого травматизма.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        className="w-10 h-10 text-brand"
      >
        {/* Shield with checkmark */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "responsibility",
    title: "Социальная и экологическая ответственность",
    description: "Мы применяем современные стандарты для сохранения уникальной природы Нарынской области, активно участвуем в социальных проектах, поддерживаем местные сообщества и развиваем инфраструктуру Кочкорского района.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        className="w-10 h-10 text-brand"
      >
        {/* Sprout/Leaf Nature */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19c0-4.5 3.5-8 8-8m-8 8c0-4.5-3.5-8-8-8m8 8V11m0 0a4 4 0 118 0m-8 0a4 4 0 10-8 0" />
      </svg>
    ),
  },
  {
    id: "professionalism",
    title: "Профессионализм и уважение к ресурсам",
    description: "Мы стремимся к высокому уровню профессионализма, развиваем навыки наших специалистов и ценим время руководителей и сотрудников как главный невозобновляемый ресурс.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        className="w-10 h-10 text-brand"
      >
        {/* Outer frame of briefcase */}
        <rect x="3" y="7" width="18" height="13" rx="2" />
        {/* Handle on top */}
        <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        {/* Front latch line */}
        <path d="M3 12h18" />
        {/* Straps/Details */}
        <path d="M8 7v13M16 7v13" />
      </svg>
    ),
  },
  {
    id: "technology",
    title: "Технологическое превосходство и качество",
    description: "Мы внедряем инженерные решения и оборудование исключительно мирового уровня и управляем всеми процессами по международным стандартам EPC.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        className="w-10 h-10 text-brand"
      >
        {/* Solar Panel */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15L7 5h10l4 10H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v10M5 10h14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v4m-3 0h6" />
      </svg>
    ),
  },
  {
    id: "honesty",
    title: "Честность и абсолютная прозрачность",
    description: "Мы строим диалог с партнерами и соискателями на основе открытых и достоверных данных. Предоставление некорректной информации или намеренное искажение фактов на любом этапе взаимодействия для нас неприемлемы.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.2}
        stroke="currentColor"
        className="w-10 h-10 text-brand"
      >
        {/* Central pillar and stand */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M8 20h8" />
        {/* Main beam */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
        {/* Left pan strings and pan */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l-3 7h6l-3-7zm-3 7a3 3 0 006 0" />
        {/* Right pan strings and pan */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-3 7h6l-3-7zm-3 7a3 3 0 006 0" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="relative w-full bg-white text-foreground py-24 md:py-36 px-6 md:px-12 border-t border-border-light transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Centered Large Header */}
        <div className="max-w-4xl text-center mb-24 md:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-tight">
            Корпоративные ценности и принципы работы
          </h2>
        </div>

        {/* Feature Grid with minimal dividers */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 border-t border-border-light pt-16">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="flex flex-col gap-6 group hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-bg-light border border-border-light flex items-center justify-center shadow-sm group-hover:bg-brand-dim group-hover:border-brand/30 transition-colors duration-300">
                {service.icon}
              </div>

              {/* Title & Divider */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  {service.title}
                </h3>
                <div className="w-8 h-[2px] bg-brand group-hover:w-16 transition-all duration-300" />
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed max-w-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

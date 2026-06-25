"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AccordionItem {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface TabData {
  number: string;
  label: string;
  items: AccordionItem[];
}

const faqData: TabData[] = [
  {
    number: "01",
    label: "Экологические инициативы",
    items: [
      {
        number: "01",
        title: "Развитие возобновляемой энергетики",
        description: "Строительство и развитие современных СЭС в Кыргызской Республике направлено на укрепление энергетической независимости страны, экологическую безопасность региона и покрытие локального дефицита электроэнергии за счет эффективного использования высокого природного потенциала солнечной радиации.",
        image: "/faq_renewable_energy.png"
      },
      {
        number: "02",
        title: "Декарбонизация экономики",
        description: "Сокращение углеродного следа за счет внедрения современных систем генерации на предприятиях и перехода на чистые источники энергии, что позволяет снизить выбросы парниковых газов на 30%.",
        image: "/faq_decarbonization.png"
      }
    ]
  },
  {
    number: "02",
    label: "Социальная политика",
    items: [
      {
        number: "01",
        title: "Охрана труда и безопасность",
        description: "Обеспечение нулевого уровня травматизма на всех объектах строительства и эксплуатации. Регулярное обучение сотрудников и внедрение передовых стандартов производственной безопасности.",
        image: "/faq_safety.png"
      },
      {
        number: "02",
        title: "Развитие местных сообществ",
        description: "Финансирование инфраструктурных и образовательных проектов в регионах присутствия компании. Создание новых рабочих мест и поддержка социальных инициатив жителей.",
        image: "/faq_community_v2.png"
      }
    ]
  }
];

export default function Faq() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    setActiveItem(0);
  };

  const handleItemClick = (idx: number) => {
    setActiveItem(idx);
  };

  const currentTab = faqData[activeTab];

  return (
    <section id="faq" className="relative w-full bg-white text-[#2F343A] py-24 md:py-36 px-6 md:px-12 border-t border-[#E8E2DA] overflow-hidden">
      
      {/* Clip path for the custom sloped bottom-right corner of the image */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="clip-faq-img" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0 L 0.94,0 Q 1,0 1,0.06 L 1,0.70 Q 1,0.75 0.95,0.80 L 0.80,0.95 Q 0.75,1 0.70,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-[#2F343A] leading-tight">
            Социальная и экологическая ответственность
          </h2>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Accordion */}
          <div className="flex flex-col gap-10">
            
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-6 items-center border-b border-[#E8E2DA] pb-6">
              {faqData.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.label}
                    onClick={() => handleTabClick(idx)}
                    className="flex flex-col gap-3 text-left focus:outline-none group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isActive 
                          ? "bg-brand/10 border-brand text-brand" 
                          : "border-[#E8E2DA] text-[#2F343A]/50 group-hover:border-[#2F343A]/30 group-hover:text-[#2F343A]"
                      }`}>
                        {tab.number}
                      </div>
                      <span className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-[#2F343A]" : "text-[#2F343A]/50 group-hover:text-[#2F343A]"
                      }`}>
                        {tab.label}
                      </span>
                    </div>

                  </button>
                );
              })}
            </div>

            {/* Accordion list */}
            <div className="flex flex-col border-t border-[#E8E2DA]">
              {currentTab.items.map((item, idx) => {
                const isOpen = activeItem === idx;
                return (
                  <div 
                    key={item.title} 
                    className="border-b border-[#E8E2DA] transition-all duration-500"
                  >
                    <button
                      onClick={() => handleItemClick(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-content-${idx}`}
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-base font-bold transition-colors duration-300 ${
                          isOpen ? "text-brand" : "text-[#2F343A]/40 group-hover:text-[#2F343A]/70"
                        }`}>
                          {item.number}
                        </span>
                        <span 
                          id={`faq-header-${idx}`}
                          className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                            isOpen ? "text-brand" : "text-[#2F343A] group-hover:text-brand"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      
                      {/* Plus / Cross Icon */}
                      <div className={`w-8 h-8 rounded-full border border-[#E8E2DA] flex items-center justify-center transition-all duration-300 group-hover:border-brand ${
                        isOpen ? "bg-brand text-white border-brand rotate-45" : "text-[#2F343A]/50"
                      }`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <div 
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-header-${idx}`}
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-[300px] opacity-100 pb-6" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm md:text-base text-[#2F343A]/70 leading-relaxed pl-9 pr-6 border-l-2 border-brand/35">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Image with themed sloped corner */}
          <div className="w-full flex justify-center">
            <div 
              className="relative w-full aspect-[4/3] max-w-lg md:max-w-xl overflow-hidden shadow-lg border border-[#E8E2DA] p-[1.5px]"
              style={{ clipPath: "url(#clip-faq-img)" }}
            >
              <div 
                className="relative w-full h-full overflow-hidden"
                style={{ clipPath: "url(#clip-faq-img)" }}
              >
                <Image
                  key={currentTab.items[activeItem]?.image}
                  src={currentTab.items[activeItem]?.image || "/commercial_solar.jpg"}
                  alt={currentTab.items[activeItem]?.title || "Экологическая ответственность АСТ"}
                  fill
                  className="object-cover transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

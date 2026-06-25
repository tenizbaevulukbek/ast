import React from "react";

export default function SolarPanelIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      <style>{`
        @keyframes solar-ray-flow {
          0% { stroke-dashoffset: 24; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes solar-panel-glow {
          0%, 100% { fill-opacity: 0.15; }
          50% { fill-opacity: 0.45; }
        }
        .solar-ray { stroke-dasharray: 12; animation: solar-ray-flow 2.5s linear infinite; }
        .solar-panel { animation: solar-panel-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Sun rays from top and sides */}
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
        <line x1="50" y1="2" x2="50" y2="27" className="solar-ray" />
        <line x1="2" y1="47.5" x2="32" y2="47.5" className="solar-ray" />
        <line x1="98" y1="47.5" x2="68" y2="47.5" className="solar-ray" />
        <line x1="14" y1="14" x2="32" y2="32" className="solar-ray" />
        <line x1="86" y1="14" x2="68" y2="32" className="solar-ray" />
      </g>

      {/* Stand */}
      <line x1="50" y1="65" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" />
      <line x1="44" y1="85" x2="56" y2="85" stroke="currentColor" strokeWidth="1.5" />

      {/* Panel */}
      <g fill="currentColor">
        <rect x="35" y="30" width="30" height="35" rx="1.5" className="solar-panel" stroke="currentColor" strokeWidth="1" />
        <line x1="42.5" y1="30" x2="42.5" y2="65" stroke="#2F343A" strokeWidth="0.5" />
        <line x1="50" y1="30" x2="50" y2="65" stroke="#2F343A" strokeWidth="0.5" />
        <line x1="57.5" y1="30" x2="57.5" y2="65" stroke="#2F343A" strokeWidth="0.5" />
        <line x1="35" y1="38.75" x2="65" y2="38.75" stroke="#2F343A" strokeWidth="0.5" />
        <line x1="35" y1="47.5" x2="65" y2="47.5" stroke="#2F343A" strokeWidth="0.5" />
        <line x1="35" y1="56.25" x2="65" y2="56.25" stroke="#2F343A" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

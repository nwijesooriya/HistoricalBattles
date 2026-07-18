import React from 'react';

export default function RomanLegionary() {
  return (
    <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="procession-unit">
      {/* Shadow */}
      <ellipse cx="60" cy="170" rx="30" ry="6" fill="rgba(0,0,0,0.3)" />
      
      {/* Legs with marching animation */}
      <g className="gait-leg-left">
        <path d="M50 110 L45 150 L40 165" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 165 L35 170 L50 170 L45 165" fill="currentColor" />
      </g>
      <g className="gait-leg-right">
        <path d="M70 110 L75 150 L80 165" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M80 165 L85 170 L70 170 L75 165" fill="currentColor" />
      </g>
      
      {/* Body / Tunic */}
      <path d="M45 65 L75 65 L78 115 L42 115 Z" fill="currentColor" />
      
      {/* Belt */}
      <rect x="42" y="100" width="36" height="6" fill="rgba(0,0,0,0.3)" />
      
      {/* Shield (left arm) */}
      <g>
        <ellipse cx="35" cy="85" rx="12" ry="18" fill="currentColor" />
        <ellipse cx="35" cy="85" rx="8" ry="14" fill="rgba(0,0,0,0.2)" />
      </g>
      
      {/* Spear (right arm) */}
      <g>
        <line x1="85" y1="60" x2="95" y2="10" stroke="currentColor" strokeWidth="3" />
        <path d="M95 10 L92 20 L98 20 Z" fill="currentColor" />
      </g>
      
      {/* Head with helmet */}
      <g className="gait-body-bob">
        <circle cx="60" cy="45" r="14" fill="currentColor" />
        {/* Helmet plume */}
        <path d="M48 38 Q60 25 72 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Helmet brim */}
        <path d="M46 42 L74 42" stroke="rgba(0,0,0,0.4)" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Arms */}
      <path d="M45 70 L35 85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M75 70 L85 60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

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
      
      {/* Body / Tunic with lorica segmentata (plate armor) */}
      <path d="M45 65 L75 65 L78 115 L42 115 Z" fill="currentColor" />
      
      {/* Armor plates */}
      <path d="M47 68 L73 68 L73 75 L47 75 Z" fill="rgba(0,0,0,0.25)" />
      <path d="M47 78 L73 78 L73 85 L47 85 Z" fill="rgba(0,0,0,0.25)" />
      <path d="M47 88 L73 88 L73 95 L47 95 Z" fill="rgba(0,0,0,0.25)" />
      <path d="M47 98 L73 98 L73 105 L47 105 Z" fill="rgba(0,0,0,0.25)" />
      
      {/* Belt */}
      <rect x="42" y="100" width="36" height="6" fill="rgba(0,0,0,0.3)" />
      
      {/* Shield (scutum) - left arm */}
      <g>
        <ellipse cx="35" cy="85" rx="14" ry="22" fill="currentColor" />
        <ellipse cx="35" cy="85" rx="10" ry="18" fill="rgba(0,0,0,0.2)" />
        <path d="M35 67 L35 103" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
        <path d="M25 85 L45 85" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
      </g>
      
      {/* Spear (pilum) - right arm */}
      <g>
        <line x1="85" y1="60" x2="95" y2="10" stroke="currentColor" strokeWidth="3" />
        <path d="M95 10 L92 20 L98 20 Z" fill="currentColor" />
        <path d="M85 60 L82 70 L88 70 Z" fill="currentColor" />
      </g>
      
      {/* Head with galea helmet */}
      <g className="gait-body-bob">
        <circle cx="60" cy="45" r="14" fill="currentColor" />
        {/* Helmet plume */}
        <path d="M48 38 Q60 20 72 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Helmet brim */}
        <path d="M46 42 L74 42" stroke="rgba(0,0,0,0.4)" strokeWidth="3" strokeLinecap="round" />
        {/* Helmet cheek guards */}
        <path d="M48 45 L46 55" stroke="rgba(0,0,0,0.3)" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 45 L74 55" stroke="rgba(0,0,0,0.3)" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Arms */}
      <path d="M45 70 L35 85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M75 70 L85 60" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      
      {/* Gladius (sword) at hip */}
      <line x1="78" y1="100" x2="85" y2="85" stroke="currentColor" strokeWidth="2" />
      <path d="M85 85 L83 90 L87 90 Z" fill="currentColor" />
    </svg>
  );
}

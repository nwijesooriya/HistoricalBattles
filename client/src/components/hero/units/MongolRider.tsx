import React from 'react';

export default function MongolRider() {
  return (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="procession-unit">
      {/* Shadow */}
      <ellipse cx="90" cy="130" rx="50" ry="8" fill="rgba(0,0,0,0.3)" />
      
      {/* Horse body with bobbing animation */}
      <g className="gait-body-bob">
        {/* Horse body */}
        <path d="M50 80 Q40 60 60 50 L120 45 Q140 45 145 60 L150 90 Q150 100 140 105 L50 105 Q40 105 40 95 Z" fill="currentColor" />
        
        {/* Horse neck and head */}
        <path d="M145 60 Q160 50 165 35 Q168 25 160 22 Q150 20 145 30 L140 50" fill="currentColor" />
        <circle cx="162" cy="24" r="4" fill="currentColor" />
        
        {/* Horse mane */}
        <path d="M145 30 Q150 40 145 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
        
        {/* Horse legs */}
        <g className="gait-horse-leg-left">
          <path d="M60 100 L55 125" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M55 125 L50 130 L65 130 L60 125" fill="currentColor" />
        </g>
        <g className="gait-horse-leg-right">
          <path d="M80 100 L85 125" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M85 125 L90 130 L75 130 L80 125" fill="currentColor" />
        </g>
        <g className="gait-horse-leg-left">
          <path d="M110 100 L115 125" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M115 125 L120 130 L105 130 L110 125" fill="currentColor" />
        </g>
        <g className="gait-horse-leg-right">
          <path d="M130 100 L135 125" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M135 125 L140 130 L125 130 L130 125" fill="currentColor" />
        </g>
        
        {/* Tail */}
        <path d="M50 70 Q30 80 25 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        {/* Rider body / deel (traditional robe) */}
        <path d="M95 50 L115 50 L118 80 L92 80 Z" fill="currentColor" />
        
        {/* Belt */}
        <rect x="92" y="65" width="26" height="4" fill="rgba(0,0,0,0.3)" />
        
        {/* Rider head with hat */}
        <circle cx="105" cy="35" r="10" fill="currentColor" />
        {/* Hat */}
        <path d="M95 35 Q105 20 115 35" stroke="currentColor" strokeWidth="2" fill="none" />
        
        {/* Rider legs */}
        <path d="M95 75 L85 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M115 75 L125 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* Bow (composite bow) */}
        <g>
          <path d="M118 45 Q135 60 118 75" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="118" y1="45" x2="118" y2="75" stroke="currentColor" strokeWidth="1" />
          {/* Bowstring */}
          <line x1="118" y1="45" x2="125" y2="60" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <line x1="125" y1="60" x2="118" y2="75" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
        </g>
        
        {/* Quiver on back */}
        <rect x="100" y="45" width="8" height="20" rx="2" fill="rgba(0,0,0,0.3)" />
        <line x1="104" y1="45" x2="104" y2="65" stroke="currentColor" strokeWidth="1" />
        
        {/* Saber at hip */}
        <path d="M92 75 L85 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M85 85 L88 83 L86 88 Z" fill="currentColor" />
      </g>
    </svg>
  );
}

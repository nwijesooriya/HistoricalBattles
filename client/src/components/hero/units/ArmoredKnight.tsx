import React from 'react';

export default function ArmoredKnight() {
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
        
        {/* Horse barding (armor) */}
        <path d="M50 80 L50 105 L70 105 L70 80 Z" fill="rgba(0,0,0,0.15)" />
        <path d="M110 80 L110 105 L130 105 L130 80 Z" fill="rgba(0,0,0,0.15)" />
        <path d="M50 80 Q90 75 130 80" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
        
        {/* Knight body / armor (breastplate) */}
        <path d="M95 50 L115 50 L118 80 L92 80 Z" fill="currentColor" />
        
        {/* Armor details - plate lines */}
        <path d="M97 53 L113 53" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M97 58 L113 58" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M97 63 L113 63" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M97 68 L113 68" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <path d="M97 73 L113 73" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        
        {/* Faulds (waist armor) */}
        <path d="M92 75 L92 85 L118 85 L118 75 Z" fill="rgba(0,0,0,0.2)" />
        
        {/* Knight head with great helm */}
        <g className="gait-body-bob">
          <rect x="98" y="25" width="14" height="18" rx="2" fill="currentColor" />
          {/* Visor slit */}
          <rect x="100" y="32" width="10" height="2" fill="rgba(0,0,0,0.4)" />
          {/* Helmet top */}
          <path d="M98 25 L105 15 L112 25" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Plume */}
          <path d="M98 25 Q105 10 112 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
        
        {/* Knight legs (greaves) */}
        <path d="M95 80 L85 100" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M115 80 L125 100" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        
        {/* Spurs */}
        <circle cx="85" cy="100" r="2" fill="rgba(0,0,0,0.3)" />
        <circle cx="125" cy="100" r="2" fill="rgba(0,0,0,0.3)" />
        
        {/* Lance */}
        <line x1="118" y1="55" x2="150" y2="10" stroke="currentColor" strokeWidth="2" />
        <path d="M150 10 L146 22 L154 22 Z" fill="currentColor" />
        {/* Lance grip */}
        <rect x="116" y="50" width="6" height="10" rx="1" fill="rgba(0,0,0,0.3)" />
        
        {/* Shield (heater shield) */}
        <g>
          <path d="M85 65 Q85 55 95 55 L105 55 Q115 55 115 65 L115 90 Q115 100 100 105 Q85 100 85 90 Z" fill="currentColor" />
          <path d="M90 65 L110 65 L110 90 Q110 98 100 102 Q90 98 90 90 Z" fill="rgba(0,0,0,0.2)" />
          {/* Shield emblem - cross */}
          <path d="M100 65 L100 95" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
          <path d="M90 80 L110 80" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
        </g>
        
        {/* Sword at hip */}
        <line x1="92" y1="85" x2="80" y2="100" stroke="currentColor" strokeWidth="2" />
        <path d="M80 100 L83 98 L81 103 Z" fill="currentColor" />
      </g>
    </svg>
  );
}

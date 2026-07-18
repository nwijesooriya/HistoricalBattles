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
        
        {/* Knight body / armor */}
        <path d="M95 50 L115 50 L118 80 L92 80 Z" fill="currentColor" />
        
        {/* Armor details */}
        <rect x="95" y="55" width="20" height="3" fill="rgba(0,0,0,0.3)" />
        <rect x="95" y="62" width="20" height="3" fill="rgba(0,0,0,0.3)" />
        <rect x="95" y="69" width="20" height="3" fill="rgba(0,0,0,0.3)" />
        
        {/* Knight head with helmet */}
        <circle cx="105" cy="35" r="10" fill="currentColor" />
        
        {/* Helmet plume */}
        <path d="M98 28 Q105 18 112 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* Knight legs */}
        <path d="M95 75 L85 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M115 75 L125 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* Lance */}
        <line x1="118" y1="55" x2="145" y2="15" stroke="currentColor" strokeWidth="2" />
        <path d="M145 15 L142 25 L148 25 Z" fill="currentColor" />
        
        {/* Shield */}
        <ellipse cx="85" cy="70" rx="8" ry="12" fill="currentColor" />
        <ellipse cx="85" cy="70" rx="5" ry="9" fill="rgba(0,0,0,0.2)" />
      </g>
    </svg>
  );
}

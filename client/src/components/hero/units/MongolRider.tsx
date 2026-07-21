import React from 'react';

export default function MongolRider() {
  return (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="90" cy="130" rx="55" ry="7" fill="rgba(0,0,0,0.3)" />
      
      {/* Horse and Rider with bobbing animation */}
      <g className="gait-body-bob">
        
        {/* Horse Tail (flowing and detailed) */}
        <path d="M50 78 Q28 82 18 96 Q8 110 16 118 Q20 114 24 106 Q30 92 48 84 Z" fill="currentColor" />
        <path d="M45 84 Q28 92 22 105" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />
        <path d="M40 86 Q25 96 19 111" stroke="rgba(0,0,0,0.25)" strokeWidth="1" fill="none" />
        
        {/* Left Hind Leg (further away) */}
        <g className="gait-horse-leg-left">
          <path d="M54 94 Q40 108 46 122 Q48 125 43 128 L35 128 L37 123 Q32 112 44 94 Z" fill="currentColor" />
        </g>
        
        {/* Left Front Leg (further away) */}
        <g className="gait-horse-leg-left">
          <path d="M106 94 Q112 108 118 122 Q120 125 115 127 L107 127 L108 122 Q102 110 98 94 Z" fill="currentColor" />
        </g>
        
        {/* Horse Torso and Neck */}
        <path d="M48 80 Q38 58 58 48 L122 44 Q142 44 148 58 L152 86 L134 96 L50 96 Z" fill="currentColor" />
        
        {/* Horse Neck, Head and Muzzle */}
        <path d="M136 52 Q152 42 161 30 Q167 20 160 16 Q150 14 141 24 L132 46 Z" fill="currentColor" />
        
        {/* Ears */}
        <path d="M156 17 L159 8 L154 13 Z" fill="currentColor" />
        <path d="M152 18 L153 10 L149 14 Z" fill="currentColor" />
        
        {/* Muzzle Detail */}
        <circle cx="157" cy="18" r="1.5" fill="rgba(0,0,0,0.4)" />
        
        {/* Wind-swept Mane */}
        <path d="M141 24 Q148 30 140 38" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
        <path d="M136 34 Q144 40 135 48" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
        
        {/* Stirrup and Leather Strap */}
        <line x1="98" y1="76" x2="94" y2="98" stroke="currentColor" strokeWidth="2" />
        <path d="M90 98 L98 98 L96 102 L92 102 Z" fill="currentColor" />

        {/* Right Hind Leg (closer) */}
        <g className="gait-horse-leg-right">
          <path d="M72 94 Q60 108 65 123 Q67 126 62 129 L54 129 L56 124 Q51 112 60 94 Z" fill="currentColor" />
        </g>
        
        {/* Right Front Leg (closer) */}
        <g className="gait-horse-leg-right">
          <path d="M124 94 Q130 108 136 122 Q138 125 133 127 L125 127 L126 122 Q120 110 116 94 Z" fill="currentColor" />
        </g>
        
        {/* Rider: Deel (Traditional Robe) */}
        <path d="M86 52 L112 50 L115 78 L84 78 Z" fill="currentColor" />
        <path d="M84 78 Q98 74 112 78 L114 84 L82 84 Z" fill="currentColor" /> {/* Robe skirt folds over saddle */}
        <path d="M96 52 Q105 60 102 78" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" /> {/* Robe belt fold */}
        
        {/* Belt / Sash */}
        <rect x="85" y="65" width="28" height="5" fill="rgba(0,0,0,0.3)" />
        
        {/* Rider Head and Malakhai (Fur-trimmed Hat) */}
        <circle cx="98" cy="38" r="9" fill="currentColor" />
        {/* Fur-trimmed Conical Hat */}
        <path d="M88 36 Q98 20 108 36 Z" fill="currentColor" />
        <path d="M86 36 Q98 33 110 36 L108 40 Q98 37 88 40 Z" fill="rgba(0,0,0,0.3)" /> {/* Fur trim */}
        <path d="M89 38 Q84 48 88 50" fill="currentColor" /> {/* Neck flap */}
        
        {/* Rider Legs (in boots) */}
        <path d="M92 76 Q90 88 94 98" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M94 98 L88 100 L94 98 Z" fill="currentColor" /> {/* boot tip */}

        {/* Quiver & Arrow Silhouettes on Back */}
        <g>
          {/* Quiver */}
          <path d="M78 50 L84 44 L90 52 L84 58 Z" fill="rgba(0,0,0,0.3)" />
          {/* Arrows sticking out */}
          <line x1="72" y1="36" x2="80" y2="46" stroke="currentColor" strokeWidth="2" />
          <line x1="75" y1="34" x2="82" y2="44" stroke="currentColor" strokeWidth="2" />
          <line x1="78" y1="32" x2="84" y2="42" stroke="currentColor" strokeWidth="2" />
          {/* Arrow fletching (feathers) details */}
          <path d="M70 34 L73 38 M73 32 L76 36 M76 30 L79 34" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* Bow (Composite Recurve Bow - dynamically drawn) */}
        <g>
          {/* Bow body */}
          <path d="M112 40 Q130 50 128 62 Q125 74 108 76" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Bow tips recurving back */}
          <path d="M112 40 Q110 36 114 34 M108 76 Q106 80 110 82" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Bowstring */}
          <line x1="114" y1="34" x2="118" y2="58" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          <line x1="118" y1="58" x2="110" y2="82" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
          
          {/* Drawn arrow */}
          <line x1="102" y1="58" x2="128" y2="58" stroke="currentColor" strokeWidth="1.5" />
          <path d="M128 58 L124 56 L124 60 Z" fill="currentColor" />
        </g>

        {/* Left Arm holding Bow */}
        <path d="M106 50 Q118 56 122 60" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        
        {/* Right Arm drawing Bowstring */}
        <path d="M96 52 Q108 55 118 58" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />

        {/* Saber at Hip */}
        <path d="M84 72 L70 86 Q68 88 72 87 L82 73 Z" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
        
        {/* Reins (connecting to bridle) */}
        <path d="M102 58 Q124 50 148 30" stroke="rgba(0,0,0,0.3)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
}

import React from 'react';

export default function ArmoredKnight() {
  return (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="90" cy="130" rx="55" ry="7" fill="rgba(0,0,0,0.3)" />
      
      {/* Horse and Rider with bobbing animation */}
      <g className="gait-body-bob">
        
        {/* Horse Tail (long, wavy and detailed) */}
        <path d="M50 78 Q26 84 16 98 Q6 112 14 120 Q18 116 22 108 Q28 92 48 84 Z" fill="currentColor" />
        <path d="M44 84 Q26 94 20 108" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />
        
        {/* Left Hind Leg (further away) */}
        <g className="gait-horse-leg-left">
          <path d="M54 94 Q40 108 46 122 Q48 125 43 128 L35 128 L37 123 Q32 112 44 94 Z" fill="currentColor" />
        </g>
        
        {/* Left Front Leg (further away) */}
        <g className="gait-horse-leg-left">
          <path d="M106 94 Q112 108 118 122 Q120 125 115 127 L107 127 L108 122 Q102 110 98 94 Z" fill="currentColor" />
        </g>
        
        {/* Heavy Destrier Torso & Caparison (Flowing Fabric Barding) */}
        <path d="M48 78 Q36 58 58 48 L122 44 Q142 44 148 58 L152 86 L134 96 L50 96 Z" fill="currentColor" />
        
        {/* Caparison Fabric Folds (over horse chest & flank) */}
        {/* Rear barding fold */}
        <path d="M48 78 Q38 96 42 112 L76 112 L70 78 Z" fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
        <path d="M54 82 Q48 98 52 112 M64 80 Q60 98 63 112" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />
        
        {/* Front barding fold */}
        <path d="M116 78 L114 112 L146 112 Q152 92 146 78 Z" fill="rgba(0,0,0,0.15)" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
        <path d="M124 82 Q126 98 125 112 M136 80 Q138 98 135 112" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />

        {/* Horse Bridle and Reins */}
        <path d="M142 50 Q124 58 100 68" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />

        {/* Horse Armor Headpiece (Chanfron) & Neck Plate */}
        <path d="M136 52 Q152 42 161 30 Q167 20 160 16 Q150 14 141 24 L132 46 Z" fill="currentColor" />
        {/* Metal plate lines */}
        <path d="M144 26 L154 36 M138 34 L146 44" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
        
        {/* Ear guard */}
        <path d="M156 17 L160 6 L153 12 Z" fill="currentColor" />
        
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

        {/* Knight: Torso with Full Plate Cuirass & Faulds */}
        <path d="M86 52 L112 50 L115 78 L84 78 Z" fill="currentColor" />
        {/* Plate ridges on breastplate */}
        <path d="M88 56 Q98 55 110 56 M87 62 Q98 61 112 62 M86 68 Q98 67 113 68" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
        
        {/* Faulds (laminated waist plates) */}
        <path d="M84 78 L115 78 L116 84 L83 84 Z" fill="rgba(0,0,0,0.25)" />
        <line x1="84" y1="81" x2="115" y2="81" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

        {/* Knight Head and Great Helm */}
        <circle cx="98" cy="38" r="9" fill="currentColor" />
        {/* Great Helm (cylindrical medieval helmet) */}
        <rect x="91" y="26" width="15" height="17" rx="1.5" fill="currentColor" />
        {/* Helmet Visor Slit */}
        <rect x="93" y="32" width="11" height="2" fill="rgba(0,0,0,0.4)" />
        {/* Breath holes (ventilation dots) */}
        <circle cx="94" cy="39" r="0.7" fill="rgba(0,0,0,0.4)" />
        <circle cx="97" cy="39" r="0.7" fill="rgba(0,0,0,0.4)" />
        <circle cx="100" cy="39" r="0.7" fill="rgba(0,0,0,0.4)" />
        <circle cx="95" cy="41" r="0.7" fill="rgba(0,0,0,0.4)" />
        <circle cx="98" cy="41" r="0.7" fill="rgba(0,0,0,0.4)" />
        
        {/* Helmet double feather crest (flowing and grand) */}
        <path d="M91 26 Q78 12 64 22 Q76 24 88 27 Z" fill="currentColor" />
        <path d="M95 26 Q86 6 72 12 Q83 17 92 23 Z" fill="currentColor" />
        <path d="M84 21 Q73 14 66 20 M87 18 Q79 10 74 14" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />

        {/* Knight Legs (Plate Greaves & Spurs) */}
        <path d="M92 76 Q90 88 94 98" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M94 98 L88 100 L94 98 Z" fill="currentColor" /> {/* shoe tip */}
        <circle cx="88" cy="100" r="1.5" fill="rgba(0,0,0,0.4)" /> {/* spur star */}

        {/* Left Arm holding Heater Shield */}
        <g>
          {/* Heater Shield outline */}
          <path d="M84 56 Q84 46 95 46 L108 46 Q118 46 118 56 L118 80 Q118 92 101 98 Q84 92 84 80 Z" fill="currentColor" />
          <path d="M88 56 Q88 49 95 49 L107 49 Q114 49 114 56 L114 78 Q114 88 101 93 Q88 88 88 78 Z" fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          {/* Shield Emblem: Heraldic Cross */}
          <path d="M101 49 L101 93 M88 66 L114 66" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        </g>

        {/* Broadsword in Scabbard at Hip */}
        <g>
          <path d="M82 74 L62 96 L66 98 L84 75 Z" fill="currentColor" />
          {/* Crossguard */}
          <line x1="80" y1="72" x2="88" y2="76" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pommel */}
          <circle cx="85" cy="71" r="2.5" fill="currentColor" />
        </g>

        {/* Right Arm holding Lance */}
        <g>
          {/* Plate Shoulder Guard (Paurdron) */}
          <circle cx="106" cy="53" r="6" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          <path d="M104 53 Q114 58 118 64" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        </g>

        {/* Heavy Wooden Lance with Pennon (Flag) */}
        <g>
          {/* Lance shaft */}
          <line x1="112" y1="72" x2="162" y2="8" stroke="currentColor" strokeWidth="3.2" />
          {/* Lance steel tip */}
          <path d="M162 8 L160 2 L165 4 Z" fill="currentColor" />
          {/* Lance hand protection ring (vamplate) */}
          <ellipse cx="118" cy="64" rx="4" ry="7" fill="currentColor" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
          
          {/* Flowing Pennon (heraldic flag) on lance */}
          <path d="M136 40 L112 45 L116 52 L140 47 Z" fill="currentColor" />
          {/* Split tail of pennon */}
          <path d="M112 45 L94 44 L102 49 L90 51 L116 52 Z" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
        </g>
      </g>
    </svg>
  );
}

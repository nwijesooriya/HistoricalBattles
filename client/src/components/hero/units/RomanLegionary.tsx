import React from 'react';

export default function RomanLegionary() {
  return (
    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground shadow */}
      <ellipse cx="50" cy="155" rx="28" ry="4" fill="rgba(0,0,0,0.25)" />

      {/* Back leg — marching gait */}
      <g className="gait-leg-left">
        <path
          d="M42 100 C38 115 36 130 34 140 C33 144 30 146 28 148 L24 148 L24 152 L38 152 L38 148 C37 146 35 144 36 140 C38 130 42 116 46 100 Z"
          fill="currentColor"
        />
      </g>

      {/* Front leg */}
      <g className="gait-leg-right">
        <path
          d="M56 100 C60 115 62 130 64 140 C65 144 68 146 70 148 L74 148 L74 152 L60 152 L60 148 C61 146 63 144 62 140 C60 130 56 116 52 100 Z"
          fill="currentColor"
        />
      </g>

      {/* Tunic skirt / pteruges (leather strips below belt) */}
      <path
        d="M36 96 L36 108 L40 108 L40 96 M44 96 L44 108 L48 108 L48 96 M52 96 L52 108 L56 108 L56 96 M60 96 L60 108 L64 108 L64 96"
        fill="currentColor"
      />

      {/* Torso — lorica segmentata (segmented plate armor) */}
      <path
        d="M34 52 C34 48 40 44 50 44 C60 44 66 48 66 52 L68 96 L32 96 Z"
        fill="currentColor"
      />
      {/* Armor plate lines for detail */}
      <path d="M35 58 L65 58 M34 66 L66 66 M33 74 L67 74 M33 82 L67 82 M34 90 L66 90" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />

      {/* Belt / cingulum */}
      <rect x="32" y="92" width="36" height="5" rx="1" fill="currentColor" />
      <rect x="32" y="92" width="36" height="5" rx="1" fill="rgba(0,0,0,0.25)" />

      {/* Left arm (behind shield) */}
      <path
        d="M34 54 C26 60 22 68 24 76"
        stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"
      />

      {/* Scutum shield (large curved rectangular Roman shield) */}
      <path
        d="M6 44 C16 40 28 42 28 44 L26 118 C26 120 16 122 6 118 Z"
        fill="currentColor"
      />
      {/* Shield boss (metal center) */}
      <ellipse cx="17" cy="80" rx="5" ry="6" fill="rgba(0,0,0,0.25)" />
      <ellipse cx="17" cy="80" rx="2.5" ry="3" fill="currentColor" />
      {/* Shield decoration — vertical stripe + wings */}
      <line x1="17" y1="54" x2="17" y2="108" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

      {/* Gladius (short sword) at right hip */}
      <path
        d="M68 88 L72 86 L78 118 L74 120 Z"
        fill="currentColor"
      />
      <path d="M70 86 L74 84 L72 82 L68 84 Z" fill="currentColor" /> {/* crossguard */}

      {/* Right arm holding pilum */}
      <path
        d="M66 54 C74 60 78 66 76 72"
        stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"
      />

      {/* Pilum (heavy javelin) */}
      <line x1="78" y1="148" x2="78" y2="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="78" y1="18" x2="78" y2="4" stroke="currentColor" strokeWidth="1.5" /> {/* iron shank */}
      <path d="M78 0 L75 6 L81 6 Z" fill="currentColor" /> {/* spear tip */}

      {/* Head & helmet with body bob */}
      <g className="gait-body-bob">
        {/* Neck */}
        <rect x="44" y="40" width="12" height="8" fill="currentColor" />
        
        {/* Head */}
        <ellipse cx="50" cy="32" rx="10" ry="11" fill="currentColor" />
        
        {/* Galea helmet dome */}
        <path d="M40 30 C40 18 60 18 60 30 Z" fill="currentColor" />
        
        {/* Helmet browridge */}
        <path d="M38 32 L62 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        
        {/* Cheek guards */}
        <path d="M40 34 C38 38 39 42 42 44" fill="currentColor" />
        <path d="M60 34 C62 38 61 42 58 44" fill="currentColor" />
        
        {/* Neck guard (back of helmet) */}
        <path d="M60 32 C64 34 66 38 64 42" fill="currentColor" />
        
        {/* Crest / plume — large and flowing */}
        <path
          d="M38 20 C42 6 50 2 58 4 C66 6 70 14 62 20 L50 18 Z"
          fill="currentColor"
        />
        {/* Plume holder ridge */}
        <line x1="50" y1="18" x2="50" y2="22" stroke="currentColor" strokeWidth="3" />
      </g>
    </svg>
  );
}

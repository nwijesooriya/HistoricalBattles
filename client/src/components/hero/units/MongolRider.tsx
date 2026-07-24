import React from 'react';

export default function MongolRider() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground shadow */}
      <ellipse cx="100" cy="142" rx="60" ry="6" fill="rgba(0,0,0,0.25)" />

      <g className="gait-body-bob">
        {/* ═══ HORSE ═══ */}

        {/* Horse tail — flowing */}
        <path
          d="M28 72 C14 68 4 80 8 94 C10 100 16 104 22 100 C18 92 16 84 24 78 Z"
          fill="currentColor"
        />

        {/* Hind legs (far pair) */}
        <g className="gait-horse-leg-left">
          <path
            d="M50 104 C44 114 40 124 38 132 C37 136 34 138 32 140 L30 140 L30 143 L42 143 L42 140 C41 138 40 136 40 132 C42 124 46 114 52 104 Z"
            fill="currentColor"
          />
        </g>

        {/* Front legs (far pair) */}
        <g className="gait-horse-leg-left">
          <path
            d="M120 104 C126 114 130 124 132 132 C133 136 136 138 138 140 L140 140 L140 143 L128 143 L128 140 C129 138 130 136 130 132 C128 124 124 114 118 104 Z"
            fill="currentColor"
          />
        </g>

        {/* Horse main body — large, muscular barrel shape */}
        <path
          d="M36 68 C30 52 44 40 62 38 L130 36 C148 36 160 44 158 58 L162 86 C162 100 152 108 140 108 L50 108 C38 108 30 100 32 86 Z"
          fill="currentColor"
        />

        {/* Horse chest muscles / shoulder detail */}
        <path d="M140 50 C146 56 148 66 146 78" stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />

        {/* Saddle */}
        <path
          d="M82 38 C82 32 118 32 118 38 L120 56 L80 56 Z"
          fill="rgba(0,0,0,0.2)"
        />
        {/* Saddle blanket edge */}
        <path d="M78 56 L122 56" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />

        {/* Horse neck — thick, arched */}
        <path
          d="M152 50 C160 40 168 28 170 18 C171 12 168 8 164 6 C158 4 152 6 150 12 L144 36 Z"
          fill="currentColor"
        />

        {/* Horse head */}
        <path
          d="M168 14 C172 10 178 8 180 12 C182 16 180 22 176 24 C174 26 170 24 168 20 Z"
          fill="currentColor"
        />
        {/* Ears */}
        <path d="M170 6 L174 -2 L168 4 Z" fill="currentColor" />
        <path d="M166 8 L168 0 L164 6 Z" fill="currentColor" />
        {/* Eye */}
        <circle cx="176" cy="16" r="1.5" fill="rgba(0,0,0,0.4)" />
        {/* Nostril */}
        <circle cx="180" cy="18" r="1" fill="rgba(0,0,0,0.3)" />

        {/* Mane — flowing */}
        <path
          d="M150 14 C154 20 152 28 148 34 C146 38 148 30 152 24 C156 18 152 10 150 14 Z"
          fill="rgba(0,0,0,0.15)"
        />

        {/* Bridle / reins */}
        <path d="M176 20 C172 26 160 36 140 52" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />

        {/* Hind legs (near pair) */}
        <g className="gait-horse-leg-right">
          <path
            d="M64 104 C58 114 54 124 52 132 C51 136 48 138 46 140 L44 140 L44 143 L56 143 L56 140 C55 138 54 136 54 132 C56 124 60 114 66 104 Z"
            fill="currentColor"
          />
        </g>

        {/* Front legs (near pair) */}
        <g className="gait-horse-leg-right">
          <path
            d="M134 104 C140 114 144 124 146 132 C147 136 150 138 152 140 L154 140 L154 143 L142 143 L142 140 C143 138 144 136 144 132 C142 124 138 114 132 104 Z"
            fill="currentColor"
          />
        </g>

        {/* Stirrup */}
        <path d="M94 56 L92 78 L88 80 L96 80 L94 78 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />

        {/* ═══ RIDER ═══ */}

        {/* Rider torso — deel (Mongolian robe) */}
        <path
          d="M88 24 C88 18 112 18 112 24 L116 58 L84 58 Z"
          fill="currentColor"
        />
        {/* Deel fold line and belt */}
        <path d="M94 24 L98 56" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" />
        <rect x="84" y="46" width="32" height="4" rx="1" fill="rgba(0,0,0,0.25)" />

        {/* Rider legs (over horse sides) */}
        <path d="M88 52 C86 62 84 72 88 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M112 52 C114 62 116 72 112 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* Rider head */}
        <ellipse cx="100" cy="12" rx="8" ry="9" fill="currentColor" />

        {/* Mongolian fur hat */}
        <path
          d="M90 10 C90 0 110 0 110 10 L112 16 L88 16 Z"
          fill="currentColor"
        />
        {/* Hat fur brim */}
        <path d="M86 16 L114 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        {/* Hat ear flap */}
        <path d="M88 14 C84 18 84 24 88 28" fill="currentColor" />

        {/* Left arm — extended, holding bow */}
        <path
          d="M112 26 C120 30 130 34 136 36"
          stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"
        />

        {/* Right arm — drawing bowstring */}
        <path
          d="M88 26 C84 32 86 38 92 42"
          stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"
        />

        {/* Composite bow */}
        <path
          d="M132 22 C142 30 142 44 132 52"
          stroke="currentColor" strokeWidth="3" fill="none"
        />
        {/* Recurve tips */}
        <path d="M132 22 C128 18 130 16 134 18" fill="currentColor" />
        <path d="M132 52 C128 56 130 58 134 56" fill="currentColor" />
        {/* Bowstring */}
        <line x1="134" y1="18" x2="134" y2="56" stroke="currentColor" strokeWidth="1" />

        {/* Arrow nocked */}
        <line x1="92" y1="38" x2="136" y2="38" stroke="currentColor" strokeWidth="1.5" />
        <path d="M136 38 L132 36 L132 40 Z" fill="currentColor" />

        {/* Quiver on back */}
        <path
          d="M80 18 L76 14 L72 18 L72 44 L80 44 Z"
          fill="currentColor"
        />
        {/* Arrow shafts visible in quiver */}
        <line x1="74" y1="14" x2="70" y2="6" stroke="currentColor" strokeWidth="1.5" />
        <line x1="76" y1="14" x2="73" y2="4" stroke="currentColor" strokeWidth="1.5" />
        <line x1="78" y1="14" x2="76" y2="5" stroke="currentColor" strokeWidth="1.5" />

        {/* Saber at hip */}
        <path
          d="M84 50 C78 58 72 66 68 74 C66 78 68 80 72 78 L84 54 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

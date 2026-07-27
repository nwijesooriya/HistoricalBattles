import React from 'react';

export default function ArmoredKnight() {
  return (
    <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground shadow */}
      <ellipse cx="100" cy="142" rx="60" ry="6" fill="rgba(0,0,0,0.25)" />

      <g className="gait-body-bob">
        {/* ═══ HEAVY DESTRIER (Warhorse) ═══ */}

        {/* Horse tail — long and thick */}
        <path
          d="M28 72 C10 64 0 78 4 96 C6 104 14 108 20 104 C16 96 14 86 22 78 Z"
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

        {/* Horse main body — heavy destrier, massive barrel */}
        <path
          d="M36 68 C28 50 42 38 62 36 L130 34 C150 34 164 42 162 58 L166 88 C166 102 154 110 142 110 L50 110 C36 110 28 102 30 88 Z"
          fill="currentColor"
        />

        {/* Caparison / barding (horse armor cloth) */}
        <path
          d="M42 78 C38 88 36 98 38 108 L62 108 C60 98 58 88 56 78 Z"
          fill="rgba(0,0,0,0.12)"
        />
        <path
          d="M120 78 C122 88 124 98 126 108 L150 108 C148 98 146 88 142 78 Z"
          fill="rgba(0,0,0,0.12)"
        />
        {/* Caparison scalloped edge detail */}
        <path d="M38 108 C42 112 46 108 50 112 C54 108 58 112 62 108" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
        <path d="M126 108 C130 112 134 108 138 112 C142 108 146 112 150 108" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />

        {/* Saddle — high-backed war saddle */}
        <path
          d="M80 36 C78 28 122 28 120 36 L122 58 L78 58 Z"
          fill="rgba(0,0,0,0.2)"
        />
        {/* Cantle (back of saddle) */}
        <path d="M80 36 C78 30 82 26 86 28" fill="currentColor" />
        {/* Pommel (front of saddle) */}
        <path d="M120 36 C122 30 118 26 114 28" fill="currentColor" />

        {/* Horse neck — thick, powerful, arched */}
        <path
          d="M154 48 C162 38 170 26 172 16 C173 10 170 6 166 4 C160 2 154 4 152 10 L146 34 Z"
          fill="currentColor"
        />

        {/* Chanfron (horse face armor) */}
        <path
          d="M170 12 C174 8 180 6 182 10 C184 14 182 20 178 22 C176 24 172 22 170 18 Z"
          fill="currentColor"
        />
        {/* Chanfron metal plate line */}
        <path d="M172 10 L178 16" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
        {/* Ear guard */}
        <path d="M172 4 L176 -4 L170 2 Z" fill="currentColor" />
        <path d="M168 6 L170 -2 L166 4 Z" fill="currentColor" />
        {/* Eye */}
        <circle cx="178" cy="14" r="1.5" fill="rgba(0,0,0,0.4)" />

        {/* Crinet (neck armor plates) */}
        <path d="M150 16 L156 20 M148 22 L154 26 M146 28 L152 32" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />

        {/* Mane (between armor plates) */}
        <path
          d="M152 12 C156 18 154 26 150 32"
          stroke="rgba(0,0,0,0.15)" strokeWidth="3" fill="none"
        />

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

        {/* Stirrups */}
        <path d="M92 58 L90 80 L86 82 L94 82 L92 80 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />

        {/* ═══ KNIGHT ═══ */}

        {/* Knight torso — full plate cuirass */}
        <path
          d="M86 22 C86 16 114 16 114 22 L118 60 L82 60 Z"
          fill="currentColor"
        />
        {/* Breastplate ridge lines */}
        <path d="M88 28 L112 28 M87 36 L113 36 M86 44 L114 44 M86 52 L114 52" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

        {/* Fauld (laminated waist armor) */}
        <path
          d="M82 56 L118 56 L120 66 L80 66 Z"
          fill="currentColor"
        />
        <path d="M82 60 L118 60 M81 64 L119 64" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

        {/* Knight legs (greaves over horse) */}
        <path d="M86 58 C84 68 82 76 86 82" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M114 58 C116 68 118 76 114 82" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Spurs */}
        <path d="M82 82 L78 84 L82 86" fill="currentColor" />
        <path d="M118 82 L122 84 L118 86" fill="currentColor" />

        {/* Pauldrons (shoulder armor) — big and rounded */}
        <ellipse cx="82" cy="24" rx="8" ry="6" fill="currentColor" />
        <ellipse cx="118" cy="24" rx="8" ry="6" fill="currentColor" />
        <path d="M76 22 L88 22" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <path d="M112 22 L124 22" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />

        {/* Left arm — holding shield */}
        <path
          d="M82 26 C74 32 70 40 72 48"
          stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"
        />

        {/* Heater shield */}
        <path
          d="M62 28 C62 22 78 22 78 28 L78 58 C78 68 70 76 70 76 C70 76 62 68 62 58 Z"
          fill="currentColor"
        />
        {/* Shield heraldic cross */}
        <line x1="70" y1="28" x2="70" y2="72" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" />
        <line x1="62" y1="46" x2="78" y2="46" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" />

        {/* Right arm — holding lance */}
        <path
          d="M118 26 C126 30 130 36 128 44"
          stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none"
        />

        {/* Lance — long, heavy */}
        <line x1="130" y1="120" x2="168" y2="0" stroke="currentColor" strokeWidth="3.5" />
        {/* Lance tip */}
        <path d="M168 0 L164 8 L172 8 Z" fill="currentColor" />
        {/* Vamplate (hand guard cone) */}
        <ellipse cx="134" cy="108" rx="4" ry="8" fill="currentColor" />

        {/* Pennon (flag on lance) */}
        <path
          d="M156 28 C148 26 140 30 136 36 C142 34 148 32 152 30 L156 28 Z"
          fill="currentColor"
        />
        {/* Pennon tail fork */}
        <path d="M136 36 C132 38 128 36 124 40" stroke="currentColor" strokeWidth="2" fill="none" />

        {/* Broadsword in scabbard at hip */}
        <path
          d="M80 54 C74 62 68 72 64 80 C62 84 64 86 68 84 C74 76 78 66 82 56 Z"
          fill="currentColor"
        />

        {/* Knight head — great helm */}
        <path
          d="M90 6 C90 -2 110 -2 110 6 L112 20 L88 20 Z"
          fill="currentColor"
        />
        {/* Visor slit */}
        <rect x="92" y="10" width="16" height="2.5" rx="1" fill="rgba(0,0,0,0.35)" />
        {/* Breathing holes */}
        <circle cx="94" cy="16" r="0.8" fill="rgba(0,0,0,0.3)" />
        <circle cx="97" cy="16" r="0.8" fill="rgba(0,0,0,0.3)" />
        <circle cx="100" cy="16" r="0.8" fill="rgba(0,0,0,0.3)" />
        <circle cx="103" cy="16" r="0.8" fill="rgba(0,0,0,0.3)" />
        <circle cx="106" cy="16" r="0.8" fill="rgba(0,0,0,0.3)" />

        {/* Grand double plume / crest */}
        <path
          d="M92 -2 C82 -14 68 -10 62 0 C70 -4 80 -4 90 -2 Z"
          fill="currentColor"
        />
        <path
          d="M96 -2 C86 -18 74 -16 66 -6 C76 -10 86 -8 94 -2 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

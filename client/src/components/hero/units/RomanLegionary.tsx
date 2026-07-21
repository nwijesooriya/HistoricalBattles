import React from 'react';

export default function RomanLegionary() {
  return (
    <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow under feet */}
      <ellipse cx="60" cy="172" rx="35" ry="5" fill="rgba(0,0,0,0.3)" />
      
      {/* Left leg (further back) */}
      <g className="gait-leg-left">
        {/* Thigh, knee, calf, and sandal (caliga) */}
        <path d="M48 110 Q40 130 43 145 Q36 155 38 168 L30 170 L30 173 L46 173 L44 167 Q47 155 49 145 Q47 130 52 110 Z" fill="currentColor" />
        {/* Caliga sandal straps details (subtle cuts) */}
        <path d="M38 163 L45 163" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
        <path d="M36 167 L43 167" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      </g>
      
      {/* Right leg (closer) */}
      <g className="gait-leg-right">
        {/* Thigh, knee, calf, and sandal */}
        <path d="M68 110 Q74 130 71 145 Q78 155 76 168 L84 170 L84 173 L68 173 L70 167 Q67 155 65 145 Q67 130 64 110 Z" fill="currentColor" />
        {/* Caliga sandal straps details */}
        <path d="M76 163 L83 163" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
        <path d="M78 167 L85 167" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      </g>

      {/* Gladius scabbard & belt hanging (behind shield) */}
      <path d="M66 102 L76 130 L80 129 L70 101 Z" fill="currentColor" />
      <circle cx="68" cy="103" r="3" fill="rgba(0,0,0,0.3)" />

      {/* Torso & Segmented Armor (Lorica Segmentata) */}
      <g>
        {/* Tunic undergarment showing at bottom */}
        <path d="M42 112 L74 112 L76 122 L40 122 Z" fill="currentColor" />
        {/* Pteruges (leather loin guards hanging from belt) */}
        <path d="M45 112 L47 122 M51 112 L53 122 M57 112 L59 122 M63 112 L65 122 M69 112 L71 122" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" />
        
        {/* Main cuirass */}
        <path d="M44 65 Q58 63 72 65 L76 112 L40 112 Z" fill="currentColor" />
        
        {/* Lorica Segmentata overlapping plates */}
        <path d="M43 72 Q58 70 73 72" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        <path d="M42 80 Q58 78 74 80" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        <path d="M41 88 Q58 86 75 88" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        <path d="M40 96 Q58 94 76 96" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        
        {/* Belt (Cingulum) */}
        <path d="M40 106 Q58 104 76 106" stroke="rgba(0,0,0,0.4)" strokeWidth="5" />
        {/* Belt apron straps hanging down */}
        <path d="M54 108 L54 122 M62 108 L62 122" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />
      </g>

      {/* Left Arm holding Shield */}
      <path d="M44 70 Q30 80 34 92" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />

      {/* Curved Roman Shield (Scutum) */}
      <g>
        {/* Outer shield body */}
        <path d="M16 60 Q34 56 52 60 L48 130 Q30 126 12 130 Z" fill="currentColor" />
        {/* Inner border inlay */}
        <path d="M19 63 Q34 60 49 63 L45 127 Q30 124 15 127 Z" stroke="rgba(0,0,0,0.2)" strokeWidth="2.5" fill="none" />
        
        {/* Central Metal Boss (Umbo) */}
        <circle cx="32" cy="95" r="8" fill="rgba(0,0,0,0.3)" />
        <circle cx="32" cy="95" r="4" fill="currentColor" />
        
        {/* Winged lightning bolts / decorative lines on shield */}
        <path d="M20 85 L28 92 L20 99 M44 85 L36 92 L44 99" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
        <line x1="32" y1="75" x2="32" y2="115" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
      </g>

      {/* Right Arm holding Spear (Pilum) */}
      <g>
        {/* Arm path */}
        <path d="M72 70 Q88 78 86 88" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        {/* Hand grip */}
        <circle cx="86" cy="88" r="3.5" fill="currentColor" />
      </g>

      {/* Spear (Pilum) */}
      <g>
        {/* Long wooden shaft */}
        <line x1="86" y1="160" x2="86" y2="25" stroke="currentColor" strokeWidth="2.5" />
        {/* Iron shank (thinner iron section at top) */}
        <line x1="86" y1="25" x2="86" y2="8" stroke="currentColor" strokeWidth="1.2" />
        {/* Spearhead point */}
        <path d="M86 4 L83 9 L89 9 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        {/* Weighted lead ball at junction (subtle) */}
        <circle cx="86" cy="25" r="2.5" fill="currentColor" />
      </g>

      {/* Head with Galea Helmet & Flowing Crest */}
      <g className="gait-body-bob">
        {/* Neck */}
        <path d="M54 50 L64 50 L64 65 L54 65 Z" fill="currentColor" />
        
        {/* Head silhouette */}
        <circle cx="59" cy="46" r="11" fill="currentColor" />
        
        {/* Galea Helmet */}
        {/* Dome */}
        <path d="M48 44 Q59 29 70 44 Z" fill="currentColor" />
        {/* Browband / visor ridge */}
        <path d="M46 44 Q59 42 72 44" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Neck guard at back */}
        <path d="M70 44 Q77 48 76 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Cheek Guard */}
        <path d="M52 46 Q50 56 55 58" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        
        {/* Flowing Crest (Helmet plume) */}
        {/* Holder */}
        <line x1="59" y1="32" x2="59" y2="29" stroke="currentColor" strokeWidth="3" />
        {/* Large, detailed, wavy plumes */}
        <path d="M42 28 Q50 14 62 18 Q72 16 80 24 Q68 25 59 28 Z" fill="currentColor" />
        {/* Plume texture lines */}
        <path d="M48 24 Q57 19 68 21" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
        <path d="M52 26 Q59 22 74 24" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

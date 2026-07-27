'use client';

import { useState, useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import RomanLegionary from './units/RomanLegionary';
import MongolRider from './units/MongolRider';
import ArmoredKnight from './units/ArmoredKnight';

type UnitType = 'roman' | 'mongol' | 'knight';
type Direction = 'left-to-right' | 'right-to-left';

const units: { type: UnitType; component: React.FC; speed: 'slow' | 'fast' }[] = [
  { type: 'roman', component: RomanLegionary, speed: 'slow' },
  { type: 'mongol', component: MongolRider, speed: 'fast' },
  { type: 'knight', component: ArmoredKnight, speed: 'fast' },
];

function getRandomUnit() {
  return units[Math.floor(Math.random() * units.length)];
}

function getRandomDirection(): Direction {
  return Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
}

function subscribeToMotion() {
  return () => {};
}

function getMotionPreference() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HistoricalProcession() {
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getMotionPreference, () => false);
  const [mounted, setMounted] = useState(false);
  const [unit, setUnit] = useState(units[0]);
  const [direction, setDirection] = useState<Direction>('left-to-right');

  useEffect(() => {
    setMounted(true);
    setUnit(getRandomUnit());
    setDirection(getRandomDirection());
  }, []);

  if (!mounted) {
    return <div className="procession-container" aria-hidden="true" />;
  }

  const UnitComponent = unit.component;
  const speedClass = unit.speed === 'slow' ? 'slow' : 'fast';

  if (reducedMotion) {
    return (
      <div className="procession-container" aria-hidden="true">
        <div className={`procession-unit ${direction}`} style={{ position: 'absolute', bottom: '4%', left: '10%', width: 'clamp(120px, 18vw, 220px)' }}>
          <UnitComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="procession-container" aria-hidden="true">
      {/* Motion trail 2 (furthest behind, most blurred) */}
      <div className={`procession-unit ${direction} ${speedClass} procession-trail-2`}>
        <UnitComponent />
      </div>

      {/* Motion trail 1 (closer, slightly blurred) */}
      <div className={`procession-unit ${direction} ${speedClass} procession-trail-1`}>
        <UnitComponent />
      </div>

      {/* The main unit */}
      <div className={`procession-unit ${direction} ${speedClass}`}>
        <UnitComponent />
      </div>
    </div>
  );
}

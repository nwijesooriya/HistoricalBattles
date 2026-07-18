'use client';

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
  const unit = getRandomUnit();
  const direction = getRandomDirection();

  if (!unit) return null;

  const UnitComponent = unit.component;
  const speedClass = unit.speed === 'slow' ? 'slow' : 'fast';

  if (reducedMotion) {
    return (
      <div className="procession-container" aria-hidden="true">
        <div className={`procession-unit ${direction}`} style={{ position: 'relative', bottom: 'auto', left: '10%', width: 'clamp(80px, 12vw, 140px)' }}>
          <UnitComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="procession-container" aria-hidden="true">
      {/* Dust particles behind the unit */}
      <div className="procession-dust">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="dust-particle" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>

      {/* The marching unit */}
      <div className={`procession-unit ${direction} ${speedClass}`}>
        <UnitComponent />
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Era } from '@/types';

interface EraCardProps {
  era: Era;
  regionSlug: string;
}

/**
 * Formats a year number for display.
 * Negative years become "X BCE", positive become "X CE".
 */
function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

export default function EraCard({ era, regionSlug }: EraCardProps) {
  return (
    <Link
      href={`/region/${regionSlug}/${era.slug}`}
      className="era-card"
      id={`era-${era.slug}`}
    >
      {/* Year range badge */}
      <div className="era-card-badge">
        {formatYear(era.startYear)} — {formatYear(era.endYear)}
      </div>

      {/* Content */}
      <div className="era-card-content">
        <h3 className="era-card-title">{era.name}</h3>
        <p className="era-card-description">{era.description}</p>

        {/* Stats placeholder — will be populated in Phase 2+ */}
        <div className="era-card-stats">
          <div className="era-card-stat">
            <span className="era-card-stat-icon">⚔️</span>
            <span className="era-card-stat-text">Battles</span>
          </div>
          <div className="era-card-stat">
            <span className="era-card-stat-icon">🏴</span>
            <span className="era-card-stat-text">Wars</span>
          </div>
          <div className="era-card-stat">
            <span className="era-card-stat-icon">👑</span>
            <span className="era-card-stat-text">Kingdoms</span>
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="era-card-arrow">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

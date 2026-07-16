import Link from 'next/link';
import { Region } from '@/types';

const regionIcons: Record<string, string> = {
  europe: '🏰',
  asia: '🏯',
  africa: '🌍',
  'middle-east': '☪️',
  americas: '🗽',
  oceania: '🌊',
};

interface RegionCardProps {
  region: Region;
}

export default function RegionCard({ region }: RegionCardProps) {
  const icon = regionIcons[region.slug] || '🌐';

  return (
    <Link href={`/region/${region.slug}`} className="region-card" id={`region-${region.slug}`}>
      {/* Background image */}
      {region.image?.url && (
        <div className="region-card-image" style={{ backgroundImage: `url(${region.image.url})` }} />
      )}

      {/* Gradient overlay for readability */}
      <div className="region-card-overlay" />

      {/* Content */}
      <div className="region-card-content">
        <span className="region-card-icon">{icon}</span>
        <h2 className="region-card-title">{region.name}</h2>
        <p className="region-card-description">{region.description}</p>
        <div className="region-card-cta">
          <span>Explore Region</span>
          <svg
            className="region-card-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Decorative border glow */}
      <div className="region-card-glow" />
    </Link>
  );
}

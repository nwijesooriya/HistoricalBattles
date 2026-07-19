import { getRegions } from '@/lib/api';
import RegionCard from '@/components/cards/RegionCard';
import { Metadata } from 'next';
import { Region } from '@/types';
import HistoricalProcession from '@/components/hero/HistoricalProcession';

export const metadata: Metadata = {
  title: 'Historical Atlas — Explore World War History',
  description:
    'Explore the battles, wars, campaigns, and commanders that shaped world history. Browse by region, era, and kingdom.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let regions: Region[] = [];
  let error: string | null = null;

  try {
    regions = await getRegions();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load regions';
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <HistoricalProcession />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-accent">Explore</span> the History
            <br />
            of World Warfare
          </h1>
          <p className="hero-subtitle">
            Journey through millennia of military history — from ancient empires to modern
            conflicts. Discover the battles, commanders, and strategies that shaped
            civilizations.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{regions.length}</span>
              <span className="hero-stat-label">Regions</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">9</span>
              <span className="hero-stat-label">Historical Eras</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">5000+</span>
              <span className="hero-stat-label">Years of History</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Choose a Region</h2>
          <p className="section-subtitle">
            Select a region to explore its military history through different eras
          </p>
        </div>

        {error ? (
          <div className="error-card">
            <p className="error-text">⚠️ {error}</p>
            <p className="error-hint">
              Make sure the API server is running on{' '}
              <code>localhost:5000</code>
            </p>
          </div>
        ) : (
          <div className="regions-grid">
            {regions.map((region) => (
              <RegionCard key={region._id} region={region} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

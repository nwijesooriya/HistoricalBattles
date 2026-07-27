import { getHomepageSettings, getRegions } from '@/lib/api';
import { createDefaultHomepageSettings } from '@/lib/homepage';
import RegionCard from '@/components/cards/RegionCard';
import { Metadata } from 'next';
import { HomepageSettings, Region } from '@/types';
import HomepageHero from '@/components/hero/HomepageHero';
// import HistoricalProcession from '@/components/hero/HistoricalProcession'; // Disabled - replaced with Lottie animation

export const metadata: Metadata = {
  title: 'Historical Atlas — Explore World War History',
  description:
    'Explore the battles, wars, campaigns, and commanders that shaped world history. Browse by region, era, and kingdom.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let regions: Region[] = [];
  let homepageSettings: HomepageSettings = createDefaultHomepageSettings();
  let error: string | null = null;

  try {
    regions = await getRegions();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load regions';
  }

  try {
    homepageSettings = await getHomepageSettings();
  } catch {
    homepageSettings = createDefaultHomepageSettings();
  }

  return (
    <>
      <HomepageHero settings={homepageSettings} />

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

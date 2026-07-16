import { getRegionBySlug, getErasByRegion } from '@/lib/api';
import EraCard from '@/components/cards/EraCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Era } from '@/types';

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const region = await getRegionBySlug(slug);
    return {
      title: `${region.name} — Historical Atlas`,
      description: `Explore the military history of ${region.name} across different historical eras. ${region.description}`,
    };
  } catch {
    return { title: 'Region Not Found — Historical Atlas' };
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;

  let region;
  let eras: Era[] = [];
  let error = null;

  try {
    region = await getRegionBySlug(slug);
    eras = await getErasByRegion(region._id);
  } catch (e) {
    if (e instanceof Error && e.message.includes('not found')) {
      notFound();
    }
    error = e instanceof Error ? e.message : 'Failed to load data';
  }

  if (!region) {
    return notFound();
  }

  return (
    <>
      {/* Region Hero */}
      <section className="region-hero">
        {region.image?.url && (
          <div className="region-hero-image" style={{ backgroundImage: `url(${region.image.url})` }} />
        )}
        <div className="region-hero-bg" />
        <div className="region-hero-content">
          <h1 className="region-hero-title">{region.name}</h1>
          <p className="region-hero-description">{region.description}</p>
          <div className="region-hero-meta">
            <span className="region-hero-badge">
              {eras.length} Historical Era{eras.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Eras Grid */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Historical Eras</h2>
          <p className="section-subtitle">
            Explore the military history of {region.name} through these historical periods
          </p>
        </div>

        {error ? (
          <div className="error-card">
            <p className="error-text">⚠️ {error}</p>
          </div>
        ) : eras.length === 0 ? (
          <div className="empty-card">
            <p className="empty-text">No eras found for this region yet.</p>
          </div>
        ) : (
          <div className="eras-grid">
            {eras.map((era) => (
              <EraCard key={era._id} era={era} regionSlug={region.slug} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

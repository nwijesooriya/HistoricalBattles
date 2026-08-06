import { notFound } from 'next/navigation';
import {
  getRegionBySlug,
  getEraBySlug,
  getKingdomsByEra,
  getWarsByEra,
  getBattlesByEra,
} from '@/lib/api';
import EraDetailsView from '@/components/EraDetailsView';
import { Metadata } from 'next';
import { Region, Era, Kingdom, War, Battle } from '@/types';

export const dynamic = 'force-dynamic';

interface EraPageProps {
  params: Promise<{ slug: string; eraSlug: string }>;
}

export async function generateMetadata({ params }: EraPageProps): Promise<Metadata> {
  const { slug, eraSlug } = await params;
  try {
    const region = await getRegionBySlug(slug);
    const era = await getEraBySlug(eraSlug);
    return {
      title: `${era.name} in ${region.name} — Historical Atlas`,
      description: `Explore the Kingdoms, Wars, and Battles of the ${era.name} in ${region.name}. ${era.description}`,
    };
  } catch {
    return { title: 'Era Details — Historical Atlas' };
  }
}

export default async function EraPage({ params }: EraPageProps) {
  const { slug, eraSlug } = await params;

  let region: Region;
  let era: Era;
  let kingdoms: Kingdom[] = [];
  let wars: War[] = [];
  let battles: Battle[] = [];

  try {
    region = await getRegionBySlug(slug);
    era = await getEraBySlug(eraSlug);

    if (!region || !era) {
      return notFound();
    }

    const [allKingdoms, allWars, allBattles] = await Promise.all([
      getKingdomsByEra(era._id),
      getWarsByEra(era._id),
      getBattlesByEra(era._id),
    ]);

    const getRefId = (ref: any) => {
      if (!ref) return '';
      return typeof ref === 'string' ? ref : ref._id;
    };

    // Filter to display only kingdoms, wars, and battles belonging to the current region
    kingdoms = allKingdoms.filter((k) => getRefId(k.regionId) === region._id);
    wars = allWars.filter((w) => getRefId(w.regionId) === region._id);
    battles = allBattles.filter((b) => getRefId(b.regionId) === region._id);
  } catch (error) {
    console.error('Failed to fetch era page details:', error);
    return notFound();
  }

  return (
    <EraDetailsView
      region={region}
      era={era}
      kingdoms={kingdoms}
      wars={wars}
      battles={battles}
    />
  );
}

import { notFound } from 'next/navigation';
import { getRegionBySlug, getEraBySlug, getKingdomsByEra } from '@/lib/api';
import ItemDetailArticle from '@/components/ItemDetailArticle';

export const dynamic = 'force-dynamic';

interface KingdomDetailPageProps {
  params: Promise<{ slug: string; eraSlug: string; kingdomSlug: string }>;
}

export default async function KingdomDetailPage({ params }: KingdomDetailPageProps) {
  const { slug, eraSlug, kingdomSlug } = await params;

  const region = await getRegionBySlug(slug);
  const era = await getEraBySlug(eraSlug);
  if (!region || !era) return notFound();

  const kingdoms = await getKingdomsByEra(era._id);
  const item = kingdoms.find((k) => k.slug === kingdomSlug);
  if (!item) return notFound();

  return <ItemDetailArticle region={region} era={era} type="kingdom" item={item} />;
}

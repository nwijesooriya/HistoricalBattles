import { notFound } from 'next/navigation';
import { getRegionBySlug, getEraBySlug, getBattlesByEra } from '@/lib/api';
import ItemDetailArticle from '@/components/ItemDetailArticle';

export const dynamic = 'force-dynamic';

interface BattleDetailPageProps {
  params: Promise<{ slug: string; eraSlug: string; battleSlug: string }>;
}

export default async function BattleDetailPage({ params }: BattleDetailPageProps) {
  const { slug, eraSlug, battleSlug } = await params;

  const region = await getRegionBySlug(slug);
  const era = await getEraBySlug(eraSlug);
  if (!region || !era) return notFound();

  const battles = await getBattlesByEra(era._id);
  const item = battles.find((b) => b.slug === battleSlug);
  if (!item) return notFound();

  return <ItemDetailArticle region={region} era={era} type="battle" item={item} />;
}

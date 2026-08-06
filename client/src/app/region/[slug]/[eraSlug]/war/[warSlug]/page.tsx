import { notFound } from 'next/navigation';
import { getRegionBySlug, getEraBySlug, getWarsByEra } from '@/lib/api';
import ItemDetailArticle from '@/components/ItemDetailArticle';

export const dynamic = 'force-dynamic';

interface WarDetailPageProps {
  params: Promise<{ slug: string; eraSlug: string; warSlug: string }>;
}

export default async function WarDetailPage({ params }: WarDetailPageProps) {
  const { slug, eraSlug, warSlug } = await params;

  const region = await getRegionBySlug(slug);
  const era = await getEraBySlug(eraSlug);
  if (!region || !era) return notFound();

  const wars = await getWarsByEra(era._id);
  const item = wars.find((w) => w.slug === warSlug);
  if (!item) return notFound();

  return <ItemDetailArticle region={region} era={era} type="war" item={item} />;
}

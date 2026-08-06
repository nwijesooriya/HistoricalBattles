import Link from 'next/link';
import { Region, Era, Kingdom, War, Battle } from '@/types';

type DetailType = 'kingdom' | 'war' | 'battle';

interface ItemDetailArticleProps {
  region: Region;
  era: Era;
  type: DetailType;
  item: Kingdom | War | Battle;
}

function formatYear(year: number | string | undefined): string {
  if (year === undefined || year === null || year === '') return '—';
  const numericYear = typeof year === 'string' ? parseInt(year, 10) : year;
  if (isNaN(numericYear)) return String(year);
  if (numericYear < 0) return `${Math.abs(numericYear)} BCE`;
  return `${numericYear} CE`;
}

/**
 * Removes a redundant "background" heading from article descriptions
 * when it overlaps visually with the "At a Glance" overview panel.
 */
function stripRedundantHeading(html: string): string {
  return html.replace(/<h([1-6])[^>]*>\s*background\s*<\/h\1>/gi, '');
}

const TYPE_META: Record<DetailType, { label: string; emoji: string; accent: string }> = {
  kingdom: { label: 'Historical Kingdom', emoji: '👑', accent: 'text-yellow-500' },
  war: { label: 'Historical Conflict', emoji: '🏴', accent: 'text-red-400' },
  battle: { label: 'Notable Battle', emoji: '⚔️', accent: 'text-amber-500' },
};

export default function ItemDetailArticle({
  region,
  era,
  type,
  item,
}: ItemDetailArticleProps) {
  const meta = TYPE_META[type];
  const heroImage = item.image?.url || region.image?.url || era.image?.url;
  const isBattle = type === 'battle';
  const battle = item as Battle;

  return (
    <article className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Breadcrumb / Back navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/region/${region.slug}`} className="hover:text-[var(--color-accent)] transition-colors">{region.name}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/region/${region.slug}/${era.slug}`} className="hover:text-[var(--color-accent)] transition-colors">{era.name}</Link>
        </nav>
      </div>

      {/* Article Hero */}
      <header className="relative mt-4">
        {heroImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, opacity: 0.18 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href={`/region/${region.slug}/${era.slug}`}
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <span aria-hidden="true">←</span>
            Back to {era.name}
          </Link>

          <span className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-3 px-3 py-1 rounded-full border ${meta.accent} bg-[var(--color-surface)] border-[var(--color-border)]`}>
            <span aria-hidden="true">{meta.emoji}</span>
            {meta.label}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight mb-4">
            {item.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            {isBattle ? (
              <>
                <span className="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">🗓️ {battle.date}</span>
                {battle.location && (
                  <span className="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">📍 {battle.location}</span>
                )}
                {battle.outcome && (
                  <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-500 rounded-lg">🏆 {battle.outcome}</span>
                )}
              </>
            ) : (
              <span className="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                🗓️ {formatYear((item as Kingdom | War).startYear)} — {formatYear((item as Kingdom | War).endYear)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {item.image?.url && (
              <figure className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-lg">
                <img
                  src={item.image.url}
                  alt={item.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </figure>
            )}

            <div
              className="rte-editor text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: stripRedundantHeading(item.description) }}
            />
          </div>

          {/* Sidebar — facts */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-lg space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2">
                At a Glance
              </h2>

              {!isBattle && (
                <div>
                  <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Duration</span>
                  <span className="font-semibold text-[var(--color-text)]">
                    {formatYear((item as Kingdom | War).startYear)} — {formatYear((item as Kingdom | War).endYear)}
                  </span>
                </div>
              )}

              {isBattle && (
                <>
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Date</span>
                    <span className="font-semibold text-[var(--color-text)]">{battle.date}</span>
                  </div>
                  {battle.location && (
                    <div>
                      <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Location</span>
                      <span className="font-semibold text-[var(--color-text)]">{battle.location}</span>
                    </div>
                  )}
                  {battle.outcome && (
                    <div>
                      <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Outcome</span>
                      <span className="font-semibold text-amber-500">{battle.outcome}</span>
                    </div>
                  )}
                  {battle.casualties && (
                    <div>
                      <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Casualties / Strength</span>
                      <span className="font-semibold text-red-400">{battle.casualties}</span>
                    </div>
                  )}
                </>
              )}

              <div>
                <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Historical Era</span>
                <span className="font-semibold text-[var(--color-text)]">{era.name}</span>
              </div>
              <div>
                <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Region</span>
                <span className="font-semibold text-[var(--color-text)]">{region.name}</span>
              </div>

              <Link
                href={`/region/${region.slug}/${era.slug}`}
                className="inline-flex items-center justify-center w-full mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90 transition-opacity"
              >
                ← Back to {era.name}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

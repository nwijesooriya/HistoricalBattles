'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Region, Era, Kingdom, War, Battle } from '@/types';

interface EraDetailsViewProps {
  region: Region;
  era: Era;
  kingdoms: Kingdom[];
  wars: War[];
  battles: Battle[];
}

function formatYear(year: number | string | undefined): string {
  if (year === undefined || year === null) return '';
  const numericYear = typeof year === 'string' ? parseInt(year, 10) : year;
  if (isNaN(numericYear)) return String(year);
  if (numericYear < 0) return `${Math.abs(numericYear)} BCE`;
  return `${numericYear} CE`;
}

export default function EraDetailsView({
  region,
  era,
  kingdoms,
  wars,
  battles,
}: EraDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<'kingdom' | 'war' | 'battle'>('kingdom');

  return (
    <>

      {/* Era Hero Section */}
      <section className="region-hero relative overflow-hidden py-16 md:py-24 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
        {region.image?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${region.image.url})`,
              opacity: 0.12,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-2 px-3 py-1 bg-[var(--color-accent-glow)] rounded-full border border-[var(--color-accent-dim)]/30">
            {region.name}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-[var(--color-text)] tracking-tight mb-4">
            {era.name}
          </h1>
          <div className="inline-flex items-center text-sm font-medium text-[var(--color-text-secondary)] mb-6 px-4 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <span className="mr-2">🗓️</span>
            <span>
              {formatYear(era.startYear)} — {formatYear(era.endYear)}
            </span>
          </div>
          <p className="max-w-3xl text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-sans line-clamp-4">
            {era.description}
          </p>
        </div>
      </section>

      {/* Tab Switcher Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl sm:rounded-full max-w-2xl mx-auto shadow-lg">
          <button
            onClick={() => setActiveTab('kingdom')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg sm:rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'kingdom'
                ? 'bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-border)] shadow-md'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-transparent'
              }`}
          >
            <span className="text-lg">👑</span>
            <span>Kingdoms</span>
            <span className={`ml-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'kingdom'
                ? 'bg-yellow-500/15 text-yellow-500 border border-yellow-500/25'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
              }`}>
              {kingdoms.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('war')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg sm:rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'war'
                ? 'bg-[var(--color-surface)] text-red-400 border border-[var(--color-border)] shadow-md'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-transparent'
              }`}
          >
            <span className="text-lg">🏴</span>
            <span>Wars</span>
            <span className={`ml-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'war'
                ? 'bg-red-500/15 text-red-400 border border-red-500/25'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
              }`}>
              {wars.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('battle')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg sm:rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'battle'
                ? 'bg-[var(--color-surface)] text-amber-500 border border-[var(--color-border)] shadow-md'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-transparent'
              }`}
          >
            <span className="text-lg">⚔️</span>
            <span>Notable Battles</span>
            <span className={`ml-1 px-2.5 py-0.5 text-xs font-semibold rounded-full ${activeTab === 'battle'
                ? 'bg-amber-500/15 text-amber-500 border border-amber-500/25'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
              }`}>
              {battles.length}
            </span>
          </button>
        </div>
      </section>

      {/* Dynamic Tab Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="transition-all duration-300">

          {/* KINGDOMS TAB */}
          {activeTab === 'kingdom' && (
            <div className="flex flex-col bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-xl">
              <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-yellow-500/10 rounded-lg text-yellow-500">👑</span>
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-[var(--color-text)]">Kingdoms</h2>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Dynasties, empires, and reigns during this historical period</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-500/15 text-yellow-500 border border-yellow-500/25">
                  {kingdoms.length} Recorded
                </span>
              </div>

              <div className="p-6">
                {kingdoms.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">🏰</span>
                    <p className="text-base font-medium">No kingdoms recorded for this era.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {kingdoms.map((k) => (
                      <Link
                        key={k._id}
                        href={`/region/${region.slug}/${era.slug}/kingdom/${k.slug}`}
                        className="group flex flex-col sm:flex-row gap-5 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-yellow-500/50 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div className="relative w-full sm:w-48 sm:h-36 h-44 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                          {k.image?.url ? (
                            <img
                              src={k.image.url}
                              alt={k.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">👑</div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-yellow-500 transition-colors duration-200">
                              {k.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {formatYear(k.startYear)} - {formatYear(k.endYear)}
                            </span>
                          </div>
                          <div
                            className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3 flex-1"
                            dangerouslySetInnerHTML={{ __html: k.description }}
                          />
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-yellow-500 font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WARS TAB */}
          {activeTab === 'war' && (
            <div className="flex flex-col bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-xl">
              <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-red-500/10 rounded-lg text-red-400">🏴</span>
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-[var(--color-text)]">Wars</h2>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Major conflicts, campaigns, and military operations</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500/15 text-red-400 border border-red-500/25">
                  {wars.length} Recorded
                </span>
              </div>

              <div className="p-6">
                {wars.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">🛡️</span>
                    <p className="text-base font-medium">No wars recorded for this era.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {wars.map((w) => (
                      <Link
                        key={w._id}
                        href={`/region/${region.slug}/${era.slug}/war/${w.slug}`}
                        className="group flex flex-col sm:flex-row gap-5 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-red-500/50 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div className="relative w-full sm:w-48 sm:h-36 h-44 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                          {w.image?.url ? (
                            <img
                              src={w.image.url}
                              alt={w.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">🏴</div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-red-400 transition-colors duration-200">
                              {w.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {formatYear(w.startYear)} - {formatYear(w.endYear)}
                            </span>
                          </div>
                          <div
                            className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3 flex-1"
                            dangerouslySetInnerHTML={{ __html: w.description }}
                          />
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-red-400 font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BATTLES TAB */}
          {activeTab === 'battle' && (
            <div className="flex flex-col bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-xl">
              <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-amber-500/10 rounded-lg text-amber-500">⚔️</span>
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-[var(--color-text)]">Notable Battles</h2>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Significant armed engagements and battles</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/25">
                  {battles.length} Recorded
                </span>
              </div>

              <div className="p-6">
                {battles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">⚔️</span>
                    <p className="text-base font-medium">No battles recorded for this era.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {battles.map((b) => (
                      <Link
                        key={b._id}
                        href={`/region/${region.slug}/${era.slug}/battle/${b.slug}`}
                        className="group flex flex-col sm:flex-row gap-5 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-amber-500/50 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div className="relative w-full sm:w-48 sm:h-36 h-44 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
                          {b.image?.url ? (
                            <img
                              src={b.image.url}
                              alt={b.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">⚔️</div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-amber-500 transition-colors duration-200">
                              {b.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {b.date}
                            </span>
                          </div>
                          <div
                            className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3 flex-1"
                            dangerouslySetInnerHTML={{ __html: b.description }}
                          />
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-amber-500 font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

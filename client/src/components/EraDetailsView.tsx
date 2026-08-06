'use client';

import { useState, useEffect } from 'react';
import { Region, Era, Kingdom, War, Battle } from '@/types';

interface EraDetailsViewProps {
  region: Region;
  era: Era;
  kingdoms: Kingdom[];
  wars: War[];
  battles: Battle[];
}

type DetailType = 'kingdom' | 'war' | 'battle';

interface SelectedItem {
  type: DetailType;
  item: Kingdom | War | Battle;
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
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [activeTab, setActiveTab] = useState<'kingdom' | 'war' | 'battle'>('kingdom');

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          <p className="max-w-3xl text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-sans">
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

              <div className="p-8">
                {kingdoms.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">🏰</span>
                    <p className="text-base font-medium">No kingdoms recorded for this era.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kingdoms.map((k) => (
                      <div
                        key={k._id}
                        onClick={() => setSelectedItem({ type: 'kingdom', item: k })}
                        className="group flex flex-col justify-between p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                              {k.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {formatYear(k.startYear)} - {formatYear(k.endYear)}
                            </span>
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: k.description }} />
                        </div>
                        <div>
                          {k.image?.url && (
                            <div className="relative w-full h-32 overflow-hidden rounded-lg border border-[var(--color-border)] mb-3">
                              <img
                                src={k.image.url}
                                alt={k.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-[var(--color-accent)] font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </div>
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

              <div className="p-8">
                {wars.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">🛡️</span>
                    <p className="text-base font-medium">No wars recorded for this era.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wars.map((w) => (
                      <div
                        key={w._id}
                        onClick={() => setSelectedItem({ type: 'war', item: w })}
                        className="group flex flex-col justify-between p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-red-500/50 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-red-400 transition-colors duration-200">
                              {w.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {formatYear(w.startYear)} - {formatYear(w.endYear)}
                            </span>
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: w.description }} />
                        </div>
                        <div>
                          {w.image?.url && (
                            <div className="relative w-full h-32 overflow-hidden rounded-lg border border-[var(--color-border)] mb-3">
                              <img
                                src={w.image.url}
                                alt={w.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-red-400 font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </div>
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

              <div className="p-8">
                {battles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--color-text-muted)]">
                    <span className="text-5xl mb-4">⚔️</span>
                    <p className="text-base font-medium">No battles recorded for this era.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {battles.map((b) => (
                      <div
                        key={b._id}
                        onClick={() => setSelectedItem({ type: 'battle', item: b })}
                        className="group flex flex-col justify-between p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="font-serif font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                              {b.name}
                            </h3>
                            <span className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-bg)] rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap">
                              {b.date}
                            </span>
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: b.description }} />
                        </div>
                        <div>
                          {b.image?.url && (
                            <div className="relative w-full h-32 overflow-hidden rounded-lg border border-[var(--color-border)] mb-3">
                              <img
                                src={b.image.url}
                                alt={b.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <span className="text-[11px] uppercase tracking-wider text-[var(--color-accent)] font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* DETAIL MODAL DRAWER */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            {selectedItem.item.image?.url ? (
              <div className="relative h-60 md:h-72 w-full overflow-hidden border-b border-[var(--color-border)]">
                <img
                  src={selectedItem.item.image.url}
                  alt={selectedItem.item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-[var(--color-text)] hover:text-white transition-colors border border-white/10"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="p-6 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)] flex items-center justify-between">
                <span className="text-sm font-mono text-[var(--color-accent)] uppercase tracking-wider">
                  {selectedItem.type} Details
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] transition-colors"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Modal Contents */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold font-sans mb-1.5 block">
                  {selectedItem.type === 'kingdom'
                    ? 'Historical Kingdom'
                    : selectedItem.type === 'war'
                      ? 'Historical Conflict'
                      : 'Notable Battle'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--color-text)]">
                  {selectedItem.item.name}
                </h2>
              </div>

              {/* Specific Properties Table / Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--color-bg-alt)] rounded-xl border border-[var(--color-border)] text-sm">

                {/* Kingdom & War specific: years */}
                {selectedItem.type !== 'battle' && (
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Duration / Period</span>
                    <span className="font-semibold text-[var(--color-text)]">
                      {formatYear((selectedItem.item as Kingdom | War).startYear)} — {formatYear((selectedItem.item as Kingdom | War).endYear)}
                    </span>
                  </div>
                )}

                {/* Battle specific: date */}
                {selectedItem.type === 'battle' && (
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Date</span>
                    <span className="font-semibold text-[var(--color-text)]">
                      {(selectedItem.item as Battle).date}
                    </span>
                  </div>
                )}

                {/* Battle specific: location */}
                {selectedItem.type === 'battle' && (
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Location</span>
                    <span className="font-semibold text-[var(--color-text)]">
                      📍 {(selectedItem.item as Battle).location}
                    </span>
                  </div>
                )}

                {/* Battle specific: outcome */}
                {selectedItem.type === 'battle' && (
                  <div>
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Outcome</span>
                    <span className="font-semibold text-yellow-500">
                      🏆 {(selectedItem.item as Battle).outcome}
                    </span>
                  </div>
                )}

                {/* Battle specific: casualties */}
                {selectedItem.type === 'battle' && (selectedItem.item as Battle).casualties && (
                  <div className="col-span-2 mt-2 pt-2 border-t border-[var(--color-border)]">
                    <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Casualties / Strength</span>
                    <span className="font-semibold text-red-400">
                      💀 {(selectedItem.item as Battle).casualties}
                    </span>
                  </div>
                )}

                <div>
                  <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Historical Era</span>
                  <span className="font-semibold text-[var(--color-text)]">
                    {era.name}
                  </span>
                </div>

                <div>
                  <span className="block text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Region</span>
                  <span className="font-semibold text-[var(--color-text)]">
                    {region.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-bold border-b border-[var(--color-border)] pb-1">
                  Historical Account
                </h4>
                <div
                  className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed rte-editor"
                  dangerouslySetInnerHTML={{ __html: selectedItem.item.description }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--color-bg-alt)] border-t border-[var(--color-border)] flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] transition-colors shadow-sm"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

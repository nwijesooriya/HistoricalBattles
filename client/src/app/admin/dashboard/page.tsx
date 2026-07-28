'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Admin } from '@/types';

interface DashboardStats {
  regions: number;
  eras: number;
  kingdoms: number;
  wars: number;
  battles: number;
  commanders: number;
  weapons: number;
  sources: number;
}

// Beautiful inline SVG icons mapping for dashboard modules
const Icons = {
  regions: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
    </svg>
  ),
  eras: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  kingdoms: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-5 6-4-6-4 6-5-6z" />
      <rect x="5" y="16" width="14" height="3" rx="1" />
    </svg>
  ),
  wars: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  battles: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L20 4" />
      <path d="M20 20L4 4" />
      <path d="M4 16l4 4" />
      <path d="M20 16l-4 4" />
    </svg>
  ),
  commanders: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  weapons: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3l-8.5 8.5" />
      <path d="M14 7l3 3" />
      <path d="M10.5 10.5L3 18v3h3l7.5-7.5" />
    </svg>
  ),
  sources: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  homepage: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

const colorThemes: Record<string, {
  text: string;
  border: string;
  glow: string;
  bg: string;
}> = {
  blue: {
    text: 'text-blue-400',
    border: 'hover:border-blue-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  purple: {
    text: 'text-purple-400',
    border: 'hover:border-purple-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  rose: {
    text: 'text-rose-400',
    border: 'hover:border-rose-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  amber: {
    text: 'text-amber-400',
    border: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  cyan: {
    text: 'text-cyan-400',
    border: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  accent: {
    text: 'text-[var(--color-accent)]',
    border: 'hover:border-[var(--color-accent)]/40',
    glow: 'hover:shadow-[0_0_30px_var(--color-accent-glow)]',
    bg: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
  },
  indigo: {
    text: 'text-indigo-400',
    border: 'hover:border-indigo-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
    bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  slate: {
    text: 'text-slate-400',
    border: 'hover:border-slate-500/40',
    glow: 'hover:shadow-[0_0_30px_rgba(100,116,139,0.15)]',
    bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    regions: 0,
    eras: 0,
    kingdoms: 0,
    wars: 0,
    battles: 0,
    commanders: 0,
    weapons: 0,
    sources: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    
    if (!token || !adminUser) {
      router.push('/admin/login');
      return;
    }

    try {
      setAdmin(JSON.parse(adminUser));
    } catch (error) {
      console.error('Failed to parse admin user:', error);
      router.push('/admin/login');
      return;
    }
    
    // Fetch statistics
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = localStorage.getItem('admin_token');

      const endpoints = [
        'regions',
        'eras',
        'kingdoms',
        'wars',
        'battles',
        'commanders',
        'weapons',
        'sources',
      ];

      const responses = await Promise.all(
        endpoints.map(endpoint =>
          fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          })
        )
      );

      const data = await Promise.all(responses.map(res => res.json()));
      
      setStats({
        regions: data[0].data?.length || 0,
        eras: data[1].data?.length || 0,
        kingdoms: data[2].data?.length || 0,
        wars: data[3].data?.length || 0,
        battles: data[4].data?.length || 0,
        commanders: data[5].data?.length || 0,
        weapons: data[6].data?.length || 0,
        sources: data[7].data?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const managementCards = [
    { title: 'Regions', count: stats.regions, path: '/admin/regions', icon: 'regions', desc: 'Define geographical areas, combat theatres, and operational zones.', accentColor: 'blue' },
    { title: 'Eras', count: stats.eras, path: '/admin/eras', icon: 'eras', desc: 'Segment history into operational timelines and military epochs.', accentColor: 'emerald' },
    { title: 'Kingdoms', count: stats.kingdoms, path: '/admin/kingdoms', icon: 'kingdoms', desc: 'Register historical states, dynasties, empires, and factions.', accentColor: 'purple' },
    { title: 'Wars', count: stats.wars, path: '/admin/wars', icon: 'wars', desc: 'Document major military conflicts, global wars, and long campaigns.', accentColor: 'rose' },
    { title: 'Battles', count: stats.battles, path: '/admin/battles', icon: 'battles', desc: 'Record specific tactical engagements, sieges, and clashes.', accentColor: 'amber' },
    { title: 'Commanders', count: stats.commanders, path: '/admin/commanders', icon: 'commanders', desc: 'Catalog military leaders, generals, strategists, and admirals.', accentColor: 'cyan' },
    { title: 'Weapons', count: stats.weapons, path: '/admin/weapons', icon: 'weapons', desc: 'Track siege engines, tactical equipment, arms, and armaments.', accentColor: 'accent' },
    { title: 'Sources', count: stats.sources, path: '/admin/sources', icon: 'sources', desc: 'Organize historical texts, records, primary sources, and citations.', accentColor: 'indigo' },
    { title: 'Homepage Settings', count: 1, path: '/admin/homepage', icon: 'homepage', desc: 'Modify landing hero text, featured content, and carousel links.', accentColor: 'slate' },
  ];

  const totalRecords = Object.values(stats).reduce((acc, curr) => acc + curr, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-glow)] via-transparent to-transparent opacity-60" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <div className="text-lg font-medium tracking-wide text-[var(--color-text-secondary)]">Loading command console...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] relative">
      {/* Background ambient light effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-xl text-[var(--color-accent)]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wider text-[var(--color-text)] uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                  Historical Atlas
                </h1>
                <p className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase">Admin Console</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-[var(--color-surface)]/60 border border-[var(--color-border)] px-4 py-2 rounded-xl text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[var(--color-text-secondary)]">Logged as:</span>{' '}
                <span className="font-semibold text-[var(--color-text)]">{admin?.username}</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/25 text-[var(--color-accent)] uppercase tracking-wider">
                  {admin?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Banner */}
        <div className="mb-10 bg-gradient-to-r from-[var(--color-surface)]/60 to-[var(--color-bg-alt)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>
              CMS Command Center
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1.5 max-w-xl leading-relaxed">
              Register and edit regions, tactical engagements, epochs, and strategic data fields. All changes update in real time on the live historical records.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-[var(--color-bg)]/60 border border-[var(--color-border)] px-5 py-3 rounded-xl">
              <div className="text-2xl font-black text-[var(--color-accent)]">{totalRecords}</div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold mt-0.5">Total Records</div>
            </div>
            <div className="flex-1 md:flex-initial bg-[var(--color-bg)]/60 border border-[var(--color-border)] px-5 py-3 rounded-xl">
              <div className="text-2xl font-black text-[var(--color-text)]">Active</div>
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold mt-0.5">API Link</div>
            </div>
          </div>
        </div>

        {/* Management Modules */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2.5" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="w-1.5 h-6 bg-[var(--color-accent)] rounded-full" />
            Archive Management Modules
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementCards.map((card) => {
              const theme = colorThemes[card.accentColor] || colorThemes.slate;
              return (
                <button
                  key={card.title}
                  onClick={() => router.push(card.path)}
                  className={`group relative text-left bg-[var(--color-surface)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-6 transition-all duration-300 ${theme.border} ${theme.glow} hover:-translate-y-1 active:scale-[0.98] cursor-pointer overflow-hidden flex flex-col justify-between h-full min-h-[220px]`}
                >
                  {/* Subtle inner grid lines decorative effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    {/* Module Icon and Stats count */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl border ${theme.bg}`}>
                        {Icons[card.icon as keyof typeof Icons]?.("w-6 h-6")}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-[var(--color-text)] tracking-tight">
                          {card.count}
                        </span>
                        <span className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider font-bold">
                          {card.title === 'Homepage Settings' ? 'Config' : 'Entries'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200" style={{ fontFamily: 'var(--font-heading)' }}>
                      {card.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Footer link line */}
                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/40 flex items-center justify-between text-[11px] font-bold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors duration-200 uppercase tracking-wider">
                    <span>Access Registry</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-bg)] transition-all duration-300 transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
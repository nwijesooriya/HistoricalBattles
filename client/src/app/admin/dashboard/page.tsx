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

// Inline SVGs for zero-dependency modern styling
const Icons = {
  regions: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5A1.5 1.5 0 0018 10.5V10a2 2 0 012-2h.558M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  ),
  eras: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  kingdoms: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 01-3.138-3.138z" />
    </svg>
  ),
  wars: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  battles: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  commanders: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  weapons: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A2 2 0 103.4 10.4l4 4a1 1 0 001.4 0l3.133-3.2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.85L17.15 17a2 2 0 102.85-2.85l-5.15-5.15M19 5l-2.5 2.5M14 5l5 5" />
    </svg>
  ),
  sources: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
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
    { title: 'Regions', count: stats.regions, path: '/admin/regions', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400', glow: 'shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]', icon: Icons.regions },
    { title: 'Eras', count: stats.eras, path: '/admin/eras', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400', glow: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]', icon: Icons.eras },
    { title: 'Kingdoms', count: stats.kingdoms, path: '/admin/kingdoms', color: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400', glow: 'shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]', icon: Icons.kingdoms },
    { title: 'Wars', count: stats.wars, path: '/admin/wars', color: 'from-red-500/20 to-red-600/5 border-red-500/30 text-red-400', glow: 'shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]', icon: Icons.wars },
    { title: 'Battles', count: stats.battles, path: '/admin/battles', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400', glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]', icon: Icons.battles },
    { title: 'Commanders', count: stats.commanders, path: '/admin/commanders', color: 'from-pink-500/20 to-pink-600/5 border-pink-500/30 text-pink-400', glow: 'shadow-[0_0_15px_-3px_rgba(236,72,153,0.3)]', icon: Icons.commanders },
    { title: 'Weapons', count: stats.weapons, path: '/admin/weapons', color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 text-yellow-400', glow: 'shadow-[0_0_15px_-3px_rgba(234,179,8,0.3)]', icon: Icons.weapons },
    { title: 'Sources', count: stats.sources, path: '/admin/sources', color: 'from-indigo-500/20 to-indigo-600/5 border-indigo-500/30 text-indigo-400', glow: 'shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]', icon: Icons.sources },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-border)]"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="text-[var(--color-text-secondary)] font-medium animate-pulse">Loading secure session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-indigo-500/30 selection:text-white">
      {/* Dynamic Background Mesh Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[var(--color-text)]">Historical Atlas</h1>
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest font-semibold">Database CMS Console</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-3 bg-[var(--color-surface)]/80 border border-[var(--color-border)] px-4 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  User: <span className="text-[var(--color-text)] font-medium">{admin?.username}</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {admin?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-400 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 rounded-lg transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-10 bg-gradient-to-r from-[var(--color-surface-hover)] to-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Welcome back, {admin?.username}!</h2>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Manage mapping nodes, chronicled eras, historical records, and structural entities across the timeline.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)]/50 px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
            <span>System State:</span>
            <span className="text-emerald-400 font-semibold">Active & Synced</span>
          </div>
        </div>

        {/* Statistics Overview */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[var(--color-text)] tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-indigo-500 rounded-full"></span>
              Atlas Metrics
            </h3>
            <span className="text-xs text-[var(--color-text-muted)]">Total metrics tracking live</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {managementCards.map((card) => (
              <div
                key={card.title}
                className={`relative group overflow-hidden bg-gradient-to-b ${card.color} border rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${card.glow}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {card.icon("w-20 h-20")}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wider uppercase">{card.title}</span>
                    <h4 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mt-2 tracking-tight">
                      {card.count}
                    </h4>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--color-bg)]/40 border border-white/5">
                    {card.icon("w-5 h-5")}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                  <span>Data collection healthy</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Navigation / Management Modules */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[var(--color-text)] tracking-wide flex items-center gap-2">
              <span className="h-4 w-1 bg-indigo-500 rounded-full"></span>
              Management Core
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">Select a structural node to begin curating</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {managementCards.map((card) => (
              <button
                key={card.title}
                onClick={() => router.push(card.path)}
                className="group relative bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-xl p-5 text-left transition-all duration-300 shadow-md flex flex-col justify-between h-44"
              >
                {/* Visual hover border glow accent */}
                <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="flex items-start justify-between w-full">
                  <div className="p-2.5 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] group-hover:border-[var(--color-border-hover)] group-hover:bg-[var(--color-surface-hover)] transition-colors">
                    {card.icon(`w-6 h-6 ${card.color.split(' ').pop()}`)}
                  </div>
                  <div className="text-xs font-mono font-bold tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg)]/80 px-2 py-1 rounded border border-[var(--color-border)]">
                    {card.count} Items
                  </div>
                </div>

                <div className="w-full">
                  <h4 className="text-md font-bold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                    {card.title} Module
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-1 group-hover:text-[var(--color-text-secondary)] transition-colors">
                    Create, modify, and link historical {card.title.toLowerCase()}.
                  </p>
                  <div className="flex items-center text-xs text-indigo-400 group-hover:text-indigo-300 font-semibold mt-3 gap-1">
                    <span>Manage</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

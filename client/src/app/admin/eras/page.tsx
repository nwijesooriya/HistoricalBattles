'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Era, Region } from '@/types';

// Inline SVGs for consistent, sleek premium dark UI iconography
const Icons = {
  back: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  plus: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  edit: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  trash: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  calendar: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  layers: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

export default function AdminErasPage() {
  const router = useRouter();
  const [eras, setEras] = useState<Era[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEra, setEditingEra] = useState<Era | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startYear: 0,
    endYear: 0,
    regionIds: [] as string[],
  });

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchEras();
    fetchRegions();
  };

  const fetchEras = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = localStorage.getItem('admin_token');
      
      const res = await fetch(`${API_BASE_URL}/eras`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch eras');
      
      const data = await res.json();
      setEras(data.data || []);
    } catch (error) {
      console.error('Failed to fetch eras:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegions = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = localStorage.getItem('admin_token');
      
      const res = await fetch(`${API_BASE_URL}/regions`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch regions');
      
      const data = await res.json();
      setRegions(data.data || []);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const url = editingEra
        ? `${API_BASE_URL}/eras/${editingEra._id}`
        : `${API_BASE_URL}/eras`;
      
      const method = editingEra ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
        console.error('Era save failed:', errorData);
        throw new Error(errorData.message || 'Failed to save era');
      }

      setShowForm(false);
      setEditingEra(null);
      setFormData({ name: '', description: '', startYear: 0, endYear: 0, regionIds: [] });
      fetchEras();
    } catch (error) {
      console.error('Failed to save era:', error);
      alert('Failed to save era');
    }
  };

  const handleEdit = (era: Era) => {
    setEditingEra(era);
    setFormData({
      name: era.name,
      description: era.description,
      startYear: era.startYear,
      endYear: era.endYear,
      regionIds: era.regionIds as string[],
    });
    setShowForm(true);
    // Smooth scroll to the editor workspace
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this era?')) return;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_BASE_URL}/eras/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to delete era');

      fetchEras();
    } catch (error) {
      console.error('Failed to delete era:', error);
      alert('Failed to delete era');
    }
  };

  const handleRegionToggle = (regionId: string) => {
    setFormData({
      ...formData,
      regionIds: formData.regionIds.includes(regionId)
        ? formData.regionIds.filter(id => id !== regionId)
        : [...formData.regionIds, regionId],
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEra(null);
    setFormData({ name: '', description: '', startYear: 0, endYear: 0, regionIds: [] });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-border)]"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="text-[var(--color-text-secondary)] font-medium animate-pulse">Loading temporal eras...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-indigo-500/30 selection:text-white pb-16">
      {/* Decorative Blur Background Meshes */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors mb-3"
              >
                {Icons.back("w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform")}
                Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  {Icons.calendar("w-6 h-6")}
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Manage Eras</h1>
              </div>
            </div>
            
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 self-start sm:self-center"
              >
                {Icons.plus("w-4 h-4")}
                Add New Era
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic Interactive Form */}
        {showForm && (
          <div className="bg-gradient-to-b from-[var(--color-surface-hover)] to-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 relative overflow-hidden transition-all duration-300">
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              {editingEra ? 'Edit Historical Timeframe parameters' : 'Define New Era Node'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                      Era Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Bronze Age Collapse"
                      className="w-full bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-3 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-[var(--color-text-muted)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                        Start Year (BCE/CE)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.startYear}
                        onChange={(e) => setFormData({ ...formData, startYear: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-3 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-[var(--color-text-muted)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                        End Year (BCE/CE)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.endYear}
                        onChange={(e) => setFormData({ ...formData, endYear: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-3 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-[var(--color-text-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                      Historical Narrative Summary
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Summarize the core timeline movements and societal changes characterizing this era..."
                      className="w-full bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-3 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-[var(--color-text-muted)] resize-none"
                    />
                  </div>
                </div>

                {/* Right Inputs - Interactive Map Checkboxes */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    Associate Geographical Nodes
                  </label>
                  <div className="bg-[var(--color-surface)]/80 border border-[var(--color-border)] rounded-xl p-4 h-[320px] overflow-y-auto space-y-2.5 custom-scrollbar">
                    {regions.map((region) => {
                      const isChecked = formData.regionIds.includes(region._id);
                      return (
                        <label
                          key={region._id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-indigo-500/10 border-indigo-500/30 text-[var(--color-text)]'
                              : 'bg-[var(--color-bg)]/40 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleRegionToggle(region._id)}
                              className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-bg)] text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0 focus:ring-2"
                            />
                            <span className="text-sm font-medium">{region.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[var(--color-text-muted)] px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                            {region.slug || 'slug-none'}
                          </span>
                        </label>
                      );
                    })}
                    {regions.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <p className="text-xs text-[var(--color-text-muted)]">No region modules discovered.</p>
                        <button
                          type="button"
                          onClick={() => router.push('/admin/regions')}
                          className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 underline"
                        >
                          Configure Regions First
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Action Controls */}
              <div className="flex items-center gap-3 pt-5 border-t border-[var(--color-border)]">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-lg transition-all duration-200 active:scale-95 shadow-md shadow-indigo-600/10"
                >
                  {editingEra ? 'Update Timeframe' : 'Commit Era'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] font-medium text-sm rounded-lg border border-[var(--color-border)] transition-colors"
                >
                  Discard Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Eras Dashboard Matrix View */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="font-bold text-[var(--color-text)] text-md tracking-wide">Committed Eras</h3>
            <span className="text-xs font-mono px-3 py-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full text-[var(--color-text-secondary)]">
              Active Eras: {eras.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead className="bg-[var(--color-bg)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Era Designation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Temporal Span
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Narrative Preview
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
                {eras.map((era) => (
                  <tr key={era._id} className="hover:bg-[var(--color-surface-hover)] transition-colors group">
                    
                    {/* Era Designation */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                          {Icons.layers("w-4 h-4")}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors">
                            {era.name}
                          </div>
                          <div className="text-[10px] font-mono text-[var(--color-text-muted)]">{era._id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Temporal Span */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 text-xs font-mono rounded-md bg-emerald-500/5 text-emerald-400 border border-emerald-500/10">
                        {era.startYear} – {era.endYear}
                      </span>
                    </td>

                    {/* Description Narrative */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                        {era.description}
                      </div>
                    </td>

                    {/* Action buttons with custom styles */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(era)}
                          className="p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                          title="Edit Era"
                        >
                          {Icons.edit("w-4 h-4")}
                        </button>
                        <button
                          onClick={() => handleDelete(era._id)}
                          className="p-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                          title="Delete Era"
                        >
                          {Icons.trash("w-4 h-4")}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty Database State */}
          {eras.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] mb-4">
                {Icons.calendar("w-6 h-6")}
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No historical eras mapped</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 max-w-xs">
                Begin populating the historical space-time framework by generating your first Era timeframe.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Region } from '@/types';

// Inline SVGs for consistent, sleek iconography
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
  globe: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5A1.5 1.5 0 0018 10.5V10a2 2 0 012-2h.558M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  ),
  image: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export default function AdminRegionsPage() {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
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
    fetchRegions();
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const url = editingRegion
        ? `${API_BASE_URL}/regions/${editingRegion._id}`
        : `${API_BASE_URL}/regions`;
      
      const method = editingRegion ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save region');

      setShowForm(false);
      setEditingRegion(null);
      setFormData({ name: '', description: '', image: '' });
      fetchRegions();
    } catch (error) {
      console.error('Failed to save region:', error);
      alert('Failed to save region');
    }
  };

  const handleEdit = (region: Region) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      description: region.description,
      image: region.image,
    });
    setShowForm(true);
    // Smooth scroll back up to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this region?')) return;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_BASE_URL}/regions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to delete region');

      fetchRegions();
    } catch (error) {
      console.error('Failed to delete region:', error);
      alert('Failed to delete region');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRegion(null);
    setFormData({ name: '', description: '', image: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        </div>
        <div className="text-zinc-400 font-medium animate-pulse">Loading region matrix...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 selection:text-white pb-16">
      {/* Background Decorative Mesh Blurs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090b]/85 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors mb-3"
              >
                {Icons.back("w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform")}
                Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {Icons.globe("w-6 h-6")}
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Manage Regions</h1>
              </div>
            </div>
            
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 self-start sm:self-center"
              >
                {Icons.plus("w-4 h-4")}
                Add New Region
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic Form Workspace */}
        {showForm && (
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 relative overflow-hidden transition-all duration-300">
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              {editingRegion ? 'Update Regional Parameters' : 'Register New Geographical Node'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left side input inputs */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Region Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Eastern Mediterranean"
                      className="w-full bg-[#0e0e11] text-zinc-100 px-4 py-3 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Geographical & Historical Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Provide detailed historical and topological parameters of the region..."
                      className="w-full bg-[#0e0e11] text-zinc-100 px-4 py-3 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-zinc-600 resize-none"
                    />
                  </div>
                </div>

                {/* Right side Image block & Interactive Preview */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Image URL or Path
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-[#0e0e11] text-zinc-100 px-4 py-3 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-zinc-600"
                      placeholder="/uploads/regions/mediterranean.jpg"
                    />
                  </div>

                  <div className="h-[142px] border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center bg-zinc-950/40 relative overflow-hidden group">
                    {formData.image ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={formData.image} 
                          alt="Region preview" 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                          <span className="text-[10px] text-zinc-400 truncate w-full">Preview Active</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        {Icons.image("w-8 h-8 text-zinc-600 mx-auto mb-2")}
                        <span className="text-xs text-zinc-500 block">Empty image field</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Triggers */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-lg transition-all duration-200 active:scale-95 shadow-md shadow-indigo-600/10"
                >
                  {editingRegion ? 'Apply Updates' : 'Commit Node'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 font-medium text-sm rounded-lg border border-zinc-700/50 transition-colors"
                >
                  Discard Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Regions Data Table */}
        <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-md tracking-wide">Committed Regions</h3>
            <span className="text-xs font-mono px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
              Database Nodes: {regions.length}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800/80">
              <thead className="bg-[#09090b]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Region Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Atlas Slug
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 bg-[#0e0e11]">
                {regions.map((region) => (
                  <tr key={region._id} className="hover:bg-zinc-900/30 transition-colors group">
                    
                    {/* Region Info & Thumbnail */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                          {region.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={region.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            Icons.globe("w-5 h-5 text-zinc-600")
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                            {region.name}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">{region._id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Description Text */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {region.description}
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-mono rounded bg-blue-500/5 text-blue-400 border border-blue-500/10">
                        {region.slug || '—'}
                      </span>
                    </td>

                    {/* Action buttons with icons */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(region)}
                          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
                          title="Edit Node"
                        >
                          {Icons.edit("w-4 h-4")}
                        </button>
                        <button
                          onClick={() => handleDelete(region._id)}
                          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                          title="Delete Node"
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

          {regions.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                {Icons.globe("w-6 h-6")}
              </div>
              <p className="text-sm font-medium text-zinc-400">No region nodes currently mapped</p>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Begin populating the historical space-time framework by creating your first region.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
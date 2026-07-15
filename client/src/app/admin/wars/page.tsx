'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { War, Region, Era } from '@/types';

export default function AdminWarsPage() {
  const router = useRouter();
  const [wars, setWars] = useState<War[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [eras, setEras] = useState<Era[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWar, setEditingWar] = useState<War | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    regionId: '',
    eraId: '',
    startYear: 0,
    endYear: 0,
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
    fetchWars();
    fetchRegions();
    fetchEras();
  };

  const fetchWars = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = localStorage.getItem('admin_token');
      
      const res = await fetch(`${API_BASE_URL}/wars`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch wars');
      
      const data = await res.json();
      setWars(data.data || []);
    } catch (error) {
      console.error('Failed to fetch wars:', error);
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const url = editingWar
        ? `${API_BASE_URL}/wars/${editingWar._id}`
        : `${API_BASE_URL}/wars`;
      
      const method = editingWar ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save war');

      setShowForm(false);
      setEditingWar(null);
      setFormData({ name: '', description: '', regionId: '', eraId: '', startYear: 0, endYear: 0, image: '' });
      fetchWars();
    } catch (error) {
      console.error('Failed to save war:', error);
      alert('Failed to save war');
    }
  };

  const handleEdit = (war: War) => {
    setEditingWar(war);
    setFormData({
      name: war.name,
      description: war.description,
      regionId: war.regionId,
      eraId: war.eraId,
      startYear: war.startYear,
      endYear: war.endYear,
      image: war.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this war?')) return;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_BASE_URL}/wars/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to delete war');

      fetchWars();
    } catch (error) {
      console.error('Failed to delete war:', error);
      alert('Failed to delete war');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingWar(null);
    setFormData({ name: '', description: '', regionId: '', eraId: '', startYear: 0, endYear: 0, image: '' });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="bg-[var(--color-surface)] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Manage Wars</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add War
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-[var(--color-surface)] rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-text)]">
              {editingWar ? 'Edit War' : 'Add New War'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Region</label>
                    <select
                      required
                      value={formData.regionId}
                      onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region._id} value={region._id}>{region.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Era</label>
                    <select
                      required
                      value={formData.eraId}
                      onChange={(e) => setFormData({ ...formData, eraId: e.target.value })}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                    >
                      <option value="">Select Era</option>
                      {eras.map((era) => (
                        <option key={era._id} value={era._id}>{era.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Start Year</label>
                    <input
                      type="number"
                      required
                      value={formData.startYear}
                      onChange={(e) => setFormData({ ...formData, startYear: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">End Year</label>
                    <input
                      type="number"
                      required
                      value={formData.endYear}
                      onChange={(e) => setFormData({ ...formData, endYear: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[var(--color-bg)] text-[var(--color-text)]"
                  />
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    {editingWar ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-[var(--color-border)] text-[var(--color-text)] rounded-md hover:bg-[var(--color-border-hover)]">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-[var(--color-border)]">
            <thead className="bg-[var(--color-bg-alt)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase">Years</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase">Era</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-text-muted)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
              {wars.map((war) => (
                <tr key={war._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[var(--color-text)]">{war.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--color-text-muted)]">{war.startYear} - {war.endYear}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--color-text-muted)]">{regions.find(r => r._id === war.regionId)?.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[var(--color-text-muted)]">{eras.find(e => e._id === war.eraId)?.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(war)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(war._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {wars.length === 0 && <div className="p-8 text-center text-[var(--color-text-muted)]">No wars found</div>}
        </div>
      </main>
    </div>
  );
}

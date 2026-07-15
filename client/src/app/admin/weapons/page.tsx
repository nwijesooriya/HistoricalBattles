'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Weapon, Era } from '@/types';

export default function AdminWeaponsPage() {
  const router = useRouter();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [eras, setEras] = useState<Era[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<Weapon | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    eraId: '',
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
    fetchWeapons();
    fetchEras();
  };

  const fetchWeapons = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const token = localStorage.getItem('admin_token');
      
      const res = await fetch(`${API_BASE_URL}/weapons`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch weapons');
      
      const data = await res.json();
      setWeapons(data.data || []);
    } catch (error) {
      console.error('Failed to fetch weapons:', error);
    } finally {
      setLoading(false);
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
      const url = editingWeapon
        ? `${API_BASE_URL}/weapons/${editingWeapon._id}`
        : `${API_BASE_URL}/weapons`;
      
      const method = editingWeapon ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save weapon');

      setShowForm(false);
      setEditingWeapon(null);
      setFormData({ name: '', description: '', type: '', eraId: '', image: '' });
      fetchWeapons();
    } catch (error) {
      console.error('Failed to save weapon:', error);
      alert('Failed to save weapon');
    }
  };

  const handleEdit = (weapon: Weapon) => {
    setEditingWeapon(weapon);
    setFormData({
      name: weapon.name,
      description: weapon.description,
      type: weapon.type,
      eraId: weapon.eraId,
      image: weapon.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this weapon?')) return;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_BASE_URL}/weapons/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error('Failed to delete weapon');

      fetchWeapons();
    } catch (error) {
      console.error('Failed to delete weapon:', error);
      alert('Failed to delete weapon');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingWeapon(null);
    setFormData({ name: '', description: '', type: '', eraId: '', image: '' });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-sm text-gray-500 hover:text-gray-700 mb-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Manage Weapons</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Weapon
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingWeapon ? 'Edit Weapon' : 'Add New Weapon'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <input
                      type="text"
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g., Sword, Bow, Cannon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Era</label>
                    <select
                      required
                      value={formData.eraId}
                      onChange={(e) => setFormData({ ...formData, eraId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Era</option>
                      {eras.map((era) => (
                        <option key={era._id} value={era._id}>{era.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    {editingWeapon ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Era</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weapons.map((weapon) => (
                <tr key={weapon._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{weapon.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{weapon.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{eras.find(e => e._id === weapon.eraId)?.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(weapon)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(weapon._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {weapons.length === 0 && <div className="p-8 text-center text-gray-500">No weapons found</div>}
        </div>
      </main>
    </div>
  );
}

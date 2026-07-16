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

    { title: 'Regions', count: stats.regions, path: '/admin/regions', color: 'bg-blue-500' },

    { title: 'Eras', count: stats.eras, path: '/admin/eras', color: 'bg-green-500' },

    { title: 'Kingdoms', count: stats.kingdoms, path: '/admin/kingdoms', color: 'bg-purple-500' },

    { title: 'Wars', count: stats.wars, path: '/admin/wars', color: 'bg-red-500' },

    { title: 'Battles', count: stats.battles, path: '/admin/battles', color: 'bg-orange-500' },

    { title: 'Commanders', count: stats.commanders, path: '/admin/commanders', color: 'bg-pink-500' },

    { title: 'Weapons', count: stats.weapons, path: '/admin/weapons', color: 'bg-yellow-500' },

    { title: 'Sources', count: stats.sources, path: '/admin/sources', color: 'bg-indigo-500' },

  ];



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-xl">Loading...</div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="bg-white shadow">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

              <p className="text-sm text-gray-500">Historical Atlas CMS</p>

            </div>

            <div className="flex items-center space-x-4">

              <div className="text-sm">

                <span className="text-gray-500">Logged in as:</span>{' '}

                <span className="font-medium">{admin?.username}</span>

                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">

                  {admin?.role}

                </span>

              </div>

              <button

                onClick={handleLogout}

                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"

              >

                Logout

              </button>

            </div>

          </div>

        </div>

      </header>



      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Statistics Overview */}

        <div className="mb-8">

          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics Overview</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {managementCards.map((card) => (

              <div

                key={card.title}

                className={`${card.color} rounded-lg p-6 text-white shadow-md`}

              >

                <div className="text-3xl font-bold">{card.count}</div>

                <div className="text-sm mt-1">{card.title}</div>

              </div>

            ))}

          </div>

        </div>



        {/* Quick Navigation */}

        <div>

          <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Modules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {managementCards.map((card) => (

              <button

                key={card.title}

                onClick={() => router.push(card.path)}

                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-left"

              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>

                    <p className="text-sm text-gray-500 mt-1">{card.count} items</p>

                  </div>

                  <div className={`${card.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}>

                    →

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

      </main>

    </div>

  );

}
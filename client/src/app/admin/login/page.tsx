'use client';

import { useState } from 'react';
import { loginAdmin } from '@/lib/api';
import { useRouter } from 'next/navigation';

// Premium dark UI iconography
const Icons = {
  lock: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  user: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  eye: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  eyeOff: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ),
  shield: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(username, password);
      
      // Store token in localStorage
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Decorative Blur Background Meshes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 shadow-inner shadow-indigo-500/5">
            {Icons.shield("w-8 h-8")}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="text-sm text-zinc-500 mt-1.5 font-medium tracking-wide">
            Historical Atlas CMS
          </p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Subtle Top-Border Highlight */}
          <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Feedback */}
            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3.5 rounded-xl text-sm transition-all duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Inputs Container */}
            <div className="space-y-5">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                    {Icons.user("w-5 h-5")}
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your administrative username"
                    className="w-full bg-[#0e0e11] text-zinc-100 pl-11 pr-4 py-3 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-zinc-600 text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                    {Icons.lock("w-5 h-5")}
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0e0e11] text-zinc-100 pl-11 pr-11 py-3 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-zinc-600 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                  >
                    {showPassword ? Icons.eyeOff("w-5 h-5") : Icons.eye("w-5 h-5")}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Control */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md shadow-indigo-600/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  'Access Console'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-xs text-zinc-600 mt-6">
          Authorized administrative personnel access only. Unauthorised connection attempts are tracked.
        </p>
      </div>
    </div>
  );
}
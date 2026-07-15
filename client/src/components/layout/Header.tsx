'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  const applyTheme = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    } catch (e) {
      console.error('Failed to save theme to localStorage', e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, applyTheme]);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <svg
            className="header-logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <div>
            <span className="header-logo-title">Historical Atlas</span>
            <span className="header-logo-subtitle">World War History</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <Link href="/" className="header-nav-link">
            Regions
          </Link>
          <Link href="/timeline" className="header-nav-link">
            Timeline
          </Link>
          <Link href="/map" className="header-nav-link">
            Maps
          </Link>
          <Link href="/search" className="header-nav-link">
            Search
          </Link>
          <Link href="/admin/login" className="header-nav-link">
            Admin
          </Link>
        </nav>

        {/* Theme Toggle + Mobile Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <div className="theme-toggle-track">
              <div className={`theme-toggle-thumb ${theme}`}>
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </div>
            </div>
          </button>

          <button
            className="header-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="header-mobile-nav">
          <Link
            href="/"
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Regions
          </Link>
          <Link
            href="/timeline"
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Timeline
          </Link>
          <Link
            href="/map"
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Maps
          </Link>
          <Link
            href="/search"
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/admin/login"
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}

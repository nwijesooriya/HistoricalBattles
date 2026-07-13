'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        </nav>

        {/* Mobile menu button */}
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
        </nav>
      )}
    </header>
  );
}

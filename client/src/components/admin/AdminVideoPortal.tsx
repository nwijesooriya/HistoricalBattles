"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useKnightShowcase } from '@/context/KnightShowcaseContext';

const AdminVideoPortal: React.FC = () => {
  const {
    videoSrc,
    setVideoSrc,
    width,
    setWidth,
    height,
    setHeight,
    bgAlpha,
    setBgAlpha,
    muted,
    setMuted,
    playbackRate,
    setPlaybackRate,
  } = useKnightShowcase();

  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure component renders the same on server and first client render
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  const portalRoot = typeof window !== 'undefined' ? document.getElementById('admin-portal') : null;
  if (!portalRoot) return null;

  const handleNumber = (value: string) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? 0 : n;
  };

  const content = (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 1000,
    }}>
      <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Knight Video Settings</h3>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <label>
          Video src:
          <input
            type="text"
            value={videoSrc}
            onChange={e => setVideoSrc(e.target.value)}
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Width (px, 0 = natural):
          <input
            type="number"
            value={width}
            onChange={e => setWidth(handleNumber(e.target.value))}
          />
        </label>
        <label>
          Height (px, 0 = natural):
          <input
            type="number"
            value={height}
            onChange={e => setHeight(handleNumber(e.target.value))}
          />
        </label>
        <label>
          Background alpha:
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={bgAlpha}
            onChange={e => setBgAlpha(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Muted:
          <input type="checkbox" checked={muted} onChange={e => setMuted(e.target.checked)} />
        </label>
        <label>
          Playback speed:
          <input
            type="number"
            min={0.1}
            max={3}
            step={0.1}
            value={playbackRate}
            onChange={e => setPlaybackRate(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );

  return createPortal(content, portalRoot);
};

export default AdminVideoPortal;

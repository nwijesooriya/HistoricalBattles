'use client';

import Link from 'next/link';
import { type CSSProperties, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { HomepageSettings, HomepageTextStyle } from '@/types';
import { mergeHomepageSettings } from '@/lib/homepage';

type ThemeMode = 'dark' | 'light';
type ViewportMode = 'desktop' | 'tablet' | 'mobile';

interface HomepageHeroProps {
  settings?: HomepageSettings | null;
  previewMode?: boolean;
  themeOverride?: ThemeMode;
  className?: string;
}

const getViewportMode = (width: number): ViewportMode => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const rgba = (hex: string, opacity: number) => {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

export default function HomepageHero({ settings, previewMode = false, themeOverride, className }: HomepageHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const mergedSettings = useMemo(() => mergeHomepageSettings(settings), [settings]);
  const responsiveSettings = mergedSettings.responsiveSettings[viewport];

  const theme = useSyncExternalStore<ThemeMode>(
    (onStoreChange) => {
      if (themeOverride) {
        return () => undefined;
      }

      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    },
    () => {
      if (themeOverride) {
        return themeOverride;
      }

      const nextTheme = document.documentElement.getAttribute('data-theme');
      return nextTheme === 'light' ? 'light' : 'dark';
    },
    () => themeOverride ?? 'dark'
  );
  const themeSettings = mergedSettings.themeSettings[theme];

  useEffect(() => {
    const updateViewport = () => setViewport(getViewportMode(window.innerWidth));
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mergedSettings.heroVideo?.url) {
      return;
    }

    video.muted = mergedSettings.playbackSettings.muted;
    video.loop = mergedSettings.playbackSettings.loop;
    video.volume = mergedSettings.playbackSettings.volume;
    video.playbackRate = mergedSettings.playbackSettings.playbackRate;

    if (mergedSettings.playbackSettings.autoplay) {
      video.play().catch(() => undefined);
    }
  }, [mergedSettings]);

  const objectPosition =
    mergedSettings.appearanceSettings.objectPosition === 'custom'
      ? `${mergedSettings.appearanceSettings.customObjectPositionX ?? 50}% ${mergedSettings.appearanceSettings.customObjectPositionY ?? 50}%`
      : mergedSettings.appearanceSettings.objectPosition;

  const videoStyle = {
    width: `${responsiveSettings.width}%`,
    height: `${responsiveSettings.height}%`,
    transform: `translate(-50%, -50%) translate(${mergedSettings.appearanceSettings.positionX + responsiveSettings.positionX}px, ${mergedSettings.appearanceSettings.positionY + responsiveSettings.positionY}px) scale(${mergedSettings.appearanceSettings.scale * responsiveSettings.scale}) rotate(${mergedSettings.appearanceSettings.rotation}deg)`,
    borderRadius: `${mergedSettings.appearanceSettings.borderRadius}px`,
    objectFit: mergedSettings.appearanceSettings.objectFit,
    objectPosition,
    opacity: mergedSettings.appearanceSettings.opacity * themeSettings.opacity,
    filter: [
      `brightness(${mergedSettings.appearanceSettings.brightness * themeSettings.brightness})`,
      `contrast(${mergedSettings.appearanceSettings.contrast})`,
      `saturate(${mergedSettings.appearanceSettings.saturation})`,
      `blur(${mergedSettings.appearanceSettings.blur}px)`,
      `grayscale(${mergedSettings.appearanceSettings.grayscale})`,
      `sepia(${mergedSettings.appearanceSettings.sepia})`,
      `hue-rotate(${mergedSettings.appearanceSettings.hueRotation}deg)`,
    ].join(' '),
  } as CSSProperties;

  const overlayStyle =
    mergedSettings.overlaySettings.type === 'none'
      ? { background: 'transparent' }
      : mergedSettings.overlaySettings.type === 'solid'
        ? {
            backgroundColor: rgba(mergedSettings.overlaySettings.color, mergedSettings.overlaySettings.opacity),
          }
        : {
            background: `linear-gradient(${mergedSettings.overlaySettings.gradientDirection}, ${rgba(mergedSettings.overlaySettings.color, mergedSettings.overlaySettings.opacity)}, transparent 72%)`,
          };

  const responsiveOverlay = rgba(responsiveSettings.overlayColor, responsiveSettings.overlayOpacity);
  const themeOverlay = rgba(themeSettings.overlayColor, themeSettings.overlayOpacity);
  const headingStyle = mergedSettings.heroText.headingStyle;
  const subtitleStyle = mergedSettings.heroText.subtitleStyle;
  const primaryButtonStyle = mergedSettings.heroText.primaryButtonStyle;
  const secondaryButtonStyle = mergedSettings.heroText.secondaryButtonStyle;
  const panelStyle = mergedSettings.contentPanelSettings.enabled
    ? {
        background: `color-mix(in srgb, var(--color-bg) ${Math.round(mergedSettings.contentPanelSettings.backgroundOpacity * 100)}%, transparent)`,
      }
    : {
        background: 'transparent',
        borderColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'none',
      } as CSSProperties;

  const buildRichTextStyle = (style: HomepageTextStyle): CSSProperties => ({
    color: style.color,
    fontWeight: style.bold ? 700 : 400,
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecorationLine: style.underline ? 'underline' : 'none',
  });

  return (
    <section className={className ?? 'hero'}>
      <div className="hero-bg">
        {mergedSettings.heroVideo?.url ? (
          <video
            ref={videoRef}
            key={mergedSettings.heroVideo.url}
            className="hero-video"
            src={mergedSettings.heroVideo.url}
            autoPlay={mergedSettings.playbackSettings.autoplay}
            loop={mergedSettings.playbackSettings.loop}
            muted={mergedSettings.playbackSettings.muted}
            playsInline
            preload="metadata"
            style={videoStyle}
          />
        ) : (
          <div className="hero-video hero-video-fallback" />
        )}
        <div className="hero-video-overlay" style={overlayStyle} />
        <div className="hero-video-overlay hero-video-theme-overlay" style={{ backgroundColor: themeOverlay }} />
        <div className="hero-video-overlay hero-video-responsive-overlay" style={{ backgroundColor: responsiveOverlay }} />
      </div>

      <div className="hero-content">
        <div className="hero-panel" style={panelStyle}>
          <div className="hero-copy">
            <div className="hero-pill">{previewMode ? 'Homepage Preview' : 'Historical Atlas'}</div>
            <h1 className="hero-title" style={buildRichTextStyle(headingStyle)}>
              {mergedSettings.heroText.heading}
            </h1>
            <p className="hero-subtitle" style={buildRichTextStyle(subtitleStyle)}>
              {mergedSettings.heroText.subtitle}
            </p>

            <div className="hero-actions">
              <Link
                href={mergedSettings.heroText.primaryButton.href}
                className="hero-button hero-button-primary"
                style={{
                  backgroundColor: primaryButtonStyle.backgroundColor,
                  color: primaryButtonStyle.textColor,
                  borderColor: primaryButtonStyle.borderColor,
                }}
              >
                {mergedSettings.heroText.primaryButton.label}
              </Link>
              <Link
                href={mergedSettings.heroText.secondaryButton.href}
                className="hero-button hero-button-secondary"
                style={{
                  backgroundColor: secondaryButtonStyle.backgroundColor,
                  color: secondaryButtonStyle.textColor,
                  borderColor: secondaryButtonStyle.borderColor,
                }}
              >
                {mergedSettings.heroText.secondaryButton.label}
              </Link>
            </div>
          </div>

          <aside className="hero-aside">
            <div className="hero-stats">
              {mergedSettings.statistics.map((stat, index) => (
                <div key={`${stat.label}-${index}`} className="hero-stat">
                  <span className="hero-stat-number">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

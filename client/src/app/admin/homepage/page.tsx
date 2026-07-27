'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import HomepageHero from '@/components/hero/HomepageHero';
import { createDefaultHomepageSettings, mergeHomepageSettings } from '@/lib/homepage';
import { HomepageSettings } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const tabs = ['Video', 'Appearance', 'Overlay', 'Content', 'Responsive', 'Preview'] as const;
type TabKey = (typeof tabs)[number];

type PreviewTheme = 'light' | 'dark';

const fileSizeLimitMB = 100;
const durationLimitSeconds = 30;
const resolutionLimit = { width: 1920, height: 1080 };

const Icons = {
  back: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  save: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  refresh: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0114-2.5M19 5a9 9 0 00-14 2.5" />
    </svg>
  ),
  trash: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
};

function InputLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">{children}</label>;
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = '',
  disabled = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  suffix?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <InputLabel>{label}</InputLabel>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(event) => onChange(Number.parseFloat(event.target.value))}
        disabled={disabled}
        className="w-full accent-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border border-[var(--color-border)] bg-transparent p-0"
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[var(--color-text)] outline-none"
        />
      </div>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)]">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-[var(--color-accent)]"
      />
    </label>
  );
}

export default function AdminHomepagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('Video');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('dark');
  const [settings, setSettings] = useState<HomepageSettings>(createDefaultHomepageSettings());
  const [originalSettings, setOriginalSettings] = useState<HomepageSettings>(createDefaultHomepageSettings());
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedVideoPreview, setSelectedVideoPreview] = useState('');
  const [videoMeta, setVideoMeta] = useState<{ duration?: number; width?: number; height?: number } | null>(null);
  const [error, setError] = useState('');

  const previewSettings = useMemo(() => {
    const merged = mergeHomepageSettings(settings);
    const previewHeroVideo = selectedVideoPreview
      ? {
          publicId: merged.heroVideo?.publicId ?? '',
          url: selectedVideoPreview,
          width: merged.heroVideo?.width,
          height: merged.heroVideo?.height,
          format: merged.heroVideo?.format,
          bytes: merged.heroVideo?.bytes,
          duration: merged.heroVideo?.duration,
          originalFilename: merged.heroVideo?.originalFilename,
        }
      : merged.heroVideo;

    return {
      ...merged,
      heroVideo: previewHeroVideo,
    };
  }, [settings, selectedVideoPreview]);

  const fetchHomepageSettings = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/homepage-settings`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load homepage settings');
      }

      const data = await response.json();
      const normalized = mergeHomepageSettings(data.data);
      setSettings(normalized);
      setOriginalSettings(normalized);
      setSelectedVideoPreview('');
      setSelectedVideoFile(null);
      setVideoMeta(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Failed to load homepage settings');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchHomepageSettings();
    });
  }, [fetchHomepageSettings]);

  useEffect(() => {
    return () => {
      if (selectedVideoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(selectedVideoPreview);
      }
    };
  }, [selectedVideoPreview]);

  const updateSettings = (updater: (current: HomepageSettings) => HomepageSettings) => {
    setSettings((current) => updater(mergeHomepageSettings(current)));
  };

  const handleVideoSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setError('');

    if (!file) {
      setSelectedVideoFile(null);
      setSelectedVideoPreview('');
      setVideoMeta(null);
      return;
    }

    if (!['video/mp4', 'video/webm'].includes(file.type)) {
      setError('Only MP4 and WebM videos are supported.');
      return;
    }

    if (file.size > fileSizeLimitMB * 1024 * 1024) {
      setError(`Video file must be ${fileSizeLimitMB} MB or smaller.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    try {
      const metadata = await new Promise<{ duration: number; width: number; height: number }>((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          resolve({ duration: video.duration, width: video.videoWidth, height: video.videoHeight });
        };
        video.onerror = () => {
          URL.revokeObjectURL(previewUrl);
          reject(new Error('Unable to read video metadata'));
        };
        video.src = previewUrl;
      });

      if (metadata.duration > durationLimitSeconds) {
        setError(`Video duration must be ${durationLimitSeconds} seconds or less.`);
        return;
      }

      if (metadata.width > resolutionLimit.width || metadata.height > resolutionLimit.height) {
        setError(`Video resolution must be ${resolutionLimit.width}x${resolutionLimit.height} or lower.`);
        return;
      }

      setSelectedVideoFile(file);
      if (selectedVideoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(selectedVideoPreview);
      }
      setSelectedVideoPreview(previewUrl);
      setVideoMeta(metadata);
      updateSettings((current) => ({ ...current, removeHeroVideo: false }));
    } catch (selectionError) {
      setError(selectionError instanceof Error ? selectionError.message : 'Failed to inspect the selected video.');
    }
  };

  const handleDeleteCurrentVideo = () => {
    if (!confirm('Delete the current hero video from the homepage settings?')) {
      return;
    }

    setSelectedVideoFile(null);
    setSelectedVideoPreview('');
    setVideoMeta(null);
    updateSettings((current) => ({ ...current, heroVideo: null, removeHeroVideo: true }));
  };

  const handleRestoreDraft = () => {
    setSettings(originalSettings);
    setSelectedVideoFile(null);
    setSelectedVideoPreview('');
    setVideoMeta(null);
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const payload = new FormData();
      payload.append('payload', JSON.stringify(settings));

      if (selectedVideoFile) {
        payload.append('heroVideo', selectedVideoFile);
      }

      const response = await fetch(`${API_BASE_URL}/homepage-settings`, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: payload,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Failed to save homepage settings');
      }

      const data = await response.json();
      const normalized = mergeHomepageSettings(data.data);
      setSettings(normalized);
      setOriginalSettings(normalized);
      setSelectedVideoFile(null);
      setSelectedVideoPreview('');
      setVideoMeta(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save homepage settings');
    } finally {
      setSaving(false);
    }
  };

  const renderVideoTab = () => (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <InputLabel>Hero Video File</InputLabel>
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={handleVideoSelection}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)]"
          />
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            Supported formats: MP4, WebM. Maximum size: {fileSizeLimitMB} MB. Maximum duration: {durationLimitSeconds} seconds.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={handleDeleteCurrentVideo}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
          >
            {Icons.trash('h-4 w-4')}
            Delete Current Video
          </button>
          <button
            type="button"
            onClick={handleRestoreDraft}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-border-hover)]"
          >
            {Icons.refresh('h-4 w-4')}
            Restore Saved Version
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Current Video Preview</h3>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
          {previewSettings.heroVideo?.url ? (
            <video
              src={selectedVideoPreview || previewSettings.heroVideo.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
              No hero video configured yet.
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>Source: {selectedVideoFile ? selectedVideoFile.name : previewSettings.heroVideo?.originalFilename || 'Saved asset'}</p>
          <p>Duration: {videoMeta?.duration ? `${videoMeta.duration.toFixed(1)}s` : previewSettings.heroVideo?.duration ? `${previewSettings.heroVideo.duration.toFixed(1)}s` : 'Unknown'}</p>
          <p>Resolution: {videoMeta?.width && videoMeta?.height ? `${videoMeta.width}x${videoMeta.height}` : previewSettings.heroVideo?.width && previewSettings.heroVideo?.height ? `${previewSettings.heroVideo.width}x${previewSettings.heroVideo.height}` : 'Unknown'}</p>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Layout</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <SliderField label="Width" value={settings.appearanceSettings.width} min={0} max={200} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, width: value } }))} suffix="%" />
          <SliderField label="Height" value={settings.appearanceSettings.height} min={0} max={200} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, height: value } }))} suffix="%" />
          <SliderField label="Scale" value={settings.appearanceSettings.scale} min={0.25} max={3} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, scale: value } }))} suffix="x" />
          <SliderField label="Rotation" value={settings.appearanceSettings.rotation} min={-180} max={180} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, rotation: value } }))} suffix="deg" />
          <SliderField label="Position X" value={settings.appearanceSettings.positionX} min={-100} max={100} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, positionX: value } }))} suffix="px" />
          <SliderField label="Position Y" value={settings.appearanceSettings.positionY} min={-100} max={100} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, positionY: value } }))} suffix="px" />
          <SliderField label="Border Radius" value={settings.appearanceSettings.borderRadius} min={0} max={80} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, borderRadius: value } }))} suffix="px" />
          <SelectField
            label="Object Fit"
            value={settings.appearanceSettings.objectFit}
            onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, objectFit: value as HomepageSettings['appearanceSettings']['objectFit'] } }))}
            options={[
              { label: 'Cover', value: 'cover' },
              { label: 'Contain', value: 'contain' },
              { label: 'Fill', value: 'fill' },
              { label: 'None', value: 'none' },
              { label: 'Scale Down', value: 'scale-down' },
            ]}
          />
          <SelectField
            label="Object Position"
            value={settings.appearanceSettings.objectPosition}
            onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, objectPosition: value as HomepageSettings['appearanceSettings']['objectPosition'] } }))}
            options={[
              { label: 'Center', value: 'center' },
              { label: 'Top', value: 'top' },
              { label: 'Bottom', value: 'bottom' },
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
              { label: 'Custom', value: 'custom' },
            ]}
          />
        </div>

        {settings.appearanceSettings.objectPosition === 'custom' && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <SliderField label="Custom Position X" value={settings.appearanceSettings.customObjectPositionX ?? 50} min={0} max={100} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, customObjectPositionX: value } }))} suffix="%" />
            <SliderField label="Custom Position Y" value={settings.appearanceSettings.customObjectPositionY ?? 50} min={0} max={100} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, customObjectPositionY: value } }))} suffix="%" />
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Visual Adjustments</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <SliderField label="Opacity" value={settings.appearanceSettings.opacity} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, opacity: value } }))} />
          <SliderField label="Brightness" value={settings.appearanceSettings.brightness} min={0} max={2} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, brightness: value } }))} />
          <SliderField label="Contrast" value={settings.appearanceSettings.contrast} min={0} max={2} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, contrast: value } }))} />
          <SliderField label="Saturation" value={settings.appearanceSettings.saturation} min={0} max={2} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, saturation: value } }))} />
          <SliderField label="Blur" value={settings.appearanceSettings.blur} min={0} max={20} step={0.25} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, blur: value } }))} suffix="px" />
          <SliderField label="Grayscale" value={settings.appearanceSettings.grayscale} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, grayscale: value } }))} />
          <SliderField label="Sepia" value={settings.appearanceSettings.sepia} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, sepia: value } }))} />
          <SliderField label="Hue Rotation" value={settings.appearanceSettings.hueRotation} min={0} max={360} step={1} onChange={(value) => updateSettings((current) => ({ ...current, appearanceSettings: { ...current.appearanceSettings, hueRotation: value } }))} suffix="deg" />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg xl:col-span-2">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Theme-Specific Appearance</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {(['light', 'dark'] as const).map((mode) => (
            <div key={mode} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-base font-semibold capitalize text-[var(--color-text)]">{mode} Theme</h4>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">{mode}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SliderField label="Opacity" value={settings.themeSettings[mode].opacity} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, themeSettings: { ...current.themeSettings, [mode]: { ...current.themeSettings[mode], opacity: value } } }))} />
                <SliderField label="Brightness" value={settings.themeSettings[mode].brightness} min={0} max={2} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, themeSettings: { ...current.themeSettings, [mode]: { ...current.themeSettings[mode], brightness: value } } }))} />
                <TextField label="Overlay Color" value={settings.themeSettings[mode].overlayColor} onChange={(value) => updateSettings((current) => ({ ...current, themeSettings: { ...current.themeSettings, [mode]: { ...current.themeSettings[mode], overlayColor: value } } }))} />
                <SliderField label="Overlay Opacity" value={settings.themeSettings[mode].overlayOpacity} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, themeSettings: { ...current.themeSettings, [mode]: { ...current.themeSettings[mode], overlayOpacity: value } } }))} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOverlayTab = () => (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Overlay Settings</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Overlay Type"
            value={settings.overlaySettings.type}
            onChange={(value) => updateSettings((current) => ({ ...current, overlaySettings: { ...current.overlaySettings, type: value as HomepageSettings['overlaySettings']['type'] } }))}
            options={[
              { label: 'Solid Color', value: 'solid' },
              { label: 'Gradient', value: 'gradient' },
              { label: 'None', value: 'none' },
            ]}
          />
          <TextField label="Overlay Color" value={settings.overlaySettings.color} onChange={(value) => updateSettings((current) => ({ ...current, overlaySettings: { ...current.overlaySettings, color: value } }))} />
          <SliderField label="Overlay Opacity" value={settings.overlaySettings.opacity} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, overlaySettings: { ...current.overlaySettings, opacity: value } }))} />
          <TextField label="Gradient Direction" value={settings.overlaySettings.gradientDirection} onChange={(value) => updateSettings((current) => ({ ...current, overlaySettings: { ...current.overlaySettings, gradientDirection: value } }))} placeholder="135deg" />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Overlay Preview Notes</h3>
        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
          The overlay is rendered above the video and combined with the theme-specific and responsive overlays in the live preview.
        </p>
        <div className="mt-5 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-xs leading-6 text-[var(--color-text-muted)]">
          Solid color overlays use the configured color and opacity. Gradient overlays use the selected direction to fade the page into the hero.
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Hero Content</h3>
          <div className="space-y-5">
            <TextField label="Main Heading" value={settings.heroText.heading} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, heading: value } }))} placeholder="Explore the History of World Warfare" />
            <TextField label="Subtitle" value={settings.heroText.subtitle} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, subtitle: value } }))} placeholder="Journey through millennia of military history." textarea />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Buttons</h3>
          <div className="space-y-5">
            <TextField label="Primary Button Label" value={settings.heroText.primaryButton.label} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, primaryButton: { ...current.heroText.primaryButton, label: value } } }))} />
            <TextField label="Primary Button Link" value={settings.heroText.primaryButton.href} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, primaryButton: { ...current.heroText.primaryButton, href: value } } }))} placeholder="/#regions" />
            <TextField label="Secondary Button Label" value={settings.heroText.secondaryButton.label} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, secondaryButton: { ...current.heroText.secondaryButton, label: value } } }))} />
            <TextField label="Secondary Button Link" value={settings.heroText.secondaryButton.href} onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, secondaryButton: { ...current.heroText.secondaryButton, href: value } } }))} placeholder="/about" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Content Card</h3>
        <div className="grid gap-5 md:grid-cols-2">
          <ToggleField
            label="Show Content Card"
            checked={settings.contentPanelSettings.enabled}
            onChange={(value) => updateSettings((current) => ({ ...current, contentPanelSettings: { ...current.contentPanelSettings, enabled: value } }))}
          />
          <div className={settings.contentPanelSettings.enabled ? '' : 'opacity-50'}>
            <SliderField
              label="Content Card Opacity"
              value={settings.contentPanelSettings.backgroundOpacity}
              min={0}
              max={1}
              step={0.05}
              disabled={!settings.contentPanelSettings.enabled}
              onChange={(value) => updateSettings((current) => ({ ...current, contentPanelSettings: { ...current.contentPanelSettings, backgroundOpacity: value } }))}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Text Styling</h3>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Heading</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <ColorField
                  label="Heading Color"
                  value={settings.heroText.headingStyle.color}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, headingStyle: { ...current.heroText.headingStyle, color: value } } }))}
                />
                <div className="grid gap-3">
                  <ToggleField
                    label="Bold"
                    checked={settings.heroText.headingStyle.bold}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, headingStyle: { ...current.heroText.headingStyle, bold: value } } }))}
                  />
                  <ToggleField
                    label="Italic"
                    checked={settings.heroText.headingStyle.italic}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, headingStyle: { ...current.heroText.headingStyle, italic: value } } }))}
                  />
                  <ToggleField
                    label="Underline"
                    checked={settings.heroText.headingStyle.underline}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, headingStyle: { ...current.heroText.headingStyle, underline: value } } }))}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Subtitle</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <ColorField
                  label="Subtitle Color"
                  value={settings.heroText.subtitleStyle.color}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, subtitleStyle: { ...current.heroText.subtitleStyle, color: value } } }))}
                />
                <div className="grid gap-3">
                  <ToggleField
                    label="Bold"
                    checked={settings.heroText.subtitleStyle.bold}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, subtitleStyle: { ...current.heroText.subtitleStyle, bold: value } } }))}
                  />
                  <ToggleField
                    label="Italic"
                    checked={settings.heroText.subtitleStyle.italic}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, subtitleStyle: { ...current.heroText.subtitleStyle, italic: value } } }))}
                  />
                  <ToggleField
                    label="Underline"
                    checked={settings.heroText.subtitleStyle.underline}
                    onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, subtitleStyle: { ...current.heroText.subtitleStyle, underline: value } } }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <h3 className="mb-5 text-lg font-semibold text-[var(--color-text)]">Button Styling</h3>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Primary Button</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <ColorField
                  label="Background Color"
                  value={settings.heroText.primaryButtonStyle.backgroundColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, primaryButtonStyle: { ...current.heroText.primaryButtonStyle, backgroundColor: value } } }))}
                />
                <ColorField
                  label="Text Color"
                  value={settings.heroText.primaryButtonStyle.textColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, primaryButtonStyle: { ...current.heroText.primaryButtonStyle, textColor: value } } }))}
                />
                <ColorField
                  label="Border Color"
                  value={settings.heroText.primaryButtonStyle.borderColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, primaryButtonStyle: { ...current.heroText.primaryButtonStyle, borderColor: value } } }))}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Secondary Button</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <ColorField
                  label="Background Color"
                  value={settings.heroText.secondaryButtonStyle.backgroundColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, secondaryButtonStyle: { ...current.heroText.secondaryButtonStyle, backgroundColor: value } } }))}
                />
                <ColorField
                  label="Text Color"
                  value={settings.heroText.secondaryButtonStyle.textColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, secondaryButtonStyle: { ...current.heroText.secondaryButtonStyle, textColor: value } } }))}
                />
                <ColorField
                  label="Border Color"
                  value={settings.heroText.secondaryButtonStyle.borderColor}
                  onChange={(value) => updateSettings((current) => ({ ...current, heroText: { ...current.heroText, secondaryButtonStyle: { ...current.heroText.secondaryButtonStyle, borderColor: value } } }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Statistics</h3>
          <button
            type="button"
            onClick={() => updateSettings((current) => ({ ...current, statistics: [...current.statistics, { label: 'New Statistic', value: '0' }] }))}
            className="rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Add Statistic
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {settings.statistics.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
              <div className="grid gap-4">
                <TextField label="Label" value={stat.label} onChange={(value) => updateSettings((current) => ({ ...current, statistics: current.statistics.map((item, statIndex) => statIndex === index ? { ...item, label: value } : item) }))} />
                <TextField label="Value" value={stat.value} onChange={(value) => updateSettings((current) => ({ ...current, statistics: current.statistics.map((item, statIndex) => statIndex === index ? { ...item, value: value } : item) }))} />
                <button
                  type="button"
                  onClick={() => updateSettings((current) => ({ ...current, statistics: current.statistics.filter((_, statIndex) => statIndex !== index) }))}
                  className="justify-self-start rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-300 transition hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResponsiveTab = () => (
    <div className="space-y-6">
      {(['desktop', 'tablet', 'mobile'] as const).map((breakpoint) => (
        <div key={breakpoint} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold capitalize text-[var(--color-text)]">{breakpoint}</h3>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Responsive</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <SliderField label="Scale" value={settings.responsiveSettings[breakpoint].scale} min={0.25} max={3} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], scale: value } } }))} suffix="x" />
            <SliderField label="Position X" value={settings.responsiveSettings[breakpoint].positionX} min={-100} max={100} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], positionX: value } } }))} suffix="px" />
            <SliderField label="Position Y" value={settings.responsiveSettings[breakpoint].positionY} min={-100} max={100} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], positionY: value } } }))} suffix="px" />
            <SliderField label="Width" value={settings.responsiveSettings[breakpoint].width} min={0} max={200} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], width: value } } }))} suffix="%" />
            <SliderField label="Height" value={settings.responsiveSettings[breakpoint].height} min={0} max={200} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], height: value } } }))} suffix="%" />
            <TextField label="Overlay Color" value={settings.responsiveSettings[breakpoint].overlayColor} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], overlayColor: value } } }))} />
            <SliderField label="Overlay Opacity" value={settings.responsiveSettings[breakpoint].overlayOpacity} min={0} max={1} step={0.05} onChange={(value) => updateSettings((current) => ({ ...current, responsiveSettings: { ...current.responsiveSettings, [breakpoint]: { ...current.responsiveSettings[breakpoint], overlayOpacity: value } } }))} />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">Live Preview</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Updates instantly as you edit any tab.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1">
          {(['dark', 'light'] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setPreviewTheme(theme)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${previewTheme === theme ? 'bg-[var(--color-accent)] text-[var(--color-bg)]' : 'text-[var(--color-text-muted)]'}`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl">
        <div className="border-b border-[var(--color-border)] px-6 py-4 text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          Homepage preview · {previewTheme} theme
        </div>
        <div className="p-4 sm:p-6">
          <HomepageHero settings={previewSettings} previewMode themeOverride={previewTheme} className="hero hero-preview" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Loading homepage settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pb-16">
      <div className="absolute right-10 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />

      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
            >
              {Icons.back('h-3.5 w-3.5')}
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Homepage Settings</h1>
            <p className="text-sm text-[var(--color-text-muted)]">Manage the public hero video, content, overlays, and responsive appearance.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium transition hover:border-[var(--color-border-hover)]"
            >
              Restore Draft
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
            >
              {Icons.save('h-4 w-4')}
              {saving ? 'Publishing...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-[var(--color-accent)] text-[var(--color-bg)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Video' && renderVideoTab()}
        {activeTab === 'Appearance' && renderAppearanceTab()}
        {activeTab === 'Overlay' && renderOverlayTab()}
        {activeTab === 'Content' && renderContentTab()}
        {activeTab === 'Responsive' && renderResponsiveTab()}
        {activeTab === 'Preview' && renderPreviewTab()}

        {activeTab !== 'Preview' && (
          <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs text-[var(--color-text-muted)]">
            Preview theme: {previewTheme}. Selected file: {selectedVideoFile?.name || 'none'}.
          </div>
        )}
      </main>
    </div>
  );
}

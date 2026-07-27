import {
  HomepageSettings,
  HomepageAppearanceSettings,
  HomepageOverlaySettings,
  HomepagePlaybackSettings,
  HomepageResponsiveSettings,
  HomepageContentPanelSettings,
  HomepageThemeAppearance,
  HomepageStatistic,
  HomepageVideoAsset,
} from '@/types';

const defaultPlaybackSettings: HomepagePlaybackSettings = {
  autoplay: true,
  loop: true,
  muted: true,
  volume: 0.5,
  playbackRate: 1,
};

const defaultAppearanceSettings: HomepageAppearanceSettings = {
  width: 100,
  height: 100,
  scale: 1,
  positionX: 0,
  positionY: 0,
  rotation: 0,
  borderRadius: 24,
  objectFit: 'cover',
  objectPosition: 'center',
  customObjectPositionX: 50,
  customObjectPositionY: 50,
  opacity: 1,
  brightness: 1,
  contrast: 1,
  saturation: 1,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hueRotation: 0,
};

const defaultThemeAppearance: HomepageThemeAppearance = {
  opacity: 1,
  brightness: 1,
  overlayColor: '#ffffff',
  overlayOpacity: 0.18,
};

const defaultResponsiveSettings: HomepageResponsiveSettings = {
  scale: 1,
  positionX: 0,
  positionY: 0,
  width: 100,
  height: 100,
  overlayColor: '#000000',
  overlayOpacity: 0.35,
};

const defaultOverlaySettings: HomepageOverlaySettings = {
  type: 'gradient',
  color: '#0a0a12',
  opacity: 0.4,
  gradientDirection: '135deg',
};

const defaultContentPanelSettings: HomepageContentPanelSettings = {
  enabled: true,
  backgroundOpacity: 0.82,
};

const defaultHeroText = {
  heading: 'Explore the History of World Warfare',
  subtitle:
    'Journey through millennia of military history with a homepage hero that can be managed entirely from the admin panel.',
  headingStyle: {
    color: '#e8e4dc',
    bold: true,
    italic: false,
    underline: false,
  },
  subtitleStyle: {
    color: '#b0aca4',
    bold: false,
    italic: false,
    underline: false,
  },
  primaryButton: {
    label: 'Browse Regions',
    href: '/#regions',
  },
  primaryButtonStyle: {
    backgroundColor: '#c9a84c',
    textColor: '#0a0a12',
    borderColor: '#c9a84c',
  },
  secondaryButton: {
    label: 'Learn More',
    href: '/about',
  },
  secondaryButtonStyle: {
    backgroundColor: '#141422',
    textColor: '#e8e4dc',
    borderColor: '#2a2a44',
  },
};

const defaultStatistics: HomepageStatistic[] = [
  { label: 'Regions', value: '0' },
  { label: 'Historical Eras', value: '0' },
  { label: 'Years of History', value: '5000+' },
];

const defaultHeroVideo: HomepageVideoAsset = {
  publicId: '',
  url: '',
};

export function createDefaultHomepageSettings(): HomepageSettings {
  return {
    heroVideo: defaultHeroVideo,
    playbackSettings: defaultPlaybackSettings,
    appearanceSettings: defaultAppearanceSettings,
    themeSettings: {
      light: defaultThemeAppearance,
      dark: {
        opacity: 0.95,
        brightness: 0.9,
        overlayColor: '#000000',
        overlayOpacity: 0.45,
      },
    },
    responsiveSettings: {
      desktop: { ...defaultResponsiveSettings },
      tablet: { ...defaultResponsiveSettings, scale: 0.95, overlayOpacity: 0.4 },
      mobile: { ...defaultResponsiveSettings, scale: 0.85, overlayOpacity: 0.5 },
    },
    overlaySettings: defaultOverlaySettings,
    contentPanelSettings: defaultContentPanelSettings,
    heroText: defaultHeroText,
    statistics: defaultStatistics,
  };
}

export function mergeHomepageSettings(settings?: Partial<HomepageSettings> | null): HomepageSettings {
  const defaults = createDefaultHomepageSettings();

  return {
    ...defaults,
    ...settings,
    heroVideo: settings?.heroVideo === null ? null : settings?.heroVideo ?? defaults.heroVideo,
    removeHeroVideo: settings?.removeHeroVideo ?? false,
    playbackSettings: { ...defaults.playbackSettings, ...settings?.playbackSettings },
    appearanceSettings: { ...defaults.appearanceSettings, ...settings?.appearanceSettings },
    themeSettings: {
      light: { ...defaults.themeSettings.light, ...settings?.themeSettings?.light },
      dark: { ...defaults.themeSettings.dark, ...settings?.themeSettings?.dark },
    },
    responsiveSettings: {
      desktop: { ...defaults.responsiveSettings.desktop, ...settings?.responsiveSettings?.desktop },
      tablet: { ...defaults.responsiveSettings.tablet, ...settings?.responsiveSettings?.tablet },
      mobile: { ...defaults.responsiveSettings.mobile, ...settings?.responsiveSettings?.mobile },
    },
    overlaySettings: { ...defaults.overlaySettings, ...settings?.overlaySettings },
    contentPanelSettings: { ...defaults.contentPanelSettings, ...settings?.contentPanelSettings },
    heroText: {
      ...defaults.heroText,
      ...settings?.heroText,
      headingStyle: { ...defaults.heroText.headingStyle, ...settings?.heroText?.headingStyle },
      subtitleStyle: { ...defaults.heroText.subtitleStyle, ...settings?.heroText?.subtitleStyle },
      primaryButton: { ...defaults.heroText.primaryButton, ...settings?.heroText?.primaryButton },
      primaryButtonStyle: { ...defaults.heroText.primaryButtonStyle, ...settings?.heroText?.primaryButtonStyle },
      secondaryButton: { ...defaults.heroText.secondaryButton, ...settings?.heroText?.secondaryButton },
      secondaryButtonStyle: { ...defaults.heroText.secondaryButtonStyle, ...settings?.heroText?.secondaryButtonStyle },
    },
    statistics: settings?.statistics?.length ? settings.statistics : defaults.statistics,
  };
}

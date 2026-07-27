export interface ImageAsset {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  originalFilename?: string;
  altText?: string;
  opacity?: number;
}

export interface Region {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: ImageAsset | null;
  imageOpacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Era {
  _id: string;
  name: string;
  slug: string;
  startYear: number;
  endYear: number;
  description: string;
  regionIds: Region[] | string[];
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface Kingdom {
  _id: string;
  name: string;
  slug: string;
  description: string;
  regionId: string;
  eraId: string;
  startYear: number;
  endYear: number;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface War {
  _id: string;
  name: string;
  slug: string;
  description: string;
  regionId: string;
  eraId: string;
  startYear: number;
  endYear: number;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface Battle {
  _id: string;
  name: string;
  slug: string;
  description: string;
  warId: string;
  regionId: string;
  eraId: string;
  date: string;
  location: string;
  outcome: string;
  casualties: string;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface Commander {
  _id: string;
  name: string;
  slug: string;
  description: string;
  birthYear: number;
  deathYear: number;
  nationality: string;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface Weapon {
  _id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  eraId: string;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface Source {
  _id: string;
  title: string;
  author: string;
  year: number;
  type: string;
  url: string;
  description: string;
  image: ImageAsset | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageVideoAsset {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  duration?: number;
  originalFilename?: string;
}

export interface HomepagePlaybackSettings {
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  volume: number;
  playbackRate: number;
}

export interface HomepageAppearanceSettings {
  width: number;
  height: number;
  scale: number;
  positionX: number;
  positionY: number;
  rotation: number;
  borderRadius: number;
  objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';
  customObjectPositionX?: number;
  customObjectPositionY?: number;
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
  hueRotation: number;
}

export interface HomepageThemeAppearance {
  opacity: number;
  brightness: number;
  overlayColor: string;
  overlayOpacity: number;
}

export interface HomepageResponsiveSettings {
  scale: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  overlayColor: string;
  overlayOpacity: number;
}

export interface HomepageOverlaySettings {
  type: 'solid' | 'gradient' | 'none';
  color: string;
  opacity: number;
  gradientDirection: string;
}

export interface HomepageContentPanelSettings {
  enabled: boolean;
  backgroundOpacity: number;
}

export interface HomepageHeroText {
  heading: string;
  subtitle: string;
  headingStyle: HomepageTextStyle;
  subtitleStyle: HomepageTextStyle;
  primaryButton: {
    label: string;
    href: string;
  };
  primaryButtonStyle: HomepageButtonStyle;
  secondaryButton: {
    label: string;
    href: string;
  };
  secondaryButtonStyle: HomepageButtonStyle;
}

export interface HomepageTextStyle {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface HomepageButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface HomepageStatistic {
  label: string;
  value: string;
}

export interface HomepageSettings {
  _id?: string;
  singletonKey?: string;
  heroVideo?: HomepageVideoAsset | null;
  playbackSettings: HomepagePlaybackSettings;
  appearanceSettings: HomepageAppearanceSettings;
  themeSettings: {
    light: HomepageThemeAppearance;
    dark: HomepageThemeAppearance;
  };
  responsiveSettings: {
    desktop: HomepageResponsiveSettings;
    tablet: HomepageResponsiveSettings;
    mobile: HomepageResponsiveSettings;
  };
  overlaySettings: HomepageOverlaySettings;
  contentPanelSettings: HomepageContentPanelSettings;
  heroText: HomepageHeroText;
  statistics: HomepageStatistic[];
  removeHeroVideo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  admin: Admin;
  token: string;
}

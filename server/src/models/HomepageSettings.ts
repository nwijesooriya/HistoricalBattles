import mongoose, { Document, Schema } from 'mongoose';

import { createSlug } from '../utils/slugify';
import { videoMetadataSchema } from './videoMetadataSchema';

export interface HeroVideoThemeSettings {
  opacity: number;
  brightness: number;
  overlayColor: string;
  overlayOpacity: number;
}

export interface HeroVideoResponsiveSettings {
  scale: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  overlayColor: string;
  overlayOpacity: number;
}

export interface HeroTextStyleSettings {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface HeroButtonStyleSettings {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export interface HeroContentPanelSettings {
  enabled: boolean;
  backgroundOpacity: number;
}

export interface IHomepageSettings extends Document {
  singletonKey: string;
  heroVideo?: {
    publicId: string;
    url: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
    duration?: number;
    originalFilename?: string;
  };
  playbackSettings: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    volume: number;
    playbackRate: number;
  };
  appearanceSettings: {
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
  };
  themeSettings: {
    light: HeroVideoThemeSettings;
    dark: HeroVideoThemeSettings;
  };
  responsiveSettings: {
    desktop: HeroVideoResponsiveSettings;
    tablet: HeroVideoResponsiveSettings;
    mobile: HeroVideoResponsiveSettings;
  };
  overlaySettings: {
    type: 'solid' | 'gradient' | 'none';
    color: string;
    opacity: number;
    gradientDirection: string;
  };
  contentPanelSettings: HeroContentPanelSettings;
  heroText: {
    heading: string;
    subtitle: string;
    headingStyle: HeroTextStyleSettings;
    subtitleStyle: HeroTextStyleSettings;
    primaryButton: {
      label: string;
      href: string;
    };
    primaryButtonStyle: HeroButtonStyleSettings;
    secondaryButton: {
      label: string;
      href: string;
    };
    secondaryButtonStyle: HeroButtonStyleSettings;
  };
  statistics: Array<{
    label: string;
    value: string;
  }>;
  updatedAt: Date;
  createdAt: Date;
}

const homepageSettingsSchema = new Schema<IHomepageSettings>(
  {
    singletonKey: {
      type: String,
      required: true,
      unique: true,
      default: 'homepage',
      immutable: true,
    },
    heroVideo: {
      type: videoMetadataSchema,
      default: undefined,
    },
    playbackSettings: {
      autoplay: { type: Boolean, default: true },
      loop: { type: Boolean, default: true },
      muted: { type: Boolean, default: true },
      volume: { type: Number, default: 0.5, min: 0, max: 1 },
      playbackRate: { type: Number, default: 1, min: 0.25, max: 2 },
    },
    appearanceSettings: {
      width: { type: Number, default: 100, min: 0 },
      height: { type: Number, default: 100, min: 0 },
      scale: { type: Number, default: 1, min: 0.25, max: 3 },
      positionX: { type: Number, default: 0, min: -100, max: 100 },
      positionY: { type: Number, default: 0, min: -100, max: 100 },
      rotation: { type: Number, default: 0, min: -180, max: 180 },
      borderRadius: { type: Number, default: 24, min: 0, max: 80 },
      objectFit: { type: String, default: 'cover' },
      objectPosition: { type: String, default: 'center' },
      customObjectPositionX: { type: Number, default: 50, min: 0, max: 100 },
      customObjectPositionY: { type: Number, default: 50, min: 0, max: 100 },
      opacity: { type: Number, default: 1, min: 0, max: 1 },
      brightness: { type: Number, default: 1, min: 0, max: 2 },
      contrast: { type: Number, default: 1, min: 0, max: 2 },
      saturation: { type: Number, default: 1, min: 0, max: 2 },
      blur: { type: Number, default: 0, min: 0, max: 20 },
      grayscale: { type: Number, default: 0, min: 0, max: 1 },
      sepia: { type: Number, default: 0, min: 0, max: 1 },
      hueRotation: { type: Number, default: 0, min: 0, max: 360 },
    },
    themeSettings: {
      light: {
        opacity: { type: Number, default: 1, min: 0, max: 1 },
        brightness: { type: Number, default: 1, min: 0, max: 2 },
        overlayColor: { type: String, default: '#ffffff' },
        overlayOpacity: { type: Number, default: 0.18, min: 0, max: 1 },
      },
      dark: {
        opacity: { type: Number, default: 0.95, min: 0, max: 1 },
        brightness: { type: Number, default: 0.9, min: 0, max: 2 },
        overlayColor: { type: String, default: '#000000' },
        overlayOpacity: { type: Number, default: 0.45, min: 0, max: 1 },
      },
    },
    responsiveSettings: {
      desktop: {
        scale: { type: Number, default: 1, min: 0.25, max: 3 },
        positionX: { type: Number, default: 0, min: -100, max: 100 },
        positionY: { type: Number, default: 0, min: -100, max: 100 },
        width: { type: Number, default: 100, min: 0 },
        height: { type: Number, default: 100, min: 0 },
        overlayColor: { type: String, default: '#000000' },
        overlayOpacity: { type: Number, default: 0.35, min: 0, max: 1 },
      },
      tablet: {
        scale: { type: Number, default: 0.95, min: 0.25, max: 3 },
        positionX: { type: Number, default: 0, min: -100, max: 100 },
        positionY: { type: Number, default: 0, min: -100, max: 100 },
        width: { type: Number, default: 100, min: 0 },
        height: { type: Number, default: 100, min: 0 },
        overlayColor: { type: String, default: '#000000' },
        overlayOpacity: { type: Number, default: 0.4, min: 0, max: 1 },
      },
      mobile: {
        scale: { type: Number, default: 0.85, min: 0.25, max: 3 },
        positionX: { type: Number, default: 0, min: -100, max: 100 },
        positionY: { type: Number, default: 0, min: -100, max: 100 },
        width: { type: Number, default: 100, min: 0 },
        height: { type: Number, default: 100, min: 0 },
        overlayColor: { type: String, default: '#000000' },
        overlayOpacity: { type: Number, default: 0.5, min: 0, max: 1 },
      },
    },
    overlaySettings: {
      type: {
        type: String,
        default: 'gradient',
        enum: ['solid', 'gradient', 'none'],
      },
      color: { type: String, default: '#0a0a12' },
      opacity: { type: Number, default: 0.4, min: 0, max: 1 },
      gradientDirection: { type: String, default: '135deg' },
    },
    contentPanelSettings: {
      enabled: { type: Boolean, default: true },
      backgroundOpacity: { type: Number, default: 0.82, min: 0, max: 1 },
    },
    heroText: {
      heading: { type: String, default: 'Explore the History of World Warfare' },
      subtitle: {
        type: String,
        default:
          'Journey through millennia of military history with a homepage hero that can be managed entirely from the admin panel.',
      },
      headingStyle: {
        color: { type: String, default: '#e8e4dc' },
        bold: { type: Boolean, default: true },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
      },
      subtitleStyle: {
        color: { type: String, default: '#b0aca4' },
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
      },
      primaryButton: {
        label: { type: String, default: 'Browse Regions' },
        href: { type: String, default: '/#regions' },
      },
      primaryButtonStyle: {
        backgroundColor: { type: String, default: '#c9a84c' },
        textColor: { type: String, default: '#0a0a12' },
        borderColor: { type: String, default: '#c9a84c' },
      },
      secondaryButton: {
        label: { type: String, default: 'Learn More' },
        href: { type: String, default: '/about' },
      },
      secondaryButtonStyle: {
        backgroundColor: { type: String, default: '#141422' },
        textColor: { type: String, default: '#e8e4dc' },
        borderColor: { type: String, default: '#2a2a44' },
      },
    },
    statistics: {
      type: [
        {
          label: { type: String, default: '' },
          value: { type: String, default: '' },
        },
      ],
      default: [
        { label: 'Regions', value: '0' },
        { label: 'Historical Eras', value: '0' },
        { label: 'Years of History', value: '5000+' },
      ],
    },
  },
  {
    timestamps: true,
  }
);

homepageSettingsSchema.pre('save', function (next) {
  if (!this.singletonKey) {
    this.singletonKey = createSlug('homepage');
  }
  next();
});

export const HomepageSettings = mongoose.model<IHomepageSettings>('HomepageSettings', homepageSettingsSchema);

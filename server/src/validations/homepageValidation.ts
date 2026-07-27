import { z } from 'zod';

const videoMetadataSchema = z.object({
  publicId: z.string().default(''),
  url: z.string().default(''),
  width: z.number().optional(),
  height: z.number().optional(),
  format: z.string().optional(),
  bytes: z.number().optional(),
  duration: z.number().optional(),
  originalFilename: z.string().optional(),
});

const playbackSettingsSchema = z.object({
  autoplay: z.boolean().default(true),
  loop: z.boolean().default(true),
  muted: z.boolean().default(true),
  volume: z.number().min(0).max(1).default(0.5),
  playbackRate: z.number().min(0.25).max(2).default(1),
});

const appearanceSettingsSchema = z.object({
  width: z.number().min(0).default(100),
  height: z.number().min(0).default(100),
  scale: z.number().min(0.25).max(3).default(1),
  positionX: z.number().min(-100).max(100).default(0),
  positionY: z.number().min(-100).max(100).default(0),
  rotation: z.number().min(-180).max(180).default(0),
  borderRadius: z.number().min(0).max(80).default(24),
  objectFit: z.enum(['cover', 'contain', 'fill', 'none', 'scale-down']).default('cover'),
  objectPosition: z.enum(['center', 'top', 'bottom', 'left', 'right', 'custom']).default('center'),
  customObjectPositionX: z.number().min(0).max(100).default(50),
  customObjectPositionY: z.number().min(0).max(100).default(50),
  opacity: z.number().min(0).max(1).default(1),
  brightness: z.number().min(0).max(2).default(1),
  contrast: z.number().min(0).max(2).default(1),
  saturation: z.number().min(0).max(2).default(1),
  blur: z.number().min(0).max(20).default(0),
  grayscale: z.number().min(0).max(1).default(0),
  sepia: z.number().min(0).max(1).default(0),
  hueRotation: z.number().min(0).max(360).default(0),
});

const themeSettingsSchema = z.object({
  light: z.object({
    opacity: z.number().min(0).max(1).default(1),
    brightness: z.number().min(0).max(2).default(1),
    overlayColor: z.string().default('#ffffff'),
    overlayOpacity: z.number().min(0).max(1).default(0.18),
  }),
  dark: z.object({
    opacity: z.number().min(0).max(1).default(0.95),
    brightness: z.number().min(0).max(2).default(0.9),
    overlayColor: z.string().default('#000000'),
    overlayOpacity: z.number().min(0).max(1).default(0.45),
  }),
});

const responsiveBreakpointSchema = z.object({
  scale: z.number().min(0.25).max(3).default(1),
  positionX: z.number().min(-100).max(100).default(0),
  positionY: z.number().min(-100).max(100).default(0),
  width: z.number().min(0).default(100),
  height: z.number().min(0).default(100),
  overlayColor: z.string().default('#000000'),
  overlayOpacity: z.number().min(0).max(1).default(0.35),
});

const overlaySettingsSchema = z.object({
  type: z.enum(['solid', 'gradient', 'none']).default('gradient'),
  color: z.string().default('#0a0a12'),
  opacity: z.number().min(0).max(1).default(0.4),
  gradientDirection: z.string().default('135deg'),
});

const contentPanelSettingsSchema = z.object({
  enabled: z.boolean().default(true),
  backgroundOpacity: z.number().min(0).max(1).default(0.82),
});

const heroTextSchema = z.object({
  heading: z.string().min(1).default('Explore the History of World Warfare'),
  subtitle: z.string().min(1).default('Journey through millennia of military history.'),
  headingStyle: z.object({
    color: z.string().default('#e8e4dc'),
    bold: z.boolean().default(true),
    italic: z.boolean().default(false),
    underline: z.boolean().default(false),
  }),
  subtitleStyle: z.object({
    color: z.string().default('#b0aca4'),
    bold: z.boolean().default(false),
    italic: z.boolean().default(false),
    underline: z.boolean().default(false),
  }),
  primaryButton: z.object({
    label: z.string().min(1).default('Browse Regions'),
    href: z.string().min(1).default('/#regions'),
  }),
  primaryButtonStyle: z.object({
    backgroundColor: z.string().default('#c9a84c'),
    textColor: z.string().default('#0a0a12'),
    borderColor: z.string().default('#c9a84c'),
  }),
  secondaryButton: z.object({
    label: z.string().min(1).default('Learn More'),
    href: z.string().min(1).default('/about'),
  }),
  secondaryButtonStyle: z.object({
    backgroundColor: z.string().default('#141422'),
    textColor: z.string().default('#e8e4dc'),
    borderColor: z.string().default('#2a2a44'),
  }),
});

const statisticsSchema = z.array(
  z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  })
).min(1);

export const homepageSettingsSchema = z.object({
  heroVideo: videoMetadataSchema.optional(),
  removeHeroVideo: z.boolean().optional().default(false),
  playbackSettings: playbackSettingsSchema,
  appearanceSettings: appearanceSettingsSchema,
  themeSettings: themeSettingsSchema,
  responsiveSettings: z.object({
    desktop: responsiveBreakpointSchema,
    tablet: responsiveBreakpointSchema,
    mobile: responsiveBreakpointSchema,
  }),
  overlaySettings: overlaySettingsSchema,
  contentPanelSettings: contentPanelSettingsSchema,
  heroText: heroTextSchema,
  statistics: statisticsSchema,
});

export type HomepageSettingsInput = z.infer<typeof homepageSettingsSchema>;

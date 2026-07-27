import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { HomepageSettings, IHomepageSettings } from '../models/HomepageSettings';
import { MediaService } from './media/media.service';
import { homepageSettingsSchema, HomepageSettingsInput } from '../validations/homepageValidation';

const HOMEPAGE_KEY = 'homepage';
const MAX_VIDEO_DURATION_SECONDS = 30;
const MAX_VIDEO_WIDTH = 1920;
const MAX_VIDEO_HEIGHT = 1080;

const getOrCreateHomepageSettings = async (): Promise<IHomepageSettings> => {
  const existing = await HomepageSettings.findOne({ singletonKey: HOMEPAGE_KEY });
  if (existing) {
    return existing;
  }

  return HomepageSettings.create({ singletonKey: HOMEPAGE_KEY });
};

export class HomepageService {
  static async getSettings(): Promise<IHomepageSettings> {
    return getOrCreateHomepageSettings();
  }

  static async updateSettings(data: HomepageSettingsInput, videoFile?: Express.Multer.File): Promise<IHomepageSettings> {
    const settings = await getOrCreateHomepageSettings();
    const parsed = homepageSettingsSchema.parse(data);

    if (parsed.removeHeroVideo) {
      await MediaService.deleteVideo(settings.heroVideo?.publicId || undefined);
      settings.heroVideo = undefined;
    }

    if (videoFile) {
      const uploadedVideo = await MediaService.uploadVideo(videoFile.buffer, {
        folder: `${env.CLOUDINARY_FOLDER_PREFIX}/homepage`,
        filename: videoFile.originalname,
      });

      if ((uploadedVideo.duration || 0) > MAX_VIDEO_DURATION_SECONDS) {
        await MediaService.deleteVideo(uploadedVideo.publicId);
        throw ApiError.badRequest(`Hero video must be ${MAX_VIDEO_DURATION_SECONDS} seconds or less`);
      }

      if ((uploadedVideo.width || 0) > MAX_VIDEO_WIDTH || (uploadedVideo.height || 0) > MAX_VIDEO_HEIGHT) {
        await MediaService.deleteVideo(uploadedVideo.publicId);
        throw ApiError.badRequest(`Hero video resolution must be ${MAX_VIDEO_WIDTH}x${MAX_VIDEO_HEIGHT} or lower`);
      }

      await MediaService.deleteVideo(settings.heroVideo?.publicId || undefined);
      settings.heroVideo = uploadedVideo;
    }

    settings.playbackSettings = parsed.playbackSettings;
    settings.appearanceSettings = parsed.appearanceSettings;
    settings.themeSettings = parsed.themeSettings;
    settings.responsiveSettings = parsed.responsiveSettings;
    settings.overlaySettings = parsed.overlaySettings;
    settings.contentPanelSettings = parsed.contentPanelSettings;
    settings.heroText = parsed.heroText;
    settings.statistics = parsed.statistics;

    return settings.save();
  }
}

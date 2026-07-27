import { ApiError } from '../../utils/ApiError';
import { CloudinaryService } from './cloudinary.service';
import { ImageMetadata, ReplaceImageOptions, ReplaceVideoOptions, UploadImageOptions, UploadVideoOptions, VideoMetadata } from './types';

export class MediaService {
  static async uploadImage(buffer: Buffer, options: UploadImageOptions): Promise<ImageMetadata> {
    if (!buffer || buffer.length === 0) {
      throw ApiError.badRequest('Image file is required');
    }

    return CloudinaryService.uploadImage(buffer, options);
  }

  static async replaceImage(buffer: Buffer, options: ReplaceImageOptions): Promise<ImageMetadata> {
    const uploadedImage = await this.uploadImage(buffer, options);

    if (options.previousPublicId) {
      await CloudinaryService.deleteImage(options.previousPublicId);
    }

    return uploadedImage;
  }

  static async deleteImage(publicId?: string | null): Promise<void> {
    if (!publicId) {
      return;
    }

    await CloudinaryService.deleteImage(publicId);
  }

  static async uploadVideo(buffer: Buffer, options: UploadVideoOptions): Promise<VideoMetadata> {
    if (!buffer || buffer.length === 0) {
      throw ApiError.badRequest('Video file is required');
    }

    return CloudinaryService.uploadVideo(buffer, options);
  }

  static async replaceVideo(buffer: Buffer, options: ReplaceVideoOptions): Promise<VideoMetadata> {
    const uploadedVideo = await this.uploadVideo(buffer, options);

    if (options.previousPublicId) {
      await CloudinaryService.deleteVideo(options.previousPublicId);
    }

    return uploadedVideo;
  }

  static async deleteVideo(publicId?: string | null): Promise<void> {
    if (!publicId) {
      return;
    }

    await CloudinaryService.deleteVideo(publicId);
  }

  static resolveImageUrl(publicIdOrUrl: string): string {
    if (!publicIdOrUrl) {
      return '';
    }

    if (publicIdOrUrl.startsWith('http://') || publicIdOrUrl.startsWith('https://')) {
      return publicIdOrUrl;
    }

    return CloudinaryService.getImageUrl(publicIdOrUrl);
  }
}
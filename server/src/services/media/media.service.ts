import { ApiError } from '../../utils/ApiError';
import { CloudinaryService } from './cloudinary.service';
import { ImageMetadata, ReplaceImageOptions, UploadImageOptions } from './types';

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
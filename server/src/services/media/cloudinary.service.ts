import { v2 as cloudinary } from 'cloudinary';

import { env } from '../../config/env';
import { ApiError } from '../../utils/ApiError';
import { ImageMetadata, UploadImageOptions } from './types';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

const buildResourceName = (filename?: string): string | undefined => {
  if (!filename) {
    return undefined;
  }

  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
};

export class CloudinaryService {
  static async uploadImage(buffer: Buffer, options: UploadImageOptions): Promise<ImageMetadata> {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: options.folder,
            resource_type: 'image',
            public_id: buildResourceName(options.filename),
          },
          (error, uploadResult) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(uploadResult);
          }
        );

        stream.end(buffer);
      });

      if (!result?.secure_url || !result?.public_id) {
        throw ApiError.internal('Cloudinary upload returned an invalid response');
      }

      return {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        originalFilename: options.filename,
        opacity: options.opacity,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      const cloudinaryError = error as Error & { http_code?: number };
      const message = cloudinaryError.message || 'Failed to upload image to Cloudinary';

      if (cloudinaryError.http_code && cloudinaryError.http_code < 500) {
        throw ApiError.badRequest(message);
      }

      throw ApiError.internal(message);
    }
  }

  static async deleteImage(publicId: string): Promise<void> {
    if (!publicId) {
      throw ApiError.badRequest('Image publicId is required for deletion');
    }

    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    } catch {
      throw ApiError.internal('Failed to delete image from Cloudinary');
    }
  }

  static getImageUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      secure: true,
      transformation: env.CLOUDINARY_TRANSFORMATIONS,
    });
  }
}
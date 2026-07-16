import { Region, IRegion } from '../models/Region';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { MediaService } from './media/media.service';
import { ImageMetadata } from './media/types';
import { CreateRegionInput, UpdateRegionInput } from '../validations/regionValidation';

export class RegionService {
  static async getAll(): Promise<IRegion[]> {
    return Region.find().sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<IRegion> {
    const region = await Region.findOne({ slug });
    if (!region) {
      throw ApiError.notFound(`Region not found: ${slug}`);
    }
    return region;
  }

  static async getById(id: string): Promise<IRegion> {
    const region = await Region.findById(id);
    if (!region) {
      throw ApiError.notFound('Region not found');
    }
    return region;
  }

  static async create(data: CreateRegionInput, imageFile?: Express.Multer.File): Promise<IRegion> {
    const image = imageFile
      ? await MediaService.uploadImage(imageFile.buffer, {
          folder: `${env.CLOUDINARY_FOLDER_PREFIX}/regions`,
          filename: imageFile.originalname,
        })
      : undefined;

    return Region.create({
      ...data,
      ...(image ? { image } : {}),
    });
  }

  static async update(id: string, data: UpdateRegionInput, imageFile?: Express.Multer.File): Promise<IRegion> {
    const region = await Region.findById(id);
    if (!region) {
      throw ApiError.notFound('Region not found');
    }

    Object.assign(region, data);

    if (imageFile) {
      const image = await MediaService.replaceImage(imageFile.buffer, {
        folder: `${env.CLOUDINARY_FOLDER_PREFIX}/regions`,
        filename: imageFile.originalname,
        previousPublicId: region.image?.publicId || undefined,
      });

      region.image = image as ImageMetadata;
    }

    return region.save();
  }

  static async delete(id: string): Promise<void> {
    const region = await Region.findByIdAndDelete(id);
    if (!region) {
      throw ApiError.notFound('Region not found');
    }

    await MediaService.deleteImage(region.image?.publicId || undefined);
  }
}

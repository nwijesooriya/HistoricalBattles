import { War, IWar } from '../models/War';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { MediaService } from './media/media.service';
import { ImageMetadata } from './media/types';
import { CreateWarInput, UpdateWarInput } from '../validations/warValidation';

export class WarService {
  static async getAll(): Promise<IWar[]> {
    return War.find()
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<IWar> {
    const war = await War.findOne({ slug })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!war) {
      throw ApiError.notFound(`War not found: ${slug}`);
    }
    return war;
  }

  static async getById(id: string): Promise<IWar> {
    const war = await War.findById(id)
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!war) {
      throw ApiError.notFound('War not found');
    }
    return war;
  }

  static async getByRegion(regionId: string): Promise<IWar[]> {
    return War.find({ regionId })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getByEra(eraId: string): Promise<IWar[]> {
    return War.find({ eraId })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async create(data: CreateWarInput): Promise<IWar> {
    const { image: _image, ...payload } = data;
    return War.create(payload);
  }

  static async createWithImage(data: CreateWarInput, imageFile?: Express.Multer.File): Promise<IWar> {
    const image = imageFile
      ? await MediaService.uploadImage(imageFile.buffer, {
          folder: `${env.CLOUDINARY_FOLDER_PREFIX}/wars`,
          filename: imageFile.originalname,
        })
      : undefined;

    const { image: _image, ...payload } = data;

    return War.create({
      ...payload,
      ...(image ? { image } : {}),
    });
  }

  static async update(id: string, data: UpdateWarInput, imageFile?: Express.Multer.File): Promise<IWar> {
    const war = await War.findById(id);
    if (!war) {
      throw ApiError.notFound('War not found');
    }

    const { image: _image, ...payload } = data;
    Object.assign(war, payload);

    if (imageFile) {
      const image = await MediaService.replaceImage(imageFile.buffer, {
        folder: `${env.CLOUDINARY_FOLDER_PREFIX}/wars`,
        filename: imageFile.originalname,
        previousPublicId: war.image?.publicId || undefined,
      });

      war.image = image as ImageMetadata;
    }

    return war.save();
  }

  static async delete(id: string): Promise<void> {
    const war = await War.findByIdAndDelete(id);
    if (!war) {
      throw ApiError.notFound('War not found');
    }
  }
}

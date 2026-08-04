import { Kingdom, IKingdom } from '../models/Kingdom';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { MediaService } from './media/media.service';
import { ImageMetadata } from './media/types';
import { CreateKingdomInput, UpdateKingdomInput } from '../validations/kingdomValidation';

export class KingdomService {
  static async getAll(): Promise<IKingdom[]> {
    return Kingdom.find()
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<IKingdom> {
    const kingdom = await Kingdom.findOne({ slug })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!kingdom) {
      throw ApiError.notFound(`Kingdom not found: ${slug}`);
    }
    return kingdom;
  }

  static async getById(id: string): Promise<IKingdom> {
    const kingdom = await Kingdom.findById(id)
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!kingdom) {
      throw ApiError.notFound('Kingdom not found');
    }
    return kingdom;
  }

  static async getByRegion(regionId: string): Promise<IKingdom[]> {
    return Kingdom.find({ regionId })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getByEra(eraId: string): Promise<IKingdom[]> {
    return Kingdom.find({ eraId })
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async create(data: CreateKingdomInput): Promise<IKingdom> {
    const { image: _image, ...payload } = data;
    return Kingdom.create(payload);
  }

  static async createWithImage(data: CreateKingdomInput, imageFile?: Express.Multer.File): Promise<IKingdom> {
    const image = imageFile
      ? await MediaService.uploadImage(imageFile.buffer, {
          folder: `${env.CLOUDINARY_FOLDER_PREFIX}/kingdoms`,
          filename: imageFile.originalname,
        })
      : undefined;

    const { image: _image, ...payload } = data;

    return Kingdom.create({
      ...payload,
      ...(image ? { image } : {}),
    });
  }

  static async update(id: string, data: UpdateKingdomInput, imageFile?: Express.Multer.File): Promise<IKingdom> {
    const kingdom = await Kingdom.findById(id);
    if (!kingdom) {
      throw ApiError.notFound('Kingdom not found');
    }

    const { image: _image, ...payload } = data;
    Object.assign(kingdom, payload);

    if (imageFile) {
      const image = await MediaService.replaceImage(imageFile.buffer, {
        folder: `${env.CLOUDINARY_FOLDER_PREFIX}/kingdoms`,
        filename: imageFile.originalname,
        previousPublicId: kingdom.image?.publicId || undefined,
      });

      kingdom.image = image as ImageMetadata;
    }

    return kingdom.save();
  }

  static async delete(id: string): Promise<void> {
    const kingdom = await Kingdom.findByIdAndDelete(id);
    if (!kingdom) {
      throw ApiError.notFound('Kingdom not found');
    }
  }
}

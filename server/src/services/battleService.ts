import { Battle, IBattle } from '../models/Battle';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';
import { MediaService } from './media/media.service';
import { ImageMetadata } from './media/types';
import { CreateBattleInput, UpdateBattleInput } from '../validations/battleValidation';

export class BattleService {
  static async getAll(): Promise<IBattle[]> {
    return Battle.find()
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<IBattle> {
    const battle = await Battle.findOne({ slug })
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!battle) {
      throw ApiError.notFound(`Battle not found: ${slug}`);
    }
    return battle;
  }

  static async getById(id: string): Promise<IBattle> {
    const battle = await Battle.findById(id)
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear');
    if (!battle) {
      throw ApiError.notFound('Battle not found');
    }
    return battle;
  }

  static async getByWar(warId: string): Promise<IBattle[]> {
    return Battle.find({ warId })
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getByRegion(regionId: string): Promise<IBattle[]> {
    return Battle.find({ regionId })
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getByEra(eraId: string): Promise<IBattle[]> {
    return Battle.find({ eraId })
      .populate('warId', 'name slug')
      .populate('regionId', 'name slug')
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async create(data: CreateBattleInput): Promise<IBattle> {
    const { image: _image, ...payload } = data;
    return Battle.create(payload);
  }

  static async createWithImage(data: CreateBattleInput, imageFile?: Express.Multer.File): Promise<IBattle> {
    const image = imageFile
      ? await MediaService.uploadImage(imageFile.buffer, {
          folder: `${env.CLOUDINARY_FOLDER_PREFIX}/battles`,
          filename: imageFile.originalname,
        })
      : undefined;

    const { image: _image, ...payload } = data;

    return Battle.create({
      ...payload,
      ...(image ? { image } : {}),
    });
  }

  static async update(id: string, data: UpdateBattleInput, imageFile?: Express.Multer.File): Promise<IBattle> {
    const battle = await Battle.findById(id);
    if (!battle) {
      throw ApiError.notFound('Battle not found');
    }

    const { image: _image, ...payload } = data;
    Object.assign(battle, payload);

    if (imageFile) {
      const image = await MediaService.replaceImage(imageFile.buffer, {
        folder: `${env.CLOUDINARY_FOLDER_PREFIX}/battles`,
        filename: imageFile.originalname,
        previousPublicId: battle.image?.publicId || undefined,
      });

      battle.image = image as ImageMetadata;
    }

    return battle.save();
  }

  static async delete(id: string): Promise<void> {
    const battle = await Battle.findByIdAndDelete(id);
    if (!battle) {
      throw ApiError.notFound('Battle not found');
    }
  }
}

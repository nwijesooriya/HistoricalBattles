import { Era, IEra } from '../models/Era';
import { ApiError } from '../utils/ApiError';
import { CreateEraInput, UpdateEraInput } from '../validations/eraValidation';

export class EraService {
  static async getAll(): Promise<IEra[]> {
    return Era.find().populate('regionIds', 'name slug').sort({ startYear: 1 });
  }

  static async getBySlug(slug: string): Promise<IEra> {
    const era = await Era.findOne({ slug }).populate('regionIds', 'name slug');
    if (!era) {
      throw ApiError.notFound(`Era not found: ${slug}`);
    }
    return era;
  }

  static async getById(id: string): Promise<IEra> {
    const era = await Era.findById(id).populate('regionIds', 'name slug');
    if (!era) {
      throw ApiError.notFound('Era not found');
    }
    return era;
  }

  static async getByRegion(regionId: string): Promise<IEra[]> {
    return Era.find({ regionIds: regionId })
      .populate('regionIds', 'name slug')
      .sort({ startYear: 1 });
  }

  static async create(data: CreateEraInput): Promise<IEra> {
    return Era.create(data);
  }

  static async update(id: string, data: UpdateEraInput): Promise<IEra> {
    const era = await Era.findById(id);
    if (!era) {
      throw ApiError.notFound('Era not found');
    }

    Object.assign(era, data);
    return era.save();
  }

  static async delete(id: string): Promise<void> {
    const era = await Era.findByIdAndDelete(id);
    if (!era) {
      throw ApiError.notFound('Era not found');
    }
  }
}

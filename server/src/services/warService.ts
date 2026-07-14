import { War, IWar } from '../models/War';
import { ApiError } from '../utils/ApiError';
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
    return War.create(data);
  }

  static async update(id: string, data: UpdateWarInput): Promise<IWar> {
    const war = await War.findById(id);
    if (!war) {
      throw ApiError.notFound('War not found');
    }

    Object.assign(war, data);
    return war.save();
  }

  static async delete(id: string): Promise<void> {
    const war = await War.findByIdAndDelete(id);
    if (!war) {
      throw ApiError.notFound('War not found');
    }
  }
}

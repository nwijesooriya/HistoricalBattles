import { Kingdom, IKingdom } from '../models/Kingdom';
import { ApiError } from '../utils/ApiError';
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
    return Kingdom.create(data);
  }

  static async update(id: string, data: UpdateKingdomInput): Promise<IKingdom> {
    const kingdom = await Kingdom.findById(id);
    if (!kingdom) {
      throw ApiError.notFound('Kingdom not found');
    }

    Object.assign(kingdom, data);
    return kingdom.save();
  }

  static async delete(id: string): Promise<void> {
    const kingdom = await Kingdom.findByIdAndDelete(id);
    if (!kingdom) {
      throw ApiError.notFound('Kingdom not found');
    }
  }
}

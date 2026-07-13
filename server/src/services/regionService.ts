import { Region, IRegion } from '../models/Region';
import { ApiError } from '../utils/ApiError';
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

  static async create(data: CreateRegionInput): Promise<IRegion> {
    return Region.create(data);
  }

  static async update(id: string, data: UpdateRegionInput): Promise<IRegion> {
    const region = await Region.findById(id);
    if (!region) {
      throw ApiError.notFound('Region not found');
    }

    Object.assign(region, data);
    return region.save();
  }

  static async delete(id: string): Promise<void> {
    const region = await Region.findByIdAndDelete(id);
    if (!region) {
      throw ApiError.notFound('Region not found');
    }
  }
}

import { Commander, ICommander } from '../models/Commander';
import { ApiError } from '../utils/ApiError';
import { CreateCommanderInput, UpdateCommanderInput } from '../validations/commanderValidation';

export class CommanderService {
  static async getAll(): Promise<ICommander[]> {
    return Commander.find().sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<ICommander> {
    const commander = await Commander.findOne({ slug });
    if (!commander) {
      throw ApiError.notFound(`Commander not found: ${slug}`);
    }
    return commander;
  }

  static async getById(id: string): Promise<ICommander> {
    const commander = await Commander.findById(id);
    if (!commander) {
      throw ApiError.notFound('Commander not found');
    }
    return commander;
  }

  static async create(data: CreateCommanderInput): Promise<ICommander> {
    return Commander.create(data);
  }

  static async update(id: string, data: UpdateCommanderInput): Promise<ICommander> {
    const commander = await Commander.findById(id);
    if (!commander) {
      throw ApiError.notFound('Commander not found');
    }

    Object.assign(commander, data);
    return commander.save();
  }

  static async delete(id: string): Promise<void> {
    const commander = await Commander.findByIdAndDelete(id);
    if (!commander) {
      throw ApiError.notFound('Commander not found');
    }
  }
}

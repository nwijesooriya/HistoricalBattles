import { Source, ISource } from '../models/Source';
import { ApiError } from '../utils/ApiError';
import { CreateSourceInput, UpdateSourceInput } from '../validations/sourceValidation';

export class SourceService {
  static async getAll(): Promise<ISource[]> {
    return Source.find().sort({ year: -1, title: 1 });
  }

  static async getById(id: string): Promise<ISource> {
    const source = await Source.findById(id);
    if (!source) {
      throw ApiError.notFound('Source not found');
    }
    return source;
  }

  static async create(data: CreateSourceInput): Promise<ISource> {
    return Source.create(data);
  }

  static async update(id: string, data: UpdateSourceInput): Promise<ISource> {
    const source = await Source.findById(id);
    if (!source) {
      throw ApiError.notFound('Source not found');
    }

    Object.assign(source, data);
    return source.save();
  }

  static async delete(id: string): Promise<void> {
    const source = await Source.findByIdAndDelete(id);
    if (!source) {
      throw ApiError.notFound('Source not found');
    }
  }
}

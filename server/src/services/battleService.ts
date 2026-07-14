import { Battle, IBattle } from '../models/Battle';
import { ApiError } from '../utils/ApiError';
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
    return Battle.create(data);
  }

  static async update(id: string, data: UpdateBattleInput): Promise<IBattle> {
    const battle = await Battle.findById(id);
    if (!battle) {
      throw ApiError.notFound('Battle not found');
    }

    Object.assign(battle, data);
    return battle.save();
  }

  static async delete(id: string): Promise<void> {
    const battle = await Battle.findByIdAndDelete(id);
    if (!battle) {
      throw ApiError.notFound('Battle not found');
    }
  }
}

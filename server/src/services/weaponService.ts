import { Weapon, IWeapon } from '../models/Weapon';
import { ApiError } from '../utils/ApiError';
import { CreateWeaponInput, UpdateWeaponInput } from '../validations/weaponValidation';

export class WeaponService {
  static async getAll(): Promise<IWeapon[]> {
    return Weapon.find()
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async getBySlug(slug: string): Promise<IWeapon> {
    const weapon = await Weapon.findOne({ slug })
      .populate('eraId', 'name slug startYear endYear');
    if (!weapon) {
      throw ApiError.notFound(`Weapon not found: ${slug}`);
    }
    return weapon;
  }

  static async getById(id: string): Promise<IWeapon> {
    const weapon = await Weapon.findById(id)
      .populate('eraId', 'name slug startYear endYear');
    if (!weapon) {
      throw ApiError.notFound('Weapon not found');
    }
    return weapon;
  }

  static async getByEra(eraId: string): Promise<IWeapon[]> {
    return Weapon.find({ eraId })
      .populate('eraId', 'name slug startYear endYear')
      .sort({ name: 1 });
  }

  static async create(data: CreateWeaponInput): Promise<IWeapon> {
    return Weapon.create(data);
  }

  static async update(id: string, data: UpdateWeaponInput): Promise<IWeapon> {
    const weapon = await Weapon.findById(id);
    if (!weapon) {
      throw ApiError.notFound('Weapon not found');
    }

    Object.assign(weapon, data);
    return weapon.save();
  }

  static async delete(id: string): Promise<void> {
    const weapon = await Weapon.findByIdAndDelete(id);
    if (!weapon) {
      throw ApiError.notFound('Weapon not found');
    }
  }
}

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from '../models/Admin';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import { LoginInput, RegisterInput } from '../validations/authValidation';

export class AuthService {
  /**
   * Register a new admin user.
   */
  static async register(data: RegisterInput): Promise<{ admin: IAdmin; token: string }> {
    const existing = await Admin.findOne({ email: data.email });
    if (existing) {
      throw ApiError.conflict('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const admin = await Admin.create({
      ...data,
      password: hashedPassword,
    });

    // Remove password from response
    admin.password = undefined as any;

    const token = AuthService.generateToken(admin._id.toString());
    return { admin, token };
  }

  /**
   * Authenticate an admin and return a JWT.
   */
  static async login(data: LoginInput): Promise<{ admin: IAdmin; token: string }> {
    const admin = await Admin.findOne({ email: data.email }).select('+password');
    if (!admin) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(data.password, admin.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Remove password from response
    admin.password = undefined as any;

    const token = AuthService.generateToken(admin._id.toString());
    return { admin, token };
  }

  /**
   * Get admin by ID (for the /me endpoint).
   */
  static async getById(id: string): Promise<IAdmin> {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw ApiError.notFound('Admin not found');
    }
    return admin;
  }

  /**
   * Generate a signed JWT for the given admin ID.
   */
  private static generateToken(id: string): string {
    return jwt.sign({ id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }
}

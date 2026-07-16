import mongoose, { Schema, Document, Types } from 'mongoose';
import { createSlug } from '../utils/slugify';
import { ImageMetadata } from '../services/media/types';
import { imageMetadataSchema } from './imageMetadataSchema';

export interface IWeapon extends Document {
  name: string;
  slug: string;
  description: string;
  type: string;
  eraId: Types.ObjectId;
  image?: ImageMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const weaponSchema = new Schema<IWeapon>(
  {
    name: {
      type: String,
      required: [true, 'Weapon name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    type: {
      type: String,
      required: [true, 'Weapon type is required'],
    },
    eraId: {
      type: Schema.Types.ObjectId,
      ref: 'Era',
      required: [true, 'Era is required'],
    },
    image: {
      type: imageMetadataSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name before saving
weaponSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Weapon = mongoose.model<IWeapon>('Weapon', weaponSchema);

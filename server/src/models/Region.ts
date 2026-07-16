import mongoose, { Schema, Document } from 'mongoose';
import { createSlug } from '../utils/slugify';
import { ImageMetadata } from '../services/media/types';
import { imageMetadataSchema } from './imageMetadataSchema';

export interface IRegion extends Document {
  name: string;
  slug: string;
  description: string;
  image?: ImageMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const regionSchema = new Schema<IRegion>(
  {
    name: {
      type: String,
      required: [true, 'Region name is required'],
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
regionSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Region = mongoose.model<IRegion>('Region', regionSchema);

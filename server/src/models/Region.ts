import mongoose, { Schema, Document } from 'mongoose';
import { createSlug } from '../utils/slugify';

export interface IRegion extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
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
      type: String,
      default: '',
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

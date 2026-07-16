import mongoose, { Schema, Document, Types } from 'mongoose';
import { createSlug } from '../utils/slugify';
import { ImageMetadata } from '../services/media/types';
import { imageMetadataSchema } from './imageMetadataSchema';

export interface ICommander extends Document {
  name: string;
  slug: string;
  description: string;
  birthYear: number;
  deathYear: number;
  nationality: string;
  image?: ImageMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const commanderSchema = new Schema<ICommander>(
  {
    name: {
      type: String,
      required: [true, 'Commander name is required'],
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
    birthYear: {
      type: Number,
      required: [true, 'Birth year is required'],
    },
    deathYear: {
      type: Number,
      required: [true, 'Death year is required'],
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
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
commanderSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Commander = mongoose.model<ICommander>('Commander', commanderSchema);

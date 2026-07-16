import mongoose, { Schema, Document, Types } from 'mongoose';
import { createSlug } from '../utils/slugify';
import { ImageMetadata } from '../services/media/types';
import { imageMetadataSchema } from './imageMetadataSchema';

export interface IKingdom extends Document {
  name: string;
  slug: string;
  description: string;
  regionId: Types.ObjectId;
  eraId: Types.ObjectId;
  startYear: number;
  endYear: number;
  image?: ImageMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const kingdomSchema = new Schema<IKingdom>(
  {
    name: {
      type: String,
      required: [true, 'Kingdom name is required'],
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
    regionId: {
      type: Schema.Types.ObjectId,
      ref: 'Region',
      required: [true, 'Region is required'],
    },
    eraId: {
      type: Schema.Types.ObjectId,
      ref: 'Era',
      required: [true, 'Era is required'],
    },
    startYear: {
      type: Number,
      required: [true, 'Start year is required'],
    },
    endYear: {
      type: Number,
      required: [true, 'End year is required'],
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
kingdomSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Kingdom = mongoose.model<IKingdom>('Kingdom', kingdomSchema);

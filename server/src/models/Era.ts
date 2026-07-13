import mongoose, { Schema, Document, Types } from 'mongoose';
import { createSlug } from '../utils/slugify';

export interface IEra extends Document {
  name: string;
  slug: string;
  startYear: number;
  endYear: number;
  description: string;
  regionIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const eraSchema = new Schema<IEra>(
  {
    name: {
      type: String,
      required: [true, 'Era name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    startYear: {
      type: Number,
      required: [true, 'Start year is required'],
    },
    endYear: {
      type: Number,
      required: [true, 'End year is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    regionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Region',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name before saving
eraSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Era = mongoose.model<IEra>('Era', eraSchema);

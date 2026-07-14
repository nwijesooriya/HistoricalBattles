import mongoose, { Schema, Document, Types } from 'mongoose';
import { createSlug } from '../utils/slugify';

export interface IBattle extends Document {
  name: string;
  slug: string;
  description: string;
  warId: Types.ObjectId;
  regionId: Types.ObjectId;
  eraId: Types.ObjectId;
  date: string;
  location: string;
  outcome: string;
  casualties: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const battleSchema = new Schema<IBattle>(
  {
    name: {
      type: String,
      required: [true, 'Battle name is required'],
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
    warId: {
      type: Schema.Types.ObjectId,
      ref: 'War',
      required: [true, 'War is required'],
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
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    outcome: {
      type: String,
      required: [true, 'Outcome is required'],
    },
    casualties: {
      type: String,
      default: '',
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
battleSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = createSlug(this.name);
  }
  next();
});

export const Battle = mongoose.model<IBattle>('Battle', battleSchema);

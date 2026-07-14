import mongoose, { Schema, Document } from 'mongoose';

export interface ISource extends Document {
  title: string;
  author: string;
  year: number;
  type: string;
  url: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const sourceSchema = new Schema<ISource>(
  {
    title: {
      type: String,
      required: [true, 'Source title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    type: {
      type: String,
      required: [true, 'Source type is required'],
    },
    url: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Source = mongoose.model<ISource>('Source', sourceSchema);

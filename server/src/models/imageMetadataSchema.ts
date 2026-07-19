import { Schema } from 'mongoose';

import { ImageMetadata } from '../services/media/types';

export const imageMetadataSchema = new Schema<ImageMetadata>(
  {
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    format: { type: String, default: '' },
    bytes: { type: Number, default: undefined },
    originalFilename: { type: String, default: '' },
    altText: { type: String, default: '' },
    opacity: { type: Number, default: 1 },
  },
  { _id: false }
);

import { Schema } from 'mongoose';

import { VideoMetadata } from '../services/media/types';

export const videoMetadataSchema = new Schema<VideoMetadata>(
  {
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    format: { type: String, default: '' },
    bytes: { type: Number, default: undefined },
    duration: { type: Number, default: undefined },
    originalFilename: { type: String, default: '' },
  },
  { _id: false }
);
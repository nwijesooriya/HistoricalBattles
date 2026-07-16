export interface ImageMetadata {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  originalFilename?: string;
  altText?: string;
}

export interface UploadImageOptions {
  folder: string;
  filename?: string;
  altText?: string;
}

export interface ReplaceImageOptions extends UploadImageOptions {
  previousPublicId?: string;
}

export interface MediaProvider {
  uploadImage(buffer: Buffer, options: UploadImageOptions): Promise<ImageMetadata>;
  deleteImage(publicId: string): Promise<void>;
  getImageUrl(publicId: string): string;
}
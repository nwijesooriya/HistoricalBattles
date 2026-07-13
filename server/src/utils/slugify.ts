import slugifyLib from 'slugify';

/**
 * Generates a URL-safe slug from the given string.
 * Example: "Battle of Thermopylae" → "battle-of-thermopylae"
 */
export const createSlug = (text: string): string => {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};

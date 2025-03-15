/**
 * Slug Generator Utility
 *
 * Creates URL-friendly slugs from strings for use in URLs, file names, etc.
 */

/**
 * Generate a slug from a string
 *
 * @param text - The string to convert into a slug
 * @param options - Options for slug generation
 * @returns The generated slug
 */
export function slugify(
  text: string,
  options: {
    lowercase?: boolean;
    separator?: string;
    removeStopWords?: boolean;
    maxLength?: number;
    preserveCase?: boolean;
  } = {}
): string {
  // Default options
  const {
    lowercase = true,
    separator = '-',
    removeStopWords = false,
    maxLength = 100,
    preserveCase = false,
  } = options;

  // Common English stop words to remove if requested
  const stopWords = removeStopWords ? [
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'with', 'by', 'as', 'of', 'from', 'about', 'against', 'between', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having',
    'do', 'does', 'did', 'doing'
  ] : [];

  if (!text) return '';

  let slug = text
    // Convert to lowercase if requested
    .toString()
    .trim()

    // Replace spaces with separator
    .replace(/\s+/g, separator)

    // Remove special characters except the separator
    .replace(new RegExp(`[^a-zA-Z0-9\\${separator}]`, 'g'), '')

    // Replace multiple instances of the separator with a single one
    .replace(new RegExp(`\\${separator}+`, 'g'), separator)

    // Remove separator from beginning and end
    .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), '');

  // Remove stop words if requested
  if (removeStopWords) {
    const parts = slug.split(separator);
    const filteredParts = parts.filter(
      part => !stopWords.includes(part.toLowerCase())
    );
    slug = filteredParts.join(separator);
  }

  // Convert to lowercase if requested
  if (lowercase && !preserveCase) {
    slug = slug.toLowerCase();
  }

  // Truncate to max length, making sure not to cut off in the middle of a word
  if (maxLength > 0 && slug.length > maxLength) {
    // Find the last occurrence of the separator before maxLength
    const lastSeparator = slug.substring(0, maxLength).lastIndexOf(separator);
    if (lastSeparator !== -1) {
      slug = slug.substring(0, lastSeparator);
    } else {
      // If no separator found, just truncate at maxLength
      slug = slug.substring(0, maxLength);
    }
  }

  return slug;
}

/**
 * Generate a unique slug by appending a random string if necessary
 * For use in databases where slugs must be unique
 *
 * @param text - The string to convert into a slug
 * @param existingSlugs - Array of existing slugs to check against
 * @param options - Options for slug generation
 * @returns A unique slug
 */
export function uniqueSlug(
  text: string,
  existingSlugs: string[] = [],
  options = {}
): string {
  let slug = slugify(text, options);

  // If slug already exists, append a random number
  if (existingSlugs.includes(slug)) {
    const randomSuffix = Math.floor(Math.random() * 10000);
    slug = `${slug}-${randomSuffix}`;

    // In the extremely unlikely case this also exists, try again recursively
    if (existingSlugs.includes(slug)) {
      return uniqueSlug(slug, existingSlugs, options);
    }
  }

  return slug;
}

/**
 * Image configuration for Sanity image URLs
 * This file centralizes image quality and format settings
 */

export const IMAGE_CONFIG = {
  /**
   * Image quality (0-100)
   * Lower values = smaller file size, lower quality
   * Higher values = larger file size, better quality
   */
  quality: 50,
  
  /**
   * Enable automatic format selection (WebP, AVIF, etc.)
   * Set to true to serve optimized formats based on browser support
   */
  autoFormat: true,
} as const


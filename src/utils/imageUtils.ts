/**
 * Image utility functions for responsive images and optimization
 */
import { urlFor } from '@/sanity/client'
import { IMAGE_CONFIG } from '@/config/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface ResponsiveImage {
  src: string
  srcset: string
  sizes: string
  width: number
  height: number
  alt?: string
}

/**
 * Generate responsive image URLs with srcset for different screen sizes
 */
export function generateResponsiveImage(
  source: SanityImageSource,
  options: {
    alt?: string
    aspectRatio?: number
    baseWidth?: number
    maxWidth?: number
  } = {}
): ResponsiveImage | null {
  if (!source) return null

  const {
    alt,
    aspectRatio = 16 / 9,
    baseWidth = 960,
    maxWidth = 1920,
  } = options

  try {
    // Generate base image
    const baseBuilder = urlFor(source).width(baseWidth).quality(IMAGE_CONFIG.quality)
    const baseUrl = IMAGE_CONFIG.autoFormat
      ? baseBuilder.auto('format').url()
      : baseBuilder.url()

    if (!baseUrl) return null

    // Generate srcset for different screen sizes
    const widths = [
      320,   // Mobile small
      480,   // Mobile large
      640,   // Tablet small
      768,   // Tablet
      960,   // Desktop small
      1280,  // Desktop
      1600,  // Desktop large
      1920,  // Desktop XL
    ].filter(w => w <= maxWidth)

    const srcset = widths
      .map(width => {
        const builder = urlFor(source)
          .width(width)
          .quality(IMAGE_CONFIG.quality)
        
        const url = IMAGE_CONFIG.autoFormat
          ? builder.auto('format').url()
          : builder.url()
        
        return `${url} ${width}w`
      })
      .join(', ')

    const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

    return {
      src: baseUrl,
      srcset,
      sizes,
      width: baseWidth,
      height: Math.round(baseWidth / aspectRatio),
      alt,
    }
  } catch {
    return null
  }
}

/**
 * Generate optimized image URL with specific dimensions
 */
export function generateImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = IMAGE_CONFIG.quality
): string | null {
  if (!source) return null

  try {
    let builder = urlFor(source).width(width).quality(quality)
    
    if (height) {
      builder = builder.height(height)
    }
    
    return IMAGE_CONFIG.autoFormat
      ? builder.auto('format').url()
      : builder.url()
  } catch {
    return null
  }
}



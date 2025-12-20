import { defineQuery } from 'groq'

// Types
export interface Post {
  _id: string
  title: string
  slug: { current: string } | null
}

export interface CTAButton {
  label: string
  link: string
  variant: 'primary' | 'secondary' | 'outline'
}

export interface Hero {
  _id: string
  title: string
  subtitle?: string
  description?: string
  backgroundVideo?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  ctaButtons?: CTAButton[]
  alignment?: 'left' | 'center' | 'right'
  isActive?: boolean
}

export interface CMSDemoProduct {
  _key?: string
  product?: {
    _id: string
    name: string
    price: number
    currency?: string
    images?: Array<{
      asset: {
        _ref: string
        _type: string
        url?: string
      }
      alt?: string
    }>
  }
  customProduct?: {
    name: string
    price: number
    image: {
      asset: {
        _ref: string
        _type: string
        url?: string
      }
      alt?: string
    }
  }
  position: 'top-left' | 'top-right' | 'bottom-center'
}

export interface CMSDemoFeature {
  _key?: string
  icon: 'lightning' | 'dashboard' | 'shield'
  title: string
  description: string
}

export interface CMSDemo {
  _id: string
  badge: string
  heading: {
    line1: string
    line2: string
  }
  description: string
  products: CMSDemoProduct[]
  features: CMSDemoFeature[]
  isActive?: boolean
}

export interface ClientLogo {
  _id: string
  name: string
  logo: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  url?: string
  order?: number
  isActive?: boolean
}

export interface UseCaseItem {
  _key?: string
  mediaType: 'image' | 'video'
  image?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  video?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  alt?: string
  caption?: string
  size?: 'short' | 'medium' | 'tall'
}

export interface UseCaseSection {
  _id: string
  heading: string
  description: string
  items: UseCaseItem[]
  isActive?: boolean
}

export interface ProductSlideFeature {
  _key?: string
  text: string
  icon?: string
}

export interface ProductSlide {
  _id: string
  name: string
  tagline: string
  slideImage: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  features?: ProductSlideFeature[]
  product?: {
    _id: string
    name: string
  }
  ctaLink?: string
  order?: number
  isActive?: boolean
}

export interface ProductVariant {
  _key: string
  name: string
  sku?: string
  colorHex?: string
  image?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
    alt?: string
  }
  images?: Array<{
    asset: {
      _ref: string
      _type: string
      url?: string
    }
    alt?: string
  }>
  price?: number
  compareAtPrice?: number
  inStock?: boolean
  stockQuantity?: number
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  sku?: string
  description?: string
  images?: Array<{
    asset: {
      _ref: string
      _type: string
      url?: string
    }
    alt?: string
  }>
  price: number
  currency?: string
  compareAtPrice?: number
  hasVariants?: boolean
  variantType?: 'color' | 'size' | 'material' | 'style' | 'custom'
  variants?: ProductVariant[]
  category?: string
  tags?: string[]
  inStock?: boolean
  stockQuantity?: number
  featured?: boolean
  status?: 'active' | 'draft' | 'archived'
}

// Queries
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug
  }
`)

export const HERO_QUERY = defineQuery(/* groq */ `
  *[_type == "hero" && isActive == true] | order(_createdAt desc) [0] {
    _id,
    title,
    subtitle,
    description,
    backgroundVideo {
      asset-> {
        _id,
        url
      }
    },
    ctaButtons[] {
      label,
      link,
      variant
    },
    alignment,
    isActive
  }
`)

export const CMS_DEMO_QUERY = defineQuery(/* groq */ `
  *[_type == "cmsDemo" && isActive == true] | order(_createdAt desc) [0] {
    _id,
    badge,
    heading {
      line1,
      line2
    },
    description,
    products[] {
      _key,
      position,
      product-> {
        _id,
        name,
        price,
        currency,
        images[] {
          asset-> {
            _id,
            url
          },
          alt
        }
      },
      customProduct {
        name,
        price,
        image {
          asset-> {
            _id,
            url
          },
          alt
        }
      }
    },
    features[] {
      _key,
      icon,
      title,
      description
    },
    isActive
  }
`)

export const CLIENT_LOGOS_QUERY = defineQuery(/* groq */ `
  *[_type == "clientLogo" && isActive == true] | order(order asc) {
    _id,
    name,
    logo {
      asset-> {
        _id,
        url
      }
    },
    url,
    order,
    isActive
  }
`)

export const USE_CASE_SECTION_QUERY = defineQuery(/* groq */ `
  *[_type == "useCaseSection" && isActive == true] | order(_createdAt desc) [0] {
    _id,
    heading,
    description,
    items[] {
      _key,
      mediaType,
      image {
        asset-> {
          _id,
          url
        }
      },
      video {
        asset-> {
          _id,
          url
        }
      },
      alt,
      caption,
      size
    },
    isActive
  }
`)

export const PRODUCT_SLIDES_QUERY = defineQuery(/* groq */ `
  *[_type == "productSlide" && isActive == true] | order(order asc) {
    _id,
    name,
    tagline,
    slideImage {
      asset-> {
        _id,
        url
      }
    },
    features[] {
      _key,
      text,
      icon
    },
    product-> {
      _id,
      name
    },
    ctaLink,
    order,
    isActive
  }
`)

export const PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && status == "active"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    sku,
    description,
    images[] {
      asset-> {
        _id,
        url
      },
      alt
    },
    price,
    currency,
    compareAtPrice,
    hasVariants,
    variantType,
    variants[] {
      _key,
      name,
      sku,
      colorHex,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      images[] {
        asset-> {
          _id,
          url
        },
        alt
      },
      price,
      compareAtPrice,
      inStock,
      stockQuantity
    },
    category,
    tags,
    inStock,
    stockQuantity,
    featured,
    status
  }
`)

// Site Settings
export interface SocialMedia {
  twitter?: string
  instagram?: string
  linkedin?: string
  facebook?: string
  youtube?: string
  tiktok?: string
}

export interface SiteSettings {
  _id: string
  companyName: string
  tagline?: string
  logo?: {
    asset: {
      _ref: string
      _type: string
      url?: string
    }
  }
  address?: string
  phone?: string
  email?: string
  whatsapp?: string
  socialMedia?: SocialMedia
}

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    companyName,
    tagline,
    logo {
      asset-> {
        _id,
        url
      }
    },
    address,
    phone,
    email,
    whatsapp,
    socialMedia {
      twitter,
      instagram,
      linkedin,
      facebook,
      youtube,
      tiktok
    }
  }
`)


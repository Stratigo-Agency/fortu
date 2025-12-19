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


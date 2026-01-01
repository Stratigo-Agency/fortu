<template>
  <!-- Loading State -->
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-fortu-off-white">
    <div class="w-8 h-8 border-2 border-fortu-dark border-t-transparent rounded-full animate-spin"></div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center bg-fortu-off-white">
    <div class="text-center px-4">
      <h1 class="text-2xl font-medium text-fortu-dark mb-4">Product Not Found</h1>
      <p class="text-fortu-medium mb-8">{{ error }}</p>
      <Button href="/products" variant="primary">
        Back to Products
      </Button>
    </div>
  </div>

  <!-- Product Detail -->
  <div v-else-if="product" class="bg-fortu-off-white">
    <!-- Product Hero -->
    <ProductHero
      :product-name="product.name"
      :description="product.description"
      :hero-image="product.heroImage"
      :hero-video="product.heroVideo"
      :price="displayPrice"
      :compare-at-price="compareAtPrice"
      :currency="product.currency"
      :has-variants="product.hasVariants"
      :variants="product.variants"
      :variant-type="product.variantType"
      :selected-variant-key="selectedVariant?._key"
      @select-variant="selectVariant"
    />

    <!-- Image Carousel Section -->
    <ImageCarousel
      v-if="carouselImages.length > 0"
      :images="carouselImages"
      heading="Take a closer look."
      :variants="product.variants"
      :variant-type="product.variantType"
      :selected-variant-key="selectedVariant?._key"
      :selected-variant-name="selectedVariant?.name"
      @select-variant="selectVariant"
      class="bg-fortu-dark pt-12"
    />

    <!-- Feature Sections -->
    <ProductSingleFeature
      v-for="feature in product.features"
      :key="feature._key"
      :feature="feature"
    />

    <!-- Specifications Section -->
    <section v-if="product.specs && product.specs.length > 0" class="py-16 px-4 md:px-16 bg-white">
      <div>
        <h2 class="text-4xl md:text-4xl font-medium text-fortu-dark mb-10 tracking-tight">
          Spesifikasi
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div 
            v-for="(spec, index) in product.specs" 
            :key="spec._key || index"
            class="p-6 bg-fortu-off-white rounded-xl"
          >
            <div class="w-12 h-12 rounded-full bg-fortu-dark/10 flex items-center justify-center mb-4">
              <CompareIcon :icon="spec.icon || 'check'" class="text-fortu-dark" />
            </div>
            <p class="font-medium text-fortu-dark">{{ spec.label }}</p>
            <p v-if="spec.value" class="text-sm text-fortu-medium mt-1">{{ spec.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Recommendations -->
    <ProductRecommendation
      :current-product-id="product._id"
      :current-product-slug="product.slug?.current"
    />

    <CTA variant="dark" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { PRODUCT_BY_SLUG_QUERY, type Product, type ProductVariant } from '@/sanity/queries'
import Button from '@/reusables/Button.vue'
import CompareIcon from '@/components/CompareIcon.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import ProductHero from '@/components/productDetail/ProductHero.vue'
import ProductSingleFeature from '@/components/productDetail/ProductSingleFeature.vue'
import ProductRecommendation from '@/components/productDetail/ProductRecommendation.vue'
import CTA from '@/components/CTA.vue'
const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const selectedVariant = ref<ProductVariant | null>(null)

const carouselImages = computed(() => {
  const images: { url: string; alt?: string }[] = []
  
  // Add all product images
  if (product.value?.images) {
    product.value.images.forEach((img, index) => {
      if (img.asset) {
        const url = img.asset.url || (img.asset._ref ? urlFor(img.asset).width(960).url() : null)
        if (url) {
          images.push({
            url,
            alt: img.alt || `${product.value?.name} image ${index + 1}`
          })
        }
      }
    })
  }
  
  // Add variant images if any
  if (product.value?.variants) {
    product.value.variants.forEach(variant => {
      if (variant.image?.asset) {
        const url = variant.image.asset.url || 
          (variant.image.asset._ref ? urlFor(variant.image.asset).width(960).url() : null)
        if (url && !images.some(img => img.url === url)) {
          images.push({
            url,
            alt: `${product.value?.name} - ${variant.name}`
          })
        }
      }
    })
  }
  
  return images
})

const displayPrice = computed(() => {
  if (selectedVariant.value?.price) {
    return selectedVariant.value.price
  }
  return product.value?.price || 0
})

const compareAtPrice = computed(() => {
  if (selectedVariant.value?.compareAtPrice && selectedVariant.value.compareAtPrice > displayPrice.value) {
    return selectedVariant.value.compareAtPrice
  }
  if (product.value?.compareAtPrice && product.value.compareAtPrice > displayPrice.value) {
    return product.value.compareAtPrice
  }
  return undefined
})

const selectVariant = (variant: ProductVariant) => {
  selectedVariant.value = variant
}

watch(() => route.params.slug, async (newSlug) => {
  if (newSlug) {
    await fetchProduct(newSlug as string)
  }
})

const fetchProduct = async (slug: string) => {
  loading.value = true
  error.value = null
  
  try {
    const productData = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug })
    
    if (!productData) {
      error.value = 'The product you are looking for does not exist.'
      return
    }
    
    product.value = productData
    
    // Auto-select first variant
    if (productData.hasVariants && productData.variants && productData.variants.length > 0) {
      selectedVariant.value = productData.variants[0]
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch product'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  if (slug) {
    fetchProduct(slug)
  }
})
</script>

<style scoped>
/* Product detail styles */
</style>


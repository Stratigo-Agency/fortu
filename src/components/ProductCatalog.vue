<template>
  <div class="product-catalog">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="w-8 h-8 border-2 border-fortu-dark border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-20 text-fortu-medium">
      No products found. Add some products in Sanity Studio.
    </div>

    <!-- Products Carousel -->
    <ImageCarousel
      v-else
      :images="productImages"
      :clickable="true"
      heading="Produk Kami"
      :show-button="true"
      mode="light"
      @image-click="handleProductClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { PRODUCTS_QUERY, type Product } from '@/sanity/queries'
import ImageCarousel from '@/components/ImageCarousel.vue'

const router = useRouter()
const route = useRoute()
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'product-click', slug: string): void
  (e: 'close-navbar'): void
}>()

const getProductImage = (product: Product): string | undefined => {
  const firstImage = product.images?.[0]
  if (firstImage?.asset) {
    if (firstImage.asset.url) {
      return firstImage.asset.url
    }
    try {
      // Pass the full image object (not just asset) to preserve hotspot and crop
      return urlFor(firstImage).width(600).height(600).quality(75).auto('format').url()
    } catch {
      return undefined
    }
  }
  return undefined
}

const productImages = computed(() => {
  return products.value.map(product => ({
    url: getProductImage(product) || '/placeholder.jpg',
    alt: product.name,
    caption: product.name,
    slug: product.slug.current
  }))
})

const handleProductClick = (index: number) => {
  const product = products.value[index]
  if (product?.slug?.current) {
    const productSlug = product.slug.current
    const currentPath = route.path
    
    // Check if we're already on this product's page
    if (currentPath === `/products/${productSlug}`) {
      // Emit event to close navbar
      emit('close-navbar')
    } else {
      // Navigate to the product page
      router.push(`/products/${productSlug}`)
      emit('product-click', productSlug)
    }
  }
}

onMounted(async () => {
  try {
    products.value = await client.fetch(PRODUCTS_QUERY)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch products'
  } finally {
    loading.value = false
  }
})
</script>

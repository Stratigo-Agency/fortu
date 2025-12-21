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

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="product in products" 
        :key="product._id"
        class="product-card bg-white rounded-2xl overflow-hidden"
      >
        <!-- Product Image -->
        <div class="relative aspect-square">
          <img 
            v-if="getProductImage(product)"
            :src="getProductImage(product)"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-fortu-light/20 flex items-center justify-center text-fortu-medium">
            No Image
          </div>
          
          <!-- Sale Badge -->
          <div 
            v-if="product.compareAtPrice && product.compareAtPrice > product.price"
            class="absolute top-4 left-4 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
          >
            Sale
          </div>

          <!-- Featured Badge -->
          <div 
            v-if="product.featured"
            class="absolute top-4 right-4 bg-fortu-dark text-fortu-off-white text-xs font-medium px-2 py-1 rounded-full"
          >
            Featured
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-6">
          <h3 class="text-lg font-medium text-fortu-dark mb-2">{{ product.name }}</h3>
          
          <!-- Description (truncated) -->
          <p v-if="product.description" class="text-sm text-fortu-medium mb-4 line-clamp-2">
            {{ product.description }}
          </p>
          
          <!-- Price -->
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl font-medium text-fortu-dark">
              {{ formatPrice(getDisplayPrice(product), product.currency) }}
            </span>
            <span 
              v-if="getCompareAtPrice(product)"
              class="text-sm text-fortu-medium line-through"
            >
              {{ formatPrice(getCompareAtPrice(product)!, product.currency) }}
            </span>
          </div>

          <!-- Variants -->
          <div v-if="product.hasVariants && product.variants && product.variants.length > 0" class="mb-4">
            <!-- Color Swatches -->
            <div v-if="product.variantType === 'color'" class="flex flex-wrap gap-2">
              <button
                v-for="variant in product.variants"
                :key="variant._key"
                @click="selectVariant(product._id, variant)"
                class="w-7 h-7 rounded-full border-2 transition-all hover:scale-110"
                :class="selectedVariants[product._id]?._key === variant._key 
                  ? 'border-fortu-dark ring-2 ring-fortu-dark ring-offset-2' 
                  : 'border-fortu-light/30'"
                :style="{ backgroundColor: variant.colorHex || '#ccc' }"
                :title="variant.name"
              ></button>
            </div>

            <!-- Other Variant Types (Pills) -->
            <div v-else class="flex flex-wrap gap-2">
              <button
                v-for="variant in product.variants"
                :key="variant._key"
                @click="selectVariant(product._id, variant)"
                class="px-3 py-1 text-xs rounded-full border transition-all"
                :class="selectedVariants[product._id]?._key === variant._key 
                  ? 'bg-fortu-dark text-fortu-off-white border-fortu-dark' 
                  : 'bg-white text-fortu-dark border-fortu-light/30 hover:border-fortu-dark'"
              >
                {{ variant.name }}
              </button>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center gap-2 text-sm">
            <div 
              class="w-2 h-2 rounded-full"
              :class="getStockStatus(product) ? 'bg-green-500' : 'bg-red-500'"
            ></div>
            <span class="text-fortu-medium">
              {{ getStockStatus(product) ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client, urlFor } from '@/sanity/client'
import { PRODUCTS_QUERY, type Product, type ProductVariant } from '@/sanity/queries'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedVariants = ref<Record<string, ProductVariant | null>>({})

const getProductImage = (product: Product): string | undefined => {
  const productId = product._id
  
  // If variant is selected and has an image, use that
  const selectedVariant = selectedVariants.value[productId]
  if (selectedVariant?.image?.asset) {
    if (selectedVariant.image.asset.url) {
      return selectedVariant.image.asset.url
    }
    try {
      return urlFor(selectedVariant.image.asset).width(600).height(600).url()
    } catch {
      // Fall through to default image
    }
  }
  
  // Otherwise use the first product image
  const firstImage = product.images?.[0]
  if (firstImage?.asset) {
    if (firstImage.asset.url) {
      return firstImage.asset.url
    }
    try {
      return urlFor(firstImage.asset).width(600).height(600).url()
    } catch {
      return undefined
    }
  }
  
  return undefined
}

const getDisplayPrice = (product: Product): number => {
  const selectedVariant = selectedVariants.value[product._id]
  if (selectedVariant?.price) {
    return selectedVariant.price
  }
  return product.price
}

const getCompareAtPrice = (product: Product): number | undefined => {
  const selectedVariant = selectedVariants.value[product._id]
  if (selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > (selectedVariant.price || product.price)) {
    return selectedVariant.compareAtPrice
  }
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    return product.compareAtPrice
  }
  return undefined
}

const getStockStatus = (product: Product): boolean => {
  const selectedVariant = selectedVariants.value[product._id]
  if (selectedVariant && selectedVariant.inStock !== undefined) {
    return selectedVariant.inStock
  }
  return product.inStock ?? true
}

const formatPrice = (price: number, currency?: string): string => {
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'IDR' ? 'Rp' : '$'
  return `${currencySymbol}${price.toLocaleString()}`
}

const selectVariant = (productId: string, variant: ProductVariant) => {
  // Toggle selection
  if (selectedVariants.value[productId]?._key === variant._key) {
    selectedVariants.value[productId] = null
  } else {
    selectedVariants.value[productId] = variant
  }
}

onMounted(async () => {
  try {
    products.value = await client.fetch(PRODUCTS_QUERY)
    
    // Auto-select first variant for products with variants
    products.value.forEach(product => {
      if (product.hasVariants && product.variants && product.variants.length > 0) {
        selectedVariants.value[product._id] = product.variants[0]
      }
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch products'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

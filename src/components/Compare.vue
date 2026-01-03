<template>
  <section 
    v-if="compare && !loading" 
    class="compare-section py-16 md:py-24"
    :class="compare.backgroundColor === 'light' ? 'bg-fortu-off-white' : 'bg-fortu-dark'"
  >
    <div class="mx-auto px-4 md:px-16">
      <!-- Section Header -->
      <div v-if="compare.heading || compare.subheading" class="text-center mb-8 md:mb-16">
        <h2 
          v-if="compare.heading" 
          class="text-3xl md:text-7xl font-medium mb-4 tracking-tight"
          :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
        >
          {{ compare.heading }}
        </h2>
        <p 
          v-if="compare.subheading" 
          class="text-lg"
          :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
        >
          {{ compare.subheading }}
        </p>
      </div>

      <!-- Mobile Product Selectors -->
      <div v-if="compare.products.length > 2" class="md:hidden flex gap-4 mb-8">
        <div class="flex-1">
          <select
            v-model="mobileSelection[0]"
            class="w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer"
            :class="compare.backgroundColor === 'light' 
              ? 'bg-white border border-fortu-light/50 text-fortu-dark' 
              : 'bg-fortu-medium/20 border border-fortu-medium/30 text-fortu-off-white'"
          >
            <option 
              v-for="(item, idx) in compare.products" 
              :key="idx" 
              :label="item.product.name"
              :value="idx"
              :disabled="idx === mobileSelection[1]"
            >
              {{ item.product.name }}
            </option>
          </select>
        </div>
        <div class="flex-1">
          <select
            v-model="mobileSelection[1]"
            class="w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer"
            :class="compare.backgroundColor === 'light' 
              ? 'bg-white border border-fortu-light/50 text-fortu-dark' 
              : 'bg-fortu-medium/20 border border-fortu-medium/30 text-fortu-off-white'"
          >
            <option 
              v-for="(item, idx) in compare.products" 
              :key="idx" 
              :value="idx"
              :disabled="idx === mobileSelection[0]"
            >
              {{ item.product.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Desktop Product Selectors (when more than 3 products) -->
      <div v-if="compare.products.length > 3" class="hidden md:flex gap-4 mb-8 justify-center">
        <div class="w-64">
          <select
            v-model="desktopSelection[0]"
            class="w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer"
            :class="compare.backgroundColor === 'light' 
              ? 'bg-white border border-fortu-light/50 text-fortu-dark' 
              : 'bg-fortu-medium/20 border border-fortu-medium/30 text-fortu-off-white'"
          >
            <option 
              v-for="(item, idx) in compare.products" 
              :key="idx" 
              :value="idx"
              :disabled="idx === desktopSelection[1] || idx === desktopSelection[2]"
            >
              {{ item.product.name }}
            </option>
          </select>
        </div>
        <div class="w-64">
          <select
            v-model="desktopSelection[1]"
            class="w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer"
            :class="compare.backgroundColor === 'light' 
              ? 'bg-white border border-fortu-light/50 text-fortu-dark' 
              : 'bg-fortu-medium/20 border border-fortu-medium/30 text-fortu-off-white'"
          >
            <option 
              v-for="(item, idx) in compare.products" 
              :key="idx" 
              :value="idx"
              :disabled="idx === desktopSelection[0] || idx === desktopSelection[2]"
            >
              {{ item.product.name }}
            </option>
          </select>
        </div>
        <div class="w-64">
          <select
            v-model="desktopSelection[2]"
            class="w-full px-4 py-3 rounded-lg text-sm font-medium appearance-none cursor-pointer"
            :class="compare.backgroundColor === 'light' 
              ? 'bg-white border border-fortu-light/50 text-fortu-dark' 
              : 'bg-fortu-medium/20 border border-fortu-medium/30 text-fortu-off-white'"
          >
            <option 
              v-for="(item, idx) in compare.products" 
              :key="idx" 
              :value="idx"
              :disabled="idx === desktopSelection[0] || idx === desktopSelection[1]"
            >
              {{ item.product.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Product Comparison Grid - Desktop -->
      <div class="hidden md:grid gap-8" :class="gridColsDesktop">
        <div 
          v-for="selectedIdx in desktopProductsToShow" 
          :key="selectedIdx"
          class="product-column text-center"
        >
          <template v-if="compare.products[selectedIdx]">
            <!-- Product Image -->
            <div class="relative mb-6">
              <div class="relative max-w-[280px] mx-auto mb-4 aspect-square">
                <img
                  v-if="getProductImage(compare.products[selectedIdx])"
                  :src="getProductImage(compare.products[selectedIdx]) ?? undefined"
                  :alt="compare.products[selectedIdx].product.name"
                  loading="lazy"
                  decoding="async"
                  width="560"
                  height="560"
                  class="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <!-- Product Info -->
            <div class="mb-6">
              <h3 
                class="text-2xl font-medium mb-2"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
              >
                {{ compare.products[selectedIdx].product.name }}
              </h3>
              <p 
                v-if="compare.products[selectedIdx].product.description" 
                class="text-sm mb-4 line-clamp-2 max-w-[20rem] mx-auto"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
              >
                {{ compare.products[selectedIdx].product.description }}
              </p>
              
              <div class="flex justify-center gap-3">
                <Button
                  v-if="compare.products[selectedIdx].product.slug?.current"
                  :to="`/products/${compare.products[selectedIdx].product.slug.current}`"
                  :variant="compare.backgroundColor === 'light' ? 'primary' : 'secondary'"
                  size="sm"
                >
                  {{ compare.products[selectedIdx].ctaLabel || 'Pelajari Lebih Lanjut' }}
                </Button>
              </div>
            </div>

            <!-- Specs Divider -->
            <div 
              class="border-t my-8"
              :class="compare.backgroundColor === 'light' ? 'border-fortu-light/50' : 'border-fortu-medium/30'"
            />

            <!-- Specifications (from product) -->
            <div v-if="compare.products[selectedIdx].product.specs && compare.products[selectedIdx].product.specs.length > 0" class="space-y-6">
              <div 
                v-for="(spec, specIndex) in compare.products[selectedIdx].product.specs" 
                :key="spec._key || specIndex"
                class="spec-item"
              >
                <div class="flex justify-center mb-2">
                  <div 
                    class="w-12 h-12 rounded-full flex items-center justify-center"
                    :class="compare.backgroundColor === 'light' ? 'bg-fortu-light/30' : 'bg-fortu-medium/20'"
                  >
                    <CompareIcon 
                      :icon="spec.icon || 'check'" 
                      :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
                    />
                  </div>
                </div>
                
                <p 
                  class="font-medium text-md"
                  :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
                >
                  {{ spec.label }}
                </p>
                <p 
                  v-if="spec.value" 
                  class="text-sm mt-1"
                  :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
                >
                  {{ spec.value }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Product Comparison Grid - Mobile (2 columns) -->
      <div class="md:hidden grid grid-cols-2 gap-4 items-start">
        <div 
          v-for="selectedIdx in mobileProductsToShow" 
          :key="selectedIdx"
          class="product-column text-center flex flex-col"
        >
          <template v-if="compare.products[selectedIdx]">
            <!-- Product Image -->
            <div class="relative mb-4">
              <div class="relative max-w-[140px] mx-auto mb-2 aspect-square">
                <img
                  v-if="getProductImage(compare.products[selectedIdx])"
                  :src="getProductImage(compare.products[selectedIdx]) ?? undefined"
                  :alt="compare.products[selectedIdx].product.name"
                  loading="lazy"
                  decoding="async"
                  width="280"
                  height="280"
                  class="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <!-- Product Info -->
            <div class="mb-4 flex flex-col">
              <h3 
                class="text-base font-medium mb-1 min-h-[3rem] flex items-start justify-center text-center"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
              >
                {{ compare.products[selectedIdx].product.name }}
              </h3>
              
              <div class="flex justify-center mt-auto">
                <Button
                  v-if="compare.products[selectedIdx].product.slug?.current"
                  :to="`/products/${compare.products[selectedIdx].product.slug.current}`"
                  :variant="compare.backgroundColor === 'light' ? 'primary' : 'inverted'"
                  size="sm"
                >
                  {{ compare.products[selectedIdx].ctaLabel || 'Pelajari Lebih Lanjut' }}
                </Button>
              </div>
            </div>

            <!-- Specs Divider -->
            <div 
              class="border-t my-4"
              :class="compare.backgroundColor === 'light' ? 'border-fortu-light/50' : 'border-fortu-medium/30'"
            />

            <!-- Specifications (from product) -->
            <div v-if="compare.products[selectedIdx].product.specs && compare.products[selectedIdx].product.specs.length > 0" class="space-y-4">
              <div 
                v-for="(spec, specIndex) in compare.products[selectedIdx].product.specs" 
                :key="spec._key || specIndex"
                class="spec-item"
              >
                <div class="flex justify-center mb-1">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center"
                    :class="compare.backgroundColor === 'light' ? 'bg-fortu-light/30' : 'bg-fortu-medium/20'"
                  >
                    <CompareIcon 
                      :icon="spec.icon || 'check'" 
                      class="w-4 h-4"
                      :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
                    />
                  </div>
                </div>
                
                <p 
                  class="font-medium text-xs"
                  :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
                >
                  {{ spec.label }}
                </p>
                <p 
                  v-if="spec.value" 
                  class="text-xs mt-0.5"
                  :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
                >
                  {{ spec.value }}
                </p>
              </div>
            </div>
          </template>
        </div>
        
      </div>
      <RouterLink
          to="/products"
          class="inline-block mx-auto mt-24 w-full text-center text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
          :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
        >
          Lihat Semua Produk
        </RouterLink>
    </div>
    
  </section>

  <!-- Loading State -->
  <section v-else-if="loading" class="py-24 bg-fortu-dark">
    <div class="flex justify-center">
      <div class="w-8 h-8 border-2 border-fortu-off-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { PRODUCT_COMPARE_QUERY, type ProductCompare, type ProductCompareItem } from '@/sanity/queries'
import { IMAGE_CONFIG } from '@/config/image'
import CompareIcon from '@/components/CompareIcon.vue'
import Button from '@/reusables/Button.vue'

const compare = ref<ProductCompare | null>(null)
const loading = ref(true)
const mobileSelection = ref<number[]>([0, 1])
const desktopSelection = ref<number[]>([0, 1, 2])

// Initialize desktop selection based on product count
const initializeDesktopSelection = () => {
  const count = compare.value?.products?.length || 0
  if (count === 0) {
    desktopSelection.value = []
  } else if (count === 1) {
    desktopSelection.value = [0]
  } else if (count === 2) {
    desktopSelection.value = [0, 1]
  } else {
    // For 3+ products, default to first 3
    desktopSelection.value = [0, 1, 2].filter(i => i < count)
  }
}

const desktopProductsToShow = computed(() => {
  const count = compare.value?.products?.length || 0
  if (count === 0) return []
  if (count <= 3) {
    // Show all products if 3 or fewer
    return Array.from({ length: count }, (_, i) => i)
  }
  // Show selected products (up to 3)
  return desktopSelection.value.filter(idx => idx < count && idx >= 0)
})

const gridColsDesktop = computed(() => {
  const count = desktopProductsToShow.value.length
  if (count === 1) return 'grid-cols-1 max-w-md mx-auto'
  if (count === 2) return 'grid-cols-2 max-w-4xl mx-auto'
  return 'grid-cols-3'
})

const mobileProductsToShow = computed(() => {
  const count = compare.value?.products?.length || 0
  if (count <= 2) {
    return [0, 1].filter(i => i < count)
  }
  return mobileSelection.value
})

const getProductImage = (item: ProductCompareItem): string | null => {
  // Priority 1: Use compareImage if available
  if (item.compareImage?.asset) {
    if (item.compareImage.asset.url) {
      return item.compareImage.asset.url
    }
    try {
      const builder = urlFor(item.compareImage.asset).width(560).height(560).quality(IMAGE_CONFIG.quality)
      return IMAGE_CONFIG.autoFormat ? builder.auto('format').url() : builder.url()
    } catch {
      // Fall through to product images
    }
  }
  
  // Priority 2: Fallback to first product image
  const images = item.product?.images
  if (!images || images.length === 0) return null
  
  // Always use the first image (index 0)
  const image = images[0]
  
  if (!image?.asset) return null
  
  if (image.asset.url) {
    return image.asset.url
  }
  
  try {
    const builder = urlFor(image.asset).width(560).height(560).quality(IMAGE_CONFIG.quality)
    return IMAGE_CONFIG.autoFormat ? builder.auto('format').url() : builder.url()
  } catch {
    return null
  }
}


onMounted(async () => {
  try {
    compare.value = await client.fetch(PRODUCT_COMPARE_QUERY)
    initializeDesktopSelection()
  } catch (e) {
    console.error('Failed to fetch product comparison:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-column {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.product-column:nth-child(1) { animation-delay: 0s; }
.product-column:nth-child(2) { animation-delay: 0.15s; }
.product-column:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom select arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%237D7D7D' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;
}
</style>

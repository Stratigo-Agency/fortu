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
          class="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
          :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
        >
          {{ compare.heading }}
        </h2>
        <p 
          v-if="compare.subheading" 
          class="text-lg max-w-2xl mx-auto"
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

      <!-- Product Comparison Grid - Desktop -->
      <div class="hidden md:grid gap-8" :class="gridColsDesktop">
        <div 
          v-for="(item, index) in compare.products" 
          :key="item._key || index"
          class="product-column text-center"
        >
          <!-- Product Image -->
          <div class="relative mb-6">
            <span 
              v-if="item.highlightLabel" 
              class="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
              :class="compare.backgroundColor === 'light' ? 'bg-fortu-dark text-fortu-off-white' : 'bg-fortu-off-white text-fortu-dark'"
            >
              {{ item.highlightLabel }}
            </span>
            
            <div class="relative max-w-[280px] mx-auto mb-4">
              <img
                v-if="getProductImage(item, activeImages[index])"
                :src="getProductImage(item, activeImages[index]) ?? undefined"
                :alt="item.product.name"
                class="w-full h-full object-contain rounded-lg"
              />
            </div>
            
            <div 
              v-if="item.product.images && item.product.images.length > 1" 
              class="flex justify-center gap-2"
            >
              <button
                v-for="(_, imgIndex) in item.product.images.slice(0, 4)"
                :key="imgIndex"
                @click="activeImages[index] = imgIndex"
                class="w-2 h-2 rounded-full transition-all"
                :class="activeImages[index] === imgIndex 
                  ? (compare.backgroundColor === 'light' ? 'bg-fortu-dark' : 'bg-fortu-off-white') 
                  : (compare.backgroundColor === 'light' ? 'bg-fortu-light' : 'bg-fortu-medium')"
              />
            </div>
          </div>

          <!-- Product Info -->
          <div class="mb-6">
            <h3 
              class="text-2xl font-medium mb-2"
              :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
            >
              {{ item.product.name }}
            </h3>
            <p 
              v-if="item.product.description" 
              class="text-sm mb-4 line-clamp-2"
              :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
            >
              {{ item.product.description }}
            </p>
            
            <p 
              class="text-sm mb-4"
              :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
            >
              From {{ formatPrice(item.product.price, item.product.currency) }}
              <span v-if="item.product.compareAtPrice" class="ml-2 line-through opacity-60">
                {{ formatPrice(item.product.compareAtPrice, item.product.currency) }}
              </span>
            </p>

            <div class="flex justify-center gap-3">
              <a
                v-if="item.ctaLink"
                :href="item.ctaLink"
                class="px-5 py-2 rounded-full text-sm font-medium transition-all"
                :class="compare.backgroundColor === 'light' 
                  ? 'bg-fortu-dark text-fortu-off-white hover:bg-fortu-medium' 
                  : 'bg-fortu-off-white text-fortu-dark hover:bg-fortu-light'"
              >
                {{ item.ctaLabel || 'Learn more' }}
              </a>
            </div>
          </div>

          <!-- Specs Divider -->
          <div 
            class="border-t my-8"
            :class="compare.backgroundColor === 'light' ? 'border-fortu-light/50' : 'border-fortu-medium/30'"
          />

          <!-- Specifications -->
          <div v-if="item.specs && item.specs.length > 0" class="space-y-6">
            <div 
              v-for="(spec, specIndex) in item.specs" 
              :key="spec._key || specIndex"
              class="spec-item"
            >
              <div class="flex justify-center mb-2">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="compare.backgroundColor === 'light' ? 'bg-fortu-light/30' : 'bg-fortu-medium/20'"
                >
                  <CompareIcon 
                    :icon="spec.icon || 'check'" 
                    :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
                  />
                </div>
              </div>
              
              <p 
                class="font-medium text-sm"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
              >
                {{ spec.label }}
              </p>
              <p 
                v-if="spec.subLabel" 
                class="text-xs mt-1"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
              >
                {{ spec.subLabel }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Comparison Grid - Mobile (2 columns) -->
      <div class="md:hidden grid grid-cols-2 gap-4">
        <div 
          v-for="selectedIdx in mobileProductsToShow" 
          :key="selectedIdx"
          class="product-column text-center"
        >
          <template v-if="compare.products[selectedIdx]">
            <!-- Product Image -->
            <div class="relative mb-4">
              <span 
                v-if="compare.products[selectedIdx].highlightLabel" 
                class="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2"
                :class="compare.backgroundColor === 'light' ? 'bg-fortu-dark text-fortu-off-white' : 'bg-fortu-off-white text-fortu-dark'"
              >
                {{ compare.products[selectedIdx].highlightLabel }}
              </span>
              
              <div class="relative max-w-[140px] mx-auto mb-2">
                <img
                  v-if="getProductImage(compare.products[selectedIdx], activeImages[selectedIdx])"
                  :src="getProductImage(compare.products[selectedIdx], activeImages[selectedIdx]) ?? undefined"
                  :alt="compare.products[selectedIdx].product.name"
                  class="w-full h-full object-contain rounded-lg"
                />
              </div>
              
              <div 
                v-if="compare.products[selectedIdx].product.images && compare.products[selectedIdx].product.images.length > 1" 
                class="flex justify-center gap-1"
              >
                <button
                  v-for="(_, imgIndex) in compare.products[selectedIdx].product.images.slice(0, 4)"
                  :key="imgIndex"
                  @click="activeImages[selectedIdx] = imgIndex"
                  class="w-1.5 h-1.5 rounded-full transition-all"
                  :class="activeImages[selectedIdx] === imgIndex 
                    ? (compare.backgroundColor === 'light' ? 'bg-fortu-dark' : 'bg-fortu-off-white') 
                    : (compare.backgroundColor === 'light' ? 'bg-fortu-light' : 'bg-fortu-medium')"
                />
              </div>
            </div>

            <!-- Product Info -->
            <div class="mb-4">
              <h3 
                class="text-base font-medium mb-1"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
              >
                {{ compare.products[selectedIdx].product.name }}
              </h3>
              
              <p 
                class="text-xs mb-2"
                :class="compare.backgroundColor === 'light' ? 'text-fortu-medium' : 'text-fortu-light'"
              >
                From {{ formatPrice(compare.products[selectedIdx].product.price, compare.products[selectedIdx].product.currency) }}
              </p>

              <div class="flex justify-center">
                <a
                  v-if="compare.products[selectedIdx].ctaLink"
                  :href="compare.products[selectedIdx].ctaLink"
                  class="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  :class="compare.backgroundColor === 'light' 
                    ? 'bg-fortu-dark text-fortu-off-white hover:bg-fortu-medium' 
                    : 'bg-fortu-off-white text-fortu-dark hover:bg-fortu-light'"
                >
                  {{ compare.products[selectedIdx].ctaLabel || 'Learn more' }}
                </a>
              </div>
            </div>

            <!-- Specs Divider -->
            <div 
              class="border-t my-4"
              :class="compare.backgroundColor === 'light' ? 'border-fortu-light/50' : 'border-fortu-medium/30'"
            />

            <!-- Specifications -->
            <div v-if="compare.products[selectedIdx].specs && compare.products[selectedIdx].specs.length > 0" class="space-y-4">
              <div 
                v-for="(spec, specIndex) in compare.products[selectedIdx].specs" 
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
              </div>
            </div>
          </template>
        </div>
      </div>
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
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/client'
import { PRODUCT_COMPARE_QUERY, type ProductCompare, type ProductCompareItem } from '@/sanity/queries'
import CompareIcon from '@/components/CompareIcon.vue'

const compare = ref<ProductCompare | null>(null)
const loading = ref(true)
const activeImages = ref<number[]>([0, 0, 0])
const mobileSelection = ref<number[]>([0, 1])

const gridColsDesktop = computed(() => {
  const count = compare.value?.products?.length || 0
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

const getProductImage = (item: ProductCompareItem, imageIndex: number): string | null => {
  const images = item.product?.images
  if (!images || images.length === 0) return null
  
  const idx = Math.min(imageIndex, images.length - 1)
  const image = images[idx]
  
  if (!image?.asset) return null
  
  if (image.asset.url) {
    return image.asset.url
  }
  
  try {
    return urlFor(image.asset).width(560).height(560).url()
  } catch {
    return null
  }
}

const formatPrice = (price: number, currency?: string): string => {
  const symbol = currency === 'EUR' ? '€' : currency === 'IDR' ? 'Rp' : '$'
  return `${symbol}${price.toLocaleString()}`
}

onMounted(async () => {
  try {
    compare.value = await client.fetch(PRODUCT_COMPARE_QUERY)
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

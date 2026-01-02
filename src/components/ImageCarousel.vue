<template>
  <section v-if="images && images.length > 0" class="overflow-hidden">
    <div class="px-4 md:px-16">
      <!-- Section Header -->
      <h2 
        class="text-3xl md:text-4xl font-medium mb-12 tracking-tight"
        :class="mode === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
      >
        {{ heading || '' }}
      </h2>
    </div>

    <!-- Carousel Container -->
    <div class="relative">
      <!-- Images Wrapper -->
      <div 
        ref="carouselRef"
        class="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-16 pb-4 hide-scrollbar"
        @scroll="handleScroll"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-shrink-0 w-[320px] md:w-[400px] lg:w-[480px] font-medium snap-center"
          :class="clickable ? 'cursor-pointer' : ''"
          @click="clickable && $emit('image-click', index)"
        >
          <div class="aspect-[3/3.2] rounded-2xl overflow-hidden bg-black">
            <img
              :src="image.url"
              :alt="image.alt || `Product image ${index + 1}`"
              loading="lazy"
              decoding="async"
              width="480"
              height="512"
              class="w-full h-full object-cover transition-opacity duration-300 hover:opacity-80"
            />
          </div>
          <p 
            v-if="image.caption" 
            class="mt-3 text-3xl text-left"
            :class="mode === 'light' ? 'text-fortu-dark' : 'text-fortu-off-white'"
          >
            {{ image.caption }}
          </p>
          <!-- Learn More Button -->
          <div v-if="showButton && image.slug" class="mt-4">
            <Button 
              :variant="mode === 'light' ? 'primary' : 'outline'" 
              size="sm" 
              :to="`/products/${image.slug}`"
            >
              Lihat Detail Produk
            </Button>
          </div>
        </div>
      </div>

      <!-- Mobile Indicators -->
      <div class="flex md:hidden justify-center gap-2 mt-4 px-4 pb-16">
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="scrollToImage(index)"
          :aria-label="`Go to image ${index + 1} of ${images.length}`"
          :aria-current="currentIndex === index ? 'true' : 'false'"
          class="w-2 h-2 rounded-full transition-all"
          :class="currentIndex === index 
            ? (mode === 'light' ? 'bg-fortu-off-white w-6' : 'bg-fortu-dark w-6')
            : (mode === 'light' ? 'bg-fortu-off-white/50' : 'bg-fortu-light/50')"
        ></button>
      </div>

      <!-- Navigation Arrows (Desktop) -->
      <div class="hidden md:flex items-center justify-end gap-2 px-16 mt-6 pb-12">
        <button
          @click="scrollCarousel('left')"
          :disabled="isAtStart"
          aria-label="Scroll carousel left"
          class="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
          :class="[
            mode === 'light' 
              ? 'border-fortu-off-white/30 hover:bg-fortu-off-white/10' 
              : 'border-fortu-light/30 hover:bg-fortu-light/10',
            isAtStart ? 'opacity-30 cursor-not-allowed' : ''
          ]"
        >
          <svg 
            class="w-5 h-5" 
            :class="mode === 'light' ? 'text-fortu-off-white' : 'text-fortu-off-white'"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          @click="scrollCarousel('right')"
          :disabled="isAtEnd"
          aria-label="Scroll carousel right"
          class="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
          :class="[
            mode === 'light' 
              ? 'border-fortu-off-white/30 hover:bg-fortu-off-white/10' 
              : 'border-fortu-light/30 hover:bg-fortu-light/10',
            isAtEnd ? 'opacity-30 cursor-not-allowed' : ''
          ]"
        >
          <svg 
            class="w-5 h-5" 
            :class="mode === 'light' ? 'text-fortu-off-white' : 'text-fortu-off-white'"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Variant Selector -->
    <div v-if="variants && variants.length > 0 && variantType === 'color'" class="mt-8 text-center">
      <p 
        class="text-sm mb-3"
        :class="mode === 'light' ? 'text-fortu-off-white' : 'text-fortu-dark'"
      >
        {{ selectedVariantName }}
      </p>
      <div class="flex justify-center gap-3">
        <button
          v-for="variant in variants"
          :key="variant._key"
          @click="$emit('select-variant', variant)"
          :aria-label="`Select ${variant.name} variant`"
          :aria-pressed="selectedVariantKey === variant._key ? 'true' : 'false'"
          class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
          :class="selectedVariantKey === variant._key 
            ? (mode === 'light' ? 'border-fortu-off-white' : 'border-fortu-dark')
            : (mode === 'light' ? 'border-fortu-off-white/50' : 'border-fortu-medium/50')"
          :style="{ backgroundColor: variant.colorHex || '#666' }"
          :title="variant.name"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/reusables/Button.vue'

interface CarouselImage {
  url: string
  alt?: string
  caption?: string
  slug?: string
}

interface ProductVariant {
  _key: string
  name: string
  colorHex?: string
}

withDefaults(defineProps<{
  images: CarouselImage[]
  heading?: string
  variants?: ProductVariant[]
  variantType?: string
  selectedVariantKey?: string
  selectedVariantName?: string
  clickable?: boolean
  showButton?: boolean
  mode?: 'light' | 'dark'
}>(), {
  mode: 'dark'
})

defineEmits<{
  (e: 'select-variant', variant: ProductVariant): void
  (e: 'image-click', index: number): void
}>()

const carouselRef = ref<HTMLElement | null>(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const currentIndex = ref(0)

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  
  const itemWidth = 320 + 16 // w-[320px] + gap-4 (mobile)
  const mdItemWidth = 400 + 24 // md:w-[400px] + md:gap-6
  const isMobile = window.innerWidth < 768
  const scrollAmount = isMobile ? itemWidth : mdItemWidth
  
  const newScrollLeft = direction === 'left' 
    ? carouselRef.value.scrollLeft - scrollAmount 
    : carouselRef.value.scrollLeft + scrollAmount
  
  carouselRef.value.scrollTo({
    left: newScrollLeft,
    behavior: 'smooth'
  })
}

const scrollToImage = (index: number) => {
  if (!carouselRef.value) return
  
  const itemWidth = 320 + 16 // w-[320px] + gap-4
  const mdItemWidth = 400 + 24 // md:w-[400px] + md:gap-6
  const isMobile = window.innerWidth < 768
  const scrollAmount = isMobile ? itemWidth : mdItemWidth
  
  carouselRef.value.scrollTo({
    left: index * scrollAmount,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  if (!carouselRef.value) return
  
  const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value
  isAtStart.value = scrollLeft <= 0
  isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 10
  
  // Calculate current index for mobile indicators
  const itemWidth = 320 + 16 // w-[320px] + gap-4
  currentIndex.value = Math.round(scrollLeft / itemWidth)
}

onMounted(() => {
  handleScroll()
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>


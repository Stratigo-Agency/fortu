<template>
  <section v-if="images && images.length > 0" class="overflow-hidden">
    <div class="px-4 md:px-16">
      <!-- Section Header -->
      <h2 class="text-3xl md:text-5xl font-medium text-fortu-dark mb-12 tracking-tight">
        {{ heading || '' }}
      </h2>
    </div>

    <!-- Carousel Container -->
    <div class="relative">
      <!-- Images Wrapper -->
      <div 
        ref="carouselRef"
        class="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4 hide-scrollbar"
        @scroll="handleScroll"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-shrink-0 w-[320px] md:w-[400px] lg:w-[480px]"
          :class="clickable ? 'cursor-pointer' : ''"
          @click="clickable && $emit('image-click', index)"
        >
          <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-black">
            <img
              :src="image.url"
              :alt="image.alt || `Product image ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
          <p 
            v-if="image.caption" 
            class="mt-3 text-3xl text-fortu-dark font-medium text-left"
          >
            {{ image.caption }}
          </p>
        </div>
      </div>

      <!-- Mobile Indicators -->
      <div class="flex md:hidden justify-center gap-2 mt-4 px-4">
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="scrollToImage(index)"
          class="w-2 h-2 rounded-full transition-all"
          :class="currentIndex === index 
            ? 'bg-fortu-dark w-6' 
            : 'bg-fortu-light/50'"
        ></button>
      </div>

      <!-- Navigation Arrows (Desktop) -->
      <div class="hidden md:flex items-center justify-end gap-2 px-16 mt-6">
        <button
          @click="scrollCarousel('left')"
          :disabled="isAtStart"
          class="w-10 h-10 rounded-full border border-fortu-light/30 flex items-center justify-center transition-all"
          :class="isAtStart ? 'opacity-30 cursor-not-allowed' : 'hover:bg-fortu-light/10'"
        >
          <svg class="w-5 h-5 text-fortu-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          @click="scrollCarousel('right')"
          :disabled="isAtEnd"
          class="w-10 h-10 rounded-full border border-fortu-light/30 flex items-center justify-center transition-all"
          :class="isAtEnd ? 'opacity-30 cursor-not-allowed' : 'hover:bg-fortu-light/10'"
        >
          <svg class="w-5 h-5 text-fortu-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Variant Selector -->
    <div v-if="variants && variants.length > 0 && variantType === 'color'" class="mt-8 text-center">
      <p class="text-sm text-fortu-off-white mb-3">
        {{ selectedVariantName }}
      </p>
      <div class="flex justify-center gap-3">
        <button
          v-for="variant in variants"
          :key="variant._key"
          @click="$emit('select-variant', variant)"
          class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
          :class="selectedVariantKey === variant._key 
            ? 'border-fortu-off-white' 
            : 'border-fortu-medium/50'"
          :style="{ backgroundColor: variant.colorHex || '#666' }"
          :title="variant.name"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface CarouselImage {
  url: string
  alt?: string
  caption?: string
}

interface ProductVariant {
  _key: string
  name: string
  colorHex?: string
}

const props = defineProps<{
  images: CarouselImage[]
  heading?: string
  variants?: ProductVariant[]
  variantType?: string
  selectedVariantKey?: string
  selectedVariantName?: string
  clickable?: boolean
}>()

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
  
  const scrollAmount = 400
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
  carouselRef.value.scrollTo({
    left: index * itemWidth,
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


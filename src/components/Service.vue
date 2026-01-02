<template>
  <section v-if="serviceSection && !loading" class="service-section py-16 md:py-24 bg-fortu-off-white">
    <div class="px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-4xl md:text-4xl lg:text-6xl font-light text-fortu-dark mb-4 tracking-tight">
          {{ serviceSection.heading }}
        </h2>
        <p v-if="serviceSection.subheading" class="text-fortu-medium text-md md:text-lg max-w-2xl mx-auto">
          {{ serviceSection.subheading }}
        </p>
      </div>

      <!-- Desktop Grid (4 per row) -->
      <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(service, index) in serviceSection.services"
          :key="service._key || index"
          class="service-card group relative overflow-hidden rounded-xl h-[600px] transition-all duration-500"
          :class="getBackgroundImage(service) ? '' : 'bg-fortu-off-white'"
        >
          <!-- Background Image -->
          <div
            v-if="getBackgroundImage(service)"
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            :style="{ backgroundImage: `url(${getBackgroundImage(service)})` }"
          ></div>
          
          <!-- Dark Overlay for images -->
          <div
            v-if="getBackgroundImage(service) && service.darkOverlay !== false"
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
          ></div>

          <!-- Content -->
          <div class="relative h-full flex flex-col justify-end p-6 z-10">
            <!-- Icon -->
            <div 
              class="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
              :class="getBackgroundImage(service) ? 'bg-fortu-off-white/20 backdrop-blur-sm' : 'bg-fortu-dark/10'"
            >
              <component 
                :is="getIconComponent(service.icon)" 
                :class="getBackgroundImage(service) ? 'text-fortu-off-white' : 'text-fortu-dark'"
                class="w-7 h-7"
              />
            </div>
            
            <!-- Title -->
            <h3 
              class="text-4xl font-medium mb-2 transition-colors duration-300"
              :class="getBackgroundImage(service) ? 'text-fortu-off-white' : 'text-fortu-dark'"
            >
              {{ service.title }}
            </h3>
            
            <!-- Description -->
            <p 
              class="text-sm leading-relaxed"
              :class="getBackgroundImage(service) ? 'text-fortu-light' : 'text-fortu-medium'"
            >
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile Swipable Carousel -->
      <div class="md:hidden relative">
        <div 
          ref="carouselRef"
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
          @scroll="handleScroll"
        >
          <div
            v-for="(service, index) in serviceSection.services"
            :key="service._key || index"
            class="service-card-mobile flex-shrink-0 w-[280px] snap-center relative overflow-hidden rounded-xl h-[450px]"
            :class="getBackgroundImage(service) ? '' : 'bg-fortu-off-white'"
          >
            <!-- Background Image -->
            <div
              v-if="getBackgroundImage(service)"
              class="absolute inset-0 bg-cover bg-center"
              :style="{ backgroundImage: `url(${getBackgroundImage(service)})` }"
            ></div>
            
            <!-- Dark Overlay for images -->
            <div
              v-if="getBackgroundImage(service) && service.darkOverlay !== false"
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
            ></div>

            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-5 z-10">
              <!-- Icon -->
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                :class="getBackgroundImage(service) ? 'bg-fortu-off-white/20 backdrop-blur-sm' : 'bg-fortu-dark/10'"
              >
                <component 
                  :is="getIconComponent(service.icon)" 
                  :class="getBackgroundImage(service) ? 'text-fortu-off-white' : 'text-fortu-dark'"
                  class="w-6 h-6"
                />
              </div>
              
              <!-- Title -->
              <h3 
                class="text-2xl font-medium mb-2"
                :class="getBackgroundImage(service) ? 'text-fortu-off-white' : 'text-fortu-dark'"
              >
                {{ service.title }}
              </h3>
              
              <!-- Description -->
              <p 
                class="text-sm leading-relaxed"
                :class="getBackgroundImage(service) ? 'text-fortu-light' : 'text-fortu-medium'"
              >
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Scroll Indicators -->
        <div class="flex justify-center gap-2 mt-4">
          <button
            v-for="(_, index) in serviceSection.services"
            :key="index"
            :aria-label="`Go to service ${index + 1} of ${serviceSection.services.length}`"
            :aria-current="currentSlide === index ? 'true' : 'false'"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-fortu-off-white w-6' : 'bg-fortu-medium/40'"
            @click="scrollToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/client'
import { SERVICE_SECTION_QUERY, type ServiceSection, type ServiceItem } from '@/sanity/queries'
import { IMAGE_CONFIG } from '@/config/image'

const serviceSection = ref<ServiceSection | null>(null)
const loading = ref(true)
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

// Get background image URL
const getBackgroundImage = (service: ServiceItem): string | null => {
  if (!service.backgroundImage?.asset) return null
  try {
    const builder = urlFor(service.backgroundImage.asset).width(600).height(800).quality(IMAGE_CONFIG.quality)
    return IMAGE_CONFIG.autoFormat ? builder.auto('format').url() : builder.url()
  } catch {
    return null
  }
}

// Handle carousel scroll
const handleScroll = () => {
  if (!carouselRef.value) return
  const scrollLeft = carouselRef.value.scrollLeft
  const cardWidth = 280 + 16 // card width + gap
  currentSlide.value = Math.round(scrollLeft / cardWidth)
}

// Scroll to specific slide
const scrollToSlide = (index: number) => {
  if (!carouselRef.value) return
  const cardWidth = 280 + 16
  carouselRef.value.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  })
}

// Icon components
const ToolsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z' })
])

const ShieldIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' })
])

const TruckIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' })
])

const HeadsetIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z' })
])

const WrenchIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z' })
])

const ClockIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const StarIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' })
])

const CheckIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const RefreshIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' })
])

const MapIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' })
])

const PhoneIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z' })
])

const GiftIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' })
])

const DefaultIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'stroke-width': '1.5' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' })
])

// Get icon component based on icon name
const getIconComponent = (iconName?: string) => {
  const icons: Record<string, ReturnType<typeof h>> = {
    tools: ToolsIcon(),
    shield: ShieldIcon(),
    truck: TruckIcon(),
    headset: HeadsetIcon(),
    wrench: WrenchIcon(),
    clock: ClockIcon(),
    star: StarIcon(),
    check: CheckIcon(),
    refresh: RefreshIcon(),
    map: MapIcon(),
    phone: PhoneIcon(),
    gift: GiftIcon(),
  }
  return icons[iconName || ''] || DefaultIcon()
}

onMounted(async () => {
  try {
    serviceSection.value = await client.fetch(SERVICE_SECTION_QUERY)
  } catch (e) {
    console.error('Failed to fetch service section:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Service card hover effects */
.service-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

/* Mobile card styling */
.service-card-mobile {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>


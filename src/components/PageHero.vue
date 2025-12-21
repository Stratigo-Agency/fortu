<template>
  <!-- Page Hero -->
  <section 
    v-if="pageHero && !loading" 
    class="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden"
  >
    <!-- Background Video -->
    <video
      v-if="heroVideoUrl"
      :src="heroVideoUrl"
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
    ></video>
    
    <!-- Background Image (fallback) -->
    <img
      v-else-if="heroImageUrl"
      :src="heroImageUrl"
      :alt="pageHero.title"
      class="absolute inset-0 w-full h-full object-cover"
    />
    
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-fortu-dark"
      :style="{ opacity: (pageHero.overlayOpacity ?? 60) / 100 }"
    ></div>
    
    <!-- Content -->
    <div 
      class="relative z-10 px-4 md:px-16 w-full"
      :class="{
        'text-left': pageHero.alignment === 'left',
        'text-center': pageHero.alignment === 'center' || !pageHero.alignment,
        'text-right': pageHero.alignment === 'right'
      }"
    >
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-medium text-fortu-off-white mb-4 tracking-tight">
        {{ pageHero.title }}
      </h1>
      <p v-if="pageHero.subtitle" class="text-lg md:text-xl text-fortu-light max-w-2xl" :class="{ 'mx-auto': pageHero.alignment === 'center' }">
        {{ pageHero.subtitle }}
      </p>
    </div>
  </section>

  <!-- Fallback Hero (if no Sanity data) -->
  <section 
    v-else-if="!loading" 
    class="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-fortu-dark"
  >
    <div class="relative z-10 text-center px-4">
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-medium text-fortu-off-white mb-4 tracking-tight">
        {{ fallbackTitle }}
      </h1>
      <p v-if="fallbackSubtitle" class="text-lg md:text-xl text-fortu-light">
        {{ fallbackSubtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/client'
import { PAGE_HERO_QUERY, type PageHero } from '@/sanity/queries'

const props = defineProps<{
  pageName: 'products' | 'about' | 'contact' | 'services'
  fallbackTitle?: string
  fallbackSubtitle?: string
}>()

const pageHero = ref<PageHero | null>(null)
const loading = ref(true)

const heroVideoUrl = computed(() => {
  if (pageHero.value?.backgroundVideo?.asset?.url) {
    return pageHero.value.backgroundVideo.asset.url
  }
  return null
})

const heroImageUrl = computed(() => {
  if (pageHero.value?.backgroundImage?.asset) {
    try {
      return urlFor(pageHero.value.backgroundImage.asset).width(1920).url()
    } catch {
      return null
    }
  }
  return null
})

onMounted(async () => {
  try {
    pageHero.value = await client.fetch(PAGE_HERO_QUERY, { pageName: props.pageName })
  } catch (e) {
    console.error('Failed to fetch page hero:', e)
  } finally {
    loading.value = false
  }
})
</script>



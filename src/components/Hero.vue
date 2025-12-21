<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, onUnmounted } from 'vue'
import { client } from '@/sanity/client'
import { HERO_QUERY, type Hero } from '@/sanity/queries'
import Button from '@/reusables/Button.vue'
import ClientCarousel from '@/components/ClientCarousel.vue'

const hero = ref<Hero | null>(null)
const loading = ref(true)

const heroVideoUrl = computed(() => {
  if (hero.value?.backgroundVideo?.asset?.url) {
    return hero.value.backgroundVideo.asset.url
  }
  return null
})

const heroAlignment = computed(() => {
  return hero.value?.alignment || 'left'
})

// Add preload link for LCP optimization
let preloadLink: HTMLLinkElement | null = null

watchEffect(() => {
  const videoUrl = heroVideoUrl.value
  if (videoUrl) {
    // Remove existing preload link if any
    if (preloadLink && preloadLink.parentNode) {
      preloadLink.parentNode.removeChild(preloadLink)
    }
    
    // Create new preload link for video
    preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'video'
    preloadLink.href = videoUrl
    preloadLink.setAttribute('fetchpriority', 'high')
    document.head.appendChild(preloadLink)
  }
})

onUnmounted(() => {
  if (preloadLink && preloadLink.parentNode) {
    preloadLink.parentNode.removeChild(preloadLink)
  }
})

onMounted(async () => {
  try {
    hero.value = await client.fetch(HERO_QUERY)
  } catch (e) {
    console.error('Failed to fetch hero content:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section 
    v-if="hero && !loading" 
    class="relative min-h-screen flex flex-col bg-[var(--card)] overflow-hidden"
  >
    <!-- Background Video -->
    <video
      v-if="heroVideoUrl"
      :src="heroVideoUrl"
      autoplay
      loop
      muted
      playsinline
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover z-0"
    ></video>
    <div class="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,15,0.7)] to-[rgba(15,15,15,0.9)] z-[1]"></div>
    
    <!-- Hero Content -->
    <div 
      class="relative z-[2] flex-1 flex items-center px-4 md:px-16 py-4"
      :class="{
        'text-left': heroAlignment === 'left',
        'text-center': heroAlignment === 'center',
        'text-right': heroAlignment === 'right'
      }"
    >
      <div class="w-full">
        <h1 class="text-5xl md:text-8xl font-medium mb-4 tracking-tight leading-tight hero-title">{{ hero.title }}</h1>
        <h2 v-if="hero.subtitle" class="text-xl md:text-3xl font-medium mb-4 text-fortu-light leading-snug hero-subtitle">{{ hero.subtitle }}</h2>
        <p v-if="hero.description" class="text-lg md:text-xl leading-relaxed mb-8 text-[rgba(250,250,250,0.9)] hero-description">{{ hero.description }}</p>
        <div 
          v-if="hero.ctaButtons && hero.ctaButtons.length > 0" 
          class="flex gap-4 flex-wrap flex-col md:flex-row hero-buttons"
          :class="{
            'md:justify-center': heroAlignment === 'center',
            'md:justify-end': heroAlignment === 'right',
            'md:justify-start': heroAlignment === 'left'
          }"
        >
          <Button
            v-for="(button, index) in hero.ctaButtons"
            :key="index"
            :href="button.link"
            :variant="button.variant"
            size="md"
            class="w-full md:w-auto"
          >
            {{ button.label }}
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Client Carousel at bottom -->
    <div class="relative z-[2] pb-8">
      <ClientCarousel />
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.hero-subtitle {
  animation: fadeInUp 0.8s ease-out 0.15s forwards;
  opacity: 0;
}

.hero-description {
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.hero-buttons {
  animation: fadeInUp 0.8s ease-out 0.45s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>



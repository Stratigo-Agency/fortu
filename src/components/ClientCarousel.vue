<template>
  <section v-if="clients.length > 0" class="client-carousel-section overflow-hidden bg-fortu-light/20 py-8">
    <div class="mx-auto px-4 md:px-16">
      <p class="text-fortu-medium text-sm uppercase tracking-wider text-center">Trusted by industry leaders</p>
    </div>
    <!-- Carousel wrapper -->
    <div class="relative">
      <!-- Gradient fade edges -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-fortu-off-white to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-fortu-off-white to-transparent z-10 pointer-events-none"></div>
      
      <!-- Scrolling track -->
      <div class="carousel-track flex gap-4">
        <!-- First set of cards -->
        <div 
          v-for="(client, index) in clients" 
          :key="`first-${index}`"
          class="carousel-card flex-shrink-0 w-80 h-48 bg-white rounded-md p-3 flex items-center justify-center"
        >
          <img 
            :src="getLogoUrl(client)"
            :alt="client.name"
            class="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        
        <!-- Duplicate set for seamless loop -->
        <div 
          v-for="(client, index) in clients" 
          :key="`second-${index}`"
          class="carousel-card flex-shrink-0 w-80 h-48 bg-white p-3 rounded-md flex items-center justify-center"
        >
          <img 
            :src="getLogoUrl(client)"
            :alt="client.name"
            class="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client as sanityClient } from '@/sanity/client'
import { urlFor } from '@/sanity/client'
import { CLIENT_LOGOS_QUERY, type ClientLogo } from '@/sanity/queries'

const clients = ref<ClientLogo[]>([])

const getLogoUrl = (client: ClientLogo): string => {
  if (!client.logo?.asset) return ''
  try {
    return urlFor(client.logo.asset).height(80).url()
  } catch {
    return ''
  }
}

onMounted(async () => {
  try {
    clients.value = await sanityClient.fetch(CLIENT_LOGOS_QUERY)
  } catch (e) {
    console.error('Failed to fetch client logos:', e)
  }
})
</script>

<style scoped>
.carousel-track {
  animation: scroll 25s linear infinite;
  width: max-content;
}

.carousel-track:hover {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Pause animation when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }
}
</style>

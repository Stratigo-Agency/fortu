<template>
  <section v-if="clients.length > 0" class="client-carousel-section overflow-hidden py-8">
    <div class="mx-auto px-4 md:px-16 mb-4">
      <p class="text-fortu-light/60 text-sm uppercase tracking-wider text-center">Dipercaya Oleh</p>
    </div>
    <!-- Carousel wrapper -->
    <div class="relative">
      <!-- Scrolling track -->
      <div class="carousel-track flex gap-8">
        <!-- First set of cards -->
        <div 
          v-for="(client, index) in clients" 
          :key="`first-${client._id || index}`"
          class="carousel-card rounded-lg p-8 flex-shrink-0 h-24 w-48 flex items-center justify-center"
        >
          <img 
            v-if="getLogoUrl(client)"
            :src="getLogoUrl(client)"
            :alt="client.name"
            loading="lazy"
            decoding="async"
            width="160"
            height="48"
            class="h-24 w-48 object-contain transition-all duration-300"
            @error="handleImageError($event, client)"
          />
        </div>
        <!-- Second set for seamless loop -->
        <div 
          v-for="(client, index) in clients" 
          :key="`second-${client._id || index}`"
          class="carousel-card rounded-lg p-8 flex-shrink-0 h-24 w-48 flex items-center justify-center"
        >
          <img 
            v-if="getLogoUrl(client)"
            :src="getLogoUrl(client)"
            :alt="client.name"
            loading="lazy"
            decoding="async"
            width="160"
            height="48"
            class="h-24 w-48 object-contain transition-all duration-300"
            @error="handleImageError($event, client)"
          />
        </div>
        <!-- Third set for seamless loop -->
        <div 
          v-for="(client, index) in clients" 
          :key="`third-${client._id || index}`"
          class="carousel-card rounded-lg p-8 flex-shrink-0 h-24 w-48 flex items-center justify-center"
        >
          <img 
            v-if="getLogoUrl(client)"
            :src="getLogoUrl(client)"
            :alt="client.name"
            loading="lazy"
            decoding="async"
            width="160"
            height="48"
            class="h-24 w-48 object-contain transition-all duration-300"
            @error="handleImageError($event, client)"
          />
        </div>
        <!-- Fourth set for seamless loop -->
        <div 
          v-for="(client, index) in clients" 
          :key="`fourth-${client._id || index}`"
          class="carousel-card rounded-lg p-8 flex-shrink-0 h-24 w-48 flex items-center justify-center"
        >
          <img 
            v-if="getLogoUrl(client)"
            :src="getLogoUrl(client)"
            :alt="client.name"
            loading="lazy"
            decoding="async"
            width="160"
            height="48"
            class="h-24 w-48 object-contain transition-all duration-300"
            @error="handleImageError($event, client)"
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
import { IMAGE_CONFIG } from '@/config/image'

const clients = ref<ClientLogo[]>([])

const getLogoUrl = (client: ClientLogo): string => {
  if (!client.logo) {
    console.warn(`Client "${client.name}" has no logo`)
    return ''
  }
  
  // Check if asset exists
  if (!client.logo.asset) {
    console.warn(`Client "${client.name}" logo has no asset`)
    return ''
  }
  
  try {
    // Always use urlFor to apply crop/hotspot settings
    // Pass the full image object (not just asset) to preserve hotspot and crop
    const builder = urlFor(client.logo).width(320).fit('max').quality(IMAGE_CONFIG.quality)
    const url = IMAGE_CONFIG.autoFormat ? builder.auto('format').url() : builder.url()
    
    if (!url) {
      console.warn(`Failed to generate URL for client "${client.name}"`)
      return ''
    }
    
    return url
  } catch (error) {
    console.error(`Error generating logo URL for client "${client.name}":`, error)
    return ''
  }
}

const handleImageError = (event: Event, client: ClientLogo) => {
  console.error(`Failed to load image for client "${client.name}"`, event)
  // Optionally hide the broken image
  const img = event.target as HTMLImageElement
  if (img) {
    img.style.display = 'none'
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



@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
}

/* Pause animation when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }
}
</style>

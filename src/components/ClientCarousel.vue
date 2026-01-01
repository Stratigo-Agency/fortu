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
          :key="`first-${index}`"
          class="carousel-card flex-shrink-0 w-44 h-20 flex items-center justify-center"
        >
          <img 
            :src="getLogoUrl(client)"
            :alt="client.name"
            class="max-h-12 max-w-[160px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
          />
        </div>
        
        <!-- Duplicate set for seamless loop -->
        <div 
          v-for="(client, index) in clients" 
          :key="`second-${index}`"
          class="carousel-card flex-shrink-0 w-44 h-20 flex items-center justify-center"
        >
          <img 
            :src="getLogoUrl(client)"
            :alt="client.name"
            class="max-h-12 max-w-[160px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
          />
        </div>
        <div 
          v-for="(client, index) in clients" 
          :key="`second-${index}`"
          class="carousel-card flex-shrink-0 w-44 h-20 flex items-center justify-center"
        >
          <img 
            :src="getLogoUrl(client)"
            :alt="client.name"
            class="max-h-12 max-w-[160px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
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
    return urlFor(client.logo.asset).width(320).fit('max').url()
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

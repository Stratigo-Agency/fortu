<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { client } from '@/sanity/client'
import { HERO_QUERY, type Hero } from '@/sanity/queries'
import Button from '@/reusables/Button.vue'

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
    class="relative h-screen flex items-center justify-center bg-[var(--card)] px-4 md:px-16 py-4 overflow-hidden"
    :class="{
      'text-left': heroAlignment === 'left',
      'text-center': heroAlignment === 'center',
      'text-right': heroAlignment === 'right'
    }"
  >
    <!-- Background Video -->
    <video
      v-if="heroVideoUrl"
      :src="heroVideoUrl"
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover z-0"
    ></video>
    <div class="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,15,0.7)] to-[rgba(15,15,15,0.9)] z-[1]"></div>
    <div class="relative z-[2] w-full">
      <h1 class="text-6xl md:text-8xl font-medium mb-4 tracking-tight leading-tight">{{ hero.title }}</h1>
      <h2 v-if="hero.subtitle" class="text-2xl md:text-3xl font-medium mb-4 text-[var(--muted)] leading-snug">{{ hero.subtitle }}</h2>
      <p v-if="hero.description" class="text-lg md:text-xl leading-relaxed mb-8 text-[rgba(250,250,250,0.9)]">{{ hero.description }}</p>
      <div 
        v-if="hero.ctaButtons && hero.ctaButtons.length > 0" 
        class="flex gap-4 flex-wrap flex-col md:flex-row"
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
          variant="secondary"
          size="lg"
          class="w-full md:w-auto"
        >
          {{ button.label }}
        </Button>
      </div>
    </div>
  </section>
</template>



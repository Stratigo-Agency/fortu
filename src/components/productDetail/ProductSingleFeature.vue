<template>
  <section 
    class="py-16 flex flex-col justify-center px-4 md:px-16 overflow-hidden"
    :class="isDark ? 'bg-fortu-dark' : 'bg-fortu-off-white'"
  >
    <!-- Text Content -->
    <div 
      class="max-w-4xl mb-12"
      :class="{
        'mx-auto text-center': feature.textAlignment === 'center' || !feature.textAlignment,
        'text-left': feature.textAlignment === 'left',
        'ml-auto text-right': feature.textAlignment === 'right'
      }"
    >
      <!-- Eyebrow -->
      <p 
        v-if="feature.eyebrow" 
        class="text-2xl md:text-4xl font-medium mb-2 tracking-tight"
        :class="isDark ? 'text-fortu-off-white' : 'text-fortu-dark'"
      >
        {{ feature.eyebrow }}
      </p>
      
      <!-- Heading -->
      <h2 
        class="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
        :class="isDark ? 'text-fortu-off-white' : 'text-fortu-dark'"
      >
        {{ feature.heading }}
      </h2>
      
      <!-- Description with optional highlight -->
      <p 
        v-if="feature.description" 
        class="text-base md:text-lg leading-relaxed max-w-2xl"
        :class="[
          isDark ? 'text-fortu-light' : 'text-fortu-medium',
          { 
            'mx-auto': feature.textAlignment === 'center' || !feature.textAlignment,
            'ml-auto': feature.textAlignment === 'right'
          }
        ]"
      >
        <template v-if="feature.highlightText && feature.description.includes(feature.highlightText)">
          {{ descriptionBefore }}
          <span 
            class="font-medium"
            :class="isDark ? 'text-fortu-off-white' : 'text-fortu-dark'"
          >{{ feature.highlightText }}</span>
          {{ descriptionAfter }}
        </template>
        <template v-else>
          {{ feature.description }}
        </template>
      </p>

      <!-- Highlight Items -->
      <div 
        v-if="feature.highlights && feature.highlights.length > 0"
        class="flex flex-wrap gap-4 md:gap-6 mt-8"
        :class="{
          'justify-center': feature.textAlignment === 'center' || !feature.textAlignment,
          'justify-start': feature.textAlignment === 'left',
          'justify-end': feature.textAlignment === 'right'
        }"
      >
        <div 
          v-for="highlight in feature.highlights"
          :key="highlight._key"
          class="flex items-center gap-2"
        >
          <!-- Icon -->
          <CompareIcon 
            v-if="highlight.icon"
            :icon="highlight.icon"
            size="l"
            class="flex-shrink-0"
            :class="isDark ? 'text-white' : 'text-fortu-medium'"
          />
          <!-- Text -->
          <span 
            class="text-sm md:text-xl font-medium"
            :class="isDark ? 'text-fortu-off-white' : 'text-fortu-dark'"
          >
            {{ highlight.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- Media Content -->
    <div 
      class="w-full flex"
      :class="{
        'justify-center max-w-5xl mx-auto': feature.textAlignment === 'center' || !feature.textAlignment,
        'justify-start': feature.textAlignment === 'left',
        'justify-end': feature.textAlignment === 'right'
      }"
    >
      <!-- Video -->
      <video
        v-if="feature.mediaType === 'video' && videoUrl"
        :src="videoUrl"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
      ></video>
      
      <!-- Image -->
      <img
        v-else-if="imageUrl"
        :src="imageUrl"
        :alt="feature.heading"
        class="h-auto max-h-[70vh] object-contain rounded-2xl"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { urlFor } from '@/sanity/client'
import type { ProductFeature } from '@/sanity/queries'
import CompareIcon from '@/components/CompareIcon.vue'

const props = defineProps<{
  feature: ProductFeature
}>()

const isDark = computed(() => {
  return props.feature.backgroundColor === 'dark' || !props.feature.backgroundColor
})

const videoUrl = computed(() => {
  if (props.feature.video?.asset?.url) {
    return props.feature.video.asset.url
  }
  return null
})

const imageUrl = computed(() => {
  if (props.feature.image?.asset) {
    try {
      // Always use urlFor to apply crop/hotspot settings
      // Pass the full image object (not just asset) to preserve hotspot and crop
        return urlFor(props.feature.image).width(1920).quality(75).auto('format').url()
    } catch {
      return null
    }
  }
  return null
})

// Split description around highlight text
const descriptionBefore = computed(() => {
  if (!props.feature.description || !props.feature.highlightText) return ''
  const index = props.feature.description.indexOf(props.feature.highlightText)
  if (index === -1) return props.feature.description
  return props.feature.description.substring(0, index)
})

const descriptionAfter = computed(() => {
  if (!props.feature.description || !props.feature.highlightText) return ''
  const index = props.feature.description.indexOf(props.feature.highlightText)
  if (index === -1) return ''
  return props.feature.description.substring(index + props.feature.highlightText.length)
})
</script>


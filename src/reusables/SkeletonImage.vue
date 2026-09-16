<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * An <img> that keeps a shimmering placeholder in its own box until the
 * file has actually decoded, so media never pops in over empty space.
 */
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    width?: number | string
    height?: number | string
    imgClass?: string
    /** Skeleton tint for dark backgrounds */
    tone?: 'light' | 'dark'
    /** Skip lazy-loading for above-the-fold media */
    eager?: boolean
  }>(),
  {
    alt: '',
    imgClass: 'w-full h-full object-cover',
    tone: 'light',
    eager: false,
  }
)

const loaded = ref(false)
const failed = ref(false)

// A new src means a new load cycle.
watch(
  () => props.src,
  () => {
    loaded.value = false
    failed.value = false
  }
)

const onLoad = (event: Event) => {
  // Cached images can fire before the handler is attached; the check below
  // in the template covers that via the `complete` flag on mount.
  void event
  loaded.value = true
}

const onError = () => {
  loaded.value = true
  failed.value = true
}

// Images served from cache may already be complete when the element mounts,
// in which case the load event never reaches us.
const checkComplete = (el: unknown) => {
  const img = el as HTMLImageElement | null
  if (img?.complete && img.naturalWidth > 0) loaded.value = true
}
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div
      v-show="!loaded"
      class="skeleton absolute inset-0"
      :class="tone === 'dark' ? 'skeleton-dark' : ''"
      aria-hidden="true"
    ></div>
    <img
      v-if="src && !failed"
      :ref="checkComplete"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      :class="[imgClass, 'transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0']"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

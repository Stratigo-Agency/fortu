<script setup lang="ts">
import { computed } from 'vue'

/**
 * Placeholder rendered while a section is still fetching from Sanity.
 * It reserves roughly the height of the real section so the page does not
 * collapse and then jump once the content arrives.
 */
const props = withDefaults(
  defineProps<{
    /** Height classes for the placeholder, e.g. 'min-h-[70vh]' */
    minHeight?: string
    /** Background + skeleton tint */
    tone?: 'light' | 'dark'
    /** Centre the placeholder copy, matching most section headers */
    align?: 'center' | 'left'
    /** Number of card blocks to outline under the header */
    cards?: number
  }>(),
  {
    minHeight: 'min-h-[60vh]',
    tone: 'light',
    align: 'center',
    cards: 3,
  }
)

// Literal class strings so Tailwind can see them at build time.
const GRID_COLS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}
const gridCols = computed(() => GRID_COLS[Math.min(props.cards, 4)] ?? 'md:grid-cols-3')
</script>

<template>
  <section
    class="w-full px-4 md:px-16 py-16 md:py-24"
    :class="[minHeight, tone === 'dark' ? 'bg-fortu-dark' : 'bg-fortu-off-white']"
    aria-busy="true"
    aria-live="polite"
  >
    <span class="sr-only">Memuat konten…</span>

    <div
      class="mx-auto max-w-6xl w-full"
      :class="align === 'center' ? 'flex flex-col items-center text-center' : ''"
    >
      <slot>
        <div
          class="skeleton h-8 w-40 rounded-full mb-6"
          :class="tone === 'dark' ? 'skeleton-dark' : ''"
        ></div>
        <div
          class="skeleton h-10 md:h-14 w-3/4 max-w-2xl rounded-lg mb-4"
          :class="tone === 'dark' ? 'skeleton-dark' : ''"
        ></div>
        <div
          class="skeleton h-4 w-full max-w-xl rounded mb-10"
          :class="tone === 'dark' ? 'skeleton-dark' : ''"
        ></div>

        <div v-if="cards > 0" class="grid gap-6 w-full" :class="gridCols">
          <div
            v-for="n in cards"
            :key="n"
            class="skeleton aspect-[4/3] w-full rounded-2xl"
            :class="tone === 'dark' ? 'skeleton-dark' : ''"
          ></div>
        </div>
      </slot>
    </div>
  </section>
</template>

<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <ClientCarousel />
    <!-- CMS Demo Section -->
    <CMSDemo />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { POSTS_QUERY, type Post } from '@/sanity/queries'
import Hero from '@/components/Hero.vue'
import ClientCarousel from '@/components/ClientCarousel.vue'
import CMSDemo from '@/components/CMSDemo.vue'

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    posts.value = await client.fetch(POSTS_QUERY)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch posts'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.loading, .error, .empty {
  padding: 2rem;
  text-align: center;
  color: var(--muted);
  background: var(--card);
  border-radius: 8px;
}

.error {
  color: var(--accent);
}

.posts {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post {
  padding: 1.5rem;
  background: var(--card);
  border-radius: 8px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.post:hover {
  border-color: var(--accent);
}

.post h2 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.slug {
  font-size: 0.875rem;
  color: var(--muted);
  font-family: monospace;
}
</style>


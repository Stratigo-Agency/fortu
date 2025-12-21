<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style>
:root {
  --bg: #1A1A1A;
  --fg: #fafafa;
  --accent: #f43f5e;
  --muted: #71717a;
  --card: #1a1a1a;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--bg);
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--fg);
  min-height: 100vh;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

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


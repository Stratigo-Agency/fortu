import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'vue-vendor': ['vue', 'vue-router'],
          'sanity-vendor': ['@sanity/client', '@sanity/image-url', 'groq'],
        },
      },
    },
    // Enable code splitting
    chunkSizeWarningLimit: 1000,
  },
})


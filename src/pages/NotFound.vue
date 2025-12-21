<template>
  <div class="not-found-page bg-fortu-off-white min-h-screen flex items-center justify-center">
    <div class="text-center px-4 md:px-16 py-24 max-w-2xl mx-auto">
      <!-- 404 Number -->
      <h1 class="text-8xl md:text-9xl font-medium text-fortu-dark mb-4 tracking-tight opacity-20">
        404
      </h1>
      
      <!-- Title -->
      <h2 class="text-3xl md:text-5xl font-medium text-fortu-dark mb-4 tracking-tight">
        Page Not Found
      </h2>
      
      <!-- Description -->
      <p class="text-fortu-medium text-lg mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button href="/" variant="primary" size="lg">
          Go to Home
        </Button>
        <Button href="/products" variant="secondary" size="lg">
          Browse Products
        </Button>
      </div>
      
      <!-- Additional Links -->
      <div class="mt-12 pt-8 border-t border-fortu-light/30">
        <p class="text-sm text-fortu-medium mb-4">Or visit:</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/about" class="text-fortu-dark hover:text-fortu-medium transition-colors text-sm">
            About
          </router-link>
          <router-link to="/contact" class="text-fortu-dark hover:text-fortu-medium transition-colors text-sm">
            Contact
          </router-link>
          <router-link to="/products" class="text-fortu-dark hover:text-fortu-medium transition-colors text-sm">
            Products
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/reusables/Button.vue'
</script>

<style scoped>
.not-found-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>


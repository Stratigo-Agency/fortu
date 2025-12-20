<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '@/reusables/Button.vue'

const isMenuOpen = ref(false)
const isVisible = ref(true)
const isInHero = ref(true)
const lastScrollY = ref(0)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const heroHeight = window.innerHeight * 0.8 // Consider "in hero" for 80% of viewport height
  
  // Determine if we're in the hero section
  isInHero.value = currentScrollY < heroHeight
  
  // Determine scroll direction and visibility
  if (currentScrollY < 100) {
    // Always show at the top
    isVisible.value = true
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up - show navbar
    isVisible.value = true
  } else if (currentScrollY > lastScrollY.value + 10) {
    // Scrolling down (with threshold to prevent jitter) - hide navbar
    isVisible.value = false
    isMenuOpen.value = false // Close mobile menu when hiding
  }
  
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isInHero 
        ? 'bg-transparent' 
        : 'bg-fortu-off-white shadow-sm'
    ]"
  >
    <div class="mx-auto px-4 md:px-16 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="/logo.png" 
            alt="FORTU DIGITAL" 
            class="h-12 md:h-12 w-auto transition-all duration-300"
            :class="isInHero ? '' : 'brightness-0'"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-12">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-lg tracking-tight transition-colors"
            :class="isInHero 
              ? 'text-fortu-off-white hover:text-fortu-light' 
              : 'text-fortu-dark hover:text-fortu-medium'"
            active-class="font-medium"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <Button 
            :variant="isInHero ? 'secondary' : 'primary'" 
            size="sm" 
            href="/shop"
            :class="!isInHero ? 'border-fortu-dark text-fortu-dark hover:bg-fortu-dark hover:text-fortu-off-white' : ''"
          >
            Shop Now
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 transition-colors"
          :class="isInHero ? 'text-fortu-off-white' : 'text-fortu-dark'"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isMenuOpen"
        class="md:hidden mt-4 py-4 border-t transition-colors"
        :class="isInHero ? 'border-fortu-medium/30' : 'border-fortu-light'"
      >
        <div class="flex flex-col gap-4">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-base font-medium transition-colors"
            :class="isInHero 
              ? 'text-fortu-light hover:text-fortu-off-white' 
              : 'text-fortu-medium hover:text-fortu-dark'"
            active-class="font-semibold"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <Button 
            variant="primary" 
            size="sm" 
            href="/shop" 
            class="mt-2"
            :class="isInHero 
              ? 'border-fortu-off-white text-fortu-off-white hover:bg-fortu-off-white hover:text-fortu-dark' 
              : 'border-fortu-dark text-fortu-dark hover:bg-fortu-dark hover:text-fortu-off-white'"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

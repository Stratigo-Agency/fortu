<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/reusables/Button.vue'

const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-transparent">
    <div class="mx-auto px-16 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="/" class=" flex items-center hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="FORTU DIGITAL" class="h-12 md:h-16 w-auto" />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-12">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-lg tracking-tight text-fortu-off-white hover:text-fortu-light transition-colors"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <Button variant="secondary" size="sm" href="/shop">
            Shop Now
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-[#F9F9F9] hover:opacity-80 transition-opacity"
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
        class="md:hidden mt-4 py-4 border-t border-[#7D7D7D]/30"
      >
        <div class="flex flex-col gap-4">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-base font-medium text-[#BFBFBF] hover:text-[#F9F9F9] transition-colors"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </a>
          <Button variant="primary" size="sm" href="/shop" class="mt-2 border-[#F9F9F9] text-[#F9F9F9] hover:bg-[#F9F9F9] hover:text-[#101111]">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>


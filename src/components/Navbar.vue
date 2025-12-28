<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from '@/reusables/Button.vue'
import ProductCatalog from '@/components/ProductCatalog.vue'

const route = useRoute()
const isMenuOpen = ref(false)
const isProductsOpen = ref(false)
const isVisible = ref(true)
const isInHeroSection = ref(true)
const lastScrollY = ref(0)

const isInHero = computed(() => {
  // Force solid background when mobile menu is open or products dropdown is open
  if (isMenuOpen.value || isProductsOpen.value) {
    return false
  }
  return isInHeroSection.value
})

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Produk', to: '/products', hasDropdown: true },
  { label: 'Tentang', to: '/about' },
  { label: 'Kontak', to: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isProductsOpen.value = false
  }
}

const toggleProducts = () => {
  isProductsOpen.value = !isProductsOpen.value
}

const closeProducts = () => {
  isProductsOpen.value = false
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const heroHeight = window.innerHeight * 0.8 // Consider "in hero" for 80% of viewport height
  
  // Determine if we're in the hero section (for scroll-based transparency)
  isInHeroSection.value = currentScrollY < heroHeight
  
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
    isProductsOpen.value = false // Close products dropdown when hiding
  }
  
  lastScrollY.value = currentScrollY
}

// Reset scroll state on route change
watch(() => route.path, () => {
  lastScrollY.value = 0
  isInHeroSection.value = true
  isProductsOpen.value = false
  isMenuOpen.value = false
  handleScroll()
})

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
        : 'bg-white shadow-sm'
    ]"
  >
    <div class="mx-auto px-4 md:px-16 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center hover:opacity-80 transition-opacity" @click="closeProducts">
          <img 
            src="/logo.png" 
            alt="FORTU DIGITAL" 
            class="h-12 md:h-12 w-auto transition-all duration-300"
            :class="isInHero ? '' : 'brightness-0'"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-12">
          <template v-for="link in navLinks" :key="link.to">
            <!-- Products with dropdown -->
            <button
              v-if="link.hasDropdown"
              @click="toggleProducts"
              :aria-label="`${isProductsOpen ? 'Tutup' : 'Buka'} menu produk`"
              :aria-expanded="isProductsOpen ? 'true' : 'false'"
              class="text-lg tracking-tight transition-colors flex items-center gap-1"
              :class="[
                isInHero 
                  ? 'text-fortu-off-white hover:text-fortu-light' 
                  : 'text-fortu-dark hover:text-fortu-medium',
                isProductsOpen ? 'font-medium' : ''
              ]"
            >
              {{ link.label }}
              <svg 
                class="w-4 h-4 transition-transform duration-200"
                :class="isProductsOpen ? 'rotate-180' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <!-- Regular links -->
            <RouterLink
              v-else
              :to="link.to"
              class="text-lg tracking-tight transition-colors"
              :class="isInHero 
                ? 'text-fortu-off-white hover:text-fortu-light' 
                : 'text-fortu-dark hover:text-fortu-medium'"
              active-class="font-medium"
              @click="closeProducts"
            >
              {{ link.label }}
            </RouterLink>
          </template>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <Button 
            :variant="isInHero ? 'secondary' : 'primary'" 
            size="sm" 
            href="/products"
            :class="!isInHero ? 'border-fortu-dark text-fortu-dark hover:bg-fortu-dark hover:text-fortu-off-white' : ''"
            @click="closeProducts"
          >
            Lihat Produk
          </Button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 transition-colors"
          :class="isInHero ? 'text-fortu-off-white' : 'text-fortu-dark'"
          aria-label="Buka/Tutup menu"
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
            href="/products" 
            class="mt-2"
            :class="isInHero 
              ? 'border-fortu-off-white text-fortu-off-white hover:bg-fortu-off-white hover:text-fortu-dark' 
              : 'border-fortu-dark text-fortu-dark hover:bg-fortu-dark hover:text-fortu-off-white'"
          >
            Lihat Produk
          </Button>
        </div>
      </div>
    </div>

    <!-- Products Dropdown (Full Width) -->
    <div
      v-show="isProductsOpen"
      class="hidden md:block w-full bg-white border-t border-fortu-light/20 shadow-lg"
    >
      <div class="py-8">
        <ProductCatalog />
      </div>
      
      <!-- View All Products Link -->
      <div class="border-t border-fortu-light/20 py-4 text-center">
        <RouterLink 
          to="/products" 
          class="text-sm font-medium text-fortu-dark hover:text-fortu-medium transition-colors"
          @click="closeProducts"
        >
          Lihat Semua Produk →
        </RouterLink>
      </div>
    </div>
  </nav>

  <!-- Backdrop -->
  <div
    v-if="isProductsOpen"
    class="fixed inset-0 bg-black/20 z-40"
    @click="closeProducts"
  ></div>
</template>

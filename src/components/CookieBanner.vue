<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="cookie-banner fixed bottom-0 left-0 right-0 z-[1001] bg-fortu-dark border-t border-fortu-medium/30 shadow-lg"
    >
      <div class="mx-auto px-4 md:px-16 py-4 md:py-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <p class="text-fortu-off-white text-sm md:text-base leading-relaxed">
              Kami menggunakan cookies untuk meningkatkan pengalaman Anda dan menganalisis penggunaan situs. 
              Dengan melanjutkan, Anda menyetujui penggunaan cookies kami.
              <RouterLink 
                to="/privacy" 
                class="underline hover:text-fortu-light transition-colors"
              >
                Pelajari lebih lanjut
              </RouterLink>
            </p>
          </div>
          <div class="flex items-center gap-3 flex-shrink-0">
            <button
              @click="acceptCookies"
              class="px-6 py-2.5 bg-fortu-off-white text-fortu-dark font-medium rounded-lg hover:bg-fortu-light transition-colors text-sm md:text-base"
            >
              Terima
            </button>
            <button
              @click="declineCookies"
              class="px-6 py-2.5 border border-fortu-medium text-fortu-off-white font-medium rounded-lg hover:bg-fortu-medium/20 transition-colors text-sm md:text-base"
            >
              Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const COOKIE_CONSENT_KEY = 'fortu_cookie_consent'
const showBanner = ref(false)

const checkConsent = () => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  return consent === 'accepted' || consent === 'declined'
}

const acceptCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
  showBanner.value = false
  initializeGoogleAnalytics()
}

const declineCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
  showBanner.value = false
}

const initializeGoogleAnalytics = () => {
  // Only initialize if not already loaded
  if ((window as any).gtag) {
    return
  }

  // Initialize dataLayer first
  if (!(window as any).dataLayer) {
    (window as any).dataLayer = []
  }
  
  // Define gtag function
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args)
  }
  (window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', 'G-0BP7NTVTPH')

  // Load Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0BP7NTVTPH'
  document.head.appendChild(script)
}

onMounted(() => {
  // Check if user has already given consent
  if (!checkConsent()) {
    showBanner.value = true
  } else if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted') {
    // If consent was previously accepted, initialize GA
    initializeGoogleAnalytics()
  }
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>


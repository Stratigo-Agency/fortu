<template>
  <section v-if="cmsDemo && !loading" class="cms-demo-section relative overflow-hidden pt-0 pb-32 bg-fortu-dark">
    <!-- Background gradient effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-fortu-medium/10 to-fortu-light/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-fortu-light/8 to-fortu-off-white/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#BFBFBF 1px, transparent 1px), linear-gradient(90deg, #BFBFBF 1px, transparent 1px); background-size: 60px 60px;"></div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section header -->
      <div class="text-center mb-20">
        <span class="inline-block px-4 py-2 rounded-full bg-fortu-off-white border text-fortu-dark font-light text-md tracking-wide uppercase mb-6">
          {{ cmsDemo.badge }}
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light text-fortu-off-white mb-6 tracking-tight">
          {{ cmsDemo.heading.line1 }}
          <span class="block mt-2 text-fortu-light">
            {{ cmsDemo.heading.line2 }}
          </span>
        </h2>
        <p class="text-fortu-medium text-lg max-w-2xl mx-auto leading-relaxed">
          {{ cmsDemo.description }}
        </p>
      </div>

      <!-- Main visualization container -->
      <div class="relative max-w-6xl mx-auto h-[200px] md:h-[780px] flex items-center justify-center">
        
        <!-- Product cards converging -->
        <!-- Product 1 - Top Left -->
        <div v-if="getProductByPosition('top-left')" class="product-card product-1 absolute top-0 left-0 md:left-12 lg:left-24">
          <div class="relative group">
            <!-- Connection line - L-shaped: right then down -->
            <div class="connection-line connection-1">
              <div class="line-horizontal"></div>
              <div class="line-vertical"></div>
              <div class="pulse-dot pulse-1"></div>
            </div>
            
            <div class="w-56 bg-gradient-to-br from-fortu-off-white/10 to-fortu-off-white/5 backdrop-blur-xl rounded-2xl border border-fortu-light/10 p-4 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:border-fortu-light/30">
              <div class="aspect-square rounded-xl overflow-hidden mb-4 bg-fortu-dark">
                <img 
                  v-if="getProductImage('top-left')"
                  :src="getProductImage('top-left')" 
                  :alt="getProductName('top-left')"
                  class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[green] animate-pulse"></div>
                  <span class="text-xs text-fortu-light uppercase tracking-wider">Synced</span>
                </div>
                <h4 class="text-fortu-off-white font-medium">{{ getProductName('top-left') }}</h4>
                <p class="text-fortu-medium text-sm">{{ formatPrice('top-left') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Product 2 - Top Right -->
        <div v-if="getProductByPosition('top-right')" class="product-card product-2 absolute top-0 right-0 md:right-12 lg:right-24">
          <div class="relative group">
            <!-- Connection line - L-shaped: left then down -->
            <div class="connection-line connection-2">
              <div class="line-horizontal"></div>
              <div class="line-vertical"></div>
              <div class="pulse-dot pulse-2"></div>
            </div>
            
            <div class="w-56 bg-gradient-to-br from-fortu-off-white/10 to-fortu-off-white/5 backdrop-blur-xl rounded-2xl border border-fortu-light/10 p-4 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:border-fortu-light/30">
              <div class="aspect-square rounded-xl overflow-hidden mb-4 bg-fortu-dark">
                <img 
                  v-if="getProductImage('top-right')"
                  :src="getProductImage('top-right')" 
                  :alt="getProductName('top-right')"
                  class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[green] animate-pulse"></div>
                  <span class="text-xs text-fortu-light uppercase tracking-wider">Synced</span>
                </div>
                <h4 class="text-fortu-off-white font-medium">{{ getProductName('top-right') }}</h4>
                <p class="text-fortu-medium text-sm">{{ formatPrice('top-right') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Product 3 - Bottom Center -->
        <div v-if="getProductByPosition('bottom-center')" class="product-card product-3 absolute bottom-0 left-1/2 -translate-x-1/2">
          <div class="relative group">
            <!-- Connection line - straight up -->
            <div class="connection-line connection-3">
              <div class="line-vertical-up"></div>
              <div class="pulse-dot pulse-3"></div>
            </div>
            
            <div class="w-56 bg-gradient-to-br from-fortu-off-white/10 to-fortu-off-white/5 backdrop-blur-xl rounded-2xl border border-fortu-light/10 p-4 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:border-fortu-light/30">
              <div class="aspect-square rounded-xl overflow-hidden mb-4 bg-fortu-dark">
                <img 
                  v-if="getProductImage('bottom-center')"
                  :src="getProductImage('bottom-center')" 
                  :alt="getProductName('bottom-center')"
                  class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-[green] animate-pulse"></div>
                  <span class="text-xs text-fortu-light uppercase tracking-wider">Synced</span>
                </div>
                <h4 class="text-fortu-off-white font-medium">{{ getProductName('bottom-center') }}</h4>
                <p class="text-fortu-medium text-sm">{{ formatPrice('bottom-center') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Central Laptop with CMS -->
        <div class="laptop-container relative z-20">
          <!-- Laptop frame -->
          <div class="laptop-frame relative">
            <!-- Screen bezel -->
            <div class="w-[500px] md:w-[600px] bg-gradient-to-b from-fortu-medium/60 to-fortu-medium/40 rounded-2xl p-3 shadow-2xl">
              
              <!-- Screen content -->
              <div class="bg-fortu-dark rounded-lg overflow-hidden aspect-[16/10]">
                <!-- CMS Interface -->
                <div class="h-full flex">
                  <!-- Sidebar -->
                  <div class="w-14 bg-fortu-dark border-r border-fortu-medium/20 p-2 flex flex-col items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-fortu-off-white flex items-center justify-center text-fortu-dark text-xs font-bold">F</div>
                    <div class="w-8 h-8 rounded-lg bg-fortu-medium/20 flex items-center justify-center">
                      <svg class="w-4 h-4 text-fortu-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                      </svg>
                    </div>
                    <div class="w-8 h-8 rounded-lg bg-fortu-medium/10 flex items-center justify-center">
                      <svg class="w-4 h-4 text-fortu-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                    <div class="w-8 h-8 rounded-lg bg-fortu-medium/10 flex items-center justify-center">
                      <svg class="w-4 h-4 text-fortu-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Main content area -->
                  <div class="flex-1 p-4 overflow-hidden">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <h3 class="text-fortu-off-white text-sm font-medium">Products</h3>
                        <p class="text-fortu-medium text-xs">{{ cmsDemo.products.length }} items synced</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="px-2 py-1 rounded bg-fortu-off-white/10 text-fortu-off-white text-xs">Live</div>
                        <div class="w-6 h-6 rounded-full bg-fortu-medium/20 flex items-center justify-center">
                          <svg class="w-3 h-3 text-fortu-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Product list in CMS -->
                    <div class="space-y-2">
                      <div 
                        v-for="(product, index) in cmsDemo.products" 
                        :key="product._key || index"
                        class="cms-product-row flex items-center gap-3 p-2 rounded-lg bg-fortu-medium/10 border border-fortu-medium/10"
                        :style="{ animationDelay: `${index * 0.2}s` }"
                      >
                        <div class="w-10 h-10 rounded-lg overflow-hidden bg-fortu-dark flex-shrink-0">
                          <img 
                            v-if="getProductImageForCMS(product)"
                            :src="getProductImageForCMS(product)" 
                            :alt="getProductNameForCMS(product)"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-fortu-off-white text-xs truncate">{{ getProductNameForCMS(product) }}</p>
                          <p class="text-fortu-medium text-xs">{{ formatPriceForCMS(product) }}</p>
                        </div>
                        <div class="w-2 h-2 rounded-full bg-fortu-off-white animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>
          
          
        </div>

        <!-- Animated data flow particles -->
        <div class="particles-container absolute inset-0 pointer-events-none">
          <div class="particle particle-1"></div>
          <div class="particle particle-2"></div>
          <div class="particle particle-3"></div>
          <div class="particle particle-4"></div>
          <div class="particle particle-5"></div>
          <div class="particle particle-6"></div>
        </div>
      </div>

      <!-- Bottom features -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div v-for="(feature, index) in cmsDemo.features" :key="feature._key || index" class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-fortu-off-white/10 flex items-center justify-center mx-auto mb-4 border border-fortu-light/20">
            <svg v-if="feature.icon === 'lightning'" class="w-6 h-6 text-fortu-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <svg v-else-if="feature.icon === 'dashboard'" class="w-6 h-6 text-fortu-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
            </svg>
            <svg v-else-if="feature.icon === 'shield'" class="w-6 h-6 text-fortu-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h4 class="text-fortu-off-white font-medium mb-2">{{ feature.title }}</h4>
          <p class="text-fortu-medium text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { client } from '@/sanity/client'
import { CMS_DEMO_QUERY, type CMSDemo, type CMSDemoProduct } from '@/sanity/queries'
import { urlFor } from '@/sanity/client'

const cmsDemo = ref<CMSDemo | null>(null)
const loading = ref(true)

// Helper function to get product by position
const getProductByPosition = (position: 'top-left' | 'top-right' | 'bottom-center') => {
  if (!cmsDemo.value?.products) return null
  return cmsDemo.value.products.find(p => p.position === position)
}

// Helper function to get product data (handles both referenced and custom products)
const getProductData = (position: 'top-left' | 'top-right' | 'bottom-center') => {
  const product = getProductByPosition(position)
  if (!product) return null
  
  // Prefer referenced product, fallback to custom product
  if (product.product) {
    return {
      name: product.product.name,
      price: product.product.price,
      currency: product.product.currency || 'USD',
      image: product.product.images?.[0]
    }
  } else if (product.customProduct) {
    return {
      name: product.customProduct.name,
      price: product.customProduct.price,
      currency: 'USD',
      image: product.customProduct.image
    }
  }
  return null
}

// Helper function to get product name
const getProductName = (position: 'top-left' | 'top-right' | 'bottom-center') => {
  const data = getProductData(position)
  return data?.name || ''
}

// Helper function to get product image URL
const getProductImage = (position: 'top-left' | 'top-right' | 'bottom-center'): string | undefined => {
  const data = getProductData(position)
  if (!data?.image?.asset) return undefined
  
  try {
    return urlFor(data.image.asset).width(400).height(400).url()
  } catch {
    return undefined
  }
}

// Helper function to format price
const formatPrice = (position: 'top-left' | 'top-right' | 'bottom-center') => {
  const data = getProductData(position)
  if (!data) return ''
  
  const currencySymbol = data.currency === 'USD' ? '$' : data.currency === 'EUR' ? '€' : '£'
  return `${currencySymbol}${data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Helper functions for CMS product list
const getProductNameForCMS = (product: CMSDemoProduct) => {
  if (product.product) {
    return product.product.name
  } else if (product.customProduct) {
    return product.customProduct.name
  }
  return ''
}

const getProductImageForCMS = (product: CMSDemoProduct): string | undefined => {
  let imageAsset = null
  
  if (product.product?.images?.[0]?.asset) {
    imageAsset = product.product.images[0].asset
  } else if (product.customProduct?.image?.asset) {
    imageAsset = product.customProduct.image.asset
  }
  
  if (!imageAsset) return undefined
  
  try {
    return urlFor(imageAsset).width(80).height(80).url()
  } catch {
    return undefined
  }
}

const formatPriceForCMS = (product: CMSDemoProduct) => {
  let price = 0
  let currency = 'USD'
  
  if (product.product) {
    price = product.product.price
    currency = product.product.currency || 'USD'
  } else if (product.customProduct) {
    price = product.customProduct.price
  }
  
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'
  return `${currencySymbol}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

onMounted(async () => {
  try {
    cmsDemo.value = await client.fetch(CMS_DEMO_QUERY)
  } catch (e) {
    console.error('Failed to fetch CMS Demo content:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Product card animations */
.product-card {
  animation: float 6s ease-in-out infinite;
}

.product-1 {
  animation-delay: 0s;
}

.product-2 {
  animation-delay: 2s;
}

.product-3 {
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.product-3 {
  animation-name: float-center;
}

@keyframes float-center {
  0%, 100% {
    transform: translateX(-50%) translateY(0px);
  }
  50% {
    transform: translateX(-50%) translateY(-15px);
  }
}

/* Connection lines - L-shaped dashed lines */
.connection-line {
  position: absolute;
  pointer-events: none;
}

/* Connection 1 - Top Left: goes right then down */
.connection-1 {
  top: 50%;
  left: 100%;
}

.connection-1 .line-horizontal {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 2px;
  border-top: 2px dashed rgba(191, 191, 191, 0.4);
}

.connection-1 .line-vertical {
  position: absolute;
  top: 0;
  left: 120px;
  width: 2px;
  height: 180px;
  border-left: 2px dashed rgba(191, 191, 191, 0.4);
}

/* Connection 2 - Top Right: goes left then down */
.connection-2 {
  top: 50%;
  right: 100%;
}

.connection-2 .line-horizontal {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 2px;
  border-top: 2px dashed rgba(191, 191, 191, 0.4);
}

.connection-2 .line-vertical {
  position: absolute;
  top: 0;
  right: 120px;
  width: 2px;
  height: 180px;
  border-left: 2px dashed rgba(191, 191, 191, 0.4);
}

/* Connection 3 - Bottom Center: goes straight up */
.connection-3 {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.connection-3 .line-vertical-up {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2px;
  height: 150px;
  border-left: 2px dashed rgba(191, 191, 191, 0.4);
}

/* Pulsing dots that travel along the path */
.pulse-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #F9F9F9;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(249, 249, 249, 0.8), 0 0 20px rgba(249, 249, 249, 0.4);
}

/* Pulse animation for connection 1 - right then down */
.pulse-1 {
  animation: pulse1 3s ease-in-out infinite;
}

@keyframes pulse1 {
  0% {
    top: -4px;
    left: -4px;
    opacity: 1;
  }
  40% {
    top: -4px;
    left: 116px;
    opacity: 1;
  }
  100% {
    top: 176px;
    left: 116px;
    opacity: 0;
  }
}

/* Pulse animation for connection 2 - left then down */
.pulse-2 {
  animation: pulse2 3s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes pulse2 {
  0% {
    top: -4px;
    right: -4px;
    opacity: 1;
  }
  40% {
    top: -4px;
    right: 116px;
    opacity: 1;
  }
  100% {
    top: 176px;
    right: 116px;
    opacity: 0;
  }
}

/* Pulse animation for connection 3 - straight up */
.pulse-3 {
  animation: pulse3 3s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes pulse3 {
  0% {
    bottom: -4px;
    left: -4px;
    opacity: 1;
  }
  100% {
    bottom: 146px;
    left: -4px;
    opacity: 0;
  }
}

/* CMS product rows animation */
.cms-product-row {
  animation: slideIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateX(-20px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Particles - using brand colors (#F9F9F9 off-white, #BFBFBF light, #7D7D7D medium) */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #F9F9F9;
  opacity: 0;
  animation: particleFlow 4s ease-in-out infinite;
}

.particle-1 {
  top: 10%;
  left: 20%;
  background: #F9F9F9;
  animation-delay: 0s;
}

.particle-2 {
  top: 15%;
  right: 22%;
  background: #BFBFBF;
  animation-delay: 0.8s;
}

.particle-3 {
  bottom: 18%;
  left: 50%;
  background: #F9F9F9;
  animation-delay: 1.6s;
}

.particle-4 {
  top: 25%;
  left: 30%;
  background: #BFBFBF;
  animation-delay: 2.4s;
}

.particle-5 {
  top: 20%;
  right: 30%;
  background: #F9F9F9;
  animation-delay: 3.2s;
}

.particle-6 {
  bottom: 25%;
  left: 48%;
  background: #BFBFBF;
  animation-delay: 4s;
}

@keyframes particleFlow {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(100px) scale(0.5);
  }
}

/* Laptop glow animation - using brand colors */
.laptop-container {
  animation: laptopGlow 4s ease-in-out infinite alternate;
}

@keyframes laptopGlow {
  0% {
    filter: drop-shadow(0 0 30px rgba(191, 191, 191, 0.15));
  }
  50% {
    filter: drop-shadow(0 0 50px rgba(249, 249, 249, 0.2));
  }
  100% {
    filter: drop-shadow(0 0 30px rgba(191, 191, 191, 0.15));
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-card {
    display: none;
  }
  
  .laptop-container {
    transform: scale(0.75);
    transform-origin: center center;
  }
  
  .connection-line {
    display: none;
  }
}
</style>

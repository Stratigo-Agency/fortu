<template>
  <div class="products-page bg-fortu-off-white min-h-screen pt-24">
    <div class="container mx-auto px-4 md:px-16 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-light text-fortu-dark mb-4 tracking-tight">Our Products</h1>
        <p class="text-fortu-medium text-lg max-w-2xl mx-auto">
          Discover our collection of premium products with multiple variants.
        </p>
      </div>

      <!-- Product Catalog -->
      <ProductCatalog />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCatalog from '@/components/ProductCatalog.vue'
</script>

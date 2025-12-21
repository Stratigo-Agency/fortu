<template>
  <div class="products-page bg-fortu-dark min-h-screen">
    <PageHero 
      pageName="products" 
      fallbackTitle="Discover Fortu"
      fallbackSubtitle="Explore our collection of premium products"
    />

    <!-- Product Catalog -->
     <div class="">
        <ProductCatalog class="py-12 px-16" />

        <Compare />
     </div>
   
  </div>
</template>

<script setup lang="ts">
import PageHero from '@/components/PageHero.vue'
import ProductCatalog from '@/components/ProductCatalog.vue'
import Compare from '@/components/Compare.vue'
</script>

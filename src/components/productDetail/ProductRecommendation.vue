<template>
  <div v-if="!loading && recommendedProducts.length > 0" class="py-16 bg-fortu-off-white">
    <ImageCarousel
      :images="productImages"
      heading="Cek Produk Lain"
      :show-button="true"
      mode="light"
      :clickable="true"
      @image-click="handleProductClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { client, urlFor } from '@/sanity/client'
import { PRODUCTS_QUERY, type Product } from '@/sanity/queries'
import ImageCarousel from '@/components/ImageCarousel.vue'

interface Props {
  currentProductId?: string
  currentProductSlug?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentProductId: '',
  currentProductSlug: ''
})

const router = useRouter()
const allProducts = ref<Product[]>([])
const loading = ref(true)

const recommendedProducts = computed(() => {
  if (!props.currentProductId && !props.currentProductSlug) {
    return allProducts.value
  }
  
  return allProducts.value.filter(product => {
    // Exclude current product by ID or slug
    if (props.currentProductId && product._id === props.currentProductId) {
      return false
    }
    if (props.currentProductSlug && product.slug?.current === props.currentProductSlug) {
      return false
    }
    return true
  })
})

const getProductImage = (product: Product): string | undefined => {
  const firstImage = product.images?.[0]
  if (firstImage?.asset) {
    if (firstImage.asset.url) {
      return firstImage.asset.url
    }
    try {
      return urlFor(firstImage.asset).width(600).height(600).url()
    } catch {
      return undefined
    }
  }
  return undefined
}

const productImages = computed(() => {
  return recommendedProducts.value.map(product => ({
    url: getProductImage(product) || '/placeholder.jpg',
    alt: product.name,
    caption: product.name,
    slug: product.slug?.current
  }))
})

const handleProductClick = (index: number) => {
  const product = recommendedProducts.value[index]
  if (product?.slug?.current) {
    router.push(`/products/${product.slug.current}`)
  }
}

onMounted(async () => {
  try {
    allProducts.value = await client.fetch(PRODUCTS_QUERY)
  } catch (e) {
    console.error('Failed to fetch products for recommendations:', e)
  } finally {
    loading.value = false
  }
})
</script>


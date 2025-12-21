import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Products from '@/pages/Products.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import About from '@/pages/About.vue'
import Contact from '@/pages/Contact.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
    {
      path: '/products/:slug',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router



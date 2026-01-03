import { createRouter, createWebHistory } from 'vue-router'

// Lazy load routes for code splitting
const Home = () => import('@/pages/Home.vue')
const Products = () => import('@/pages/Products.vue')
const ProductDetail = () => import('@/pages/ProductDetail.vue')
const About = () => import('@/pages/About.vue')
const Contact = () => import('@/pages/Contact.vue')
const Privacy = () => import('@/pages/Privacy.vue')
const NotFound = () => import('@/pages/NotFound.vue')

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
      path: '/privacy',
      name: 'Privacy',
      component: Privacy,
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



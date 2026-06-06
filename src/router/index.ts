import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/robots',
    name: 'Robots',
    component: () => import('@/views/RobotsView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/views/TeamView.vue')
  },
  {
    path: '/sparks',
    name: 'Sparks',
    component: () => import('@/views/SparksView.vue')
  },
  {
    path: '/merch',
    name: 'Merch',
    component: () => import('@/views/MerchView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

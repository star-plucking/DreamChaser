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
  routes,
  async scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Wait for the outgoing page transition and lazy-loaded destination.
      for (let frame = 0; frame < 90; frame++) {
        const target = document.getElementById(to.hash.slice(1))
        if (target && frame > 1 && !target.closest('.page-fade-enter-active')) {
          // Let layout observers settle before measuring the anchor.
          await new Promise<void>(resolve => setTimeout(resolve, 180))
          return { el: target, top: 112 }
        }
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      }
    }
    return { top: 0 }
  }
})

export default router

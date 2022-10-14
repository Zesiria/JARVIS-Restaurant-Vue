import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinDeskView from '@/views/CoinDeskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/coin-desk',
      name: 'coin-desk',
      component: CoinDeskView
    },
    {
      path: '/foods',
      name: 'foods',
      component: () => import('@/views/foods/AllFoodView.vue')
    },
    {
      path: '/foods/new',
      name: 'foods.create',
      component: () => import('@/views/foods/CreateFoodView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue')
    },
    {
      path: '/manager',
      name: 'manager-menu',
      component: () => import('@/views/manager/Menu.vue')
    },
    {
      path: '/tables',
      name: 'table.index',
      component: () => import('@/views/manager/AllTable.vue')
    },
    {
      path: '/order/food',
      name: 'order-food',
      component: () => import('@/views/customer/OrderFoodView.vue')
    },
    {
      path: '/customer/login',
      name: 'customer-login',
      component: () => import('@/views/customer/LoginView.vue')
    }
  ]
})

export default router

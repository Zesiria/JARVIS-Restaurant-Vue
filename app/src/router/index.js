import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinDeskView from '@/views/CoinDeskView.vue'
import {useAuthStore} from "../stores/auth";

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
      path: '/manager/tables',
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
    },
    {
      path: '/waiter/home',
      name: 'waiter-homepage',
      component: () => import('@/views/waiter/WaiterMenu.vue')
    },
    {
      path: '/waiter/foods',
      name: 'waiter-foods',
      component: () => import('@/views/waiter/WaiterAllFood.vue')
    },
    {
      path: '/waiter/order',
      name: 'waiter-order',
      component: () => import('@/views/waiter/WaiterOrderFood.vue')
    },
    {
      path: '/chef/kitchen',
      name: 'kitchen',
      component: () => import('@/views/chef/KitchenView.vue')
    },
    {
      path: '/order/view',
      name: 'order-view',
      component: () => import('@/views/customer/OrderView.vue')
    },
    {
      path: '/order/:order_id',
      name: 'order-detail',
      component: () => import('@/views/customer/OrderDetailView.vue')
    },
    {
      path: '/chef/kitchen/order/:orderId',
      name: 'chef-order',
      component: () => import('@/views/chef/OrderListView.vue')
    },
    {
      path: '/reviews',
      name: 'review-index',
      component: () => import('@/views/ReviewView.vue')
    },
    {
      path: '/customer/review',
      name: 'customer-review',
      component: () => import('@/views/customer/ReviewView.vue')
    },
    {
      path: '/manager/report',
      name: 'manager-report',
      component: () => import('@/views/manager/ReportDashboardView.vue')
    },
    {
      path: '/manager/billing/:tableId',
      name: 'manager-table-bill',
      component: () => import('@/views/manager/BillDetailView.vue')
    },
    {
      path: '/manager/bill/check',
      name: 'manager-bill-check',
      component: () => import('@/views/manager/BillCheck.vue')
    },
    {
      path: '/manager/users',
      name: 'manager-users',
      component: () => import('@/views/manager/AllUsersView.vue')
    },
    {
      path: '/users/change-password',
      name: 'user-change-password',
      component: () => import('@/views/ChangePasswordView.vue'),
    }
  ]
})

router.beforeEach(async (to) =>{
  const publicPage = ['home', 'login', 'customer-login','logout'];

  const authRequired = !publicPage.includes(to.name);
  const auth = useAuthStore();
  const managerPage = ['foods.create','manager-menu','table.index','manager-report','manager-table-bill','manager-bill-check','manager-users']
  const managerAuthRequired = managerPage.includes(to.name);
  const chefPage = ['kitchen', 'chef-order']
  const chefAuthRequired = chefPage.includes(to.name);
  const waiterPage = ['waiter-homepage', 'waiter-foods', 'waiter-order']
  const waiterAuthRequired = waiterPage.includes(to.name);
  const customerPage = ['order-food', 'order-view', 'order-detail','customer-review']
  const customerAuthRequired = customerPage.includes(to.name);

  if (authRequired && !auth.isAuthen){
    return '/'
  }
  else if(to.name == "foods" && (!(auth.getRole == 'Manager') && !(auth.getRole == 'Chef') && !(auth.getRole == 'customer'))){
    return '/'
  }
  else if(to.name == "user-change-password" && !auth.isAuthen){
    return '/'
  }
  else if(managerAuthRequired && !(auth.getRole == 'Manager')){
    return '/'
  }
  else if(chefAuthRequired && !(auth.getRole == 'Chef')){
    return '/'
  }
  else if(waiterAuthRequired && !(auth.getRole == 'Waiter')){
    return '/'
  }
  if(customerAuthRequired && !(auth.getRole == 'customer')){
    return '/'
  }
})

export default router

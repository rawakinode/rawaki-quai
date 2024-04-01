import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SwapView from '../views/SwapView.vue'
import EarnView from '../views/EarnView.vue'
import PoolsView from '../views/PoolsView.vue'
import addLiquidityView from '../views/addLiquidityView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        redirect: '/swap'
      },
      {
        path: '/swap',
        name: 'swap',
        component: SwapView
      },
      {
        path: '/pools',
        name: 'pools',
        component: PoolsView
      },
      {
        path: '/earn',
        name: 'earn',
        component: EarnView
      },
      {
        path: '/pools/add',
        name: 'addLiquidity',
        component: addLiquidityView
      },
      
    ]
  })
  
  export default router
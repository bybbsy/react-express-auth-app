import { useMainStore } from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: {
      layout: 'empty'
    },
    component: () => import('@/views/signinPage.vue') 
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: {
      layout: 'empty'
    },
    component: () => import('@/views/signupPage.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const mainStore = useMainStore();

  if(localStorage.getItem('accessToken')) {
    await mainStore.checkAuth();
  }
  next()
})
 

// router.beforeEach(async (to, from, next) => {
//   const mainStore = useMainStore();
//   if(mainStore.isAuth && to.meta.auth == true) {
//     next()
//   } else if(!mainStore.isAuth && to.meta.auth == true) {
//     next({ name: 'sign-in'})
//   }
//   next();
// })
export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/device"
    },
    {
      path: '/device',
      name: 'deviceIndex',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/device/IndexView.vue')
    },
    {
      path: '/device/support',
      name: 'deviceSupport',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/device/SupportView.vue')
    },
    {
      path: '/device/:model/add',
      name: 'deviceAdd',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/device/AddView.vue')
    },
    {
      path: '/device/:id',
      name: 'deviceInfo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/device/InfoView.vue')
    },
    {
      path: '/user',
      name: 'userIndex',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/user/IndexView.vue')
    },
  ]
})

export default router

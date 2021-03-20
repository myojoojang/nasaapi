import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/components/Weather.vue'),
    },
    {
      path: '/insight',
      component: () => import('@/components/Weather.vue'),
    },
    {
      path: '/marsphotos',
      component: () => import('@/components/Album.vue'),
    },
  ],
})

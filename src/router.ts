import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => {
        return import('./views/AstronomyPictureView.vue');
      },
    },
    {
      path: '/insight',
      component: () => {
        return import('./views/InsightWeatherView.vue');
      },
    },
    {
      path: '/marsphotos',
      component: () => {
        return import('./views/ImageLibraryView.vue');
      },
    },
  ],
});

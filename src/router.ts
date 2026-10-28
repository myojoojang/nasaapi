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
        return import('./features/astronomy/AstronomyPictureView.vue');
      },
    },
    {
      path: '/insight',
      component: () => {
        return import('./features/insight/InsightWeatherView.vue');
      },
    },
    {
      path: '/marsphotos',
      component: () => {
        return import('./features/images/ImageLibraryView.vue');
      },
    },
  ],
});

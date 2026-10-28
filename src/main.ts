import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './styles/app.css';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (createElement) => {
    return createElement(App);
  },
}).$mount('#app');

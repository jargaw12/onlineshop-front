// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Foo from './components/MyFooter'
import router from './router'
import axios from 'axios'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

Vue.config.productionTip = false;
Vue.use(Vuikit)
Vue.use(VuikitIcons)

const api2 = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth) {
    next('/login');
  } else {
    next();
  }
});

Vue.component('foo', Foo);

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});

window.Vue = Vue;


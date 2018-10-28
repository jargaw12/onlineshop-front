// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import axios from './axios.js'
import store from './store.js'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuikit);
Vue.use(VuikitIcons);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next( '/login')
    } else {
      next()
    }
  }
  else
    next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
  create(){
    store.commit('setAuth',localStorage.getItem('user-token'))
  }
});

window.Vue = Vue;


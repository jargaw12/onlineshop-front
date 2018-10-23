// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Foo from './components/MyFooter'
import router from './router'
import store from './store'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

Vue.config.productionTip = false;
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

Vue.component('foo', Foo);

new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
  create(){
    store.commit('setAuth',localStorage.getItem('user-token'))
  }
});

window.Vue = Vue;


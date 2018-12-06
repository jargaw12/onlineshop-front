// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import axios from './axios.js'
import axios_admin from './axios_admin.js'
import store from './store.js'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
// import '@vuikit/theme'
import Vuelidate from 'vuelidate'

// import VeeValidate from 'vee-validate';
// import VeeValidate from 'vee-validate';
import VeeValidate, {Validator} from 'vee-validate'
import pl from 'vee-validate/dist/locale/pl'

Validator.localize({pl: pl})
Vue.use(VeeValidate, {locale: 'pl'})


Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http_admin = axios_admin;


Vue.use(Vuelidate)
Vue.use(Vuikit);
Vue.use(VuikitIcons);


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => (record.parent !==undefined && record.parent.name === 'admin'))) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.adminIsLoggedIn) {
          next({name: 'adminSignIn'});
        } else {
          next()
        }
      } else next();
    } else if (to.matched.some(record => (record.parent !==undefined && record.parent.name === 'client'))) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
          next('/zaloguj');
        } else {
          next()
        }
      } else next();
    }
});


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
  create() {
    store.commit('setAuth', localStorage.getItem('user-token'));
  }
});

window.Vue = Vue;


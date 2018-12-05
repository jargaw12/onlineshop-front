// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import axios from './axios.js'
import store from './store.js'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
// import '@vuikit/theme'
import Vuelidate from 'vuelidate'

// import VeeValidate from 'vee-validate';
// import VeeValidate from 'vee-validate';
import VeeValidate, { Validator } from 'vee-validate'
import pl from 'vee-validate/dist/locale/pl'
Validator.localize({ pl: pl })
Vue.use(VeeValidate, {locale: 'pl'})


Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Vuelidate)
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
    store.commit('setAuth',localStorage.getItem('user-token'));

    // axios.get('/menu/groups')
    //   .then(response => {
    //     // this.groups=response.data;
    //     console.log("Grupy 1/2 main ");
    //     store.commit('setCategories',response.data);
    //     console.log("Grupy 2/2 main " + response.data);
    //   })
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });
  }
});

window.Vue = Vue;


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App'
import Foo from './components/MyFooter'
import router from './router'

Vue.config.productionTip = false;

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
});

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    plus (state, n) {
      state.count += n
  },
    minus (state, n) {
      state.count-= n
    }
  }
});

Vue.use(Vuex);
Vue.component('foo', Foo);

/* eslint-disable no-new */
// Vue.use(Vuikit)
// Vue.use(VuikitIcons)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 993,
    laptop: 1250,
    desktop: Infinity,
  }
});

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

window.Vue = Vue;


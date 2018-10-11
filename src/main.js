// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
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

Vue.component('foo', Foo);

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

window.Vue = Vue;


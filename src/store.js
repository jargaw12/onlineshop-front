import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
  },
  state: {
    count: 0,
    // authenticated: true,
    token: localStorage.getItem('user-token') || '',
    username: null
  },
  mutations: {
    plus (state, n) {
      state.count += n
    },
    minus (state, n) {
      state.count-= n
    },
    setUser(state,user){
      state.username=user;
    },
    setAuth(state,have){
      if (have)
        state.token = localStorage.getItem('user-token');
      else
        state.token = '';
      // this.state.authenticated = have === false;
    }
  },
  actions: {
    authRequest(user){
      http.post('/oauth/token', user)
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem('user-token', token);
          http.defaults.headers.common['Authorization'] = 'Bearer ' + token
        })
        .catch(err => {
          localStorage.removeItem('user-token');
        })
    },
    login(param){
      localStorage.setItem('user-token', param.token);
      this.$store.commit('setUser', param.user.username);
      this.$store.commit('setAuth', true);
    },
    logout(){
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('user-token');
      this.commit('setAuth',false);
    }
  },
  getters : {
    isLoggedIn: state => {
      return state.token !== '';
    }
  },
  setters :{

  }
});

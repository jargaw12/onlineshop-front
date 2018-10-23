import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  }
});

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
      this.state.count += n
    },
    minus (state, n) {
      this.state.count-= n
    },
    setUser(user){
      this.state.username=user;
    },
    setAuth(have){
      if (have)
        this.state.token = localStorage.getItem('user-token');
      else
        this.state.token = '';
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
  }
});

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { authentication } from './authentication.module';


const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  }
});

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    authentication,
  },
  state: {
    count: 0,
    authenticated: false,
    username: null
  },
  mutations: {
    plus (state, n) {
      state.count += n
    },
    minus (state, n) {
      state.count-= n
    },
    setUser(user){
      state.username=user;
    },
    setAuth(state, have){
      state.authenticated = have === true;
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
    }
  },
});

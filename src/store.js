import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
  },
  state: {
    count: 0,
    page:{
      size:4,
      number:1,
      total:0,
      order:{
        by:null,
        dir:null,
      }
    },

    menu:{
      activeGroup:1,
      activeCategory:null,
      activeSubcategory:null,
      categories:[],
    },
    // authenticated: true,
    token: localStorage.getItem('user-token') || '',
    // username: localStorage.getItem('username') || '',
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
    },
    setCategories(state,categories){
      state.menu.categories=categories;
    },
    setActiveGroup(state,group){
      state.menu.activeGroup=group;
    },
    setActiveCategory(state,category){
      state.menu.activeCategory=category;
    },
    setActiveSubcategory(state,subcategory){
      state.menu.activeSubcategory=subcategory;
    },
    setPageTotal(state,total){
      state.page.total=total;
    },
    setPageNumber(state,number){
      state.page.number=number;
    },
    setPageSize(state,size){
      state.page.size=size;
    },
    setSortSettings(state,order){
      state.page.order.by=order.by;
      state.page.order.dir=order.dir;
    },
  },
  actions: {
    // authRequest(user){
    //   http.post('/oauth/token', user)
    //     .then(resp => {
    //       const token = resp.data.token;
    //       localStorage.setItem('user-token', token);
    //       localStorage.setItem('user-token', token);
    //       http.defaults.headers.common['Authorization'] = 'Bearer ' + token
    //     })
    //     .catch(err => {
    //       localStorage.removeItem('user-token');
    //     })
    // },
    login(param){
      localStorage.setItem('user-token', param.token);
      sessionStorage.setItem('user-token', param.token);

      // http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      // this.$store.commit('setUser', param.user.username);
      this.$store.commit('setAuth', true);
    },
    logout(){
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('user-token');
      localStorage.removeItem('username');
      sessionStorage.removeItem('user-token');
      sessionStorage.removeItem('username');
      this.state.count = 0;
      this.commit('setAuth',false);
    }
  },
  getters : {
    isLoggedIn: state => {
      return state.token !== '';
    },
    // getGroup:state =>{
    //   return state.menu.categories
    //     .filter(group=>group.id===state.menu.activeGroup)[0];
    // },
    // getCategory: state =>{
    //     return state.menu.categories
    //     .filter(group=>group.id===state.menu.activeGroup)[0].categories
    //     .filter(cat=>cat.id===state.menu.activeCategory)[0];
    // },
    // getSubcategory: state =>{
    //     return state.menu.categories
    //     .filter(group=>group.id===state.menu.activeGroup)[0].categories
    //     .filter(cat=>cat.id===state.menu.activeCategory)[0].subcategories
    //     .filter(sub=>sub.id===state.menu.activeSubcategory)[0];
    // }
  },
});

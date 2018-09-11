import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductDetail from '@/components/ProductDetail'
import ProductList from '@/components/ProductList'
import UserAccount from '@/components/UserAccount'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Product Detail',
      component: ProductDetail
    },
    {
      path: '/list',
      name: 'Product List',
      component: ProductList
    },
    {
      path: '/account',
      name: 'User Account',
      component: UserAccount
    }
  ]
})

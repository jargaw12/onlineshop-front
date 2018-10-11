import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductDetail from '@/components/ProductDetail'
import ProductList from '@/components/ProductList'
import UserAccount from '@/components/UserAccount'
import ShoppingCart from '@/components/ShoppingCart'
import Order from '@/components/Order'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:id',
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
    },
    {
      path: '/cart',
      name: 'Shopping Cart',
      component: ShoppingCart
    },
    {
      path: '/order/:id',
      name: 'Order',
      component: Order
    },
    {
      path: '/payment',
      name: 'OrderAndPayment',
      component: Order
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ],
})

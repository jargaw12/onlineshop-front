import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductDetail from '@/components/ProductDetail'
import ProductList from '@/components/ProductList'
import UserAccount from '@/components/UserAccount'
import ShoppingCart from '@/components/ShoppingCart'
import Order from '@/components/OrderAndPayment'
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'

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
      component: ProductList,
      props: (route) => ({
        to: route.query.page,
      })
    },
    {
      path: '/account',
      name: 'User Account',
      component: UserAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      name: 'Shopping Cart',
      component: ShoppingCart
    },
    {
      path: '/order/:id',
      name: 'Order',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payment',
      name: 'OrderAndPayment',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '*',
      name: 'Other',
      component: PageNotFound
    },
  ],
})

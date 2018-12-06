import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import ProductDetail from '@/views/ProductDetail'
import ProductList from '@/views/ProductList'
import UserAccount from '@/views/UserAccount'
import ShoppingCart from '@/views/ShoppingCart'
import Order from '@/views/OrderAndPayment'
import Order2 from '@/views/Order'
import Login from '@/views/Login'
import PageNotFound from '@/views/PageNotFound'

import Admin from '@/views/Admin'
import AdminHome from '@/views/AdminHome'
import Client from '@/views/Client'
import AddProduct from '@/views/AddProduct'
import ThankPage from '@/views/ThankPage'
import SignInSignUp from '@/views/SignInSignUp'
import SignIn from '@/components/SignIn'
import SignInOnly from '@/views/SignInOnly'
import SignUp from '@/components/SignUp'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'client',
      component: Client,
      name:'client',
      children: [
        {
          path: '',
          // path: '/:sex?',
          name: 'home',
          title: "Home",
          component: Home
        },
        {
          path: '/product/:id',
          name: 'Product Detail',
          component: ProductDetail
        },
        {
          path: '/account',
          name: 'account',
          component: UserAccount,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/cart',
          name: 'cart',
          component: ShoppingCart,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/order/:id',
          name: 'Order',
          component: Order2,
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
          path: '/produkty/:group/:category/:subcategory?',
          name: 'Product List',
          component: ProductList,
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/signinup',
          name: 'signinup',
          component: SignInSignUp,
          children:[
            {
              path: '/zaloguj',
              name: 'signin',
              component: SignIn,
            },
            {
              path: '/zarejestruj',
              name: 'signup',
              component: SignUp,
            },
          ]
        },
        {
          path: '/thankyou',
          name: 'thank',
          component: ThankPage
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/',
          name: 'adminHome',
          component: AdminHome,
        },
        {
          path: 'zaloguj',
          name: 'adminSignIn',
          component: SignInOnly,
        },
        {
          path: 'product/add',
          name: 'addProduct',
          component: AddProduct,
          meta: {
            requiresAuth: true
          },
        },
      ]
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
  ]
})

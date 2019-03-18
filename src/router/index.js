import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Fun from '@/components/function/function'
import Room from '@/components/room/room'
import Form from '@/components/form/form'
import Bill from '@/components/bill/bill'
import Record from '@/components/record/record'
import Account from '@/components/account/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/function',
      name: 'function',
      component: Fun
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/bill',
      name: 'bill',
      component: Bill
    },
    {
      path: '/record',
      name: 'record',
      component: Record
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ]
})

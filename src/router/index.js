import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Calendar from '@/components/Calendar'
import ChatList from '@/components/ChatList'
import PageNotFound from '@/components/PageNotFound'
import Manage from '@/components/Manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/chat/:child_id',
      name: 'Chat',
      component: ChatList
    },
    {
      path: "*",
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

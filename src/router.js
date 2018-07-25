import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

// Fallbacks
import NotFound from './views/fallbacks/NotFound.vue'
import NotAuthorized from './views/fallbacks/NotAuthorized.vue'
import NotAuthenticated from './views/fallbacks/NotAuthenticated.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {requiresAuth: false}
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true}
    },
    {
      path: '/401',
      name: 'notAuthorized',
      component: NotAuthorized,
      meta: {requiresAuth: false}
    },
    {
      path: '/403',
      name: 'notAuthenticated',
      component: NotAuthenticated,
      meta: {requiresAuth: false}
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
      meta: {requiresAuth: false}
    },
    {
      path: '/*',
      name: 'catchAll',
      redirect: { name: 'notFound' },
    }
  ]
})

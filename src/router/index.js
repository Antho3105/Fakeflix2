import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/recherche',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/mes-favoris',
    name: 'favorite',

    component: () => import('../views/FavoriteView.vue')
  },
  {
    path: '/films-a-voir',
    name: 'watchlist',
    component: () => import('../views/WatchListView.vue')
  },
  {
    path: '/film/:id',
    name: 'moviedetail',

    component: () => import('../views/FilmDetail.vue')
  },
  {
    path: '/film',
    name: 'film',

    component: () => import('../views/FilmDetail.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404View.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

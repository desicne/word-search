import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const stats = () => import('./../pages/stats.vue')
const wordExplore = () => import('./../pages/word-explore.vue')
const history = () => import('./../pages/history.vue')


export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/history', name: 'history', component: history },
      { path: '/word-explore', name: 'word-explore', component: wordExplore },
      { path: '/stats', name: 'stats', component: stats },
      { path: '*', redirect: {name: 'stats'}}
    ]
  })
}

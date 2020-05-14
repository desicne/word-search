import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

import titleMixin from './util/title'
import * as filters from './util/filters'
import * as _ from "lodash"

const router = createRouter()
const isProd = process.env.NODE_ENV === 'production'

Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function createApp () {

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}


import Vue from 'vue'
import Vuex from 'vuex'
import words from './words'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.axios = require('axios')

export const store = new Vuex.Store({
  namespace: false,
  strict: false,
  modules: {
    words,
  }
})
import Vue from 'vue'
import m from 'moment'
import { SET_RANDOM, SET_WORD_INFO, ADD_HISTORY_INFO, UPDATE_TOTAL_WORDS, SET_SHORTEST_WORD, SET_LONGEST_WORD, NEW_DEFINITION_SEARCH, DEFINITION_RESULT_INC } from './mutations-types'
  
// IMPROVEMENT: I could have combined these two functions into one..

function setShortest(words) {
  let arrayOfWords = []
  Object.keys(words).map((key) => {
      arrayOfWords.push(words[key]) 
  }) 
  let min = arrayOfWords.reduce((a, b) => a.length <= b.length ? a : b)
  return min
}

function setLongest(words) {
  let arrayOfWords = []
  Object.keys(words).map((key) => {
      arrayOfWords.push(words[key]) 
  }) 
  let max = arrayOfWords.reduce((a, b) => a.length <= b.length ? b : a)
  return max
}

export default {
  [SET_RANDOM](state, payload) {
    state.randomWords = payload.data
  },
  [SET_WORD_INFO](state, payload) {
    if (!payload) return
    let id = payload.word
    let value = state.wordsInfo && state.wordsInfo[id] ? Object.assign(state.wordsInfo[id], payload) : payload
    Vue.set(state.wordsInfo, id, value)
  },
  [ADD_HISTORY_INFO](state, payload) {
    let historicEvent = {
      date: m().format('Do MMM YYYY HH:mm:ss'),
      message: payload
    }
    state.history.push(historicEvent)
  },
  [UPDATE_TOTAL_WORDS](state, payload) {
    state.stats.totalWords += Number(payload)
  },
  [SET_SHORTEST_WORD](state, payload) {
    let current = state.stats.shortestWord
    let newShort = setShortest(payload)
    if (current !== '' && current.length < newShort.length) return
    state.stats.shortestWord = newShort
  },
  [SET_LONGEST_WORD](state, payload) {
    let current = state.stats.longestWord
    let newLong = setLongest(payload)
    if (current !== '' && current.length > newLong.length) return
    state.stats.longestWord = newLong
  },
  [NEW_DEFINITION_SEARCH](state) {
    state.stats.totalWordsDefinitionsQueries += 1
  },
  [DEFINITION_RESULT_INC](state) {
    state.stats.wordsWithDefinitions += 1
  },

} 
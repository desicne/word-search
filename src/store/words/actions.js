import { SET_RANDOM, SET_WORD_INFO, ADD_HISTORY_INFO, UPDATE_TOTAL_WORDS, SET_SHORTEST_WORD, SET_LONGEST_WORD, NEW_DEFINITION_SEARCH, DEFINITION_RESULT_INC } from './mutations-types'
import axios from 'axios'

let wordsGenerator = axios.create({
    method: 'GET',
    url: 'word?number=10',
    baseURL: 'https://random-word-api.herokuapp.com/'
})

let wordDetails = axios.create({
    headers: {
        common: {
            'Authorization': 'Token edbf937dee4f59fe22c932f0cef73de5c903f220',
            'Content-Type' : 'json_pp'   
        }
    },
    method: 'GET',
    baseURL: 'https://owlbot.info/api/v4/dictionary/'
})

export default {
    fetchRandomWords ({ commit }) {
        return new Promise((resolve, reject) => {
            wordsGenerator().then(response => {
                commit(SET_RANDOM, response)
                commit(ADD_HISTORY_INFO, 'generated ' + response.data.length + ' random words')
                commit(UPDATE_TOTAL_WORDS, response.data.length)
                commit(SET_SHORTEST_WORD, response.data)
                commit(SET_LONGEST_WORD, response.data)
                resolve()
            },(error) => {
                commit(ADD_HISTORY_INFO, 'failed to get any random words')
                reject(error)
            })
        })
    },
    fetchWordInfo ({ commit }, payload) {
        commit(NEW_DEFINITION_SEARCH)
        return new Promise((resolve, reject) => {
            wordDetails(payload).then(response => {
                commit(SET_WORD_INFO, response.data)
                commit(DEFINITION_RESULT_INC)
                commit(ADD_HISTORY_INFO, 'got ' + response.data.definitions.length + ' result' + (response.data.definitions.length > 1 ? 's' : '') + ' for word: ' + payload )
                resolve()
            }, (error) => {
                commit(ADD_HISTORY_INFO, 'failed to get results for the word: ' + payload)
                reject(error)
            })
        }, (error) => reject(error))
    },
    addHistoryEntry({commit}, payload) {
        commit(ADD_HISTORY_INFO, payload)
    }
}
  
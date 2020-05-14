import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const initialState = {
  randomWords: null,
  wordsInfo: {},
  history: [],
  stats: {
    wordsWithDefinitions: 0,
    totalWordsDefinitionsQueries: 0,
    longestWord: '',
    shortestWord: '',
    totalWords: 0,
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations,
}

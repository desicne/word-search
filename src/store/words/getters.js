export default {
    randomWords: state => state.randomWords,
    wordDetails: state => state.wordsInfo,
    getHistory: state => state.history,
    getStats: state => state.stats,
    getDefinitionPercentage: state => (state.stats.totalWordsDefinitionsQueries > 0 && state.stats.wordsWithDefinitions > 0) 
                                        ? ((state.stats.wordsWithDefinitions/state.stats.totalWordsDefinitionsQueries)*100).toFixed(2) : '0'
}
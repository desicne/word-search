<template>
    <div class="random-words">
        <div class="refresh" @click="fetchRandomWords">
            <img src="/public/icons/shared/refresh.png" alt="refresh">
            <p>Refresh list</p>
        </div>
        <div v-for="(word, index) in words" :key="index" class="word">
            <p @click="toggleDetailVisibility(word)">{{ word }}</P>
            <!-- IMPROVEMENT: This whole section is a good candidate for a separate component -->
            <div :id="'word-' + word" class="not-displayed">
                <div v-if="wordDetails[word]">

                    <div v-if="wordDetails[word].definitions.length > 1" class="light-color">
                       show:
                        <!-- IMPROVEMENT: I could have took the options from the available options in the each set of results, return unque -->
                        <!-- IMPROVEMENT: This can also be moved to a component and done in various different ways -->
                        <input type="radio" id="all" value="all" v-model="filterApplied">
                        <label for="all">All</label>
                        <input type="radio" id="noun" value="noun" v-model="filterApplied">
                        <label for="noun">Nouns</label>
                        <input type="radio" id="verb" value="verb" v-model="filterApplied">
                        <label for="verb">Verbs</label>

                        <!-- TO DO: I didn't have anymore time to add filtering by definition.. Idk if you wanted the string match search
                        in which case I'd just filter out if substring present -->

                         sort by:
                        <!-- sort -->
                        <select v-model="sortBy">
                            <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                    
                    </div>

                    <div v-for="(uniqueDefinition, index) in filteredWords(word)" :key="index" class="light-color">
                        <img v-if="uniqueDefinition.image_url !== null" :src="uniqueDefinition.image_url" :alt="wordDetails[word].word" class="mini-img">
                        <p class="light-color">{{ uniqueDefinition.definition }}</p>
                    </div>
                </div>
                <div v-else-if="error" class="light-color">
                    {{ errorMessage }}
                </div>
                <div v-else>
                    <img src="/public/icons/shared/loading.gif" alt="..loading" class="loading-icon">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            error: false, // IMPROVEMENT: Normally I wouldn't handle errors in this primitive way, but assign it to each prop
            errorMessage: 'Sorry, Owlbot knows nothing about this word?! 🤷',
            filterApplied: 'all',
            sortBy: 'type',
            sortOptions: ['type', 'definition', 'example']
        }
    },
    computed: {
        ...mapGetters({
            words: 'randomWords',
            wordDetails: 'wordDetails'
        }),
    },
    mounted() {
        // IMPROVEMENT: there are various ways I could have saved the stated for sorting and filters, but session is the most elegant
        // without adding more weight to each call (Cookies), or leaving them there forever (localStorage)
        // I could have also made a separate state module for these helpers and store them there between states.. it wouldn't affect the refresh part though
        (window.sessionStorage.getItem('sortBy')) ? this.sortBy = window.sessionStorage.getItem('sortBy') : window.sessionStorage.setItem('sortBy', 'type');
        (window.sessionStorage.getItem('filterApplied')) ? this.filterApplied = window.sessionStorage.getItem('filterApplied') :  window.sessionStorage.setItem('filterApplied', 'all')
    },
    methods: {
         ...mapActions([
            'fetchRandomWords',
            'fetchWordInfo',
            'addHistoryEntry'
        ]),
        filteredWords(obj) {
            let filtered = {};
            let allDefinitions = this.wordDetails[obj].definitions

            allDefinitions.forEach(item => {
                if (this.filterApplied == 'all') {
                    filtered = allDefinitions
                } else {
                    filtered = allDefinitions.filter((item) => {
                        return item.type == this.filterApplied
                    })
                }
            })
            // IMPROVEMENT: This will cause Warning in Vue console, due to manipulating the returned state object.. it is the quickest
            // dirtiest way to sort at the same time without lodash at hand.. Vue general recommendation would be to put all this in specific
            // getter function and set it all as computed property

            // IMPROVEMENT: I also shouldn't be writing sort function here on top but implement it as a mixin..
            return filtered.sort((a, b) => { return (a[this.sortBy] === null) - (b[this.sortBy] === null) || ('' + a[this.sortBy]).localeCompare(b[this.sortBy])})
        },
        toggleDetailVisibility(word) {
            this.error = false
            let wordDetail = document.getElementById('word-' + word)
            if (wordDetail.style.display !== 'block') {
                wordDetail.style.display = 'block'
                this.fetchWordInfo(word).catch(err => {
                    this.error = true
                    // IMPROVEMENT: There are more elegant ways to handle error cleaning... 
                    setTimeout(() => {
                        wordDetail.style.display = 'none'
                        this.error = false
                    }, 1000)
                })
            } else {
                wordDetail.style.display = 'none'
            }
        }
    },
    watch: {
        sortBy: function(value) {
            window.sessionStorage.setItem('sortBy', value)
        },
        filterApplied: function(value) {
            window.sessionStorage.setItem('filterApplied', value)
        }

    }
}
</script>
<style lang="stylus" scoped>
.random-words
    width 50%
    min-width 600px
    margin auto
    margin-top 24px
    text-align center

.word
    position relative
    margin-bottom 8px
    border 1px solid #1b262c
    border-radius 1px
    padding 16px
    font-size 20px
    cursor pointer
    transition all 0.5s ease

    p
        padding 0

    &:hover
        background #1b262c

        p
            color #f2f2f2

.refresh
    position absolute
    top 8px
    right 8px
    border 1px solid #3282b8
    padding-left 8px
    padding-right 8px
    cursor pointer
    transition all 0.5s ease

    p
        display inline-block
        padding 0
        color #3282b8

    img
        display inline-block
        width 10px
        margin-right 8px

    &:hover
        background #3282b8

        p
            color #f2f2f2

        img
            filter brightness(5)    

.not-displayed
    display none
    background #1b262c

.loading-icon
    width 28px

.light-color
    padding 16px
    border-bottom 1px solid
    font-size 12px
    color #f2f2f5

    &:last-child
        border-bottom 0px

.mini-img
    display inline-block
    width 64px

</style>
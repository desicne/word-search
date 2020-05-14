<template>
  <div class="word-explore-page">
    <h4>Ok. Let's get this party started</h4>
    <random-words></random-words>
  </div>
</template>

<script>
import randomWords from '../components/word-explore/random-words.vue'

export default {
  name: "word-explore-page",
  components: { randomWords },
  title() {
    return "Search ME."
  },
}
</script>

<style lang="stylus">
.word-explore-page
  padding-bottom 0
  overflow-x hidden

</style>

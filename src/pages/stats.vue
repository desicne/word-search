<template>
  <div class="stats-page">
    <h4>Number here, number there..</h4>
    <div>
      <div class="card">
        <h5>Total Words loaded</h5>
        <p class="number">{{ stats.totalWords }}</p>
      </div>
      <div class="card">
        <h5>Words with Definitions</h5>
        <p class="number">{{ successPercentage }}%</p>
      </div>
      <br>
      <div class="card">
        <h5>Shortest word</h5>
        <p class="word">{{ stats.shortestWord }}</p>  
      </div>
      <div class="card">
        <h5>Longest word</h5>
        <p class="word">{{ stats.longestWord }}</p></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "stats-page",
  title() {
    return "Boring Analytics"
  },
  computed: {
    ...mapGetters({
        stats: 'getStats',
        successPercentage: 'getDefinitionPercentage'
    }),
  },
}
</script>

<style lang="stylus">
.stats-page
  padding-bottom 0
  overflow-x hidden

.card
  display inline-block
  min-width 200px
  min-height 100px
  margin 32px
  margin-right 0
  padding 24px
  border 1px solid
  background #fff
  vertical-align top
  transition all 0.5s ease

  &:hover
    box-shadow 2px 2px 8px 2px

  h5
    margin-top 0px
    padding-left 8px

.number
  font-size 60px
  font-weight 700
  text-align center

.word
  font-size 24px
  font-weight 700

</style>

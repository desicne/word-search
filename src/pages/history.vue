<template>
  <div class="history-page">
    <h4><span>Fake</span> Old news</h4>
    <div v-for="(log, index) in historicEvents" :key="index" class="history-event">
      At <b>{{ log.date }}</b> {{ log.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "history-page",
  computed: {
    ...mapGetters({
      historicEvents: 'getHistory',
    }),
  },
  title() {
    return "BC News"
  },
}
</script>

<style lang="stylus">
.history-page
  padding-bottom 0
  overflow-x hidden

  h4 
    span
      text-decoration line-through

.history-event
    padding 8px
    border-bottom 1px solid

</style>

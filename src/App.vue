<template>
  <div id="app">
    <!-- Side navigation between pages -->
    <side-nav class="side-nav"></side-nav>

    <!-- Main View - load all the components there -->
    <router-view class="view"></router-view>

  </div>
</template>
<script>
import sideNav from './components/shared/side-nav.vue'
import { mapActions } from 'vuex';

export default {
  components:{ sideNav },
  created() {
    this.fetchRandomWords()
  },
  methods: {
        ...mapActions([
          'fetchRandomWords',
      ]),
  }
}
</script>
<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700')

/*
color-adjust 
#0F4C75
#3282b8
#bbe1fa
*/

html
  background-color #fefefe

body
  position relative
  margin 0px
  padding 0px
  height 100%
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 16px
  overflow scroll
  cursor default
  
h1
  margin 0px
  padding 24px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 38px
  font-weight 700

h2
  margin 0px
  padding 20px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 32px
  font-weight 700

h3
  margin 0px
  padding 16px 20px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 24px
  font-weight 700

h4
  margin 0px
  padding 8px
  padding-top 12px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 20px

img
  user-select none

p 
  margin 0px
  padding 8px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 16px
  line-height 1.7

a
  margin 0px
  padding 0px
  color #3282b8
  font-family 'Anonymous Pro', monospace
  font-size 16px
  cursor pointer
  text-decoration none

li
  text-decoration none

div
  margin 0px
  padding 0px
  color #1b262c
  font-family 'Anonymous Pro', monospace
  font-size 16px

span
  line-height 1.7

::selection
  background #3282b8
  color #f2f2f2

::-moz-selection
  background #3282b8
  color #f2f2f2

.view
  display inline-block
  width calc(100% - 248px)
  min-height 100vh
  position relative
  top 0
  margin 0px auto
  overflow auto
  background #f2f2f2

.side-nav
  display inline-block
  width 248px
  margin-top 80px
  min-height 100%
  vertical-align top
  text-align center
  box-sizing border-box

</style>

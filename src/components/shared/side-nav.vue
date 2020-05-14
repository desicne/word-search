<template>
    <div>
        <router-link :to="{ name: 'stats' }">
            <img src="/public/logo/dn.png" alt="dn-logo" class="dn-logo">
        </router-link>
        <nav>
            <router-link :to="{ name: 'stats' }" :class="{'page-active': this.$route.name === 'stats' }">
                <img src="/public/icons/menu-items/business.png" alt="stats" class="nav-icon">
                <p class="nav-title">Stats</p>
            </router-link>
            <router-link :to="{ name: 'word-explore' }" :class="{'page-active': this.$route.name === 'word-explore' }">
                <img src="/public/icons/menu-items/ancient-scroll.png" alt="focus" class="nav-icon">
                <p class="nav-title">Words</p>
            </router-link>
            <router-link :to="{ name: 'history' }" :class="{'page-active': this.$route.name === 'history' }">
            <img src="/public/icons/menu-items/skull.png" alt="focus" class="nav-icon">
            <p class="nav-title">History</p>
            </router-link>
        </nav>
    </div>
   
</template>
<style lang="stylus" scoped>
nav
    a
        display block
        position relative
        margin-bottom 32px
        width 100%

.dn-logo
    margin-bottom 64px
    width 64px

.nav-icon
    display inline-block
    position absolute
    left 28px
    width 28px
    transition all 0.5s ease

.nav-title
    display inline-block
    position relative
    padding 0
    font-size 18px
    color #3282b8
    text-decoration transparent
    user-select none
    transition all 0.5s ease

.page-active
    img
        filter brightness(0)

    p
        color #1b262c
        font-weight 700
        text-decoration underline
</style>
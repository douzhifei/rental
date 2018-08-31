<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/index'
#app
  max-width 1024px
  margin auto 0
  .app-container
    position fixed
    width 100%
    z-index 999
</style>

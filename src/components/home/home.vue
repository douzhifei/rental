<template>
  <div class="home">
    <ul class="menu">
      <li class="item">
        <router-link to="/function?type=1">新建</router-link>
      </li>
      <li class="item">
        <router-link to="/function?type=2">志伟</router-link>
      </li>
      <li class="item">
        <router-link to="/function?type=3">志飞</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.home
  position fixed
  width 100%
  top 0
  bottom 0
  left 0
  background-color $color-background
  z-index 999
  font-size $font-size-large
  .menu
    position relative
    width 100%
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    font-size 24px
    .item
      padding 15px
</style>

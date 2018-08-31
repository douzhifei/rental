<template>
  <div class="function">
    <ul class="menu">
      <li class="item">
        <div @click="goto('/room')">设置</div>
      </li>
      <li class="item">
        <div @click="goto('/form')">抄表</div>
      </li>
      <li class="item">
        <div @click="goto('/bill')">抄单</div>
      </li>
      <li class="item">
        <div @click="goto('/record')">抄簿</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goto (path) {
      this.$router.push({
        path: path,
        query: { type: this.$route.query.type }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.function
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
    .item
      padding 15px
</style>

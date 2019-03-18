<template>
  <div class="room">
    <div>
      <div class="head">
        <div class="head-left" @click="quit">关闭</div>
        <div class="head-center">设置</div>
        <div class="head-right" @click.passive="submit">提交</div>
      </div>
      <div class="a-item a-type">房号：
        <el-input class="a-input" type="number" v-model.number="data.NO" placeholder="101"></el-input>
      </div>
      <div class="a-item a-type">租金：
        <el-input class="a-input" type="number" v-model.number="data.rent" placeholder="租金"></el-input>
      </div>
      <div class="a-item a-type">押金：
        <el-input class="a-input" type="number" v-model.number="data.deposit" placeholder="押金"></el-input>
      </div>
      <div class="a-item a-type">缴租日期：
        <el-input class="a-input" type="number" v-model.number="data.day" placeholder="收租日期"></el-input>
      </div>
      <div class="a-item a-type">合同时间：
        <el-input class="a-input" type="date" v-model="data.date" placeholder="合同时间"></el-input>
      </div>
      <div class="a-item a-type">租期：
        <el-input class="a-input" type="number" v-model="data.time" placeholder="租期"></el-input>
      </div>
      <div class="a-item a-type">乙方：
        <el-input class="a-input" type="text" v-model.trim="data.partyB" placeholder="乙方"></el-input>
      </div>
      <div class="a-item a-type">电话：
        <el-input class="a-input" type="number" v-model.number="data.phone" placeholder="电话"></el-input>
      </div>
      <div class="a-item a-type">身份证：
        <el-input class="a-input" type="number" v-model="data.IDCard" placeholder="身份证"></el-input>
      </div>
      <div class="a-item a-type">备注：
        <el-input class="a-input" type="text" v-model.trim="data.desc" placeholder="备注"></el-input>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  props: {
    udata: {
      type: Object,
      default: () => { return {} }
    }
  },
  created () {
    this.data = this.udata
  },
  methods: {
    quit () {
      this.$emit('quit')
    },
    submit () {
      this.data.NO = parseInt(this.data.NO)
      this.data.rent = parseInt(this.data.rent)
      this.data.day = parseInt(this.data.day)
      if (!Number.isInteger(this.data.day)) {
        this.data.day = 1
      }
      if (!(Number.isInteger(this.data.NO) && Number.isInteger(this.data.rent))) {
        this.$message('不能有空值！')
        return
      }
      this.update = new Date()

      this.$emit('submit', this.data)
    }
  }
}
</script>
<style lang="stylus" scoped>
.room
  width 100%
  height 100%
  z-index 999
  .head
    display flex
    width 100%
    height 45px
    align-items center
    justify-content center
    font-size 16px
    top 0
    border-bottom 2px solid #E7E6EB
    margin-bottom 20px
    .head-center
      width 285px
      height 45px
      position absolute
      left 45px
      line-height 45px
      text-align center
    .head-left
      position absolute
      width 45px
      height 45px
      display flex
      align-items center
      justify-content center
      left 0
    .head-right
      position absolute
      width 45px
      height 45px
      right 0
      display flex
      align-items center
      justify-content center
  .a-item
    position relative
    width 94%
    padding-left 3%
    padding-bottom 10px
    height 40px
    line-height 40px
    .a-input
      position absolute
      left 20%
      width 70%
      top 0
    .a-input-submit
      position absolute
      right 0
</style>

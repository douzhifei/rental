<template>
  <div class="record">
    <div class="selectM">
      <input type="number" v-model="year" class="year" @blur.prevent="changeDate()">年
      <input type="number" v-model="month" class="month" @blur.prevent="changeDate()">月
    </div>
    <ul class="list">
      <li v-for="(item,index) in data" :key="index" class="item">
        <div class="item-title">{{item.NO}}</div>
        <div class="item-we">
          <div class="item-input">日</div>
          <div class="item-input">租金</div>
          <div class="item-input">总水</div>
          <div class="item-input">月水</div>
          <div class="item-input">水款</div>
          <div class="item-input">总电</div>
          <div class="item-input">月电</div>
          <div class="item-input">电款</div>
          <div class="item-input">合计</div>
        </div>
        <div class="item-we">
          <div class="item-input">{{item.day}}</div>
          <div class="item-input">{{item.rent}}</div>
          <div class="item-input">{{item.water}}</div>
          <div class="item-input">{{item.differW}}</div>
          <div class="item-input">{{item.rateW}}</div>
          <div class="item-input">{{item.electric}}</div>
          <div class="item-input">{{item.differE}}</div>
          <div class="item-input">{{item.rateE}}</div>
          <div class="item-input">{{item.total}}</div>
        </div>
      </li>
    </ul>
    <div class="blank"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      thisMonth: [],
      lastMonth: [],
      type: 1,
      year: 2018,
      month: 1,
      day: 1,
      rooms: 0,
      total: 0
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      let today = new Date()
      this.year = today.getFullYear()
      this.month = today.getMonth() + 1
      this.type = this.$route.query.type
      let data = {
        type: this.type,
        year: this.year,
        month: this.month
      }
      this.getData(data)
    },
    getData (data) {
      this.getBillList(data).then(res => {
        if (res.length === 0) {
          return
        }
        this.thisMonth = res
        let last = {}
        last.NO = data.NO
        last.type = this.type
        if (data.month !== 1) {
          last.month = data.month - 1
          last.year = data.year
        } else {
          last.month = 12
          last.year = data.year - 1
        }
        this.getBillList(last).then(res => {
          if (res.length === 0) {
            this.thisMonth.forEach(value => {
              value.lastWater = 0
              value.lastElectric = 0
              value.differW = 0
              value.differE = 0
              value.rateW = 0
              value.rateE = 0
              value.total = 0
              this.data.push(value)
            })
            return
          }
          this.lastMonth = res
          this.thisMonth.forEach(value => {
            let lastM = this.searchBill(value, this.lastMonth)
            value.lastWater = lastM.water
            value.lastElectric = lastM.electric
            value.differW = value.water - lastM.water > 3 ? value.water - lastM.water : 3
            value.differE = value.electric - lastM.electric < 0 ? value.electric - lastM.electric + 10000 : value.electric - lastM.electric
            value.rateW = value.differW * value.priceW
            value.rateE = Math.round(value.differE * value.priceE)
            value.total = value.rent + value.rateW + value.rateE
            this.data.push(value)
            this.total += value.total
          })
          this.rooms = this.data.length
        })
      })
    },
    getBillList (data) {
      return axios.get('/bill/list', { params: data }).then(res => {
        return Promise.resolve(res.data)
      })
    },
    searchBill (item, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].NO === item.NO) {
          return array[i]
        }
      }
    },
    changeDate () {
      let data = {
        type: this.$route.query.type,
        year: this.year,
        month: this.month
      }
      this.data = []
      this.getData(data)
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.type === this.type) {
        return
      }
      this.changeDate()
    }
  }
}
</script>

<style lang="stylus">
.record
  width 100%
  .list
    width 100%
    .item
      width 100%
      font-size 24px
      border 1px solid red
      margin-top 20px
      background #ff11ff
      .item-title
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid red
      .item-we
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid red
        .item-input
          font-size 16px
          display flex
          flex 1
          align-items center
          justify-content center
          border-bottom 1px solid red
  .selectM
    font-size 24px
    height 80px
    display flex
    align-items center
    justify-content center
    .year
      width 60px
    .month
      width 40px
  .total
    display flex
    align-items center
    justify-content center
    width 100%
    height 80px
    background yellow
    font-size 30px
  .blank
    width 100%
    height 100px
</style>

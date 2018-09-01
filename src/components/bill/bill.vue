<template>
  <div class="bill">
    <div class="selectM">
      <input type="number" v-model="year" class="year" @blur.prevent="changeDate()">年
      <input type="number" v-model="month" class="month" @blur.prevent="changeDate()">月
    </div>
    <ul class="list">
      <li v-for="(item,index) in data" :key="index" class="item" v-show="item.billing">
        <div class="item-we">
          <div class="item-input">{{item.NO}}</div>
          <div class="item-input">{{item.year}}年{{item.month}}月{{day}}日</div>
        </div>
        <div class="item-we">
          <div class="item-input">项目</div>
          <div class="item-input">上月</div>
          <div class="item-input">本月</div>
          <div class="item-input">实用</div>
          <div class="item-input">单价</div>
          <div class="item-input">金额</div>
        </div>
        <div class="item-we">
          <div class="item-input">水费</div>
          <div class="item-input">{{item.lastWater}}</div>
          <div class="item-input">{{item.water}}</div>
          <div class="item-input">{{item.differW}}</div>
          <div class="item-input">{{item.priceW}}</div>
          <div class="item-input">{{item.rateW}}</div>
        </div>
        <div class="item-we">
          <div class="item-input">电费</div>
          <div class="item-input">{{item.lastElectric}}</div>
          <div class="item-input">{{item.electric}}</div>
          <div class="item-input">{{item.differE}}</div>
          <div class="item-input">{{item.priceE}}</div>
          <div class="item-input">{{item.rateE}}</div>
        </div>
        <div class="item-we">
          <div class="item-input item-start">房租</div>
          <div class="item-input item-right">{{item.rent}}</div>
        </div>
        <div class="item-we item-total">¥{{item.total}}</div>
      </li>
    </ul>
    <div class="total" v-show="data.length">共{{rooms}}套，{{total}}元</div>
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
          this.total = 0
          this.rooms = 0
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
              this.total += value.rent
              this.rooms++
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
            if (value.billing) {
              this.total += value.total
              this.rooms++
            }
          })
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
.bill
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
          font-size 24px
          display flex
          flex 1
          align-items center
          justify-content center
          border-bottom 1px solid red
        .item-right
          justify-content flex-end
          padding-right 20px
        .item-start
          justify-content flex-start
          padding-left 8px
      .item-total
        justify-content flex-end
        padding-right 20px
  .selectM
    font-size 24px
    height 80px
    display flex
    align-items center
    justify-content center
    .year
      width 60px
    .month
      width 20px
  .total
    display flex
    align-items center
    justify-content center
    width 100%
    height 80px
    background yellow
    font-size 30px
</style>

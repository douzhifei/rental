<template>
  <div class="account">
    <div class="account-container" v-loading="list.length===0">
      <div class="head">
         <div class="head-left">
          <i class="back" @click="goBack()">返回</i>
        </div>
        <div class="head-center">
          <div class="page" @click="lastRoom()">上一页</div>
          <select name="room" v-model="room">
            <option v-for="(item,index) in rooms" :key="index" :value="item">{{item.NO}}</option>
          </select>
          <div class="page" @click="nextRoom()">下一页</div>
        </div>
        <div class="head-right" @click="toggleFavorite(data)">
          <i>合同</i>
        </div>
      </div>
      <ul class="content">
        <li class="item">
          <div class="item-input">年</div>
          <div class="item-input">月</div>
          <div class="item-input">日</div>
          <div class="item-input">租金</div>
          <div class="item-input">总水</div>
          <div class="item-input">月水</div>
          <div class="item-input">水款</div>
          <div class="item-input">总电</div>
          <div class="item-input">月电</div>
          <div class="item-input">电款</div>
          <div class="item-input">合计</div>
        </li>
        <li class="item" v-for="(item,index) in list" :key="index" :class="{nobill: !item.billing}"> 
          <div class="item-input">{{item.year}}</div>
          <div class="item-input">{{item.month}}</div>
          <div class="item-input">{{item.day}}</div>
          <div class="item-input">{{item.rent}}</div>
          <div class="item-input">{{item.water}}</div>
          <div class="item-input">{{item.differW}}</div>
          <div class="item-input">{{item.rateW}}</div>
          <div class="item-input">{{item.electric}}</div>
          <div class="item-input">{{item.differE}}</div>
          <div class="item-input">{{item.rateE}}</div>
          <div class="item-input">{{item.total}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'account',
  data () {
    return {
      rooms: [],
      room: {},
      list: []
    }
  },
  created () {
    this.getRoomList()
  },
  methods: {
    getRoomList () {
      this.rooms = []
      let data = { type: this.$route.query.type }
      axios.get('/room', { params: data }).then(res => {
        this.rooms = res.data
        this.room = res.data[0]
        this.getRoomData()
      })
    },
    getRoomData () {
      this.list = []
      let data = { type: this.$route.query.type, NO: this.room.NO }
      axios.get('/bill/account', { params: data }).then(res => {
        let list = res.data
        for( let i =0 ; i< list.length ;i++ ) {
          list[i].year = list[i].year - 2000
          if(i === 0) {
            list[i].lastWater = 0
            list[i].lastElectric = 0
            list[i].differW = 0
            list[i].differE = 0
            list[i].rateW = 0
            list[i].rateE = 0
            list[i].total = 0
          }else{
            list[i].differW = list[i].water - list[i-1].water > 3 ? list[i].water - list[i-1].water : 3
            list[i].differE = list[i].electric - list[i-1].electric < 0 ? list[i].electric - list[i-1].electric + 10000 : list[i].electric - list[i-1].electric
            list[i].rateW = list[i].differW * list[i-1].priceW
            list[i].rateE = Math.round(list[i].differE * list[i].priceE)
            list[i].total = list[i].rent + list[i].rateW + list[i].rateE
          }
        }
        this.list = list
      })
    },
    lastRoom() {
      let index = this.rooms.findIndex(item => this.room.NO === item.NO )
      if( index > 0) {
        index = index - 1 
        this.room = this.rooms[index]
      }
    },
    nextRoom() {
      let index = this.rooms.findIndex(item => this.room.NO === item.NO )
      if( index < this.rooms.length - 1) {
        index = index + 1 
        this.room = this.rooms[index]
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
  watch: {
    room: function() {
      this.getRoomData()
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.head
  display flex
  width 100%
  height 45px
  align-items center
  justify-content center
  font-size $font-size-large
  top 0
  .head-center
    width 76%
    height 45px
    position absolute
    display flex
    align-items center
    justify-content center
    no-wrap()
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
.account
  position absolute
  width 100%
  top 0
  bottom 0
  overflow hidden
  background-color yellow
  .account-container
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    .content
      width 100%
      .item
        width 100%
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
.nobill
  text-decoration line-through
</style>

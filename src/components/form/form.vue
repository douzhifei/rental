<template>
  <div class="form">
    <div class="selectM">
      <input type="number" v-model="year" class="year" @blur.prevent="changeDate()">年
      <input type="number" v-model="month" class="month" @blur.prevent="changeDate()">月
    </div>
    <ul class="list">
      <li v-for="(item,index) in data" :key="index" class="item">
        <el-switch v-model="item.billing">
        </el-switch>
        <div class="item-title">{{item.NO}}</div>
        <el-input class="item-input" type="number" v-model.number="item.water" @blur.prevent="modify(item)"></el-input>
        <el-input class="item-input" type="number" v-model.number="item.electric" @blur.prevent="modify(item)"></el-input>
      </li>
    </ul>
    <div v-if="create"><el-button type="primary" @click="openCreate" >创建抄单表</el-button></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      type: 1,
      year: 2018,
      month: 1,
      day: 1,
      create: false,
      hide: true

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
      this.data = []
      axios.get('/bill/list', { params: data }).then(res => {
        if (res.data.length === 0) {
          this.create = true
          this.data = []
          return
        }
        this.data = res.data
        this.create = false
      })
    },
    createForm () {
      let data = { type: this.type }
      axios.get('/room/2', { params: data }).then(res => {
        let data = []
        res.data.forEach(value => {
          value.month = this.month
          value.year = this.year
          data.push(value)
        })
        this.createBill(data).then(data => {
          this.create = false
          this.data = data
        })
      })
    },
    createBill (data) {
      return axios.post('/bill', data).then(res => {
        return Promise.resolve(res.data)
      })
    },
    modify (item) {
      axios.put('/bill', item).then(res => {
        // console.log(res.data)
      })
    },
    changeDate () {
      let data = {
        type: this.$route.query.type,
        year: this.year,
        month: this.month
      }
      this.getData(data)
    },
    openCreate() {
        this.$confirm('按此键将生存月份水电表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.createForm () 
          this.$message({
            type: 'success',
            message: '创建成功！'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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

<style lang="stylus" scoped>
.form
  width 100%
  overflow-x hidden
  .list
    width 100%
    .item
      width 100%
      display flex
      align-items center
      justify-content center
      font-size 24px
      .item-title
        width 160px
        display flex
        align-items center
        justify-content center
      .item-input
        font-size 24px
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
</style>

<template>
  <div class="room" ref="room">
    <div>
      <div class="room-head">设置</div>
      <div style="margin: 10px 0">
        <el-row>
          <el-col :span="8" style="margin:0 10px">
            <el-input placeholder="搜索" v-model="filters[0].value"></el-input>
          </el-col>

          <el-col :span="5" style="margin: 0 15px">
            <el-button @click="openAdd">添加</el-button>
          </el-col>

        </el-row>
      </div>
      <data-tables class="data-table" :data="data" :current-page="3" :page-size="5" :pagination-props="{ background: false, small: true, layout: 'prev, pager, next', pageSizes: [6, 1, 3] }" :action-col="actionCol" :filters="filters" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
        </el-table-column>
      </data-tables>
      <room-add v-if="isOpenAdd" :udata="udata" @quit="quit" @submit="submit"></room-add>
    </div>
  </div>
</template>

<script>
import roomAdd from 'base/room-add/room-add'
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      udata: {},
      isAdd: true,
      titles: [{
        prop: 'NO',
        label: '房号'
      }, {
        prop: 'rent',
        label: '租金'
      }, {
        prop: 'day',
        label: '日期'
      }],
      isOpenAdd: false,
      filters: [{ // 查询
        prop: 'NO',
        value: ''
      }],
      actionCol: {
        props: {
          label: '操作'
        },
        buttons: [{
          handler: row => {
            this.update(row)
          },
          label: '编辑'
        }, {
          handler: row => {
            this.delete(row)
          },
          label: '删除'
        }]
      },
      selectedRow: []
    }
  },
  created () {
    this.getRoomList()
  },
  methods: {
    getRoomList () {
      this.data = []
      let data = { type: this.$route.query.type }
      axios.get('/room', { params: data }).then(res => {
        this.data = res.data
      })
    },
    openAdd () {
      this.isOpenAdd = true
      this.udata = {}
      this.isAdd = true
    },
    submit (val) {
      if (this.isAdd) {
        val.type = this.$route.query.type
        axios.post('/room', val).then(res => {
          this.isOpenAdd = false
          this.$message('添加成功！')
          this.data.unshift(val)
        })
      } else {
        val.type = this.$route.query.type
        axios.put('/room', val).then(res => {
          if (!res.data.ok) {
            this.$message('修改失败！')
            return
          }
          this.isOpenAdd = false
          this.$message('修改成功！')
        })
      }
    },
    quit () {
      this.isOpenAdd = false
    },
    delete (row) {
      let data = { id: row._id }
      axios.delete('/room', { params: data }).then(res => {
        if (!res.data.ok) {
          return
        }
        this.data.splice(this.data.indexOf(row), 1)
        this.$message('删除成功！')
      })
    },
    update (row) {
      this.isOpenAdd = true
      this.isAdd = false
      this.udata = row
    },
    width (key) {
      if (key !== 'title') {
        return 60
      }
    },
    handleSelectionChange (val) {
      this.selectedRow = val
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.type === this.type) {
        return
      }
      this.getRoomList()
    }
  },
  components: { roomAdd }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.room
  position absolute
  width 100%
  top 0
  bottom 0
  left 0
  background-color $color-background
  font-size $font-size-large
  color #606266
  overflow scroll
  .data-table
    width 100%
    font-size $font-size-small
  .room-head
    width 100%
    height 50px
    display flex
    align-items center
    justify-content center
    font-size $font-size-medium-x
    border-bottom 2px solid #E7E6EB
</style>

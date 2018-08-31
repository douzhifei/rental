const Room = require('../lib/mongo.js').Room

module.exports = {
  // 创建
  create: function create (data) {
    return Room.create(data)
  },

  // 通过 id 删除
  del: function del (id) {
    return Room.deleteOne({ _id: id })
  },

  // 修改
  update: function update (data) {
    return Room.update({ _id: data._id }, { $set: data })
  },

  // 获取列表
  getList: function getList (type) {
    return Room.find({type: type}).sort({NO: 1})
  },

  // 获取列表,不带_id
  getList2: function getList (type) {
    return Room.find({type: type},{_id:0,day:1,type:1,name:1,NO:1,rent:1}).sort({NO: 1})
  }
}
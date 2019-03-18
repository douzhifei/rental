const Bill = require('../lib/mongo.js').Bill

module.exports = {
  // 创建
  create: function create (data) {
    return Bill.create(data)
  },

  // 插入多条数据
  insertMany: function insertMany (data) {
    return Bill.insertMany(data)
  },

  // 通过 id 删除
  del: function del (id) {
    return Bill.deleteOne({ _id: id })
  },

  // 修改
  update: function update (data) {
    return Bill.update({ _id: data._id }, { $set: data })
  },

  // // 修改多条数据
  // updateMany: function updateMany (data) {
  //   return Bill.updateMany({type: data.type, month: data.month, year: data.year}, {$set: data.data})
  // },

  // 获取列表
  getList: function getList (data) {
    return Bill.find({
      type: data.type,
      month: data.month,
      year: data.year
    }).sort({ NO: 1 })
  },

  // 获取房子每月列表
  getAccountList: function getAccountList (data) {
    return Bill.find({ type: data.type, NO: data.NO }).sort({ year: 1, month: 1 })
  },

  // 获取列表
  getOne: function getOne (data) {
    return Bill.find({
      type: data.type,
      month: data.month,
      year: data.year,
      NO: data.NO
    }).sort({ NO: 1 })
  }
}

const mongodb = require('../config/default').mongodb

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(mongodb)

exports.Room = mongoose.model(
  'Room',
  new Schema({
    name: String, // 房屋名称
    type: Number, // 房屋编号1,2,3
    NO: Number, // 房号
    rent: Number, // 租金
    deposit: Number, // 押金
    time: Number, // 租期，几个月
    day: Number, // 每月收租日
    date: Date, // 合同时间
    update: Date, // 更改时间
    partyA: String, // 甲方
    partyB: String, // 乙方
    phone: String, // 乙方电话
    IDCard: Number, // 身份证
    desc: String // 备注
  })
)

exports.Bill = mongoose.model(
  'Bill',
  new Schema({
    name: String,
    type: Number,
    NO: Number,
    rent: Number,
    day: { type: Number, default: 1 },
    year: Number,
    month: Number,
    water: Number,
    electric: Number,
    priceW: { type: Number, default: 7 },
    priceE: { type: Number, default: 1.3 },
    billing: { type: Boolean, default: true }, // 是否开单
    remark: String, // 备注
    total: { type: Number, default: 0 },
    create: Date // 创建时间
  })
)
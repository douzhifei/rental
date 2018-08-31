const mongodb = require('../config/default').mongodb

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(mongodb)

exports.Room = mongoose.model(
  'Room',
  new Schema({
    name: String,
    type: Number,
    NO: Number,
    rent: Number,
    day: Number
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
    total: { type: Number, default: 0 }
  })
)
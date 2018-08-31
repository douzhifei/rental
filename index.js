var express = require('express')
var config = require('./config/index')
var bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const Room = require('./models/room')
const Bill = require('./models/bill')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
// Room
app.post('/room', function(req, res) {
  Room.create(req.body).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.get('/room', function(req, res) {
  Room.getList(req.query.type).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.get('/room/2', function(req, res) {
  Room.getList2(req.query.type).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.put('/room', function(req, res) {
  Room.update(req.body).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.delete('/room', function(req, res) {
  Room.del(req.query.id).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
// Bill
app.post('/bill', function(req, res) {
  Bill.insertMany(req.body).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.get('/bill/list', function(req, res) {
  Bill.getList(req.query).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.get('/bill', function(req, res) {
  Bill.getOne(req.query).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.put('/bill', function(req, res) {
  Bill.update(req.body).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.delete('/bill', function(req, res) {
  Bill.del(req.query.id).then(data => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(JSON.stringify(data))
  })
})
app.use(router)
var port = process.env.PORT || config.build.port

app.use(express.static('./dist'))
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
})

'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const apiRoutes = express.Router()
const Room = require('../models/room')
const Bill = require('../models/bill')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    before(app){
      app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
      app.use(bodyParser.json({limit: '50mb'}))
      // Room
      app.post("/room",function(req, res){
        Room.create(req.body).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.get("/room",function(req, res){
        Room.getList(req.query.type).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.get("/room/2",function(req, res){
        Room.getList2(req.query.type).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.put("/room",function(req, res){
        Room.update(req.body).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.delete("/room",function(req, res){
        Room.del(req.query.id).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       // Bill
       app.post("/bill",function(req, res){
        Bill.insertMany(req.body).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.get("/bill/list",function(req, res){
        Bill.getList(req.query).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.get("/bill/account",function(req, res){
        Bill.getAccountList(req.query).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.get("/bill",function(req, res){
        Bill.getOne(req.query).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.put("/bill",function(req, res){
        Bill.update(req.body).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
       app.delete("/bill",function(req, res){
        Bill.del(req.query.id).then((data) => {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
          res.end(JSON.stringify(data))
        })
       })
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

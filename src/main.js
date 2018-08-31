// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'lib-flexible/flexible.js'
import 'common/stylus/index.styl'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { DataTables } from 'vue-data-tables'
fastclick.attach(document.body)
Vue.use(ElementUI)
Vue.use(DataTables)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

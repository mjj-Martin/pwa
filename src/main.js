// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store/index.js'
import moment from 'moment'
moment.locale('zh-cn')
Vue.filter('timeformmat', function (value) {
  if(!value) return ''
  let time = moment(value)
  return time.calendar()
})
Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

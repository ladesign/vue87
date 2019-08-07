// 入口文件
// console.log('OK')

import Vue from 'vue'

// 匯入 MUI 的樣式
import './lib/mui/css/mui.min.css'

// 按需匯入 Mint-UI 中的元件   
import {
  Header
} from 'mint-ui'
Vue.component(Header.name, Header)

// 匯入 App 根元件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app)
})
// 入口檔案
import Vue from 'vue'
// 1.1 匯入路由的包
import VueRouter from 'vue-router'
// 1.2 安裝路由
Vue.use(VueRouter)

// 註冊 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次剛進入 網站，肯定會 呼叫 main.js 在剛呼叫的時候，先從本地儲存中，把 購物車的數據讀出來，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car // 將 購物車中的商品的數據，用一個陣列儲存起來，在 car 陣列中，儲存一些商品的對象， 咱們可以暫時將這個商品對象，設計成這個樣子   
    // { id:商品的id, count: 要購買的數量, price: 商品的單價，selected: false  }
  },
  mutations: { // this.$store.commit('方法的名稱', '按需傳遞唯一的參數')
    addToCar(state, goodsinfo) {
      // 點選加入購物車，把商品資訊，儲存到 store 中的 car 上
      // 分析：
      // 1. 如果購物車中，之前就已經有這個對應的商品了，那麼，只需要更新數量
      // 2. 如果沒有，則直接把 商品數據，push 到 car 中即可

      // 假設 在購物車中，沒有找到對應的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最終，循環完畢，得到的 flag 還是 false，則把商品數據直接 push 到 購物車中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 當 更新 car 之後，把 car 陣列，儲存到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改購物車中商品的數量值
      // 分析： 
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 當修改完商品的數量，把最新的購物車數據，儲存到 本地儲存中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根據Id，從store 中的購物車中刪除對應的那條商品數據
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 將刪除完畢后的，最新的購物車數據，同步到 本地儲存中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有購物車商品的狀態儲存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    // 相當於 計算屬性，也相當於 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾選的數量
        amount: 0 // 勾選的總價
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// 匯入格式化時間的外掛
import moment from 'moment'
// 定義全域性的過濾器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 2.1 匯入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安裝 vue-resource
Vue.use(VueResource)
// 設定請求的根路徑
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全域性設定 post 時候表單數據格式組織形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 匯入 MUI 的樣式
import './lib/mui/css/mui.min.css'
// 匯入擴充套件圖示樣式
import './lib/mui/css/icons-extra.css'


// 按需匯入 Mint-UI 中的元件   
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 安裝 圖片預覽外掛
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 1.3 匯入自己的 router.js 路由模組
import router from './router.js'


// 匯入 App 根元件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 1.4 掛載路由對像到 VM 實例上
  store // 掛載 store 狀態管理對像
})
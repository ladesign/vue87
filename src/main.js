// 入口文件
// console.log('入口文件OK')
import Vue from 'vue'

// 1.1 匯入路由的包
import VueRouter from 'vue-router'
// 1.2 註冊 vue-router 到 vue 中
Vue.use(VueRouter)
// 1.3 匯入自訂義的 router.js 路由模組
import router from './router.js'

// 2.1 匯入 vue-resource
import VueResource from 'vue-resource'
// 2.2 註冊 vue-resource 到 vue 中
Vue.use(VueResource)
// 2.3 全域性設定API請求的根路徑
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// Vue.http.options.root = 'http://47.89.21.179:8080';  // 用這個接口圖片無法使用
// 2.4 全域性設定 post 時候表單數據格式組織形式  application/x-www-form-urlencoded，
//     手動發起的 Post 請求，預設沒有表單格式，有的伺服器處理不了，
//     所以通過 post 方法的第三個參數， { emulateJSON: true } 設定 提交的內容型別 為 普通表單數據格式。
Vue.http.options.emulateJSON = true;

// 3.1 匯入vuex包
import Vuex from 'vuex'
// 3.2 註冊 vuex 到 vue 中
Vue.use(Vuex)

// 3.4 每次剛進入 網站，肯定會 呼叫 main.js 在剛呼叫的時候，先從 本地儲存 中，把 購物車的數據讀出來，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 3.3 new Vuex.store() 實例，創建一個store數據倉儲對像
var store = new Vuex.Store({
  state: { // 調用方式：this.$store.state.***
    // 將加入購物車中的商品的數據，用一個"car陣列"儲存起來，每ㄧ個商品都是 car陣列 中的一個元素。
    // car: [] 
    // 在 car 陣列中，儲存所有已加入購物車的 商品資訊對像， 咱們可以暫時將每個商品對象數據，商品資訊對像 設計成以下這個樣子：
    // { id:商品的id, count: 要購買的數量, price: 商品的單價，selected: false  }
    // selected屬性: 進入購物車頁時，此商品是否選中(false：不選中，不要在本次結帳時一起結算)，
    // 這樣寫每次剛進入網站時，都會是一個空購物車。

    // 改成這樣，每次剛進入網站，都會呼叫 main.js，在剛呼叫的時候，先從 本地儲存 中，把原有 購物車的數據讀出來，放到 store 中
    car: car
  },
  mutations: { // 調用方式：this.$store.commit('方法的名稱', '按需傳遞唯一的參數')
    addToCar(state, goodsinfo) {
      // 點選加入購物車，把商品資訊，儲存到 store 中的 car 上
      // 分析：
      // 1. 如果購物車中，之前就已經有這個對應的商品了，那麼，只需要更新數量
      // 2. 如果沒有，則直接把 商品數據，push 到 car 中即可

      // 注意：此項目沒有寫入遠端數據庫

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

      // 當更新 car 之後，把最終 car陣列 儲存到 本地的 localStorage 中
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
      console.log(info.id + " , " + info.selected); 
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有購物車商品的狀態儲存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // 調用方式：this.$store.getters.***
    // 相當於 computed計算屬性功能，也相當於 filters過濾器功能

    //監聽的state內的car陣列，有任何元素的count數據改變時馬上重新加總並返回呼叫處，所以只要點擊"加入購物車"，就會有count改變，立即就會觸發getAllCount()
    getAllCount(state) {
      var c = 0;
      // console.log('getAllCount觸發');
      state.car.forEach(item => { //監聽state內的car陣列屬性，遍歷car內元素，找出購物車內所有商品的購買數量後加總
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

// 匯入 MUI 的樣式，包含預設圖標樣式
import './lib/mui/css/mui.min.css'
// 匯入 MUI 的擴充圖標樣式檔
import './lib/mui/css/icons-extra.css'

// **** 按需匯入 Mint-UI 中的元件：
// // import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui' // 匯入的元件統一寫在一起
// // 頂部固定導航欄
// import {Header} from 'mint-ui'
// Vue.component(Header.name, Header)
// // 首頁廣告輪播   
// import {Swipe, SwipeItem} from 'mint-ui'
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// // 發表評論按鈕
// import {Button} from 'mint-ui'
// Vue.component(Button.name, Button)
// // 懶加載  ==> 結果發現沒有載入動畫圖示
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);

// **** 完整匯入 Mint-UI 中的全部元件：
// ==> 按需匯入 Lazyload元件 沒有載入動畫圖示，改成匯入全部就可以了
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'



// 過濾器及日期格式化moment庫：
// 先匯入日期格式化moment庫 (http://momentjs.cn/) ，也可以直接
import moment from 'moment'
// 定義全域性的過濾器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 匯入 vue-preview圖片預覽插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 匯入 App 根元件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // 1.4 將 VueRouter 建立的 router路由對像 掛載到 VM 實例上，只要掛載到了 vm 上，任何元件都能使用 "$router全域對像" 來獲取路由
  router, 
  // 3.4 將 Vuex 建立的 store數據倉儲對像 掛載到 VM 實例上，只要掛載到了 vm 上，任何元件都能使用 "$store全域對像" 來存取數據
  store
})
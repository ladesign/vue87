// 入口文件
// console.log('入口文件OK')
import Vue from 'vue'

// 1.1 匯入路由的包
import VueRouter from 'vue-router'
// 1.2 安裝路由
Vue.use(VueRouter)
// 1.3 匯入自訂義的 router.js 路由模組
import router from './router.js'

// 2.1 匯入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安裝 vue-resource
Vue.use(VueResource)
// 2.3 全域性設定API請求的根路徑
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// Vue.http.options.root = 'http://47.89.21.179:8080';  // 用這個接口圖片無法使用
// 2.4 全域性設定 post 時候表單數據格式組織形式  application/x-www-form-urlencoded，
//     手動發起的 Post 請求，預設沒有表單格式，有的伺服器處理不了，
//     所以通過 post 方法的第三個參數， { emulateJSON: true } 設定 提交的內容型別 為 普通表單數據格式。
Vue.http.options.emulateJSON = true;

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
  router // 1.4 掛載路由對像到 VM 實例上
})
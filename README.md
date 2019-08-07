# 這是一個NB的專案

## 牛不牛逼， 用心去感受，每一行程式碼中的詩情雅意

### 我們是有靈魂程式設計師，所以，我們的程式碼富有詩意；

#### 丫的，實在編不下去了,哈哈哈

## [主流開源協議之間有何異同？](https://www.zhihu.com/question/19568896)

## 用(傳統方式)命令列把修改過後的程式碼上傳到碼云？？？
1. git add .
2. git commit -m "提交資訊"
3. git push

## 製作首頁App元件
1. 完成 Header 區域，使用的是 Mint-UI 中的Header元件
2. 製作底部的 Tabbar 區域，使用的是 MUI 的 Tabbar.html
 + 在製作 購物車 小圖示的時候，操作會相對多一些：
 + 先把 擴充套件圖示的 css 樣式，拷貝到 專案中
 + 拷貝 擴充套件字型庫 ttf 檔案，到專案中
 + 為 購物車 小圖示 ，新增 如下樣式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中間區域放置一個 router-view 來展示路由匹配到的元件

## 改造 tabbar 為 router-link

## 設定路由高亮

## 點選 tabbar 中的路由鏈接，展示對應的路由元件

## 製作首頁輪播圖佈局

## 載入首頁輪播圖數據
1. 獲取數據， 如何獲取呢， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 獲取數據
3. 獲取到的數據，要儲存到 data 身上
4. 使用 v-for 循環渲染 每個 item 項

## 改造 九宮格 區域的樣式

## 改造 新聞資訊 路由鏈接

## 新聞資訊 頁面 製作
1. 繪製界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 獲取數據
3. 渲染真實數據

## 實現 新聞資訊列表 點選跳轉到新聞詳情
1. 把列表中的每一項改造為 router-link,同時，在跳轉的時候應該提供唯一的Id識別符號
2. 建立新聞詳情的元件頁面  NewsInfo.vue
3. 在 路由模組中，將 新聞詳情的 路由地址 和 元件頁面對應起來

## 實現 新聞詳情 的 頁面佈局 和數據渲染

## 單獨封裝一個 comment.vue 評論子元件
1. 先建立一個 單獨的 comment.vue 元件模板
2. 在需要使用 comment 元件的 頁面中，先手動 匯入 comment 元件
 + `import comment from './comment.vue'`
3. 在父元件中，使用 `components` 屬性，將剛才匯入 comment 元件，註冊為自己的 子元件
4. 將註冊子元件時候的，註冊名稱，以 標籤形式，在頁面中 引用即可

## 獲取所有的評論數據顯示到頁面中
1. getComments

## 實現點選載入更多評論的功能
1. 為載入更多按鈕，繫結點選事件，在事件中，請求 下一頁數據
2. 點選載入更多，讓 pageIndex++ , 然後重新呼叫 this.getComments() 方法重新獲取最新一頁的數據
3. 爲了防止 新數據 覆蓋老數據的情況，我們在 點選載入更多的時候，每當獲取到新數據，應該讓 老數據 呼叫 陣列的 concat 方法，拼接上新陣列

## 發表評論
1. 把文字框做雙向數據繫結
2. 為發表按鈕繫結一個事件
3. 校驗評論內容是否為空，如果為空，則Toast提示使用者 評論內容不能為空
4. 通過 vue-resource 發送一個請求，把評論內容提交給 伺服器
5. 當發表評論OK后，重新重新整理列表，以檢視最新的評論
 + 如果呼叫 getComments 方法重新重新整理評論列表的話，可能只能得到 最後一頁的評論，前幾頁的評論獲取不到
 + 換一種思路： 當評論成功后，在客戶端，手動拼接出一個 最新的評論對象，然後 呼叫 陣列的 unshift 方法， 把最新的評論，追加到  data 中 comments 的開頭；這樣，就能 完美實現重新整理評論列表的需求；

## 改造圖片分析 按鈕為 路由的鏈接並顯示對應的元件頁面

## 繪製 圖片列表 元件頁面結構並美化樣式
 1. 製作 頂部的滑動條
 2. 製作 底部的圖片列表
### 製作頂部滑動條的坑們：
 1. 需要藉助於 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 區域的 mui-fullscreen 類去掉
 3. 滑動條無法正常觸發滑動，通過檢查官方文件，發現這是JS元件，需要被初始化一下：
  + 匯入 mui.js 
  + 呼叫官方提供的 方式 去初始化：
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 減速係數，係數越大，滾動速度越慢，滾動距離越小，預設值0.0006
  });
  ```
 4. 我們在初始化 滑動條 的時候，匯入的 mui.js ，但是，控制檯報錯： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 經過我們合理的推測，覺得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 東西，但是， webpack 打包好的 bundle.js 中，預設是啟用嚴格模式的，所以，這兩者衝突了；
  + 解決方案： 1. 把 mui.js 中的 非嚴格 模式的程式碼改掉；但是不現實； 2. 把 webpack 打包時候的嚴格模式禁用掉；
  + 最終，我們選擇了 plan B  移除嚴格模式： 使用這個外掛 babel-plugin-transform-remove-strict-mode
 5. 剛進入 圖片分享頁面的時候， 滑動條無法正常工作， 經過我們認真的分析，發現， 如果要初始化 滑動條，必須要等 DOM 元素載入完畢，所以，我們把 初始化 滑動條 的程式碼，搬到了 mounted 生命週期函式中；
 6. 當 滑動條 除錯OK后，發現， tabbar 無法正常工作了，這時候，我們需要把 每個 tabbar 按鈕的 樣式中  `mui-tab-item` 重新改一下名字；
 7. 獲取所有分類，並渲染 分類列表；

### 製作圖片列表區域
1. 圖片列表需要使用懶載入技術，我們可以使用 Mint-UI 提供的現成的 元件 `lazy-load`
2. 根據`lazy-load`的使用文件，嘗試使用
3. 渲染圖片列表數據

### 實現了 圖片列表的 懶載入改造和 樣式美化

## 實現了 點選圖片 跳轉到 圖片詳情頁面
1. 在改造 li 成 router-link 的時候，需要使用 tag 屬性指定要渲染為 哪種元素

## 實現 詳情頁面的佈局和美化，同時獲取數據渲染頁面

## 實現 圖片詳情中 縮圖的功能
1. 使用 外掛 vue-preview 這個縮圖外掛
2. 獲取到所有的圖片列表，然後使用 v-for 指令渲染數據
3. 注意： img標籤上的class不能去掉
4. 注意： 每個 圖片數據對像中，必須有 w 和 h 屬性

## 繪製 商品列表 頁面基本結構並美化

## 嘗試在手機上 去進行專案的預覽和測試
1. 要保證自己的手機可以正常執行；
2. 要保證 手機 和 開發專案的電腦 處於同一個 WIFI 環境中，也就是說 手機 可以 訪問到 電腦的 IP
3. 打開自己的 專案中 package.json 檔案，在 dev 指令碼中，新增一個 --host 指令， 把 目前 電腦的 WIFI IP地址， 設定為 --host 的指令值；
 + 如何檢視自己電腦所處 WIFI 的IP呢， 在 cmd 終端中執行 `ipconfig` ， 檢視 無線網的 ip 地址
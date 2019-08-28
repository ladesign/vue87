<template>
  <div class="goodsinfo-container">    

    <!-- 點擊加入購物車時出現的小球動畫，起始不顯示(v-show=false) -->
    <!-- <div class="ball" v-show="ballFlag" ref="ball"></div> -->
    <!-- 
      使用Vue提供的transition內部封裝組件製作路徑動畫：
      詳細說明參考 day3\筆記\vue的動畫\3_僅使用js的過渡動畫_使用鉤子函數實現半場動畫，
      這邊也是使用鉤子函數製作只有入場沒有離場的半場的動畫。
    -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>  
      <!-- ball是屬於當前元件，可以用 ref屬性 來讓js可以指到此dom -->
    </transition>

    <!-- 
      三個區域外框都使用MUI的"cardview（卡片視圖）"：mui-master\examples\hello-mui\examples\card.html      
    -->

    <!-- 商品輪播圖區域，使用首頁輪播圖封裝好的子元件 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper><!-- 3、輪播圖子元件_使用 -->
        </div>
      </div>
    </div>

    <!-- 商品購買區域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">

          <p class="price">
            市場價：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;銷售價：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <!-- 3、數字選擇框元件_使用 -->
          <p>購買數量：     
            <!-- <numbox></numbox>  -->
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即購買</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入購物車</mt-button>
            <!-- 分析： 如何實現 加入購物車 時候，拿到 選擇的數量 -->
            <!-- 1. 經過分析發現： 按鈕屬於 goodsinfo 頁面(父)， 數字 屬於 numberbox 元件(子) -->
            <!-- 2. 由於涉及到了 父、子元件的嵌套 了，所以，無法直接在 goodsinfo 頁面中獲取到 選中的商品數量值-->
            <!-- 3. 怎麼解決這個問題：涉及到了 子元件 向 父元件 傳值了（事件調用機制） -->
            <!-- 4. 事件調用的本質： 父向子傳遞方法，子調用這個方法， 同時把 數據當作參數 傳遞給這個方法。(參考 day4/筆記/父元件向子元件傳遞方法來獲取子元件的值(子元件向父元件傳值) -->
          </p>  

        </div>
      </div>
    </div>

    <!-- 商品參數區域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品參數</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品貨號：{{ goodsinfo.goods_no }}</p>
          <p>庫存情況：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架時間：{{ goodsinfo.add_time | dateFormat }}</p>          
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">圖文介紹</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品評論</mt-button>
      </div>
    </div>


  </div>
</template>

<script>
// 1、輪播圖子元件_匯入
import swiper from "../subcomponents/swiper.vue";

// 1、數字選擇框元件_匯入
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 將路由參數對像中的 id 掛載到 data , 方便後期呼叫
      lunbotu: [], // 輪播圖的數據
      goodsinfo: {}, // 獲取到的商品的資訊
      
      // 控制小球的隱藏和顯示的識別符號
      // ballFlag: true, // 顯示小球，調整小球位置用
      ballFlag: false,  // 未點擊加到購物車按鈕前先隱藏小球

      selectedCount: 1 // 儲存使用者選中的商品數量， 預設，認為使用者買1個

    };
  },
  created() { // 元件渲染完成馬上調用方法
    this.getLunbotu();
    this.getGoodsInfo();    
  },
  methods: {
    getLunbotu() { // 獲取輪播圖數據的方法
      this.$http.get('api/getthumimages/' + this.id).then(result => { // 入口文件有vue-resource的全域性設定時
        if (result.body.status === 0) {
          // this.lunbotu = result.body.message; // 返回的圖檔位址是在src屬性中，而swiper.vue子元件接收的是img屬性，所以不能直接用返回的值
          // 先循環輪播圖陣列的每一項，為 item 新增 img 屬性，因為 輪播圖 元件中，只認識 item.img， 不認識 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
          // console.log(this.lunbotu)
        }
      })
    },
     getGoodsInfo() { // 獲取商品的資訊
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 點選使用編程式導航跳轉到 圖文介紹頁面，詳細說明GoodsList.vue
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 點選使用編程式導航跳轉到 商品評論頁面，詳細說明GoodsList.vue
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      // 點擊加入購物車時，ballFlag值變為!false(即為true)，所以 v-show=true，小球顯示出來
      this.ballFlag = !this.ballFlag;
    },    
    beforeEnter(el) {// 動畫鉤子函數，動畫入場之前
      // beforeEnter 表示動畫入場之前，此時，動畫尚未開始，可以 在 beforeEnter 中，設定元素開始動畫之前的起始樣式
      // 設定小球開始動畫之前的，起始位置
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {// 動畫鉤子函數，動畫入場
      el.offsetWidth; // 這句話，沒有實際的作用，但是，如果不寫，出不來動畫效果，把它視為強制動畫重新整理

      // 小球動畫基本：
      // el.style.transform = "translate(56px, 430px)"; //移到終點，這邊終點位置是手動調整出來固定的，在不同尺寸螢幕下不準確

      // 小球動畫優化思路：
      // 1. 先分析導致 動畫 不準確的 本質原因： 我們把 小球 最終 位移到的 位置，已經侷限在了某一解析度下的 滾動條未滾動的情況下；
      // 2. 只要解析度和 測試的時候不一樣，或者 滾動條有一定的滾動距離之後， 問題就出現了；
      // 3. 因此，我們經過分析，得到結論： 不能把 位置的 橫縱座標 直接寫死了，而是應該 根據不同情況，動態計算這個座標值；
      // 4. 經過分析，得出解題思路，計算小球從起始位置到圖示上徽標(badge)的位移的距離： 
      //  4.1 先得到 購物車圖示上徽標(badge)的 橫縱 座標，
      //  4.2 再得到 小球的 橫縱座標，
      //  4.3 然後 讓 y 值 求差， x 值也求 差，得到 的結果，就是橫縱座標要位移的距離
      // 5. 如何 獲取 徽標和小球的 位置？？？  javascript的 domObject.getBoundingClientRect() 方法。  (https://www.cnblogs.com/leejersey/p/4127714.html)
      // 這個方法返回一個矩形對象，包含四個屬性：left、top、right和bottom。分別表示元素各邊與頁面 上邊 和 左邊 的距離。

      // 獲取小球的 在頁面中的位置，ball是屬於當前元件，可以用 this.$refs 指到此dom
      const ballPosition = this.$refs.ball.getBoundingClientRect(); // this.$refs.ref值 是Vue用來獲取元素的方法
      // 獲取 徽標 在頁面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left; // 橫向位移距離
      const yDist = badgePosition.top - ballPosition.top; // 縱向位移距離

      el.style.transform = `translate(${xDist}px, ${yDist}px)`; // 移到終點(使用模板字符串組出含變數的字串)




      // el.style.transition = "all 1s ease"; // 1秒的直線緩動動畫
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"; // 0.5秒的貝茲曲線動畫
      // 貝茲曲線css產生器 https://cubic-bezier.com/#.4,-0.3,1,.68  #之後數值可以調整

      done();// 表示動畫完成，完成之後會呼叫 afterEnter
    },
    afterEnter(el) {// 動畫鉤子函數，動畫完成之後會呼叫這個 afterEnter
      this.ballFlag = !this.ballFlag; // 隱藏小球
    },
    getSelectedCount(count) {
      // 當子元件把 選中的數量傳遞給父元件的時候，是把選中的值儲存到 data 上並用方法的參數傳給父元件
      this.selectedCount = count;
      console.log("父元件拿到的數量值為： " + this.selectedCount);
    }
  },
  components: {
    swiper, // 2、輪播圖子元件_註冊
    numbox // 2、數字選擇框元件_註冊
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    // ball起始位置
    top: 390px;
    left: 146px;
    // transform: translate(56px, 430px); //調整小球終點位置用(這邊是iPhone 5/SE模擬器下調整的位置)
  }
}
</style>
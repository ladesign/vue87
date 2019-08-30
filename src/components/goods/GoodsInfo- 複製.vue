<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    
    <!-- 商品輪播圖區域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
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
          <p>購買數量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即購買</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入購物車</mt-button>
            <!-- 分析： 如何實現加入購物車時候，拿到 選擇的數量 -->
            <!-- 1. 經過分析發現： 按鈕屬於 goodsinfo 頁面， 數字 屬於 numberbox 元件 -->
            <!-- 2. 由於涉及到了父子元件的巢狀了，所以，無法直接在 goodsinfo 頁面zhong 中獲取到 選中的商品數量值-->
            <!-- 3. 怎麼解決這個問題：涉及到了 子元件向父元件傳值了（事件呼叫機制） -->
            <!-- 4. 事件呼叫的本質： 父向子傳遞方法，子呼叫這個方法， 同時把 數據當作參數 傳遞給這個方法 -->
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
// 匯入輪播圖元件
import swiper from "../subcomponents/swiper.vue";
// 匯入 數字選擇框 元件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 將路由參數對像中的 id 掛載到 data , 方便後期呼叫
      lunbotu: [], // 輪播圖的數據
      goodsinfo: {}, // 獲取到的商品的資訊
      ballFlag: false, // 控制小球的隱藏和顯示的識別符號
      selectedCount: 1 // 儲存使用者選中的商品數量， 預設，認為使用者買1個
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循環輪播圖陣列的每一項，為 item 新增 img 屬性，因為 輪播圖 元件中，只認識 item.img， 不認識 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 獲取商品的資訊
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 點選使用程式設計式導航跳轉到 圖文介紹頁面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 點選跳轉到 評論頁面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      // 新增到購物車
      this.ballFlag = !this.ballFlag;
      // { id:商品的id, count: 要購買的數量, price: 商品的單價，selected: false  }
      // 拼接出一個，要儲存到 store 中 car 陣列里的 商品資訊對像
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 呼叫 store 中的 mutations 來將商品加入購物車
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球動畫優化思路：
      // 1. 先分析導致 動畫 不準確的 本質原因： 我們把 小球 最終 位移到的 位置，已經侷限在了某一解析度下的 滾動條未滾動的情況下；
      // 2. 只要解析度和 測試的時候不一樣，或者 滾動條有一定的滾動距離之後， 問題就出現了；
      // 3. 因此，我們經過分析，得到結論： 不能把 位置的 橫縱座標 直接寫死了，而是應該 根據不同情況，動態計算這個座標值；
      // 4. 經過分析，得出解題思路： 先得到 徽標的 橫縱 座標，再得到 小球的 橫縱座標，然後 讓 y 值 求差， x 值也求 差，得到 的結果，就是橫縱座標要位移的距離
      // 5. 如何 獲取 徽標和小球的 位置？？？   domObject.getBoundingClientRect()

      // 獲取小球的 在頁面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 獲取 徽標 在頁面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 當子元件把 選中的數量傳遞給父元件的時候，把選中的值儲存到 data 上
      this.selectedCount = count;
      console.log("父元件拿到的數量值為： " + this.selectedCount);
    }
  },
  components: {
    swiper,
    numbox
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
    top: 390px;
    left: 146px;
  }
}
</style>

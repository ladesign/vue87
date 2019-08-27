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
            <numbox></numbox> 
            <!-- <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox> -->
          </p>
          <p>
            <mt-button type="primary" size="small">立即購買</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入購物車</mt-button>
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
      ballFlag: false  // 未點擊加到購物車按鈕前先隱藏小球

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
      el.style.transform = "translate(56px, 430px)"; //移到終點，這邊終點位置是手動調整出來固定的，在不同尺寸螢幕下不準確
      // el.style.transition = "all 1s ease"; // 1秒的直線緩動動畫
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"; // 0.5秒的貝茲曲線動畫
      // 貝茲曲線css產生器 https://cubic-bezier.com/#.4,-0.3,1,.68  #之後數值可以調整
      done();// 表示動畫完成，完成之後會呼叫 afterEnter
    },
    afterEnter(el) {// 動畫鉤子函數，動畫完成之後會呼叫這個 afterEnter
      this.ballFlag = !this.ballFlag; // 隱藏小球
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
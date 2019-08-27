<template>
  <div> 
    <!-- 
      輪播圖區域 ，使用Mint UI的"Swipe組件"
    -->

    <!-- 方式一、直接使用Mint UI的Swipe組件標籤 -->
    <!-- 直接由範例複製，測試Swipe組件是否成功 -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe> -->
    <!-- Swipe標籤套用真實數據 -->
    <!-- <mt-swipe :auto="4000"> -->
      <!-- 在元件中，使用v-for循環的話，一定要使用 key -->
      <!-- 將來，誰使用此 輪播圖元件，誰為我們傳遞 lunbotuList -->
      <!-- 此時，lunbotuList 應該是 父元件向子元件傳值來設定 -->
      <!-- <mt-swipe-item v-for="item in lunbotuList" :key="item.id"> -->
        <!-- <img :src="item.img" alt=""> -->
      <!-- </mt-swipe-item> -->
    <!-- </mt-swipe> -->

    <!-- 方式二、將 方式一 的Mint UI的Swipe組件標籤寫法移到自訂義的輪播子元件swiper.vue去 -->
    <!-- 3-使用子元件 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>


    <!-- 
      九宮格 ，使用MUI的"9宮格默認樣式"：mui-master\examples\hello-mui\examples\grid-default.html      
    -->
    <!-- 直接由範例複製，把原來的mui圖標改成圖片，測試九宮格是否成功 -->
    <!-- <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新聞資訊</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">圖片分享</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品購買</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反饋</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">視訊專區</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">聯繫我們</div></a></li>		            
    </ul> -->
    <!-- 把<a>改成路由 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新聞資訊</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">圖片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品購買</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反饋</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">視訊專區</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">聯繫我們</div>
        </a>
      </li>
    </ul> 



    <!-- <h3>HomeContainer</h3> -->
  </div>
</template>

<script>
// 按需匯入 Mint-UI 中的元件，這邊只用到Toast元件顯示獲取輪播圖數據失敗的訊息：http://mint-ui.github.io/docs/#/zh-cn2/toast
import { Toast } from "mint-ui"; 

// 1-載入子元件
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] // 儲存輪播圖的陣列
    };
  },
  created() { // 元件渲染完成馬上調用 getLunbotu()方法
    this.getLunbotu();
  },
  methods: {
    getLunbotu() { // 獲取輪播圖數據的方法
      this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(result => { // 完整API路徑
      // this.$http.get("api/getlunbo").then(result => {  // 入口文件有vue-resource的全域性設定時
        console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.lunbotuList = result.body.message;
          // Toast("載入輪播圖成功。。。"); //測試Tost是否可用
        } else {
          // 失敗的
          Toast("載入輪播圖失敗。。。");
        }
      });
    }
  },
  components: {
    swiper  // 2-註冊子元件
  }
};
</script>

<style lang="scss" scoped>
h3{
  color:red;
}

// 輪播圖區域，方式一：
// .mint-swipe {
//   height: 200px;
//   .mint-swipe-item {
//     text-align: center;
//     // 測試Swipe組件是否成功
//     // &:nth-child(1){
//     //   background-color: red;
//     // }
//     // &:nth-child(2){
//     //   background-color: blue;
//     // }
//     // &:nth-child(3){
//     //   background-color: cyan;
//     // }
//     // 套用真實數據
//       img {
//       width: 100%;
//       height: 100%;
//     }
//   }
// }
// 輪播圖區域，方式二：
// 將方式一中mint-swipe相關樣式移到輪播子元件swiper.vue去

// 九宮格：
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: none;
   img {
    width: 60px;
    height: 60px;
  }
   .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}

</style>

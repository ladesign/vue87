<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在元件中，使用v-for循環的話，一定要使用 key -->
      <!-- 將來，誰要使用此 輪播圖元件，誰就要為我們傳遞 lunbotuList -->
      <!-- 例如首頁用此輪播圖元件，應該就是 父元件(HomeContainer.vue)向 子元件(swiper.vue)傳lunbotuList值來設定 -->
      <!-- 注意!首頁取得的輪播用圖片位址是放在img屬性中，而商品詳情頁是放在src屬性中，子元件要的是img值，所以商品詳情頁要用這個輪播子元件必須將src屬性轉成img屬性 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!-- <img :src="item.img" alt=""> -->
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：為什麼 商品評論中的 輪播圖那麼丑： -->
  <!-- 1. 首頁中的圖片，它的寬和高，都是 使用了 100% 的寬度 -->
  <!-- 2. 在商品詳情頁面中，輪播圖的 圖片，如果也使用 寬高 為 100%的話，頁面不好看 -->
  <!-- 3. 商品詳情頁面中的輪播圖，期望 高度是 100%， 但是 寬度為 自適應 -->
  <!-- 4. 經過分析，得到 問題的原因： 首頁中的輪播圖 和 詳情中的輪播圖，分歧點是 寬度到底是 100% 還是 自適應 -->
  <!-- 5. 既然這兩個 輪播圖，其它方面都是沒有衝突的，只是 寬度有分歧， 那麼，我們可以定義一個 屬性，讓 使用輪播圖的 呼叫者，手動指定 是否為 100% 的寬度 -->

</template>

<script>
export default {
  props: ["lunbotuList", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;

    // &:nth-child(1){
    //   background-color: red;
    // }
    // &:nth-child(2){
    //   background-color: blue;
    // }
    // &:nth-child(3){
    //   background-color: cyan;
    // }

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>

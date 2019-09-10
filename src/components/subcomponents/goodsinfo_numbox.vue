<template>
  <!-- 
  使用MUI的"number box（數字輸入框）"樣式：mui-master\examples\hello-mui\examples\numbox.html     
  -->
  <!-- 測試MUI組件能不能成功 -->
  <!-- <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">
      <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">-</font></font>
    </button>
    <input id="test" class="mui-input-numbox" type="number" value="5">
    <button class="mui-btn mui-btn-numbox-plus" type="button">
      <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">+</font></font>
    </button>
  </div> -->

  <!-- data-numbox-max直接綁定參數寫法，但會獲得一個undefinde，所以這樣寫沒意義。(data-numbox-max是mui組件內部屬性) -->
    <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max"> -->
  <!-- 改使用JS寫法，在watch監聽max屬性 -->
  <!-- 問題： 因為父元件異步獲取數據的緣故，我們不知道什麼時候能夠拿到 max 屬性值，所以可能會獲得一個undefinde，但是，總歸有一刻會拿到，會得到一個真正的 max 屬性值 -->
  <!-- 因此我們可以 使用 watch 屬性監聽，來 監聽 父元件傳遞過來的 max 屬性值，不管 watch 會被觸發幾次，但是，最後一次，肯定是一個 合法的 max 數值 -->  
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

  <!-- 分析： 子元件什麼時候把 數據傳遞給父元件 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"; // 加減數量需要引入MUI的JS才能動作

export default {
  mounted() {
    // 初始化數字選擇框元件：mui在mui.init()中會自動初始化基本控件,但是 動態添加的Numbox組件需要手動初始化，Vue內使用就是動態添加，所以需要手動初始化。
    mui(".mui-numbox").numbox();
    // console.log('子元件取得父元件傳值，庫存量為 '+this.max);
  },
  methods: {
    countChanged() {
      // 每當 文字框的數據被修改的時候，立即把 最新的數據，通過事件呼叫，傳遞給父元件
      console.log('子元件的值為： '+this.$refs.numbox.value);
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }

  },
  props: ["max"],
  watch: {    
    // 詳細說明參考 day5\筆記\watch屬性
    // 屬性監聽
    max: function(newVal, oldVal) {
      // 使用 MUI框架 中 numbox組件 的JS API 設定 numbox 的最大值，到達最大值（庫存值）後無法再按＋
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
    
  }
};
</script>

<style lang="scss" scoped>

</style>

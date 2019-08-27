<template>
  <!-- 
  使用MUI的"number box（數字輸入框）"樣式：mui-master\examples\hello-mui\examples\numbox.html     
  -->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">
      <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">-</font></font>
    </button>
    <input id="test" class="mui-input-numbox" type="number" value="5">
    <button class="mui-btn mui-btn-numbox-plus" type="button">
      <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">+</font></font>
    </button>
  </div>

</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"; // 加減數量需要引入MUI的JS才能動作

export default {
  mounted() {
    // 初始化數字選擇框元件：mui在mui.init()中會自動初始化基本控件,但是 動態添加的Numbox組件需要手動初始化，Vue內使用就是動態添加，所以需要手動初始化。
    mui(".mui-numbox").numbox();
  },
  methods: {

  },
  props: [],
  watch: {

  }
};
</script>

<style lang="scss" scoped>

</style>

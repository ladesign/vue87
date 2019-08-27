<template>
  <div><!-- 3. 使用評論子元件 -->
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
// 1. 匯入 評論子元件
import cmtbox from "../subcomponents/comment.vue";

export default {
  components: {
    // 2. 註冊 評論子元件
    cmtbox
  }
};
</script>

<style lang="scss" scoped>

</style>
